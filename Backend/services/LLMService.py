import os
from huggingface_hub import InferenceClient
import ollama

from services.RAGService import CSEKnowledgeBaseQuerier
from schemas.chat import ChatHistorySchema
from dotenv import load_dotenv

load_dotenv()

MILVUS_URI = os.getenv('MILVUS_URI')
MILVUS_USERNAME = os.getenv('MILVUS_USERNAME')
MILVUS_PASSWORD = os.getenv('MILVUS_PASSWORD')
HUGGING_FACE_API_KEY = os.getenv('HUGGING_FACE_API_KEY')


class LLMService:

    def __init__(self):
        self.llm = HuggingFaceLLM()
        
        # Only initialize RAG if all required environment variables are present
        if all([MILVUS_URI, MILVUS_USERNAME, MILVUS_PASSWORD, HUGGING_FACE_API_KEY]):
            try:
                self.rag = CSEKnowledgeBaseQuerier(
                    MILVUS_URI,
                    MILVUS_USERNAME,
                    MILVUS_PASSWORD,
                    "cse_annual_reports",
                    HUGGING_FACE_API_KEY
                )
                self.rag_available = True
            except Exception as e:
                print(f"RAG service initialization failed: {e}")
                self.rag = None
                self.rag_available = False
        else:
            print("RAG service disabled: Missing environment variables")
            self.rag = None
            self.rag_available = False

    def generate_response(self, chat_message: str, history: list[ChatHistorySchema] = [], filters: dict = {}):
        # Try RAG first if available
        if self.rag_available and self.rag:
            try:
                rag_data = self.rag.query(chat_message, history, filters=filters)
                if rag_data:
                    return rag_data
            except Exception as e:
                print(f"RAG query failed: {e}")
        
        # Fallback to simple LLM or mock response
        try:
            return self.llm.generate_response(history + [ChatHistorySchema(role="user", content=chat_message)])
        except Exception as e:
            print(f"LLM service failed: {e}")
            # Ultimate fallback - simple rule-based responses
            return self._generate_fallback_response(chat_message, filters)
    
    def _generate_fallback_response(self, message: str, filters: dict = {}):
        """Generate a simple fallback response when AI services are unavailable"""
        message_lower = message.lower()
        
        # Extract company from filters if available
        company = filters.get('company', 'the selected company')
        
        # Simple rule-based responses
        if any(word in message_lower for word in ['revenue', 'income', 'profit', 'earnings']):
            return f"I would need access to the financial database to provide specific revenue information for {company}. Please ensure the AI services are properly configured."
        
        elif any(word in message_lower for word in ['balance', 'assets', 'liabilities']):
            return f"To analyze balance sheet information for {company}, I need access to the financial data services. Please check the environment configuration."
        
        elif any(word in message_lower for word in ['cash', 'flow', 'cashflow']):
            return f"Cash flow analysis for {company} requires access to the financial database. Please configure the required API keys."
        
        elif any(word in message_lower for word in ['hello', 'hi', 'help']):
            return "Hello! I'm AccoMind, your financial analysis assistant. I can help you analyze company financial reports, but I need proper API configuration to access the financial database. Please contact your administrator to set up the required services."
        
        else:
            return f"I understand you're asking about {company}, but I need access to the financial analysis services to provide accurate information. Please ensure all required API keys are configured in the environment variables."


class LLM:

    def __init__(self):
        pass

    def generate_response(self, messages: list[ChatHistorySchema]):
        try:
            chat = ollama.chat(model="llama3.2:1b", messages=[
                {"role": msg.role, "content": msg.content} for msg in messages
            ])
            return chat["message"]["content"]
        except Exception as e:
            raise Exception(f"Ollama service unavailable: {e}")


class HuggingFaceLLM:

    def __init__(self):
        # Check if API key is available
        if not HUGGING_FACE_API_KEY or HUGGING_FACE_API_KEY == "your_huggingface_api_key_here":
            self.client = None
            self.available = False
        else:
            try:
                self.client = InferenceClient(
                    provider="sambanova",
                    api_key=HUGGING_FACE_API_KEY
                )
                self.available = True
            except Exception as e:
                print(f"HuggingFace client initialization failed: {e}")
                self.client = None
                self.available = False

    def generate_response(self, messages: list[ChatHistorySchema]):
        if not self.available or not self.client:
            raise Exception("HuggingFace service not available")
        
        try:
            completion = self.client.chat.completions.create(
                model="meta-llama/Llama-3.1-8B-Instruct",
                messages=[{"role": msg.role, "content": msg.content} for msg in messages],
                max_tokens=500
            )
            return completion.choices[0].message.content
        except Exception as e:
            raise Exception(f"HuggingFace API error: {e}")
