"use client";

import { useState } from "react";

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
      <div className="mx-auto max-w-4xl rounded-2xl bg-white p-8 shadow-lg">
        <h2 className="mb-6 text-center text-4xl font-bold text-gray-900">
          💬 AI Mentor Chat
        </h2>

        {/* Chat Box */}
        <div className="mb-6 h-96 overflow-y-auto rounded-lg border border-gray-300 bg-gray-50 p-4">
          {chat.map((msg, index) => (
            <div
              key={index}
              className={`mb-4 ${
                msg.sender === "You" ? "text-right" : "text-left"
              }`}
            >
              <span
                className={`inline-block max-w-[80%] rounded-xl px-4 py-3 shadow ${
                  msg.sender === "You"
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 text-gray-900"
                }`}
              >
                <strong>{msg.sender}: </strong>
                {msg.text}
              </span>
            </div>
          ))}

          {/* Loading */}
          {loading && (
            <div className="mb-4 text-left">
              <span className="inline-block rounded-xl bg-gray-200 px-4 py-3 font-medium text-gray-900 animate-pulse shadow">
                🤖 Thinking...
              </span>
            </div>
          )}
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