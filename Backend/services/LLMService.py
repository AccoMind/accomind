from huggingface_hub import InferenceClient
import ollama

from schemas.chat import ChatHistorySchema


class LLMService:

    def __init__(self):
        self.llm = HuggingFaceLLM()

    def generate_response(self, prompt: list[ChatHistorySchema]):
        return self.llm.generate_response(prompt)


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
