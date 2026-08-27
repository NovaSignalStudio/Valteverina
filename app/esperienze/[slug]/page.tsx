import { ExperienceDetail } from "../../DetailPages";
import { experienceItems } from "../../site-data";
import { pageMetadata } from "../../site-metadata";
import { sitePath } from "../../site-path";

export function generateStaticParams() {
  return experienceItems.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const item = experienceItems.find((entry) => entry.slug === slug);
  return item ? pageMetadata(`${item.title} — Val Teverina`, item.description, item.image) : {};
}

export default async function ExperiencePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const item = experienceItems.find((entry) => entry.slug === slug);
  return item ? <ExperienceDetail item={item} /> : <main className="missing-page"><h1>Esperienza non trovata.</h1><a href={sitePath("/esperienze")}>Torna alle esperienze</a></main>;
}
