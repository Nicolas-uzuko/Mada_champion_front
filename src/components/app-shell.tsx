"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home, Trophy, PlusSquare, Gamepad2,
  ScrollText, BarChart3, UserRound, Settings, LogOut,
} from "lucide-react";
import { Wordmark } from "@/components/ui";

const LINKS = [
  { Icon: Home,       label: "Fandraisana",       href: "/dashboard" },
  { Icon: Trophy,     label: "Fifaninanana",       href: "/challenges" },
  { Icon: PlusSquare, label: "Mamorona Fanamby",  href: "/challenges/create" },
  { Icon: Gamepad2,   label: "Lalao Ataoko",       href: "/challenges" },
  { Icon: ScrollText, label: "Tantara",             href: "/history" },
  { Icon: BarChart3,  label: "Antontanisa",         href: "/profile" },
  { Icon: UserRound,  label: "Kaontiko",            href: "/profile" },
] as const;

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-screen flex flex-col bg-[#F8FAF5] md:grid md:grid-cols-[240px_1fr] overflow-hidden">
      <Sidebar />
      <main className="min-w-0 flex-1 overflow-auto relative">{children}</main>
    </div>
  );
}

function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="flex-shrink-0 border-b border-[#D7DFD0] bg-white z-10 md:border-b-0 md:border-r md:flex md:flex-col">
      {/* Logo */}
      <div className="border-b border-[#D7DFD0] p-5">
        <Wordmark />
      </div>

      {/* Navigation */}
      <nav className="flex gap-1 overflow-auto p-3 md:flex-col md:overflow-y-auto md:flex-1">
        {LINKS.map(({ Icon, label, href }) => {
          const active = pathname === href || (href !== "/dashboard" && pathname?.startsWith(href));
          return (
            <Link
              key={`${href}-${label}`}
              href={href}
              className={`flex shrink-0 items-center gap-3 rounded-sm px-3 py-3 text-sm font-bold transition ${
                active
                  ? "bg-[#eff3e9] text-[#679436]"
                  : "text-slate-600 hover:bg-[#eff3e9] hover:text-[#1F2937]"
              }`}
            >
              <Icon size={17} className={active ? "text-[#679436]" : ""} />
              <span className="hidden md:block">{label}</span>
            </Link>
          );
        })}
      </nav>

      {/* User section */}
      <div className="hidden md:block border-t border-[#D7DFD0] p-5">
        <div className="flex items-center gap-3">
          <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[#eff3e9] text-xs font-black text-[#679436]">
            MR
          </span>
          <div className="min-w-0">
            <p className="truncate text-sm font-black">Mpilalao</p>
            <p className="text-xs text-slate-500">Sokajy Volamena</p>
          </div>
        </div>
        <button
          onClick={() => {
            sessionStorage.removeItem("mada_access_token");
            location.assign("/login");
          }}
          className="mt-4 flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-[#1F2937] transition"
        >
          <LogOut size={14} /> Hivoaka
        </button>
      </div>
    </aside>
  );
}

export function AppHeader({
  eyebrow,
  title,
  children,
}: {
  eyebrow: string;
  title: string;
  children?: React.ReactNode;
}) {
  return (
    <header className="flex flex-wrap items-end justify-between gap-5 border-b border-[#D7DFD0] bg-white px-5 py-8 md:px-10">
      <div>
        <p className="text-[10px] font-black uppercase tracking-[.2em] text-[#679436]">{eyebrow}</p>
        <h1 className="display mt-2 text-4xl leading-none">{title}</h1>
      </div>
      {children}
    </header>
  );
}
