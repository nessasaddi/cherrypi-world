"use client";

import { useState, useRef, useEffect } from "react";

// Option A palette — same brightness as brand kit, ~25-40% less saturation
const C = {
  cherry: "#ef5541",       // full brand kit red — chips, interactive, cursor
  lime: "#c2ca4a",         // desaturated lime — assistant prefix, system ready
  lavender: "#99a3e0",     // desaturated lavender — description, intake text
  text: "#d0d0d0",         // main body text
  dim: "#555",             // labels, timestamps
  dimmer: "#2e2e2e",       // borders, dividers
  bg: "#1a1a1a",
  bgBar: "#222",
};

const CHIPS = [
  "What can Cherry Pi build for me?",
  "Tell me about your capabilities",
  "Show me what you've built",
  "See if we'd be a good fit",
  "I have a project in mind",
];

function parseChips(text: string): { content: string; chips: string[] } {
  const match = text.match(/\[([^\]]+)\]\s*$/);
  if (!match) return { content: text, chips: [] };
  const chips = match[1].split("|").map((s) => s.trim()).filter(Boolean);
  const content = text.slice(0, match.index).trim();
  return { content, chips };
}

const SESSION_KEY = "cp_terminal_session";

function loadSession() {
  try {
    const raw = localStorage.getItem(SESSION_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as {
      phase: "intake" | "chat";
      name: string;
      email: string;
      messages: Array<{ role: string; content: string }>;
      hasInteracted: boolean;
    };
  } catch {
    return null;
  }
}

export default function TerminalChat() {
  const saved = typeof window !== "undefined" ? loadSession() : null;

  const [phase, setPhase] = useState<"intake" | "chat">(saved?.phase ?? "intake");
  const [name, setName] = useState(saved?.name ?? "");
  const [email, setEmail] = useState(saved?.email ?? "");
  const [messages, setMessages] = useState<Array<{ role: string; content: string }>>(saved?.messages ?? []);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [typingText, setTypingText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(saved?.hasInteracted ?? false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const typingRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Persist session on every relevant state change
  useEffect(() => {
    if (phase === "intake" && !name && !email && messages.length === 0) return;
    try {
      localStorage.setItem(SESSION_KEY, JSON.stringify({ phase, name, email, messages, hasInteracted }));
    } catch {}
  }, [phase, name, email, messages, hasInteracted]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typingText]);

  useEffect(() => {
    if (phase === "chat" && inputRef.current) {
      inputRef.current.focus();
    }
  }, [phase, isTyping]);

  const typeText = (text: string, onComplete: () => void) => {
    setIsTyping(true);
    setTypingText("");
    let i = 0;
    if (typingRef.current) clearInterval(typingRef.current);
    typingRef.current = setInterval(() => {
      if (i < text.length) {
        setTypingText(text.slice(0, i + 1));
        i++;
      } else {
        clearInterval(typingRef.current!);
        setIsTyping(false);
        setTypingText("");
        onComplete();
      }
    }, 18);
  };

  const sendMessage = async (content: string) => {
    const userMsg = { role: "user", content };
    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setInput("");
    setLoading(true);
    setHasInteracted(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: newMessages,
          visitorName: name,
          visitorEmail: email,
        }),
      });

      const data = await response.json();
      const assistantText = data.content || "Something went wrong. Try again.";

      setLoading(false);
      typeText(assistantText, () => {
        setMessages((prev) => [...prev, { role: "assistant", content: assistantText }]);
      });
    } catch {
      setLoading(false);
      setMessages((prev) => [...prev, { role: "assistant", content: "Connection lost. Try again." }]);
    }
  };

  const handleIntake = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) return;
    setPhase("chat");
    setMessages([{
      role: "assistant",
      content: `Hey ${name}. You caught us mid-build, but the studio is live and running. Everything you share here goes straight to Vanessa as a project inquiry. What are you working on?`,
    }]);
  };

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || loading || isTyping) return;
    sendMessage(input.trim());
  };

  const handleChip = (text: string) => {
    if (loading || isTyping) return;
    if (text === "Start a new conversation") {
      localStorage.removeItem(SESSION_KEY);
      setPhase("intake");
      setName("");
      setEmail("");
      setMessages([]);
      setInput("");
      setHasInteracted(false);
      return;
    }
    sendMessage(text);
  };

  const now = new Date();
  const ts = now.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", hour12: false });

  return (
    <div
      className="w-full flex flex-col overflow-hidden"
      style={{
        fontFamily: "'JetBrains Mono', 'Fira Code', 'SF Mono', monospace",
        fontSize: 13,
        color: C.text,
        background: C.bg,
        borderRadius: 12,
        border: `1px solid ${C.dimmer}`,
        boxShadow: "0 0 0 1px rgba(168,77,64,0.05), 0 24px 64px rgba(0,0,0,0.5)",
      }}
    >
      {/* Title Bar */}
      <div
        className="flex items-center justify-between px-4 py-3 shrink-0"
        style={{ background: C.bgBar, borderBottom: `1px solid ${C.dimmer}`, borderRadius: "12px 12px 0 0" }}
      >
        <div className="flex items-center gap-2">
          <img src="/favicon.png" alt="" width={14} height={14} style={{ borderRadius: 3, opacity: 0.6 }} />
          <span style={{ color: C.dim, fontSize: 11 }}>cherry-pi ~ terminal</span>
        </div>
        <span style={{ color: "#3a3a3a", fontSize: 10 }}>{ts}</span>
      </div>

      {/* Scanline overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.004) 2px, rgba(255,255,255,0.004) 4px)",
          borderRadius: 12,
          zIndex: 0,
        }}
      />

      {/* Content Area */}
      <div
        className="overflow-y-auto p-4 flex flex-col terminal-scrollbar"
        style={{ position: "relative", zIndex: 1, minHeight: phase === "chat" ? 320 : "auto", maxHeight: phase === "chat" ? 480 : "none" }}
      >
        {phase === "intake" ? (
          <div className="flex flex-col gap-6">
            <div style={{ color: C.dim, fontSize: 11, lineHeight: 1.6 }}>
              <div>Cherry Pi Creative Studio v2.0</div>
              <div style={{ color: C.lime }}>system ready.</div>
            </div>

            <p style={{ color: C.lavender, lineHeight: 1.8, fontSize: 14 }}>
              This is a direct line to Vanessa. Your info and everything you share here gets sent as a project inquiry.
            </p>

            <form onSubmit={handleIntake} className="flex flex-col gap-3">
              <div>
                <label className="block mb-1.5" style={{ color: C.dim, fontSize: 11 }}>name</label>
                <input
                  className="terminal-input"
                  type="text"
                  placeholder="your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div>
                <label className="block mb-1.5" style={{ color: C.dim, fontSize: 11 }}>email</label>
                <input
                  className="terminal-input"
                  type="email"
                  placeholder="you@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <button
                type="submit"
                className="mt-1 py-3 rounded-md transition-all duration-150"
                style={{
                  fontFamily: "inherit",
                  fontSize: 13,
                  background: name.trim() && email.trim() ? C.cherry : "#242424",
                  color: name.trim() && email.trim() ? "#f4f4f4" : C.dim,
                  border: "none",
                  cursor: name.trim() && email.trim() ? "pointer" : "default",
                }}
              >
                connect
              </button>
            </form>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {messages.map((msg, i) => {
              const { content, chips } = msg.role === "assistant"
                ? parseChips(msg.content)
                : { content: msg.content, chips: [] };
              return (
                <div key={i} className="flex flex-col gap-0.5">
                  <span style={{ color: msg.role === "user" ? C.cherry : C.lime, fontSize: 10, letterSpacing: "0.06em", fontWeight: 600 }}>
                    {msg.role === "user" ? `${name.toLowerCase()} $` : "cherry-pi >"}
                  </span>
                  <span className="whitespace-pre-wrap" style={{ color: msg.role === "user" ? "#999" : C.text, lineHeight: 1.7 }}>
                    {content}
                  </span>
                  {chips.length > 0 && !loading && !isTyping && (
                    <div className="flex flex-wrap gap-1.5 mt-2">
                      {chips.map((chip, ci) => (
                        <button key={ci} onClick={() => handleChip(chip)} className="terminal-chip">{chip}</button>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}

            {(loading || isTyping) && (
              <div className="flex flex-col gap-0.5">
                <span style={{ color: C.lime, fontSize: 10, letterSpacing: "0.06em", fontWeight: 600 }}>cherry-pi &gt;</span>
                <span style={{ color: C.text, lineHeight: 1.7 }}>
                  {loading && !isTyping
                    ? <span className="animate-pulse" style={{ color: C.dim }}>processing...</span>
                    : <>{typingText}<span className="terminal-blink" style={{ color: C.cherry }}>_</span></>
                  }
                </span>
              </div>
            )}

            {!hasInteracted && messages.length === 1 && !loading && !isTyping && (
              <div className="flex flex-col gap-2 mt-2 pt-3" style={{ borderTop: `1px solid ${C.dimmer}` }}>
                <span style={{ color: "#3a3a3a", fontSize: 10 }}>suggested topics</span>
                <div className="flex flex-wrap gap-1.5">
                  {CHIPS.map((chip, i) => (
                    <button key={i} onClick={() => handleChip(chip)} className="terminal-chip">{chip}</button>
                  ))}
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        )}
      </div>

      {/* Input Bar */}
      {phase === "chat" && (
        <form
          onSubmit={handleSend}
          className="flex items-center gap-2 shrink-0 px-4 py-3"
          style={{ borderTop: `1px solid ${C.dimmer}`, background: C.bg, position: "relative", zIndex: 1, borderRadius: "0 0 12px 12px" }}
        >
          <span style={{ color: C.cherry, fontSize: 13 }}>$</span>
          <input
            ref={inputRef}
            className="terminal-text-input"
            type="text"
            placeholder={isTyping || loading ? "waiting..." : "type a message"}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={isTyping || loading}
          />
          <button
            type="submit"
            disabled={!input.trim() || isTyping || loading}
            className="bg-transparent border-none p-1 flex transition-colors duration-150 shrink-0"
            style={{ color: input.trim() && !isTyping && !loading ? C.cherry : "#333", cursor: input.trim() && !isTyping && !loading ? "pointer" : "default" }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="22" y1="2" x2="11" y2="13" />
              <polygon points="22 2 15 22 11 13 2 9 22 2" />
            </svg>
          </button>
        </form>
      )}

    </div>
  );
}
