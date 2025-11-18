
import os
from collections import defaultdict
from dotenv import load_dotenv
from fastapi import FastAPI, Header
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware

from qdrant_client import QdrantClient
from langchain_qdrant import QdrantVectorStore
from langchain_google_genai import (
    GoogleGenerativeAIEmbeddings,
    ChatGoogleGenerativeAI
)
from langchain_classic.chains.retrieval_qa.base import RetrievalQA
from langchain_core.prompts import PromptTemplate

load_dotenv()

GOOGLE_API_KEY = os.getenv("GOOGLE_API_KEY")
QDRANT_URL = os.getenv("QDRANT_URL", "http://localhost:6333")
QDRANT_COLLECTION = os.getenv("QDRANT_COLLECTION", "grandma_stories")

app = FastAPI(title="Grandma Stories RAG")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class ChatRequest(BaseModel):
    question: str

class ChatResponse(BaseModel):
    answer: str

# Session memory dictionary
session_memory = defaultdict(list)



qdrant_client = None
qa_chain = None
classifier = None
retriever = None





@app.on_event("startup")
def startup_event():
    """
    Initialize Qdrant, embeddings, LLM, prompt, and the QA chain.
    """
    global qdrant_client, qa_chain

    qdrant_client = QdrantClient(url=QDRANT_URL)

    embeddings = GoogleGenerativeAIEmbeddings(
        model="text-embedding-004",
        google_api_key=GOOGLE_API_KEY,
    )

    vector_store = QdrantVectorStore(
        client=qdrant_client,
        collection_name=QDRANT_COLLECTION,
        embedding=embeddings,
    )

    retriever = vector_store.as_retriever(search_kwargs={"k": 20})

    llm = ChatGoogleGenerativeAI(
        model="gemini-2.5-flash",
        google_api_key=GOOGLE_API_KEY,
        temperature=0.0,
    )

    # classifier = llm

    prompt_template = """
You are Grandma, a sweet old lady.But don't be too much of sweet . Behave maturely too 

You must ONLY answer questions using the context and memory below.

RULES:

1. If the context contains the answer → answer normally.

2. If the user asks something related to the book but context is unclear:
   Reply exactly with:
   "Could you please specify which story you are talking about?"

3. If the question is outside the book and not relevant to the book:
   Reply exactly with:
   "I am really sorry, I can only talk about the 'Grandma's Bag of Stories' book."

4. For summaries:
   - Write story title
   - Characters
   - Summary
   - Moral
   - Use proper markdown

5. If the user is greeting you , you should greet him/her politely . And ask how you can help them today from the grandma stories world or something cute like this . If they provide their name then use it too while greeting them .

Context:
{context}

Question:
{question}

Grandma's Answer:
"""

    prompt = PromptTemplate(
        input_variables=["context", "question", "memory"],
        template=prompt_template
    )

    qa_chain = RetrievalQA.from_chain_type(
        llm=llm,
        retriever=retriever,
        chain_type="stuff",
        chain_type_kwargs={"prompt": prompt},
        return_source_documents=False,
    )


@app.post("/chat", response_model=ChatResponse)
async def chat(request: ChatRequest, session_id: str = Header(None)):
    if session_id is None:
        return ChatResponse(answer="Missing session_id in request headers.")

    user_question = request.question

    # last 6 messages
    history_for_prompt = "\n".join([
        f"{m['role']}: {m['content']}"
        for m in session_memory[session_id][-6:]
    ])

    # inject memory directly into the question
    full_query = f"""
        Conversation Memory:
        {history_for_prompt}

        User Question:
        {user_question}
        """

    result = qa_chain({"query": full_query})
    answer = result["result"]

    # store in memory
    session_memory[session_id].append({"role": "user", "content": user_question})
    session_memory[session_id].append({"role": "assistant", "content": answer})

    return ChatResponse(answer=answer)