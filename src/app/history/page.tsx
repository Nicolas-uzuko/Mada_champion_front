"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { AppHeader, AppShell } from "@/components/app-shell";
import { Button } from "@/components/ui";
import { userApi, type HistoryItem } from "@/lib/api";
import { CheckCircle2, XCircle, Trophy } from "lucide-react";

/* Format date malagasy */
function formatDate(iso: string) {
  return new Intl.DateTimeFormat("fr-MG", { dateStyle: "medium" }).format(new Date(iso));
}

export default function History() {
  const [rows, setRows]       = useState<HistoryItem[]>([]);
  const [error, setError]     = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    userApi.history()
      .then(setRows)
      .catch((e: Error) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  return (
    <AppShell>
      <AppHeader eyebrow="Ny dianao" title="TANTARAKO." />

      <div className="p-5 md:p-10">
        {/* Fiandrasana */}
        {loading && (
          <div className="space-y-3">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="skeleton h-20 border border-[#D7DFD0]" />
            ))}
          </div>
        )}

        {/* Hadisoana */}
        {error && (
          <p role="alert" className="border-l-2 border-red-600 bg-red-50 p-3 text-sm text-red-700">
            {error}
          </p>
        )}

        {/* Tsy misy tantara */}
        {!loading && !error && !rows.length && (
          <div className="border border-dashed border-[#D7DFD0] bg-white p-12 text-center">
            <Trophy size={32} className="mx-auto text-[#8C9C7C]" />
            <b className="display mt-6 block text-3xl">TONGA SOA AO AMIN'NY TANTARA.</b>
            <p className="mt-3 text-sm text-slate-500">
              Ny tantaranao dia hanomboka aorian'ny fanamby voalohany vita.
            </p>
            <Button href="/challenges" className="mx-auto mt-6" variant="secondary">
              Hijery fifaninanana
            </Button>
          </div>
        )}

        {/* Lisitra */}
        {!loading && !error && rows.length > 0 && (
          <>
            {/* En-tête tableau */}
            <div className="mb-4 hidden grid-cols-[1fr_120px_90px_90px_80px] gap-4 border-b border-[#D7DFD0] pb-2 text-[10px] font-black uppercase tracking-widest text-slate-400 md:grid">
              <span>Fanamby</span>
              <span>Daty</span>
              <span className="text-center">Laharana</span>
              <span className="text-center">Marina</span>
              <span className="text-right">Isa</span>
            </div>

            <motion.div
              initial="hidden"
              animate="show"
              variants={{ hidden: {}, show: { transition: { staggerChildren: 0.06 } } }}
              className="space-y-0"
            >
              {rows.map((r, i) => (
                <motion.div
                  key={r.id}
                  variants={{
                    hidden: { opacity: 0, x: -16 },
                    show:   { opacity: 1,  x: 0 },
                  }}
                  className="grid grid-cols-[auto_1fr] gap-4 border-b border-[#D7DFD0] py-5 md:grid-cols-[1fr_120px_90px_90px_80px] md:items-center"
                >
                  {/* Indicateur */}
                  <span
                    className={`mt-1 h-3 w-3 shrink-0 rounded-full md:hidden ${
                      i === 0 ? "bg-[#679436]" : "bg-[#D7DFD0]"
                    }`}
                  />

                  {/* Info principale */}
                  <div>
                    <b className="text-sm">Fanamby vita</b>
                    <p className="mt-0.5 text-xs text-slate-500 md:hidden">
                      {formatDate(r.played_at)} · Laharana {r.final_rank}e · {r.final_score} pts
                    </p>
                  </div>

                  {/* Daty */}
                  <span className="hidden text-xs text-slate-500 md:block">
                    {formatDate(r.played_at)}
                  </span>

                  {/* Laharana */}
                  <span className="hidden text-center font-black md:block">
                    {r.final_rank}e
                  </span>

                  {/* Valiny marina / diso */}
                  <span className="hidden items-center justify-center gap-2 text-xs font-bold md:flex">
                    <CheckCircle2 size={13} className="text-[#0FAC71]" />
                    {r.correct_answers}
                    <XCircle size={13} className="text-red-400" />
                    {r.incorrect_answers}
                  </span>

                  {/* Isa */}
                  <b className="hidden text-right text-[#679436] md:block">
                    {r.final_score} pts
                  </b>
                </motion.div>
              ))}
            </motion.div>
          </>
        )}
      </div>
    </AppShell>
  );
}
