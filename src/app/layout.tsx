import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Mada Champion — Izay mahalala no maharesy",
  description: "Sehatra fifaninanana ara-tsaina ho an'ny Malagasy rehetra. Tsara ny fahalalana, tsara ny vokatra.",
  keywords: ["quiz", "Madagasikara", "fifaninanana", "fahalalana", "Malagasy"],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="mg">
      <body>{children}</body>
    </html>
  );
}
