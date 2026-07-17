"use client";

import { useEffect, useRef, useState } from "react";
import BackButton from "@/components/BackButton";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";

type ChatMessage = {
  sender: "AI" | "You";
  text: string;
};

export default function AIChat() {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const [chat, setChat] = useState<ChatMessage[]>([
    
    {
      sender: "AI",
      text: "👋 Hello Balaji! I'm your AI Mentor. How can I help you today?",
    },
  ]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
  messagesEndRef.current?.scrollIntoView({
    behavior: "smooth",
  });
}, [chat, loading]);
  const sendMessage = async () => {
    if (!message.trim() || loading) return;

    const userMessage = message;

    setChat((prev) => [
      ...prev,
      {
        sender: "You",
        text: userMessage,
      },
    ]);

    setMessage("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: userMessage,
          history: chat,
        }),
      });
      const data = await res.json();

      

      setChat((prev) => [
        ...prev,
        {
          sender: "AI",
          text: data.reply,
        },
      ]);
    } catch (error) {
      console.error(error);

      setChat((prev) => [
        ...prev,
        {
          sender: "AI",
          text: "❌ Something went wrong.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    
    <section className="bg-gray-50 py-20 px-6">
      <div className="mb-8">
  <div className="mx-auto mb-8 max-w-4xl">
  <BackButton />
</div>
</div>
      <div className="mx-auto max-w-4xl rounded-2xl bg-white p-8 shadow-lg">
        <div className="mb-8 text-center">
  <div className="mb-3 text-6xl">🤖</div>

  <h2 className="text-4xl font-extrabold text-gray-900">
    AI Mentor
  </h2>

  <p className="mt-3 text-lg text-gray-500">
    Your personal AI mentor for coding, learning,
    interview preparation and career guidance.
  </p>
</div>

        {/* Chat Box */}
        <div className="mb-6 h-[500px] overflow-y-auto rounded-2xl border border-slate-200 bg-slate-50 p-6">
         {chat.map((msg, index) => (
        <div
        key={index}
        className={`mb-6 flex ${
          msg.sender === "You" ? "justify-end" : "justify-start"
        }`}
      >
        <div
      className={`flex items-end gap-3 max-w-[80%] ${
        msg.sender === "You" ? "flex-row-reverse ml-auto" : ""
      }`}
    >
      <div
        className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full shadow-md ${
          msg.sender === "You"
            ? "bg-gradient-to-br from-blue-500 to-indigo-600 text-white"
            : "bg-gradient-to-br from-cyan-500 to-blue-600 text-white"
        }`}
      >
        {msg.sender === "You" ? "👤" : "🤖"}
      </div>

      <div
        className={`inline-block max-w-full rounded-2xl px-5 py-3 shadow-md ${
          msg.sender === "You"
            ? "bg-blue-600 text-white"
            : "border border-gray-200 bg-white text-gray-900"
        }`}
      >
       
        <div className="prose prose-sm max-w-none prose-headings:text-slate-900 prose-p:text-slate-700 prose-li:text-slate-700 prose-code:text-pink-600">
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          components={{
            code({ className, children, ...props }) {
              const match = /language-(\w+)/.exec(className || "");

              return match ? (
                <SyntaxHighlighter
                  style={oneDark as any}
                  language={match[1]}
                  PreTag="div"
                >
                  {String(children).replace(/\n$/, "")}
                </SyntaxHighlighter>
              ) : (
                <code
                    className="rounded bg-gray-200 px-1 py-0.5 text-pink-600"
                  >
                  {children}
                </code>
              );
            },
          }}
        >
          {msg.text}
        </ReactMarkdown>
      </div>
      </div>
    </div>
  </div>
))}

          {/* Loading */}
          {loading && (
          <div className="mb-6 flex justify-start">
            <div className="flex items-end gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 text-white shadow-md">
                🤖
              </div>

              <div className="flex items-center gap-1 rounded-2xl border border-gray-200 bg-white px-5 py-4 shadow-md">
                <span className="h-2 w-2 animate-bounce rounded-full bg-gray-500"></span>
                <span
                  className="h-2 w-2 animate-bounce rounded-full bg-gray-500"
                  style={{ animationDelay: "0.2s" }}
                ></span>
                <span
                  className="h-2 w-2 animate-bounce rounded-full bg-gray-500"
                  style={{ animationDelay: "0.4s" }}
                ></span>
              </div>
            </div>
          </div>
        )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="flex gap-4">
          <input
            type="text"
            placeholder="Ask your AI Mentor..."
            value={message}
            disabled={loading}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                sendMessage();
              }
            }}
            className="flex-1 rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-900 placeholder:text-gray-500 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100 disabled:text-gray-500"
          />

          <button
            onClick={sendMessage}
            disabled={loading}
            className="rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-gray-400"
          >
            {loading ? "Thinking..." : "Send"}
          </button>
        </div>
      </div>
    </section>
  );
}