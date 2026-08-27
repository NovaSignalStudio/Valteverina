"use client";

/* eslint-disable @next/next/no-html-link-for-pages, @next/next/no-img-element */

import { FormEvent, useEffect, useMemo, useState } from "react";
import {
  experienceItems,
  journalItems,
  merchItems,
  primaryNavigation,
  toSlug,
  territoryItems,
  trailItems,
} from "./site-data";
import { sitePath } from "./site-path";

export type PageKind = "project" | "experiences" | "trails" | "territories" | "merch" | "blog" | "community";

const pageMeta: Record<PageKind, { eyebrow: string; title: string; intro: string; image: string }> = {
  project: {
    eyebrow: "Il progetto",
    title: "Val Teverina mette in relazione ciò che il fiume unisce.",
    intro: "Un progetto territoriale tra Tuscia viterbese e Umbria meridionale: borghi, comunità e attività diventano un racconto comune, senza perdere la propria identità.",
    image: "https://www.agriturismosomaia.it/wp-content/uploads/2019/12/nazzano-1.jpg",
  },
  experiences: {
    eyebrow: "Esperienze",
    title: "Incontra chi lavora, cucina e custodisce la valle.",
    intro: "Attività in piccoli gruppi con artigiani, produttori, guide e abitanti. Ogni esperienza indica luogo, durata e persona che ti accoglie.",
    image: "https://images.unsplash.com/photo-1781389005078-d9e413d89c94?auto=format&fit=crop&fm=jpg&q=86&w=2200",
  },
  trails: {
    eyebrow: "Sentieri & Guide",
    title: "Percorsi per attraversare la valle, con il passo giusto.",
    intro: "Distanza, durata, difficoltà e tappe: informazioni chiare per scegliere un cammino e collegare più luoghi nello stesso viaggio.",
    image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&fm=jpg&q=88&w=2200",
  },
  territories: {
    eyebrow: "Territori",
    title: "Paesi diversi. Un paesaggio da leggere insieme.",
    intro: "Ogni scheda raccoglie identità, cose da vedere, tempo consigliato e collegamenti con esperienze e sentieri vicini.",
    image: "https://upload.wikimedia.org/wikipedia/commons/3/35/Civita_di_Bagnoregio_aerial_panorama._June_2024.jpg",
  },
  merch: {
    eyebrow: "Merch",
    title: "Oggetti progettati qui, con materiali e storie della valle.",
    intro: "Una collezione in sviluppo con realtà locali: strumenti per il viaggio, piccole edizioni e materiali scelti con attenzione.",
    image: "https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&fm=jpg&q=86&w=2200",
  },
  blog: {
    eyebrow: "Journal",
    title: "Le persone che danno forma alla valle.",
    intro: "Storie da leggere con calma: botteghe, paesi, gesti e trasformazioni raccontati da chi li vive da vicino.",
    image: "https://www.visitarelatuscia.it/wp-content/uploads/2022/02/IMG_20210515_140708-scaled.jpg",
  },
  community: {
    eyebrow: "Community",
    title: "La rete di chi vive, lavora e torna in Val Teverina.",
    intro: "Uno spazio per ricevere nuove storie, proporre attività e restare in contatto con le persone che rendono vivo il territorio.",
    image: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&fm=jpg&q=86&w=2200",
  },
};

function SiteHeader({ onMenu }: { onMenu: () => void }) {
  return (
    <header className="internal-header">
      <a className="wordmark" href={sitePath("/")} aria-label="Val Teverina, home">
        <span className="wordmark__mark">VT</span>
        <span>Val Teverina</span>
      </a>
      <nav className="site-nav" aria-label="Navigazione principale">
        {primaryNavigation.slice(0, 4).map((item) => <a key={item.href} href={item.href}>{item.label}</a>)}
      </nav>
      <button className="menu-button" type="button" onClick={onMenu}>Menu <span aria-hidden="true">↗</span></button>
    </header>
  );
}

function SiteFooter() {
  return (
    <footer className="site-footer internal-footer">
      <div className="footer-brand"><span className="wordmark__mark">VT</span><strong>Val Teverina</strong></div>
      <div className="footer-links">{primaryNavigation.map((item) => <a key={item.href} href={item.href}>{item.label}</a>)}</div>
      <div className="footer-meta"><p>La valle del fiume sacro</p><p>© 2026 Val Teverina</p></div>
    </footer>
  );
}

function MenuOverlay({ open, onClose }: { open: boolean; onClose: () => void }) {
  return (
    <div className={`menu-overlay ${open ? "is-open" : ""}`} aria-hidden={!open}>
      <div className="menu-overlay__top"><a href={sitePath("/")}>Val Teverina</a><button type="button" onClick={onClose}>Chiudi ×</button></div>
      <nav aria-label="Menu completo">
        {primaryNavigation.map((item) => (
          <a key={item.href} href={item.href}>{item.label}<i>↗</i></a>
        ))}
      </nav>
      <a className="menu-overlay__community" href={sitePath("/community")}>Entra nella community</a>
    </div>
  );
}

function PageHero({ kind }: { kind: PageKind }) {
  const meta = pageMeta[kind];
  return (
    <section className="internal-hero">
      <img src={meta.image} alt="" />
      <div className="internal-hero__shade" />
      <div className="internal-hero__index"><span>Val Teverina</span><i /><span>{meta.eyebrow}</span></div>
      <div className="internal-hero__content">
        <p>{meta.eyebrow}</p>
        <h1>{meta.title}</h1>
      </div>
      <p className="internal-hero__intro">{meta.intro}</p>
    </section>
  );
}

function ProjectBody() {
  return (
    <>
      <section className="internal-editorial project-manifesto project-manifesto--v4">
        <p className="section-kicker">Perché esiste</p>
        <div className="editorial-lead">
          <h2>Diciassette paesi.<br /><em>Una geografia comune.</em></h2>
          <div><p>Val Teverina è il progetto che rende leggibile la valle tra Tuscia viterbese e Umbria meridionale. Non inventa un nuovo territorio: collega ciò che esiste già.</p><p>Luoghi, persone, produzioni e cammini diventano un sistema accessibile per chi arriva e uno strumento condiviso per chi qui vive e lavora.</p></div>
        </div>
      </section>
      <section className="project-river" aria-label="Il sistema Val Teverina">
        <div className="project-river__line" aria-hidden="true" />
        <figure className="project-river__image project-river__image--land"><img src="https://upload.wikimedia.org/wikipedia/commons/3/35/Civita_di_Bagnoregio_aerial_panorama._June_2024.jpg" alt="Il paesaggio della Val Teverina" /></figure>
        <figure className="project-river__image project-river__image--hands"><img src={experienceItems[0].image} alt="Una bottega artigiana della valle" /></figure>
        {[
          ["Il territorio", "Borghi e paesaggi non come punti isolati, ma come tappe di uno stesso viaggio."],
          ["Le relazioni", "Attività condotte da chi custodisce saperi, materie e memorie del luogo."],
          ["Il tempo", "Un invito a fermarsi, deviare e costruire un legame che continui oltre la visita."],
        ].map(([title, text], index) => <article className={`project-river__chapter project-river__chapter--${index + 1}`} key={title}><span>0{index + 1}</span><h3>{title}</h3><p>{text}</p></article>)}
        <p className="project-river__signature">Il Tevere è la linea che orienta il racconto.</p>
      </section>
      <section className="internal-quote internal-quote--v4"><p>Un’identità comune non rende i luoghi uguali. Li rende <em>visibili insieme.</em></p></section>
    </>
  );
}

function ExperiencesBody() {
  const [active, setActive] = useState("Tutte");
  const [selected, setSelected] = useState(0);
  const categories = ["Tutte", ...Array.from(new Set(experienceItems.map((item) => item.category)))];
  const visible = useMemo(() => active === "Tutte" ? experienceItems : experienceItems.filter((item) => item.category === active), [active]);
  const current = visible[Math.min(selected, visible.length - 1)] ?? experienceItems[0];
  const chooseCategory = (category: string) => { setActive(category); setSelected(0); };
  return (
    <section className="internal-editorial experiences-catalog experiences-catalog--v4">
      <div className="catalog-toolbar">
        <p>{visible.length} incontri da vivere</p>
        <div className="catalog-filters" aria-label="Filtra le esperienze">{categories.map((category) => <button className={active === category ? "is-active" : ""} type="button" key={category} onClick={() => chooseCategory(category)}>{category}</button>)}</div>
      </div>
      <div className="experience-index">
        <a className="experience-index__stage" href={sitePath(`/esperienze/${current.slug}`)}>
          {visible.map((item, index) => <img className={index === selected ? "is-active" : ""} src={item.image} alt="" key={item.slug} />)}
          <div className="experience-index__caption"><span>{current.category} · {current.location}</span><strong>{current.host}</strong></div>
          <i>Apri l’esperienza ↗</i>
        </a>
        <div className="experience-index__list">
          {visible.map((item, index) => (
            <a className={index === selected ? "is-active" : ""} href={sitePath(`/esperienze/${item.slug}`)} key={item.title} onMouseEnter={() => setSelected(index)} onFocus={() => setSelected(index)}>
              <span>0{index + 1}</span>
              <div><h2>{item.title}</h2><p>{item.description}</p></div>
              <small>{item.location}<br />{item.duration}</small><i>↗</i>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

function TrailsBody() {
  const [featured, ...routes] = trailItems;
  return (
    <>
      <a className="trail-feature" href={sitePath(`/sentieri-guide/${featured.slug}`)}>
        <img src={featured.image} alt="" />
        <div className="trail-feature__shade" />
        <p>Itinerario in evidenza · {featured.route}</p>
        <h2>{featured.name}</h2>
        <dl><div><dt>Lunghezza</dt><dd>{featured.length}</dd></div><div><dt>Tempo</dt><dd>{featured.time}</dd></div><div><dt>Livello</dt><dd>{featured.level}</dd></div></dl>
        <span>Apri il dossier ↗</span>
      </a>
      <section className="internal-editorial trail-list">
        <div className="trail-list__intro"><p className="section-kicker">Altri percorsi</p><p>Ogni traccia è un modo diverso di leggere la valle: dati essenziali, paesaggio e punti di relazione.</p></div>
        {routes.map((trail) => (
          <article key={trail.name}>
            <div><p>{trail.route}</p><h2>{trail.name}</h2><small>{trail.note}</small></div>
            <dl><div><dt>Lunghezza</dt><dd>{trail.length}</dd></div><div><dt>Tempo</dt><dd>{trail.time}</dd></div><div><dt>Livello</dt><dd>{trail.level}</dd></div></dl>
            <a href={sitePath(`/sentieri-guide/${trail.slug}`)} aria-label={`Apri la guida per ${trail.name}`}>↗</a>
          </article>
        ))}
      </section>
      <section className="guide-note"><h2>Prima di partire</h2><p>Le schede definitive includeranno traccia, dislivello, fondo, stagionalità, punti d’acqua, accessibilità e contatti utili.</p></section>
    </>
  );
}

function TerritoriesBody() {
  const [selected, setSelected] = useState(0);
  const images = [
    "https://upload.wikimedia.org/wikipedia/commons/3/35/Civita_di_Bagnoregio_aerial_panorama._June_2024.jpg",
    "https://www.photohound.co/images/41726l.jpg",
    "https://www.visitarelatuscia.it/wp-content/uploads/2022/02/IMG_20210515_140708-scaled.jpg",
    "https://www.agriturismosomaia.it/wp-content/uploads/2019/12/nazzano-1.jpg",
  ];
  return (
    <section className="internal-editorial territory-index-page territory-index-page--v4">
      <div className="territory-atlas">
        <p className="section-kicker section-kicker--light">Atlante della valle</p>
        {images.map((image, index) => <img className={selected % images.length === index ? "is-active" : ""} src={image} alt="" key={image} />)}
        <div><strong>{territoryItems[selected][0]}</strong><span>{territoryItems[selected][1]} · {territoryItems[selected][2]}</span></div>
      </div>
      <div className="territory-list">
        <div className="territory-list__heading"><p>17 paesi da leggere insieme</p><span>Tuscia · Umbria</span></div>
        {territoryItems.map(([name, area, note], index) => (
          <a className={index === selected ? "is-active" : ""} href={sitePath(`/territori/${toSlug(name)}`)} key={name} onMouseEnter={() => setSelected(index)} onFocus={() => setSelected(index)}><strong>{name}</strong><small>{area}</small><p>{note}</p><i>↗</i></a>
        ))}
      </div>
    </section>
  );
}

function MerchBody() {
  return (
    <>
      <section className="internal-editorial merch-intro-grid">
        <div><p className="section-kicker">Prima collezione</p><h2>Oggetti nati dal viaggio.</h2></div>
        <p>Mappe, materiali e oggetti quotidiani progettati insieme a realtà locali. La selezione definitiva verrà pubblicata dopo la fase di prototipazione.</p>
      </section>
      <section className="merch-products">
        {merchItems.map((item, index) => <article key={item.name}><div className={`merch-object merch-object--${index + 1}`} aria-hidden="true" /><h2>{item.name}</h2><p>{item.material}</p><strong>{item.price}</strong><a href={sitePath("/community")}>Avvisami ↗</a></article>)}
      </section>
    </>
  );
}

function BlogBody() {
  return (
    <section className="internal-editorial blog-index">
      {journalItems.map((item, index) => (
        <article className={index === 0 ? "is-featured" : ""} key={item.title}>
          <img src={item.image} alt="" />
          <div><span>{item.category} · {item.read}</span><h2>{item.title}</h2><p>{item.excerpt}</p><a href={sitePath(`/blog/${item.slug}`)}>Leggi la storia ↗</a></div>
        </article>
      ))}
    </section>
  );
}

function CommunityBody() {
  const [submitted, setSubmitted] = useState(false);
  const submit = (event: FormEvent<HTMLFormElement>) => { event.preventDefault(); setSubmitted(true); };
  return (
    <section className="community-page-body">
      <div className="community-page-body__copy"><p className="section-kicker section-kicker--light">Dentro la valle</p><h2>Ricevi soltanto ciò che vale la pena aprire.</h2><p>Nuove esperienze, sentieri, storie e appuntamenti. Poche comunicazioni, curate e legate al territorio.</p></div>
      {submitted ? <div className="community-success" role="status">Sei dentro. La prossima storia parte da qui. <span>✓</span></div> : (
        <form className="community-page-form" onSubmit={submit}>
          <label>Nome<input name="name" autoComplete="name" required /></label>
          <label>Email<input name="email" type="email" autoComplete="email" required /></label>
          <label>Da dove ci segui?<input name="place" /></label>
          <label className="community-page-form__consent"><input type="checkbox" required /> Accetto di ricevere aggiornamenti sul progetto Val Teverina.</label>
          <button type="submit">Entra nella community <span>↗</span></button>
        </form>
      )}
    </section>
  );
}

function Body({ kind }: { kind: PageKind }) {
  if (kind === "project") return <ProjectBody />;
  if (kind === "experiences") return <ExperiencesBody />;
  if (kind === "trails") return <TrailsBody />;
  if (kind === "territories") return <TerritoriesBody />;
  if (kind === "merch") return <MerchBody />;
  if (kind === "blog") return <BlogBody />;
  return <CommunityBody />;
}

export default function InternalPage({ kind }: { kind: PageKind }) {
  const [menuOpen, setMenuOpen] = useState(false);
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);
  return (
    <main className={`vt3-shell internal-page internal-page--${kind}`}>
      <SiteHeader onMenu={() => setMenuOpen(true)} />
      <PageHero kind={kind} />
      <Body kind={kind} />
      {kind !== "community" && <section className="internal-cta"><p>La valle si comprende entrando in relazione.</p><a href={sitePath("/community")}>Entra nella community <span>↗</span></a></section>}
      <SiteFooter />
      <MenuOverlay open={menuOpen} onClose={() => setMenuOpen(false)} />
    </main>
  );
}
