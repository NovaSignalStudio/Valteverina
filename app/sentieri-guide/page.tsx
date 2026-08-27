import InternalPage from "../InternalPages";
import { pageMetadata } from "../site-metadata";

export const metadata = pageMetadata("Sentieri e Guide — Val Teverina", "Percorsi, mappe e guide per attraversare la Val Teverina.", "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&fm=jpg&q=88&w=2200");
export default function TrailsPage() { return <InternalPage kind="trails" />; }
