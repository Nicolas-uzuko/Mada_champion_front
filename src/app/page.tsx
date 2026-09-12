"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Trophy } from "lucide-react";
import { Nav, SectionTitle, Button, MadaPattern } from "@/components/ui";

/* ─── Dingana telo ────────────────────────────────────────── */
const DINGANA = [
  ["01", "Misafidiana", "Tadiavo ny fifaninanana mifanaraka amin'ny haitraitra hahita anao."],
  ["02", "Mamaly",      "Segondra tsirairay dia lanja. Maingana, marina, fanapahana."],
  ["03", "Mandroso",    "Velomy ny dingana ary soratana ny anaranao amin'ny laharana."],
];

/* ─── Antontanisa ─────────────────────────────────────────── */
const ANTONTANISA = [
  ["18 420", "mpandresy"],
  ["1,2 M",  "valiny nomen'ny mpilalao"],
  ["4,8 / 5","fankasitrahana"],
  ["20",     "sokajy fifaninanana"],
];

/* ─── Fanamby telo ────────────────────────────────────────── */
const FANAMBY_DEMO = [
  ["Kolontsaina Malagasy",    "Anio alina · 20:30", "48 mpandray anjara"],
  ["Tantaran'i Madagasikara", "Rahampitso · 18:00", "32 mpandray anjara"],
  ["Jeografia Malagasy",      "Sabotsy · 17:00",    "64 mpandray anjara"],
];

export default function Home() {
  return (
    <main>
      <Nav />

      {/* ── Hero ─────────────────────────────────────────── */}
      <section className="relative mx-auto max-w-7xl overflow-hidden px-5 pb-24 pt-12 md:pb-32 md:pt-20">
        {/* Background texture */}
        <div className="topo absolute inset-x-1/2 top-0 -z-10 h-full w-screen -translate-x-1/2 opacity-80" />

        {/* Silhouette Madagascar décorative */}
        <MadaPattern className="absolute right-0 top-0 -z-10 h-full w-64 text-[#679436] opacity-5 md:opacity-10" />

        <div className="grid items-end gap-12 lg:grid-cols-[1fr_.72fr]">
          {/* Texte hero */}
          <div>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-5 flex items-center gap-2 text-xs font-black uppercase tracking-[.2em] text-[#679436]"
            >
              <span className="h-2 w-2 animate-pulse rounded-full bg-[#0FAC71]" />
              Fahalalana no fiadiana
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55 }}
              className="display max-w-3xl text-6xl leading-[.81] sm:text-7xl md:text-9xl"
            >
              REHEFA NY
              <br />
              <span className="text-[#679436]">FAHALALANA</span>
              <br />
              NO MANDRESY.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="mt-8 max-w-lg text-lg leading-7 text-slate-600"
            >
              Mada Champion dia manangona ny sainy mahery indrindra amin'ny fifaninanana
              ara-tsaina mivantana — tsy misy fahafahana faharoa.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45 }}
              className="mt-9 flex flex-wrap gap-3"
            >
              <Button href="/register">
                Hiditra amin'ny arena <ArrowRight size={17} />
              </Button>
              <Link
                href="#fitsipika"
                className="px-5 py-3 text-sm font-bold underline decoration-[#679436] decoration-2 underline-offset-4"
              >
                Hahalala ny fitsipika
              </Link>
            </motion.div>
          </div>

          {/* Arena visuelle */}
          <ArenaVisual />
        </div>
      </section>

      {/* ── Fitsipika ─────────────────────────────────────── */}
      <section id="fitsipika" className="border-y border-[#D7DFD0] bg-white">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 py-20 md:grid-cols-[.9fr_1.6fr]">
          <SectionTitle
            eyebrow="Tsy misy azo ahitsy"
            title="FITSIPIKA IRAY: MITOETRA AMIN'NY LAHARANA."
            copy="Traikefa fifaninanana noforonina toy ny sehatra. Hatramin'ny fanontaniana voalohany ka hatramin'ny farany, ny isanao no miteny."
          />
          <div className="grid gap-px self-end bg-[#D7DFD0] md:grid-cols-3">
            {DINGANA.map(([n, t, c]) => (
              <motion.div
                key={n}
                whileHover={{ y: -2 }}
                className="bg-white p-6"
              >
                <span className="display text-3xl text-[#8C9C7C]">{n}</span>
                <h3 className="mt-10 text-lg font-black">{t}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">{c}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Fifaninanana voasoratra ────────────────────────── */}
      <section id="fifaninanana" className="mx-auto max-w-7xl px-5 py-24">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionTitle eyebrow="Voasoratra" title="NY FIFANINANANA MANARAKA." />
          <Button href="/challenges">
            Fifaninanana rehetra <ArrowRight size={16} />
          </Button>
        </div>

        <div className="mt-12 grid gap-4 md:grid-cols-3">
          {FANAMBY_DEMO.map(([title, date, participants], i) => (
            <motion.article
              key={title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -4 }}
              className="relative overflow-hidden border border-[#D7DFD0] bg-white p-6"
            >
              <div className="raphia absolute right-0 top-0 h-24 w-28 opacity-50" />
              <p className="text-xs font-black uppercase tracking-widest text-[#679436]">
                {i === 0 ? "Misokatra izao" : "Ho avy"}
              </p>
              <h3 className="display mt-12 max-w-48 text-3xl leading-none">{title}</h3>
              <div className="mt-12 flex justify-between border-t border-[#D7DFD0] pt-4 text-xs font-bold">
                <span>{date}</span>
                <span>{participants}</span>
              </div>
            </motion.article>
          ))}
        </div>
      </section>

      {/* ── Antontanisa ───────────────────────────────────── */}
      <section id="laharana" className="bg-[#1F2937] text-white">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 py-20 md:grid-cols-2">
          <SectionTitle
            eyebrow="Fiarahamonina mitolona marina"
            title="ISA MISY LANJA."
          />
          <div className="grid grid-cols-2 gap-px self-end bg-white/15">
            {ANTONTANISA.map(([v, l]) => (
              <motion.div
                key={l}
                whileInView={{ opacity: 1, y: 0 }}
                initial={{ opacity: 0, y: 20 }}
                viewport={{ once: true }}
                className="bg-[#1F2937] p-6"
              >
                <b className="display text-4xl text-[#a7d270]">{v}</b>
                <p className="mt-2 text-xs font-bold uppercase tracking-widest text-white/60">{l}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────────── */}
      <section className="mx-auto max-w-7xl px-5 py-24">
        <div className="relative overflow-hidden bg-[#679436] px-7 py-14 text-white md:px-14">
          <div className="grain absolute inset-0 opacity-30" />
          <MadaPattern className="absolute right-0 top-0 h-full w-48 text-white opacity-10" />
          <div className="relative flex flex-wrap items-end justify-between gap-8">
            <div>
              <p className="text-xs font-black uppercase tracking-[.2em]">
                Ny fanontaniana manaraka dia miandry anao
              </p>
              <h2 className="display mt-4 max-w-xl text-5xl leading-[.85]">
                VONONA HITONDRA NY LAHARANA VOALOHANY?
              </h2>
            </div>
            <Button href="/register" className="bg-white text-[#1F2937] hover:bg-[#1F2937] hover:text-white">
              Mamorona kaonty <ArrowRight size={16} />
            </Button>
          </div>
        </div>
      </section>

      {/* ── Footer ────────────────────────────────────────── */}
      <footer className="border-t border-[#D7DFD0]">
        <div className="mx-auto flex max-w-7xl flex-wrap justify-between gap-4 px-5 py-8 text-xs font-bold text-slate-500">
          <span>© 2026 Mada Champion</span>
          <span>Izay mahalala no maharesy.</span>
        </div>
      </footer>
    </main>
  );
}

/* ── Arena visuelle ─────────────────────────────────────────── */
function ArenaVisual() {
  const players = [
    { name: "Lova", pos: "top-2 left-[43%]", delay: 0 },
    { name: "Hery", pos: "top-[42%] right-0", delay: 0.3 },
    { name: "Mina", pos: "bottom-4 left-[18%]", delay: 0.6 },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.92 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.18, duration: 0.6 }}
      className="relative mx-auto aspect-square w-full max-w-[440px]"
    >
      {/* Anneaux */}
      <div className="absolute inset-0 rounded-full border border-[#679436]/20 animate-pulse-ring" />
      <div className="absolute inset-[10%] rounded-full border border-dashed border-[#679436]/35" />

      {/* Centre */}
      <div className="absolute inset-[22%] grid place-items-center rounded-full bg-[#1F2937] text-center text-white shadow-2xl shadow-[#679436]/20">
        <Trophy className="mb-3 text-[#a7d270]" size={34} />
        <p className="display text-4xl leading-none">DINGANA<br />VOALOHANY</p>
        <p className="mt-3 text-[10px] font-black tracking-[.2em] text-white/60">MIVANTANA</p>
      </div>

      {/* Mpilalao */}
      {players.map(({ name, pos, delay }) => (
        <motion.div
          key={name}
          animate={{ y: [0, -6, 0] }}
          transition={{ repeat: Infinity, duration: 2.4 + delay, delay }}
          className={`absolute ${pos} border border-[#D7DFD0] bg-white px-3 py-2 text-xs font-black shadow-sm`}
        >
          <span className="mr-2 inline-block h-2 w-2 rounded-full bg-[#0FAC71]" />
          {name}
        </motion.div>
      ))}
    </motion.div>
  );
}
