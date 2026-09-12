"use client";

import { use, useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MiniRank, AnswerFeedback } from "@/components/ui";
import { challengeApi, token, wsBase } from "@/lib/api";

type WsQuestion = {
  id: string;
  text: string;
  points: number;
  order: number;
  options: { id: string; text: string }[];
  closes_at: string;
};

type FeedbackState = { isCorrect: boolean; points: number } | null;

export default function Quiz({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);

  const [question, setQuestion] = useState<WsQuestion | null>(null);
  const [seconds, setSeconds]   = useState(0);
  const [pick, setPick]         = useState<string | null>(null);
  const [feedback, setFeedback] = useState<FeedbackState>(null);
  const [message, setMessage]   = useState("Mifandray amin'ny mpitantana…");
  const start = useRef(0);

  /* WebSocket */
  useEffect(() => {
    const t = token();
    if (!t || !wsBase) {
      setMessage(!t ? "Midira aloha vao mandray anjara." : "WebSocket tsy voasaina.");
      return;
    }
    const ws = new WebSocket(
      `${wsBase.replace(/\/$/, "")}/ws/challenges/${id}?token=${encodeURIComponent(t)}`,
    );
    ws.onopen = () => {
      setMessage("Miandry ny fanontaniana voalohany…");
      ws.send("ready");
    };
    ws.onmessage = (e) => {
      const ev = JSON.parse(e.data) as { event: string; data: WsQuestion };
      if (ev.event === "question") {
        setQuestion(ev.data);
        setPick(null);
        setFeedback(null);
        start.current = Date.now();
        setMessage("");
      }
      if (ev.event === "player_eliminated") location.assign(`/challenges/${id}/eliminated`);
      if (ev.event === "competition_finished") location.assign(`/challenges/${id}/intermission`);
    };
    ws.onerror = () => setMessage("Firaisan-kira mivantana tsy misy.");
    return () => ws.close();
  }, [id]);

  /* Timer */
  useEffect(() => {
    if (!question) return;
    const interval = setInterval(() => {
      setSeconds(Math.max(0, Math.ceil((new Date(question.closes_at).getTime() - Date.now()) / 1000)));
    }, 250);
    return () => clearInterval(interval);
  }, [question]);

  /* Mandray valiny */
  async function answer(optionId: string) {
    if (!question || pick) return;
    setPick(optionId);
    try {
      const r = await challengeApi.answer(id, {
        selected_option_id: optionId,
        response_time_ms: Date.now() - start.current,
      });
      setFeedback({ isCorrect: r.is_correct, points: r.points_awarded });
      setMessage("");
    } catch (e) {
      setMessage(e instanceof Error ? e.message : "Tsy voarakitra ny valiny.");
    }
  }

  /* Pourcentage timer */
  const totalSec = question
    ? Math.ceil((new Date(question.closes_at).getTime() - start.current) / 1000)
    : 20;
  const pct = Math.max(0, seconds / totalSec);
  const circumference = 2 * Math.PI * 48;

  return (
    <main className="min-h-screen bg-[#F8FAF5] p-4 md:p-8">
      {/* Header */}
      <header className="mx-auto flex max-w-7xl items-center justify-between border-b border-[#D7DFD0] pb-4">
        <span className="text-xs font-black uppercase tracking-widest">
          Fanamby mivantana{" "}
          {question && (
            <b className="ml-3 text-[#679436]">Fanontaniana {question.order}</b>
          )}
        </span>
        <span className="text-xs font-black text-[#679436]">
          {seconds}s sisa
        </span>
      </header>

      <div className="mx-auto grid max-w-7xl gap-8 py-10 lg:grid-cols-[1fr_260px]">
        <section className="mx-auto w-full max-w-3xl">
          {/* Timer circulaire */}
          <div className="mb-8 flex justify-center">
            <div className="relative">
              <svg width="120" height="120" viewBox="0 0 120 120" className="-rotate-90">
                {/* Fond */}
                <circle cx="60" cy="60" r="48" fill="none" stroke="#D7DFD0" strokeWidth="8" />
                {/* Progression */}
                <motion.circle
                  cx="60" cy="60" r="48"
                  fill="none"
                  stroke={pct > 0.3 ? "#679436" : pct > 0.1 ? "#e8a020" : "#C0392B"}
                  strokeWidth="8"
                  strokeLinecap="round"
                  strokeDasharray={circumference}
                  strokeDashoffset={circumference * (1 - pct)}
                  transition={{ duration: 0.25 }}
                />
              </svg>
              <div className="absolute inset-0 grid place-items-center">
                <b className="display text-4xl">{seconds}</b>
              </div>
            </div>
          </div>

          {/* Fanontaniana */}
          <AnimatePresence mode="wait">
            {question ? (
              <motion.div
                key={question.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
              >
                <p className="text-center text-xs font-black uppercase tracking-[.2em] text-[#679436]">
                  {question.points} pts
                </p>
                <h1 className="display mt-5 text-center text-4xl leading-[.92] md:text-5xl">
                  {question.text}
                </h1>

                {/* Safidy */}
                <div className="mt-10 grid gap-3 sm:grid-cols-2">
                  {question.options.map((a, i) => (
                    <motion.button
                      key={a.id}
                      disabled={!!pick || seconds === 0}
                      onClick={() => answer(a.id)}
                      whileHover={!pick ? { scale: 1.02 } : {}}
                      whileTap={!pick ? { scale: 0.98 } : {}}
                      className={`flex min-h-20 items-center border p-5 text-left transition ${
                        pick === a.id
                          ? "border-[#0FAC71] bg-[#e5f4ed]"
                          : pick
                          ? "border-[#D7DFD0] bg-white opacity-50"
                          : "border-[#D7DFD0] bg-white hover:border-[#679436] hover:bg-[#F8FAF5]"
                      }`}
                    >
                      <span className="mr-4 grid h-8 w-8 shrink-0 place-items-center border border-current text-xs font-black text-[#8C9C7C]">
                        {String.fromCharCode(65 + i)}
                      </span>
                      <b>{a.text}</b>
                    </motion.button>
                  ))}
                </div>

                {/* Feedback valiny */}
                <AnimatePresence>
                  {feedback && (
                    <div className="mt-5">
                      <AnswerFeedback isCorrect={feedback.isCorrect} points={feedback.points} />
                    </div>
                  )}
                </AnimatePresence>
              </motion.div>
            ) : (
              <motion.p
                key="waiting"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="py-24 text-center text-sm text-slate-500"
              >
                {message}
              </motion.p>
            )}
          </AnimatePresence>

          {/* Message statut */}
          {message && question && (
            <p role="status" className="mt-5 text-center text-sm font-bold text-[#0FAC71]">
              {message}
            </p>
          )}
        </section>

        {/* Laharana */}
        <aside className="hidden lg:block">
          <MiniRank />
        </aside>
      </div>
    </main>
  );
}
