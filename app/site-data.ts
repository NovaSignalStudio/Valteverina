import { sitePath } from "./site-path";

export const primaryNavigation = [
  { label: "Il progetto", href: "/progetto" },
  { label: "Esperienze", href: "/esperienze" },
  { label: "Sentieri & Guide", href: "/sentieri-guide" },
  { label: "Territori", href: "/territori" },
  { label: "Merch", href: "/merch" },
  { label: "Blog", href: "/blog" },
  { label: "Community", href: "/community" },
].map((item) => ({ ...item, href: sitePath(item.href) }));

export const toSlug = (value: string) => value
  .normalize("NFD")
  .replace(/[\u0300-\u036f]/g, "")
  .toLowerCase()
  .replace(/[’']/g, "-")
  .replace(/[^a-z0-9]+/g, "-")
  .replace(/^-|-$/g, "");

export const experienceItems = [
  {
    slug: "dare-forma-alla-terra",
    category: "Artigianato",
    title: "Dare forma alla terra",
    location: "Vitorchiano",
    duration: "2 ore",
    host: "Con Marta, ceramista",
    description: "Un incontro in bottega per conoscere le argille locali e modellare un oggetto con le proprie mani.",
    image: "https://images.unsplash.com/photo-1781389005078-d9e413d89c94?auto=format&fit=crop&fm=jpg&q=84&w=1800",
  },
  {
    slug: "la-sfoglia-della-domenica",
    category: "Tradizioni",
    title: "La sfoglia della domenica",
    location: "Castiglione in Teverina",
    duration: "3 ore",
    host: "Nella cucina di Luciana",
    description: "Farina, uova e racconti di famiglia: una mattina intorno al tavolo, dal primo impasto al pranzo.",
    image: "https://images.unsplash.com/photo-1642354581513-9b6c05f1dd6d?auto=format&fit=crop&fm=jpg&q=84&w=1800",
  },
  {
    slug: "dentro-una-vendemmia",
    category: "Gusto",
    title: "Dentro una vendemmia",
    location: "Civitella d’Agliano",
    duration: "Mezza giornata",
    host: "Con una famiglia di vignaioli",
    description: "Tra filari, cantina e assaggi, per leggere il paesaggio attraverso il vino che produce.",
    image: "https://images.unsplash.com/photo-1636362693426-04a3ff8228c9?auto=format&fit=crop&fm=jpg&q=84&w=1800",
  },
  {
    slug: "il-sentiero-dell-acqua",
    category: "Natura",
    title: "Il sentiero dell’acqua",
    location: "Lugnano in Teverina",
    duration: "4 ore",
    host: "Con una guida della valle",
    description: "Un cammino lento tra boschi, affacci sul Tevere e piccole storie custodite lungo il percorso.",
    image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&fm=jpg&q=86&w=1800",
  },
  {
    slug: "alba-sui-calanchi",
    category: "Paesaggio",
    title: "Alba sui calanchi",
    location: "Bagnoregio",
    duration: "2 ore e 30",
    host: "Con una fotografa del territorio",
    description: "Luce, silenzio e geologia per osservare la valle prima che la giornata cominci davvero.",
    image: "https://upload.wikimedia.org/wikipedia/commons/3/35/Civita_di_Bagnoregio_aerial_panorama._June_2024.jpg",
  },
  {
    slug: "il-paese-racconta",
    category: "Comunità",
    title: "Il paese racconta",
    location: "Celleno",
    duration: "3 ore",
    host: "Con chi abita il borgo",
    description: "Una passeggiata fatta di porte aperte, memorie e nuove idee per continuare a vivere i luoghi.",
    image: "https://www.visitarelatuscia.it/wp-content/uploads/2022/02/IMG_20210515_140708-scaled.jpg",
  },
] as const;

export const territoryItems = [
  ["Bagnoregio", "Tuscia", "Calanchi e tufo"],
  ["Vitorchiano", "Tuscia", "Pietra, boschi e botteghe"],
  ["Celleno", "Tuscia", "Il borgo e le sue nuove vite"],
  ["Lubriano", "Tuscia", "La porta sulla valle"],
  ["Civitella d’Agliano", "Tuscia", "Vigneti e paesaggio"],
  ["Graffignano", "Tuscia", "Castelli e piccoli centri"],
  ["Castiglione in Teverina", "Tuscia", "Vino, tavole e comunità"],
  ["Bomarzo", "Tuscia", "Boschi, pietra e immaginazione"],
  ["Orte", "Tuscia", "La rupe e il fiume"],
  ["Bassano in Teverina", "Tuscia", "Torri e orizzonti"],
  ["Lugnano in Teverina", "Umbria", "Cammini e memoria"],
  ["Alviano", "Umbria", "Castello e oasi del Tevere"],
  ["Attigliano", "Umbria", "Passaggi e connessioni"],
  ["Giove", "Umbria", "Palazzi e colline"],
  ["Penna in Teverina", "Umbria", "Giardini e pietra"],
  ["Guardea", "Umbria", "Rocche e paesaggi aperti"],
  ["Amelia", "Umbria", "Storia e vita contemporanea"],
] as const;

const territoryImages = [
  "https://upload.wikimedia.org/wikipedia/commons/3/35/Civita_di_Bagnoregio_aerial_panorama._June_2024.jpg",
  "https://www.photohound.co/images/41726l.jpg",
  "https://www.visitarelatuscia.it/wp-content/uploads/2022/02/IMG_20210515_140708-scaled.jpg",
  "https://www.agriturismosomaia.it/wp-content/uploads/2019/12/nazzano-1.jpg",
] as const;

type TerritoryProfile = {
  focus: string;
  visitTime: string;
  intro: string;
  highlights: readonly { title: string; text: string }[];
};

const territoryProfiles: Record<string, TerritoryProfile> = {
  Bagnoregio: {
    focus: "Civita, calanchi e geologia",
    visitTime: "Mezza giornata",
    intro: "Attraversa a piedi il ponte verso Civita, leggi la Valle dei Calanchi dai belvedere e scopri nel museo perché questo paesaggio continua a cambiare.",
    highlights: [
      { title: "Civita e il ponte", text: "L’accesso pedonale sospeso introduce al borgo di tufo e apre subito la vista sulla valle." },
      { title: "Valle dei Calanchi", text: "Creste d’argilla, pareti chiare e forme scolpite dall’erosione: il paesaggio che rende il luogo irripetibile." },
      { title: "Museo Geologico", text: "A Palazzo Alemanni, la storia delle frane e del rapporto fragile tra l’abitato e la rupe." },
    ],
  },
  Vitorchiano: {
    focus: "Peperino, rupe e memoria civica",
    visitTime: "3–4 ore",
    intro: "Entra nel borgo costruito sul banco di peperino, osserva il profilo sospeso dalla valle e ritrova nelle pietre il legame storico con Roma.",
    highlights: [
      { title: "Il borgo sulla rupe", text: "Case, torri e vicoli seguono il bordo della rupe e trasformano il peperino nella materia della città." },
      { title: "Terra fedelissima", text: "Il rapporto con Roma e i Fedeli di Vitorchiano danno al paese un’identità civica ancora riconoscibile." },
      { title: "Boschi e Corviano", text: "Fuori dalle mura, sentieri e affioramenti rocciosi aprono una lettura più selvatica del territorio." },
    ],
  },
  Celleno: {
    focus: "Borgo Fantasma e paesaggio di tufo",
    visitTime: "2–3 ore",
    intro: "Supera il ponte verso il nucleo antico, attraversa le case di tufo del Borgo Fantasma e raggiungi il castello che domina la campagna.",
    highlights: [
      { title: "Borgo Fantasma", text: "Un abitato storico svuotato dalle frane e tornato accessibile come spazio di memoria, arte e racconto." },
      { title: "Castello Orsini", text: "La fortificazione segna l’ingresso al borgo e conserva la scala monumentale affacciata sulla valle." },
      { title: "Terra di ciliegie", text: "Frutteti e produzioni locali riportano la visita dal borgo sospeso alla vita agricola contemporanea." },
    ],
  },
  Lubriano: {
    focus: "Il balcone sulla Valle dei Calanchi",
    visitTime: "2–3 ore",
    intro: "Guarda Civita dal versante opposto, sali alla Torre Monaldeschi e usa il museo naturalistico per riconoscere forme, piante e fragilità della valle.",
    highlights: [
      { title: "Balza di Seppie", text: "Il belvedere mette Civita e i calanchi nello stesso campo visivo: la lettura più chiara del paesaggio." },
      { title: "Museo Naturalistico", text: "Un centro dedicato all’ambiente della valle, utile prima di imboccare i percorsi sul territorio." },
      { title: "Torre Monaldeschi", text: "La torre medievale domina il centro storico e ricuce la vista tra il borgo e il paesaggio aperto." },
    ],
  },
  "Civitella d’Agliano": {
    focus: "Rocca, vigneti e cantine",
    visitTime: "Mezza giornata",
    intro: "Parti dalla Torre Monaldeschi, cammina nel nucleo storico e prosegui tra vigne e cantine che spiegano il paesaggio attraverso il vino.",
    highlights: [
      { title: "Rocca Monaldeschi", text: "Torre, mura e case in pietra compongono il profilo compatto del centro storico." },
      { title: "Paesaggio del vino", text: "Le colline vitate legano suolo vulcanico, lavoro agricolo e una produzione riconoscibile della Tuscia." },
      { title: "Cantine e assaggi", text: "La tappa acquista senso incontrando chi coltiva e vinifica, con visite da organizzare in anticipo." },
    ],
  },
  Graffignano: {
    focus: "Castelli e piccoli centri",
    visitTime: "3–4 ore",
    intro: "Metti in relazione Graffignano e Sipicciano: due nuclei vicini, un castello dominante e architetture che raccontano famiglie e potere nel territorio.",
    highlights: [
      { title: "Castello Baglioni", text: "Il grande volume fortificato è il riferimento visivo e storico del borgo di Graffignano." },
      { title: "Sipicciano", text: "Il vicino centro conserva Palazzo Baronale e una scala più raccolta, da scoprire senza fretta." },
      { title: "Cappella Baglioni", text: "Un episodio artistico che completa la lettura del territorio oltre l’immagine del castello." },
    ],
  },
  "Castiglione in Teverina": {
    focus: "Vino, museo e paesaggio",
    visitTime: "Mezza giornata",
    intro: "Entra nel MUVIS, scendi nella cultura delle cantine e poi torna all’aperto per leggere nei vigneti il rapporto tra produzione e valle.",
    highlights: [
      { title: "MUVIS", text: "Il Museo del Vino e delle Scienze Agroalimentari occupa un grande sistema di ambienti e cantine nel centro storico." },
      { title: "Vigne e produttori", text: "Degustazioni e visite raccontano il territorio attraverso suoli, vitigni e lavoro contemporaneo." },
      { title: "Affacci sulla valle", text: "Dal borgo lo sguardo segue le colline verso il Tevere e chiarisce la geografia agricola del luogo." },
    ],
  },
  Bomarzo: {
    focus: "Sacro Bosco, palazzo e pietre nel bosco",
    visitTime: "Una giornata",
    intro: "Dedica tempo al Sacro Bosco, entra nel centro storico dominato da Palazzo Orsini e cerca nel paesaggio rupestre la Piramide etrusca.",
    highlights: [
      { title: "Sacro Bosco", text: "Mostri, architetture impossibili e iscrizioni compongono uno dei giardini manieristi più singolari d’Italia." },
      { title: "Palazzo Orsini", text: "Il palazzo domina l’abitato e riporta la fantasia del parco alla storia della famiglia che lo commissionò." },
      { title: "Piramide etrusca", text: "Un grande altare rupestre nel bosco, raggiungibile con un percorso che richiede scarpe adatte e orientamento." },
    ],
  },
  Orte: {
    focus: "La città sopra e sotto la rupe",
    visitTime: "Mezza giornata",
    intro: "Leggi Orte su due livelli: piazze e affacci in superficie, acquedotti, cisterne e cunicoli nel percorso sotterraneo scavato nel tufo.",
    highlights: [
      { title: "Orte Sotterranea", text: "Una rete di ambienti ipogei racconta approvvigionamento idrico, lavoro e vita quotidiana sotto il centro storico." },
      { title: "La rupe", text: "Il profilo compatto della città domina il Tevere e rende immediata la sua funzione di controllo e passaggio." },
      { title: "Piazze e musei", text: "Il percorso in superficie completa la visita tra architetture religiose, raccolte civiche e belvedere." },
    ],
  },
  "Bassano in Teverina": {
    focus: "Torri, vicoli e orizzonti",
    visitTime: "2–3 ore",
    intro: "Attraversa il borgo medievale fino alla Torre dell’Orologio e ai belvedere: una tappa compatta con una vista ampia sulla valle del Tevere.",
    highlights: [
      { title: "Torre dell’Orologio", text: "La torre ingloba l’antico campanile romanico e rende visibili le stratificazioni del borgo." },
      { title: "Impianto medievale", text: "Vicoli e case seguono un disegno raccolto, da percorrere a piedi entrando dalle porte storiche." },
      { title: "Belvedere sul Tevere", text: "Gli affacci restituiscono la relazione tra il paese, il fiume e le vie di attraversamento della valle." },
    ],
  },
  "Lugnano in Teverina": {
    focus: "Romanico, palazzi e archeologia",
    visitTime: "Mezza giornata",
    intro: "Comincia dalla Collegiata, attraversa il centro fino a Palazzo Pennone e allarga la visita alla villa romana di Poggio Gramignano.",
    highlights: [
      { title: "Collegiata di Santa Maria", text: "La chiesa romanica del XII secolo è il fulcro architettonico e simbolico del borgo." },
      { title: "Palazzo Pennone", text: "Il grande edificio Farnese-Ridolfi segna il tessuto urbano con una presenza insolita e monumentale." },
      { title: "Poggio Gramignano", text: "La villa romana porta la storia fuori dalle mura e dentro il paesaggio agricolo circostante." },
    ],
  },
  Alviano: {
    focus: "Oasi del Tevere e birdwatching",
    visitTime: "Mezza giornata",
    intro: "Porta il binocolo nell’Oasi WWF, percorri i sentieri tra zone umide e osservatori e collega l’esperienza naturalistica al borgo di Alviano.",
    highlights: [
      { title: "Oasi WWF", text: "Una vasta zona umida d’acqua dolce tutela habitat preziosi lungo il Tevere." },
      { title: "Osservatori", text: "Capanni e percorsi permettono di avvicinare l’avifauna senza interrompere i ritmi dell’ambiente." },
      { title: "Borgo e castello", text: "Il centro storico completa la giornata con una prospettiva dall’alto sul paesaggio appena attraversato." },
    ],
  },
  Attigliano: {
    focus: "La porta ferroviaria della valle",
    visitTime: "1–2 ore",
    intro: "Usa Attigliano come accesso pratico all’area umbra: stazione, servizi e collegamenti ne fanno un punto utile per costruire un itinerario senza auto.",
    highlights: [
      { title: "Arrivare in treno", text: "La stazione consente di entrare nella valle dalla linea ferroviaria e organizzare da qui gli spostamenti locali." },
      { title: "Centro storico", text: "Una sosta breve permette di leggere il nucleo del paese prima di proseguire verso Giove, Alviano o Lugnano." },
      { title: "Nodo di viaggio", text: "Il valore della tappa è concreto: connessioni, rifornimenti e orientamento per un itinerario più ampio." },
    ],
  },
  Giove: {
    focus: "Palazzo Ducale e borgo medievale",
    visitTime: "2–3 ore",
    intro: "Segui le mura del borgo fino al Palazzo Ducale, celebre per le sue numerose finestre, e cerca gli affacci sulle colline verso il Tevere.",
    highlights: [
      { title: "Palazzo Ducale", text: "La grande residenza domina il paese; la tradizione le attribuisce 365 finestre, una per ogni giorno dell’anno." },
      { title: "Borgo medievale", text: "Porte, vicoli e case in pietra formano un nucleo piccolo e leggibile interamente a piedi." },
      { title: "Colline del Tevere", text: "Gli affacci spostano l’attenzione dal monumento al paesaggio agricolo che circonda l’abitato." },
    ],
  },
  "Penna in Teverina": {
    focus: "Giardini, sculture e tracce romane",
    visitTime: "2–3 ore",
    intro: "Attraversa il borgo fortificato, cerca i Mammalocchi nel giardino di Palazzo Orsini e scendi verso le tracce del ponte romano.",
    highlights: [
      { title: "Palazzo Orsini", text: "Il palazzo e il suo giardino raccontano la trasformazione del borgo da luogo difensivo a residenza signorile." },
      { title: "I Mammalocchi", text: "Figure grottesche scolpite animano il giardino con un episodio inatteso e molto riconoscibile." },
      { title: "Ponte romano", text: "I resti lungo l’antico percorso ricordano la rete di attraversamenti che precede i confini contemporanei." },
    ],
  },
  Guardea: {
    focus: "Rocca, boschi e valle aperta",
    visitTime: "3–4 ore",
    intro: "Alterna il centro abitato ai percorsi collinari, raggiungi i resti della rocca e guarda verso Alviano per capire la scala del paesaggio umbro.",
    highlights: [
      { title: "La rocca", text: "I resti fortificati in posizione dominante raccontano il controllo storico delle vie e del territorio." },
      { title: "Percorsi collinari", text: "Boschi e strade bianche invitano a una visita lenta, con calzature adatte e una traccia affidabile." },
      { title: "Vista verso Alviano", text: "Dall’alto il paesaggio si apre verso il lago e il corridoio naturale del Tevere." },
    ],
  },
  Amelia: {
    focus: "Mura poligonali e città romana",
    visitTime: "Una giornata",
    intro: "Entra attraverso le mura poligonali, visita le cisterne romane e il museo archeologico, poi attraversa il centro fino al teatro e alla cattedrale.",
    highlights: [
      { title: "Mura poligonali", text: "Grandi blocchi perfettamente accostati avvolgono la città e ne rendono visibile la profondità storica." },
      { title: "Cisterne romane", text: "Il sistema sotterraneo mostra come l’antica città raccoglieva e distribuiva l’acqua." },
      { title: "Museo archeologico", text: "Reperti e sculture, tra cui il Germanico, danno contesto alle stratificazioni incontrate nelle strade." },
    ],
  },
};

export const territoryDetails = territoryItems.map(([name, area, note], index) => ({
  slug: toSlug(name),
  name,
  area,
  note,
  image: territoryImages[index % territoryImages.length],
  position: area,
  ...territoryProfiles[name],
}));

export const trailItems = [
  {
    slug: "tra-i-borghi-dipinti",
    image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&fm=jpg&q=88&w=2200",
    name: "Tra i borghi dipinti",
    route: "Roccalvecce · Sant’Angelo",
    length: "12,4 km",
    time: "3 h 40",
    level: "Intermedio",
    note: "Tufo, oliveti e racconti dipinti sulle facciate.",
  },
  {
    slug: "lungo-il-fiume-sacro",
    image: "https://www.agriturismosomaia.it/wp-content/uploads/2019/12/nazzano-1.jpg",
    name: "Lungo il fiume sacro",
    route: "Alviano · Oasi del Tevere",
    length: "9,8 km",
    time: "2 h 50",
    level: "Facile",
    note: "Acqua, avifauna e punti di osservazione nella valle.",
  },
  {
    slug: "la-via-dei-calanchi",
    image: "https://upload.wikimedia.org/wikipedia/commons/3/35/Civita_di_Bagnoregio_aerial_panorama._June_2024.jpg",
    name: "La via dei calanchi",
    route: "Lubriano · Bagnoregio",
    length: "10,6 km",
    time: "3 h 20",
    level: "Intermedio",
    note: "Crinali fragili, geologia e grandi aperture sul paesaggio.",
  },
] as const;

export const journalItems = [
  {
    slug: "celleno-non-e-un-paese-fermo-nel-tempo",
    category: "Luoghi",
    title: "Celleno non è un paese fermo nel tempo",
    excerpt: "Le persone, le case e il paesaggio che continuano a trasformare il borgo.",
    read: "8 min",
    image: "https://www.visitarelatuscia.it/wp-content/uploads/2022/02/IMG_20210515_140708-scaled.jpg",
  },
  {
    slug: "il-tornio-gira-la-terra-ricorda",
    category: "Persone",
    title: "Il tornio gira, la terra ricorda",
    excerpt: "Una mattina nella bottega di una ceramista che lavora con argille locali.",
    read: "5 min",
    image: "https://images.unsplash.com/photo-1781389005078-d9e413d89c94?auto=format&fit=crop&fm=jpg&q=84&w=1800",
  },
  {
    slug: "la-tavola-come-luogo-d-incontro",
    category: "Tradizioni",
    title: "La tavola come luogo d’incontro",
    excerpt: "Ricette familiari, gesti tramandati e nuove comunità intorno al cibo.",
    read: "6 min",
    image: "https://images.unsplash.com/photo-1642354581513-9b6c05f1dd6d?auto=format&fit=crop&fm=jpg&q=84&w=1800",
  },
  {
    slug: "leggere-il-fiume-dall-alto",
    category: "Paesaggio",
    title: "Leggere il fiume dall’alto",
    excerpt: "Il Tevere come orientamento, racconto e infrastruttura naturale della valle.",
    read: "7 min",
    image: "https://www.agriturismosomaia.it/wp-content/uploads/2019/12/nazzano-1.jpg",
  },
] as const;

export const merchItems = [
  { name: "Taccuino della valle", material: "Carta riciclata · stampa locale", price: "€18" },
  { name: "Mappa tessile", material: "Cotone naturale · due colori", price: "€32" },
  { name: "Borraccia del cammino", material: "Acciaio · edizione numerata", price: "€28" },
] as const;
