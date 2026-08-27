import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const root = new URL("../", import.meta.url);

test("Val Teverina content, detail routes and social metadata are present", async () => {
  const [site, page, internalPages, detailPages, navigation, layout, internalStyles, packageJson, experienceRoute, trailRoute, territoryRoute, journalRoute] = await Promise.all([
    readFile(new URL("app/ValTeverinaHomeV3.tsx", root), "utf8"),
    readFile(new URL("app/page.tsx", root), "utf8"),
    readFile(new URL("app/InternalPages.tsx", root), "utf8"),
    readFile(new URL("app/DetailPages.tsx", root), "utf8"),
    readFile(new URL("app/site-data.ts", root), "utf8"),
    readFile(new URL("app/layout.tsx", root), "utf8"),
    readFile(new URL("app/val-teverina-internal-v3.css", root), "utf8"),
    readFile(new URL("package.json", root), "utf8"),
    readFile(new URL("app/esperienze/[slug]/page.tsx", root), "utf8"),
    readFile(new URL("app/sentieri-guide/[slug]/page.tsx", root), "utf8"),
    readFile(new URL("app/territori/[slug]/page.tsx", root), "utf8"),
    readFile(new URL("app/blog/[slug]/page.tsx", root), "utf8"),
  ]);

  assert.match(page, /ValTeverinaHomeV3/);
  assert.match(site, /La valle del fiume sacro/);
  assert.match(site, /Il fiume attraversa/);
  assert.match(site, /Qui non sei pubblico/);
  assert.match(site, /Scegli un paese/);
  assert.match(site, /Il territorio cambia/);
  assert.match(site, /Le storie/);
  assert.match(site, /Il territorio non è lo sfondo/);
  assert.match(site, /vt4-identity/);
  assert.match(site, /vt4-experiences/);
  assert.match(site, /vt4-territories/);
  assert.match(site, /vt6-overview/);
  assert.match(site, /vt6-experiences/);
  assert.match(site, /vt6-territories/);
  assert.match(site, /vt6-trails/);
  assert.match(site, /vt6-stories/);
  assert.match(site, /Non una destinazione/);
  assert.match(site, /Entra nella valle/);
  assert.match(internalPages, /project|experiences|trails|territories|merch|blog|community/);
  assert.match(detailPages, /ExperienceDetail/);
  assert.match(detailPages, /TrailDetail/);
  assert.match(detailPages, /TerritoryDetail/);
  assert.match(detailPages, /JournalDetail/);
  assert.match(detailPages, /detail-article__manifesto/);
  assert.match(detailPages, /Voce della valle/);
  assert.match(navigation, /Civita, calanchi e geologia/);
  assert.match(navigation, /Museo Geologico/);
  assert.doesNotMatch(site, /Quanto tempo hai|Trova un luogo|Richiedi un orientamento/);
  assert.doesNotMatch(site, /vt-numbers|vt-manifesto|vt-entry-points/);
  assert.doesNotMatch(detailPages, /Vale una deviazione|Il luogo/);
  for (const route of [experienceRoute, trailRoute, territoryRoute, journalRoute]) {
    assert.match(route, /generateMetadata/);
    assert.match(route, /pageMetadata/);
  }
  for (const route of ["/progetto", "/esperienze", "/sentieri-guide", "/territori", "/merch", "/blog", "/community"]) {
    assert.match(navigation, new RegExp(route));
  }
  assert.match(layout, /openGraph/);
  assert.match(layout, /val-teverina-internal-v3\.css/);
  assert.match(internalPages, /vt3-shell/);
  assert.match(detailPages, /vt3-shell/);
  assert.match(internalStyles, /experience-index/);
  assert.match(internalStyles, /project-river/);
  assert.match(internalStyles, /territory-atlas/);
  assert.match(internalStyles, /territory-summary/);
  assert.match(layout, /\/og\.png/);
  assert.doesNotMatch(site + layout, /SkeletonPreview|codex-preview|Starter Project/);
  assert.doesNotMatch(packageJson, /react-loading-skeleton/);
});
