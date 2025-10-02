import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "NovaGrow Dashboard",
  description: "Nourriture sans frontières, culture sans limites."
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  );
}
