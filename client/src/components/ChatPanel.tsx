import { Paperclip, RefreshCcw, Send } from "lucide-react";
import { useState } from "react";

export default function ChatPanel() {
    const [messages, setMessages] = useState([
      { from: "bot", text: "Hi! What can I help you with?" },
    ]);
    const [input, setInput] = useState("");
  
    const handleSend = () => {
      if (!input.trim()) return;
      setMessages([...messages, { from: "user", text: input }]);
      setInput("");
      setTimeout(() => {
        setMessages((msgs) => [...msgs, { from: "bot", text: "Sure! Let me check that for you." }]);
      }, 500);
    };
  
    return (
      <div className="flex flex-col w-full h-full rounded-xl border shadow-md bg-white dark:bg-zinc-900">
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b">
          <div className="font-semibold text-sm">Rithik-resume.pdf</div>
          <button className="text-gray-500 hover:text-black">
            <RefreshCcw size={18} />
          </button>
        </div>
  
        {/* Main layout with messages at top and input at bottom */}
        <div className="flex flex-col justify-between h-full">
          {/* Messages area */}
          <div className="flex-1 p-4 overflow-y-auto">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`mb-4 ${msg.from === "user" ? "text-right" : "text-left"}`}
              >
                <span
                  className={`inline-block px-4 py-2 text-sm rounded-lg ${
                    msg.from === "bot"
                      ? "bg-gray-100 text-black"
                      : "bg-blue-500 text-white"
                  }`}
                >
                  {msg.text}
                </span>
              </div>
            ))}
          </div>
  
          {/* Input area - fixed at bottom */}
          <div className="mt-auto border-t p-4">
            <div className="flex items-center gap-2">
              <button className="text-gray-400 hover:text-black">
                <Paperclip size={20} />
              </button>
              <input
                className="flex-1 px-3 py-2 text-sm border rounded-full outline-none"
                placeholder="Message..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
              />
              <button onClick={handleSend} className="text-gray-600 hover:text-black">
                <Send size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
  