"use client";

import { useEffect, useRef, useState } from "react";
import DeleteChatModal from "@/components/DeleteChatModal";
import BackButton from "@/components/BackButton";
import ChatSidebar from "@/components/ChatSidebar";
import ChatHeader from "@/components/ChatHeader";
import ChatMessages from "@/components/ChatMessages";
import ChatInput from "@/components/ChatInput";

type ChatMessage = {
  sender: "AI" | "You";
  text: string;
};

type ChatSession = {
  id: string;
  title: string;
  created_at: string;
};

export default function AIChat() {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const [sessions, setSessions] = useState<ChatSession[]>([]);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [selectedChat, setSelectedChat] =
  useState<ChatSession | null>(null);

  const [chat, setChat] = useState<ChatMessage[]>([
    {
      sender: "AI",
      text: "👋 Hello Balaji! I'm your AI Mentor. How can I help you today?",
    },
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    loadSessions();
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [chat, loading]);

  async function loadSessions() {
    try {
      const res = await fetch("/api/chat/sessions");
      const data = await res.json();

      setSessions(data);
    } catch (err) {
      console.error(err);
    }
  }

  async function sendMessage() {
  if (!message.trim() || loading) return;

  const userMessage = message;

  // Add user message
  setChat((prev) => [
  ...prev,
  {
    sender: "You",
    text: userMessage,
  },
  {
    sender: "AI",
    text: "",
  },
]);

  try {
    const res = await fetch("/api/chat/stream", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message: userMessage,
        history: chat,
        sessionId,
      }),
    });

    if (!res.body) {
      throw new Error("No response body");
    }

    const reader = res.body.getReader();
    const decoder = new TextDecoder();

    let buffer = "";

    while (true) {
      const { value, done } = await reader.read();

      if (done) break;

      buffer += decoder.decode(value, { stream: true });

      const events = buffer.split("\n\n");
      buffer = events.pop() || "";

      for (const event of events) {
        const lines = event.split("\n");

        const eventName = lines
          .find((l) => l.startsWith("event:"))
          ?.replace("event:", "")
          .trim();

        const dataLine = lines
          .find((l) => l.startsWith("data:"))
          ?.replace("data:", "")
          .trim();

        if (!eventName || !dataLine) continue;

        const data = JSON.parse(dataLine);

        switch (eventName) {
          case "session":
            if (!sessionId && data.sessionId) {
              setSessionId(data.sessionId);
              loadSessions();
            }
            break;

          case "chunk":
            setChat((prev) => {
              const updated = [...prev];

              for (let i = updated.length - 1; i >= 0; i--) {
                if (updated[i].sender === "AI") {
                  updated[i] = {
                    ...updated[i],
                    text: updated[i].text + data.text,
                  };
                  break;
                }
              }

              return updated;
            });
            break;

          case "done":
            setLoading(false);
            break;
        }
      }
    }
  } catch (err) {
    console.error(err);

    setChat((prev) => [
      ...prev,
      {
        sender: "AI",
        text: "❌ Something went wrong.",
      },
    ]);

    setLoading(false);
  }
}


  async function handleDelete(id: string) {
    try {
      const res = await fetch(`/api/chat/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        throw new Error("Failed to delete chat");
      }

      setSessions((prev) => prev.filter((chat) => chat.id !== id));

      if (sessionId === id) {
        setSessionId(null);

        setChat([
          {
            sender: "AI",
            text: "👋 Hello Balaji! I'm your AI Mentor. How can I help you today?",
          },
        ]);
      }
    } catch (error) {
      console.error(error);
      alert("Failed to delete chat.");
    }
  }

  return (
  <>
    <section className="min-h-screen bg-gradient-to-br from-slate-950 via-indigo-950 to-purple-950 px-8 py-8">
      <div className="mb-6">
        <BackButton />
      </div>

      <div className="mx-auto flex h-[88vh] max-w-7xl gap-8">
        {/* Sidebar */}
        <ChatSidebar
        sessions={sessions}
        onDeleteClick={(chat) => {
          console.log("AIChat received:", chat);
          setSelectedChat(chat);
        }}
      />

        {/* Chat Window */}
        <div className="flex flex-1 flex-col overflow-hidden rounded-3xl border border-white/10 bg-white/10 shadow-2xl backdrop-blur-2xl">
          {/* Header */}
          <ChatHeader />

          {/* Messages */}
          <ChatMessages
            chat={chat}
            loading={loading}
            messagesEndRef={messagesEndRef}
          />
          {/* Input */}
          <ChatInput
            message={message}
            loading={loading}
            setMessage={setMessage}
            sendMessage={sendMessage}
          />
        </div>
      </div>
    </section>

    <DeleteChatModal
      open={selectedChat !== null}
      title={selectedChat?.title ?? ""}
      onCancel={() => setSelectedChat(null)}
      onConfirm={() => {
        if (selectedChat) {
          handleDelete(selectedChat.id);
        }
        setSelectedChat(null);
      }}
    />
  </>
);
}