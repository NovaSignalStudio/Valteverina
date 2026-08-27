"use client";

/* eslint-disable @next/next/no-html-link-for-pages, @next/next/no-img-element */

import { FormEvent, useEffect, useRef, useState } from "react";
import { territoryItems, toSlug, trailItems } from "./site-data";

const experiences = [
  {
    slug: "dare-forma-alla-terra",
    category: "Artigianato",
    title: "Dare forma alla terra",
    location: "Vitorchiano",
    duration: "2 ore",
    host: "Con Marta, ceramista",
    image:
      "https://images.unsplash.com/photo-1781389005078-d9e413d89c94?auto=format&fit=crop&fm=jpg&q=82&w=1600",
  },
  {
    slug: "la-sfoglia-della-domenica",
    category: "Tradizioni",
    title: "La sfoglia della domenica",
    location: "Castiglione in Teverina",
    duration: "3 ore",
    host: "Nella cucina di Luciana",
    image:
      "https://images.unsplash.com/photo-1642354581513-9b6c05f1dd6d?auto=format&fit=crop&fm=jpg&q=82&w=1600",
  },
  {
    slug: "dentro-una-vendemmia",
    category: "Gusto",
    title: "Dentro una vendemmia",
    location: "Civitella d’Agliano",
    duration: "Mezza giornata",
    host: "Con la famiglia Falesco",
    image:
      "https://images.unsplash.com/photo-1636362693426-04a3ff8228c9?auto=format&fit=crop&fm=jpg&q=82&w=1600",
  },
  {
    slug: "il-sentiero-dell-acqua",
    category: "Natura",
    title: "Il sentiero dell’acqua",
    location: "Lugnano in Teverina",
    duration: "4 ore",
    host: "Con una guida della valle",
    image:
      "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&fm=jpg&q=82&w=1600",
  },
];

const territories = [
  {
    slug: "bagnoregio",
    name: "Civita di Bagnoregio",
    area: "Tuscia",
    note: "Un crinale di tufo tra cielo e calanchi.",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/3/35/Civita_di_Bagnoregio_aerial_panorama._June_2024.jpg",
  },
  {
    slug: "vitorchiano",
    name: "Vitorchiano",
    area: "Tuscia",
    note: "La pietra scura, i boschi e il lavoro delle mani.",
    image: "https://www.photohound.co/images/41726l.jpg",
  },
  {
    slug: "celleno",
    name: "Celleno",
    area: "Tuscia",
    note: "Un paese che continua a vivere nelle sue storie.",
    image:
      "https://www.visitarelatuscia.it/wp-content/uploads/2022/02/IMG_20210515_140708-scaled.jpg",
  },
];

const journeys = [
  {
    key: "day",
    label: "Un giorno",
    eyebrow: "Prima esplorazione",
    title: "Civita e la valle dei calanchi",
    route: "Bagnoregio · Lubriano",
    timing: "6–8 ore",
    pace: "A piedi · ritmo lento",
    description: "Civita al mattino, il paesaggio spiegato dal museo geologico e il tramonto dal versante di Lubriano.",
    image: "https://upload.wikimedia.org/wikipedia/commons/3/35/Civita_di_Bagnoregio_aerial_panorama._June_2024.jpg",
    href: "/territori/bagnoregio",
  },
  {
    key: "weekend",
    label: "Un weekend",
    eyebrow: "Borghi e incontri",
    title: "Tufo, botteghe e paesi sospesi",
    route: "Vitorchiano · Celleno · Bagnoregio",
    timing: "2 giorni",
    pace: "In auto · soste a piedi",
    description: "Tre paesi, una bottega artigiana e il paesaggio del tufo: un primo viaggio completo nella Tuscia della valle.",
    image: "https://www.photohound.co/images/41726l.jpg",
    href: "/territori/vitorchiano",
  },
  {
    key: "slow",
    label: "Tre giorni +",
    eyebrow: "Tevere lento",
    title: "Natura, romanico e città antiche",
    route: "Alviano · Lugnano · Amelia",
    timing: "3 giorni",
    pace: "In auto · sentieri facili",
    description: "L’oasi del Tevere, la Collegiata di Lugnano e le mura di Amelia in un itinerario che alterna natura e storia.",
    image: "https://www.agriturismosomaia.it/wp-content/uploads/2019/12/nazzano-1.jpg",
    href: "/territori/alviano",
  },
] as const;

const menuItems = [
  ["Il progetto", "/progetto"],
  ["Esperienze", "/esperienze"],
  ["Sentieri & Guide", "/sentieri-guide"],
  ["Territori", "/territori"],
  ["Merch", "/merch"],
  ["Blog", "/blog"],
];

export default function ValTeverinaSite() {
  const cinemaRef = useRef<HTMLElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [activeJourney, setActiveJourney] = useState<(typeof journeys)[number]["key"]>("weekend");
  const [activeTerritory, setActiveTerritory] = useState(territories[0].slug);
  const selectedJourney = journeys.find((journey) => journey.key === activeJourney) ?? journeys[1];
  const selectedTerritory = territories.find((territory) => territory.slug === activeTerritory) ?? territories[0];

  useEffect(() => {
    const cinema = cinemaRef.current;
    if (!cinema) return;
    let frame = 0;

    const update = () => {
      const rect = cinema.getBoundingClientRect();
      const distance = Math.max(1, cinema.offsetHeight - window.innerHeight);
      const progress = Math.min(1, Math.max(0, -rect.top / distance));
      const titleExit = Math.min(1, progress / 0.42);
      const storyEnter = Math.min(1, Math.max(0, (progress - 0.28) / 0.28));
      const cardsEnter = Math.min(1, Math.max(0, (progress - 0.68) / 0.22));
      cinema.style.setProperty("--hero-p", progress.toFixed(4));
      cinema.style.setProperty("--title-opacity", (1 - titleExit).toFixed(4));
      cinema.style.setProperty("--story-opacity", storyEnter.toFixed(4));
      cinema.style.setProperty("--cards-opacity", cardsEnter.toFixed(4));
      frame = 0;
    };

    const requestUpdate = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    const pointerMove = (event: PointerEvent) => {
      const x = event.clientX / window.innerWidth - 0.5;
      const y = event.clientY / window.innerHeight - 0.5;
      cinema.style.setProperty("--pointer-x", `${(x * 18).toFixed(2)}px`);
      cinema.style.setProperty("--pointer-y", `${(y * 10).toFixed(2)}px`);
    };

    update();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);
    window.addEventListener("pointermove", pointerMove, { passive: true });
    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
      window.removeEventListener("pointermove", pointerMove);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const joinCommunity = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);
  };

  return (
    <main>
      <section className="cinema-scroll" id="home" ref={cinemaRef}>
        <div className="hero-stage">
          <img
            className="hero-landscape"
            src="https://upload.wikimedia.org/wikipedia/commons/3/35/Civita_di_Bagnoregio_aerial_panorama._June_2024.jpg"
            alt="Civita di Bagnoregio e il paesaggio della valle"
          />
          <div className="hero-shade" aria-hidden="true" />

          <header className="site-header">
            <a className="wordmark" href="#home" aria-label="Val Teverina, home">
              <span className="wordmark__mark">VT</span>
              <span>Val Teverina</span>
            </a>
            <nav className="site-nav" aria-label="Navigazione principale">
              {menuItems.slice(0, 4).map(([label, href]) => (
                <a key={href} href={href}>{label}</a>
              ))}
            </nav>
            <button className="menu-button" type="button" onClick={() => setMenuOpen(true)}>
              Menu <span aria-hidden="true">↗</span>
            </button>
          </header>

          <div className="hero-eyebrow">
            <span>42° 34′ N · 12° 09′ E</span>
            <span className="hero-eyebrow__line" aria-hidden="true" />
            <span>Lazio · Umbria</span>
          </div>

          <div className="hero-title-wrap">
            <p className="hero-kicker">La valle del fiume sacro</p>
            <h1 className="hero-title-split"><span>VAL</span><span>TEVERINA</span></h1>
          </div>

          <div className="hero-intro">
            <div className="hero-value">
              <strong>Borghi, esperienze<br />e sentieri.</strong>
              <p>La guida per organizzare un viaggio in diciassette territori tra la Tuscia viterbese e l’Umbria meridionale.</p>
            </div>
            <div className="hero-actions">
              <a className="hero-action hero-action--primary" href="#project">Esplora la guida <span>↓</span></a>
            </div>
          </div>

          <div className="hero-story" aria-live="polite">
            <p className="section-kicker section-kicker--light">Borghi · persone · paesaggio</p>
            <h2>Qui non passi.<br /><em>Entri.</em></h2>
            <p className="hero-story__copy">
              Il Tevere tiene insieme luoghi diversi. Val Teverina li trasforma in un viaggio fatto di incontri, gesti e deviazioni.
            </p>
          </div>

          <div className="hero-sights hero-route" aria-label="Percorsi principali">
            <a href="/esperienze"><small>Esperienze</small> Vivi</a>
            <a href="/sentieri-guide"><small>Percorsi</small> Attraversa</a>
            <a href="/territori"><small>Borghi</small> Scopri</a>
          </div>

          <div className="scroll-progress" aria-hidden="true">
            <span>Scroll</span><i />
          </div>
        </div>
      </section>

      <section className="home-compass" id="project">
        <div className="home-compass__intro">
          <p className="home-label">La destinazione</p>
          <h2>Una valle.<br /><em>Tutto il viaggio.</em></h2>
          <div>
            <p>Val Teverina è la guida per esplorare diciassette comuni lungo il Tevere, tra Tuscia e Umbria. Riunisce luoghi da vedere, esperienze con chi vive qui e percorsi da seguire con tempi e indicazioni chiare.</p>
            <a href="/progetto">Scopri il progetto <span>↗</span></a>
          </div>
        </div>
        <nav className="home-compass__paths" aria-label="Organizza la visita">
          <a href="/territori"><small>Scegli una tappa</small><strong>Trova un luogo</strong><p>Diciassette schede con cosa vedere, tempo consigliato e collegamenti.</p><span>Apri l’atlante ↗</span></a>
          <a href="/esperienze"><small>Entra nelle storie</small><strong>Vivi un’esperienza</strong><p>Botteghe, cucine, vigneti e guide: attività condotte da persone della valle.</p><span>Vedi le esperienze ↗</span></a>
          <a href="/sentieri-guide"><small>Muoviti nel paesaggio</small><strong>Segui un percorso</strong><p>Itinerari tra più località con distanza, durata e livello di difficoltà.</p><span>Consulta i sentieri ↗</span></a>
        </nav>
      </section>

      <section className="home-journey" aria-labelledby="journey-title">
        <header className="home-journey__header">
          <div><p className="home-label">Itinerari pronti da adattare</p><h2 id="journey-title">Quanto tempo hai?</h2></div>
          <div className="home-journey__tabs" role="tablist" aria-label="Durata del viaggio">
            {journeys.map((journey) => <button key={journey.key} type="button" role="tab" aria-selected={activeJourney === journey.key} className={activeJourney === journey.key ? "is-active" : ""} onClick={() => setActiveJourney(journey.key)}>{journey.label}</button>)}
          </div>
        </header>
        <article className="home-journey__feature">
          <figure><img key={selectedJourney.image} src={selectedJourney.image} alt="" /></figure>
          <div className="home-journey__copy">
            <p className="home-label">{selectedJourney.eyebrow}</p>
            <h3>{selectedJourney.title}</h3>
            <p>{selectedJourney.description}</p>
            <dl><div><dt>Tappe</dt><dd>{selectedJourney.route}</dd></div><div><dt>Durata</dt><dd>{selectedJourney.timing}</dd></div><div><dt>Come</dt><dd>{selectedJourney.pace}</dd></div></dl>
            <a href={selectedJourney.href}>Apri la prima tappa <span>↗</span></a>
          </div>
        </article>
      </section>

      <section className="home-atlas" id="territori">
        <header className="home-section-head">
          <div><p className="home-label">Atlante della valle</p><h2>Dove vuoi<br /><em>cominciare?</em></h2></div>
          <div><p>Tre porte d’ingresso per orientarti subito. Oppure apri l’atlante completo e scegli tra tutti i comuni della Val Teverina.</p><a href="/territori">Vedi tutti i territori <span>↗</span></a></div>
        </header>
        <div className="home-atlas__stage">
          <figure><img key={selectedTerritory.image} src={selectedTerritory.image} alt={selectedTerritory.name} /><figcaption><span>{selectedTerritory.area}</span><strong>{selectedTerritory.name}</strong><p>{selectedTerritory.note}</p><a href={`/territori/${selectedTerritory.slug}`}>Apri la scheda ↗</a></figcaption></figure>
          <div className="home-atlas__selector" role="tablist" aria-label="Territori in evidenza">
            {territories.map((territory) => <button key={territory.slug} type="button" role="tab" aria-selected={activeTerritory === territory.slug} className={activeTerritory === territory.slug ? "is-active" : ""} onClick={() => setActiveTerritory(territory.slug)}><span>{territory.area}</span><strong>{territory.name}</strong><small>{territory.note}</small><i>↗</i></button>)}
          </div>
        </div>
        <div className="home-atlas__index">
          {(["Tuscia", "Umbria"] as const).map((area) => <div key={area}><p className="home-label">{area}</p><nav aria-label={`Comuni in ${area}`}>{territoryItems.filter(([, territoryArea]) => territoryArea === area).map(([name]) => <a key={name} href={`/territori/${toSlug(name)}`}>{name}</a>)}</nav></div>)}
        </div>
      </section>

      <section className="home-experiences" id="experiences">
        <header className="home-section-head home-section-head--dark">
          <div><p className="home-label">Esperienze locali</p><h2>Non guardare.<br /><em>Prendi parte.</em></h2></div>
          <div><p>Attività in piccoli gruppi condotte da artigiani, produttori e guide. Ogni scheda indica luogo, durata e persona che ti accoglie.</p><a href="/esperienze">Tutte le esperienze <span>↗</span></a></div>
        </header>
        <div className="home-experiences__grid">
          {experiences.map((item, index) => <article className={index === 0 ? "is-featured" : ""} key={item.slug}><a className="home-experiences__image" href={`/esperienze/${item.slug}`}><img src={item.image} alt="" /><span>Scopri ↗</span></a><div className="home-experiences__meta"><span>{item.category}</span><span>{item.location} · {item.duration}</span></div><h3><a href={`/esperienze/${item.slug}`}>{item.title}</a></h3><p>{item.host}</p></article>)}
        </div>
      </section>

      <section className="home-trails" id="sentieri">
        <header className="home-section-head home-section-head--dark">
          <div><p className="home-label">Sentieri &amp; Guide</p><h2>Tre modi di<br /><em>attraversarla.</em></h2></div>
          <div><p>Percorsi tra borghi, boschi e fiume. Distanza, durata e difficoltà sono visibili prima di aprire la guida completa.</p><a href="/sentieri-guide">Consulta tutte le guide <span>↗</span></a></div>
        </header>
        <div className="home-trails__list">
          {trailItems.map((trail) => <a href={`/sentieri-guide/${trail.slug}`} key={trail.slug}><img src={trail.image} alt="" /><div><small>{trail.route}</small><h3>{trail.name}</h3><p>{trail.note}</p></div><dl><div><dt>Distanza</dt><dd>{trail.length}</dd></div><div><dt>Tempo</dt><dd>{trail.time}</dd></div><div><dt>Livello</dt><dd>{trail.level}</dd></div></dl><span>↗</span></a>)}
        </div>
      </section>

      <section className="home-journal" id="blog">
        <header className="home-section-head">
          <div><p className="home-label">Storie dalla valle</p><h2>Prima delle mappe,<br /><em>vengono le persone.</em></h2></div>
          <div><p>Voci, gesti e luoghi per capire ciò che una scheda turistica non riesce a raccontare.</p><a href="/blog">Apri il journal <span>↗</span></a></div>
        </header>
        <div className="home-journal__grid">
          <a className="home-journal__feature" href="/blog/celleno-non-e-un-paese-fermo-nel-tempo"><img src="https://www.visitarelatuscia.it/wp-content/uploads/2022/02/IMG_20210515_140708-scaled.jpg" alt="Panorama di Celleno" /><div><span>Luoghi · 8 min</span><h3>Celleno non è un paese fermo nel tempo</h3><p>Le persone, le case e il paesaggio che continuano a trasformare il borgo.</p></div></a>
          <div className="home-journal__notes">
            <a href="/blog/il-tornio-gira-la-terra-ricorda"><span>Persone · 5 min</span><h3>Il tornio gira, la terra ricorda</h3><p>Una mattina nella bottega di una ceramista che lavora con argille locali.</p><i>↗</i></a>
            <a href="/blog/la-tavola-come-luogo-d-incontro"><span>Tradizioni · 6 min</span><h3>La tavola come luogo d’incontro</h3><p>Ricette familiari e nuove comunità intorno al cibo.</p><i>↗</i></a>
          </div>
        </div>
      </section>

      <section className="home-contact" id="community">
        <div><p className="home-label">Aiuto per il viaggio</p><h2>Non sai da dove<br /><em>cominciare?</em></h2></div>
        <div className="home-contact__action"><p>Indicaci quando vuoi partire, quanti giorni hai e cosa ti interessa. Ti aiutiamo a collegare territori, esperienze e percorsi in un primo itinerario.</p><a href="/community">Richiedi un orientamento <span>↗</span></a></div>
        <div className="home-contact__newsletter"><p>Oppure ricevi nuovi itinerari e aperture.</p>{submitted ? <div className="community-success" role="status">Iscrizione completata <span>✓</span></div> : <form onSubmit={joinCommunity}><label htmlFor="community-email">Email</label><input id="community-email" name="email" type="email" placeholder="nome@email.it" required /><button type="submit" aria-label="Iscriviti">↗</button></form>}</div>
      </section>

      <footer className="site-footer">
        <div className="footer-brand"><span className="wordmark__mark">VT</span><strong>Val Teverina</strong></div>
        <div className="footer-links">
          {menuItems.map(([label, href]) => <a key={href} href={href}>{label}</a>)}
        </div>
        <div className="footer-meta"><p>La valle del fiume sacro</p><p>© 2026 Val Teverina</p></div>
      </footer>

      <div className={`menu-overlay ${menuOpen ? "is-open" : ""}`} aria-hidden={!menuOpen}>
        <div className="menu-overlay__top">
          <span>Val Teverina</span>
          <button type="button" onClick={() => setMenuOpen(false)} aria-label="Chiudi il menu">Chiudi ×</button>
        </div>
        <nav aria-label="Menu completo">
          {menuItems.map(([label, href]) => (
            <a key={href} href={href} onClick={() => setMenuOpen(false)}>{label}<i>↗</i></a>
          ))}
        </nav>
          <a className="menu-overlay__community" href="/community" onClick={() => setMenuOpen(false)}>Entra nella community</a>
      </div>
    </main>
  );
}
