"use client";

import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";
import { authApi } from "@/lib/api";
import { Button, MadaPattern, Wordmark } from "@/components/ui";

/* ─── Composant partagé Login / Register ─────────────────── */
export function Auth({ title, mode }: { title: string; mode: "login" | "register" }) {
  const [error, setError]     = useState("");
  const [loading, setLoading] = useState(false);

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");
    const f = new FormData(e.currentTarget);
    try {
      const s =
        mode === "login"
          ? await authApi.login(String(f.get("email")), String(f.get("password")))
          : await authApi.register(
              String(f.get("email")),
              String(f.get("username")),
              String(f.get("password")),
            );
      sessionStorage.setItem("mada_access_token", s.access_token);
      location.assign("/dashboard");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Tsy afaka niditra. Andamy indray.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="grid min-h-screen md:grid-cols-[.88fr_1.12fr]">
      {/* Panel gauche — identité Madagasikara */}
      <section className="relative hidden overflow-hidden bg-[#1F2937] p-12 text-white md:block">
        <div className="topo absolute inset-0 opacity-25" />
        <MadaPattern className="absolute right-0 top-0 h-full w-40 text-[#679436] opacity-15" />

        <div className="relative">
          <Wordmark />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <p className="mt-36 text-xs font-black uppercase tracking-[.24em] text-[#a7d270]">
              Ny fifaninanana dia manomboka eto
            </p>
            <h1
              className="display mt-5 text-7xl leading-[.82]"
              dangerouslySetInnerHTML={{ __html: title }}
            />
            <p className="mt-9 max-w-sm text-sm leading-6 text-white/65">
              Ny valiny tsirairay dia mamerina ny toeranao. Ny fanamby tsirairay dia
              fahafahana handroso.
            </p>
          </motion.div>

          {/* Motif rary décoratif */}
          <div className="absolute bottom-0 left-0 right-0 h-32 lamba opacity-10" />
        </div>
      </section>

      {/* Panel droit — formulaire */}
      <section className="flex items-center justify-center p-6">
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.45 }}
          className="w-full max-w-md"
        >
          {/* Logo mobile */}
          <div className="md:hidden mb-8">
            <Wordmark />
          </div>

          <p className="text-xs font-black uppercase tracking-[.2em] text-[#679436]">
            Elanelana ny mpilalao
          </p>
          <h2 className="display mt-3 text-4xl">
            {mode === "login" ? "TONGA SOA INDRAY." : "MIDIRA AO AMIN'NY ARENA."}
          </h2>

          <form onSubmit={submit} className="mt-9 space-y-5">
            {mode === "register" && (
              <Field label="Anaran-tsina" name="username" minLength={3} placeholder="lova_malagasy" />
            )}
            <Field label="Adiresy email" name="email" type="email" placeholder="email@example.com" />
            <Field label="Teny miafina" name="password" type="password" minLength={8} placeholder="••••••••" />

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

            <Button disabled={loading} className="w-full" variant="secondary">
              {loading
                ? "Miandry…"
                : mode === "login"
                ? "Hiditra"
                : "Mamorona kaonty"}
            </Button>
          </form>

          {mode === "login" && (
            <Link
              href="/forgot-password"
              className="mt-5 block text-center text-sm font-bold text-[#679436] hover:underline"
            >
              Nadino ny teny miafina?
            </Link>
          )}

          <p className="mt-8 text-center text-sm text-slate-500">
            {mode === "login" ? "Tsy mbola manana kaonty?" : "Manana kaonty sahady?"}{" "}
            <Link
              className="font-bold text-[#1F2937] underline"
              href={mode === "login" ? "/register" : "/login"}
            >
              {mode === "login" ? "Mamorona kaonty" : "Hiditra"}
            </Link>
          </p>
        </motion.div>
      </section>
    </main>
  );
}

export default function Login() {
  return <Auth title="MIVERINA<br/>INDRAY." mode="login" />;
}

function Field(p: {
  label: string;
  name: string;
  type?: string;
  minLength?: number;
  placeholder?: string;
}) {
  return (
    <label className="block text-sm font-bold">
      {p.label}
      <input
        required
        {...p}
        className="mt-2 w-full border border-[#D7DFD0] px-3 py-3 font-normal outline-none focus:border-[#679436] transition"
      />
    </label>
  );
}
