"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight, Brain, ChevronRight, Clock3, Crown,
  Medal, Search, Trophy, Users, CheckCircle2, XCircle,
} from "lucide-react";
import type { Challenge } from "@/lib/api";

/* ─── Sokajy 20 malagasy ──────────────────────────────────── */
export const SOKAJY = [
  "Kolontsaina Malagasy",
  "Tantaran'i Madagasikara",
  "Jeografia Malagasy",
  "Gastronomia Malagasy",
  "Ohabolana sy Fomba Malagasy",
  "Biby sy Zavamaniry Malagasy",
  "Faritra 23 eto Madagasikara",
  "Fizahantany Malagasy",
  "Haren-kibon'ny Tany Malagasy",
  "Foko sy Kolontsaina",
  "Tantara sy Mpanjaka Malagasy",
  "Fanatanjahantena Malagasy",
  "Mozika Malagasy",
  "Sarimihetsika Malagasy",
  "Olomalaza Malagasy",
  "Fety sy Fomban-drazana",
  "Fampianarana eto Madagasikara",
  "Toekarena Malagasy",
  "Teknolojia sy Informatika eto Madagasikara",
  "Fahalalana Ankapobeny momba an'i Madagasikara",
] as const;

export type Sokajy = (typeof SOKAJY)[number];

/* ─── Status labels malagasy ──────────────────────────────── */
const STATUS_LABELS: Record<string, string> = {
  RUNNING:   "Miandry",
  WAITING:   "Manomboka",
  SCHEDULED: "Voafaritra",
  FINISHED:  "Vita",
  DRAFT:     "Vinavina",
};
const STATUS_STYLES: Record<string, string> = {
  RUNNING:   "bg-red-100 text-red-800",
  WAITING:   "bg-[#e5f4ed] text-[#08734b]",
  SCHEDULED: "bg-[#eff3e9] text-[#547f29]",
  FINISHED:  "bg-slate-100 text-slate-600",
  DRAFT:     "bg-amber-100 text-amber-800",
};

/* ─── Composants atomiques ────────────────────────────────── */

/** Bouton principal */
export const Button = ({
  children, href, className = "", variant = "primary", ...props
}: {
  children: React.ReactNode;
  href?: string;
  className?: string;
  variant?: "primary" | "secondary" | "ghost" | "danger";
} & React.ButtonHTMLAttributes<HTMLButtonElement>) => {
  const base =
    "inline-flex items-center justify-center gap-2 rounded-sm px-5 py-3 text-sm font-bold transition disabled:opacity-50";
  const variants = {
    primary:   "bg-[#1F2937] text-white hover:bg-[#679436]",
    secondary: "bg-[#679436] text-white hover:bg-[#547f29]",
    ghost:     "border border-[#D7DFD0] bg-white text-[#1F2937] hover:border-[#679436]",
    danger:    "bg-red-600 text-white hover:bg-red-700",
  };
  const cls = `${base} ${variants[variant]} ${className}`;
  return href
    ? <Link href={href} className={cls}>{children}</Link>
    : <button {...props} className={cls}>{children}</button>;
};

/** Logo Mada Champion */
export function Wordmark() {
  return (
    <Link href="/" className="group flex items-center gap-3" aria-label="Mada Champion, fandraisana">
      {/* Silhouette Madagascar en SVG */}
      <span className="relative grid h-10 w-10 place-items-center bg-[#679436] text-white overflow-hidden">
        <Trophy size={20} />
        <span className="absolute inset-0 lamba opacity-40" />
      </span>
      <span className="display text-xl leading-none">
        MADA<br />
        <span className="text-[#679436]">CHAMPION</span>
      </span>
    </Link>
  );
}

/** Navbar publique */
export function Nav() {
  return (
    <header className="mx-auto flex max-w-7xl items-center justify-between px-5 py-6">
      <Wordmark />
      <nav className="hidden items-center gap-7 text-sm font-bold md:flex">
        <a href="#fifaninanana" className="hover:text-[#679436] transition">Fifaninanana</a>
        <a href="#fitsipika" className="hover:text-[#679436] transition">Fitsipika</a>
        <a href="#laharana" className="hover:text-[#679436] transition">Laharana</a>
      </nav>
      <div className="flex gap-2">
        <Link className="px-4 py-2 text-sm font-bold hover:text-[#679436] transition" href="/login">
          Hiditra
        </Link>
        <Button href="/register" className="px-4 py-2">
          Manomboka
        </Button>
      </div>
    </header>
  );
}

/** Badge statut */
export function Status({ status }: { status: string }) {
  return (
    <span className={`rounded-full px-2.5 py-1 text-[10px] font-black tracking-widest ${STATUS_STYLES[status] ?? STATUS_STYLES.DRAFT}`}>
      {STATUS_LABELS[status] ?? status}
    </span>
  );
}

/** Select sokajy 20 malagasy */
export function CategorySelect({
  name = "category",
  defaultValue = "",
  required = true,
  className = "",
}: {
  name?: string;
  defaultValue?: string;
  required?: boolean;
  className?: string;
}) {
  return (
    <select
      name={name}
      defaultValue={defaultValue}
      required={required}
      className={`w-full border border-[#D7DFD0] bg-white px-3 py-3 text-sm focus:border-[#679436] focus:outline-none appearance-none bg-no-repeat ${className}`}
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%238C9C7C' stroke-width='2'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E")`,
        backgroundPosition: "right 12px center",
        paddingRight: "2.5rem",
      }}
    >
      <option value="" disabled>— Misafidiana sokajy —</option>
      {SOKAJY.map((s) => (
        <option key={s} value={s}>{s}</option>
      ))}
    </select>
  );
}

/** Carte fanamby */
export function ChallengeCard({ challenge, action = true }: { challenge: Challenge; action?: boolean }) {
  return (
    <motion.article
      whileHover={{ y: -4, boxShadow: "0 20px 40px rgba(103,148,54,.12)" }}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
      className="group relative border border-[#D7DFD0] bg-white p-5 overflow-hidden"
    >
      {/* Motif raphia coin */}
      <div className="raphia absolute right-0 top-0 h-20 w-24 opacity-40 pointer-events-none" />

      <div className="mb-6 flex items-start justify-between gap-3">
        <span className="text-[10px] font-black uppercase tracking-widest text-[#679436]">
          {challenge.category}
        </span>
        <Status status={challenge.status} />
      </div>

      <h3 className="display text-2xl leading-none">{challenge.title}</h3>
      <p className="mt-3 min-h-10 text-sm leading-5 text-slate-500">
        {challenge.description || "Fanamby ara-tsaina ho an'ny mpilalao rehetra."}
      </p>

      <div className="mt-6 flex justify-between border-t border-[#D7DFD0] pt-4 text-xs font-bold text-slate-600">
        <span className="flex items-center gap-1">
          <Clock3 size={13} />
          {new Intl.DateTimeFormat("fr-MG", { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" })
            .format(new Date(challenge.scheduled_at))}
        </span>
        <span className="flex items-center gap-1">
          <Users size={13} /> {challenge.max_participants} mpandray anjara
        </span>
      </div>

      {action && (
        <Link
          href={`/challenges/${challenge.id}/lobby`}
          className="mt-5 flex items-center justify-between text-sm font-black text-[#1F2937]"
        >
          Hijery ny fanamby
          <ArrowRight size={16} className="transition group-hover:translate-x-1" />
        </Link>
      )}
    </motion.article>
  );
}

/** Titre de section */
export function SectionTitle({ eyebrow, title, copy }: { eyebrow: string; title: string; copy?: string }) {
  return (
    <div className="max-w-2xl">
      <p className="mb-3 text-xs font-black uppercase tracking-[.22em] text-[#679436]">{eyebrow}</p>
      <h2 className="display text-4xl leading-[.9] md:text-6xl">{title}</h2>
      {copy && <p className="mt-5 leading-7 text-slate-600">{copy}</p>}
    </div>
  );
}

/** Mini laharana velona */
export function MiniRank() {
  return (
    <div className="border border-[#D7DFD0] bg-white p-5">
      <p className="mb-5 text-[10px] font-black uppercase tracking-widest text-slate-500">
        Laharana Velona
      </p>
      {[
        ["01", "Lova", "2 480"],
        ["02", "Hianao", "2 410"],
        ["03", "Tiana", "2 260"],
      ].map(([rank, name, points], i) => (
        <motion.div
          key={name}
          initial={{ opacity: 0, x: 12 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: i * 0.1 }}
          className={`mb-3 flex items-center justify-between py-2 border-b border-[#D7DFD0] last:border-0 text-sm ${
            name === "Hianao" ? "font-black text-[#0FAC71]" : ""
          }`}
        >
          <span>
            <b className="mr-3 text-[#8C9C7C] font-black">{rank}</b>
            {name}
          </span>
          <b>{points} pts</b>
        </motion.div>
      ))}
    </div>
  );
}

/** Motif Madagascar SVG inline */
export function MadaPattern({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 200 340"
      className={className}
      aria-hidden
      fill="currentColor"
    >
      {/* Silhouette simplifiée de Madagascar */}
      <path
        d="M110,10 C120,15 130,25 128,40 C135,55 140,70 135,90 C145,110 148,130 142,150
           C155,165 158,185 150,205 C160,225 158,248 145,265
           C140,285 128,300 115,315 C105,325 92,330 82,325
           C70,318 60,305 55,288 C45,270 42,250 48,230
           C38,210 36,188 45,168 C35,148 36,125 46,108
           C38,88 42,68 55,52 C62,35 75,18 88,11 Z"
        opacity="0.12"
      />
    </svg>
  );
}

/** Compteur animé */
export function AnimatedCounter({
  value,
  className = "",
}: {
  value: number | string;
  className?: string;
}) {
  return (
    <motion.b
      key={String(value)}
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className={`display block text-4xl ${className}`}
    >
      {value}
    </motion.b>
  );
}

/** Résultat réponse (correct/incorrect) */
export function AnswerFeedback({ isCorrect, points }: { isCorrect: boolean; points: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.85 }}
      animate={{ opacity: 1, scale: 1 }}
      className={`flex items-center gap-2 rounded-sm px-4 py-3 text-sm font-bold ${
        isCorrect
          ? "bg-[#e5f4ed] text-[#08734b]"
          : "bg-red-50 text-red-700"
      }`}
    >
      {isCorrect
        ? <><CheckCircle2 size={18} /> Valiny marina! +{points} pts</>
        : <><XCircle size={18} /> Valiny diso — 0 pts</>
      }
    </motion.div>
  );
}

// Re-exports pour compatibilité
export const icons = { Brain, ChevronRight, Crown, Medal, Search, Trophy, Users };
