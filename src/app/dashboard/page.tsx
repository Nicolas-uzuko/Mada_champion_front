"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { AppHeader, AppShell } from "@/components/app-shell";
import { Button, MiniRank } from "@/components/ui";
import { ArrowUpRight, Clock3, Target, Trophy } from "lucide-react";
import { userApi, type Statistics } from "@/lib/api";

/* Carte de statistique */
function StatCard({
  value,
  label,
  Icon,
  delay = 0,
}: {
  value: string | number;
  label: string;
  Icon: React.ElementType;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      className="border border-[#D7DFD0] bg-white p-5"
    >
      <Icon size={18} className="text-[#679436]" />
      <b className="display mt-8 block text-4xl">{value}</b>
      <p className="mt-1 text-xs font-bold text-slate-500">{label}</p>
    </motion.div>
  );
}

export default function Dashboard() {
  const [stats, setStats]   = useState<Statistics | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    userApi.statistics()
      .then(setStats)
      .catch(() => {/* silencieux — affiche valeurs par défaut */})
      .finally(() => setLoading(false));
  }, []);

  const gamesPlayed  = stats?.games_played   ?? "—";
  const successRate  = stats ? `${Math.round(stats.success_rate)} %` : "—";
  const bestScore    = stats?.best_score      ?? "—";
  const wins         = stats?.wins            ?? "—";

  return (
    <AppShell>
      <AppHeader eyebrow="Tongasoa, Mpilalao" title="NY SEHATRA FIALAO ADIDINAO.">
        <Button href="/challenges/create" variant="secondary">
          Mamorona Fanamby
        </Button>
      </AppHeader>

      <div className="p-5 md:p-10">
        {/* Statistiques */}
        {loading ? (
          <div className="grid gap-4 md:grid-cols-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="skeleton h-32 border border-[#D7DFD0]" />
            ))}
          </div>
        ) : (
          <div className="grid gap-4 md:grid-cols-4">
            <StatCard value={gamesPlayed}  label="Lalao nalehako"        Icon={Trophy}     delay={0}   />
            <StatCard value={successRate}  label="Valiny marina"          Icon={Target}     delay={0.1} />
            <StatCard value={bestScore}    label="Isa tsara indrindra"    Icon={ArrowUpRight} delay={0.2} />
            <StatCard value={wins}         label="Fanamby menaka"         Icon={Clock3}     delay={0.3} />
          </div>
        )}

        <div className="mt-8 grid gap-8 lg:grid-cols-[1.6fr_1fr]">
          {/* Fanamby manaraka */}
          <section>
            <p className="text-xs font-black uppercase tracking-widest text-slate-500">
              Fotoana ho avy
            </p>
            <motion.div
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="mt-4 border-l-4 border-[#0FAC71] bg-[#1F2937] p-7 text-white"
            >
              <p className="text-xs font-black uppercase tracking-widest text-[#a7d270]">
                Ao anatin'ny 02ora 16min
              </p>
              <h2 className="display mt-6 text-4xl leading-none">
                KOLONTSAINA MALAGASY<br />— DINGANA 01
              </h2>
              <p className="mt-5 text-sm text-white/70">
                20 fanontaniana · Fanesorana amin'ny dingana tsirairay · 48 mpandray anjara
              </p>
              <Button href="/challenges" className="mt-7 bg-[#a7d270] text-[#1F2937]">
                Hiditra amin'ny efitra
              </Button>
            </motion.div>

            {/* Tantara vao haingana */}
            <p className="mt-9 text-xs font-black uppercase tracking-widest text-slate-500">
              Lalao vao vita
            </p>
            {[
              ["Tantaran'i Madagasikara", "Laharana faha-3", "2 310 pts"],
              ["Jeografia Malagasy",      "Finaliste",        "1 980 pts"],
            ].map((r) => (
              <div
                key={r[0]}
                className="mt-3 flex items-center justify-between border-b border-[#D7DFD0] py-4 text-sm"
              >
                <b>{r[0]}</b>
                <span className="text-slate-500">{r[1]}</span>
                <b className="text-[#679436]">{r[2]}</b>
              </div>
            ))}
          </section>

          {/* Mini laharana */}
          <div>
            <p className="mb-4 text-xs font-black uppercase tracking-widest text-slate-500">
              Laharana Ankapobeny
            </p>
            <MiniRank />

            <Link
              href="/history"
              className="mt-5 flex items-center gap-2 text-sm font-black text-[#679436] hover:underline"
            >
              Ny tantara rehetra →
            </Link>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
