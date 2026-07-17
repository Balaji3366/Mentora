type Props = {
  message: string;
  loading: boolean;
  setMessage: (value: string) => void;
  sendMessage: () => void;
};

export default function ChatInput({
  message,
  loading,
  setMessage,
  sendMessage,
}: Props) {
  return (
    <div className="border-t border-white/10 bg-black/20 p-5 backdrop-blur-xl">
      <div className="flex items-center gap-4">
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
          className="flex-1 rounded-2xl border border-white/10 bg-white/10 px-5 py-4 text-white placeholder:text-slate-400 outline-none backdrop-blur-xl focus:border-purple-500"
        />

        <button
  onClick={sendMessage}
  disabled={loading}
  className="flex min-w-[120px] items-center justify-center rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-600 px-6 py-4 font-semibold text-white transition hover:scale-105 disabled:cursor-not-allowed disabled:opacity-70"
>
            {loading ? (
                <div className="flex items-center gap-1">
                <span className="h-2.5 w-2.5 animate-bounce rounded-full bg-white"></span>

                <span
                    className="h-2.5 w-2.5 animate-bounce rounded-full bg-white"
                    style={{ animationDelay: "0.15s" }}
                ></span>

                <span
                    className="h-2.5 w-2.5 animate-bounce rounded-full bg-white"
                    style={{ animationDelay: "0.3s" }}
                ></span>
                </div>
            ) : (
                "Send"
            )}
            </button>
      </div>
    </div>
  );
}