"use client";

import { useState, useRef, useEffect } from "react";

const C = {
  cherry: "#ef5541",
  lime: "#6b6",
  text: "#d0d0d0",
  dim: "#666",
  dimmer: "#2a2a2a",
  bg: "#1a1a1a",
  bgBar: "#1f1f1f",
  bubble: "#252525",
};

const CHIPS = [
  "I'm building ",
  "My company needs ",
  "We're missing a system for ",
  "I want to automate ",
  "Our biggest challenge is ",
];

function parseChips(text: string): { content: string; chips: string[] } {
  const match = text.match(/\[([^\]]+)\]\s*$/);
  if (!match) return { content: text, chips: [] };
  const chips = match[1].split("|").map((s) => s.trim()).filter(Boolean);
  const content = text.slice(0, match.index).trim();
  return { content, chips };
}

const SESSION_KEY = "cp_terminal_session";
const SESSION_VERSION = 1;
const SESSION_EXPIRY_MS = 7 * 24 * 60 * 60 * 1000;

function loadSession() {
  try {
    const raw = localStorage.getItem(SESSION_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as {
      version: number;
      savedAt: number;
      phase: "intake" | "chat";
      name: string;
      email: string;
      messages: Array<{ role: string; content: string }>;
      hasInteracted: boolean;
    };
    if (parsed.version !== SESSION_VERSION) return null;
    if (Date.now() - parsed.savedAt > SESSION_EXPIRY_MS) return null;
    return parsed;
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

  useEffect(() => {
    if (phase === "intake" && !name && !email && messages.length === 0) return;
    try {
      localStorage.setItem(SESSION_KEY, JSON.stringify({ version: SESSION_VERSION, savedAt: Date.now(), phase, name, email, messages, hasInteracted }));
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
    setInput(text);
    setTimeout(() => inputRef.current?.focus(), 0);
  };

  const handleSuggestedChip = (text: string) => {
    if (loading || isTyping) return;
    setInput(text);
    setTimeout(() => inputRef.current?.focus(), 0);
  };

  return (
    <div
      className="w-full flex flex-col overflow-hidden"
      style={{
        fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
        fontSize: 13,
        color: C.text,
        background: C.bg,
        borderRadius: 16,
        border: `1px solid ${C.dimmer}`,
        boxShadow: "0 24px 64px rgba(0,0,0,0.5)",
      }}
    >
      {/* Header */}
      <div
        className="flex items-center gap-2.5 px-5 py-3.5 shrink-0"
        style={{ background: C.bgBar, borderBottom: `1px solid ${C.dimmer}`, borderRadius: "16px 16px 0 0" }}
      >
        <div style={{ width: 8, height: 8, background: C.cherry, borderRadius: "50%" }} />
        <span style={{ color: "#999", fontSize: 12, fontWeight: 500 }}>Cherry Pi</span>
      </div>

      {/* Content Area */}
      <div
        className="overflow-y-auto py-5 px-[25px] flex flex-col terminal-scrollbar"
        style={{ position: "relative", zIndex: 1, minHeight: phase === "chat" ? 320 : "auto", maxHeight: phase === "chat" ? 480 : "none" }}
      >
        {phase === "intake" ? (
          <div className="flex flex-col gap-5">
            <p style={{ color: "#bbb", lineHeight: 1.7, fontSize: 14 }}>
              Ask about a project, explore capabilities, or tell us what you&apos;re building. All conversations go straight to Vanessa as a project inquiry.
            </p>

            <form onSubmit={handleIntake} className="flex flex-col gap-3">
              <div>
                <label className="block mb-1.5" style={{ color: C.dim, fontSize: 11, fontWeight: 500 }}>Name</label>
                <input
                  className="terminal-input"
                  type="text"
                  placeholder="Your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div>
                <label className="block mb-1.5" style={{ color: C.dim, fontSize: 11, fontWeight: 500 }}>Email</label>
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
                className="mt-2 py-3 transition-all duration-150"
                style={{
                  fontFamily: "inherit",
                  fontSize: 13,
                  fontWeight: 500,
                  background: name.trim() && email.trim() ? C.cherry : "#242424",
                  color: name.trim() && email.trim() ? "#fff" : C.dim,
                  border: "none",
                  borderRadius: 10,
                  cursor: name.trim() && email.trim() ? "pointer" : "default",
                }}
              >
                Start conversation
              </button>
            </form>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {messages.map((msg, i) => {
              const { content, chips } = msg.role === "assistant"
                ? parseChips(msg.content)
                : { content: msg.content, chips: [] };
              const isUser = msg.role === "user";
              return (
                <div key={i} className="flex flex-col gap-1" style={{ alignItems: isUser ? "flex-end" : "flex-start" }}>
                  <span style={{ color: isUser ? C.cherry : C.lime, fontSize: 10, fontWeight: 600, letterSpacing: "0.03em", padding: "0 4px" }}>
                    {isUser ? name : "Cherry Pi"}
                  </span>
                  <div
                    className="whitespace-pre-wrap"
                    style={{
                      background: isUser ? C.cherry : C.bubble,
                      color: isUser ? "#fff" : C.text,
                      padding: "10px 14px",
                      borderRadius: 16,
                      borderBottomLeftRadius: isUser ? 16 : 4,
                      borderBottomRightRadius: isUser ? 4 : 16,
                      maxWidth: "85%",
                      lineHeight: 1.55,
                      fontSize: 13,
                    }}
                  >
                    {content}
                  </div>
                  {chips.length > 0 && !loading && !isTyping && (
                    <div className="flex flex-wrap gap-1.5 mt-1.5" style={{ maxWidth: "85%" }}>
                      {chips.map((chip, ci) => (
                        <button key={ci} onClick={() => handleChip(chip)} className="terminal-chip">{chip}</button>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}

            {(loading || isTyping) && (
              <div className="flex flex-col gap-1" style={{ alignItems: "flex-start" }}>
                <span style={{ color: C.lime, fontSize: 10, fontWeight: 600, letterSpacing: "0.03em", padding: "0 4px" }}>Cherry Pi</span>
                <div
                  style={{
                    background: C.bubble,
                    padding: "10px 14px",
                    borderRadius: 16,
                    borderBottomLeftRadius: 4,
                    maxWidth: "85%",
                    lineHeight: 1.55,
                    fontSize: 13,
                  }}
                >
                  {loading && !isTyping
                    ? <span className="animate-pulse" style={{ color: C.dim }}>thinking...</span>
                    : <>{typingText}<span className="terminal-blink" style={{ color: C.cherry }}>_</span></>
                  }
                </div>
              </div>
            )}

            {!hasInteracted && messages.length === 1 && !loading && !isTyping && (
              <div className="flex flex-col gap-2 mt-2 pt-3" style={{ borderTop: `1px solid ${C.dimmer}` }}>
                <span style={{ color: "#444", fontSize: 10 }}>start typing — or pick a prompt below</span>
                <div className="flex flex-wrap gap-1.5">
                  {CHIPS.map((chip, i) => (
                    <button key={i} onClick={() => handleSuggestedChip(chip)} className="terminal-chip">{chip}</button>
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
          className="flex items-center gap-2.5 shrink-0 px-4 py-3"
          style={{ borderTop: `1px solid ${C.dimmer}`, background: C.bg, position: "relative", zIndex: 1, borderRadius: "0 0 16px 16px" }}
        >
          <input
            ref={inputRef}
            className="terminal-text-input"
            type="text"
            placeholder={isTyping || loading ? "waiting..." : "Type a message"}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={isTyping || loading}
          />
          <button
            type="submit"
            disabled={!input.trim() || isTyping || loading}
            className="shrink-0 flex items-center justify-center transition-all duration-150"
            style={{
              width: 32,
              height: 32,
              borderRadius: "50%",
              background: input.trim() && !isTyping && !loading ? C.cherry : "#333",
              border: "none",
              color: "#fff",
              cursor: input.trim() && !isTyping && !loading ? "pointer" : "default",
            }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="22" y1="2" x2="11" y2="13" />
              <polygon points="22 2 15 22 11 13 2 9 22 2" />
            </svg>
          </button>
        </form>
      )}
    </div>
  );
}
