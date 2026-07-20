"use client";
import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, Sparkles, Loader2, LogIn, Store } from "lucide-react";
import { authClient } from "../lib/auth-client";
import Link from "next/link";

interface Message {
  role: "user" | "assistant";
  content: string;
}

export default function ChatWidget() {
  const { data: session } = authClient.useSession();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const userRole = (session?.user as any)?.role as "customer" | "restaurant" | undefined;

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages]);

  const getWelcomeMessage = () =>
    userRole === "restaurant"
      ? "👋 Hello! How can I help with your restaurant today?"
      : "👋 Hi! Ask me about menu, orders, or anything.";

const sendMessage = async () => {
    if (!input.trim() || loading) return;

    if (!session?.user) {
      setMessages(prev => [...prev, 
        { role: "user", content: input },
        { role: "assistant", content: "Please log in first to use the AI chat." }
      ]);
      setInput("");
      return;
    }

    const userMsg = input.trim();
    setMessages(prev => [...prev, { role: "user", content: userMsg }]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("https://foodie-zone-backend.vercel.app/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: session.user.id,
          message: userMsg,
        }),
      });

      const data = await res.json();
      console.log(data)

      if (!res.ok) throw new Error(data.error || "Server error");

      setMessages(prev => [...prev, { role: "assistant", content: data.reply }]);

    } catch (err) {
      console.error("Chat Error:", err);
      setMessages(prev => [...prev, { role: "assistant", content: "Sorry, something went wrong. Please try again." }]);
    } finally {
      setLoading(false);
    }
};

  return (
    <>
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-gradient-to-br from-emerald-500 to-amber-500 flex items-center justify-center shadow-2xl hover:scale-110 transition"
        >
          <MessageCircle size={26} className="text-neutral-950" />
        </button>
      )}

      {isOpen && (
        <div className="fixed bottom-6 right-6 z-50 w-[92vw] max-w-md h-[620px] flex flex-col bg-neutral-900 border border-white/10 rounded-3xl shadow-2xl overflow-hidden">
          <div className="h-14 border-b border-white/10 bg-white/5 flex items-center justify-between px-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-emerald-500 to-amber-500 flex items-center justify-center">
                {userRole === "restaurant" ? <Store size={18} className="text-black" /> : <Sparkles size={18} className="text-black" />}
              </div>
              <div>
                <p className="text-white font-semibold">CravingByte AI</p>
                <p className="text-xs text-neutral-500 capitalize">{userRole || "Customer"}</p>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-neutral-400 hover:text-white">
              <X size={20} />
            </button>
          </div>

          <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar">
            {!session?.user && (
              <div className="text-center py-12">
                <LogIn className="w-12 h-12 mx-auto text-amber-400 mb-4" />
                <p className="text-white">Please log in to chat</p>
                <Link href="/login" className="mt-4 inline-block bg-emerald-600 hover:bg-emerald-500 px-6 py-2.5 rounded-xl text-sm">
                  Login Now
                </Link>
              </div>
            )}

            {session?.user && messages.length === 0 && (
              <div className="text-center text-neutral-400 py-8">{getWelcomeMessage()}</div>
            )}

            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                <div className={`max-w-[85%] px-4 py-3 rounded-2xl text-sm whitespace-pre-wrap ${
                  msg.role === "user"
                    ? "bg-emerald-600 text-white"
                    : "bg-white/5 border border-white/10 text-neutral-200"
                }`}>
                  {msg.content || <span className="opacity-50">Thinking...</span>}
                </div>
              </div>
            ))}

            {loading && messages.length > 0 && (
              <div className="flex justify-start">
                <div className="bg-white/5 border border-white/10 px-4 py-3 rounded-2xl text-neutral-400 text-sm">
                  AI is thinking...
                </div>
              </div>
            )}
          </div>

          <div className="p-4 border-t border-white/10 bg-neutral-950/80">
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                placeholder={userRole === "restaurant" ? "Ask about orders..." : "Ask me anything about food..."}
                disabled={loading}
                className="flex-1 bg-neutral-800 border border-white/10 rounded-2xl px-4 py-3 text-sm focus:border-emerald-500 outline-none"
              />
              <button
                onClick={sendMessage}
                disabled={loading || !input.trim()}
                className="w-11 h-11 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 rounded-2xl flex items-center justify-center transition"
              >
                {loading ? <Loader2 size={18} className="animate-spin" /> : <Send size={18} />}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}