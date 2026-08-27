import InternalPage from "../InternalPages";
import { pageMetadata } from "../site-metadata";

export const metadata = pageMetadata("Il progetto — Val Teverina", "La visione, gli obiettivi e la rete territoriale di Val Teverina.", "https://www.agriturismosomaia.it/wp-content/uploads/2019/12/nazzano-1.jpg");
export default function ProjectPage() { return <InternalPage kind="project" />; }
