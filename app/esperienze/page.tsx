import InternalPage from "../InternalPages";
import { pageMetadata } from "../site-metadata";

export const metadata = pageMetadata("Esperienze — Val Teverina", "Esperienze autentiche con artigiani, produttori, guide e comunità della Val Teverina.", "https://images.unsplash.com/photo-1781389005078-d9e413d89c94?auto=format&fit=crop&fm=jpg&q=86&w=2200");
export default function ExperiencesPage() { return <InternalPage kind="experiences" />; }
