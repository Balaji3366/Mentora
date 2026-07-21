export type ChatMessage = {
  sender: "AI" | "You";
  text: string;
};

export type ChatSession = {
  id: string;
  title: string;
  created_at: string;
};