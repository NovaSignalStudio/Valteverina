import { TerritoryDetail } from "../../DetailPages";
import { territoryDetails } from "../../site-data";
import { pageMetadata } from "../../site-metadata";
import { sitePath } from "../../site-path";

export function generateStaticParams() {
  return territoryDetails.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const item = territoryDetails.find((entry) => entry.slug === slug);
  return item ? pageMetadata(`${item.name} — Val Teverina`, item.intro, item.image) : {};
}

export default async function TerritoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const item = territoryDetails.find((entry) => entry.slug === slug);
  return item ? <TerritoryDetail item={item} /> : <main className="missing-page"><h1>Territorio non trovato.</h1><a href={sitePath("/territori")}>Torna ai territori</a></main>;
}
