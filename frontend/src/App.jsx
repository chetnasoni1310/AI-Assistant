/* eslint-disable no-unused-vars */
// src/App.jsx

import { useState, useEffect, useRef } from "react";
import axios from "axios";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

function App() {
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      text: "Hello ! Ask me anything about Grandma's Bag of Stories.",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);

  //Session id for memory references
   const sessionId =
    localStorage.getItem("session_id") ||
    (() => {
      const id = crypto.randomUUID();
      localStorage.setItem("session_id", id);
      return id;
    })();

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const userMessage = { role: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const res = await axios.post(
        "http://localhost:5000/chat",
        { question: userMessage.text },
        {
         headers: { "session-id": sessionId }
        }
      );

      const botMessage = { role: "assistant", text: res.data.answer };
      setMessages((prev) => [...prev, botMessage]);
    } catch (err) {
      const errorMessage = {
        role: "assistant",
        text: "Oh , something went wrong while reaching the server.",
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen bg-[#FFF7E9] flex items-center justify-center p-4"
      style={{ fontFamily: "Quicksand, sans-serif" }}
    >
      <div className="w-full max-w-2xl bg-[#FDF3DD] border border-[#E6D2B5] rounded-3xl shadow-xl flex flex-col h-[85vh] overflow-hidden">
        {/* Header */}
        <header className="px-6 py-4 bg-[#F2E4C6] border-b border-[#E6D2B5] flex items-center gap-3">
          {/* <img
            src="https://cdn-icons-png.flaticon.com/512/3898/3898085.png"
            alt="grandma"
            className="w-10 h-10 rounded-full bg-[#FAF0DB] p-1"
          /> */}
          <h1 className="text-lg font-bold text-[#6B4E2E]">
            Grandma's Story Assistant
          </h1>
        </header>

        {/* Messages */}
        <main className="flex-1 overflow-y-auto px-4 py-4 space-y-4 scrollbar-thin scrollbar-track-[#F7ECD8] scrollbar-thumb-[#D5C2A3]">
          {messages.map((m, idx) => (
            <div
              key={idx}
              className={`flex ${
                m.role === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-[75%] px-4 py-3 rounded-2xl text-sm leading-relaxed shadow-md ${
                  m.role === "user"
                    ? "bg-[#F7C9A9] text-[#5A3A24]"
                    : "bg-[#FFF4DE] text-[#6B4E2E] border border-[#E8D7BB]"
                }`}
              >
                {m.role === "assistant" && (
                  <div className="flex items-center gap-2 mb-1">
                    {
                      <img
                        src="https://cdn-icons-png.flaticon.com/512/6739/6739635.png"
                        alt="grandma"
                        className="w-6 h-6 rounded-full bg-[#FAF0DB] p-1"
                      />
                    }
                    <span className="text-xs font-semibold text-[#8B6A43]">
                      Grandma
                    </span>
                  </div>
                )}
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                  {m.text}
                </ReactMarkdown>
              </div>
            </div>
          ))}

          {loading && (
            <div className="flex items-center gap-2 text-[#8B6A43] text-sm">
              {/* <img
                src="https://img.freepik.com/free-vector/sticker-template-with-face-old-woman-emoji-icon_1308-58444.jpg?semt=ais_hybrid&w=740&q=80"
                className="w-6 h-6 animate-pulse"
              /> */}
              Grandma is thinking...
            </div>
          )}

          <div ref={bottomRef} />
        </main>

        {/* Input */}
        <form
          onSubmit={sendMessage}
          className="px-4 py-3 bg-[#F2E4C6] border-t border-[#E6D2B5] flex gap-3"
        >
          <input
            className="flex-1 bg-[#FFF8EB] border border-[#E3D1B7] rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#E2B27F] placeholder:text-[#AB9273]"
            placeholder="Ask Grandma a question..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />

          <button
            type="submit"
            disabled={loading}
            className="px-5 py-2.5 bg-[#E9B384] hover:bg-[#D99C6F] text-sm rounded-xl text-[#5A3A24] font-semibold shadow disabled:opacity-40"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
}

export default App;
