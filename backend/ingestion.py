# ingest.py
import os
from dotenv import load_dotenv

from langchain_community.document_loaders import PyPDFLoader
from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain_google_genai import GoogleGenerativeAIEmbeddings
from langchain_qdrant import QdrantVectorStore

load_dotenv()

GOOGLE_API_KEY = os.getenv("GOOGLE_API_KEY")
QDRANT_URL = os.getenv("QDRANT_URL", "http://localhost:6333")
QDRANT_COLLECTION = os.getenv("QDRANT_COLLECTION", "grandma_stories")

def main():
    loader = PyPDFLoader("grandmas_bag_of_stories.pdf")
    docs = loader.load()

    splitter = RecursiveCharacterTextSplitter(
        chunk_size=4000,
        chunk_overlap=400,  
    )
    chunks = splitter.split_documents(docs)

    embeddings = GoogleGenerativeAIEmbeddings(
        model="text-embedding-004",
        google_api_key=GOOGLE_API_KEY,
    )

    vector_store = QdrantVectorStore.from_documents(
        documents=chunks,
        embedding=embeddings,
        url=QDRANT_URL,
        collection_name=QDRANT_COLLECTION,
    )

    print(f"Indexed {len(chunks)} chunks into Qdrant collection '{QDRANT_COLLECTION}'")

if __name__ == "__main__":
    main()