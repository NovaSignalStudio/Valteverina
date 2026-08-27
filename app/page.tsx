import type { Metadata } from "next";
import ValTeverinaHomeV3 from "./ValTeverinaHomeV3";

export const metadata: Metadata = {
  title: "Val Teverina — Esperienze e sentieri tra Tuscia e Umbria",
  description:
    "Esperienze, sentieri, borghi e guide lungo il Tevere, tra la Tuscia viterbese e l'Umbria meridionale.",
};

export default function Home() {
  return <ValTeverinaHomeV3 />;
}
