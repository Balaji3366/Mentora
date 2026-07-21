import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { ChatMessage } from "@/types/chat";

type Props = {
  chat: ChatMessage[];
  chatLoading: boolean;
  messagesEndRef: React.RefObject<HTMLDivElement | null>;
};

export default function ChatMessages({
  chat,
  chatLoading,
  messagesEndRef,
}: Props) {
  return (
    <div className="flex-1 overflow-y-auto p-6">
        {chatLoading ? (
            <div className="flex h-full items-center justify-center">
                <div className="flex flex-col items-center gap-4">
                <div className="h-10 w-10 animate-spin rounded-full border-4 border-purple-500 border-t-transparent" />

                <p className="text-sm text-slate-300">
                    Loading conversation...
                </p>
                </div>
            </div>
            ) : (
  <>
    {chat.map((msg, index) => (
        <div
          key={index}
          className={`mb-6 flex ${
            msg.sender === "You" ? "justify-end" : "justify-start"
          }`}
        >
          <div
            className={`flex max-w-[90%] items-end gap-3 ${
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
              <div
                    className="
                        prose
                        prose-invert
                        prose-sm
                        max-w-none
                        prose-headings:text-white
                        prose-p:text-slate-200
                        prose-li:text-slate-200
                        prose-strong:text-white
                        prose-code:text-pink-300
                        prose-pre:bg-transparent
                    "
                    >
                {msg.sender === "AI" && msg.text === "" ? (
  <div className="flex items-center gap-2 text-slate-300">
    <div className="h-2 w-2 animate-bounce rounded-full bg-purple-400"></div>
    <div
      className="h-2 w-2 animate-bounce rounded-full bg-purple-400"
      style={{ animationDelay: "0.15s" }}
    ></div>
    <div
      className="h-2 w-2 animate-bounce rounded-full bg-purple-400"
      style={{ animationDelay: "0.3s" }}
    ></div>

    <span className="ml-2">Analyzing...</span>
  </div>
) : (
  <ReactMarkdown
    remarkPlugins={[remarkGfm]}
    components={{
      code({ className, children, ...props }) {
        const match = /language-(\w+)/.exec(className || "");

        if (match) {
          return (
            <SyntaxHighlighter
              style={oneDark as any}
              language={match[1]}
              PreTag="div"
            >
              {String(children).replace(/\n$/, "")}
            </SyntaxHighlighter>
          );
        }

        return (
          <code
            className="rounded bg-slate-800 px-1 py-0.5 text-pink-300"
            {...props}
          >
            {children}
          </code>
        );
      },
    }}
  >
    {msg.text}
  </ReactMarkdown>
)}
              </div>
            </div>
          </div>
        </div>
      ))}
     
      
      <div ref={messagesEndRef} />
  </>
)}
</div>
);
}