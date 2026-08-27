import { JournalDetail } from "../../DetailPages";
import { journalItems } from "../../site-data";
import { pageMetadata } from "../../site-metadata";
import { sitePath } from "../../site-path";

export function generateStaticParams() {
  return journalItems.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const item = journalItems.find((entry) => entry.slug === slug);
  return item ? pageMetadata(`${item.title} — Val Teverina`, item.excerpt, item.image) : {};
}

export default async function JournalPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const item = journalItems.find((entry) => entry.slug === slug);
  return item ? <JournalDetail item={item} /> : <main className="missing-page"><h1>Storia non trovata.</h1><a href={sitePath("/blog")}>Torna al journal</a></main>;
}
