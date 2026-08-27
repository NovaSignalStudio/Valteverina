import InternalPage from "../InternalPages";
import { pageMetadata } from "../site-metadata";

export const metadata = pageMetadata("Territori — Val Teverina", "I comuni e i paesaggi collegati dal Tevere tra Tuscia e Umbria.", "https://upload.wikimedia.org/wikipedia/commons/3/35/Civita_di_Bagnoregio_aerial_panorama._June_2024.jpg");
export default function TerritoriesPage() { return <InternalPage kind="territories" />; }
