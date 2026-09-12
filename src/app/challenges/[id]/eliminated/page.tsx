"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { XCircle } from "lucide-react";
import { Button } from "@/components/ui";

export default function Eliminated() {
  return (
    <main className="relative grid min-h-screen place-items-center overflow-hidden bg-[#1F2937] p-5 text-white">
      {/* Background motif */}
      <div className="topo absolute inset-0 opacity-20" />

      <motion.section
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: "spring", stiffness: 180, damping: 18 }}
        className="relative max-w-lg text-center"
      >
        {/* Icône voahilika */}
        <motion.div
          initial={{ rotate: -10, scale: 0.5 }}
          animate={{ rotate: 0, scale: 1 }}
          transition={{ delay: 0.1, type: "spring", stiffness: 200 }}
        >
          <XCircle size={56} className="mx-auto text-red-400" />
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="mt-8 text-xs font-black uppercase tracking-[.2em] text-red-400"
        >
          ❌ Voahilika ianao
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          className="display mt-4 text-6xl leading-[.84]"
        >
          NIALA<br />TAMIN'NY<br />ARENA IANAO.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mx-auto mt-7 max-w-sm text-sm leading-6 text-white/65"
        >
          Tsy ny valiny marina izany. Ny fahatakaranao dia voarakitra ao amin'ny
          tantaranao. Mbola afaka manaraka ny sisa amin'ny lalao ianao.
        </motion.p>

        {/* Statistiques farany */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="my-10 grid grid-cols-2 gap-px bg-white/15"
        >
          <div className="bg-[#1F2937] p-6">
            <b className="display text-4xl text-[#a7d270]">08</b>
            <p className="mt-2 text-xs text-white/50">laharana farany</p>
          </div>
          <div className="bg-[#1F2937] p-6">
            <b className="display text-4xl text-[#a7d270]">1 640</b>
            <p className="mt-2 text-xs text-white/50">isa azoko</p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.75 }}
          className="flex flex-wrap justify-center gap-3"
        >
          <Link
            href="/history"
            className="border border-white/30 px-5 py-3 text-sm font-bold hover:bg-white hover:text-[#1F2937] transition"
          >
            📜 Ny tantarako
          </Link>
          <Button href="/challenges" variant="secondary">
            🏆 Fifaninanana hafa
          </Button>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
          className="mt-8 text-sm text-white/40"
        >
          ⚡ Ny mpilalao tavela dia hifindra amin'ny dingana manaraka ato ho ato.
        </motion.p>
      </motion.section>
    </main>
  );
}
