"use client";

import { use, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { AppShell } from "@/components/app-shell";
import { Button, MadaPattern } from "@/components/ui";
import { challengeApi, type Challenge, token, wsBase } from "@/lib/api";
import { Users } from "lucide-react";

const MPILALAO_DEMO = ["Hianao"];

export default function Lobby({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);

  const [count, setCount]         = useState(0);
  const [online]                  = useState(MPILALAO_DEMO);
  const [challenge, setChallenge] = useState<Challenge | null>(null);
  const [error, setError]         = useState("");
  const [joined, setJoined]       = useState(false);

  // Charger le fanamby + rejoindre
  useEffect(() => {
    challengeApi.get(id).then(setChallenge).catch((e) => setError(e.message));
    challengeApi
      .join(id, token())
      .then(() => setJoined(true))
      .catch((e) => {
        if (!String(e.message).includes("Already joined")) setError(e.message);
        else setJoined(true);
      });
  }, [id]);

  // Countdown
  useEffect(() => {
    if (!challenge) return;
    const t = setInterval(() => {
      setCount(Math.max(0, Math.ceil((new Date(challenge.scheduled_at).getTime() - Date.now()) / 1000)));
    }, 1000);
    return () => clearInterval(t);
  }, [challenge]);

  const mm = String(Math.floor(count / 60)).padStart(2, "0");
  const ss = String(count % 60).padStart(2, "0");

  return (
    <AppShell>
      <main className="relative min-h-screen overflow-hidden bg-[#1F2937] p-5 text-white md:p-10">
        {/* Background motif */}
        <div className="topo absolute inset-0 opacity-20" />
        <MadaPattern className="absolute right-0 top-0 h-full w-48 text-[#679436] opacity-10" />

        {/* Lien retour */}
        <Link href="/challenges" className="relative text-xs font-bold text-white/60 hover:text-white transition">
          ← Hiala amin'ny efitra
        </Link>

        {/* Erreur */}
        {error && (
          <p role="alert" className="relative mx-auto mt-4 max-w-5xl border-l-2 border-red-400 bg-red-950/60 p-3 text-sm text-red-200">
            {error}
          </p>
        )}

        <div className="relative mx-auto grid max-w-5xl items-center gap-10 py-12 lg:grid-cols-[1fr_1.4fr_1fr]">
          {/* Info fanamby */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
          >
            <p className="text-xs font-black uppercase tracking-[.2em] text-[#a7d270]">
              Efitra Fiandrasana
            </p>
            <h1 className="display mt-4 text-4xl leading-none md:text-5xl">
              {challenge?.title ?? "MIANDRY…"}
            </h1>
            <p className="mt-5 text-sm leading-6 text-white/60">
              Ny lalao dia manomboka ho an'ny mpilalao rehetra amin'ny ora iray.
            </p>

            <div className="mt-7 flex items-center gap-2 text-sm text-white/70">
              <Users size={15} />
              {online.length} mpandray anjara ao amin'ny efitra
            </div>
          </motion.div>

          {/* Countdown visuel */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, type: "spring" }}
            className="relative aspect-square"
          >
            {/* Anneaux */}
            <div className="absolute inset-0 rounded-full border border-white/10 animate-pulse-ring" />
            <div className="absolute inset-[8%] rounded-full border border-dashed border-[#a7d270]/40" />

            {/* Centre */}
            <div className="absolute inset-[22%] grid place-items-center rounded-full bg-[#679436] text-center shadow-2xl shadow-[#679436]/30">
              <b className="display text-5xl leading-none">
                {mm}:{ss}
              </b>
              <span className="mt-1 text-[10px] font-black tracking-widest text-white/80">
                MIANDRY NY FANOMBOHAN'NY LALAO
              </span>
            </div>

            {/* Mpilalao pop-in */}
            <AnimatePresence>
              {online.map((name, i) => (
                <motion.div
                  key={name}
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.15 }}
                  className="absolute left-[45%] top-[5%] grid h-12 w-12 place-items-center rounded-full border-2 border-[#1F2937] bg-white text-xs font-black text-[#1F2937]"
                >
                  {name[0]}
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {/* Panel droit */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="border-l border-white/15 pl-6"
          >
            {joined ? (
              <>
                <p className="text-xs font-black uppercase tracking-widest text-[#a7d270]">
                  ✓ Efa voasoratra anarana
                </p>
                <p className="mt-5 text-sm text-white/70">
                  Ny mpitantana no hanokatra ny fanontaniana voalohany amin'ny ora voafaritra.
                </p>
              </>
            ) : (
              <p className="text-xs text-white/60">Miandry ny fanamafisana…</p>
            )}

            <Button href={`/challenges/${id}/quiz`} className="mt-8 bg-[#a7d270] text-[#1F2937] hover:bg-white">
              🎮 Hiditra amin'ny arena
            </Button>

            <p className="mt-6 text-[10px] text-white/30">
              Fahafenoana amin'ny fotoana: {wsBase ? "✓ Voasaina" : "⚠ Tsy voasaina"}
            </p>
          </motion.div>
        </div>
      </main>
    </AppShell>
  );
}
