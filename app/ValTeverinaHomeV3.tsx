"use client";

/* eslint-disable @next/next/no-html-link-for-pages, @next/next/no-img-element */

import { type CSSProperties, useEffect, useMemo, useRef, useState } from "react";
import { experienceItems, journalItems, trailItems } from "./site-data";
import { sitePath } from "./site-path";

const featuredTerritories = [
  {
    name: "Bagnoregio",
    slug: "bagnoregio",
    area: "Tuscia",
    note: "La materia fragile dei calanchi e Civita sospesa sul paesaggio.",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/8/8c/Panorama_di_Civita_di_Bagnoregio_%28VT%29_-_agosto_2019.jpg",
  },
  {
    name: "Vitorchiano",
    slug: "vitorchiano",
    area: "Tuscia",
    note: "Peperino, botteghe e boschi intorno a un borgo costruito sulla rupe.",
    image: "https://www.photohound.co/images/41726l.jpg",
  },
  {
    name: "Celleno",
    slug: "celleno",
    area: "Tuscia",
    note: "Un paese che trasforma la memoria in cultura e nuove possibilità.",
    image:
      "https://www.visitarelatuscia.it/wp-content/uploads/2022/02/IMG_20210515_140708-scaled.jpg",
  },
  {
    name: "Civitella d’Agliano",
    slug: "civitella-d-agliano",
    area: "Tuscia",
    note: "Vigneti, cantine e la trama agricola che disegna la valle.",
    image:
      "https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?auto=format&fit=crop&fm=jpg&q=88&w=2000",
  },
  {
    name: "Lugnano in Teverina",
    slug: "lugnano-in-teverina",
    area: "Umbria",
    note: "Architettura romanica, cammini e una relazione quotidiana con il fiume.",
    image:
      "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&fm=jpg&q=88&w=2000",
  },
  {
    name: "Orte",
    slug: "orte",
    area: "Tuscia",
    note: "Una città di passaggio, sopra e sotto la rupe di tufo.",
    image:
      "https://images.unsplash.com/photo-1529260830199-42c24126f198?auto=format&fit=crop&fm=jpg&q=88&w=2000",
  },
] as const;

function clamp(value: number, min = 0, max = 1) {
  return Math.min(max, Math.max(min, value));
}

function smoothstep(start: number, end: number, value: number) {
  const progress = clamp((value - start) / (end - start));
  return progress * progress * (3 - 2 * progress);
}

const heroEntries = [
  { kicker: "Esperienze", title: "Incontra chi fa la valle", note: "Botteghe, cucine, vigne e persone.", href: "/esperienze", image: experienceItems[0].image },
  { kicker: "Territori", title: "Diciassette paesi, una geografia", note: "Tuscia viterbese e Umbria meridionale.", href: "/territori", image: featuredTerritories[0].image },
  { kicker: "Sentieri", title: "Attraversala con il passo giusto", note: "Percorsi, tempi e deviazioni.", href: "/sentieri-guide", image: trailItems[2].image },
  { kicker: "Journal", title: "Ascolta le storie che restano", note: "Persone, gesti e trasformazioni.", href: "/blog", image: journalItems[0].image },
  { kicker: "Il progetto", title: "Capisci ciò che il fiume unisce", note: "La visione e la rete territoriale.", href: "/progetto", image: featuredTerritories[2].image },
] as const;

export default function ValTeverinaHomeV3() {
  const [heroProgress, setHeroProgress] = useState(0);
  const [heroCard, setHeroCard] = useState(0);
  const [experience, setExperience] = useState(0);
  const [territory, setTerritory] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const heroStageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let frame = 0;
    let target = 0;
    let smooth = 0;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    const readTarget = () => {
      const hero = document.querySelector<HTMLElement>("[data-vt3-hero]");
      if (!hero) return;
      const travel = Math.max(1, hero.offsetHeight - window.innerHeight);
      target = clamp(-hero.getBoundingClientRect().top / travel);
    };

    const tick = () => {
      smooth = reducedMotion.matches ? target : smooth + (target - smooth) * 0.14;
      if (Math.abs(target - smooth) < 0.0002) smooth = target;
      setHeroProgress(smooth);
      frame = Math.abs(target - smooth) > 0.0002 ? requestAnimationFrame(tick) : 0;
    };

    const requestTick = () => {
      readTarget();
      if (!frame) frame = requestAnimationFrame(tick);
    };

    const onPointerMove = (event: PointerEvent) => {
      if (reducedMotion.matches || !heroStageRef.current) return;
      const x = event.clientX / window.innerWidth - 0.5;
      const y = event.clientY / window.innerHeight - 0.5;
      heroStageRef.current.style.setProperty("--vt5-mx", x.toFixed(4));
      heroStageRef.current.style.setProperty("--vt5-my", y.toFixed(4));
    };

    readTarget();
    smooth = target;
    frame = requestAnimationFrame(tick);
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    const onScroll = requestTick;
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", requestTick);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", requestTick);
    };
  }, []);

  useEffect(() => {
    const sections = Array.from(document.querySelectorAll<HTMLElement>("[data-vt5-reveal]"));
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.12 });
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  const introExit = smoothstep(0.04, 0.19, heroProgress);
  const riverReveal = smoothstep(0.12, 0.34, heroProgress);
  const riverStory = smoothstep(0.18, 0.29, heroProgress) * (1 - smoothstep(0.42, 0.52, heroProgress));
  const peopleStory = smoothstep(0.46, 0.57, heroProgress) * (1 - smoothstep(0.68, 0.76, heroProgress));
  const cardsEnter = smoothstep(0.73, 0.91, heroProgress);
  const activeTerritory = featuredTerritories[territory];

  const experienceDeck = useMemo(() => experienceItems.slice(0, 5), []);
  const legacyVisible = heroProgress < 0;

  return (
    <main className="vt3">
      <section className="vt5-cinema" data-vt3-hero aria-label="Val Teverina, racconto cinematografico">
        <div className="vt5-stage" ref={heroStageRef}>
          <div className="vt5-world">
            <img
              className="vt5-scene vt5-scene--river"
              src="https://www.agriturismosomaia.it/wp-content/uploads/2019/12/nazzano-1.jpg"
              alt="Il Tevere attraversa la valle"
              style={{ transform: `scale(${1.08 + heroProgress * 0.16}) translate3d(calc(var(--vt5-mx) * -10px), calc(var(--vt5-my) * -5px), 0)` }}
            />
            <div className="vt5-split vt5-split--left" style={{ transform: `translate3d(${-riverReveal * 54}vw, ${-riverReveal * 8}vh, 0) scale(${1 + riverReveal * 0.2})` }}>
              <img src="https://upload.wikimedia.org/wikipedia/commons/8/8c/Panorama_di_Civita_di_Bagnoregio_%28VT%29_-_agosto_2019.jpg" alt="" />
            </div>
            <div className="vt5-split vt5-split--right" style={{ transform: `translate3d(${riverReveal * 54}vw, ${-riverReveal * 8}vh, 0) scale(${1 + riverReveal * 0.2})` }}>
              <img src="https://upload.wikimedia.org/wikipedia/commons/8/8c/Panorama_di_Civita_di_Bagnoregio_%28VT%29_-_agosto_2019.jpg" alt="" />
            </div>
            <div className="vt5-shade" style={{ opacity: 0.48 + riverReveal * 0.22 + cardsEnter * 0.18 }} />

            <header className="vt3-header">
              <a className="vt3-brand" href="#inizio" aria-label="Val Teverina, home">
                <span className="vt3-brand__seal">VT</span>
                <span>Val Teverina</span>
              </a>
              <nav className="vt3-header__nav" aria-label="Navigazione principale">
                <a href={sitePath("/progetto")}>Il progetto</a>
                <a href="#esperienze">Esperienze</a>
                <a href="#territori">Territori</a>
                <a href="#sentieri">Sentieri</a>
              </nav>
              <button
                className="vt3-menu-button"
                type="button"
                aria-expanded={menuOpen}
                aria-controls="vt3-mobile-menu"
                onClick={() => setMenuOpen((value) => !value)}
              >
                <span>{menuOpen ? "Chiudi" : "Menu"}</span>
                <i aria-hidden="true" />
              </button>
            </header>

            <div className={`vt3-mobile-menu ${menuOpen ? "is-open" : ""}`} id="vt3-mobile-menu" aria-hidden={!menuOpen}>
              <a href={sitePath("/progetto")} onClick={() => setMenuOpen(false)}>Il progetto</a>
              <a href="#esperienze" onClick={() => setMenuOpen(false)}>Esperienze</a>
              <a href="#territori" onClick={() => setMenuOpen(false)}>Territori</a>
              <a href="#sentieri" onClick={() => setMenuOpen(false)}>Sentieri &amp; guide</a>
              <a href={sitePath("/community")} onClick={() => setMenuOpen(false)}>Community</a>
            </div>

            <div className="vt5-opening" id="inizio" style={{ opacity: 1 - introExit, transform: `translate3d(-50%, ${introExit * -170}px, 0) scale(${1 - introExit * 0.07})` }}>
              <p>Tra Tuscia e Umbria</p>
              <h1>Val Teverina</h1>
              <div className="vt5-opening__copy">
                <span>Una valle da attraversare lentamente, seguendo il fiume.</span>
                <div><i>17 paesi</i><i>2 regioni</i><i>1 geografia comune</i></div>
              </div>
            </div>

            <section className="vt5-story vt5-story--river" style={{ opacity: riverStory, transform: `translate3d(-50%, calc(-50% + ${(1 - riverStory) * 62 - smoothstep(0.42, 0.52, heroProgress) * 90}px), 0)` }}>
              <span>Il fiume sacro</span>
              <h2>Il Tevere è la bussola della valle.</h2>
              <p>Non è il margine tra due regioni: è la linea che collega borghi, paesaggi e modi di vivere.</p>
              <dl><div><dt>17</dt><dd>paesi da leggere insieme</dd></div><div><dt>2</dt><dd>regioni, senza confini nel racconto</dd></div></dl>
            </section>

            <section className="vt5-story vt5-story--people" style={{ opacity: peopleStory, transform: `translate3d(-50%, calc(-50% + ${(1 - peopleStory) * 62 - smoothstep(0.68, 0.76, heroProgress) * 90}px), 0)` }}>
              <span>Dentro il territorio</span>
              <h2>La valle vive negli incontri.</h2>
              <p>Botteghe, cucine, vigne e sentieri diventano porte d’ingresso quando ad accoglierti è chi li vive ogni giorno.</p>
              <a href={sitePath("/esperienze")}>Scopri le esperienze <i>↗</i></a>
            </section>

            <section className="vt5-entry" aria-hidden={cardsEnter < 0.02}>
              <div className="vt5-entry__head" style={{ opacity: cardsEnter }}>
                <span>Da dove vuoi entrare?</span>
                <strong>Scegli una direzione. Il fiume farà il resto.</strong>
              </div>
              <div
                className="vt5-entry__track"
                style={{ "--vt5-enter-x": `${(1 - cardsEnter) * 125}vw`, "--vt5-card": heroCard } as CSSProperties}
              >
                {heroEntries.map((entry, index) => (
                  <a className={index === heroCard ? "is-active" : ""} href={sitePath(entry.href)} key={entry.title} onFocus={() => setHeroCard(index)} onMouseEnter={() => setHeroCard(index)}>
                    <span>{entry.kicker}</span>
                    <img src={entry.image} alt="" />
                    <h3>{entry.title}</h3>
                    <p>{entry.note}</p>
                    <i>↗</i>
                  </a>
                ))}
              </div>
              <div className="vt5-entry__controls" style={{ opacity: smoothstep(0.88, 0.97, heroProgress) }}>
                <button type="button" aria-label="Voce precedente" onClick={() => setHeroCard((value) => (value - 1 + heroEntries.length) % heroEntries.length)}>←</button>
                <button type="button" aria-label="Voce successiva" onClick={() => setHeroCard((value) => (value + 1) % heroEntries.length)}>→</button>
              </div>
            </section>

            <div className="vt5-progress" aria-hidden="true"><i style={{ transform: `scaleY(${Math.max(0.025, heroProgress)})` }} /></div>
            <span className="vt5-scroll-note" style={{ opacity: 1 - smoothstep(0.02, 0.12, heroProgress) }}>Scorri per attraversarla</span>
          </div>
        </div>
      </section>

      {legacyVisible && <>
      <section className="vt4-identity" aria-labelledby="vt4-identity-title" data-vt5-reveal>
        <div className="vt4-identity__topline">
          <span className="vt3-kicker">Cos’è Val Teverina</span>
          <span>Un progetto tra Tuscia viterbese e Umbria meridionale</span>
        </div>

        <div className="vt4-identity__statement">
          <h2 id="vt4-identity-title">
            Il fiume attraversa.
            <em>La valle mette in relazione.</em>
          </h2>
          <div>
            <p>
              Val Teverina collega paesi, persone ed esperienze lungo il Tevere. È una porta d’ingresso
              comune per capire dove andare, chi incontrare e come vivere il territorio.
            </p>
            <a href={sitePath("/progetto")}>Conosci il progetto <span>↗</span></a>
          </div>
        </div>

        <div className="vt4-identity__atlas" aria-label="Le connessioni della Val Teverina">
          <div className="vt4-river" aria-hidden="true"><i /><i /><i /><i /></div>
          <figure className="vt4-identity__image vt4-identity__image--landscape">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/8/8c/Panorama_di_Civita_di_Bagnoregio_%28VT%29_-_agosto_2019.jpg"
              alt="Civita di Bagnoregio e la Valle dei Calanchi"
            />
            <figcaption>Paesaggio · Bagnoregio</figcaption>
          </figure>
          <figure className="vt4-identity__image vt4-identity__image--hands">
            <img src={experienceItems[0].image} alt="Lavorazione artigianale della ceramica" />
            <figcaption>Materia · Vitorchiano</figcaption>
          </figure>
          <figure className="vt4-identity__image vt4-identity__image--table">
            <img src={experienceItems[1].image} alt="Preparazione della sfoglia in una cucina della valle" />
            <figcaption>Tradizioni · Castiglione</figcaption>
          </figure>
          <p className="vt4-identity__word vt4-identity__word--one">Luoghi</p>
          <p className="vt4-identity__word vt4-identity__word--two">Persone</p>
          <p className="vt4-identity__word vt4-identity__word--three">Esperienze</p>
        </div>

        <nav className="vt4-identity__paths" aria-label="Esplora Val Teverina">
          <a href="#territori"><span>Conosci</span><strong>I territori</strong><i>↗</i></a>
          <a href="#esperienze"><span>Partecipa</span><strong>Le esperienze</strong><i>↗</i></a>
          <a href="#sentieri"><span>Attraversa</span><strong>I sentieri</strong><i>↗</i></a>
        </nav>
      </section>

      <section className="vt5-current" aria-label="La corrente dei territori" data-vt5-reveal>
        <div className="vt5-current__label"><span>La corrente della valle</span><i>Scorri i luoghi</i></div>
        <div className="vt5-current__track">
          {[0, 1].map((set) => (
            <div className="vt5-current__group" aria-hidden={set === 1} key={set}>
              {featuredTerritories.map((item, index) => (
                <a href={sitePath(`/territori/${item.slug}`)} key={`${set}-${item.slug}`}>
                  <img src={item.image} alt="" />
                  <div><span>{String(index + 1).padStart(2, "0")} · {item.area}</span><strong>{item.name}</strong></div>
                  <i>↗</i>
                </a>
              ))}
            </div>
          ))}
        </div>
      </section>

      <section className="vt4-experiences" id="esperienze" aria-labelledby="vt4-experiences-title" data-vt5-reveal>
        <div className="vt4-section-line">
          <span className="vt3-kicker">Esperienze</span>
          <a href={sitePath("/esperienze")}>Apri il catalogo <span>↗</span></a>
        </div>
        <div className="vt4-experiences__intro">
          <h2 id="vt4-experiences-title">Qui non sei pubblico.<br /><em>Sei parte della storia.</em></h2>
          <p>Persone vere, luoghi precisi, tempo condiviso. Scegli un’esperienza e incontra chi rende viva la valle.</p>
        </div>
        <div className="vt4-experiences__explorer">
          <a className="vt4-experience-stage" href={sitePath(`/esperienze/${experienceDeck[experience].slug}`)}>
            {experienceDeck.map((item, index) => (
              <img className={experience === index ? "is-active" : ""} src={item.image} alt={experience === index ? item.title : ""} key={item.slug} />
            ))}
            <div className="vt4-experience-stage__meta">
              <span>{experienceDeck[experience].category} · {experienceDeck[experience].location}</span>
              <p>{experienceDeck[experience].host} · {experienceDeck[experience].duration}</p>
              <i>Vivi l’esperienza ↗</i>
            </div>
          </a>
          <div className="vt4-experience-index" aria-label="Esperienze in evidenza">
            {experienceDeck.map((item, index) => (
              <a
                className={experience === index ? "is-active" : ""}
                href={sitePath(`/esperienze/${item.slug}`)}
                onMouseEnter={() => setExperience(index)}
                onFocus={() => setExperience(index)}
                key={item.slug}
              >
                <span>{String(index + 1).padStart(2, "0")}</span>
                <strong>{item.title}</strong>
                <small>{item.location}</small>
                <i>↗</i>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="vt4-territories" id="territori" aria-labelledby="vt4-territories-title" data-vt5-reveal>
        <div className="vt4-section-line">
          <span className="vt3-kicker">Territori</span>
          <a href={sitePath("/territori")}>Tutto l’atlante <span>↗</span></a>
        </div>
        <div className="vt4-territories__intro">
          <h2 id="vt4-territories-title">Scegli un paese.<br /><em>La valle ti mostra come continuare.</em></h2>
          <p>Ogni luogo conserva un’identità precisa. Val Teverina rende visibili le relazioni con ciò che gli sta intorno.</p>
        </div>
        <div className="vt4-territories__explorer">
          <div className="vt4-territory-index" aria-label="Territori in evidenza">
            {featuredTerritories.map((item, index) => (
              <button
                className={territory === index ? "is-active" : ""}
                type="button"
                key={item.name}
                onMouseEnter={() => setTerritory(index)}
                onFocus={() => setTerritory(index)}
                onClick={() => setTerritory(index)}
                aria-pressed={territory === index}
              >
                <span>{String(index + 1).padStart(2, "0")}</span>
                <strong>{item.name}</strong>
                <i>{item.area}</i>
              </button>
            ))}
            <a className="vt4-territory-index__all" href={sitePath("/territori")}>Esplora tutti i territori <span>↗</span></a>
          </div>
          <a className="vt4-territory-stage" href={sitePath(`/territori/${activeTerritory.slug}`)}>
            {featuredTerritories.map((item, index) => (
              <img
                className={territory === index ? "is-active" : ""}
                src={item.image}
                alt={territory === index ? `Paesaggio di ${item.name}` : ""}
                key={item.name}
              />
            ))}
            <strong className="vt4-territory-stage__name">{activeTerritory.name}</strong>
            <div className="vt4-territory-stage__caption">
              <span>{activeTerritory.area}</span>
              <p>{activeTerritory.note}</p>
              <i>Apri il territorio ↗</i>
            </div>
          </a>
        </div>
      </section>

      <section className="vt4-trails" id="sentieri" aria-labelledby="vt4-trails-title" data-vt5-reveal>
        <div className="vt4-trails__head">
          <span className="vt3-kicker vt3-kicker--light">Sentieri &amp; guide</span>
          <h2 id="vt4-trails-title">Il territorio cambia<br />quando lo attraversi <em>a piedi.</em></h2>
          <a href={sitePath("/sentieri-guide")}>Tutte le guide <span>↗</span></a>
        </div>
        <a className="vt4-trail-feature" href={sitePath(`/sentieri-guide/${trailItems[2].slug}`)}>
          <img src={trailItems[2].image} alt="La Valle dei Calanchi lungo il percorso tra Lubriano e Bagnoregio" />
          <div className="vt4-trail-feature__shade" />
          <span>Lubriano · Bagnoregio</span>
          <h3>{trailItems[2].name}</h3>
          <div className="vt4-trail-feature__facts">
            <p><small>Distanza</small>{trailItems[2].length}</p>
            <p><small>Tempo</small>{trailItems[2].time}</p>
            <p><small>Livello</small>{trailItems[2].level}</p>
            <i>Apri la guida ↗</i>
          </div>
        </a>
        <div className="vt4-trail-runners">
          {trailItems.slice(0, 2).map((trail, index) => (
            <a href={sitePath(`/sentieri-guide/${trail.slug}`)} key={trail.slug}>
              <span>0{index + 2}</span>
              <div><small>{trail.route}</small><strong>{trail.name}</strong></div>
              <p>{trail.length} · {trail.time} · {trail.level}</p>
              <i>↗</i>
            </a>
          ))}
        </div>
      </section>

      <section className="vt4-journal" aria-labelledby="vt4-journal-title" data-vt5-reveal>
        <div className="vt4-section-line">
          <span className="vt3-kicker">Journal</span>
          <a href={sitePath("/blog")}>Tutte le storie <span>↗</span></a>
        </div>
        <div className="vt4-journal__mosaic">
          <h2 id="vt4-journal-title">Le storie<br />tengono insieme<br /><em>la valle.</em></h2>
          {journalItems.map((story, index) => (
            <a className={`vt4-story vt4-story--${index + 1}`} href={sitePath(`/blog/${story.slug}`)} key={story.slug}>
              <img src={story.image} alt="" />
              <div><span>{story.category} · {story.read}</span><strong>{story.title}</strong></div>
            </a>
          ))}
        </div>
      </section>

      <section className="vt4-community" aria-labelledby="vt4-community-title" data-vt5-reveal>
        <div className="vt4-community__image">
          <img src="https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&fm=jpg&q=86&w=2200" alt="Persone riunite nella comunità" />
        </div>
        <div className="vt4-community__copy">
          <span className="vt3-kicker">La comunità Val Teverina</span>
          <h2 id="vt4-community-title">Il territorio non è lo sfondo.<br /><em>È chi lo vive.</em></h2>
          <p>Abitanti, botteghe, associazioni e viaggiatori: entra nella rete, proponi un’esperienza o segui ciò che accade nella valle.</p>
          <a href={sitePath("/community")}>Entra nella comunità <span>↗</span></a>
        </div>
      </section>
      </>}

      <section className="vt6-scene vt6-overview" aria-labelledby="vt6-overview-title" data-vt5-reveal>
        <div className="vt6-overview__bar vt6-overview__bar--one" style={{ backgroundImage: `url(${featuredTerritories[0].image})` }}><span>17 paesi, una valle</span><i>01</i></div>
        <div className="vt6-overview__bar vt6-overview__bar--two" style={{ backgroundImage: `url(${featuredTerritories[0].image})` }}><span>Tuscia e Umbria</span><i>02</i></div>
        <div className="vt6-overview__bar vt6-overview__bar--three" style={{ backgroundImage: `url(${featuredTerritories[0].image})` }}><span>Il Tevere come connessione</span><i>03</i></div>
        <article className="vt6-overview__main" style={{ backgroundImage: `url(${featuredTerritories[0].image})` }}>
          <div className="vt6-overview__meta"><span>Cos’è Val Teverina</span><a href={sitePath("/progetto")}>Il progetto ↗</a></div>
          <div className="vt6-overview__copy">
            <h2 id="vt6-overview-title">Non una destinazione.<br /><em>Una rete viva.</em></h2>
            <p>Val Teverina è il progetto che collega 17 paesi tra Tuscia viterbese e Umbria meridionale. Un solo punto d’ingresso per scegliere dove andare, chi incontrare e come attraversare la valle.</p>
          </div>
        </article>
      </section>

      <section className="vt6-scene vt6-experiences" id="esperienze" aria-labelledby="vt6-experiences-title" data-vt5-reveal>
        <article className="vt6-experiences__intro">
          <span>Esperienze</span>
          <h2 id="vt6-experiences-title">Entra nella valle.<br /><em>Con chi ci vive.</em></h2>
          <p>Incontri reali con artigiani, produttori, guide e abitanti. Luogo, durata e persona che ti accoglie sono sempre chiari.</p>
          <a href={sitePath("/esperienze")}>Tutte le esperienze ↗</a>
        </article>
        <a className="vt6-experiences__visual" href={sitePath(`/esperienze/${experienceDeck[experience].slug}`)}>
          {experienceDeck.map((item, index) => <img className={experience === index ? "is-active" : ""} src={item.image} alt={experience === index ? item.title : ""} key={item.slug} />)}
          <div><span>{experienceDeck[experience].category} · {experienceDeck[experience].location}</span><strong>{experienceDeck[experience].title}</strong><i>Apri ↗</i></div>
        </a>
        <div className="vt6-experiences__choices">
          {experienceDeck.slice(0, 4).map((item, index) => (
            <button className={experience === index ? "is-active" : ""} type="button" key={item.slug} onMouseEnter={() => setExperience(index)} onFocus={() => setExperience(index)} onClick={() => setExperience(index)}>
              <span>0{index + 1}</span><strong>{item.category}</strong><small>{item.location}</small>
            </button>
          ))}
        </div>
      </section>

      <section className="vt6-scene vt6-territories" style={{ backgroundImage: `url(${activeTerritory.image})` }} id="territori" aria-labelledby="vt6-territories-title" data-vt5-reveal>
        <a className="vt6-territories__visual" href={sitePath(`/territori/${activeTerritory.slug}`)}>
          {featuredTerritories.map((item, index) => <img className={territory === index ? "is-active" : ""} src={item.image} alt={territory === index ? `Paesaggio di ${item.name}` : ""} key={item.slug} />)}
          <div><span>{activeTerritory.area}</span><strong>{activeTerritory.name}</strong><p>{activeTerritory.note}</p><i>Apri il territorio ↗</i></div>
        </a>
        <article className="vt6-territories__index">
          <div><span>Territori</span><h2 id="vt6-territories-title">Un luogo porta sempre <em>al successivo.</em></h2><a href={sitePath("/territori")}>Tutti i 17 paesi ↗</a></div>
          <nav aria-label="Territori in evidenza">
            {featuredTerritories.map((item, index) => (
              <button className={territory === index ? "is-active" : ""} type="button" key={item.slug} onMouseEnter={() => setTerritory(index)} onFocus={() => setTerritory(index)} onClick={() => setTerritory(index)}><span>0{index + 1}</span><strong>{item.name}</strong><small>{item.area}</small></button>
            ))}
          </nav>
        </article>
      </section>

      <section className="vt6-scene vt6-trails" style={{ backgroundImage: `url(${trailItems[2].image})` }} id="sentieri" aria-labelledby="vt6-trails-title" data-vt5-reveal>
        <a className="vt6-trails__main" href={sitePath(`/sentieri-guide/${trailItems[2].slug}`)}>
          <img src={trailItems[2].image} alt="La via dei calanchi" />
          <div className="vt6-trails__main-copy"><span>Sentiero in evidenza · {trailItems[2].route}</span><h2 id="vt6-trails-title">{trailItems[2].name}</h2><p>{trailItems[2].note}</p></div>
          <dl><div><dt>Distanza</dt><dd>{trailItems[2].length}</dd></div><div><dt>Tempo</dt><dd>{trailItems[2].time}</dd></div><div><dt>Livello</dt><dd>{trailItems[2].level}</dd></div></dl>
        </a>
        <article className="vt6-trails__guide"><span>Sentieri &amp; guide</span><strong>Dati chiari.<br />Paesaggio vivo.</strong><p>Tracce, tempi, difficoltà e punti di relazione per scegliere prima di partire.</p><a href={sitePath("/sentieri-guide")}>Tutte le guide ↗</a></article>
        {trailItems.slice(0, 2).map((trail, index) => <a className="vt6-trails__route" href={sitePath(`/sentieri-guide/${trail.slug}`)} key={trail.slug}><span>0{index + 2} · {trail.route}</span><strong>{trail.name}</strong><p>{trail.length} · {trail.time}</p><i>↗</i></a>)}
      </section>

      <section className="vt6-scene vt6-stories" aria-labelledby="vt6-stories-title" data-vt5-reveal>
        <article className="vt6-stories__title" style={{ backgroundImage: `url(${journalItems[0].image})` }}><span>Journal</span><h2 id="vt6-stories-title">La valle raccontata<br /><em>da chi la vive.</em></h2><a href={sitePath("/blog")}>Tutte le storie ↗</a></article>
        {journalItems.slice(0, 3).map((story, index) => <a className={`vt6-story-card vt6-story-card--${index + 1}`} href={sitePath(`/blog/${story.slug}`)} key={story.slug}><img src={story.image} alt="" /><div><span>{story.category} · {story.read}</span><strong>{story.title}</strong><i>↗</i></div></a>)}
      </section>

      <section className="vt6-community" style={{ backgroundImage: `url(${featuredTerritories[1].image})` }} aria-labelledby="vt6-community-title" data-vt5-reveal>
        <div><span>La comunità</span><h2 id="vt6-community-title">Il territorio non è lo sfondo.<br /><em>È chi lo rende vivo.</em></h2></div>
        <div><p>Abitanti, botteghe, associazioni e viaggiatori: entra nella rete, proponi un’esperienza o segui ciò che accade nella valle.</p><a href={sitePath("/community")}>Entra nella comunità <span>↗</span></a></div>
      </section>

      <footer className="vt3-footer">
        <div className="vt3-footer__brand">
          <span className="vt3-brand__seal">VT</span>
          <strong>Val Teverina</strong>
          <p>La valle del fiume sacro</p>
        </div>
        <div className="vt3-footer__links">
          <div><span>Esplora</span><a href={sitePath("/esperienze")}>Esperienze</a><a href={sitePath("/territori")}>Territori</a><a href={sitePath("/sentieri-guide")}>Sentieri &amp; guide</a></div>
          <div><span>Il progetto</span><a href={sitePath("/progetto")}>Chi siamo</a><a href={sitePath("/community")}>Community</a><a href={sitePath("/blog")}>Journal</a></div>
          <div><span>Seguici</span><a href="#instagram">Instagram</a><a href="#facebook">Facebook</a><a href="mailto:info@valteverina.it">Contatti</a></div>
        </div>
        <div className="vt3-footer__legal">
          <span>© {new Date().getFullYear()} Val Teverina</span>
          <span>Tuscia · Umbria · Italia</span>
          <span>Privacy · Cookie</span>
        </div>
      </footer>
    </main>
  );
}
