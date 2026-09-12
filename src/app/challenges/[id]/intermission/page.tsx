"use client";

import { use, useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Crown, TrendingUp, Users } from "lucide-react";
import { challengeApi, type Challenge } from "@/lib/api";

export default function Intermission({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [challenge, setChallenge] = useState<Challenge | null>(null);
  const [countdown, setCountdown] = useState(10);

  useEffect(() => {
    challengeApi.get(id).then(setChallenge).catch(() => {});
  }, [id]);

  useEffect(() => {
    const t = setInterval(() => {
      setCountdown((c) => {
        if (c <= 1) {
          clearInterval(t);
          location.assign(`/challenges/${id}/quiz`);
          return 0;
        }
        return c - 1;
      });
    }, 1000);
    return () => clearInterval(t);
  }, [id]);

  return (
    <main className="grid min-h-screen place-items-center bg-[#F8FAF5] p-5">
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 200 }}
        className="w-full max-w-3xl border border-[#D7DFD0] bg-white p-7 md:p-12"
      >
        <p className="text-center text-xs font-black uppercase tracking-[.2em] text-[#679436]">
          Dingana vita
        </p>
        <h1 className="display mt-4 text-center text-5xl leading-none">
          MBOLA AO AMIN'NY<br />LAHARANA IANAO.
        </h1>

        {/* Antontanisa dingana */}
        <div className="my-10 grid gap-px bg-[#D7DFD0] sm:grid-cols-3">
          {[
            { Icon: TrendingUp, value: "+100", label: "pts azoko" },
            { Icon: Crown,      value: "02",   label: "laharako" },
            { Icon: Users,      value: "23",   label: "mpilalao sisa" },
          ].map(({ Icon, value, label }) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white p-5 text-center"
            >
              <Icon className="mx-auto text-[#679436]" size={22} />
              <b className="display mt-4 block text-3xl">{value}</b>
              <p className="mt-1 text-xs text-slate-500">{label}</p>
            </motion.div>
          ))}
        </div>

        {/* Countdown manaraka */}
        <div className="flex items-center justify-between border-t border-[#D7DFD0] pt-5">
          <span className="text-sm font-bold text-slate-600">
            Dingana manaraka ao anatin'ny{" "}
            <motion.b
              key={countdown}
              initial={{ scale: 1.4, color: "#679436" }}
              animate={{ scale: 1, color: "#1F2937" }}
              className="inline-block"
            >
              {countdown}s
            </motion.b>
          </span>
          <Link
            href={`/challenges/${id}/quiz`}
            className="text-sm font-black text-[#679436] hover:underline"
          >
            Hijery ny fanontaniana manaraka →
          </Link>
        </div>
      </motion.section>
    </main>
  );
}
