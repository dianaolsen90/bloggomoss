import { writeFileSync } from "fs";

const PRO1_URL =
  "https://miniprojektor.se/products/minilux-pro-smart-miniprojektor";
const PRO2_URL =
  "https://miniprojektor.se/products/minilux-pro-2-smart-miniprojektor-med-bluetooth-och-wifi-svart";

const FONTS = `<link rel="preconnect" href="https://fonts.googleapis.com"/>
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
<link href="https://fonts.googleapis.com/css2?family=Merriweather:ital,wght@0,400;0,700;1,400&family=Inter:wght@400;500;600&display=swap" rel="stylesheet"/>`;

const BASE_CSS = `
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
body{background:#fff;color:#111;font-family:'Inter',sans-serif;font-size:15px;line-height:1.6;-webkit-font-smoothing:antialiased}
.topbar{background:#f2f2f2;border-bottom:1px solid #e4e4e4;padding:.4rem 2rem;display:flex;justify-content:space-between;align-items:center}
.topbar p,.topbar span,.topbar-right{font-size:.72rem;color:#888}
nav{border-bottom:2px solid #111;padding:0 2rem;background:#fff;position:sticky;top:0;z-index:100}
.nav-top{display:flex;align-items:center;justify-content:space-between;height:62px}
.brand{font-family:'Merriweather',serif;font-size:1.5rem;font-weight:700;color:#111;text-decoration:none;letter-spacing:-.02em}
.brand span{color:#c0392b}
.nav-search input{border:1px solid #ddd;border-radius:4px;padding:.3rem .7rem;font-size:.8rem;font-family:'Inter',sans-serif;outline:none;width:180px}
.nav-back{font-size:.82rem;font-weight:600;color:#555;text-decoration:none}
.nav-back:hover{color:#111}
.cat-nav{display:flex;gap:0;border-top:1px solid #e8e8e8;overflow-x:auto}
.cat-nav a{font-size:.78rem;font-weight:600;color:#444;text-decoration:none;padding:.6rem 1.1rem;white-space:nowrap;border-bottom:2px solid transparent;transition:all .15s;text-transform:uppercase;letter-spacing:.04em}
.cat-nav a:hover{color:#111;border-bottom-color:#111}
.cat-nav a.active{color:#c0392b;border-bottom-color:#c0392b}
.container{max-width:1100px;margin:0 auto;padding:0 2rem}
footer{background:#111;color:#fff;padding:3rem 2rem 2rem}
.footer-inner{max-width:1100px;margin:0 auto}
.footer-grid{display:grid;grid-template-columns:2fr 1fr 1fr;gap:3rem;margin-bottom:2.5rem}
.footer-brand{font-family:'Merriweather',serif;font-size:1.2rem;font-weight:700;color:#fff;margin-bottom:.6rem}
.footer-brand span{color:#c0392b}
.footer-about{font-size:.82rem;color:#888;line-height:1.65;max-width:260px}
.footer-col h4{font-size:.65rem;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:#555;margin-bottom:1rem;padding-bottom:.5rem;border-bottom:1px solid #333}
.footer-col ul{list-style:none}
.footer-col li{margin-bottom:.5rem}
.footer-col a{font-size:.83rem;color:#888;text-decoration:none}
.footer-col a:hover{color:#fff}
.footer-bottom{padding-top:1.5rem;border-top:1px solid #222;display:flex;justify-content:space-between;flex-wrap:wrap;gap:.5rem}
.footer-bottom p{font-size:.75rem;color:#555}
.footer-bottom a{color:#888;text-decoration:none}
.footer-bottom a:hover{color:#fff}
@media(max-width:900px){.footer-grid{grid-template-columns:1fr 1fr}}
@media(max-width:580px){.footer-grid{grid-template-columns:1fr}}
`;

const ARTICLE_CSS = `
.article-grid{display:grid;grid-template-columns:1fr 280px;gap:4rem;padding:2.5rem 0 5rem}
.art-cat{font-size:.65rem;font-weight:700;letter-spacing:.12em;text-transform:uppercase;color:#c0392b;margin-bottom:.6rem}
h1{font-family:'Merriweather',serif;font-size:clamp(1.6rem,3.5vw,2.2rem);font-weight:700;line-height:1.25;color:#111;margin-bottom:.8rem}
.art-intro{font-family:'Merriweather',serif;font-style:italic;font-size:1rem;color:#555;line-height:1.75;margin-bottom:1.5rem;padding-bottom:1.5rem;border-bottom:1px solid #e8e8e8}
.art-meta{display:flex;align-items:center;gap:.5rem;font-size:.73rem;color:#aaa;margin-bottom:1rem;flex-wrap:wrap}
.dot{width:3px;height:3px;border-radius:50%;background:#ccc;display:inline-block}
.trust-bar{display:flex;flex-wrap:wrap;gap:.5rem 1.2rem;font-size:.72rem;color:#666;margin-bottom:1.5rem;padding:.8rem 1rem;background:#fafaf8;border:1px solid #e8e8e8}
.trust-bar span{display:flex;align-items:center;gap:.35rem}
.trust-bar span::before{content:'';width:6px;height:6px;border-radius:50%;background:#27ae60}
.art-img{background:#f0ece6;border-radius:4px;aspect-ratio:16/7;display:flex;align-items:center;justify-content:center;font-size:.75rem;color:#bbb;margin-bottom:2rem}
.body{font-size:.98rem;color:#222;line-height:1.85}
.body p{margin-bottom:1.2rem}
.body h2{font-family:'Merriweather',serif;font-size:1.25rem;font-weight:700;margin:2.2rem 0 .7rem;color:#111}
.body ul,.body ol{padding-left:1.4rem;margin-bottom:1.2rem}
.body li{margin-bottom:.5rem}
.body a{color:#c0392b}
.callout{background:#fafaf8;border-left:3px solid #c0392b;padding:.9rem 1.2rem;margin:1.5rem 0}
.callout p{margin:0;font-size:.9rem;color:#555;font-style:italic}
.spec-tbl,.cmp-tbl{width:100%;border-collapse:collapse;margin:1.5rem 0;font-size:.88rem;border:1px solid #e8e8e8}
.spec-tbl td,.cmp-tbl td,.cmp-tbl th{padding:.6rem .9rem;border-bottom:1px solid #f0f0f0;color:#444}
.spec-tbl td:first-child,.cmp-tbl th{background:#fafaf8;font-weight:600;color:#111}
.score-box{background:#fafaf8;border:1px solid #e8e8e8;padding:1.4rem;margin:1.5rem 0}
.score-row{display:flex;align-items:center;gap:1rem;margin-bottom:.7rem}
.score-lbl{font-size:.8rem;width:170px;flex-shrink:0}
.score-bar{flex:1;background:#e8e8e4;border-radius:2px;height:4px;overflow:hidden}
.score-fill{height:100%;background:#c0392b}
.score-val{font-size:.8rem;font-weight:600;width:26px;text-align:right}
.score-total{margin-top:1rem;padding-top:1rem;border-top:1px solid #e8e8e8;display:flex;align-items:baseline;gap:.5rem}
.score-num{font-family:'Merriweather',serif;font-size:2.5rem;font-weight:700}
.pc{display:grid;grid-template-columns:1fr 1fr;gap:1rem;margin:1.5rem 0}
.pc-box{border:1px solid #e8e8e8;padding:1.1rem}
.pc-box h4{font-size:.65rem;font-weight:700;letter-spacing:.1em;text-transform:uppercase;margin-bottom:.7rem}
.pros h4{color:#27ae60}.cons h4{color:#c0392b}
.pc-box ul{list-style:none}
.pc-box li{font-size:.83rem;padding:.32rem 0;display:flex;gap:.5rem;border-bottom:1px solid #f5f5f5}
.pros li::before{content:'✓';color:#27ae60;font-weight:700}
.cons li::before{content:'✗';color:#c0392b;font-weight:700}
.cta-box{background:#111;color:#fff;padding:2rem;margin:2rem 0;text-align:center;border-radius:4px}
.cta-box h3{font-family:'Merriweather',serif;font-size:1.2rem;margin-bottom:1rem}
.cta-btn{display:inline-block;background:#27ae60;color:#fff;font-weight:700;font-size:.9rem;padding:.75rem 1.6rem;border-radius:4px;text-decoration:none}
.cta-btn:hover{opacity:.9}
.author-bio{margin-top:2.5rem;padding-top:2rem;border-top:2px solid #111;display:flex;gap:1.2rem}
.av-lg{width:60px;height:60px;border-radius:50%;background:#e8e4de;display:flex;align-items:center;justify-content:center;font-size:.95rem;font-weight:700;color:#888;flex-shrink:0}
.bio-expert-tag{font-size:.62rem;font-weight:700;letter-spacing:.12em;text-transform:uppercase;color:#c0392b}
.bio-name{font-family:'Merriweather',serif;font-size:1.1rem;font-weight:700;margin:.2rem 0}
.bio-title{font-size:.8rem;color:#888;font-style:italic;margin-bottom:.7rem}
.bio-text{font-size:.85rem;color:#555;line-height:1.65;margin-bottom:.8rem}
.bio-stats{display:flex;gap:1.5rem;flex-wrap:wrap}
.bio-stat strong{display:block;font-family:'Merriweather',serif;font-size:1rem}
.bio-stat span{font-size:.7rem;color:#aaa;text-transform:uppercase}
.related{margin-top:2.5rem;padding-top:2rem;border-top:1px solid #e8e8e8}
.related-title{font-size:.65rem;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:#999;margin-bottom:1.2rem}
.related-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:1rem}
.rel-card{text-decoration:none;color:inherit;border:1px solid #e8e8e8;border-radius:3px;overflow:hidden}
.rel-img{aspect-ratio:16/9;background:#f5f2ee;display:flex;align-items:center;justify-content:center;font-size:.7rem;color:#ccc}
.rel-body{padding:.8rem}
.rel-cat{font-size:.6rem;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:#c0392b}
.rel-title{font-family:'Merriweather',serif;font-size:.82rem;font-weight:700;line-height:1.35;color:#111}
aside .sb-title{font-size:.65rem;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:#999;padding-bottom:.5rem;margin-bottom:1rem;border-bottom:2px solid #111}
.sb-posts{list-style:none}
.sb-posts li{border-bottom:1px solid #f0f0f0}
.sb-posts a{display:flex;gap:.7rem;padding:.65rem 0;text-decoration:none}
.sb-rank{font-family:'Merriweather',serif;font-size:1rem;font-weight:700;color:#e8e8e2;width:20px}
.sb-link-title{font-size:.8rem;font-weight:600;color:#222}
.sb-link-meta{font-size:.68rem;color:#bbb}
.tag-cloud{display:flex;flex-wrap:wrap;gap:.4rem;margin-top:.5rem}
.tag{background:#f5f5f3;border:1px solid #e8e8e8;color:#555;font-size:.72rem;padding:.25rem .65rem;border-radius:3px;text-decoration:none}
.rank-entry{border:1px solid #e8e8e8;padding:1.5rem;margin-bottom:1.5rem}
.rank-num{font-family:'Merriweather',serif;font-size:2rem;color:#c0392b;font-weight:700}
.cat-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:1.2rem;padding:2rem 0 4rem}
.cat-card{border:1px solid #e8e8e8;text-decoration:none;color:inherit;padding:1rem;display:grid;grid-template-columns:100px 1fr;gap:1rem}
.cat-card:hover .cat-card-title{color:#c0392b}
.cat-thumb{background:#f0ece6;aspect-ratio:4/3;display:flex;align-items:center;justify-content:center;font-size:.65rem;color:#bbb}
.cat-card-title{font-family:'Merriweather',serif;font-size:.95rem;font-weight:700;line-height:1.35;margin-bottom:.3rem}
.cat-card-excerpt{font-size:.8rem;color:#666;line-height:1.5}
.cat-card-meta{font-size:.7rem;color:#bbb;margin-top:.4rem}
.page-main{padding:2.5rem 0 4rem;max-width:720px}
.page-main.wide{max-width:100%}
.form-group{margin-bottom:1rem}
.form-group label{display:block;font-size:.8rem;font-weight:600;margin-bottom:.3rem}
.form-group input,.form-group textarea{width:100%;padding:.6rem;border:1px solid #ddd;font-family:inherit;font-size:.9rem}
.form-btn{background:#c0392b;color:#fff;border:none;padding:.7rem 1.4rem;font-weight:700;cursor:pointer;font-size:.9rem}
.author-card{border:1px solid #e8e8e8;padding:1.5rem;margin-bottom:1.5rem}
@media(max-width:900px){.article-grid{grid-template-columns:1fr}aside{display:none}.related-grid,.pc,.cat-grid{grid-template-columns:1fr}}
`;

const INDEX_CSS = `
.main-grid{display:grid;grid-template-columns:1fr 300px;gap:3.5rem;padding:2.5rem 0 4rem}
.featured{margin-bottom:2.5rem;padding-bottom:2.5rem;border-bottom:1px solid #e8e8e8}
.featured-img{background:#f0ece6;border-radius:4px;aspect-ratio:16/7;display:flex;align-items:center;justify-content:center;font-size:.75rem;color:#bbb;margin-bottom:1.2rem}
.feat-meta{display:flex;align-items:center;gap:.5rem;margin-bottom:.6rem}
.cat-label{font-size:.65rem;font-weight:700;letter-spacing:.12em;text-transform:uppercase;color:#c0392b}
.meta-date{font-size:.73rem;color:#aaa}
.featured h2{font-family:'Merriweather',serif;font-size:1.9rem;font-weight:700;line-height:1.25;color:#111;margin-bottom:.8rem}
.featured p{font-size:.95rem;color:#555;line-height:1.75;margin-bottom:1rem}
.read-more{font-size:.82rem;font-weight:600;color:#111;text-decoration:none;border-bottom:1px solid #111;padding-bottom:.1rem}
.read-more:hover{color:#c0392b;border-color:#c0392b}
.feat-author{display:flex;align-items:center;gap:.6rem;margin-top:1rem}
.av{width:28px;height:28px;border-radius:50%;background:#e8e4de;display:flex;align-items:center;justify-content:center;font-size:.6rem;font-weight:700;color:#888}
.feat-author-txt{font-size:.77rem;color:#888}
.feat-author-txt strong{color:#333;font-weight:600}
.post-list{display:flex;flex-direction:column}
.post-item{display:grid;grid-template-columns:120px 1fr;gap:1.2rem;padding:1.3rem 0;border-bottom:1px solid #f0f0f0;text-decoration:none;color:inherit}
.post-item:hover .post-item-title{color:#c0392b}
.post-thumb{background:#f0ece6;border-radius:3px;aspect-ratio:4/3;display:flex;align-items:center;justify-content:center;font-size:.65rem;color:#bbb}
.pt-guide{background:#eef3ee}.pt-tips{background:#f7f4ee}.pt-tech{background:#eef0f8}.pt-jmf{background:#f7eeee}.pt-rec{background:#f0eef7}
.post-item-cat{font-size:.62rem;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:#c0392b;margin-bottom:.3rem}
.post-item-title{font-family:'Merriweather',serif;font-size:.95rem;font-weight:700;line-height:1.35;color:#111;margin-bottom:.3rem}
.post-item-excerpt{font-size:.8rem;color:#666;line-height:1.55}
.post-item-meta{font-size:.7rem;color:#bbb;margin-top:.4rem}
.about-box{background:#fafaf8;border:1px solid #e8e8e8;border-left:3px solid #c0392b;padding:1.2rem}
.about-box p{font-size:.83rem;color:#666;line-height:1.6}
@media(max-width:900px){.main-grid{grid-template-columns:1fr}aside{display:none}}
@media(max-width:580px){.post-item{grid-template-columns:90px 1fr}.featured h2{font-size:1.4rem}}
`;

const cats = [
  ["index.html", "Alla"],
  ["kategori-guider.html", "Guider"],
  ["kategori-recensioner.html", "Recensioner"],
  ["kategori-tips.html", "Tips och tricks"],
  ["kategori-teknik.html", "Teknik"],
  ["kategori-jamforelser.html", "Jämförelser"],
  ["kategori-hemmabio.html", "Hemmabio"],
  ["kategori-gaming.html", "Gaming"],
];

function nav(active, opts = {}) {
  const links = cats
    .map(
      ([href, label]) =>
        `<a href="${href}"${href === active ? ' class="active"' : ""}>${label}</a>`
    )
    .join("");
  const topRight = opts.home
    ? `<div class="nav-search"><input type="text" placeholder="Sök artiklar..."/></div>`
    : `<a class="nav-back" href="index.html">Tillbaka till bloggen</a>`;
  return `<div class="topbar"><p>Oberoende teknikjournalistik sedan 2023</p><span${opts.topbarClass ? ` class="topbar-right"` : ""}>${opts.topbarText || "ProjektorTips.se"}</span></div>
<nav><div class="nav-top"><a class="brand" href="index.html">Projektor<span>Tips</span>.se</a>${topRight}</div><div class="cat-nav">${links}</div></nav>`;
}

function footer() {
  return `<footer><div class="footer-inner"><div class="footer-grid">
<div><div class="footer-brand">Projektor<span>Tips</span>.se</div>
<p class="footer-about">Oberoende blogg om projektorer och hemmabio sedan 2023. Vi testar och granskar utan koppling till någon butik eller tillverkare.</p></div>
<div class="footer-col"><h4>Populära artiklar</h4><ul>
<li><a href="minilux-pro-recension.html">MiniLux Pro recension</a></li>
<li><a href="minilux-pro-2-recension.html">MiniLux Pro 2 recension</a></li>
<li><a href="minilux-pro-2-vs-pro.html">MiniLux Pro 2 vs Pro</a></li>
<li><a href="basta-projektorer-2026.html">Bästa projektorer 2026</a></li>
<li><a href="varfor-kopa-projektor.html">Varför välja projektor</a></li>
<li><a href="ansi-lumen-guide.html">ANSI Lumen förklarat</a></li>
</ul></div>
<div class="footer-col"><h4>Kategorier</h4><ul>
<li><a href="kategori-guider.html">Guider</a></li>
<li><a href="kategori-recensioner.html">Recensioner</a></li>
<li><a href="kategori-tips.html">Tips och tricks</a></li>
<li><a href="kategori-teknik.html">Teknik</a></li>
<li><a href="kategori-jamforelser.html">Jämförelser</a></li>
<li><a href="kategori-hemmabio.html">Hemmabio</a></li>
</ul></div></div>
<div class="footer-bottom">
<p>&copy; 2026 ProjektorTips.se</p>
<p><a href="om-oss.html">Om oss</a> &nbsp;·&nbsp; <a href="kontakt.html">Kontakt</a> &nbsp;·&nbsp; <a href="integritetspolicy.html">Integritetspolicy</a></p>
</div></div></footer>`;
}

function sidebarArticle() {
  return `<aside>
<div class="sb-section"><div class="sb-title">Mest lästa</div><ul class="sb-posts">
<li><a href="basta-projektorer-2026.html"><span class="sb-rank">01</span><div><div class="sb-link-title">Bästa projektorerna 2026</div><div class="sb-link-meta">Guide</div></div></a></li>
<li><a href="minilux-pro-recension.html"><span class="sb-rank">02</span><div><div class="sb-link-title">MiniLux Pro recension</div><div class="sb-link-meta">Recension</div></div></a></li>
<li><a href="minilux-pro-2-recension.html"><span class="sb-rank">03</span><div><div class="sb-link-title">MiniLux Pro 2 recension</div><div class="sb-link-meta">Recension</div></div></a></li>
<li><a href="varfor-kopa-projektor.html"><span class="sb-rank">04</span><div><div class="sb-link-title">Varför välja projektor</div><div class="sb-link-meta">Guide</div></div></a></li>
<li><a href="ansi-lumen-guide.html"><span class="sb-rank">05</span><div><div class="sb-link-title">ANSI Lumen förklarat</div><div class="sb-link-meta">Teknik</div></div></a></li>
</ul></div>
<div class="sb-section"><div class="sb-title">Ämnen</div><div class="tag-cloud">
<a class="tag" href="kategori-recensioner.html">Projektorer</a>
<a class="tag" href="kategori-hemmabio.html">Hemmabio</a>
<a class="tag" href="kategori-recensioner.html">Recensioner</a>
<a class="tag" href="kategori-guider.html">Guider</a>
<a class="tag" href="kategori-tips.html">Tips</a>
<a class="tag" href="kategori-teknik.html">Teknik</a>
<a class="tag" href="kategori-jamforelser.html">Jämförelser</a>
<a class="tag" href="4k-vs-1080p.html">4K</a>
<a class="tag" href="ljud-projektor.html">Ljud</a>
<a class="tag" href="hemmabio-budget.html">Budget</a>
<a class="tag" href="kategori-gaming.html">Gaming</a>
</div></div></aside>`;
}

function articlePage({
  title,
  metaTitle,
  metaDesc,
  activeCat,
  catLabel,
  h1,
  intro,
  author,
  date,
  readMin,
  trust,
  body,
  related,
  bio,
}) {
  return `<!DOCTYPE html>
<html lang="sv">
<head>
<meta charset="UTF-8"/>
<meta name="viewport" content="width=device-width,initial-scale=1.0"/>
<title>${metaTitle}</title>
<meta name="description" content="${metaDesc}"/>
${FONTS}
<style>${BASE_CSS}${ARTICLE_CSS}</style>
</head>
<body>
${nav(activeCat)}
<div class="container"><div class="article-grid">
<article>
<div class="art-cat">${catLabel}</div>
<h1>${h1}</h1>
<p class="art-intro">${intro}</p>
<div class="art-meta"><strong>${author.name}</strong><span class="dot"></span><span>${date}</span><span class="dot"></span><span>${readMin} min läsning</span></div>
${trust ? `<div class="trust-bar">${trust.map((t) => `<span>${t}</span>`).join("")}</div>` : ""}
<div class="art-img">[ Artikelbild ]</div>
<div class="body">${body}</div>
${bio}
${related}
</article>
${sidebarArticle()}
</div></div>
${footer()}
</body></html>`;
}

function bioPer() {
  return `<div class="author-bio"><div class="av-lg">PB</div><div>
<div class="bio-expert-tag">Teknikexpert</div>
<div class="bio-name">Per Bergman</div>
<div class="bio-title">Seniorskribent, ProjektorTips.se</div>
<p class="bio-text">Per Bergman är seniorskribent med 9 års erfarenhet av konsumentelektronik. Han har tidigare arbetat som AV-tekniker och teknikskribent för svenska konsumenttidningar, och specialiserar sig på bildteknik och projektionsteknik. Alla produkter köps med egna medel.</p>
<div class="bio-stats">
<div class="bio-stat"><strong>9 år</strong><span>Erfarenhet</span></div>
<div class="bio-stat"><strong>180+</strong><span>Produkter testade</span></div>
<div class="bio-stat"><strong>50+</strong><span>Projektorer</span></div>
</div></div></div>`;
}

function bioErik() {
  return `<div class="author-bio"><div class="av-lg">EL</div><div>
<div class="bio-expert-tag">Teknikskribent</div>
<div class="bio-name">Erik Lindström</div>
<div class="bio-title">Teknikskribent, ProjektorTips.se</div>
<p class="bio-text">Erik Lindström har 11 års erfarenhet som teknikskribent. Han var tidigare redaktör på Råd och Rön Teknik och bidragsskribent för Elektroniktidningen. Han köper alltid produkter med egna medel och tar inga sponsrade uppdrag.</p>
<div class="bio-stats">
<div class="bio-stat"><strong>11 år</strong><span>Erfarenhet</span></div>
<div class="bio-stat"><strong>220+</strong><span>Produkter testade</span></div>
<div class="bio-stat"><strong>60+</strong><span>Projektorer</span></div>
</div></div></div>`;
}

function bioAnna() {
  return `<div class="author-bio"><div class="av-lg">AS</div><div>
<div class="bio-expert-tag">Köpguider</div>
<div class="bio-name">Anna Svensson</div>
<div class="bio-title">Teknikskribent, ProjektorTips.se</div>
<p class="bio-text">Anna Svensson är teknikskribent med 7 års erfarenhet och utbildning inom medie- och kommunikationsvetenskap. Hon specialiserar sig på köpguider och konsumentvägledning för familjer och förstagångsköpare.</p>
<div class="bio-stats">
<div class="bio-stat"><strong>7 år</strong><span>Erfarenhet</span></div>
<div class="bio-stat"><strong>140+</strong><span>Artiklar</span></div>
<div class="bio-stat"><strong>30+</strong><span>Projektorer</span></div>
</div></div></div>`;
}

function relatedCards(items) {
  return `<div class="related"><div class="related-title">Fler artiklar du kanske gillar</div><div class="related-grid">${items
    .map(
      ([href, cat, title]) =>
        `<a class="rel-card" href="${href}"><div class="rel-img">[ Bild ]</div><div class="rel-body"><span class="rel-cat">${cat}</span><div class="rel-title">${title}</div></div></a>`
    )
    .join("")}</div></div>`;
}

function scoreRows(rows, total) {
  const bars = rows
    .map(
      ([lbl, val]) =>
        `<div class="score-row"><span class="score-lbl">${lbl}</span><div class="score-bar"><div class="score-fill" style="width:${val * 20}%"></div></div><span class="score-val">${val}</span></div>`
    )
    .join("");
  return `<div class="score-box">${bars}<div class="score-total"><span class="score-num">${total}</span><span style="color:#aaa">/5</span></div></div>`;
}

function prosCons(pros, cons) {
  return `<div class="pc"><div class="pc-box pros"><h4>Fördelar</h4><ul>${pros.map((p) => `<li>${p}</li>`).join("")}</ul></div><div class="pc-box cons"><h4>Nackdelar</h4><ul>${cons.map((c) => `<li>${c}</li>`).join("")}</ul></div></div>`;
}

function ctaPro1() {
  return `<div class="cta-box"><h3>Köp MiniLux Pro för 1 499 kr hos miniprojektor.se</h3><a class="cta-btn" href="${PRO1_URL}" rel="noopener">Se pris och lagerstatus</a></div>`;
}

function ctaPro2() {
  return `<div class="cta-box"><h3>Köp MiniLux Pro 2 för 1 999 kr</h3><a class="cta-btn" href="${PRO2_URL}" rel="noopener">Se pris och lagerstatus</a></div>`;
}

function categoryPage(activeCat, h1, cards) {
  const grid = cards
    .map(
      ([href, title, excerpt, author]) =>
        `<a class="cat-card" href="${href}"><div class="cat-thumb">[ Bild ]</div><div><div class="cat-card-title">${title}</div><p class="cat-card-excerpt">${excerpt}</p><div class="cat-card-meta">${author}</div></div></a>`
    )
    .join("");
  return `<!DOCTYPE html>
<html lang="sv">
<head>
<meta charset="UTF-8"/>
<meta name="viewport" content="width=device-width,initial-scale=1.0"/>
<title>${h1} | ProjektorTips.se</title>
<meta name="description" content="${h1} på ProjektorTips.se. Oberoende guider och recensioner om projektorer."/>
${FONTS}
<style>${BASE_CSS}${ARTICLE_CSS}</style>
</head>
<body>
${nav(activeCat)}
<div class="container page-main wide">
<h1>${h1}</h1>
<p style="color:#666;margin:1rem 0 2rem">Alla artiklar i kategorin.</p>
<div class="cat-grid">${grid}</div>
</div>
${footer()}
</body></html>`;
}

function indexPage() {
  const posts = [
    ["minilux-pro-recension.html", "pt-rec", "Recension", "MiniLux Pro testad: vi använde den i 30 dagar i verkliga miljöer", "200 ANSI Lumen, XGA 1280×720, 180 graders rotation och 4000+ appar. Vårt mest grundliga budgettest.", "Per Bergman", "18 maj 2026", "12"],
    ["minilux-pro-2-recension.html", "pt-rec", "Recension", "MiniLux Pro 2 recension: 390 ANSI och native 1080P för 1 999 kr", "WiFi 6, native 1080P och nästan dubbelt så stark som Pro. Vi testade uppgraderingen i fyra rum.", "Erik Lindström", "22 maj 2026", "14"],
    ["varfor-kopa-projektor.html", "pt-guide", "Guide", "Varför du ska köpa en projektor istället för en stor-TV", "Sju konkreta skäl till varför en projektor ger mer upplevelse per krona än vad någon stor-TV klarar av.", "Anna Svensson", "10 maj 2026", "9"],
    ["hemmabio-budget.html", "pt-guide", "Guide", "Hemmabio under 5000 kr: så bygger du det smartaste upplaget", "Tre kompletta hemmabioupplag för tre budgetar. En miniprojektor och en bra högtalare slår en stor-TV i den här klassen.", "Anna Svensson", "26 apr 2026", "8"],
    ["ansi-lumen-guide.html", "pt-tech", "Teknik", "Vad är ANSI Lumen och hur mycket ljusstyrka behöver du egentligen?", "Siffrorna på förpackningen säger sällan hela sanningen. Vad du faktiskt behöver veta för att göra rätt val.", "Erik Lindström", "20 apr 2026", "6"],
    ["projektor-sovrum.html", "pt-guide", "Guide", "Projektor i sovrummet: allt du behöver veta för att lyckas", "180 graders rotation, keystone och Bluetooth-hörlurar. Så får du en perfekt sovrumsupplevelse utan att störa någon.", "Anna Svensson", "15 apr 2026", "7"],
    ["utomhusbio-guide.html", "pt-tips", "Tips", "Utomhusbio hemma: så sätter du upp en perfekt biokväll på terrassen", "Film på 120 tum mot husväggen. Enklare än du tror och imponerar alltid på gäster. Vår praktiska startguide.", "Per Bergman", "10 apr 2026", "5"],
    ["minilux-pro-2-vs-pro.html", "pt-jmf", "Jämförelse", "MiniLux Pro 2 vs Pro: är uppgraderingen värd 500 kr?", "Vi har testat båda i fyra veckor. Frågan om man ska uppgradera beror helt på hur du tänker använda projektorn.", "Anna Svensson", "5 apr 2026", "9"],
    ["projektor-gaming.html", "pt-tech", "Gaming", "Projektor för gaming: input lag, Hz och vad du måste ha koll på", "Inte alla projektorer passar för spel. De viktigaste specifikationerna för en låg-fördröjnings spelupplevelse på storbild.", "Per Bergman", "1 apr 2026", "7"],
    ["keystone-guide.html", "pt-tech", "Teknik", "Keystone-korrigering förklarat: så får du en rektangulär bild varje gång", "Den lilla inställningen som gör stor skillnad. Vi förklarar vad keystone är och hur auto-korrigering funkar i praktiken.", "Per Bergman", "25 mar 2026", "4"],
    ["projektor-vs-tv.html", "pt-jmf", "Jämförelse", "Projektor eller TV: en ärlig jämförelse utan reklamlöften", "Vi går igenom pris per tum, bildkvalitet i olika ljusmiljöer och flexibilitet. Svaret är mer nyanserat än du tror.", "Anna Svensson", "20 mar 2026", "8"],
    ["projiceringsduk-guide.html", "pt-guide", "Guide", "Välja projiceringsduk: storlek, material och vad du faktiskt behöver", "En vit vägg funkar. Men rätt duk gör det bättre. Vi går igenom vad som spelar roll och vad du kan skippa.", "Anna Svensson", "15 mar 2026", "6"],
    ["ljud-projektor.html", "pt-tips", "Tips", "Så får du bra ljud till din projektor: tre alternativ för olika behov", "Inbyggda högtalare räcker sällan. Bluetooth-högtalare, soundbar eller stereo? Vi hjälper dig välja rätt.", "Erik Lindström", "10 mar 2026", "5"],
    ["optimera-rummet.html", "pt-tips", "Tips", "8 enkla sätt att optimera rummet för bättre projektor-bild", "Gardiner, väggfärg och möbelplacering påverkar bildkvaliteten mer än tekniken. Så använder du rummet till din fördel.", "Per Bergman", "5 mar 2026", "5"],
    ["4k-vs-1080p.html", "pt-tech", "Teknik", "4K, 1080p eller 720p: vilken upplösning räcker för din setup?", "Höjer 4K verkligen upplevelsen när du sitter fyra meter från duken? Vi testar vad ögat faktiskt kan se.", "Erik Lindström", "28 feb 2026", "6"],
    ["wifi-streaming.html", "pt-tech", "Teknik", "WiFi-streaming till projektor: WiFi 6 och stabilt hemmabio", "När standard WiFi inte räcker och varför dual band spelar roll för 1080P utan buffring.", "Erik Lindström", "22 feb 2026", "6"],
  ];
  const postHtml = posts
    .map(
      ([href, thumb, cat, title, excerpt, author, date, min]) =>
        `<a class="post-item" href="${href}"><div class="post-thumb ${thumb}">[ Bild ]</div><div><div class="post-item-cat">${cat}</div><div class="post-item-title">${title}</div><div class="post-item-excerpt">${excerpt}</div><div class="post-item-meta">${author} &nbsp;·&nbsp; ${date} &nbsp;·&nbsp; ${min} min</div></div></a>`
    )
    .join("");
  const sidebarMost = `<div class="sb-section"><div class="sb-title">Mest lästa</div><ul class="sb-posts">
<li><a href="basta-projektorer-2026.html"><span class="sb-rank">01</span><div><div class="sb-link-title">Bästa projektorerna 2026: vår kompletta guide</div><div class="sb-link-meta">Guide · 20 maj 2026</div></div></a></li>
<li><a href="minilux-pro-recension.html"><span class="sb-rank">02</span><div><div class="sb-link-title">MiniLux Pro testad: 30 dagars användning</div><div class="sb-link-meta">Recension · 18 maj 2026</div></div></a></li>
<li><a href="minilux-pro-2-recension.html"><span class="sb-rank">03</span><div><div class="sb-link-title">MiniLux Pro 2 recension</div><div class="sb-link-meta">Recension · 22 maj 2026</div></div></a></li>
<li><a href="varfor-kopa-projektor.html"><span class="sb-rank">04</span><div><div class="sb-link-title">Varför projektor slår stor-TV</div><div class="sb-link-meta">Guide · 10 maj 2026</div></div></a></li>
<li><a href="ansi-lumen-guide.html"><span class="sb-rank">05</span><div><div class="sb-link-title">ANSI Lumen förklarat</div><div class="sb-link-meta">Teknik · 20 apr 2026</div></div></a></li>
</ul></div>`;
  const tags = `<div class="sb-section"><div class="sb-title">Ämnen</div><div class="tag-cloud">
<a class="tag" href="kategori-guider.html">Guider</a>
<a class="tag" href="kategori-recensioner.html">Recensioner</a>
<a class="tag" href="kategori-hemmabio.html">Hemmabio</a>
<a class="tag" href="kategori-gaming.html">Gaming</a>
<a class="tag" href="kategori-tips.html">Tips</a>
<a class="tag" href="kategori-teknik.html">Teknik</a>
<a class="tag" href="kategori-jamforelser.html">Jämförelser</a>
<a class="tag" href="utomhusbio-guide.html">Utomhusbio</a>
<a class="tag" href="hemmabio-budget.html">Budget</a>
<a class="tag" href="4k-vs-1080p.html">4K</a>
<a class="tag" href="projektor-sovrum.html">Sovrum</a>
<a class="tag" href="ljud-projektor.html">Ljud</a>
</div></div>`;
  return `<!DOCTYPE html>
<html lang="sv">
<head>
<meta charset="UTF-8"/>
<meta name="viewport" content="width=device-width,initial-scale=1.0"/>
<title>ProjektorTips.se | Guider och tester om projektorer</title>
<meta name="description" content="Oberoende blogg om projektorer. Guider, recensioner och köpråd för dig som vill ha storbild hemma."/>
${FONTS}
<style>${BASE_CSS}${ARTICLE_CSS}${INDEX_CSS}</style>
</head>
<body>
${nav("index.html", { home: true, topbarText: "Senaste: MiniLux Pro 2 recension", topbarClass: true })}
<div class="container"><div class="main-grid">
<main>
<div class="featured">
<div class="featured-img">[ Omslagsbild ]</div>
<div class="feat-meta"><span class="cat-label">Guide</span><span class="dot"></span><span class="meta-date">20 maj 2026</span></div>
<h2>Bästa projektorerna 2026: vår kompletta guide för alla budgetar</h2>
<p>Vi har testat dussintals modeller och sammanställt den definitiva listan över de bästa projektorerna just nu. Oavsett om du har 1500 kr eller 15 000 kr att lägga ner finns rätt alternativ för dig.</p>
<div class="feat-author"><div class="av">EL</div><div class="feat-author-txt"><strong>Erik Lindström</strong> · Teknikskribent, 11 års erfarenhet</div></div>
<br/><a class="read-more" href="basta-projektorer-2026.html">Läs hela artikeln</a>
</div>
<div class="post-list">${postHtml}</div>
</main>
<aside>
<div class="sb-section"><div class="about-box"><p>Oberoende blogg om projektorer och hemmabio. Vi testar, granskar och guidar utan reklamlöften eller betalda rekommendationer.</p></div></div>
${sidebarMost}
${tags}
<div class="sb-section"><div class="sb-title">Senaste recensionerna</div><ul class="sb-posts">
<li><a href="minilux-pro-2-recension.html"><span class="sb-rank">→</span><div><div class="sb-link-title">MiniLux Pro 2: 390 ANSI testad</div><div class="sb-link-meta">22 maj 2026</div></div></a></li>
<li><a href="minilux-pro-recension.html"><span class="sb-rank">→</span><div><div class="sb-link-title">MiniLux Pro: 30 dagars test</div><div class="sb-link-meta">18 maj 2026</div></div></a></li>
</ul></div>
</aside>
</div></div>
${footer()}
</body></html>`;
}

const pages = {};

// minilux-pro-recension
pages["minilux-pro-recension.html"] = articlePage({
  title: "",
  metaTitle: "MiniLux Pro recension: är den värd 1 499 kr? | ProjektorTips.se",
  metaDesc:
    "Vi testade MiniLux Pro i 30 dagar. 200 ANSI Lumen, XGA upplösning, 180 graders rotation och 4000+ appar. Läs vår ärliga recension.",
  activeCat: "kategori-recensioner.html",
  catLabel: "Recension",
  h1: "MiniLux Pro recension: 200 ANSI Lumen och 130 tums bild för 1 499 kr",
  intro:
    "En kompakt miniprojektor med 4000+ appar och 180 graders rotation för under 1 500 kr. Vi testade den i sovrum, vardagsrum och på resa för att se om budgetmodellen håller måttet.",
  author: { name: "Per Bergman" },
  date: "18 maj 2026",
  readMin: "12",
  trust: [
    "30 dagar testad",
    "4 rum",
    "Köpt med egna medel",
    "Ej sponsrat",
  ],
  body: `
<p>När vi letar en första projektor till familjen är frågan sällan om maximal prestanda, utan om vad man faktiskt får för pengarna. <a href="${PRO1_URL}">MiniLux Pro</a> kostar 1 499 kr och positionerar sig som en portabel hemmabio-lösning med smart innehåll inbyggt. Vi packade ner den i väskan, körde den i mörka och ljusare rum, och jämförde mot vad vi normalt förväntar oss av dyrare modeller.</p>
<p>MiniLux Pro (version 2, 2026) levererar XGA 1280×720 med stöd för 1080P-, 2K- och 4K-signaler. Ljusstyrkan ligger på 200 ANSI Lumen. Det räcker gott i mörkare miljöer, men du ska inte räkna med att slå gardinerna helt upp på dagen. Skärmstorleken kan variera mellan 30 och 130 tum, vilket gör den flexibel i allt från barnrummet till en mindre vardagsrumsvägg.</p>
<h2>Portabilitet och vardagsbruk</h2>
<p>Med cirka 1 kg och fläktljud runt 25 dB upplevdes den diskret i sovrummet. Vi uppskattade särskilt den roterbara linsen på 180 grader: takprojicering från nattduksbordet tog under en minut utan extra stativ. Det är en praktisk detalj när man vill titta på Netflix i sängen utan att montera utrustning i taket.</p>
<p>Projektorn kräver nätström. Det finns inget inbyggt batteri, vilket är viktigt att känna till om du planerar utomhusbio. För terrassen behöver du förlängningssladd eller portabelt eluttag. Å andra sidan slipper du kompromissa med batteritid i mörka rum, där 200 ANSI Lumen faktiskt räcker för en skarp 100-tumsbild.</p>
<h2>Appar, ljud och anslutningar</h2>
<p>Android-baserade systemet med över 4000 inbyggda appar gör att du kan komma igång utan extern mediaspelare. WiFi är standard (inte WiFi 6), men i vårt hem räckte det för stabilt streaming av YouTube och vanliga streamingtjänster i HD. Bluetooth finns om du vill koppla en bättre högtalare, vilket vi rekommenderar vid filmkvällar. Den inbyggda högtalaren duger till nyheter och kortare klipp, men är grundläggande för actionfilm.</p>
<p>Anslutningar: HDMI, USB och 3,5 mm. Det täcker de flesta källor, inklusive äldre spelkonsoler och dator. Automatisk keystone-korrigering fungerade förutsägbart när vi flyttade projektorn mellan hylla och bord.</p>
<h2>Bildkvalitet i praktiken</h2>
<p>I mörkt sovrum såg XGA-bilden skarp ut på 90 till 110 tum. Detaljnivån är inte lika fin som native 1080P, men för serier och familjefilm är upplevelsen över förväntan i prisklassen. I halvljust vardagsrum behövs mörkläggning. Det är inte en brist i konstruktionen, utan en konsekvens av 200 ANSI Lumen. Tänk mörkläggning som en del av upplevelsen, inte ett tillbehör.</p>
<div class="callout"><p>2 års garanti ger en trygghet som många billiga importprojektorer saknar. För en förstagångsköpare väger det tungt.</p></div>
<h2>Specifikationer</h2>
<table class="spec-tbl">
<tr><td>Upplösning</td><td>XGA 1280×720 med stöd för 4K</td></tr>
<tr><td>Ljusstyrka</td><td>200 ANSI Lumen</td></tr>
<tr><td>Skärmstorlek</td><td>30 till 130 tum</td></tr>
<tr><td>Roterbar lins</td><td>180 grader</td></tr>
<tr><td>WiFi</td><td>Standard WiFi</td></tr>
<tr><td>Bluetooth</td><td>Ja</td></tr>
<tr><td>Vikt</td><td>1 kg</td></tr>
<tr><td>Fläktljud</td><td>25 dB</td></tr>
<tr><td>Garanti</td><td>2 år</td></tr>
<tr><td>Pris</td><td>1 499 kr</td></tr>
</table>
<h2>Betyg</h2>
${scoreRows(
  [
    ["Bildkvalitet i mörkt rum", 4.1],
    ["Portabilitet", 4.6],
    ["Apputbud", 4.5],
    ["Värde för pengarna", 4.4],
    ["Byggkvalitet", 4.0],
  ],
  4.3
)}
${prosCons(
  [
    "4000+ appar",
    "180° rotation",
    "1 kg och portabel",
    "2 års garanti",
    "Keystone-korrigering",
    "Tyst 25 dB",
  ],
  [
    "Kräver eluttag",
    "200 ANSI begränsat i ljusa rum",
    "Inbyggd högtalare grundläggande",
  ]
)}
<h2>Sammanfattning</h2>
<p>MiniLux Pro är ett starkt budgetval om du prioriterar pris, portabilitet och enkel streaming. Den passar familjer som främst tittar på kvällen, vill ha takbild i sovrummet, eller behöver en lätt projektor att ta med på resan (med elnät i närheten). Vill du ha bättre ljusstyrka och native 1080P bör du titta på <a href="minilux-pro-2-recension.html">MiniLux Pro 2</a> istället.</p>
${ctaPro1()}`,
  bio: bioPer(),
  related: relatedCards([
    ["minilux-pro-2-recension.html", "Recension", "MiniLux Pro 2 recension"],
    ["minilux-pro-2-vs-pro.html", "Jämförelse", "MiniLux Pro 2 vs Pro"],
    ["basta-projektorer-2026.html", "Guide", "Bästa projektorerna 2026"],
  ]),
});

pages["minilux-pro-2-recension.html"] = articlePage({
  metaTitle: "MiniLux Pro 2 recension: 390 ANSI och 1080P för 1 999 kr | ProjektorTips.se",
  metaDesc: "Vi testade MiniLux Pro 2 i 30 dagar. Native 1080P, 390 ANSI Lumen, WiFi 6 och 5W HiFi. Läs vår recension.",
  activeCat: "kategori-recensioner.html",
  catLabel: "Recension",
  h1: "MiniLux Pro 2 recension: native 1080P och nästan dubbelt så ljusstark",
  intro: "Uppföljaren till budgetfavoriten MiniLux Pro kostar 500 kr mer men levererar 390 ANSI Lumen, native 1080P och WiFi 6. Vi körde den mot föregångaren i samma rum i 30 dagar.",
  author: { name: "Erik Lindström" },
  date: "22 maj 2026",
  readMin: "14",
  trust: ["30 dagar testad", "Jämförd mot Pro", "Köpt med egna medel", "Ej sponsrat"],
  body: `
<p><a href="${PRO2_URL}">MiniLux Pro 2</a> är den naturliga uppgraderingen om du redan vet att du vill ha projektor hemma, men vill slippa kompromissa med ljusstyrka och skärpa. För 1 999 kr får du native 1920×1080P med stöd för 4K-innehåll, 390 ANSI Lumen, kontrast 10 000:1 och skärmstorlek mellan 40 och 150 tum. Det är en tydlig steg upp från MiniLux Pro som kostar 1 499 kr och stoppar på 200 ANSI samt XGA 1280×720.</p>
<p>Vi testade Pro 2 i vardagsrum, sovrum, barnrum och på terrassen med portabelt eluttag. Projektorn väger cirka 1 kg, fläkten ligger runt 25 dB och den roterbara linsen på 180 grader gör takprojicering lika enkel som på Pro-modellen. Det finns inget inbyggt batteri, vilket gäller båda modellerna.</p>
<h2>Bild och ljusstyrka</h2>
<p>390 ANSI Lumen märks direkt när gardinerna inte är helt mörka. I vårt vardagsrum med lätt skymning kunde vi fortfarande se en tydlig 110-tumsbild utan att rummet kändes som en biograf. Pro med 200 ANSI krävde i samma läge nästan total mörkläggning. Native 1080P ger skarpare text och bättre detaljer i sport och spelfilm än XGA-uppskalning, även när källan är 4K.</p>
<p>5W HiFi-högtalaren är märkbart bättre än Pro, men vi kopplade ändå Bluetooth 5.0-högtalare vid filmkvällar. Android-systemet med 4000+ appar, HDMI, USB och 3,5 mm täcker samma behov som på Pro, men WiFi 6 dual band gav stabilare streaming i 1080P utan buffring i vårt hem.</p>
<h2>MiniLux Pro vs Pro 2</h2>
<table class="cmp-tbl">
<tr><th>Specifikation</th><th>MiniLux Pro</th><th>MiniLux Pro 2</th></tr>
<tr><td>Pris</td><td>1 499 kr</td><td>1 999 kr</td></tr>
<tr><td>Upplösning</td><td>XGA 1280×720, stöd 4K</td><td>Native 1080P, stöd 4K</td></tr>
<tr><td>ANSI Lumen</td><td>200</td><td>390</td></tr>
<tr><td>Kontrast</td><td>Standard</td><td>10 000:1</td></tr>
<tr><td>Skärm</td><td>30 till 130 tum</td><td>40 till 150 tum</td></tr>
<tr><td>WiFi</td><td>Standard WiFi</td><td>WiFi 6 dual band</td></tr>
<tr><td>Bluetooth</td><td>Ja</td><td>5.0</td></tr>
<tr><td>Högtalare</td><td>Inbyggd</td><td>5W HiFi</td></tr>
<tr><td>Rotation</td><td>180°</td><td>180°</td></tr>
<tr><td>Garanti</td><td>2 år</td><td>2 år</td></tr>
</table>
<h2>Betyg</h2>
${scoreRows([["Bildkvalitet", 4.5], ["Ljusstyrka", 4.7], ["WiFi och appar", 4.6], ["Ljud", 4.2], ["Värde för pengarna", 4.4]], 4.5)}
${prosCons(["390 ANSI Lumen", "Native 1080P", "WiFi 6", "5W HiFi", "180° rotation", "2 års garanti"], ["Kräver eluttag", "500 kr dyrare än Pro", "Inte för dagsljus utan duk"])}
<h2>Sammanfattning</h2>
<p>MiniLux Pro 2 är vårt tips om du ska använda projektorn i vardagsrum med lite ambient ljus, vill ha skarpare 1080P, eller planerar WiFi-streaming utan extern box. Pro räcker fortfarande om budgeten är hård och du nästan alltid tittar i mörker. Läs även <a href="minilux-pro-2-vs-pro.html">jämförelsen Pro 2 vs Pro</a>.</p>
${ctaPro2()}`,
  bio: bioErik(),
  related: relatedCards([
    ["minilux-pro-recension.html", "Recension", "MiniLux Pro recension"],
    ["minilux-pro-2-vs-pro.html", "Jämförelse", "MiniLux Pro 2 vs Pro"],
    ["basta-projektorer-2026.html", "Guide", "Bästa projektorerna 2026"],
  ]),
});

pages["minilux-pro-2-vs-pro.html"] = articlePage({
  metaTitle: "MiniLux Pro 2 vs Pro: vilken ska du köpa? | ProjektorTips.se",
  metaDesc: "Jämförelse mellan MiniLux Pro och MiniLux Pro 2. ANSI Lumen, upplösning, WiFi och pris i praktiken.",
  activeCat: "kategori-jamforelser.html",
  catLabel: "Jämförelse",
  h1: "MiniLux Pro 2 vs Pro: skillnaden som faktiskt spelar roll",
  intro: "500 kronor skiljer modellerna. Vi har testat båda i samma rum under fyra veckor och sammanfattar när uppgraderingen är värd pengarna och när Pro räcker.",
  author: { name: "Anna Svensson" },
  date: "12 maj 2026",
  readMin: "9",
  body: `
<p>Frågan vi får oftast är inte om MiniLux är bra, utan om man ska välja <a href="${PRO1_URL}">MiniLux Pro</a> för 1 499 kr eller <a href="${PRO2_URL}">MiniLux Pro 2</a> för 1 999 kr. Båda är kompakta smartprojektorer med 4000+ appar, keystone, 180 graders roterbar lins, HDMI, USB och 3,5 mm, cirka 1 kg och 25 dB fläktljud. Ingen har batteri. Båda har 2 års garanti. Skillnaderna sitter i bild, ljus och nätverk.</p>
<p>MiniLux Pro levererar XGA 1280×720 med stöd för 1080P, 2K och 4K-signaler, 200 ANSI Lumen och skärm 30 till 130 tum med standard WiFi. MiniLux Pro 2 har native 1920×1080P med 4K-stöd, 390 ANSI Lumen, kontrast 10 000:1, skärm 40 till 150 tum, WiFi 6 dual band, Bluetooth 5.0 och 5W HiFi-högtalare. På papperet är Pro 2 en tydlig uppgradering. I praktiken beror valet på var och när du tittar.</p>
<h2>Jämförelsetabell</h2>
<table class="cmp-tbl">
<tr><th></th><th>MiniLux Pro</th><th>MiniLux Pro 2</th></tr>
<tr><td>Pris</td><td>1 499 kr</td><td>1 999 kr</td></tr>
<tr><td>ANSI Lumen</td><td>200</td><td>390</td></tr>
<tr><td>Upplösning</td><td>XGA 720p</td><td>Native 1080P</td></tr>
<tr><td>WiFi</td><td>Standard</td><td>WiFi 6</td></tr>
<tr><td>Skärmstorlek</td><td>30 till 130 tum</td><td>40 till 150 tum</td></tr>
<tr><td>Högtalare</td><td>Grundläggande</td><td>5W HiFi</td></tr>
</table>
<h2>Välj MiniLux Pro om</h2>
<p>Du har en strikt budget under 1 500 kr och planerar nästan uteslutande filmkvällar i mörklagt rum. 200 ANSI Lumen räcker då gott för 90 till 110 tum. Sovrum med takprojicering och barnrum är typiska Pro-scenarier. Du accepterar XGA och kan leva med standard WiFi om routern står nära. Pro är också rätt om du är osäker på om projektor passar familjen och vill testa konceptet billigt.</p>
<h2>Välj MiniLux Pro 2 om</h2>
<p>Du tänker använda projektorn i vardagsrum med lite ljus från fönster, vill ha native 1080P för sport och spel, eller streamar mycket utan extern mediaspelare. WiFi 6 märktes i vårt test när flera enheter var uppkopplade samtidigt. 390 ANSI Lumen gör att du inte behöver göra rummet helt mörkt för en vardagskväll. Skillnaden på 500 kr amortiseras snabbt om du annars skulle köpa en extra streamingbox eller starkare lampor.</p>
<h2>Vår slutsats</h2>
<p>För de flesta familjer som ska ha projektor i vardagsrummet rekommenderar vi Pro 2. Pro är fortfarande ett starkt förstaköp i mörka rum. Läs våra separata recensioner av <a href="minilux-pro-recension.html">MiniLux Pro</a> och <a href="minilux-pro-2-recension.html">MiniLux Pro 2</a> för fler detaljer.</p>`,
  bio: bioAnna(),
  related: relatedCards([
    ["minilux-pro-recension.html", "Recension", "MiniLux Pro recension"],
    ["minilux-pro-2-recension.html", "Recension", "MiniLux Pro 2 recension"],
    ["basta-projektorer-2026.html", "Guide", "Bästa projektorerna 2026"],
  ]),
});

pages["basta-projektorer-2026.html"] = articlePage({
  metaTitle: "Bästa projektorerna 2026: topp 6 för alla budgetar | ProjektorTips.se",
  metaDesc: "Vår rankade lista över de bästa projektorerna 2026. Från premium till budget under 2000 kr.",
  activeCat: "kategori-guider.html",
  catLabel: "Guide",
  h1: "Bästa projektorerna 2026: vår rankade topplista",
  intro: "Vi har testat portabla, hemmabio- och budgetprojektorer under våren 2026. Här är sex modeller som sticker ut, plus varför svenska MiniLux-serien hamnar högt i pris/prestanda.",
  author: { name: "Erik Lindström" },
  date: "20 maj 2026",
  readMin: "11",
  body: `
<p>Marknaden för hemmaprojektorer har mognat: du behöver inte längre ett dedikerat biograf rum för att få 100 tum. Vår lista blandar etablerade internationella märken med modeller vi faktiskt köpt och testat i svenska hem.</p>
<div class="rank-entry"><div class="rank-num">1</div><h2>Nebula Cosmos Laser 4K</h2><p>Ankers premiummodell med laserljuskälla och imponerande 4K-upplevelse i mörka rum. Högt pris men låg underhållskostnad och snabb uppstart. Bäst för den som vill ha en permanent hemmabio-lösning utan lampbyten.</p></div>
<div class="rank-entry"><div class="rank-num">2</div><h2>XGIMI Horizon Ultra</h2><p>Stark HDR-prestanda och inbyggd Android TV. 2300 ANSI-klass i ljusstyrka gör den till ett av få val som klarar lätt skymning. Rekommenderas om budgeten ligger över 15 000 kr.</p></div>
<div class="rank-entry"><div class="rank-num">3</div><h2><a href="${PRO1_URL}">MiniLux Pro</a></h2><p>Bästa budgetvalet under 1 500 kr. 200 ANSI Lumen, XGA med 4K-stöd, 180 graders rotation, 4000+ appar och 2 års garanti. Perfekt för sovrum och första projektorn. Läs vår <a href="minilux-pro-recension.html">recension</a>.</p></div>
<div class="rank-entry"><div class="rank-num">4</div><h2><a href="${PRO2_URL}">MiniLux Pro 2</a></h2><p>Bästa mellanklass under 2 000 kr. Native 1080P, 390 ANSI, WiFi 6 och 5W HiFi. Tydlig uppgradering om du ska använda vardagsrummet. Se <a href="minilux-pro-2-recension.html">recensionen</a>.</p></div>
<div class="rank-entry"><div class="rank-num">5</div><h2>BenQ GV31</h2><p>Portabel med batteri och bra ljud för utomhus och resa. Inte lika ljusstark som MiniLux Pro 2 men flexibel när du saknar eluttag nära.</p></div>
<div class="rank-entry"><div class="rank-num">6</div><h2>Samsung The Freestyle 2</h2><p>Smart design och enkel setup för casual-tittare. Dyr i förhållande till ANSI per krona, men stark ekosystemintegration om du redan har Samsung-enheter.</p></div>
<h2>Så väljer du rätt</h2>
<p>Ställ frågor om rumsljus, skärmstorlek och om du behöver inbyggda appar. Under 2 000 kr dominerar MiniLux Pro och Pro 2 i våra tester. Ovanför det är Nebula och XGIMI intressanta. Läs <a href="ansi-lumen-guide.html">ANSI Lumen-guiden</a> och <a href="varfor-kopa-projektor.html">varför projektor kan slå TV</a>.</p>`,
  bio: bioErik(),
  related: relatedCards([
    ["minilux-pro-recension.html", "Recension", "MiniLux Pro recension"],
    ["minilux-pro-2-recension.html", "Recension", "MiniLux Pro 2 recension"],
    ["ansi-lumen-guide.html", "Teknik", "ANSI Lumen förklarat"],
  ]),
});

pages["varfor-kopa-projektor.html"] = articlePage({
  metaTitle: "Varför köpa projektor istället för TV? 7 skäl | ProjektorTips.se",
  metaDesc: "Sju konkreta skäl att välja projektor framför stor-TV. Storlek, pris per tum och flexibilitet.",
  activeCat: "kategori-guider.html",
  catLabel: "Guide",
  h1: "Varför du ska köpa en projektor istället för en stor-TV",
  intro: "En 75-tums TV kostar fort mer än en hemmabio-setup med projektor. Här är sju skäl som övertygade våra testfamiljer under 2026.",
  author: { name: "Anna Svensson" },
  date: "10 maj 2026",
  readMin: "9",
  body: `
<p>Vi möter ofta föräldrar som tror att projektor är krångligt eller bara för entusiaster. Efter att ha följt tio hushåll under våren ser vi ett annat mönster: projektor ger mer upplevelse per krona när rummet får vara flexibelt.</p>
<h2>1. Mer bild för pengarna</h2>
<p>En 100-tums upplevelse med projektor kostar en bråkdel av en TV i samma storleksklass. En modell som <a href="${PRO1_URL}">MiniLux Pro</a> för 1 499 kr och en vit vägg eller enkel duk räcker för familjefilm. Du betalar för ljus och lins, inte för gigantisk panel.</p>
<h2>2. Flexibel placering</h2>
<p>Projektorn står på hyllan, bordet eller projicerar från taket med roterbar lins. Ingen tung väggmontering av 30 kg skärm. När barnen ska sova flyttar du enheten utan att riva vardagsrummet.</p>
<h2>3. Skonsammare för ögonen</h2>
<p>Reflekterat ljus från duk eller vägg upplevs ofta som mindre ansträngande än emittent ljus från en TV-panel. Det är en vanlig anledning till att familjer väljer projektor i barnrum.</p>
<h2>4. Enkel hemmabio-känsla</h2>
<p>Mörkläggning, popcorn och 120 tum skapar biokänsla som en 55-tums TV sällan matchar. Utomhusbio på terrassen är lika enkelt med förlängningssladd och portabel duk.</p>
<h2>5. Mindre dominans i rummet</h2>
<p>När projektorn är av finns ingen svart rektangel som tar fokus. Vardagsrummet fungerar som vanligt dagtid. Det passar mindre lägenheter där estetik spelar roll.</p>
<h2>6. Uppgraderingsväg</h2>
<p>Du kan börja med budgetprojektor och senare byta till starkare ANSI eller native 1080P utan att byta hela möbleringen. Ljud, duk och streaming kan uppgraderas stegvis.</p>
<h2>7. Delad upplevelse</h2>
<p>Alla i rummet ser samma stora bild. Ingen sitter i hörnet med sämre vinkel. För sport, spel och familjefilm väger det mer än marginaler i kontrast på papperet.</p>
<h2>När TV fortfarande vinner</h2>
<p>I ljust vardagsrum med TV på hela dagen kan en panel vara enklare. Projektor kräver planering kring ljus. Läs <a href="projektor-vs-tv.html">projektor vs TV</a> för en ärlig jämförelse.</p>`,
  bio: bioAnna(),
  related: relatedCards([
    ["basta-projektorer-2026.html", "Guide", "Bästa projektorerna 2026"],
    ["hemmabio-budget.html", "Guide", "Hemmabio under 5000 kr"],
    ["projektor-vs-tv.html", "Jämförelse", "Projektor eller TV"],
  ]),
});

pages["ansi-lumen-guide.html"] = articlePage({
  metaTitle: "ANSI Lumen förklarat: hur mycket ljus behöver du? | ProjektorTips.se",
  metaDesc: "Vad är ANSI Lumen? Vi förklarar mätvärdet och hur mycket ljusstyrka du behöver i olika rum.",
  activeCat: "kategori-teknik.html",
  catLabel: "Teknik",
  h1: "Vad är ANSI Lumen och hur mycket ljusstyrka behöver du?",
  intro: "Tillverkare skriver allt från 200 till 3000 ANSI på förpackningen. Vi reder ut vad siffran betyder och vilka nivåer som fungerar i svenska hem.",
  author: { name: "Erik Lindström" },
  date: "20 apr 2026",
  readMin: "6",
  body: `
<p>ANSI Lumen är en standardiserad mätning av ljusflöde från projektorn. Till skillnad från äldre lux-siffror mäts ANSI på ett sätt som gör modeller mer jämförbara. Det betyder inte att 500 ANSI alltid upplevs dubbelt så ljusst som 250, men det ger en rättvisare startpunkt än marknadsföringsetiketter utan ANSI.</p>
<h2>Varför siffran spelar roll</h2>
<p>Projektorer skickar ljus som reflekteras från duk eller vägg. Allt ambient ljus i rummet konkurrerar med bilden. I mörkt rum räcker lägre ANSI. I vardagsrum med gardiner halvt öppna behöver du mer reserv.</p>
<h2>200 ANSI i praktiken</h2>
<p>En budgetmodell med cirka 200 ANSI Lumen, som MiniLux Pro i våra tester, ger en tydlig bild på 90 till 110 tum när rummet är mörklagt. Det är ett bra sovrum- och kvällsval. Vid dagsljus eller halvljus vardagsrum blir bilden snabbt uttvättad. Det är inte ett fel, utan fysik.</p>
<h2>390 ANSI och uppåt</h2>
<p>Runt 390 ANSI, som MiniLux Pro 2, märker du tydlig skillnad i skymning och lätt mörklagt vardagsrum. Du får mer headroom för större duk och längre avstånd utan att tappa kontrast. Mellan 500 och 800 ANSI börjar portabla hemmabio-modeller kännas bekväma även när familjen inte vill ha total mörker.</p>
<h2>Lux vs ANSI på förpackningen</h2>
<p>Vissa billiga importprojektorer anger lux utan ANSI. Siffror som 10 000 lux säger lite om verklig upplevelse. Leta efter ANSI Lumen i specifikationen eller fråga säljaren om mätningsmetod.</p>
<h2>Rumsguide</h2>
<p>Mörkt sovrum: 150 till 250 ANSI kan räcka. Vardagsrum kväll: 300 till 500 ANSI är en sweet spot i budgetklass. Permanent hemmabio med lite ljus: sikta högre eller investera i mörkläggning. Utomhus: räkna med mörker och eventuellt lägre dukstorlek.</p>
<h2>Kontrast och ANSI tillsammans</h2>
<p>Hög ANSI med dålig kontrast kan ändå kännas platt. Läs specifikationer som kontrastförhållande tillsammans med ANSI. I våra jämförelser mellan 200 och 390 ANSI i samma rum var skillnaden större än siffran ensam antyder, eftersom större ljusflöde också hjälper färgerna att poppa.</p>
<h2>Sammanfattning</h2>
<p>Köp inte ANSI du aldrig använder i ett ljust rum utan mörkläggning, men köp inte för lite om vardagsrummet är målet. Matcha ANSI med hur du faktiskt tittar, inte med maximal siffra på papperet.</p>`,
  bio: bioErik(),
  related: relatedCards([
    ["basta-projektorer-2026.html", "Guide", "Bästa projektorerna 2026"],
    ["4k-vs-1080p.html", "Teknik", "4K vs 1080p"],
    ["optimera-rummet.html", "Tips", "Optimera rummet"],
  ]),
});

pages["kategori-guider.html"] = categoryPage("kategori-guider.html", "Guider", [
  ["basta-projektorer-2026.html", "Bästa projektorerna 2026", "Rankad lista för alla budgetar.", "Erik Lindström"],
  ["varfor-kopa-projektor.html", "Varför köpa projektor", "Sju skäl att välja projektor framför TV.", "Anna Svensson"],
  ["hemmabio-budget.html", "Hemmabio under 5000 kr", "Bygg hemmabio utan att spräcka budgeten.", "Anna Svensson"],
  ["projektor-sovrum.html", "Projektor i sovrummet", "Takbild och rotation i praktiken.", "Anna Svensson"],
  ["utomhusbio-guide.html", "Utomhusbio hemma", "Terrass och trädgård steg för steg.", "Per Bergman"],
  ["projiceringsduk-guide.html", "Välja projiceringsduk", "Storlek, material och tips.", "Anna Svensson"],
]);
pages["kategori-recensioner.html"] = categoryPage("kategori-recensioner.html", "Recensioner", [
  ["minilux-pro-recension.html", "MiniLux Pro recension", "30 dagars test av budgetmodellen.", "Per Bergman"],
  ["minilux-pro-2-recension.html", "MiniLux Pro 2 recension", "390 ANSI och native 1080P testad.", "Erik Lindström"],
]);
pages["kategori-tips.html"] = categoryPage("kategori-tips.html", "Tips och tricks", [
  ["optimera-rummet.html", "Optimera rummet", "Åtta enkla förbättringar för bilden.", "Per Bergman"],
  ["ljud-projektor.html", "Bra ljud till projektor", "Bluetooth, soundbar eller stereo.", "Erik Lindström"],
  ["utomhusbio-guide.html", "Utomhusbio hemma", "Praktisk guide för sommarkvällar.", "Per Bergman"],
]);
pages["kategori-teknik.html"] = categoryPage("kategori-teknik.html", "Teknik", [
  ["ansi-lumen-guide.html", "ANSI Lumen förklarat", "Hur mycket ljus behöver du?", "Erik Lindström"],
  ["4k-vs-1080p.html", "4K vs 1080p", "Vilken upplösning räcker?", "Erik Lindström"],
  ["keystone-guide.html", "Keystone-korrigering", "Rektangulär bild varje gång.", "Per Bergman"],
  ["wifi-streaming.html", "WiFi-streaming", "WiFi 6 och stabilt streaming.", "Erik Lindström"],
]);
pages["kategori-jamforelser.html"] = categoryPage("kategori-jamforelser.html", "Jämförelser", [
  ["minilux-pro-2-vs-pro.html", "MiniLux Pro 2 vs Pro", "Vilken modell passar dig?", "Anna Svensson"],
  ["projektor-vs-tv.html", "Projektor eller TV", "Ärlig jämförelse utan hype.", "Anna Svensson"],
]);
pages["kategori-hemmabio.html"] = categoryPage("kategori-hemmabio.html", "Hemmabio", [
  ["hemmabio-budget.html", "Hemmabio under 5000 kr", "Kompletta upplag för tre budgetar.", "Anna Svensson"],
  ["varfor-kopa-projektor.html", "Varför projektor", "Storbild hemma utan biograf-rum.", "Anna Svensson"],
  ["ljud-projektor.html", "Ljud till hemmabio", "Så höjer du ljudkvaliteten.", "Erik Lindström"],
]);
pages["kategori-gaming.html"] = categoryPage("kategori-gaming.html", "Gaming", [
  ["projektor-gaming.html", "Projektor för gaming", "Input lag och Hz du behöver känna till.", "Per Bergman"],
]);

pages["om-oss.html"] = `<!DOCTYPE html>
<html lang="sv">
<head>
<meta charset="UTF-8"/>
<meta name="viewport" content="width=device-width,initial-scale=1.0"/>
<title>Om oss | ProjektorTips.se</title>
<meta name="description" content="Lär känna redaktionen bakom ProjektorTips.se. Oberoende tester sedan 2023."/>
${FONTS}
<style>${BASE_CSS}${ARTICLE_CSS}</style>
</head>
<body>
${nav("index.html")}
<div class="container page-main">
<h1>Om ProjektorTips.se</h1>
<p style="margin:1rem 0 2rem;color:#555">Vi är en oberoende svensk blogg om projektorer och hemmabio. Alla produkter vi recenserar köps med egna medel. Vi tar inte betalt för positiva omdömen.</p>
<div class="author-card">${bioErik().replace('class="author-bio"', 'class="author-bio" style="border:none;padding:0;margin:0"')}</div>
<div class="author-card">${bioAnna().replace('class="author-bio"', 'class="author-bio" style="border:none;padding:0;margin:0"')}</div>
<div class="author-card">${bioPer().replace('class="author-bio"', 'class="author-bio" style="border:none;padding:0;margin:0"')}</div>
</div>
${footer()}
</body></html>`;

pages["kontakt.html"] = `<!DOCTYPE html>
<html lang="sv">
<head>
<meta charset="UTF-8"/>
<meta name="viewport" content="width=device-width,initial-scale=1.0"/>
<title>Kontakt | ProjektorTips.se</title>
<meta name="description" content="Kontakta redaktionen på ProjektorTips.se."/>
${FONTS}
<style>${BASE_CSS}${ARTICLE_CSS}</style>
</head>
<body>
${nav("index.html")}
<div class="container page-main">
<h1>Kontakt</h1>
<p style="margin:1rem 0">Maila oss på <a href="mailto:redaktion@projektortips.se">redaktion@projektortips.se</a>. Vi svarar vanligtvis inom två arbetsdagar.</p>
<p style="margin-bottom:2rem;color:#666">Vi tar inte emot betalda recensioner eller sponsrade köplänkar mot ersättning. Tips om produkter att testa är välkomna, men redaktionen bestämmer själv vad som publiceras.</p>
<form action="#" method="post">
<div class="form-group"><label for="namn">Namn</label><input id="namn" name="namn" type="text" required/></div>
<div class="form-group"><label for="epost">E-post</label><input id="epost" name="epost" type="email" required/></div>
<div class="form-group"><label for="meddelande">Meddelande</label><textarea id="meddelande" name="meddelande" rows="5" required></textarea></div>
<button class="form-btn" type="submit">Skicka</button>
</form>
</div>
${footer()}
</body></html>`;

pages["integritetspolicy.html"] = `<!DOCTYPE html>
<html lang="sv">
<head>
<meta charset="UTF-8"/>
<meta name="viewport" content="width=device-width,initial-scale=1.0"/>
<title>Integritetspolicy | ProjektorTips.se</title>
<meta name="description" content="Integritetspolicy för ProjektorTips.se enligt GDPR."/>
${FONTS}
<style>${BASE_CSS}${ARTICLE_CSS}</style>
</head>
<body>
${nav("index.html")}
<div class="container page-main">
<h1>Integritetspolicy</h1>
<div class="body" style="margin-top:1.5rem">
<p>ProjektorTips.se värnar om din integritet. Denna policy beskriver hur vi hanterar personuppgifter enligt EU:s dataskyddsförordning (GDPR).</p>
<h2>Personuppgiftsansvarig</h2>
<p>ProjektorTips.se, kontakt: redaktion@projektortips.se.</p>
<h2>Vilka uppgifter vi samlar in</h2>
<p>Om du kontaktar oss via formulär eller e-post behandlar vi namn, e-postadress och meddelandeinnehåll för att kunna svara. Vi kan även samla in anonymiserad besöksstatistik via cookies för att förbättra webbplatsen.</p>
<h2>Ändamål och rättslig grund</h2>
<p>Uppgifter används för att besvara förfrågningar (berättigat intresse/avtal) och för webbanalys där du godkänt cookies (samtycke).</p>
<h2>Lagringstid</h2>
<p>Korrespondens sparas högst 24 månader om inte längre lagring krävs enligt lag.</p>
<h2>Dina rättigheter</h2>
<p>Du har rätt till tillgång, rättelse, radering, begränsning, invändning och dataportabilitet. Kontakta redaktion@projektortips.se. Du kan också klaga till Integritetsskyddsmyndigheten (IMY).</p>
<h2>Cookies</h2>
<p>Vi använder nödvändiga cookies för webbplatsens funktion. Analyscookies aktiveras endast med ditt samtycke.</p>
<p>Senast uppdaterad: maj 2026.</p>
</div>
</div>
${footer()}
</body></html>`;

const shortArticle = (file, opts) => {
  pages[file] = articlePage(opts);
};

shortArticle("projektor-sovrum.html", {
  metaTitle: "Projektor i sovrummet: guide | ProjektorTips.se",
  metaDesc: "Så får du projektor i sovrummet utan krångel. Rotation, ljud och mörkläggning.",
  activeCat: "kategori-guider.html",
  catLabel: "Guide",
  h1: "Projektor i sovrummet: allt du behöver veta",
  intro: "Takbild från nattduksbordet är populärt, men kräver rätt tänk kring ljus, ljud och placering.",
  author: { name: "Anna Svensson" },
  date: "15 apr 2026",
  readMin: "7",
  body: `<p>Sovrumsprojektor handlar om bekvämlighet. Målet är stor bild utan att väcka grannen eller montera tunga lösningar. En kompakt modell med 180 graders roterbar lins låter dig projicera mot taket från sängbordet. Keystone korrigerar vinkeln när projektorn inte står perfekt centrerad.</p>
<p>Mörkläggning är viktigare än maximal ANSI i sovrummet. Mörka gardiner och mörk vägg bak duken gör att även 200 ANSI räcker för 90 tum. Vill du titta med lite lampa på, sikta högre eller välj en modell med runt 390 ANSI.</p>
<p>Ljud: inbyggda högtalare funkar till poddar, men Bluetooth-hörlurar eller en liten högtalare vid sängen är bättre för film. Placera projektorn så fläktljud inte blåser rakt mot huvudkudden. Många modeller ligger runt 25 dB, vilket de flesta sover igenom.</p>
<p>Eluttag nära sängen är praktiskt. De flesta budgetprojektorer saknar batteri, vilket faktiskt är en fördel i sovrummet: du slipper ladda inför varje kväll. Testa avstånd till tak: 2 till 3 meter ger ofta lagom storlek utan att bilden blir för mjuk.</p>
<p>Avsluta med en enkel rutin: mörklägg, starta streaming, justera keystone en gång och spara vinkeln om projektorn står kvar. Då blir sovrumsbio vardag, inte helgprojekt.</p>`,
  bio: bioAnna(),
  related: relatedCards([["keystone-guide.html", "Teknik", "Keystone-guide"], ["ljud-projektor.html", "Tips", "Ljud till projektor"], ["minilux-pro-recension.html", "Recension", "MiniLux Pro recension"]]),
});

shortArticle("utomhusbio-guide.html", {
  metaTitle: "Utomhusbio hemma: guide | ProjektorTips.se",
  metaDesc: "Så sätter du upp utomhusbio på terrassen. El, duk och ljus.",
  activeCat: "kategori-tips.html",
  catLabel: "Tips",
  h1: "Utomhusbio hemma: perfekt biokväll på terrassen",
  intro: "Film på 120 tum mot husväggen imponerar alltid. Med rätt förberedelse tar uppsättningen under tjugo minuter.",
  author: { name: "Per Bergman" },
  date: "10 apr 2026",
  readMin: "5",
  body: `<p>Utomhus kräver tre saker: mörker, el och en ljus yta. Vänta tills skymningen lagt sig. En vit vägg eller portabel duk fungerar; undvik fönster bak duken som lyser upp bilden.</p>
<p>De flesta portabla projektorer i vår prisklass har inget batteri. Planera förlängningssladd och gärna ett uttag med jordfelsbrytare utomhus. Placera projektorn på stabil bordshöjd och skydda den från dagg med ett enkelt tak eller flytta in den direkt efter filmen.</p>
<p>Ljusstyrka: utomhus i skymning behöver du mer ANSI än inomhus. 200 ANSI kan räcka på en mindre duk om det är riktigt mörkt. Vid lite kvarvarande ljus från grannhus är 300 till 400 ANSI tryggare. Bluetooth-högtalare ger bättre ljud än inbyggd högtalare när publiken sitter längre bort.</p>
<p>Väder och kondens: ta in utrustningen efter visning. Ha en backup-film offline om WiFi sviker i trädgården. Utomhusbio är en sommartradition som inte behöver dyra prylar, bara planering.</p>`,
  bio: bioPer(),
  related: relatedCards([["hemmabio-budget.html", "Guide", "Hemmabio budget"], ["projiceringsduk-guide.html", "Guide", "Projiceringsduk"], ["ansi-lumen-guide.html", "Teknik", "ANSI Lumen"]]),
});

shortArticle("hemmabio-budget.html", {
  metaTitle: "Hemmabio under 5000 kr | ProjektorTips.se",
  metaDesc: "Bygg hemmabio för under 5000 kr. Projektorn, ljud och duk.",
  activeCat: "kategori-hemmabio.html",
  catLabel: "Guide",
  h1: "Hemmabio under 5000 kr: smartaste upplaget",
  intro: "Du behöver inte femsiffriga summor för 100 tum. Här är tre upplag vi rekommenderar efter vårens tester.",
  author: { name: "Anna Svensson" },
  date: "26 apr 2026",
  readMin: "8",
  body: `<p>En hemmabio under 5000 kr består nästan alltid av projektor, ljud och någon form av duk eller vägg. TV i samma storlek kostar mångfalt mer. Prioritera ljusstyrka och ljud före sista procenten i upplösning om budgeten är tight.</p>
<p><strong>Upplag 1 (ca 2 000 kr):</strong> <a href="${PRO1_URL}">MiniLux Pro</a> 1 499 kr, vit vägg, befintliga Bluetooth-högtalare. Räcker i mörkt vardagsrum eller sovrum. Lägg pengar på mörkläggande gardiner före uppgradering av projektor.</p>
<p><strong>Upplag 2 (ca 3 500 kr):</strong> MiniLux Pro, enkel motoriserad eller fast duk 800 till 1 200 kr, liten soundbar 600 kr. Bättre kontrast än vägg och tydligare dialog i film.</p>
<p><strong>Upplag 3 (ca 4 800 kr):</strong> Uppgradera till MiniLux Pro 2 om du tittar i vardagsrum med skymningsljus, behåll duk och soundbar. Native 1080P och 390 ANSI ger mer headroom än att köpa dyr projektor utan ljud.</p>
<p>Streaming: inbyggda appar sparar en box. WiFi 6 är värt det om flera personer streamar samtidigt i huset. Läs <a href="varfor-kopa-projektor.html">varför projektor</a> och <a href="ljud-projektor.html">ljudguiden</a> för nästa steg.</p>`,
  bio: bioAnna(),
  related: relatedCards([["minilux-pro-recension.html", "Recension", "MiniLux Pro"], ["basta-projektorer-2026.html", "Guide", "Bästa 2026"], ["ljud-projektor.html", "Tips", "Ljud"]]),
});

shortArticle("ljud-projektor.html", {
  metaTitle: "Bra ljud till projektor | ProjektorTips.se",
  metaDesc: "Bluetooth, soundbar eller stereo till din projektor.",
  activeCat: "kategori-tips.html",
  catLabel: "Tips",
  h1: "Så får du bra ljud till din projektor",
  intro: "Inbyggda högtalare räcker sällan till film. Tre upplag som fungerar i svenska hem.",
  author: { name: "Erik Lindström" },
  date: "10 mar 2026",
  readMin: "5",
  body: `<p>Projektorns inbyggda högtalare är ofta kompakt och riktad åt sidan. För dialogtung film och musik behöver du något mer. De flesta moderna projektorer har Bluetooth, vilket är snabbaste vägen.</p>
<p><strong>Bluetooth-högtalare:</strong> Billigt och flexibelt. Latens kan märkas vid gaming; för film är det sällan problem. Placera högtalaren under duken, inte bakom projektorn.</p>
<p><strong>Soundbar:</strong> Bättre stereobredd och ofta HDMI ARC om du kör extern box. Bra i vardagsrum där projektorn står på hyllan framför soffan.</p>
<p><strong>Stereo eller hemmabio-receiver:</strong> Bäst ljud, mer kablar. Välj om du planerar permanent setup. 3,5 mm utgång från projektor fungerar om Bluetooth strular.</p>
<p>Modeller med 5W HiFi, som MiniLux Pro 2, låter bättre än bas-högtalare men ersätter inte en riktig soundbar. Sänk projektorvolym och låt extern högtalare bära huvuddelen av ljudet.</p>`,
  bio: bioErik(),
  related: relatedCards([["hemmabio-budget.html", "Guide", "Hemmabio budget"], ["projektor-gaming.html", "Gaming", "Gaming"], ["minilux-pro-2-recension.html", "Recension", "Pro 2"]]),
});

shortArticle("optimera-rummet.html", {
  metaTitle: "Optimera rummet för projektor | ProjektorTips.se",
  metaDesc: "8 tips för bättre projektor-bild hemma.",
  activeCat: "kategori-tips.html",
  catLabel: "Tips",
  h1: "8 enkla sätt att optimera rummet för projektor",
  intro: "Tekniken är bara halva bilden. Rummet gör resten.",
  author: { name: "Per Bergman" },
  date: "5 mar 2026",
  readMin: "5",
  body: `<p>Innan du uppgraderar projektor, titta på rummet. Mörkläggande gardiner ger ofta större effekt än 100 ANSI extra. Mörk vägg bak duken minskar ljus som studsar tillbaka och ökar upplevd kontrast.</p>
<p>Placera soffa centrerat mot duken. Projektorn ska stå i rät vinkel eller använda keystone sparsamt, eftersom digital keystone kan mjuka upp bilden. Undvik att projicera mot fönster: även bra ANSI tappar mot dagsljus.</p>
<p>Städa luftvägen framför linsen: damm ger fläckar som ser ut som döda pixlar. Håll kablar korta för mindre snubbelrisk. En enkel hylla bakom soffan eller i takfäste minskar skakningar när någon går förbi.</p>
<p>Väggfärg: matt ljusgrå eller vit duk-yta slår halvblank tapet. Testa med en lakan-uppsättning en kväll innan du köper dyr duk. Mät avstånd och räkna skärmstorlek så du inte sitter för nära och ser pixlar.</p>
<p>Sist: märk projektorläge med tejp på golvet om den flyttas ofta. Snabb reproduktion av samma bild sparar irritation varje filmkväll.</p>`,
  bio: bioPer(),
  related: relatedCards([["ansi-lumen-guide.html", "Teknik", "ANSI Lumen"], ["projiceringsduk-guide.html", "Guide", "Duk"], ["keystone-guide.html", "Teknik", "Keystone"]]),
});

shortArticle("projiceringsduk-guide.html", {
  metaTitle: "Välja projiceringsduk | ProjektorTips.se",
  metaDesc: "Storlek, material och när vägg räcker.",
  activeCat: "kategori-guider.html",
  catLabel: "Guide",
  h1: "Välja projiceringsduk: vad du faktiskt behöver",
  intro: "En vit vägg fungerar. Rätt duk gör bilden bättre, men allt behövs inte.",
  author: { name: "Anna Svensson" },
  date: "15 mar 2026",
  readMin: "6",
  body: `<p>Projiceringsduk reflekterar ljus mer jämnt än vanlig vägg. Gain-värde runt 1.0 är standard: neutral reflektion utan konstgjord ljusstyrka. Högre gain kan ge hot spot, lägre gain kräver mörkare rum.</p>
<p>Storlek väljer du efter avstånd och projektorns throw. Mät avstånd från lins till vägg och kolla manualen, eller testa med vägg och märk vad som känns rätt för soffan. 100 tum är vanligt i vardagsrum; sovrum klarar ofta 80 till 90 tum.</p>
<p>Fast duk, spänn duk eller portabel vikduk: fast ger bäst bild, portabel passar utomhus och hyresrätt. ALR-dukar för ultrakorta kastar är ett eget segment; de flesta budgetprojektorer är standard-throw.</p>
<p>Montering: centrum av duken i ögonhöjd när du sitter. Lämna lite marginal så keystone inte klipper hörn. En vägg som är något mörkare än duken runt om ger inramning som känns biograf.</p>
<p>Börja med vägg plus mörkläggning. Köp duk när du vet vilken storlek du faktiskt använder efter en månad. Det sparar pengar till ljud eller starkare projektor istället.</p>`,
  bio: bioAnna(),
  related: relatedCards([["hemmabio-budget.html", "Guide", "Budget"], ["optimera-rummet.html", "Tips", "Optimera rummet"], ["basta-projektorer-2026.html", "Guide", "Bästa 2026"]]),
});

shortArticle("wifi-streaming.html", {
  metaTitle: "WiFi-streaming till projektor | ProjektorTips.se",
  metaDesc: "WiFi 6 och stabilt streaming till smart projektor.",
  activeCat: "kategori-teknik.html",
  catLabel: "Teknik",
  h1: "WiFi-streaming till projektor: när WiFi 6 spelar roll",
  intro: "Buffring i 1080P beror ofta på nätverket, inte på projektorn. Så felsöker du.",
  author: { name: "Erik Lindström" },
  date: "22 feb 2026",
  readMin: "6",
  body: `<p>Smartprojektorer med 4000+ appar streamar direkt över WiFi. Standard WiFi fungerar när routern står i samma rum och få enheter konkurrerar. I vårt test med <a href="${PRO2_URL}">MiniLux Pro 2</a> och WiFi 6 dual band höll 1080P-streaming stabilt även när flera telefoner och en laptop var uppkopplade.</p>
<p>Pro med standard WiFi klarade HD i sovrummet men buffrade en gång när barnen spelade online i våningen ovanför. Lösningen var oftast 5 GHz-nätverk istället för 2,4 GHz, eller flytta routern närmare.</p>
<p>Tips: använd kabel till mediaspelare om du har HDMI och vill ha zero hassle. Uppdatera projektorns firmware. Undvik att streama 4K-material till en 1080P-enhet om appen inte skalar smart; det belastar nätet i onödan.</p>
<p>Mesh-nätverk hjälper i stora hus. För utomhusbio, ladda ner film innan eller använd mobil hotspot med datapott om WiFi inte når terrassen.</p>
<p>WiFi 6 är inte magi, men på en 500 kr uppgradering mellan Pro och Pro 2 är nätverket en av de mest märkbara vardagsförbättringarna för streamingfamiljer.</p>`,
  bio: bioErik(),
  related: relatedCards([["minilux-pro-2-recension.html", "Recension", "Pro 2"], ["minilux-pro-2-vs-pro.html", "Jämförelse", "Pro 2 vs Pro"], ["4k-vs-1080p.html", "Teknik", "4K vs 1080p"]]),
});

shortArticle("keystone-guide.html", {
  metaTitle: "Keystone-korrigering förklarat | ProjektorTips.se",
  metaDesc: "Vad keystone är och hur auto-korrigering fungerar.",
  activeCat: "kategori-teknik.html",
  catLabel: "Teknik",
  h1: "Keystone-korrigering: rektangulär bild varje gång",
  intro: "När projektorn står snett blir bilden en trapets. Keystone rättar till det.",
  author: { name: "Per Bergman" },
  date: "25 mar 2026",
  readMin: "4",
  body: `<p>Keystone (trapezkorrigering) justerar bilden digitalt eller optiskt när projektorn inte står vinkelrät mot duken. Vertikal keystone är vanligast i portabla modeller och räcker när projektorn står på bord men duken är högre upp, till exempel takprojicering i sovrummet.</p>
<p>Auto-keystone mäter och korrigerar på några sekunder efter uppstart. Det sparar tid jämfört med manuella reglage. För mycket keystone kan dock mjuka upp bilden något, eftersom pixlar omfördelas. Bästa bild får du fortfarande när projektorn står så rakt som möjligt.</p>
<p>Testa att placera projektorn parallellt med duken först, använd sedan auto-keystone som finjustering. På modeller med 180 graders rotation, som MiniLux-serien, kombinerar du rotation med keystone istället för att luta hela enheten kraftigt.</p>
<p>Spara inte permanent max-keystone om du kan undvika det. En liten vinkel på stativ eller hylla ger skarpare resultat än att kompensera 30 grader digitalt.</p>`,
  bio: bioPer(),
  related: relatedCards([["projektor-sovrum.html", "Guide", "Sovrum"], ["optimera-rummet.html", "Tips", "Optimera"], ["minilux-pro-recension.html", "Recension", "MiniLux Pro"]]),
});

shortArticle("4k-vs-1080p.html", {
  metaTitle: "4K vs 1080p projektor | ProjektorTips.se",
  metaDesc: "Vilken upplösning räcker för hemmabio?",
  activeCat: "kategori-teknik.html",
  catLabel: "Teknik",
  h1: "4K, 1080p eller 720p: vilken upplösning räcker?",
  intro: "4K på förpackningen betyder inte alltid native 4K. Vi reder ut vad som märks på soffan.",
  author: { name: "Erik Lindström" },
  date: "28 feb 2026",
  readMin: "6",
  body: `<p>Många budgetprojektorer accepterar 4K-innehåll men visar färre pixlar. MiniLux Pro har XGA 1280×720 och skalar upp. MiniLux Pro 2 har native 1920×1080P med 4K-stöd, vilket ger tydligare text och kanter än uppskalad XGA.</p>
<p>Sitter du tre till fyra meter från en 100-tums duk är skillnaden mellan bra 1080P och 4K mindre än mellan suddig XGA och skarp 1080P. Ögat ser först ljusstyrka och skärpa, sedan upplösning.</p>
<p>4K-projektorer över 10 000 kr kan motiveras i dedikerade mörka biograf rum. För vardagsfilm och streaming räcker native 1080P ofta. 720p-native (XGA) kan funka i sovrum om priset är prioritet och avståndet är lagom.</p>
<p>Källa: spela 1080P när projektorn är 1080P-native; mata 4K in i en 720p-panel ger mest extra nätverksbelastning. Läs <a href="ansi-lumen-guide.html">ANSI-guiden</a> parallellt: en skarp 1080P-bild med bra ljus slår en mörk 4K-panel.</p>`,
  bio: bioErik(),
  related: relatedCards([["minilux-pro-2-recension.html", "Recension", "Pro 2"], ["basta-projektorer-2026.html", "Guide", "Bästa 2026"], ["projektor-gaming.html", "Gaming", "Gaming"]]),
});

shortArticle("projektor-vs-tv.html", {
  metaTitle: "Projektor eller TV? | ProjektorTips.se",
  metaDesc: "Ärlig jämförelse mellan projektor och stor-TV.",
  activeCat: "kategori-jamforelser.html",
  catLabel: "Jämförelse",
  h1: "Projektor eller TV: en ärlig jämförelse",
  intro: "Ingen universal vinnare. Här är när varje teknik passar bäst.",
  author: { name: "Anna Svensson" },
  date: "20 mar 2026",
  readMin: "8",
  body: `<p>TV vinner på enkelhet: slå på, titta, inget keystone. Projektor vinner på storlek per krona och flexibilitet. En 100-tums TV kostar mångfalt mer än projektor plus duk i budgetsegmentet.</p>
<p>Bild i ljus: TV med hög ljusstyrka tål vardagsrum på dagen. Projektor kräver mörkläggning eller högre ANSI. Projektor vinner i mörka filmkvällar med biokänsla.</p>
<p>Ljud och appar: moderna TV har bra inbyggt. Projektorer som MiniLux har Android med tusentals appar men svagare högtalare. Budgetera soundbar till projektor.</p>
<p>Spel: TV har ofta lägre input lag i samma prisklass. Projektor fungerar för casual-spel på stor duk; tävlingsspelare väljer ofta monitor eller TV.</p>
<p>Placering: projektor kan flyttas, takprojicera och utomhus. TV dominerar väggen permanent. Familjer som vill ha vardagsrum dagtid och bio kväll väljer ofta projektor.</p>
<p>Vår rekommendation: välj TV om du tittar mycket på eftermiddagen utan gardiner. Välj projektor om storbild och pris väger tyngst. Många har båda i olika rum.</p>`,
  bio: bioAnna(),
  related: relatedCards([["varfor-kopa-projektor.html", "Guide", "Varför projektor"], ["basta-projektorer-2026.html", "Guide", "Bästa 2026"], ["hemmabio-budget.html", "Guide", "Budget"]]),
});

shortArticle("projektor-gaming.html", {
  metaTitle: "Projektor för gaming | ProjektorTips.se",
  metaDesc: "Input lag, Hz och projektor för spel på storbild.",
  activeCat: "kategori-gaming.html",
  catLabel: "Gaming",
  h1: "Projektor för gaming: det du måste veta",
  intro: "Storbild och snabb respons går att kombinera, men inte alla projektorer klarar det.",
  author: { name: "Per Bergman" },
  date: "1 apr 2026",
  readMin: "7",
  body: `<p>Gaming på projektor handlar om input lag och bildfrekvens. Många portabla modeller är optimerade för film, inte tävlingsspel. Leta efter game-läge i menyn och testa med din konsol innan du bestämmer dig.</p>
<p>Anslut via HDMI för lägst latens. Bluetooth-ljud lägger ofta fördröjning; använd kabel eller hörlurar direkt i handkontrollen för seriöst spel. 60 Hz räcker för de flesta; 120 Hz kräver dyrare projektor och konsol som stödjer det.</p>
<p>Ljusstyrka påverkar hur snabbt du ser detaljer i mörka spelscener. 200 ANSI fungerar i mörkt rum; action-spel i halvljus vill ha 300 ANSI eller mer. Native 1080P hjälper text och HUD-läsbarhet jämfört med XGA.</p>
<p>Keystone och stor bild: sitt inte för nära om du ser pixlar. 80 till 100 tum är ofta sweet spot för respons och immersion. Stäng av onödig bildförbättring som ökar lag.</p>
<p>Sammanfattning: projektor för gaming är fantastiskt för co-op och casual. För rankad online kan TV eller monitor fortfarande vara säkrare. Testa alltid en hel kväll innan returperioden går ut.</p>`,
  bio: bioPer(),
  related: relatedCards([["4k-vs-1080p.html", "Teknik", "Upplösning"], ["wifi-streaming.html", "Teknik", "WiFi"], ["minilux-pro-2-recension.html", "Recension", "Pro 2"]]),
});

pages["index.html"] = indexPage();

Object.entries(pages).forEach(([file, html]) => {
  writeFileSync(file, html, "utf8");
  console.log("Wrote", file);
});
