/* eslint-disable @next/next/no-html-link-for-pages, @next/next/no-img-element */

import {
  experienceItems,
  journalItems,
  primaryNavigation,
  territoryDetails,
  trailItems,
} from "./site-data";
import { sitePath } from "./site-path";

type Fact = { label: string; value: string };
type Experience = (typeof experienceItems)[number];
type Trail = (typeof trailItems)[number];
type Territory = (typeof territoryDetails)[number];
type Journal = (typeof journalItems)[number];

function DetailHeader() {
  return (
    <header className="detail-header">
      <a className="wordmark" href={sitePath("/")} aria-label="Val Teverina, home">
        <span className="wordmark__mark">VT</span><span>Val Teverina</span>
      </a>
      <nav aria-label="Navigazione principale">
        {primaryNavigation.slice(0, 4).map((item) => <a key={item.href} href={item.href}>{item.label}</a>)}
      </nav>
      <a className="detail-header__cta" href={sitePath("/community")}>Organizza il viaggio ↗</a>
    </header>
  );
}

function DetailFooter() {
  return (
    <footer className="site-footer detail-footer">
      <div className="footer-brand"><span className="wordmark__mark">VT</span><strong>Val Teverina</strong></div>
      <div className="footer-links">{primaryNavigation.map((item) => <a key={item.href} href={item.href}>{item.label}</a>)}</div>
      <div className="footer-meta"><p>La valle del fiume sacro</p><p>© 2026 Val Teverina</p></div>
    </footer>
  );
}

function DetailShell({
  backHref,
  backLabel,
  eyebrow,
  title,
  intro,
  image,
  facts,
  children,
}: {
  backHref: string;
  backLabel: string;
  eyebrow: string;
  title: string;
  intro: string;
  image: string;
  facts: Fact[];
  children: React.ReactNode;
}) {
  return (
    <main className="vt3-shell detail-page">
      <DetailHeader />
      <section className="detail-hero">
        <img src={image} alt="" />
        <div className="detail-hero__shade" />
        <a className="detail-back" href={sitePath(backHref)}>← {backLabel}</a>
        <div className="detail-hero__title"><p>{eyebrow}</p><h1>{title}</h1></div>
        <p className="detail-hero__intro">{intro}</p>
      </section>
      <section className="detail-facts" aria-label="Informazioni essenziali">
        {facts.map((fact) => <div key={fact.label}><span>{fact.label}</span><strong>{fact.value}</strong></div>)}
      </section>
      {children}
      <DetailFooter />
    </main>
  );
}

function RequestPanel({ title, note }: { title: string; note: string }) {
  return (
    <section className="detail-request">
      <p>Porta d’ingresso</p>
      <h2>{title}</h2>
      <div><p>{note}</p><a href={sitePath("/community")}>Richiedi informazioni <span>↗</span></a></div>
    </section>
  );
}

export function ExperienceDetail({ item }: { item: Experience }) {
  const gallery = experienceItems.filter((candidate) => candidate.slug !== item.slug).slice(0, 2);
  return (
    <DetailShell
      backHref="/esperienze"
      backLabel="Tutte le esperienze"
      eyebrow={`${item.category} · ${item.location}`}
      title={item.title}
      intro={item.description}
      image={item.image}
      facts={[
        { label: "Dove", value: item.location },
        { label: "Durata", value: item.duration },
        { label: "Con chi", value: item.host.replace(/^Con |^Nella /, "") },
        { label: "Gruppo", value: "2–8 persone" },
      ]}
    >
      <section className="detail-editorial">
        <div className="detail-editorial__lead"><p>Dentro l’esperienza</p><h2>Non assistere.<br /><em>Prendi parte.</em></h2></div>
        <div className="detail-story-grid">
          <div className="detail-story-grid__copy"><p>{item.description}</p><p>Il tempo è pensato per conoscere la persona che conduce l’attività, capire da dove nasce il suo lavoro e provare in prima persona un gesto legato al territorio.</p></div>
          <ol className="detail-steps">
            <li><div><strong>L’incontro</strong><p>Si comincia dalla storia di chi apre il proprio spazio e dal legame con {item.location}.</p></div></li>
            <li><div><strong>Il gesto</strong><p>Materiali, strumenti e pratica: la parte centrale si vive con le mani, non davanti a uno schermo.</p></div></li>
            <li><div><strong>Ciò che resta</strong><p>Un oggetto, un sapore o un modo diverso di leggere la valle da portare con sé.</p></div></li>
          </ol>
        </div>
        <div className="detail-gallery">{gallery.map((image) => <figure key={image.slug}><img src={image.image} alt="" /><figcaption>{image.location} · Materia e comunità</figcaption></figure>)}</div>
      </section>
      <RequestPanel title="Vuoi viverla davvero?" note="La disponibilità definitiva verrà confermata direttamente dall’host. Inviaci il periodo e il numero di partecipanti." />
    </DetailShell>
  );
}

export function TrailDetail({ item }: { item: Trail }) {
  return (
    <DetailShell
      backHref="/sentieri-guide"
      backLabel="Sentieri e guide"
      eyebrow={item.route}
      title={item.name}
      intro={item.note}
      image={item.image}
      facts={[
        { label: "Distanza", value: item.length },
        { label: "Tempo", value: item.time },
        { label: "Difficoltà", value: item.level },
        { label: "Fondo", value: "Misto" },
      ]}
    >
      <section className="detail-editorial trail-dossier">
        <div className="detail-editorial__lead"><p>Taccuino di percorso</p><h2>Una linea da seguire.<br /><em>Deviazioni comprese.</em></h2></div>
        <div className="trail-timeline">
          <article><span>A</span><div><small>Partenza</small><h3>{item.route.split(" · ")[0]}</h3><p>Ingresso al percorso, controllo dell’attrezzatura e primo orientamento.</p></div></article>
          <article><span>B</span><div><small>Nel paesaggio</small><h3>{item.note.split(" e ")[0]}</h3><p>Il tratto in cui il sentiero cambia ritmo e il territorio diventa racconto.</p></div></article>
          <article><span>C</span><div><small>Arrivo</small><h3>{item.route.split(" · ")[1] ?? "Val Teverina"}</h3><p>Tempo per una sosta, un incontro e il rientro verso la valle.</p></div></article>
        </div>
        <aside className="detail-practical"><strong>Prima di partire</strong><p>Traccia, dislivello, stagionalità, punti d’acqua e contatti utili saranno confermati nella scheda operativa definitiva.</p></aside>
      </section>
      <RequestPanel title="Porta la guida con te." note="Richiedi la scheda completa del percorso e ricevi gli aggiornamenti prima della partenza." />
    </DetailShell>
  );
}

export function TerritoryDetail({ item }: { item: Territory }) {
  const relatedExperience = experienceItems.find((experience) => experience.location.includes(item.name.split(" ")[0])) ?? experienceItems[0];
  const relatedTrail = trailItems.find((trail) => trail.route.includes(item.name.split(" ")[0])) ?? trailItems[0];
  return (
    <DetailShell
      backHref="/territori"
      backLabel="I diciassette territori"
      eyebrow={`${item.area} · ${item.position}`}
      title={item.name}
      intro={item.intro}
      image={item.image}
      facts={[
        { label: "Area", value: item.area },
        { label: "Tempo consigliato", value: item.visitTime },
        { label: "Da non perdere", value: item.focus },
        { label: "Paesaggio", value: "Valle del Tevere" },
      ]}
    >
      <section className="detail-editorial territory-dossier">
        <div className="detail-editorial__lead"><p>Da dove cominciare</p><h2>{item.name}.<br /><em>{item.focus}.</em></h2></div>
        <div className="territory-summary">
          <div className="territory-summary__intro">
            <p>{item.intro}</p>
            <dl><div><dt>Tempo</dt><dd>{item.visitTime}</dd></div><div><dt>Area</dt><dd>{item.area}</dd></div></dl>
          </div>
          <div className="territory-highlights" aria-label={`Cosa vedere a ${item.name}`}>
            {item.highlights.map((highlight) => <article key={highlight.title}><h3>{highlight.title}</h3><p>{highlight.text}</p></article>)}
          </div>
        </div>
        <div className="detail-connections">
          <p>Continua il viaggio</p>
          <a href={sitePath(`/esperienze/${relatedExperience.slug}`)}><small>Experience</small><strong>{relatedExperience.title}</strong><span>↗</span></a>
          <a href={sitePath(`/sentieri-guide/${relatedTrail.slug}`)}><small>Sentiero</small><strong>{relatedTrail.name}</strong><span>↗</span></a>
        </div>
      </section>
      <RequestPanel title={`Organizza la tappa a ${item.name}.`} note="Indicaci periodo, durata e modo di viaggiare: riceverai un orientamento tra luoghi, attività e percorsi collegati." />
    </DetailShell>
  );
}

export function JournalDetail({ item }: { item: Journal }) {
  return (
    <DetailShell
      backHref="/blog"
      backLabel="Tutte le storie"
      eyebrow={`${item.category} · Lettura ${item.read}`}
      title={item.title}
      intro={item.excerpt}
      image={item.image}
      facts={[
        { label: "Tema", value: item.category },
        { label: "Lettura", value: item.read },
        { label: "Luogo", value: "Val Teverina" },
        { label: "Archivio", value: "Journal" },
      ]}
    >
      <article className="detail-article">
        <p className="detail-article__drop">{item.excerpt}</p>
        <p>Qui il paesaggio non è soltanto uno sfondo. Entra nelle abitudini, nel lavoro e nel modo in cui le persone raccontano ciò che fanno. Per capirlo bisogna avvicinarsi, lasciare la strada principale e dare tempo alle conversazioni.</p>
        <figure className="detail-article__manifesto">
          <img src={item.image} alt="" />
          <div>
            <span>Voce della valle · Journal</span>
            <blockquote>“Un territorio diventa riconoscibile quando <em>le sue differenze cominciano a parlare tra loro.</em>”</blockquote>
            <figcaption>Paesaggio, persone, relazioni</figcaption>
          </div>
        </figure>
        <p>Val Teverina raccoglie queste voci senza trasformarle in folklore. Le mette in relazione: il gesto di una bottega con la materia del luogo, una ricetta con la memoria di una famiglia, un sentiero con i paesi che attraversa.</p>
        <p>È da questa prossimità che nasce un viaggio diverso. Non una sequenza di cartoline, ma una geografia vissuta, capace di continuare anche dopo il ritorno.</p>
        <footer><span>Val Teverina Journal</span><span>Agosto 2026</span></footer>
      </article>
      <RequestPanel title="Continua a leggere la valle." note="Entra nella community per ricevere nuovi itinerari, incontri e storie dal territorio." />
    </DetailShell>
  );
}
