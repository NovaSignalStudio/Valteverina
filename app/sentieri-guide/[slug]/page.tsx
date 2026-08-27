import { TrailDetail } from "../../DetailPages";
import { trailItems } from "../../site-data";
import { pageMetadata } from "../../site-metadata";
import { sitePath } from "../../site-path";

export function generateStaticParams() {
  return trailItems.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const item = trailItems.find((entry) => entry.slug === slug);
  return item ? pageMetadata(`${item.name} — Val Teverina`, item.note, item.image) : {};
}

export default async function TrailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const item = trailItems.find((entry) => entry.slug === slug);
  return item ? <TrailDetail item={item} /> : <main className="missing-page"><h1>Percorso non trovato.</h1><a href={sitePath("/sentieri-guide")}>Torna ai sentieri</a></main>;
}
