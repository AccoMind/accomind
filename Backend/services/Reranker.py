from sentence_transformers import CrossEncoder

class Reranker:

    def __init__(self, hf_token: str):
        self.reranker = CrossEncoder('cross-encoder/ms-marco-MiniLM-L-6-v2')


    def rerank(self, query, retrieved_docs, top_docs: int = 10):
        print(retrieved_docs)
        pairs = [(query, doc['text']) for doc in retrieved_docs]
        scores = self.reranker.predict(pairs)

        ranked_docs = sorted(zip(retrieved_docs, scores), key=lambda x: x[1], reverse=True)
        top_docs = [doc for doc, _ in ranked_docs[:10]]  # Choose top 5 or adjust as needed

        return top_docs

