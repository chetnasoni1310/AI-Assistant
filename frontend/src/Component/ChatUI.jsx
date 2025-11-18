/* eslint-disable no-unused-vars */
// src/ChatUI.jsx

import { useState, useEffect, useRef } from "react";
import axios from "axios";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import chatBG from "../assets/chatbg2.jpg";     // watermark image
import parchmentBG from "../assets/parchment2.jpg"; // background
import { GiSpellBook } from "react-icons/gi";



export default function ChatUI() {
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      text: "Hello dear! Ask me anything from Grandma's Bag of Stories.",
    },
  ]);

  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);

  // SESSION ID
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
        { headers: { "session-id": sessionId } }
      );

      const botMessage = { role: "assistant", text: res.data.answer };
      setMessages((prev) => [...prev, botMessage]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          text: "Oh, something went wrong while reaching the server.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen w-full flex items-center justify-center p-6 relative"
      style={{ fontFamily: "'IM Fell English SC', serif" }}
    >
      {/*  BLURRED PARCHMENT BACKGROUND */}
      <div
        className="absolute inset-0 -z-10 bg-cover bg-center opacity-70"
        style={{ backgroundImage: `url(${parchmentBG})`, filter: "blur(2px)" }}
      />

      {/*  VIGNETTE */}
      <div className="absolute inset-0 pointer-events-none -z-10 bg-[radial-gradient(circle,transparent_60%,rgba(0,0,0,0.45)_100%)]" />

      {/* MAIN CHAT CARD */}
      <div className="relative w-full max-w-3xl bg-[#fdf4df] border border-[#c9b284] rounded-[28px] shadow-2xl flex flex-col h-[88vh] overflow-hidden">

        {/*  Soft Circular Watermark Behind Content */}
        <div className="absolute inset-0 flex justify-center items-center pointer-events-none z-0">
          <img
            src={chatBG}
            alt="watermark"
            className="w-48 h-48 rounded-full opacity-70 object-cover"
            style={{ filter: "grayscale(20%) blur(0.5px)" }}
          />
        </div>

        {/* Header */}
<header className="relative z-10 px-6 py-4 bg-[#e7d9b0] border-b border-[#d6c7a1] flex justify-center items-center">
  <h1 className="text-xl font-bold text-[#6B4E2E] flex items-center gap-2">
    <GiSpellBook className="text-2xl text-[#6B4E2E]" />
    Grandma’s Story Assistant
  </h1>
</header>

        {/* MESSAGES */}
        <main className="relative z-10 flex-1 overflow-y-auto px-5 py-5 space-y-5">
          {messages.map((m, idx) => (
            <div key={idx} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
              <div
                className={`max-w-[75%] px-4 py-3 rounded-2xl text-[17px] leading-relaxed shadow 
                ${m.role === "user"
                  ? "bg-[#e7cda8] text-[#4a3620] border border-[#d4b48a]"
                  : "bg-[#fff5df] text-[#4a3620] border border-[#e3cda3]"
                }`}
                style={{ fontFamily: "'Crimson Text', serif" }}
              >
                {m.role === "assistant" && (
                  <div className="flex items-center gap-2 mb-1">
                    <img
                      src="https://cdn-icons-png.flaticon.com/512/6739/6739635.png"
                      className="w-6 h-6 rounded-full bg-[#f7eddc] p-1"
                    />
                    <span className="text-xs font-semibold text-[#775c3b]">Grandma</span>
                  </div>
                )}

                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                  {m.text}
                </ReactMarkdown>
              </div>
            </div>
          ))}

          {loading && (
            <div className="text-[#775c3b] italic px-3 text-sm">Grandma is thinking…</div>
          )}

          <div ref={bottomRef} />
        </main>

        {/* INPUT BAR */}
        <form
          onSubmit={sendMessage}
          className="relative z-10 px-4 py-3 bg-[#e8d7b2] border-t border-[#c9b284] flex gap-3 shadow-inner"
        >
          <input
            className="flex-1 bg-[#fff7e6] border border-[#c9b284] rounded-xl px-4 py-2.5 text-[17px]
            focus:outline-none focus:ring-2 focus:ring-[#b89a6c] shadow-inner"
            placeholder="Ask Grandma a question..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            style={{ fontFamily: "'Crimson Text', serif" }}
          />

          <button
            type="submit"
            disabled={loading}
            className="px-6 py-2 bg-[#5a3e22] text-[#ffe9b3] font-semibold rounded-xl shadow-md 
            hover:bg-[#7b5634] active:scale-95 transition disabled:opacity-40"
            style={{ fontFamily: "'Crimson Text', serif" }}
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
}
