"use client";

import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { AppHeader, AppShell } from "@/components/app-shell";
import { Button, ChallengeCard } from "@/components/ui";
import { challengeApi, type Challenge } from "@/lib/api";
import { Search } from "lucide-react";

export default function Challenges() {
  const [items, setItems]     = useState<Challenge[]>([]);
  const [q, setQ]             = useState("");
  const [error, setError]     = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    challengeApi.list()
      .then(setItems)
      .catch((e: Error) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  const result = useMemo(
    () => items.filter((x) =>
      `${x.title} ${x.category}`.toLowerCase().includes(q.toLowerCase())
    ),
    [items, q],
  );

  return (
    <AppShell>
      <AppHeader eyebrow="Tadiavo ny hifanandrinana aminao" title="NY FIFANINANANA.">
        <Button href="/challenges/create" variant="secondary">
          Mamorona Fanamby
        </Button>
      </AppHeader>

      <div className="p-5 md:p-10">
        {/* Fikarohana */}
        <div className="mb-8 flex flex-wrap gap-3">
          <label className="flex min-w-64 flex-1 items-center gap-2 border border-[#D7DFD0] bg-white px-3">
            <Search size={16} className="shrink-0 text-[#8C9C7C]" />
            <input
              aria-label="Tadiavio ny fanamby"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Tadiavio ny lohateny na sokajy…"
              className="w-full py-3 text-sm outline-none"
            />
          </label>
        </div>

        {/* Fiandrasana */}
        {loading && (
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="skeleton h-52 border border-[#D7DFD0]" />
            ))}
          </div>
        )}

        {/* Hadisoana */}
        {error && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            role="alert"
            className="border-l-2 border-red-600 bg-red-50 p-3 text-sm text-red-700"
          >
            {error}
          </motion.p>
        )}

        {/* Hita tsy misy */}
        {!loading && !error && !result.length && (
          <div className="border border-dashed border-[#D7DFD0] bg-white p-12 text-center">
            <b className="display text-3xl">TSIA FANAMBY HITA.</b>
            <p className="mt-3 text-sm text-slate-500">
              {q
                ? "Tsy misy fanamby mifanaraka amin'ny fikarohana."
                : "Mamorona fifaninanana iray hahatomboka."}
            </p>
            {!q && (
              <Button href="/challenges/create" className="mt-6 mx-auto" variant="secondary">
                Mamorona Fanamby
              </Button>
            )}
          </div>
        )}

        {/* Lisitra */}
        {!loading && !error && result.length > 0 && (
          <motion.div
            initial="hidden"
            animate="show"
            variants={{
              hidden: {},
              show: { transition: { staggerChildren: 0.07 } },
            }}
            className="grid gap-4 md:grid-cols-2 xl:grid-cols-3"
          >
            {result.map((x) => (
              <motion.div
                key={x.id}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  show:   { opacity: 1, y: 0 },
                }}
              >
                <ChallengeCard challenge={x} />
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </AppShell>
  );
}
