import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { pathToFileURL } from "node:url";
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import ts from "typescript";

const root = path.resolve(import.meta.dirname, "..");
const temporary = path.join(root, "tmp", "standalone-index");
const output = path.join(root, "outputs", "index.html");

await mkdir(temporary, { recursive: true });

const transpile = (source, fileName) => ts.transpileModule(source, {
  fileName,
  compilerOptions: {
    target: ts.ScriptTarget.ES2022,
    module: ts.ModuleKind.ESNext,
    moduleResolution: ts.ModuleResolutionKind.Bundler,
    jsx: ts.JsxEmit.ReactJSX,
    esModuleInterop: true,
  },
}).outputText;

const dataSource = await readFile(path.join(root, "app", "site-data.ts"), "utf8");
const componentSource = (await readFile(path.join(root, "app", "ValTeverinaSite.tsx"), "utf8"))
  .replace('from "./site-data"', 'from "./site-data.mjs"');

await writeFile(path.join(temporary, "site-data.mjs"), transpile(dataSource, "site-data.ts"), "utf8");
await writeFile(path.join(temporary, "ValTeverinaSite.mjs"), transpile(componentSource, "ValTeverinaSite.tsx"), "utf8");

const componentUrl = `${pathToFileURL(path.join(temporary, "ValTeverinaSite.mjs")).href}?v=${Date.now()}`;
const { default: ValTeverinaSite } = await import(componentUrl);
const markup = renderToStaticMarkup(React.createElement(ValTeverinaSite));
const css = (await readFile(path.join(root, "app", "globals.css"), "utf8"))
  .replace('@import "tailwindcss";', "")
  .replaceAll("</style", "<\\/style");

const journeys = [
  {
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
];

const territories = [
  {
    name: "Civita di Bagnoregio",
    area: "Tuscia",
    note: "Un crinale di tufo tra cielo e calanchi.",
    slug: "bagnoregio",
    image: "https://upload.wikimedia.org/wikipedia/commons/3/35/Civita_di_Bagnoregio_aerial_panorama._June_2024.jpg",
  },
  {
    name: "Vitorchiano",
    area: "Tuscia",
    note: "La pietra scura, i boschi e il lavoro delle mani.",
    slug: "vitorchiano",
    image: "https://www.photohound.co/images/41726l.jpg",
  },
  {
    name: "Celleno",
    area: "Tuscia",
    note: "Un paese che continua a vivere nelle sue storie.",
    slug: "celleno",
    image: "https://www.visitarelatuscia.it/wp-content/uploads/2022/02/IMG_20210515_140708-scaled.jpg",
  },
];

const browserScript = `
(() => {
  const cinema = document.querySelector('.cinema-scroll');
  if (cinema) {
    let frame = 0;
    const update = () => {
      const rect = cinema.getBoundingClientRect();
      const distance = Math.max(1, cinema.offsetHeight - innerHeight);
      const progress = Math.min(1, Math.max(0, -rect.top / distance));
      cinema.style.setProperty('--hero-p', progress.toFixed(4));
      cinema.style.setProperty('--title-opacity', (1 - Math.min(1, progress / .42)).toFixed(4));
      cinema.style.setProperty('--story-opacity', Math.min(1, Math.max(0, (progress - .28) / .28)).toFixed(4));
      cinema.style.setProperty('--cards-opacity', Math.min(1, Math.max(0, (progress - .68) / .22)).toFixed(4));
      frame = 0;
    };
    addEventListener('scroll', () => { if (!frame) frame = requestAnimationFrame(update); }, { passive: true });
    addEventListener('pointermove', (event) => {
      cinema.style.setProperty('--pointer-x', ((event.clientX / innerWidth - .5) * 18).toFixed(2) + 'px');
      cinema.style.setProperty('--pointer-y', ((event.clientY / innerHeight - .5) * 10).toFixed(2) + 'px');
    }, { passive: true });
    update();
  }

  const overlay = document.querySelector('.menu-overlay');
  document.querySelector('.menu-button')?.addEventListener('click', () => overlay?.classList.add('is-open'));
  document.querySelector('.menu-overlay__top button')?.addEventListener('click', () => overlay?.classList.remove('is-open'));

  const journeyData = ${JSON.stringify(journeys)};
  const journeyButtons = [...document.querySelectorAll('.home-journey__tabs button')];
  journeyButtons.forEach((button, index) => button.addEventListener('click', () => {
    const item = journeyData[index];
    journeyButtons.forEach((candidate) => { candidate.classList.remove('is-active'); candidate.setAttribute('aria-selected', 'false'); });
    button.classList.add('is-active'); button.setAttribute('aria-selected', 'true');
    const feature = document.querySelector('.home-journey__feature');
    feature.querySelector('img').src = item.image;
    feature.querySelector('.home-label').textContent = item.eyebrow;
    feature.querySelector('h3').textContent = item.title;
    feature.querySelector('.home-journey__copy > p:not(.home-label)').textContent = item.description;
    const values = feature.querySelectorAll('dd');
    [item.route, item.timing, item.pace].forEach((value, valueIndex) => values[valueIndex].textContent = value);
    feature.querySelector('.home-journey__copy > a').href = item.href;
  }));

  const territoryData = ${JSON.stringify(territories)};
  const territoryButtons = [...document.querySelectorAll('.home-atlas__selector button')];
  territoryButtons.forEach((button, index) => button.addEventListener('click', () => {
    const item = territoryData[index];
    territoryButtons.forEach((candidate) => { candidate.classList.remove('is-active'); candidate.setAttribute('aria-selected', 'false'); });
    button.classList.add('is-active'); button.setAttribute('aria-selected', 'true');
    const stage = document.querySelector('.home-atlas__stage figure');
    stage.querySelector('img').src = item.image;
    stage.querySelector('img').alt = item.name;
    stage.querySelector('figcaption > span').textContent = item.area;
    stage.querySelector('figcaption > strong').textContent = item.name;
    stage.querySelector('figcaption > p').textContent = item.note;
    stage.querySelector('figcaption > a').href = '/territori/' + item.slug;
  }));

  document.querySelector('.home-contact__newsletter form')?.addEventListener('submit', (event) => {
    event.preventDefault();
    event.currentTarget.outerHTML = '<div class="community-success" role="status">Iscrizione completata <span>✓</span></div>';
  });
})();`;

const html = `<!doctype html>
<html lang="it">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="description" content="Val Teverina — borghi, esperienze e sentieri tra Tuscia e Umbria.">
  <title>Val Teverina — La valle del fiume sacro</title>
  <style>${css}</style>
</head>
<body>
${markup}
<script>${browserScript.replaceAll("</script", "<\\/script")}</script>
</body>
</html>`;

await writeFile(output, html, "utf8");
console.log(output);
