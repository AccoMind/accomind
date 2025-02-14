import os
import pprint
from typing import Dict, List, Optional
from dotenv import load_dotenv
from langchain_core.prompts import PromptTemplate
from langchain_huggingface import HuggingFaceEmbeddings, HuggingFaceEndpoint
from langchain_milvus import Milvus
from langchain.chains.retrieval import create_retrieval_chain
from langchain.chains.combine_documents import create_stuff_documents_chain

# from schemas.chat import ChatHistorySchema


class CSEKnowledgeBaseQuerier:
    """Class responsible for querying a knowledge base of Annual Reports from companies listed in the Colombo Stock Exchange (CSE)."""

    def __init__(self,
                 milvus_uri: str,
                 milvus_user: str,
                 milvus_password: str,
                 collection_name: str,
                 hf_token: str):
        """
        Initialize the Knowledge Base Querier.

        Args:
            milvus_uri: URI for Milvus/Zilliz Cloud connection
            milvus_user: Milvus username
            milvus_password: Milvus password
            collection_name: Name of the collection to query
            hf_token: HuggingFace API token
        """
        self.collection_name = collection_name

        # Initialize embedding model
        self.embedding_model = HuggingFaceEmbeddings(
            model_name="sentence-transformers/all-MiniLM-L6-v2"
        )

        # Initialize LLM
        self.llm = HuggingFaceEndpoint(
            repo_id="mistralai/Mixtral-8x7B-Instruct-v0.1",
            huggingfacehub_api_token=hf_token,
            task="text-generation"  # Ensure task is explicitly set
        )

        # Setup Milvus connection
        self.connection_args = {
            "uri": milvus_uri,
            "user": milvus_user,
            "password": milvus_password,
            "secure": True
        }

        # Connect to existing vector store
        try:
            self.vectorstore = Milvus(
                embedding_function=self.embedding_model,
                collection_name=collection_name,
                connection_args=self.connection_args
            )
            print(f"Successfully connected to collection: {collection_name}")
        except Exception as e:
            raise Exception(f"Failed to connect to Milvus: {str(e)}")

    def query(self,
              question: str,
              chat_history: Optional[List[Dict]] = None,
              filters: Optional[Dict] = None,
              top_k: int = 5,
              template: Optional[str] = None) -> Dict:
        """
        Query the CSE knowledge base for Annual Reports.

        Args:
            question: Question to ask
            chat_history: Previous conversation history
            filters: Optional filters (e.g., {"company_name": "CompanyA", "year": 2023})
            top_k: Number of relevant chunks to retrieve
            template: Optional custom prompt template
        """
        search_kwargs = {"k": top_k}
        if filters:
            search_kwargs["filter"] = filters

        # Create retriever with search parameters
        retriever = self.vectorstore.as_retriever(search_kwargs=search_kwargs)

        # Default or custom prompt template
        if template is None:
            template = """You are a financial analyst specializing in corporate annual reports. Using only the context and the previous conversation provided below,
            answer the following question accurately. If the information is not in the context, explicitly state that.

            Previous Conversation:
            {chat_history}

            Context:
            {context}

            Question: {input}

            Provide a detailed response with specific numbers and insights from the report.
            Answer:
            """

        PROMPT = PromptTemplate.from_template(template)

        # Prepare chat history as formatted text
        chat_history_str = ""

        # Create and execute chain
        document_chain = create_stuff_documents_chain(self.llm, PROMPT)
        retrieval_chain = create_retrieval_chain(retriever, document_chain)

        response = retrieval_chain.invoke({
            "input": question,
            "chat_history": chat_history_str
        })

        return response['answer']

    def get_query_context(self, question: str, filters: Optional[Dict] = None, top_k: int = 5) -> List:
        """
        Retrieve the most relevant context chunks that would be used to answer a question.
        """
        search_kwargs = {"k": top_k}
        if filters:
            search_kwargs["filter"] = filters

        docs = self.vectorstore.similarity_search(question, **search_kwargs)
        return docs

    def get_collection_info(self) -> Dict:
        """Get metadata about the connected collection."""
        try:
            collection = self.vectorstore.col
            stats = collection.get_statistics()
            return {
                "collection_name": self.collection_name,
                "total_documents": stats.get("row_count", "Unknown"),
                "embedding_dimension": stats.get("dim", "Unknown")
            }
        except Exception as e:
            return {"error": f"Failed to retrieve collection info: {str(e)}"}


if __name__ == "__main__":
    load_dotenv()

    MILVUS_URI = os.getenv('MILVUS_URI')
    MILVUS_USERNAME = os.getenv('MILVUS_USERNAME')
    MILVUS_PASSWORD = os.getenv('MILVUS_PASSWORD')
    HUGGING_FACE_API_KEY = os.getenv('HUGGING_FACE_API_KEY')

    print(MILVUS_URI)
    print(MILVUS_USERNAME)
    print(MILVUS_PASSWORD)
    print(HUGGING_FACE_API_KEY)

    rag = CSEKnowledgeBaseQuerier(
        MILVUS_URI,
        MILVUS_USERNAME,
        MILVUS_PASSWORD,
        "cse_annual_reports",
        HUGGING_FACE_API_KEY
    )

    print(pprint.pprint(rag.query("What do you know IBM Research? give me a brief")))
