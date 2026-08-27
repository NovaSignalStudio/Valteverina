import InternalPage from "../InternalPages";
import { pageMetadata } from "../site-metadata";

export const metadata = pageMetadata("Community — Val Teverina", "Entra nella community di Val Teverina e resta in contatto con la valle.", "https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&fm=jpg&q=86&w=2200");
export default function CommunityPage() { return <InternalPage kind="community" />; }
