"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { AppHeader, AppShell } from "@/components/app-shell";
import { Button, CategorySelect } from "@/components/ui";
import { challengeApi } from "@/lib/api";
import { CheckCircle2 } from "lucide-react";

/* ─── Dingana 5 ──────────────────────────────────────────── */
const DINGANA = [
  "Mombamomba",
  "Sokajy",
  "Fanontaniana",
  "Fanamarinana",
  "Handefa",
];

/* ─── Field générique ─────────────────────────────────────── */
function Field({
  label,
  name,
  type = "text",
  placeholder,
  value,
  required = true,
}: {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  value?: string;
  required?: boolean;
}) {
  return (
    <label className="block text-sm font-bold">
      {label}
      <input
        required={required}
        name={name}
        type={type}
        defaultValue={value}
        placeholder={placeholder}
        min={type === "number" ? 1 : undefined}
        className="mt-2 w-full border border-[#D7DFD0] px-3 py-3 font-normal outline-none focus:border-[#679436] transition"
      />
    </label>
  );
}

export default function Create() {
  const router = useRouter();
  const [busy, setBusy]       = useState(false);
  const [error, setError]     = useState("");
  const [success, setSuccess] = useState(false);

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setBusy(true);
    setError("");
    const f = new FormData(e.currentTarget);

    // Combine date + time
    const date = String(f.get("date"));
    const time = String(f.get("time")) || "00:00";
    const scheduled_at = new Date(`${date}T${time}`).toISOString();

    try {
      const challenge = await challengeApi.create({
        title:                     String(f.get("title")),
        description:               String(f.get("description")),
        category:                  String(f.get("category")),
        scheduled_at,
        max_participants:          Number(f.get("max_participants")),
        question_duration_seconds: Number(f.get("duration")),
        question_count:            Number(f.get("question_count")),
      });
      setSuccess(true);
      setTimeout(() => router.push(`/challenges/${challenge.id}/lobby`), 1200);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Tsy afaka namorona. Andamy indray.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <AppShell>
      <AppHeader eyebrow="Ateliey famoronana" title="MAMORONA FANAMBY." />

      <div className="mx-auto max-w-3xl p-5 md:p-10">
        {/* Barre de progression dingana */}
        <div className="mb-8 grid grid-cols-5 gap-1">
          {DINGANA.map((s, i) => (
            <span
              key={s}
              className={`border-t-4 pt-2 text-[9px] font-black uppercase ${
                i === 0 ? "border-[#679436] text-[#679436]" : "border-[#D7DFD0] text-slate-400"
              }`}
            >
              {i + 1}. {s}
            </span>
          ))}
        </div>

        <motion.form
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          onSubmit={submit}
          className="border border-[#D7DFD0] bg-white p-6 md:p-9"
        >
          <h2 className="display text-3xl">NY FOTOTRA NY FANAMBY.</h2>
          <p className="mt-3 text-sm text-slate-500">
            Voahary toy ny taratasy voahosotra ny fanamby. Ampidiro ny fanontaniana
            avy eo alohan'ny handefa azy.
          </p>

          <div className="mt-7 grid gap-5 md:grid-cols-2">
            {/* Lohateny */}
            <div className="md:col-span-2">
              <Field name="title" label="Lohateny" placeholder="Ohatra: Kolontsaina Malagasy — Dingana 01" />
            </div>

            {/* Sokajy — Select natif malagasy */}
            <div className="md:col-span-2">
              <label className="block text-sm font-bold">
                Sokajy
                <div className="mt-2">
                  <CategorySelect name="category" />
                </div>
              </label>
            </div>

            {/* Daty sy ora */}
            <Field name="date" label="Daty" type="date" />
            <Field name="time" label="Ora" type="time" value="20:00" />

            {/* Isa mpandray anjara sy fanontaniana */}
            <Field name="max_participants"  label="Isan'ny mpandray anjara"       type="number" value="32" />
            <Field name="question_count"    label="Isan'ny fanontaniana"           type="number" value="10" />
            <Field name="duration"          label="Segondra isaky ny fanontaniana" type="number" value="20" />
          </div>

          {/* Famaritana */}
          <label className="mt-5 block text-sm font-bold">
            Famaritana
            <textarea
              required
              name="description"
              placeholder="Lazao briefly ny tanjona sy ny lohahevitry ny fanamby…"
              className="mt-2 min-h-28 w-full border border-[#D7DFD0] p-3 font-normal outline-none focus:border-[#679436] transition resize-none"
            />
          </label>

          {/* Hadisoana */}
          {error && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              role="alert"
              className="mt-5 border-l-2 border-red-600 bg-red-50 p-3 text-sm text-red-700"
            >
              {error}
            </motion.p>
          )}

          {/* Fahombiazana */}
          {success && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mt-5 flex items-center gap-2 border-l-2 border-[#0FAC71] bg-[#e5f4ed] p-3 text-sm text-[#08734b] font-bold"
            >
              <CheckCircle2 size={16} />
              Vita ny famoronana! Alefa amin'ny lobby…
            </motion.div>
          )}

          {/* Boutons */}
          <div className="mt-8 flex flex-wrap gap-3">
            <Button disabled={busy || success} type="submit" variant="ghost">
              💾 {busy ? "Miandry…" : "Tehirizo"}
            </Button>
            <Button disabled={busy || success} type="submit" variant="secondary">
              🚀 {busy ? "Miandry…" : "Alefa"}
            </Button>
          </div>
        </motion.form>
      </div>
    </AppShell>
  );
}
