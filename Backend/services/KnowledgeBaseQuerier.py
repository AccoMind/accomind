import itertools
from typing import Optional
from google import genai
import spacy
from huggingface_hub import InferenceClient
from pymilvus import MilvusClient
from sentence_transformers import SentenceTransformer
import gradio as gr
from rapidfuzz import process, fuzz

from services.Reranker import Reranker

COMPANY_LOOKUP = {
    "COMMERCIAL_BANK_OF_CEYLON_PLC": ['commercial bank plc', 'commercial bank', 'combank'],
    "SEYLAN_BANK_PLC": ['seylan bank plc', 'seylan bank', 'seylan'],
    "PAN_ASIA_BANKING_CORPORATION_PLC": ['pan asia banking corporation plc, pan asia bank', 'pan asia'],
    "NATIONS_TRUST_BANK_PLC": ['nations trust bank plc', 'nations trust bank', 'nations trust', 'ntb'],
    "HATTON_NATIONAL_BANK_PLC": ['hatton national bank plc', 'hatton national bank', 'hatton national', 'hnb'],
}


class KnowledgeBaseQuerier:

    def __init__(self, milvus_uri: str, milvus_token: str, collection: str, hf_token: str, gemini_token: str):

        self.client = MilvusClient(uri=milvus_uri, token=milvus_token)
        self.collection = collection

        self.reranker = Reranker(hf_token)

        self.embedding_model = SentenceTransformer('all-MiniLM-L6-v2')
        self.nlp = spacy.load("en_core_web_sm")

        self.llm = InferenceClient(
            model="mistralai/Mixtral-8x7B-Instruct-v0.1",
            token=hf_token
        )

        self.gemini = genai.Client(api_key=gemini_token)

    def extract_entities(self, query: str) -> dict[str, list]:
        doc = self.nlp(query)
        entities = {"company_name": [], "year": []}

        for ent in doc.ents:
            if ent.label_ == "ORG":

                resolved_company_name = self.resolve_company_name(ent.text)

                print(resolved_company_name)

                if resolved_company_name:
                    entities["company_name"].append(resolved_company_name)
            elif ent.label_ == "DATE":
                # Try to extract a valid year from the date
                if ent.text.isdigit() and len(ent.text) == 4:
                    entities["year"].append(int(ent.text))
                else:
                    # Try to extract year from text like "2023 annual report"
                    for token in ent.text.split():
                        if token.isdigit() and len(token) == 4:
                            entities["year"].append(int(token))

        return {k: v for k, v in entities.items() if v}

    def resolve_company_name(self, user_input: str) -> Optional[str]:
        """
        Map user input to the closest known company name.
        """
        print(user_input)
        canonical_names = list(COMPANY_LOOKUP.keys())
        user_input = user_input.lower().strip()

        # Flatten all aliases for matching
        all_names = {alias: canon for canon, aliases in COMPANY_LOOKUP.items() for alias in aliases}

        # Match from aliases
        match, score, _ = process.extractOne(user_input, all_names.keys(), scorer=fuzz.token_sort_ratio)

        if score >= 80:
            return all_names[match]  # return canonical name

        # Fallback: match from canonical names
        match, score, _ = process.extractOne(user_input, canonical_names, scorer=fuzz.token_sort_ratio)

        if score >= 80:
            return match

        return None

    def build_milvus_filter(self, filters: dict[str, list]) -> str:
        expressions = []

        for key, values in filters.items():
            if not values:
                continue

            if isinstance(values[0], str):
                val_list = ", ".join(f"\"{v}\"" for v in values)
            else:
                val_list = ", ".join(str(v) for v in values)

            expressions.append(f"{key} in [{val_list}]")

        return " AND ".join(expressions)

    def vector_search(self, query: str, filters, top_k: int = 20):

        vector_embedding = self.embedding_model.encode([query])

        res = self.client.search(
            collection_name=self.collection,
            data=vector_embedding.tolist(),
            limit=top_k,
            filter=filters,
            output_fields=['year', 'company_name', 'text', 'source']
        )

        print("Retrieved ", len(res[0]), " results", "for the query: ", filters)

        return res

    def generate_responses(self, prompt, max_tokens: int = 512):

        return self.llm.text_generation(
            prompt,
            max_new_tokens=512,
            temperature=0.7,
            top_p=0.95,
            repetition_penalty=1.1,
            do_sample=True
        )

    def gemini_generate_responses(self, prompt, max_tokens: int = 512):
        response = self.gemini.models.generate_content(
            model="gemini-2.0-flash",
            contents=prompt
        )

        return response.text

    def gen_context_item(self, context):

        return f"""
        text: {context['text']}
        company name: {context['company_name']}
        source: {context['source']}
        year: {context['year']}
        """

    def generate_filter_pairs(self, entities):
        if 'company_name' in entities and 'year' in entities and (len(entities['company_name']) > 1 or len(entities['year']) > 1):
            combinations = list(itertools.product(entities['company_name'], entities['year']))
            result = []
            for company, year in combinations:
                result.append({'company_name': [company], 'year': [year]})

            return result
        else:
            return [entities]

    def perform_query(self, query: str):
        entities = self.extract_entities(query)

        filter_pairs = self.generate_filter_pairs(entities)

        retrievals = []
        for pair in filter_pairs:
            filters = self.build_milvus_filter(pair)

            top_k = max(40 // len(filter_pairs), 5)

            responses = self.vector_search(query, filters, top_k=top_k)

            responses = [response['entity'] for response in responses[0]]

            if len(responses) > 0:
                responses = self.reranker.rerank(query, responses, top_docs=(top_k // 2) + 1)
            retrievals.extend(responses)

        context = "\n\n".join(self.gen_context_item(i) for i in retrievals)

        prompt = f"""You are a financial analyst specializing in corporate annual reports. Using only the context and the previous conversation provided below,
            answer the following question accurately. If the information is not in the context, explicitly state that.
            
            Extra Information:
            Both the currencies "LKR" and "Sri Lankan Rupees" are same In the context provided all the currencies are in "LKR".
            
            Context:
            {context}

            Question: {query}
            Answer:"""

        response = self.gemini_generate_responses(prompt)

        return response

    def create_gradio_interface(self):
        def qa_pipeline(user_query):
            return self.perform_query(user_query)

        gr.Interface(fn=qa_pipeline, inputs="text", outputs="text", title="PLC Report Q&A").launch()

    # print(kbq.extract_entities("What was the Apple's profitability in the year 22?"))