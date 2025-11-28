# 📚 Stories, Powered by AI

This README is not just documentation. This is a **personal memory map** of how I built my AI project step by step, what I learned, what broke, and what finally worked.

---

## 🧠 What This Project Really Is

This is a **local AI chatbot** made using the book **“Grandma’s Bag of Stories”**.

You can ask questions from the book, and the AI will answer them.

The interesting part is — the same AI can reply in **two different moods**:

- 💛 A **sweet, kind grandma**
- 😠 An **angry, strict grandma**

Same knowledge. Same question. Different tone.

---

## 🎯 Why I Started This Project (My Actual Intention)

I wanted to go beyond simple chatbot tutorials.

I wanted to understand:

- How **RAG actually works in real projects**
- How a **PDF becomes searchable by an AI**
- How **frontend talks to backend** in an AI system
- How **prompting can change personality**, not just output

This project is my way of proving to myself that I truly understand the **full AI pipeline**, not just the surface-level API calls.

---

## ✅ What It Can Do Right Now

- Takes a **storybook PDF** as input
- Breaks it into smaller readable parts (chunks)
- Finds only the **relevant part** for the question (RAG)
- Sends that context to the AI model
- Returns a **natural language answer**
- Applies a **personality layer** (Sweet or Angry)

---

## 🛠 Tech Stack (What I Actually Used)

### Frontend
- React (Vite)
- Tailwind CSS
- Axios

### Backend
- Python
- FastAPI

### AI & Logic
- RAG (Retrieval-Augmented Generation)
- **Gemini 2.5 Flash** as the LLM
- Prompt-based persona control

### Data Handling
- PDF ingestion
- Text chunking & cleaning

### Environment
- Local development setup
- `.env` files for secrets
- Python virtual environment (venv)

---

## 🧩 How the System Works (In My Own Words)

1. I load the **PDF file** of the storybook.  
2. I **extract the text** from it.  
3. I **split the text into chunks** so the model can handle it.  
4. When a user asks a question:  
   - I **search only the relevant chunks** (RAG)  
   - I send those chunks + the question to the LLM  
5. Based on the selected mode:  
   - The AI replies like a **sweet grandma**  
   - OR like an **angry grandma**  
6. The answer is sent to the **React UI in real time**.

---

## ▶️ How to Run

1. Enable **venv** virtual environment every time:
venv\Scripts\Activate.ps1
2. Start Docker:
docker start grandma_quadrant
3. Run ingestion:
python ingestion.py
4. Start backend:
uvicorn main:app --host 0.0.0.0 --port 5000 --reload
5. Start frontend:
npm run dev


---

## 🎭 Two Personality Concept (Why I Did This)

I didn’t add the two moods just for fun.

I wanted to understand:

- How much **prompting alone can change an AI’s behavior**
- How the **same knowledge base can feel completely different**
- How personality affects user experience

This helped me clearly see the **power of prompt engineering**.

---

## 🚀 How I Actually Started This Project

1. I first chose **one single book** as my data source.  
2. I studied **RAG concept from videos and articles**.  
3. Then I created a **FastAPI backend**.  
4. I worked on:
   - PDF reading
   - Text extraction
   - Chunking
5. I connected the **Gemini 2.5 Flash model**.  
6. After backend was stable, I designed the **React chat UI**.  
7. Finally, I connected frontend and backend using **Axios**.

---

## ⚡ Features

- Local AI chatbot
- RAG-based context retrieval
- Two personality modes
- Themed UI (Grandma style)
- Real-time interaction
- Clean UI with loading states

---

## 📁 Project Structure (For My Memory)

```
project/
│
├── backend/
│   ├── main.py
│   ├── rag/
│   ├── utils/
│   └── .env
│
├── frontend/
│   ├── src/
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── index.html
│
├── data/
│   └── grandma_stories.pdf
│
└── README.md

```


---

## 📚 What I Truly Learned From This

- RAG is not magic — it is **search + context + generation**.
- Prompting controls **behavior, not knowledge**.
- Frontend + backend integration is where most bugs happen.
- AI systems also need proper **error handling**.
- Building AI is more about **system design** than just models.

---

## 🧱 Problems I Faced (Very Real)

- PDF text was messy
- Context size limits
- Responses sometimes went out of character
- CORS issues
- UI freezing during API calls

Fixing these taught me **real debugging**, not tutorial debugging.

---

## 🔮 What I Want To Explore Next

- Better RAG techniques
- Vector databases
- Multi-agent AI systems
- Production deployment
- AI evaluation methods

---

## 🧠 Personal Notes To My Future Self

- Start small, always.
- Make the pipeline work first, then beautify UI.
- Prompts are logic.
- Never trust first output.
- Debug patiently.

---

## 🎥 Demo

I have recorded a demo showing:

- Sweet grandma mode
- Angry grandma mode
- Same question, different replies

---

### ⭐ Final Thought

This project is not about perfection.  
It is about **understanding how AI actually works end-to-end** — in practice.
