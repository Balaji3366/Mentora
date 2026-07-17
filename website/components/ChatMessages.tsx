import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";

type ChatMessage = {
  sender: "AI" | "You";
  text: string;
};

type Props = {
  chat: ChatMessage[];
  loading: boolean;
  messagesEndRef: React.RefObject<HTMLDivElement | null>;
};

export default function ChatMessages({
  chat,
  loading,
  messagesEndRef,
}: Props) {
  return (
    <div className="flex-1 overflow-y-auto p-6">
      {chat.map((msg, index) => (
        <div
          key={index}
          className={`mb-6 flex ${
            msg.sender === "You" ? "justify-end" : "justify-start"
          }`}
        >
          <div
            className={`flex max-w-[80%] items-end gap-3 ${
              msg.sender === "You"
                ? "ml-auto flex-row-reverse"
                : ""
            }`}
          >
            <div
              className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-white shadow-md ${
                msg.sender === "You"
                  ? "bg-gradient-to-br from-blue-500 to-indigo-600"
                  : "bg-gradient-to-br from-purple-600 to-indigo-600"
              }`}
            >
              {msg.sender === "You" ? "👤" : "✨"}
            </div>

            <div
               className={`rounded-2xl px-5 py-3 shadow-lg ${
                msg.sender === "You"
                    ? "bg-gradient-to-r from-purple-600 to-indigo-600 text-white"
                    : "border border-white/10 bg-white/10 text-white backdrop-blur-xl"
                }`}
            >
              <div className="prose prose-sm max-w-none
                prose-headings:text-slate-900
                prose-p:text-slate-800
                prose-li:text-slate-800
                prose-strong:text-slate-900
                prose-code:text-pink-600">
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  components={{
                    code({ className, children }) {
                      const match = /language-(\w+)/.exec(
                        className || ""
                      );

                      return match ? (
                        <SyntaxHighlighter
                          style={oneDark as any}
                          language={match[1]}
                          PreTag="div"
                        >
                          {String(children).replace(/\n$/, "")}
                        </SyntaxHighlighter>
                      ) : (
                        <code className="rounded bg-slate-800 px-1 py-0.5 text-pink-300">
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
     
      
      <div ref={messagesEndRef} />
    </div>
  );
}