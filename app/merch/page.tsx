import InternalPage from "../InternalPages";
import { pageMetadata } from "../site-metadata";

export const metadata = pageMetadata("Merch — Val Teverina", "Oggetti e piccole collezioni nate dalle collaborazioni locali di Val Teverina.", "https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&fm=jpg&q=86&w=2200");
export default function MerchPage() { return <InternalPage kind="merch" />; }
