"use client";
import { useEffect, useRef, useState } from "react";
import { MAX_HISTORY, type HistoryMessage, type Source } from "@/lib/chat";
import { readChatResponse } from "@/lib/chat-stream";
type Message = {
  role: "user" | "assistant" | "error";
  text: string;
  sources?: Source[];
  refused?: boolean;
  question?: string;
  history?: HistoryMessage[];
};
const suggestions = [
  "What has he built with LangGraph?",
  "Has he worked at Google?",
  "What stack does Rainbow Advertising use?",
];

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const [slow, setSlow] = useState(false);
  const [draft, setDraft] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const launcherRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const wasOpen = useRef(false);
  const controller = useRef<AbortController | null>(null);
  const historyRef = useRef<HistoryMessage[]>([]);
  const returnFocus = useRef<HTMLElement | null>(null);

  useEffect(() => {
    function launch(event: Event) {
      returnFocus.current = document.activeElement as HTMLElement;
      const detail: unknown = (event as CustomEvent).detail;
      if (typeof detail === "string") setInput(detail.slice(0, 500));
      setOpen(true);
      window.requestAnimationFrame(() => {
        inputRef.current?.focus({ preventScroll: true });
        if (window.matchMedia("(max-width: 639px)").matches)
          panelRef.current?.scrollIntoView({ block: "center" });
      });
    }
    window.addEventListener("portfolio:ask", launch);
    return () => {
      window.removeEventListener("portfolio:ask", launch);
      controller.current?.abort();
    };
  }, []);
  useEffect(() => {
    if (open) {
      inputRef.current?.focus({ preventScroll: true });
      if (window.matchMedia("(max-width: 639px)").matches)
        panelRef.current?.scrollIntoView({ block: "center" });
    } else if (wasOpen.current) {
      if (returnFocus.current?.isConnected) returnFocus.current.focus();
      else launcherRef.current?.focus();
    }
    wasOpen.current = open;
  }, [open]);
  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages, busy, draft]);

  function clearChat() {
    controller.current?.abort();
    controller.current = null;
    historyRef.current = [];
    setMessages([]);
    setInput("");
    setBusy(false);
    setSlow(false);
    setDraft("");
    inputRef.current?.focus();
  }
  async function ask(question: string, retry?: Message) {
    question = question.trim();
    if (!question || question.length > 500 || controller.current) return;
    const history = retry?.history ?? historyRef.current;
    const request = new AbortController();
    inputRef.current?.focus({ preventScroll: true });
    controller.current = request;
    setMessages((m) =>
      retry
        ? m.filter((item) => item !== retry)
        : [...m, { role: "user", text: question }],
    );
    setInput("");
    setBusy(true);
    setSlow(false);
    setDraft("");
    const slowTimer = window.setTimeout(() => {
      if (controller.current === request) setSlow(true);
    }, 6000);
    const timeout = window.setTimeout(() => request.abort(), 75000);
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/x-ndjson",
        },
        body: JSON.stringify({ question, history }),
        signal: request.signal,
      });
      const data = await readChatResponse(res, (text) => {
        if (controller.current === request) setDraft(text);
      });
      if (controller.current !== request) return;
      if (!res.ok || data.error)
        setMessages((m) => [
          ...m,
          {
            role: "error",
            text:
              data.error || "The assistant is unavailable. Please try again.",
            question,
            history,
          },
        ]);
      else if (typeof data.answer !== "string" || !Array.isArray(data.sources))
        throw new Error("Invalid response");
      else {
        setMessages((m) => [
          ...m,
          {
            role: "assistant",
            text: data.answer,
            sources: data.sources,
            refused: data.refused,
          },
        ]);
        historyRef.current = [
          ...history,
          { role: "user" as const, text: question },
          { role: "assistant" as const, text: data.answer.slice(0, 2000) },
        ].slice(-MAX_HISTORY);
      }
    } catch {
      if (controller.current === request)
        setMessages((m) => [
          ...m,
          {
            role: "error",
            text: "The request couldn't finish. Please check your connection and try again.",
            question,
            history,
          },
        ]);
    } finally {
      window.clearTimeout(slowTimer);
      window.clearTimeout(timeout);
      if (controller.current === request) {
        controller.current = null;
        setBusy(false);
        setSlow(false);
        setDraft("");
      }
    }
  }
  return (
    <>
      {!open && (
        <button
          ref={launcherRef}
          className="chat-launcher"
          aria-haspopup="dialog"
          onClick={() => {
            returnFocus.current = null;
            setOpen(true);
          }}
        >
          <span className="chat-launch-icon" aria-hidden="true">
            ✳
          </span>{" "}
          Talk to Ashish <span aria-hidden="true">↗</span>
        </button>
      )}
      {open && (
        <div
          ref={panelRef}
          className="chat-panel"
          role="dialog"
          aria-labelledby="chat-title"
          onKeyDown={(e) => {
            if (e.key === "Escape") setOpen(false);
          }}
        >
          <div className="chat-header">
            <div className="chat-avatar" aria-hidden="true">
              as.
            </div>
            <div className="chat-heading">
              <h2 id="chat-title">Talk to Ashish</h2>
              <p>
                <span className="status-dot" /> Answers from my documents
              </p>
            </div>
            <button
              className="chat-icon-button"
              onClick={clearChat}
              aria-label="Clear conversation"
              title="Clear conversation"
            >
              ↺
            </button>
            <button
              className="chat-icon-button"
              onClick={() => setOpen(false)}
              aria-label="Close chat"
            >
              ×
            </button>
          </div>
          <div
            ref={scrollRef}
            className="chat-messages"
            role="log"
            aria-label="Conversation"
            aria-live="polite"
          >
            {messages.length === 0 && (
              <div className="chat-welcome">
                <span className="eyebrow">START ANYWHERE</span>
                <h3>
                  A little more than
                  <br />a résumé.
                </h3>
                <p>
                  Ask about a project, a skill, or my background. Open a source
                  to read the evidence behind an answer.
                </p>
                <div className="chat-suggestions">
                  {suggestions.map((s) => (
                    <button key={s} onClick={() => ask(s)}>
                      {s}
                      <span aria-hidden="true">↗</span>
                    </button>
                  ))}
                </div>
                <p className="chat-honesty">
                  Something missing from my documents? I’ll say so.
                </p>
              </div>
            )}
            {messages.map((m, i) => (
              <div key={i} className={"message message-" + m.role}>
                <span className="message-label">
                  {m.role === "user"
                    ? "YOU"
                    : m.role === "error"
                      ? "COULDN’T FINISH"
                      : "ASSISTANT"}
                </span>
                <p>{m.text}</p>
                {m.refused && (
                  <span className="refusal-note">
                    Not covered in the documents
                  </span>
                )}
                {m.sources?.map((s) => (
                  <details className="source-detail" key={s.source}>
                    <summary>
                      <span className="source-icon" aria-hidden="true">
                        ↳
                      </span>
                      {s.title}
                      <span aria-hidden="true">+</span>
                    </summary>
                    <div className="source-passages">
                      {s.passages.map((p) => (
                        <div key={p.id}>
                          <h4>{p.heading}</h4>
                          <blockquote>{p.text}</blockquote>
                        </div>
                      ))}
                    </div>
                  </details>
                ))}
                {m.role === "error" && i === messages.length - 1 && (
                  <button
                    className="retry-button"
                    disabled={busy}
                    onClick={() => ask(m.question!, m)}
                  >
                    Try again ↻
                  </button>
                )}
              </div>
            ))}
            {busy && draft && (
              <div
                className="message message-assistant"
                aria-label="Draft answer"
              >
                <span className="message-label">
                  DRAFTING · CHECKING SOURCES
                </span>
                <p>{draft}</p>
              </div>
            )}
            {busy && !draft && (
              <div className="thinking" role="status">
                <span className="thinking-dots" aria-hidden="true">
                  <i />
                  <i />
                  <i />
                </span>
                <span>
                  {slow
                    ? "Still working. Thanks for your patience…"
                    : "Checking the documents…"}
                </span>
              </div>
            )}
          </div>
          <form
            className="chat-form"
            onSubmit={(e) => {
              e.preventDefault();
              ask(input);
            }}
          >
            <label className="sr-only" htmlFor="chat-question">
              Your question about Ashish
            </label>
            <div className="chat-input-row">
              <input
                ref={inputRef}
                id="chat-question"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                maxLength={500}
                placeholder="What would you like to know?"
                autoComplete="off"
              />
              <button
                type="submit"
                disabled={busy || !input.trim()}
                aria-label="Send question"
              >
                ↑
              </button>
            </div>
            <div className="chat-input-note">
              <span>Follow-up questions welcome.</span>
              <span>{input.length}/500</span>
            </div>
          </form>
        </div>
      )}
    </>
  );
}
