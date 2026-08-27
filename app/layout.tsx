import type { Metadata } from "next";
import { sitePath } from "./site-path";
import "./globals.css";
import "./val-teverina-v3.css";
import "./val-teverina-internal-v3.css";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.SITE_URL ?? "http://localhost:3000"),
  title: "Val Teverina — Esperienze e sentieri tra Tuscia e Umbria",
  description:
    "Esperienze, sentieri, borghi e guide lungo il Tevere, tra la Tuscia viterbese e l'Umbria meridionale.",
  openGraph: {
    title: "Val Teverina — Esperienze e sentieri tra Tuscia e Umbria",
    description:
      "Esperienze, sentieri, borghi e guide lungo il Tevere, tra la Tuscia viterbese e l'Umbria meridionale.",
    images: [{ url: sitePath("/og.png"), width: 1732, height: 909, alt: "Val Teverina — La valle del fiume sacro" }],
    locale: "it_IT",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Val Teverina — Esperienze e sentieri tra Tuscia e Umbria",
    description:
      "Esperienze, sentieri, borghi e guide lungo il Tevere, tra la Tuscia viterbese e l'Umbria meridionale.",
    images: [sitePath("/og.png")],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="it">
      <body>{children}</body>
    </html>
  );
}
