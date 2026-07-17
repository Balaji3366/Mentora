import { Trash2 } from "lucide-react";



type ChatSession = {
  id: string;
  title: string;
  created_at: string;
};

type Props = {
  sessions: ChatSession[];
  onDeleteClick: (chat: ChatSession) => void;
};

export default function ChatSidebar({
  sessions,
  onDeleteClick,
}: Props) {
  return (
    <aside className="flex h-full w-80 flex-col rounded-3xl border border-white/10 bg-white/10 p-5 shadow-2xl backdrop-blur-2xl">

      {/* New Chat */}
      <button className="mb-6 w-full rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-600 py-3 font-semibold text-white transition hover:scale-[1.02]">
        + New Chat
      </button>

      {/* Heading */}
      <h3 className="mb-4 text-xl font-bold text-white">
        Recent Chats
      </h3>

      {/* Chat List */}
      <div
        className="flex-1 overflow-y-auto pr-2 space-y-3"
        style={{ maxHeight: "calc(88vh - 180px)" }}
        >
        {sessions.length === 0 ? (
          <div className="mt-10 text-center text-slate-400">
            No chats yet
          </div>
        ) : (
          sessions.map((session) => (
            <button
              key={session.id}
              className="w-full rounded-2xl border border-white/10 bg-white/5 p-4 text-left transition-all duration-300 hover:border-purple-500 hover:bg-white/10"
            >
              <div className="flex items-center justify-between">
                <span className="truncate text-sm font-semibold text-white">
                    💬 {session.title}
                </span>

                <Trash2
                    size={16}
                    className="cursor-pointer text-slate-400 transition hover:text-red-500"
                    onClick={(e) => {
                        e.stopPropagation();
                        console.log("Delete clicked", session);
                        onDeleteClick(session);
                    }}
                    />
                </div>

              <p className="mt-1 text-xs text-slate-400">
                {new Date(session.created_at).toLocaleDateString()}
              </p>
            </button>
          ))
        )}
      </div>

      {/* Footer */}
      <div className="mt-5 rounded-2xl border border-white/10 bg-white/5 p-4">
        <p className="text-sm font-semibold text-white">
          Mentora AI
        </p>

        <p className="text-xs text-slate-400">
          Personal Career Mentor
        </p>
      </div>
    
    </aside>
  );
}