"use client";

import { useState } from "react";

export type ChatMessage = {
  sender: "AI" | "You";
  text: string;
};

export type ChatSession = {
  id: string;
  title: string;
  created_at: string;
};

export default function useChat() {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const [sessions, setSessions] = useState<ChatSession[]>([]);
  const [sessionId, setSessionId] = useState<string | null>(null);

  const [chat, setChat] = useState<ChatMessage[]>([
    {
      sender: "AI",
      text: "👋 Hello Balaji! I'm your AI Mentor. How can I help you today?",
    },
  ]);
  async function loadSessions() {
    try {
      const res = await fetch("/api/chat/sessions");
      const data = await res.json();
      console.log(data);
      setSessions(data);
    } catch (err) {
      console.error(err);
    }
  }
  return {
    message,
    setMessage,

    loading,
    setLoading,

    chat,
    setChat,

    sessions,
    setSessions,

    sessionId,
    setSessionId,

    loadSessions,
  };
}