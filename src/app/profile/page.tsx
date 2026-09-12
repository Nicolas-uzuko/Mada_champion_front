"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { AppHeader, AppShell } from "@/components/app-shell";
import { userApi, type Statistics } from "@/lib/api";
import { Crown, Medal, Target } from "lucide-react";

/* Carte stat */
function StatCard({
  Icon,
  value,
  label,
  delay = 0,
}: {
  Icon: React.ElementType;
  value: string | number;
  label: string;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      className="border border-[#D7DFD0] p-5"
    >
      <Icon size={20} className="text-[#679436]" />
      <b className="display mt-5 block text-3xl">{value}</b>
      <p className="mt-1 text-xs text-slate-500">{label}</p>
    </motion.div>
  );
}

/* Bar chart simple */
function PerformanceChart({ data }: { data: number[] }) {
  const max = Math.max(...data, 1);
  return (
    <div className="flex h-44 items-end gap-2 border-b border-l border-[#D7DFD0] p-4">
      {data.map((v, i) => (
        <motion.div
          key={i}
          initial={{ height: 0 }}
          animate={{ height: `${(v / max) * 100}%` }}
          transition={{ delay: i * 0.06, type: "spring", stiffness: 200 }}
          className="flex-1 bg-[#679436] opacity-80 hover:opacity-100 transition"
          title={`Lalao ${i + 1}`}
        />
      ))}
    </div>
  );
}

export default function Profile() {
  const [stats, setStats]     = useState<Statistics | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    userApi.statistics()
      .then(setStats)
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const wins         = stats?.wins            ?? 0;
  const finals       = stats?.finals_reached  ?? 0;
  const successRate  = stats ? `${Math.round(stats.success_rate)} %` : "—";
  const gamesPlayed  = stats?.games_played    ?? 0;

  /* Simuler barre historique proportionnelle */
  const chartData = [35, 48, 40, 67, 55, 74, 88];

  return (
    <AppShell>
      <AppHeader eyebrow="Mombamomba ny mpilalao" title="NY KAONTIKO." />

      <div className="p-5 md:p-10">
        <div className="grid gap-8 lg:grid-cols-[.8fr_1.2fr]">
          {/* Card profil */}
          <motion.section
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="relative overflow-hidden bg-[#1F2937] p-7 text-white"
          >
            <div className="lamba absolute inset-0 opacity-10" />
            <div className="relative">
              {/* Avatar */}
              <div className="grid h-16 w-16 place-items-center rounded-full bg-[#679436] text-xl font-black">
                MR
              </div>

              <p className="mt-7 text-xs font-black uppercase tracking-widest text-[#a7d270]">
                Sokajy Volamena
              </p>
              <h2 className="display mt-2 text-4xl leading-tight">
                MPILALAO<br />MAHAY.
              </h2>

              <p className="mt-5 text-sm text-white/60">
                Mpikambana hatramin'ny Aprily 2026
              </p>

              <div className="mt-8 border-t border-white/15 pt-6">
                <p className="text-xs font-black uppercase tracking-widest text-white/50 mb-4">
                  Fandrosoana
                </p>
                {/* Barre progression niveau */}
                <div className="relative h-2 w-full bg-white/10 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: "68%" }}
                    transition={{ delay: 0.4, duration: 0.8 }}
                    className="absolute inset-y-0 left-0 bg-[#a7d270] rounded-full"
                  />
                </div>
                <div className="mt-2 flex justify-between text-[10px] text-white/40">
                  <span>Dingana 3</span>
                  <span>68 % → Dingana 4</span>
                </div>
              </div>
            </div>
          </motion.section>

          {/* Stats + Chart */}
          <section>
            <p className="text-xs font-black uppercase tracking-widest text-slate-500 mb-5">
              Fivoaran'ny fahatakarana
            </p>

            {loading ? (
              <div className="skeleton h-44 w-full" />
            ) : (
              <PerformanceChart data={chartData} />
            )}

            <div className="mt-8 grid gap-3 sm:grid-cols-3">
              {loading ? (
                [...Array(3)].map((_, i) => (
                  <div key={i} className="skeleton h-28 border border-[#D7DFD0]" />
                ))
              ) : (
                <>
                  <StatCard Icon={Crown}  value={wins}        label="fanamby menaka"   delay={0}   />
                  <StatCard Icon={Medal}  value={finals}      label="finale tafiditra" delay={0.1} />
                  <StatCard Icon={Target} value={successRate} label="valiny marina"    delay={0.2} />
                </>
              )}
            </div>

            {/* Antontanisa ankapobeny */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mt-6 border border-[#D7DFD0] bg-white p-5"
            >
              <p className="text-xs font-black uppercase tracking-widest text-slate-500 mb-3">
                Antontanisa ankapobeny
              </p>
              <div className="flex justify-between text-sm">
                <span className="text-slate-600">Lalao nalehako</span>
                <b>{gamesPlayed}</b>
              </div>
              <div className="mt-2 flex justify-between text-sm border-t border-[#D7DFD0] pt-2">
                <span className="text-slate-600">Isa tsara indrindra</span>
                <b className="text-[#679436]">{stats?.best_score ?? "—"} pts</b>
              </div>
            </motion.div>
          </section>
        </div>
      </div>
    </AppShell>
  );
}
