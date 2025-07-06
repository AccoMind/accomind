import os
from huggingface_hub import InferenceClient
import ollama

from services.KnowledgeBaseQuerier import KnowledgeBaseQuerier
from services.RAGService import CSEKnowledgeBaseQuerier
from schemas.chat import ChatHistorySchema
from dotenv import load_dotenv

load_dotenv()

MILVUS_URI = os.getenv('MILVUS_URI')
MILVUS_TOKEN = os.getenv('MILVUS_TOKEN')
MILVUS_USERNAME = os.getenv('MILVUS_USERNAME')
MILVUS_PASSWORD = os.getenv('MILVUS_PASSWORD')
HUGGING_FACE_API_KEY = os.getenv('HUGGING_FACE_API_KEY')
GEMINI_API_KEY = os.getenv('GEMINI_TOKEN')


class LLMService:

    def __init__(self):
        self.llm = HuggingFaceLLM()
        # self.rag = CSEKnowledgeBaseQuerier(
        #     MILVUS_URI,
        #     MILVUS_USERNAME,
        #     MILVUS_PASSWORD,
        #     "cse_annual_reports",
        #     HUGGING_FACE_API_KEY
        # )

        self.model = KnowledgeBaseQuerier(
            MILVUS_URI,
            MILVUS_TOKEN,
            "cse_annual_reports",
            HUGGING_FACE_API_KEY,
            GEMINI_API_KEY
        )

    def generate_response(self, chat_message: str, history: list[ChatHistorySchema] = [], filters: dict = {}):
        return self.model.perform_query(chat_message)


class LLM:

    def __init__(self):
        pass

    def generate_response(self, messages: list[ChatHistorySchema]):
        chat = ollama.chat(model="llama3.2:1b", messages=messages)

        return chat["message"]["content"]


class HuggingFaceLLM:

    def __init__(self):

        self.client = InferenceClient(
            provider="sambanova",
            api_key="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"
        )

    def generate_response(self, messages: list[ChatHistorySchema]):
        completion = self.client.chat.completions.create(
            model="meta-llama/Llama-3.1-8B-Instruct",
            messages=list(map(lambda x: {"role": x.role,
                                         "content": x.content}, messages)),
            max_tokens=500
        )

        return completion.choices[0].message.content
