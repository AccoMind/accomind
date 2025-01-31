class LLMService:

    def __init__(self):
        self.llm = LLM()

    def generate_response(self, prompt: str):
        return self.llm.generate_response(prompt)


class LLM:

    def __init__(self):
        pass

    def generate_response(self, prompt: str):
        return "This is a response from LLM"