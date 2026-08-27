import type { Metadata } from "next";

export function pageMetadata(title: string, description: string, image: string): Metadata {
  return {
    title,
    description,
    openGraph: { title, description, images: [{ url: image }], locale: "it_IT", type: "website" },
    twitter: { card: "summary_large_image", title, description, images: [image] },
  };
}
