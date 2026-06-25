"use client";

import { useState, useRef, useEffect } from "react";
import { useTranslations, useLocale } from "next-intl";
import { m as motion, AnimatePresence } from "@/lib/framer";
import { MessageCircle, X, Send } from "lucide-react";
import Button from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import type { ChatMessage } from "@/types";

type ChatMessageWithId = ChatMessage & { id: string };

const steps = ["service", "business", "revenue", "goal"] as const;
type Step = (typeof steps)[number];

export default function ChatBot() {
  const t = useTranslations("chatbot");
  const tCommon = useTranslations("common");
  const locale = useLocale();

  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessageWithId[]>([]);
  const [input, setInput] = useState("");
  const [step, setStep] = useState(0);
  const [leadData, setLeadData] = useState<Record<string, string>>({});
  const [qualified, setQualified] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const revenueOptions = t.raw("quickReplies.revenue") as string[];
  const serviceOptions = t.raw("quickReplies.services") as string[];
  const businessOptions = t.raw("quickReplies.businessTypes") as string[];
  const goalOptions = t.raw("quickReplies.goals") as string[];

  const quickReplyOptions = [serviceOptions, businessOptions, revenueOptions, goalOptions][step] ?? [];

  useEffect(() => {
    setMessages([{ id: "init", role: "assistant", content: t("initialMessage") }]);
    setStep(0);
    setLeadData({});
    setQualified(false);
    setInput("");
  }, [locale, t]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const addMessage = (role: "user" | "assistant", content: string) => {
    setMessages((prev) => [
      ...prev,
      { id: `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`, role, content },
    ]);
  };

  const handleQuickReply = (reply: string) => {
    addMessage("user", reply);
    processResponse(reply);
  };

  const processResponse = (answer: string) => {
    const currentField = steps[step];
    const updated = { ...leadData, [currentField]: answer };
    setLeadData(updated);

    const nextStep = step + 1;
    if (nextStep < steps.length) {
      setTimeout(() => {
        addMessage("assistant", t(`questions.${steps[nextStep]}` as `questions.${Step}`));
        setStep(nextStep);
      }, 500);
    } else {
      const highIntent = updated.revenue !== revenueOptions[0];
      setTimeout(() => {
        addMessage("assistant", highIntent ? t("highIntentResponse") : t("lowIntentResponse"));
        setQualified(true);
      }, 500);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    const msg = input.trim();
    setInput("");
    addMessage("user", msg);
    processResponse(msg);
  };

  return (
    <>
      <Button
        variant="primary"
        size="fab"
        onClick={() => setOpen(true)}
        className={cn(
          "fixed-safe-bottom fixed-safe-left fixed z-50",
          open && "pointer-events-none opacity-0"
        )}
        aria-label={t("openChat")}
        aria-hidden={open ? true : undefined}
      >
        <MessageCircle className="h-5 w-5" />
      </Button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed-safe-bottom fixed-safe-left fixed z-50 mb-16 w-[360px] max-w-[calc(100vw-2.5rem)] glass rounded-xl shadow-2xl overflow-hidden"
          >
            <div className="flex items-center justify-between px-4 py-3 border-b border-white/10 bg-bg-dark">
              <div className="flex items-center gap-2.5">
                <div className="h-7 w-7 rounded-full bg-neon-cyan flex items-center justify-center text-xs font-bold text-bg">AD</div>
                <div>
                  <p className="text-sm font-semibold text-white">{t("assistantName")}</p>
                  <p className="text-xs text-muted">{t("assistantRole")}</p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setOpen(false)}
                aria-label={t("closeChat")}
              >
                <X className="h-5 w-5" />
              </Button>
            </div>

            <div className="h-[380px] overflow-y-auto p-4 space-y-3 bg-bg">
              {messages.map((msg) => (
                <div key={msg.id} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`max-w-[85%] rounded-lg px-4 py-2.5 text-sm leading-relaxed ${
                      msg.role === "user" ? "bg-neon-cyan text-bg" : "glass text-white"
                    }`}
                  >
                    {msg.content}
                  </div>
                </div>
              ))}

              {!qualified && step < steps.length && (
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {quickReplyOptions.map((opt) => (
                    <Button
                      key={opt}
                      variant="secondary"
                      size="sm"
                      type="button"
                      onClick={() => handleQuickReply(opt)}
                    >
                      {opt}
                    </Button>
                  ))}
                </div>
              )}

              {qualified && (
                <div className="space-y-2 pt-2">
                  <Button href="/contact" variant="primary" className="w-full justify-center" fullWidthMobile>
                    {tCommon("bookStrategyCall")}
                  </Button>
                  <Button href="/lead-magnet" variant="secondary" className="w-full justify-center" fullWidthMobile>
                    {tCommon("getFreeAudit")}
                  </Button>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {!qualified && (
              <form onSubmit={handleSubmit} className="border-t border-white/10 p-3 flex gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder={t("placeholder")}
                  aria-label={t("chatMessage")}
                  className="flex-1 min-h-touch glass rounded-lg px-4 py-3 text-base text-white placeholder-muted focus:outline-none focus:ring-1 focus:ring-neon-cyan"
                />
                <Button
                  type="submit"
                  variant="primary"
                  size="icon"
                  aria-label={t("sendMessage")}
                >
                  <Send className="h-4 w-4" />
                </Button>
              </form>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
