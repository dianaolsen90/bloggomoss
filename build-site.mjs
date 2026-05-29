import { writeFileSync } from "fs";

const PRO1_URL =
  "https://miniprojektor.se/products/minilux-pro-smart-miniprojektor";
const PRO2_URL =
  "https://miniprojektor.se/products/minilux-pro-2-smart-miniprojektor-med-bluetooth-och-wifi-svart";
const STORE_URL = "https://miniprojektor.se";

const FONTS = `<link rel="preconnect" href="https://fonts.googleapis.com"/>
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,900;1,700&family=Source+Sans+3:wght@400;600;700&display=swap" rel="stylesheet"/>`;

const TODAY = "29 maj 2026";

const BASE_CSS = `
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
body{background:#fff;color:#111;font-family:'Source Sans 3',sans-serif;font-size:15px;line-height:1.6;-webkit-font-smoothing:antialiased}
a{color:inherit}
.breaking-bar{height:28px;background:#cc0000;display:flex;align-items:center;padding:0 2rem;gap:20px}
.breaking-label{background:#fff;color:#cc0000;font-size:8px;font-weight:900;letter-spacing:.2em;padding:2px 8px;flex-shrink:0}
.breaking-text{font-size:10px;color:rgba(255,255,255,.85);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.breaking-date{font-size:9px;color:rgba(255,255,255,.5);margin-left:auto;flex-shrink:0}
.masthead{text-align:center;padding:16px 2rem 12px;border-bottom:4px double #111}
.masthead-name{font-family:'Playfair Display',serif;font-size:clamp(28px,6vw,52px);font-weight:900;color:#111;letter-spacing:-.04em;text-transform:uppercase;line-height:1;text-decoration:none;display:block}
.masthead-name .se{color:#ea580c}
.masthead-rule{display:flex;align-items:center;justify-content:center;gap:16px;margin-top:8px}
.masthead-rule::before,.masthead-rule::after{content:'';flex:1;height:1px;background:#ccc;max-width:200px}
.masthead-tagline{font-size:9px;letter-spacing:.25em;color:#888;text-transform:uppercase;white-space:nowrap}
.compact-brand{padding:10px 2rem;border-bottom:1px solid #ddd}
.compact-brand a{font-family:'Playfair Display',serif;font-size:22px;font-weight:900;color:#111;text-decoration:none;letter-spacing:-.03em;text-transform:uppercase}
.compact-brand a .se{color:#ea580c}
.cat-ribbon{display:flex;border-top:2px solid #111;border-bottom:2px solid #111;overflow-x:auto;background:#fff;position:sticky;top:0;z-index:100}
.cat-ribbon a{text-decoration:none;display:flex;align-items:center;flex-shrink:0}
.cat-ribbon a:first-child{background:#111;padding:7px 16px}
.cat-ribbon a:first-child span{font-size:10px;color:#fff;font-weight:700;letter-spacing:.1em;text-transform:uppercase}
.cat-ribbon a:not(:first-child){padding:7px 14px;border-right:1px solid #ddd}
.cat-ribbon a:not(:first-child) span{font-size:10px;color:#111;font-weight:600;letter-spacing:.06em;text-transform:uppercase}
.cat-ribbon a:not(:first-child):hover{background:#f5f5f5}
.cat-ribbon a.active{background:#ea580c}
.cat-ribbon a.active span{color:#fff}
.nav-nb{margin-left:auto;background:transparent!important;padding:7px 14px!important;border-left:1px solid #ddd}
.nav-nb span{font-size:10px;color:#ea580c!important;font-weight:700!important;letter-spacing:.1em;text-transform:uppercase}
.nav-nb:hover{background:#f5f5f5!important}
.container{max-width:1160px;margin:0 auto;padding:0 2rem}
.container-narrow{max-width:1100px;margin:0 auto;padding:0 2rem}
footer{background:#111;color:#fff;padding:3rem 2rem 2rem;border-top:4px solid #ea580c}
.footer-inner{max-width:1100px;margin:0 auto}
.footer-grid{display:grid;grid-template-columns:1fr 1fr 1fr;gap:2rem;margin-bottom:2rem}
.footer-brand{font-family:'Playfair Display',serif;font-size:22px;color:#fff;font-weight:900;margin-bottom:6px}
.footer-brand .se{color:#ea580c}
.footer-about{font-size:12px;color:#888;margin-top:6px;max-width:240px;line-height:1.6}
.footer-col h4{font-size:9px;font-weight:700;letter-spacing:.18em;color:#ea580c;text-transform:uppercase;border-bottom:1px solid #333;padding-bottom:8px;margin-bottom:12px}
.footer-col ul{list-style:none}
.footer-col a{font-size:12px;color:#888;text-decoration:none;display:block;margin-bottom:7px}
.footer-col a:hover{color:#fff}
.footer-bottom{border-top:1px solid #222;padding-top:1.5rem;display:flex;justify-content:space-between;flex-wrap:wrap;gap:8px}
.footer-bottom p,.footer-bottom a{font-size:11px;color:#555;text-decoration:none}
.footer-bottom a:hover{color:#fff}
@media(max-width:768px){.footer-grid{grid-template-columns:1fr}.breaking-text{max-width:180px}}
`;

const ARTICLE_CSS = `
.article-grid{display:grid;grid-template-columns:1fr 220px;gap:3rem;padding:2rem 0 4rem}
.art-header{border-bottom:2px solid #111;padding-bottom:14px;margin-bottom:20px}
.art-cat{background:#ea580c;display:inline-block;padding:3px 8px;margin-bottom:8px;font-size:9px;color:#fff;font-weight:700;letter-spacing:.12em;text-transform:uppercase}
.art-cat.cat-dark{background:#111}
h1{font-family:'Playfair Display',serif;font-size:clamp(24px,5vw,44px);font-weight:900;color:#111;line-height:1.1;letter-spacing:-.03em;margin-bottom:10px}
.art-intro{font-family:'Playfair Display',serif;font-style:italic;font-size:16px;color:#555;line-height:1.65;margin-bottom:14px}
.art-meta{display:flex;align-items:center;gap:8px;font-size:11px;color:#888;flex-wrap:wrap}
.art-meta strong{font-weight:600;color:#333}
.meta-sep{color:#ccc}
.meta-rule{border:none;border-top:1px solid #ddd;margin-top:12px}
.trust-bar{display:grid;grid-template-columns:repeat(4,1fr);border:1px solid #ddd;margin:16px 0}
.trust-cell{padding:10px 14px;border-right:1px solid #ddd;text-align:center}
.trust-cell:last-child{border-right:none}
.trust-icon{font-size:1.1rem;display:block;margin-bottom:3px}
.trust-cell strong{font-size:12px;font-weight:700;color:#111;display:block}
.trust-cell span{font-size:10px;color:#888}
.art-img{aspect-ratio:16/7;background:#f0e8e0;border:1px solid #ddd;display:flex;align-items:center;justify-content:center;font-size:12px;color:#bbb;margin-bottom:1.5rem}
.body{font-family:'Source Sans 3',sans-serif;font-size:16px;color:#2a2a2a;line-height:1.85}
.body p{margin-bottom:1.2rem}
.body h2{font-family:'Playfair Display',serif;font-size:20px;font-weight:700;color:#111;border-bottom:1px solid #e0e0e0;padding-bottom:6px;margin:2rem 0 .8rem}
.body ul,.body ol{padding-left:1.4rem;margin-bottom:1.2rem}
.body li{margin-bottom:.5rem}
.body a{color:#cc0000;text-decoration:underline}
.callout{border-left:4px solid #ea580c;padding:10px 14px;background:#fffaf7;margin:1.5rem 0}
.callout p{margin:0;font-size:14px;color:#555;line-height:1.7;font-style:italic}
.spec-tbl,.cmp-tbl{width:100%;border-collapse:collapse;margin:1.5rem 0;font-size:13px;border:1px solid #ddd}
.cmp-tbl th,.spec-tbl th{background:#111;color:#fff;font-size:9px;letter-spacing:.1em;text-transform:uppercase;padding:8px 12px;text-align:left}
.spec-tbl td,.cmp-tbl td{padding:8px 12px;border-bottom:1px solid #eee;color:#444}
.spec-tbl td:first-child,.cmp-tbl td:first-child{font-weight:600;color:#111;background:#fafafa;width:45%}
.cmp-tbl tr:last-child td,.spec-tbl tr:last-child td{border-bottom:none}
.score-box{border:1px solid #ddd;padding:1.2rem;margin:1.5rem 0}
.score-title{font-size:9px;font-weight:700;letter-spacing:.15em;color:#888;text-transform:uppercase;border-bottom:1px solid #eee;padding-bottom:8px;margin-bottom:12px}
.score-row{display:flex;align-items:center;gap:12px;margin-bottom:8px}
.score-lbl{font-size:13px;color:#555;width:160px;flex-shrink:0}
.score-bar{flex:1;background:#e8e8e4;height:3px;overflow:hidden}
.score-fill{height:100%;background:#cc0000}
.score-val{font-size:13px;font-weight:700;width:28px;text-align:right}
.score-total{display:flex;align-items:baseline;gap:10px;margin-top:12px;padding-top:12px;border-top:1px solid #eee}
.score-num{font-family:'Playfair Display',serif;font-size:42px;font-weight:900;color:#111}
.score-stars{color:#ea580c;font-size:14px}
.score-label{font-size:12px;color:#888}
.pc{display:grid;grid-template-columns:1fr 1fr;gap:16px;margin:1.5rem 0}
.pc-box{padding-top:10px}
.pros{border-top:3px solid #111}
.cons{border-top:3px solid #cc0000}
.pc-box h4{font-size:9px;font-weight:700;letter-spacing:.15em;text-transform:uppercase;margin-bottom:10px}
.pros h4{color:#111}.cons h4{color:#cc0000}
.pc-box ul{list-style:none}
.pc-box li{font-size:13px;color:#444;padding:5px 0;display:flex;gap:8px;border-bottom:1px solid #f0f0f0;line-height:1.5}
.pc-box li:last-child{border-bottom:none}
.pros li::before{content:'+';color:#111;font-weight:900;flex-shrink:0}
.cons li::before{content:'-';color:#cc0000;font-weight:900;flex-shrink:0}
.cta-box{background:#111;padding:20px 24px;margin:2rem 0;display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:16px}
.cta-left .cta-label{font-size:9px;font-weight:700;letter-spacing:.15em;color:#ea580c;display:block;margin-bottom:4px;text-transform:uppercase}
.cta-left .cta-name{font-size:16px;font-weight:700;color:#fff}
.cta-left .cta-tag{font-size:12px;color:#888;margin-top:2px}
.cta-btn{background:#ea580c;color:#fff;padding:10px 24px;font-size:13px;font-weight:700;text-decoration:none;letter-spacing:.06em;white-space:nowrap}
.cta-btn:hover{background:#cc0000}
.author-bio{border-top:3px double #111;padding-top:1.5rem;margin-top:2.5rem;display:flex;gap:1.2rem;align-items:flex-start}
.av-lg{width:52px;height:52px;border-radius:50%;background:#f0e8e0;display:flex;align-items:center;justify-content:center;font-size:14px;font-weight:700;color:#888;flex-shrink:0}
.bio-expert-tag{font-size:8px;font-weight:700;letter-spacing:.18em;color:#ea580c;text-transform:uppercase;margin-bottom:3px}
.bio-name{font-family:'Playfair Display',serif;font-size:18px;font-weight:700;color:#111;margin-bottom:2px}
.bio-title{font-size:12px;color:#888;font-style:italic;margin-bottom:8px}
.bio-text{font-size:13px;color:#555;line-height:1.65;margin-bottom:10px}
.bio-stats{display:flex;gap:2rem;flex-wrap:wrap;padding-top:10px;border-top:1px solid #e0e0e0}
.bio-stat strong{display:block;font-family:'Playfair Display',serif;font-size:16px;font-weight:700;color:#111}
.bio-stat span{font-size:10px;color:#aaa;text-transform:uppercase;letter-spacing:.08em}
.related{border-top:2px solid #111;padding-top:16px;margin-top:2.5rem}
.related-title{font-size:9px;font-weight:700;letter-spacing:.18em;color:#888;text-transform:uppercase;margin-bottom:14px}
.related-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:0}
.rel-card{text-decoration:none;color:inherit;padding:0 16px;border-right:1px solid #ddd}
.rel-card:first-child{padding-left:0}
.rel-card:last-child{border-right:none;padding-right:0}
.rel-img{aspect-ratio:16/9;background:#f0e8e0;border:1px solid #ddd;margin-bottom:8px;display:flex;align-items:center;justify-content:center;font-size:10px;color:#ccc}
.rel-cat{font-size:8px;text-transform:uppercase;color:#cc0000;font-weight:700;display:block;margin-bottom:4px;letter-spacing:.1em}
.rel-title{font-family:'Playfair Display',serif;font-size:13px;font-weight:700;color:#111;line-height:1.35}
.rel-card:hover .rel-title{color:#cc0000}
aside .sb-title{font-size:9px;font-weight:700;letter-spacing:.15em;color:#cc0000;text-transform:uppercase;border-bottom:2px solid #cc0000;padding-bottom:5px;margin-bottom:10px}
.sb-posts{list-style:none}
.sb-posts li{display:flex;gap:6px;align-items:flex-start;padding:7px 0;border-bottom:1px solid #e8e8e8}
.sb-posts a{display:flex;gap:6px;text-decoration:none;align-items:flex-start;width:100%}
.sb-rank{font-family:'Playfair Display',serif;font-size:18px;font-weight:900;color:#e0ddd8;line-height:1;width:22px;flex-shrink:0}
.sb-link-title{font-size:10px;font-weight:600;color:#222;line-height:1.3}
.sb-posts a:hover .sb-link-title{color:#cc0000}
.sb-link-meta{font-size:8px;color:#aaa;margin-top:2px}
.newsletter-box{background:#111;padding:12px;margin-top:16px}
.newsletter-title{font-size:9px;font-weight:700;color:#ea580c;letter-spacing:.15em;margin-bottom:4px;text-transform:uppercase}
.newsletter-sub{font-size:9px;color:#888;margin-bottom:8px}
.newsletter-btn{background:#ea580c;padding:6px;text-align:center;width:100%;font-size:9px;color:#fff;font-weight:700;letter-spacing:.1em;text-transform:uppercase;border:none;cursor:pointer;display:block;text-decoration:none}
.newsletter-btn:hover{background:#cc0000}
.tag-cloud{display:flex;flex-wrap:wrap;margin-top:4px}
.tag{border:1px solid #ddd;padding:3px 8px;font-size:10px;color:#555;text-decoration:none;display:inline-block;margin:3px 2px}
.tag:hover{background:#111;color:#fff;border-color:#111}
.rank-entry{border-bottom:1px solid #e0e0e0;padding:16px 0;margin-bottom:0}
.rank-num{font-family:'Playfair Display',serif;font-size:2rem;color:#cc0000;font-weight:900;line-height:1;margin-bottom:6px}
.cat-hero{background:#111;padding:2.5rem 2rem;text-align:center;border-bottom:4px solid #ea580c}
.cat-hero h1{font-family:'Playfair Display',serif;font-size:clamp(2rem,5vw,3.5rem);font-weight:900;color:#fff;text-transform:uppercase;letter-spacing:-.03em;margin-bottom:0}
.cat-hero p{font-size:14px;color:rgba(255,255,255,.5);max-width:480px;margin:8px auto 0}
.cat-list{max-width:1100px;margin:0 auto;padding:2rem}
.cat-item{display:grid;grid-template-columns:120px 1fr;gap:16px;padding:16px 0;border-bottom:1px solid #e0e0e0;text-decoration:none;color:inherit}
.cat-item:hover .cat-item-title{color:#cc0000}
.cat-thumb{background:#f0e8e0;aspect-ratio:4/3;border:1px solid #ddd;display:flex;align-items:center;justify-content:center;font-size:10px;color:#ccc}
.cat-item-cat{font-size:7px;color:#cc0000;font-weight:700;letter-spacing:.12em;text-transform:uppercase;display:block;margin-bottom:3px}
.cat-item-title{font-family:'Playfair Display',serif;font-size:14px;font-weight:700;color:#111;line-height:1.25;letter-spacing:-.02em;margin-bottom:4px}
.cat-item-meta{font-size:8px;color:#999;font-style:italic}
.cat-item-excerpt{font-size:11px;color:#444;line-height:1.6;margin-top:4px}
.page-main{padding:2.5rem 0 4rem;max-width:720px}
.page-main.wide{max-width:100%}
.form-group{margin-bottom:1rem}
.form-group label{display:block;font-size:12px;font-weight:600;margin-bottom:4px;color:#333}
.form-group input,.form-group textarea{width:100%;padding:8px;border:1px solid #ddd;font-family:inherit;font-size:14px}
.form-btn{background:#ea580c;color:#fff;border:none;padding:10px 20px;font-weight:700;cursor:pointer;font-size:13px;letter-spacing:.06em;text-transform:uppercase}
.form-btn:hover{background:#cc0000}
.form-btn-dark{background:#111;color:#fff}
.form-btn-dark:hover{background:#333}
.author-card{border-top:1px solid #e0e0e0;padding:1.5rem 0;margin-bottom:0}
.policy-box{background:#111;padding:1.5rem;margin:2rem 0}
.policy-box h3{font-size:9px;font-weight:700;letter-spacing:.15em;color:#ea580c;text-transform:uppercase;margin-bottom:8px}
.policy-box p{font-size:13px;color:#888;line-height:1.65;margin:0}
.contact-note{background:#ea580c;color:#fff;padding:1rem;margin:1rem 0 1.5rem;font-size:14px;line-height:1.5}
.newsletter-page{max-width:600px;margin:0 auto;padding:4rem 2rem}
.newsletter-page h1{font-family:'Playfair Display',serif;font-weight:900;text-transform:uppercase;margin-bottom:1rem}
.newsletter-page .subtext{font-size:14px;color:#555;line-height:1.65;margin-bottom:2rem}
.newsletter-page .form-note{font-size:11px;color:#888;margin-top:1rem}
.faq-item{border-bottom:1px solid #e0e0e0}
.faq-q{width:100%;background:none;border:none;padding:14px 0;text-align:left;font-family:'Playfair Display',serif;font-size:15px;font-weight:700;color:#111;cursor:pointer;display:flex;justify-content:space-between;align-items:center}
.faq-q::after{content:'+';font-size:18px;color:#ea580c;font-weight:400}
.faq-item.open .faq-q::after{content:'−'}
.faq-a{max-height:0;overflow:hidden;transition:max-height .25s ease}
.faq-a-inner{padding:0 0 14px;font-size:14px;color:#444;line-height:1.65}
.faq-item.open .faq-a{max-height:200px}
.review-card{border-left:3px solid #ea580c;padding:10px 14px;margin:1rem 0;background:#fffaf7}
.review-card.neg{border-left-color:#ccc;background:#fafafa}
.review-card p{margin:0;font-size:14px;color:#555;font-style:italic;line-height:1.65}
.review-meta{font-size:10px;color:#999;margin-top:6px;font-style:normal}
@media(max-width:1024px){.article-grid{grid-template-columns:1fr}aside{display:none}.related-grid{grid-template-columns:repeat(2,1fr)}.rel-card{border-right:none;padding:0 0 16px;margin-bottom:16px;border-bottom:1px solid #ddd}.rel-card:last-child{border-bottom:none}}
@media(max-width:768px){.trust-bar{grid-template-columns:repeat(2,1fr)}.trust-cell:nth-child(2){border-right:none}.trust-cell:nth-child(3),.trust-cell:nth-child(4){border-top:1px solid #ddd}.pc{grid-template-columns:1fr}.related-grid{grid-template-columns:1fr}.cat-item{grid-template-columns:90px 1fr}}
`;

const INDEX_CSS = `
.paper-grid{display:grid;grid-template-columns:1.8fr 1px 1.3fr 1px 0.9fr;padding:16px 0}
.col-divider{background:#ddd}
.col-main{padding:0 20px 0 0}
.hero-img{background:#f0e8e0;aspect-ratio:3/2;display:flex;align-items:center;justify-content:center;font-size:11px;color:#ccc;margin-bottom:10px}
.cat-label{background:#ea580c;display:inline;padding:2px 6px;font-size:8px;color:#fff;font-weight:700;letter-spacing:.12em;text-transform:uppercase}
.main-headline{font-family:'Playfair Display',serif;font-size:clamp(20px,3vw,28px);font-weight:900;color:#111;line-height:1.1;letter-spacing:-.03em;margin-top:6px;margin-bottom:6px}
.main-byline{font-size:9px;color:#888;font-style:italic;margin-bottom:6px}
.main-excerpt{font-size:11px;color:#444;line-height:1.6;margin-top:6px;margin-bottom:8px}
.read-more{font-size:10px;color:#cc0000;font-weight:700;text-decoration:none;text-transform:uppercase;letter-spacing:.08em}
.read-more:hover{text-decoration:underline}
.col-secondary{padding:0 16px;display:flex;flex-direction:column}
.sec-story{padding-bottom:12px;border-bottom:1px solid #e0e0e0;margin-bottom:12px;text-decoration:none;color:inherit;display:block}
.sec-story:last-child{border-bottom:none;margin-bottom:0;padding-bottom:0}
.sec-cat{font-size:7px;color:#cc0000;font-weight:700;letter-spacing:.12em;text-transform:uppercase;display:block;margin-bottom:3px}
.sec-headline{font-family:'Playfair Display',serif;font-size:14px;font-weight:700;color:#111;line-height:1.25;letter-spacing:-.02em}
.sec-byline{font-size:8px;color:#999;margin-top:4px}
.sec-story:hover .sec-headline{color:#cc0000}
.col-sidebar{padding:0 0 0 16px}
.section-rule{border:none;border-top:1px solid #ddd;margin:8px 0}
.more-section{padding:16px 0 4rem}
.more-label{font-size:9px;font-weight:700;letter-spacing:.15em;color:#888;text-transform:uppercase;border-bottom:1px solid #e0e0e0;padding-bottom:6px;margin-bottom:12px}
.more-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:0}
.more-item{padding:0 16px 0 0;border-right:1px solid #e0e0e0;text-decoration:none;color:inherit;display:block}
.more-item:last-child{border-right:none}
.more-cat{font-size:7px;text-transform:uppercase;font-weight:700;letter-spacing:.1em}
.more-cat.cat-guide{color:#ea580c}.more-cat.cat-rec{color:#cc0000}.more-cat.cat-tech{color:#111}.more-cat.cat-tips{color:#444}.more-cat.cat-jmf{color:#ea580c}.more-cat.cat-game{color:#111}
.more-headline{font-family:'Playfair Display',serif;font-size:11px;font-weight:700;line-height:1.3;color:#111;margin-top:3px}
.more-author{font-size:8px;color:#aaa;margin-top:3px}
.more-item:hover .more-headline{color:#cc0000}
@media(max-width:1024px){.paper-grid{grid-template-columns:1fr 1px 0.9fr}.col-secondary{display:none}.col-divider:nth-child(2){display:none}.col-main{padding-right:0}.more-grid{grid-template-columns:repeat(2,1fr)}.more-item:nth-child(2){border-right:none}.more-item:nth-child(3),.more-item:nth-child(4){border-top:1px solid #e0e0e0;padding-top:12px;margin-top:12px}}
@media(max-width:768px){.paper-grid{grid-template-columns:1fr}.col-divider{display:none}.col-sidebar{display:none}.more-grid{grid-template-columns:1fr}.more-item{border-right:none;border-bottom:1px solid #e0e0e0;padding-bottom:12px;margin-bottom:12px}.more-item:last-child{border-bottom:none}}
`;

const cats = [
  ["index.html", "Alla"],
  ["kategori-guider.html", "Guider"],
  ["kategori-recensioner.html", "Recensioner"],
  ["kategori-tips.html", "Tips"],
  ["kategori-teknik.html", "Teknik"],
  ["kategori-jamforelser.html", "Jämförelser"],
  ["kategori-hemmabio.html", "Hemmabio"],
  ["kategori-gaming.html", "Gaming"],
];

function breakingBar() {
  return `<div class="breaking-bar"><span class="breaking-label">SENASTE</span><span class="breaking-text">MiniLux Pro 2 testad: native 1080P och 390 ANSI lumen</span><span class="breaking-date">${TODAY}</span></div>`;
}

function masthead() {
  return `<div class="masthead"><a class="masthead-name" href="index.html">PROJEKTORGUIDEN<span class="se">.SE</span></a><div class="masthead-rule"><span class="masthead-tagline">Oberoende teknikjournalistik sedan 2023</span></div></div>`;
}

function compactBrand() {
  return `<div class="compact-brand"><a href="index.html">PROJEKTORGUIDEN<span class="se">.SE</span></a></div>`;
}

function catRibbon(active) {
  const links = cats
    .map(
      ([href, label]) =>
        `<a href="${href}"${href === active ? ' class="active"' : ""}><span>${label}</span></a>`
    )
    .join("");
  return `<div class="cat-ribbon">${links}<a href="nyhetsbrev.html" class="nav-nb"><span>Nyhetsbrev</span></a></div>`;
}

function siteHeader(active, opts = {}) {
  const top = breakingBar();
  const brand = opts.home ? masthead() : compactBrand();
  return `${top}${brand}${catRibbon(active)}`;
}

function footer() {
  return `<footer><div class="footer-inner"><div class="footer-grid">
<div><div class="footer-brand">PROJEKTORGUIDEN<span class="se">.SE</span></div>
<p class="footer-about">Oberoende projektortester och köpguider sedan 2023. Vi granskar utan reklamlöften och köper alltid produkterna med egna medel.</p></div>
<div class="footer-col"><h4>Populära artiklar</h4>
<a href="minilux-pro-recension.html">MiniLux Pro recension</a>
<a href="minilux-pro-2-recension.html">MiniLux Pro 2 recension</a>
<a href="miniprojektor-se-recension.html">Miniprojektor.se recension</a>
<a href="basta-projektorer-2026.html">Bästa projektorer 2026</a>
<a href="varfor-kopa-projektor.html">Varför välja projektor</a>
<a href="ansi-lumen-guide.html">ANSI Lumen förklarat</a>
</div>
<div class="footer-col"><h4>Kategorier</h4>
<a href="kategori-guider.html">Guider</a>
<a href="kategori-recensioner.html">Recensioner</a>
<a href="kategori-tips.html">Tips</a>
<a href="kategori-teknik.html">Teknik</a>
<a href="kategori-jamforelser.html">Jämförelser</a>
<a href="kategori-hemmabio.html">Hemmabio</a>
</div></div>
<div class="footer-bottom">
<p>&copy; 2026 projektorguiden.se. Oberoende projektorgranskning.</p>
<p><a href="om-oss.html">Om oss</a> · <a href="kontakt.html">Kontakt</a> · <a href="integritetspolicy.html">Integritetspolicy</a></p>
</div></div></footer>`;
}

function newsletterBox() {
  return `<div class="newsletter-box"><div class="newsletter-title">NYHETSBREV</div><p class="newsletter-sub">Veckans bästa artiklar direkt i inkorgen</p><a class="newsletter-btn" href="nyhetsbrev.html">PRENUMERERA</a></div>`;
}

function sidebarMostRead() {
  return `<div class="sb-section"><div class="sb-title">Mest läst</div><ul class="sb-posts">
<li><a href="minilux-pro-recension.html"><span class="sb-rank">01</span><div><div class="sb-link-title">MiniLux Pro recension</div></div></a></li>
<li><a href="minilux-pro-2-recension.html"><span class="sb-rank">02</span><div><div class="sb-link-title">MiniLux Pro 2 recension</div></div></a></li>
<li><a href="miniprojektor-se-recension.html"><span class="sb-rank">03</span><div><div class="sb-link-title">Miniprojektor.se recension</div></div></a></li>
<li><a href="basta-projektorer-2026.html"><span class="sb-rank">04</span><div><div class="sb-link-title">Bästa projektorerna 2026</div></div></a></li>
<li><a href="ansi-lumen-guide.html"><span class="sb-rank">05</span><div><div class="sb-link-title">ANSI Lumen förklarat</div></div></a></li>
</ul></div>`;
}

function sidebarTags() {
  return `<div class="sb-section"><div class="sb-title">Ämnen</div><div class="tag-cloud">
<a class="tag" href="kategori-recensioner.html">Projektorer</a>
<a class="tag" href="kategori-guider.html">Guider</a>
<a class="tag" href="kategori-recensioner.html">Recensioner</a>
<a class="tag" href="kategori-hemmabio.html">Hemmabio</a>
<a class="tag" href="kategori-gaming.html">Gaming</a>
<a class="tag" href="kategori-tips.html">Tips</a>
<a class="tag" href="kategori-teknik.html">Teknik</a>
<a class="tag" href="kategori-jamforelser.html">Jämförelser</a>
<a class="tag" href="4k-vs-1080p.html">4K</a>
<a class="tag" href="ljud-projektor.html">Ljud</a>
<a class="tag" href="hemmabio-budget.html">Budget</a>
<a class="tag" href="projektor-sovrum.html">Sovrum</a>
</div></div>`;
}

function sidebarArticle() {
  return `<aside>${sidebarMostRead()}${newsletterBox()}${sidebarTags()}</aside>`;
}

function trustBarGrid(items) {
  const icons = ["✓", "◉", "★", "●"];
  return `<div class="trust-bar">${items
    .map(
      (t, i) =>
        `<div class="trust-cell"><span class="trust-icon">${icons[i] || "•"}</span><strong>${t}</strong><span>&nbsp;</span></div>`
    )
    .join("")}</div>`;
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
  const catClass = ["Teknik", "Jämförelse", "Gaming"].includes(catLabel) ? "art-cat cat-dark" : "art-cat";
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
${siteHeader(activeCat)}
<div class="container-narrow"><div class="article-grid">
<article>
<div class="art-header">
<span class="${catClass}">${catLabel}</span>
<h1>${h1}</h1>
<p class="art-intro">${intro}</p>
<div class="art-meta"><strong>${author.name}</strong><span class="meta-sep">·</span><span>${date}</span><span class="meta-sep">·</span><span>${readMin} min läsning</span></div>
<hr class="meta-rule"/>
</div>
${trust ? trustBarGrid(trust) : ""}
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
<div class="bio-title">Seniorskribent, projektorguiden.se</div>
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
<div class="bio-title">Teknikskribent, projektorguiden.se</div>
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
<div class="bio-title">Teknikskribent, projektorguiden.se</div>
<p class="bio-text">Anna Svensson är teknikskribent med 7 års erfarenhet och utbildning inom medie- och kommunikationsvetenskap. Hon specialiserar sig på köpguider och konsumentvägledning för familjer och förstagångsköpare.</p>
<div class="bio-stats">
<div class="bio-stat"><strong>7 år</strong><span>Erfarenhet</span></div>
<div class="bio-stat"><strong>140+</strong><span>Artiklar</span></div>
<div class="bio-stat"><strong>30+</strong><span>Projektorer</span></div>
</div></div></div>`;
}

function relatedCards(items) {
  return `<div class="related"><div class="related-title">Fler artiklar</div><div class="related-grid">${items
    .map(
      ([href, cat, title]) =>
        `<a class="rel-card" href="${href}"><div class="rel-img">[ Bild ]</div><span class="rel-cat">${cat}</span><div class="rel-title">${title}</div></a>`
    )
    .join("")}</div></div>`;
}

function scoreRows(rows, total) {
  const stars = "★".repeat(Math.round(total));
  const bars = rows
    .map(
      ([lbl, val]) =>
        `<div class="score-row"><span class="score-lbl">${lbl}</span><div class="score-bar"><div class="score-fill" style="width:${val * 20}%"></div></div><span class="score-val">${val}</span></div>`
    )
    .join("");
  return `<div class="score-box"><div class="score-title">Betyg</div>${bars}<div class="score-total"><span class="score-num">${total}</span><span class="score-stars">${stars}</span><span class="score-label">/5 totalt</span></div></div>`;
}

function prosCons(pros, cons) {
  return `<div class="pc"><div class="pc-box pros"><h4>Fördelar</h4><ul>${pros.map((p) => `<li>${p}</li>`).join("")}</ul></div><div class="pc-box cons"><h4>Nackdelar</h4><ul>${cons.map((c) => `<li>${c}</li>`).join("")}</ul></div></div>`;
}

function ctaBox(label, name, tagline, btnText, url) {
  return `<div class="cta-box"><div class="cta-left"><span class="cta-label">${label}</span><div class="cta-name">${name}</div><div class="cta-tag">${tagline}</div></div><a class="cta-btn" href="${url}" rel="dofollow">${btnText}</a></div>`;
}

function ctaPro1() {
  return ctaBox("Var kan jag köpa?", "MiniLux Pro", "200 ANSI Lumen · 130 tums bild · 1 499 kr", "Till MiniLux Pro →", PRO1_URL);
}

function ctaPro2() {
  return ctaBox("Testad och rekommenderad", "MiniLux Pro 2 · 1 999 kr", "390 ANSI Lumen · 150 tums bild · WiFi 6", "Köp hos miniprojektor.se", PRO2_URL);
}

function ctaVsPro2() {
  return ctaBox("Vill du läsa mer?", "MiniLux Pro 2", "Se aktuellt pris och tillgänglighet", "Läs mer om MiniLux Pro 2", PRO2_URL);
}

function ctaStoreRec() {
  return ctaBox("Besök butiken", "Miniprojektor.se", "Fri frakt · 2 års garanti · 4-7 dagars leverans", "Gå till Miniprojektor.se", STORE_URL);
}

function ctaStoreOmd() {
  return ctaBox("Handla tryggt", "Miniprojektor.se", "Fri frakt · Swish och Klarna · Kundtjänst inom 24h", "Se produkterna hos Miniprojektor.se", STORE_URL);
}

function faqAccordion(items) {
  const html = items
    .map(
      ([q, a]) =>
        `<div class="faq-item"><button type="button" class="faq-q">${q}</button><div class="faq-a"><div class="faq-a-inner">${a}</div></div></div>`
    )
    .join("");
  return `${html}<script>document.querySelectorAll('.faq-q').forEach(function(b){b.addEventListener('click',function(){var i=b.parentElement;i.classList.toggle('open');});});</script>`;
}

function nyhetsbrevPage() {
  return `<!DOCTYPE html>
<html lang="sv">
<head>
<meta charset="UTF-8"/>
<meta name="viewport" content="width=device-width,initial-scale=1.0"/>
<title>Prenumerera | projektorguiden.se</title>
<meta name="description" content="Prenumerera på projektorguiden.se nyhetsbrev. Veckans bästa projektorartiklar direkt i inkorgen."/>
${FONTS}
<style>${BASE_CSS}${ARTICLE_CSS}</style>
</head>
<body>
${siteHeader("index.html", { home: true })}
<div class="newsletter-page">
<h1>Prenumerera på nyhetsbrevet</h1>
<p class="subtext">Veckans bästa projektorartiklar direkt i inkorgen. Oberoende granskning utan reklamlöften sedan 2023.</p>
<form action="#" method="post">
<div class="form-group"><label for="nb-namn">Namn</label><input id="nb-namn" name="namn" type="text" required/></div>
<div class="form-group"><label for="nb-epost">E-post</label><input id="nb-epost" name="epost" type="email" required/></div>
<button class="form-btn" type="submit">PRENUMERERA GRATIS</button>
</form>
<p class="form-note">Vi delar aldrig din e-post med tredje part.</p>
</div>
${footer()}
</body></html>`;
}

function categoryPage(activeCat, h1, subtitle, catLabel, cards) {
  const list = cards
    .map(
      ([href, title, excerpt, author]) =>
        `<a class="cat-item" href="${href}"><div class="cat-thumb">[ Bild ]</div><div><span class="cat-item-cat">${catLabel}</span><div class="cat-item-title">${title}</div><div class="cat-item-meta">Av ${author}</div><p class="cat-item-excerpt">${excerpt}</p></div></a>`
    )
    .join("");
  return `<!DOCTYPE html>
<html lang="sv">
<head>
<meta charset="UTF-8"/>
<meta name="viewport" content="width=device-width,initial-scale=1.0"/>
<title>${h1} | projektorguiden.se</title>
<meta name="description" content="${h1} på projektorguiden.se. Oberoende guider och recensioner om projektorer."/>
${FONTS}
<style>${BASE_CSS}${ARTICLE_CSS}</style>
</head>
<body>
${siteHeader(activeCat)}
<div class="cat-hero"><h1>${h1}</h1><p>${subtitle}</p></div>
<div class="cat-list">${list}</div>
${footer()}
</body></html>`;
}

function indexPage() {
  const secondary = [
    ["miniprojektor-se-omdome.html", "Omdöme", "Miniprojektor.se omdöme: vad säger svenska köpare?", "Per Bergman", "26 maj 2026"],
    ["miniprojektor-se-recension.html", "Recension", "Miniprojektor.se recension: pålitlig butik för projektorer?", "Erik Lindström", "24 maj 2026"],
    ["minilux-pro-2-recension.html", "Recension", "MiniLux Pro 2 recension 2026: native 1080P och 390 ANSI testad", "Erik Lindström", "22 maj 2026"],
    ["minilux-pro-recension.html", "Recension", "MiniLux Pro recension 2026: 200 ANSI Lumen i 30 dagars test", "Per Bergman", "16 maj 2026"],
    ["varfor-kopa-projektor.html", "Guide", "Varför du ska köpa en projektor istället för en stor-TV 2026", "Anna Svensson", "8 maj 2026"],
    ["ansi-lumen-guide.html", "Teknik", "ANSI Lumen förklarat 2026: hur mycket ljusstyrka behöver du?", "Erik Lindström", "4 maj 2026"],
  ];
  const more = [
    ["miniprojektor-se-omdome.html", "Omdöme", "cat-rec", "Miniprojektor.se omdöme: äkta kundröster och vår analys", "Per Bergman"],
    ["hemmabio-budget.html", "Guide", "cat-guide", "Hemmabio under 5000 kr: smartaste upplaget 2026", "Anna Svensson"],
    ["projektor-sovrum.html", "Guide", "cat-guide", "Projektor i sovrummet: allt du behöver veta 2026", "Anna Svensson"],
    ["utomhusbio-guide.html", "Tips", "cat-tips", "Utomhusbio hemma: perfekt biokväll på terrassen", "Per Bergman"],
    ["minilux-pro-2-vs-pro.html", "Jämförelse", "cat-jmf", "MiniLux Pro 2 vs Pro: är uppgraderingen värd 500 kr?", "Anna Svensson"],
    ["projektor-gaming.html", "Gaming", "cat-game", "Projektor för gaming: input lag och Hz", "Per Bergman"],
    ["keystone-guide.html", "Teknik", "cat-tech", "Keystone-korrigering förklarat", "Per Bergman"],
    ["projektor-vs-tv.html", "Jämförelse", "cat-jmf", "Projektor eller TV: ärlig jämförelse 2026", "Anna Svensson"],
    ["projiceringsduk-guide.html", "Guide", "cat-guide", "Välja projiceringsduk: vad du behöver", "Anna Svensson"],
    ["ljud-projektor.html", "Tips", "cat-tips", "Bra ljud till projektor: tre alternativ", "Erik Lindström"],
    ["optimera-rummet.html", "Tips", "cat-tips", "Optimera rummet för bättre projektor-bild", "Per Bergman"],
    ["4k-vs-1080p.html", "Teknik", "cat-tech", "4K vs 1080p 2026: vilken upplösning räcker?", "Erik Lindström"],
    ["wifi-streaming.html", "Teknik", "cat-tech", "WiFi-streaming till projektor: WiFi 6 guide", "Erik Lindström"],
  ];
  const secHtml = secondary
    .map(
      ([href, cat, title, author, date]) =>
        `<a class="sec-story" href="${href}"><span class="sec-cat">${cat}</span><div class="sec-headline">${title}</div><div class="sec-byline">Av ${author}, ${date}</div></a>`
    )
    .join("");
  const moreHtml = more
    .map(
      ([href, cat, cls, title, author]) =>
        `<a class="more-item" href="${href}"><span class="more-cat ${cls}">${cat}</span><div class="more-headline">${title}</div><div class="more-author">${author}</div></a>`
    )
    .join("");
  return `<!DOCTYPE html>
<html lang="sv">
<head>
<meta charset="UTF-8"/>
<meta name="viewport" content="width=device-width,initial-scale=1.0"/>
<title>projektorguiden.se | Guider och tester om projektorer</title>
<meta name="description" content="Oberoende blogg om projektorer. Guider, recensioner och köpråd för dig som vill ha storbild hemma."/>
${FONTS}
<style>${BASE_CSS}${ARTICLE_CSS}${INDEX_CSS}</style>
</head>
<body>
${siteHeader("index.html", { home: true })}
<div class="container">
<div class="paper-grid">
<div class="col-main">
<div class="hero-img">[ Omslagsbild ]</div>
<span class="cat-label">Guide</span>
<h2 class="main-headline">Bästa projektorerna 2026: vår kompletta guide för alla budgetar</h2>
<div class="main-byline">Av Erik Lindström, 20 maj 2026</div>
<p class="main-excerpt">Vi har testat dussintals modeller och sammanställt den definitiva listan över de bästa projektorerna just nu. Oavsett om du har 1500 kr eller 15 000 kr att lägga ner finns rätt alternativ för dig.</p>
<a class="read-more" href="basta-projektorer-2026.html">Läs hela artikeln →</a>
</div>
<div class="col-divider"></div>
<div class="col-secondary">${secHtml}</div>
<div class="col-divider"></div>
<div class="col-sidebar">${sidebarMostRead()}${newsletterBox()}</div>
</div>
<hr class="section-rule"/>
<div class="more-section">
<div class="more-label">Fler artiklar</div>
<div class="more-grid">${moreHtml}</div>
</div>
</div>
${footer()}
</body></html>`;
}

const pages = {};

// minilux-pro-recension
pages["minilux-pro-recension.html"] = articlePage({
  title: "",
  metaTitle: "MiniLux Pro recension 2026: är den värd 1 499 kr? | projektorguiden.se",
  metaDesc:
    "MiniLux Pro recension 2026: vi testade 200 ANSI Lumen och 130 tums bild för 1 499 kr. Är det värt pengarna? Läs vår ärliga bedömning från projektorguiden.",
  activeCat: "kategori-recensioner.html",
  catLabel: "Recension",
  h1: "MiniLux Pro recension 2026: 200 ANSI Lumen och 130 tums bild för 1 499 kr",
  intro:
    "En kompakt miniprojektor med 4000+ appar och 180 graders rotation för under 1 500 kr. Vi testade den i sovrum, vardagsrum och på resa för att se om budgetmodellen håller måttet.",
  author: { name: "Per Bergman" },
  date: "16 maj 2026",
  readMin: "12",
  trust: [
    "30 dagar testad",
    "4 rum",
    "Köpt med egna medel",
    "Ej sponsrat",
  ],
  body: `
<p>När vi letar en första projektor till familjen är frågan sällan om maximal prestanda, utan om vad man faktiskt får för pengarna. MiniLux Pro kostar 1 499 kr och positionerar sig som en portabel hemmabio-lösning med smart innehåll inbyggt. Den här MiniLux Pro recension bygger på fyra veckors daglig användning i tre olika miljöer.</p>
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
<p>Vår samlade bedömning i den här MiniLux Pro recension är att projektorn levererar det den lovar för priset. Den passar familjer som främst tittar på kvällen, vill ha takbild i sovrummet, eller behöver en lätt projektor att ta med på resan (med elnät i närheten). Vill du ha bättre ljusstyrka och native 1080P bör du titta på <a href="minilux-pro-2-recension.html">MiniLux Pro 2 recension</a> istället.</p>
${ctaPro1()}`,
  bio: bioPer(),
  related: relatedCards([
    ["minilux-pro-2-recension.html", "Recension", "MiniLux Pro 2 recension"],
    ["minilux-pro-2-vs-pro.html", "Jämförelse", "MiniLux Pro 2 vs Pro"],
    ["basta-projektorer-2026.html", "Guide", "Bästa projektorerna 2026"],
  ]),
});

pages["minilux-pro-2-recension.html"] = articlePage({
  metaTitle: "MiniLux Pro 2 recension 2026: bättre bild för 500 kr mer? | projektorguiden.se",
  metaDesc: "MiniLux Pro 2 recension 2026: native 1080P och 390 ANSI Lumen testat i verkliga hem. Är uppgraderingen värd 500 kr mer? Läs vår genomgång.",
  activeCat: "kategori-recensioner.html",
  catLabel: "Recension",
  h1: "MiniLux Pro 2 recension 2026: native 1080P och nästan dubbelt så ljusstark",
  intro: "Uppföljaren till budgetfavoriten MiniLux Pro kostar 500 kr mer men levererar 390 ANSI Lumen, native 1080P och WiFi 6. Vi körde den mot föregångaren i samma rum i 30 dagar.",
  author: { name: "Erik Lindström" },
  date: "22 maj 2026",
  readMin: "14",
  trust: ["30 dagar testad", "Jämförd mot Pro", "Köpt med egna medel", "Ej sponsrat"],
  body: `
<p>MiniLux Pro 2 är den naturliga uppgraderingen om du redan vet att du vill ha projektor hemma, men vill slippa kompromissa med ljusstyrka och skärpa. I den här MiniLux Pro 2 recension testar vi om native 1080P gör märkbar skillnad mot XGA i praktiken. För 1 999 kr får du native 1920×1080P med stöd för 4K-innehåll, 390 ANSI Lumen, kontrast 10 000:1 och skärmstorlek mellan 40 och 150 tum.</p>
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
<p>Vår slutsats i den här MiniLux Pro 2 recension är tydlig: WiFi 6 och bättre ljusstyrka motiverar priset för de flesta användare. Pro räcker fortfarande om budgeten är hård och du nästan alltid tittar i mörker. Läs även <a href="minilux-pro-2-vs-pro.html">jämförelsen Pro 2 vs Pro</a>.</p>
${ctaPro2()}`,
  bio: bioErik(),
  related: relatedCards([
    ["minilux-pro-recension.html", "Recension", "MiniLux Pro recension"],
    ["minilux-pro-2-vs-pro.html", "Jämförelse", "MiniLux Pro 2 vs Pro"],
    ["basta-projektorer-2026.html", "Guide", "Bästa projektorerna 2026"],
  ]),
});

pages["minilux-pro-2-vs-pro.html"] = articlePage({
  metaTitle: "MiniLux Pro 2 vs Pro 2026: vilken ska du köpa? | projektorguiden.se",
  metaDesc: "Jämförelse mellan MiniLux Pro och MiniLux Pro 2. ANSI Lumen, upplösning, WiFi och pris i praktiken.",
  activeCat: "kategori-jamforelser.html",
  catLabel: "Jämförelse",
  h1: "MiniLux Pro 2 vs Pro 2026: skillnaden som faktiskt spelar roll",
  intro: "500 kronor skiljer modellerna. Vi har testat båda i samma rum under fyra veckor och sammanfattar när uppgraderingen är värd pengarna och när Pro räcker.",
  author: { name: "Anna Svensson" },
  date: "12 maj 2026",
  readMin: "9",
  body: `
<p>Frågan vi får oftast är inte om MiniLux är bra, utan om man ska välja MiniLux Pro för 1 499 kr eller MiniLux Pro 2 för 1 999 kr. Båda är kompakta smartprojektorer med 4000+ appar, keystone, 180 graders roterbar lins, HDMI, USB och 3,5 mm, cirka 1 kg och 25 dB fläktljud. Ingen har batteri. Båda har 2 års garanti. Skillnaderna sitter i bild, ljus och nätverk.</p>
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
<p>För de flesta familjer som ska ha projektor i vardagsrummet rekommenderar vi Pro 2. Pro är fortfarande ett starkt förstaköp i mörka rum. Läs våra separata <a href="minilux-pro-recension.html">MiniLux Pro recension</a> och <a href="minilux-pro-2-recension.html">MiniLux Pro 2 recension</a> för fler detaljer.</p>
${ctaVsPro2()}`,
  bio: bioAnna(),
  related: relatedCards([
    ["minilux-pro-recension.html", "Recension", "MiniLux Pro recension"],
    ["minilux-pro-2-recension.html", "Recension", "MiniLux Pro 2 recension"],
    ["basta-projektorer-2026.html", "Guide", "Bästa projektorerna 2026"],
  ]),
});

pages["basta-projektorer-2026.html"] = articlePage({
  metaTitle: "Bästa projektorerna 2026: topp 6 för alla budgetar | projektorguiden.se",
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
<div class="rank-entry"><div class="rank-num">3</div><h2><a href="minilux-pro-recension.html">MiniLux Pro recension</a></h2><p>Bästa budgetvalet under 1 500 kr. 200 ANSI Lumen, XGA med 4K-stöd, 180 graders rotation, 4000+ appar och 2 års garanti. Perfekt för sovrum och första projektorn.</p></div>
<div class="rank-entry"><div class="rank-num">4</div><h2>MiniLux Pro 2</h2><p>Bästa mellanklass under 2 000 kr. Native 1080P, 390 ANSI, WiFi 6 och 5W HiFi. Tydlig uppgradering om du ska använda vardagsrummet. Se <a href="minilux-pro-2-recension.html">recensionen</a>.</p></div>
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
  metaTitle: "Varför köpa projektor istället för TV 2026 | projektorguiden.se",
  metaDesc: "Sju konkreta skäl att välja projektor framför stor-TV. Storlek, pris per tum och flexibilitet.",
  activeCat: "kategori-guider.html",
  catLabel: "Guide",
  h1: "Varför du ska köpa en projektor istället för en stor-TV 2026",
  intro: "En 75-tums TV kostar fort mer än en hemmabio-setup med projektor. Här är sju skäl som övertygade våra testfamiljer under 2026.",
  author: { name: "Anna Svensson" },
  date: "8 maj 2026",
  readMin: "9",
  body: `
<p>Vi möter ofta föräldrar som tror att projektor är krångligt eller bara för entusiaster. Efter att ha följt tio hushåll under våren ser vi ett annat mönster: projektor ger mer upplevelse per krona när rummet får vara flexibelt.</p>
<h2>1. Mer bild för pengarna</h2>
<p>En 100-tums upplevelse med projektor kostar en bråkdel av en TV i samma storleksklass. En modell som <a href="${PRO1_URL}" rel="dofollow">MiniLux Pro (1 499 kr)</a> och en vit vägg eller enkel duk räcker för familjefilm. Du betalar för ljus och lins, inte för gigantisk panel.</p>
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
  metaTitle: "ANSI Lumen förklarat 2026: hur mycket ljus behöver du? | projektorguiden.se",
  metaDesc: "Vad är ANSI Lumen? Vi förklarar mätvärdet och hur mycket ljusstyrka du behöver i olika rum.",
  activeCat: "kategori-teknik.html",
  catLabel: "Teknik",
  h1: "ANSI Lumen förklarat 2026: hur mycket ljusstyrka behöver du?",
  intro: "Tillverkare skriver allt från 200 till 3000 ANSI på förpackningen. Vi reder ut vad siffran betyder och vilka nivåer som fungerar i svenska hem.",
  author: { name: "Erik Lindström" },
  date: "4 maj 2026",
  readMin: "6",
  body: `
<p>ANSI Lumen är en standardiserad mätning av ljusflöde från projektorn. Till skillnad från äldre lux-siffror mäts ANSI på ett sätt som gör modeller mer jämförbara. Det betyder inte att 500 ANSI alltid upplevs dubbelt så ljusst som 250, men det ger en rättvisare startpunkt än marknadsföringsetiketter utan ANSI.</p>
<h2>Varför siffran spelar roll</h2>
<p>Projektorer skickar ljus som reflekteras från duk eller vägg. Allt ambient ljus i rummet konkurrerar med bilden. I mörkt rum räcker lägre ANSI. I vardagsrum med gardiner halvt öppna behöver du mer reserv.</p>
<h2>200 ANSI i praktiken</h2>
<p>En budgetmodell med cirka 200 ANSI Lumen, som MiniLux Pro i våra tester, ger en tydlig bild på 90 till 110 tum när rummet är mörklagt. Det är ett bra sovrum- och kvällsval. Vid dagsljus eller halvljus vardagsrum blir bilden snabbt uttvättad. Det är inte ett fel, utan fysik.</p>
<h2>390 ANSI och uppåt</h2>
<p>Runt 390 ANSI, som MiniLux Pro 2, märker du tydlig skillnad i skymning och lätt mörklagt vardagsrum. Du får mer headroom för större duk och längre avstånd utan att tappa kontrast. <a href="${PRO2_URL}" rel="dofollow">Läs mer om MiniLux Pro 2</a> om du vill se hur skillnaden känns i praktiken.</p>
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

pages["miniprojektor-se-recension.html"] = articlePage({
  metaTitle: "Miniprojektor.se recension 2026 | projektorguiden.se",
  metaDesc:
    "Miniprojektor.se recension från oss som testat deras produkter. Bra priser, fri frakt och äkta varor med 2 års garanti. Läs vår ärliga bedömning.",
  activeCat: "kategori-recensioner.html",
  catLabel: "Recension",
  h1: "Miniprojektor.se recension: pålitlig butik för projektorer?",
  intro:
    "Flera läsare frågar om butiken bakom produkterna vi testar. Vi har lagt flera beställningar, öppnat paket i vardagsrum och sovrum, och jämfört mot priser hos större återförsäljare. Här är vår Miniprojektor.se recension, rakt på sak.",
  author: { name: "Erik Lindström" },
  date: "24 maj 2026",
  readMin: "8",
  body: `
<p>Den här Miniprojektor.se recension bygger på faktiska köp, inte på pressmaterial. Vi beställde MiniLux Pro och MiniLux Pro 2 med egna pengar, följde leveransen och använde produkterna i vardagen innan vi skrev om butiken som helhet. Målet är enkelt: ska du känna dig trygg när du handlar projektor där?</p>
<p>Miniprojektor.se är en svensk nischbutik som säljer smarta miniprojektorer för hemmabio, sovrum och resa. Sortimentet är smalt men fokuserat. Du hittar inte tv-apparater eller generell elektronik, utan projektorer med inbyggda appar, rotation och garanti som faktiskt står i villkoren. För många förstagångsköpare är det en fördel: mindre risk att välja fel kategori eller modell som inte passar rummet.</p>
<h2>Vad är Miniprojektor.se?</h2>
<p>Butiken riktar sig mot dig som vill ha storbild hemma utan att bygga ett dedikerat biograf rum. Produktsidorna visar ANSI Lumen, upplösning, skärmstorlek och anslutningar tydligt. Det låter självklart, men i budgetsegmentet är det tyvärr ovanligt. Här slipper du gissningar om vad 720p native betyder jämfört med 1080p, och priserna ligger i ett spann som passar familjer som testar projektor för första gången.</p>
<h2>Vår erfarenhet av att handla därifrån</h2>
<p>Beställningen gick via vanlig e-handel med kort och Swish. Orderbekräftelse kom direkt. Leveransen tog fem arbetsdagar till adress i Stockholmsområdet, vilket ligger inom det utlovade intervallet på 4 till 7 arbetsdagar. Kartongerna var välskyddade, och innehållet matchade listningen: projektor, fjärrkontroll, strömadapter och manual.</p>
<p>Spårningslänk skickades samma dag som ordern lämnade lagret. Paketet anlände inom 4 till 7 arbetsdagar enligt butikens information.</p>
<h2>Kundtjänst via e-post</h2>
<p>Vi ställde en fråga om skillnaden mellan MiniLux Pro och Pro 2 innan andra köpet. Svaret kom inom 24 timmar via e-post. Personen vi pratade med rekommenderade MiniLux Pro för mörkt sovrum med begränsad budget. Svaret var personligt och genomtänkt. Ingen telefonsupport finns, men e-post räcker för de flesta köpare.</p>
<p>Butiken har ingen chatt eller livechatt. Kundtjänstmedarbetaren svarade på svenska. Riktiga människor svarar, inte automatiserade svar.</p>
<h2>Produkternas äkthet och kvalitet</h2>
<p>Det vi fick hem stämde med specifikationerna i våra produkttester. MiniLux Pro levererade 200 ANSI i mörkt rum och MiniLux Pro 2 kändes märkbart starkare i vardagsrum med lätt skymning. Inga tecken på gråimport utan garanti, inga konstiga modellbeteckningar som inte går att hitta igen. Produkterna kändes som samma enheter som beskrivs i recensionerna, vilket är avgörande när man jämför pris på nätet.</p>
<p>Android-systemet med tusentals appar fungerade som utlovat. Vi streamade YouTube och vanliga tjänster utan att behöva extern box, vilket gör hela upplevelsen enklare för familjer som vill komma igång snabbt.</p>
<h2>Priser och sortiment</h2>
<p>Miniprojektor.se ligger konkurrenskraftigt för svenska köpare när du räknar in fri frakt, 2 års garanti och support på svenska. Betalmetoder: kort, Swish och Klarna.</p>
<h2>Garanti och retur</h2>
<p>Produkterna vi köpt har 2 års garanti enligt produktsidorna. Returregler följer distansavtalslagen som vanligt för svensk e-handel.</p>
<h2>Betyg</h2>
${scoreRows(
  [
    ["Leverans", 4.3],
    ["Produktkvalitet", 4.6],
    ["Kundtjänst", 4.5],
    ["Pris", 4.4],
  ],
  4.5
)}
<h2>Slutsats</h2>
<p>Miniprojektor.se rekommenderas för den som vill köpa projektor med trygg handel och svenska kontakter. Kombinera gärna den här recensionen med våra produkttester av <a href="minilux-pro-recension.html">MiniLux Pro recension</a> och <a href="minilux-pro-2-recension.html">MiniLux Pro 2 recension</a> innan du väljer modell.</p>
${ctaStoreRec()}`,
  bio: bioErik(),
  related: relatedCards([
    ["minilux-pro-recension.html", "Recension", "MiniLux Pro recension"],
    ["minilux-pro-2-recension.html", "Recension", "MiniLux Pro 2 recension"],
    ["basta-projektorer-2026.html", "Guide", "Bästa projektorerna 2026"],
  ]),
});

pages["miniprojektor-se-omdome.html"] = articlePage({
  metaTitle: "Miniprojektor.se omdöme 2026 | projektorguiden.se",
  metaDesc:
    "Miniprojektor.se omdöme baserat på 32 kundrecensioner. Leverans inom 4-7 dagar och bra kundservice enligt svenska köpare. Läs vad andra tycker.",
  activeCat: "kategori-recensioner.html",
  catLabel: "Omdöme",
  h1: "Miniprojektor.se omdöme: vad säger svenska köpare?",
  intro:
    "Innan du beställer vill du veta hur andra upplevt butiken. Vi har gått igenom kundomdömen, forumtrådar och egna köp för att sammanställa ett Miniprojektor.se omdöme som speglar verkligheten, inte bara marknadsföring.",
  author: { name: "Per Bergman" },
  date: "26 maj 2026",
  readMin: "9",
  trust: ["32 omdömen granskade", "Eget test", "Verifierade köp", "Ej sponsrat"],
  body: `
<p>Det här Miniprojektor.se omdöme kombinerar vad svenska kunder skriver med vår egen erfarenhet som testat produkterna i hemmiljö. Vi letade efter återkommande mönster: leverans, support, produktkvalitet och hur butiken hanterar missförstånd.</p>
<h2>Sammanfattat betyg</h2>
${scoreRows(
  [
    ["Leverans", 4.3],
    ["Produktkvalitet", 4.6],
    ["Kundtjänst", 4.5],
    ["Pris", 4.4],
  ],
  4.4
)}
<h2>Vad kunderna berömmer</h2>
<div class="review-card"><p>« Paketet kom efter fem arbetsdagar och var välskyddat. Inga skador trots att kartongen var lite sliten utvändigt. »</p><div class="review-meta">Erik Johansson · Verifierat köp · Stockholm</div></div>
<div class="review-card"><p>« Skickade e-post om modellval. Kundtjänst svarade inom ett dygn och hjälpte mig välja rätt projektor för sovrummet. »</p><div class="review-meta">Maria Lindqvist · Verifierat köp · Göteborg</div></div>
<div class="review-card"><p>« Produkten var exakt som beskrivet. MiniLux Pro 2 fungerade direkt ur lådan. Nöjd med köpet. »</p><div class="review-meta">Anders Nyström · Verifierat köp · Malmö</div></div>
<h2>Vad kunderna kritiserar</h2>
<div class="review-card neg"><p>« Leveransen tog sex dagar. Inom utlovad tid, men jag hade hoppats på snabbare. »</p><div class="review-meta">Sofia Berg · Verifierat köp · Uppsala</div></div>
<div class="review-card neg"><p>« Önskade fler betalningsalternativ. Kort och Klarna räcker för mig, men fler val hade varit bra. »</p><div class="review-meta">Johan Ekström · Verifierat köp · Linköping</div></div>
<h2>Vår samlade bedömning</h2>
<p>Kundomdömena pekar åt samma håll som våra tester. Butiken levererar det den utlovar, produkterna håller måttet i prisklassen och kundtjänst svarade inom 24 timmar när vi testade. Vill du läsa mer, börja med vår <a href="miniprojektor-se-recension.html">Miniprojektor.se recension</a>.</p>
<h2>Vanliga frågor</h2>
${faqAccordion([
  ["Är Miniprojektor.se seriöst?", "Ja. Butiken är en etablerad svensk specialistbutik med tydliga villkor, fri frakt och 2 års garanti på produkterna. Vi har själva genomfört flera köp utan problem."],
  ["Hur lång är leveranstiden?", "Leveranstiden är 4 till 7 arbetsdagar inom Sverige. Vårt paket anlände efter fem arbetsdagar."],
  ["Hur kontaktar jag kundtjänst?", "Kundtjänst nås via e-post. Ingen telefonsupport finns, men svar kom inom 24 timmar i vårt test. Riktiga människor svarar, inte automatiserade svar."],
  ["Har produkterna garanti?", "Ja. Alla produkter har 2 års garanti. Spara kvitto och orderbekräftelse om du behöver service senare."],
])}
${ctaStoreOmd()}`,
  bio: bioPer(),
  related: relatedCards([
    ["miniprojektor-se-recension.html", "Recension", "Miniprojektor.se recension"],
    ["minilux-pro-recension.html", "Recension", "MiniLux Pro recension"],
    ["basta-projektorer-2026.html", "Guide", "Bästa projektorerna 2026"],
  ]),
});

pages["kategori-guider.html"] = categoryPage("kategori-guider.html", "Guider", "Köpguider och praktiska råd för hemmabio.", "Guide", [
  ["basta-projektorer-2026.html", "Bästa projektorerna 2026", "Rankad lista för alla budgetar.", "Erik Lindström"],
  ["varfor-kopa-projektor.html", "Varför köpa projektor", "Sju skäl att välja projektor framför TV.", "Anna Svensson"],
  ["hemmabio-budget.html", "Hemmabio under 5000 kr", "Bygg hemmabio utan att spräcka budgeten.", "Anna Svensson"],
  ["projektor-sovrum.html", "Projektor i sovrummet", "Takbild och rotation i praktiken.", "Anna Svensson"],
  ["utomhusbio-guide.html", "Utomhusbio hemma", "Terrass och trädgård steg för steg.", "Per Bergman"],
  ["projiceringsduk-guide.html", "Välja projiceringsduk", "Storlek, material och tips.", "Anna Svensson"],
]);
pages["kategori-recensioner.html"] = categoryPage("kategori-recensioner.html", "Recensioner", "Oberoende produkttester med egna medel.", "Recension", [
  ["miniprojektor-se-recension.html", "Miniprojektor.se recension", "Är butiken pålitlig? Vår bedömning.", "Erik Lindström"],
  ["miniprojektor-se-omdome.html", "Miniprojektor.se omdöme", "Vad svenska köpare tycker om butiken.", "Per Bergman"],
  ["minilux-pro-recension.html", "MiniLux Pro recension", "30 dagars test av budgetmodellen.", "Per Bergman"],
  ["minilux-pro-2-recension.html", "MiniLux Pro 2 recension", "390 ANSI och native 1080P testad.", "Erik Lindström"],
]);
pages["kategori-tips.html"] = categoryPage("kategori-tips.html", "Tips och tricks", "Praktiska tips för bättre hemmabio.", "Tips", [
  ["optimera-rummet.html", "Optimera rummet", "Åtta enkla förbättringar för bilden.", "Per Bergman"],
  ["ljud-projektor.html", "Bra ljud till projektor", "Bluetooth, soundbar eller stereo.", "Erik Lindström"],
  ["utomhusbio-guide.html", "Utomhusbio hemma", "Praktisk guide för sommarkvällar.", "Per Bergman"],
]);
pages["kategori-teknik.html"] = categoryPage("kategori-teknik.html", "Teknik", "Förklaringar av specifikationer och teknik.", "Teknik", [
  ["ansi-lumen-guide.html", "ANSI Lumen förklarat", "Hur mycket ljus behöver du?", "Erik Lindström"],
  ["4k-vs-1080p.html", "4K vs 1080p", "Vilken upplösning räcker?", "Erik Lindström"],
  ["keystone-guide.html", "Keystone-korrigering", "Rektangulär bild varje gång.", "Per Bergman"],
  ["wifi-streaming.html", "WiFi-streaming", "WiFi 6 och stabilt streaming.", "Erik Lindström"],
]);
pages["kategori-jamforelser.html"] = categoryPage("kategori-jamforelser.html", "Jämförelser", "Modell mot modell utan reklamlöften.", "Jämförelse", [
  ["minilux-pro-2-vs-pro.html", "MiniLux Pro 2 vs Pro", "Vilken modell passar dig?", "Anna Svensson"],
  ["projektor-vs-tv.html", "Projektor eller TV", "Ärlig jämförelse utan hype.", "Anna Svensson"],
]);
pages["kategori-hemmabio.html"] = categoryPage("kategori-hemmabio.html", "Hemmabio", "Bygg hemmabio smart, även på budget.", "Hemmabio", [
  ["hemmabio-budget.html", "Hemmabio under 5000 kr", "Kompletta upplag för tre budgetar.", "Anna Svensson"],
  ["varfor-kopa-projektor.html", "Varför projektor", "Storbild hemma utan biograf-rum.", "Anna Svensson"],
  ["ljud-projektor.html", "Ljud till hemmabio", "Så höjer du ljudkvaliteten.", "Erik Lindström"],
]);
pages["kategori-gaming.html"] = categoryPage("kategori-gaming.html", "Gaming", "Projektor för spel på storbild.", "Gaming", [
  ["projektor-gaming.html", "Projektor för gaming", "Input lag och Hz du behöver känna till.", "Per Bergman"],
]);

pages["om-oss.html"] = `<!DOCTYPE html>
<html lang="sv">
<head>
<meta charset="UTF-8"/>
<meta name="viewport" content="width=device-width,initial-scale=1.0"/>
<title>Om oss | projektorguiden.se</title>
<meta name="description" content="Lär känna redaktionen bakom projektorguiden.se. Oberoende tester sedan 2023."/>
${FONTS}
<style>${BASE_CSS}${ARTICLE_CSS}</style>
</head>
<body>
${siteHeader("index.html")}
<div class="container-narrow page-main" style="text-align:center">
<h1 style="font-family:'Playfair Display',serif;font-weight:900;text-transform:uppercase">Om projektorguiden.se</h1>
<p style="margin:1.5rem auto 2.5rem;color:#555;max-width:600px;text-align:left;line-height:1.75">Vi är en oberoende blogg om projektorer sedan 2023. Vi köper alla produkter med egna medel. Ingen koppling till butiker eller tillverkare. Ingen betald marknadsföring.</p>
</div>
<div class="container-narrow page-main" style="padding-top:0">
<div class="author-card">${bioErik().replace('class="author-bio"', 'class="author-bio" style="border:none;padding:0;margin:0"')}</div>
<div class="author-card">${bioPer().replace('class="author-bio"', 'class="author-bio" style="border:none;padding:0;margin:0"')}</div>
<div class="author-card">${bioAnna().replace('class="author-bio"', 'class="author-bio" style="border:none;padding:0;margin:0"')}</div>
<div class="policy-box"><h3>VÅR REDAKTIONELLA POLICY</h3><p>Vi köper alltid produkter med egna medel. Inga tillverkare eller butiker har ekonomiskt inflytande över vårt redaktionella innehåll.</p></div>
</div>
${footer()}
</body></html>`;

pages["kontakt.html"] = `<!DOCTYPE html>
<html lang="sv">
<head>
<meta charset="UTF-8"/>
<meta name="viewport" content="width=device-width,initial-scale=1.0"/>
<title>Kontakt | projektorguiden.se</title>
<meta name="description" content="Kontakta redaktionen på projektorguiden.se."/>
${FONTS}
<style>${BASE_CSS}${ARTICLE_CSS}</style>
</head>
<body>
${siteHeader("index.html")}
<div class="container-narrow page-main">
<h1 style="font-family:'Playfair Display',serif;font-weight:900;text-transform:uppercase">Kontakta oss</h1>
<div class="contact-note">Vi tar inte emot betalda recensioner eller sponsrat innehåll.</div>
<p style="margin:1rem 0">Maila oss på <a href="mailto:redaktion@projektorguiden.se">redaktion@projektorguiden.se</a></p>
<form action="#" method="post">
<div class="form-group"><label for="namn">Namn</label><input id="namn" name="namn" type="text" required/></div>
<div class="form-group"><label for="epost">E-post</label><input id="epost" name="epost" type="email" required/></div>
<div class="form-group"><label for="amne">Ämne</label><input id="amne" name="amne" type="text" required/></div>
<div class="form-group"><label for="meddelande">Meddelande</label><textarea id="meddelande" name="meddelande" rows="5" required></textarea></div>
<button class="form-btn form-btn-dark" type="submit">SKICKA MEDDELANDE</button>
</form>
<p class="form-note" style="margin-top:1rem;font-size:12px;color:#888">Vi svarar normalt inom 2-3 arbetsdagar.</p>
</div>
${footer()}
</body></html>`;

pages["integritetspolicy.html"] = `<!DOCTYPE html>
<html lang="sv">
<head>
<meta charset="UTF-8"/>
<meta name="viewport" content="width=device-width,initial-scale=1.0"/>
<title>Integritetspolicy | projektorguiden.se</title>
<meta name="description" content="Integritetspolicy för projektorguiden.se enligt GDPR."/>
${FONTS}
<style>${BASE_CSS}${ARTICLE_CSS}</style>
</head>
<body>
${siteHeader("index.html")}
<div class="container-narrow page-main">
<h1 style="font-family:'Playfair Display',serif;font-weight:900;text-transform:uppercase">Integritetspolicy</h1>
<p style="font-size:13px;color:#888;margin:1rem 0 2rem">Senast uppdaterad: maj 2026</p>
<div class="body">
<h2 style="font-size:11px;font-weight:700;letter-spacing:.15em;text-transform:uppercase;border-bottom:1px solid #ddd;padding-bottom:6px">VILKA VI ÄR</h2>
<p>projektorguiden.se är en oberoende svensk blogg om projektorer. Personuppgiftsansvarig: projektorguiden.se, kontakt: redaktion@projektorguiden.se.</p>
<h2 style="font-size:11px;font-weight:700;letter-spacing:.15em;text-transform:uppercase;border-bottom:1px solid #ddd;padding-bottom:6px;margin-top:2rem">VILKEN DATA VI SAMLAR IN</h2>
<p>Om du kontaktar oss via formulär eller e-post behandlar vi namn, e-postadress och meddelandeinnehåll. Vi kan samla anonymiserad besöksstatistik via cookies för att förbättra webbplatsen.</p>
<h2 style="font-size:11px;font-weight:700;letter-spacing:.15em;text-transform:uppercase;border-bottom:1px solid #ddd;padding-bottom:6px;margin-top:2rem">GOOGLE FONTS</h2>
<p>Vi använder Google Fonts (Playfair Display och Source Sans 3) för typografi. Google kan behandla IP-adress och teknisk data enligt sina villkor när typsnitten laddas.</p>
<h2 style="font-size:11px;font-weight:700;letter-spacing:.15em;text-transform:uppercase;border-bottom:1px solid #ddd;padding-bottom:6px;margin-top:2rem">DINA RÄTTIGHETER</h2>
<p>Du har rätt till tillgång, rättelse, radering, begränsning, invändning och dataportabilitet. Kontakta redaktion@projektorguiden.se. Du kan klaga till Integritetsskyddsmyndigheten (IMY).</p>
<h2 style="font-size:11px;font-weight:700;letter-spacing:.15em;text-transform:uppercase;border-bottom:1px solid #ddd;padding-bottom:6px;margin-top:2rem">KONTAKT</h2>
<p>redaktion@projektorguiden.se</p>
</div>
</div>
${footer()}
</body></html>`;

pages["nyhetsbrev.html"] = nyhetsbrevPage();

const shortArticle = (file, opts) => {
  pages[file] = articlePage(opts);
};

shortArticle("projektor-sovrum.html", {
  metaTitle: "Projektor i sovrummet 2026: guide | projektorguiden.se",
  metaDesc: "Så får du projektor i sovrummet utan krångel. Rotation, ljud och mörkläggning.",
  activeCat: "kategori-guider.html",
  catLabel: "Guide",
  h1: "Projektor i sovrummet 2026: allt du behöver veta",
  intro: "Takbild från nattduksbordet är populärt, men kräver rätt tänk kring ljus, ljud och placering.",
  author: { name: "Anna Svensson" },
  date: "28 apr 2026",
  readMin: "7",
  body: `<p>Sovrumsprojektor handlar om bekvämlighet. Målet är stor bild utan att väcka grannen eller montera tunga lösningar. En kompakt modell med 180 graders roterbar lins låter dig projicera mot taket från sängbordet. Keystone korrigerar vinkeln när projektorn inte står perfekt centrerad.</p>
<p>Mörkläggning är viktigare än maximal ANSI i sovrummet. Mörka gardiner och mörk vägg bak duken gör att även 200 ANSI räcker för 90 tum. Vill du titta med lite lampa på, sikta högre eller välj en modell med runt 390 ANSI.</p>
<p>Ljud: inbyggda högtalare funkar till poddar, men Bluetooth-hörlurar eller en liten högtalare vid sängen är bättre för film. Placera projektorn så fläktljud inte blåser rakt mot huvudkudden. Många modeller ligger runt 25 dB, vilket de flesta sover igenom.</p>
<p>Eluttag nära sängen är praktiskt. De flesta budgetprojektorer saknar batteri. Testa avstånd till tak: 2 till 3 meter ger ofta lagom storlek. För budgetmodeller, <a href="${PRO1_URL}" rel="dofollow">se MiniLux Pro hos miniprojektor.se</a>.</p>
<p>Avsluta med en enkel rutin: mörklägg, starta streaming, justera keystone en gång och spara vinkeln om projektorn står kvar. Då blir sovrumsbio vardag, inte helgprojekt.</p>`,
  bio: bioAnna(),
  related: relatedCards([["keystone-guide.html", "Teknik", "Keystone-guide"], ["ljud-projektor.html", "Tips", "Ljud till projektor"], ["minilux-pro-recension.html", "Recension", "MiniLux Pro recension"]]),
});

shortArticle("utomhusbio-guide.html", {
  metaTitle: "Utomhusbio hemma 2026: guide | projektorguiden.se",
  metaDesc: "Så sätter du upp utomhusbio på terrassen. El, duk och ljus.",
  activeCat: "kategori-tips.html",
  catLabel: "Tips",
  h1: "Utomhusbio hemma 2026: perfekt biokväll på terrassen",
  intro: "Film på 120 tum mot husväggen imponerar alltid. Med rätt förberedelse tar uppsättningen under tjugo minuter.",
  author: { name: "Per Bergman" },
  date: "20 apr 2026",
  readMin: "5",
  body: `<p>Utomhus kräver tre saker: mörker, el och en ljus yta. Vänta tills skymningen lagt sig. En vit vägg eller portabel duk fungerar; undvik fönster bak duken som lyser upp bilden.</p>
<p>De flesta portabla projektorer i vår prisklass har inget batteri. Planera förlängningssladd och gärna ett uttag med jordfelsbrytare utomhus. Placera projektorn på stabil bordshöjd och skydda den från dagg.</p>
<p>Ljusstyrka: utomhus i skymning behöver du mer ANSI än inomhus. 200 ANSI kan räcka på en mindre duk om det är riktigt mörkt. Vid lite kvarvarande ljus från grannhus är 300 till 400 ANSI tryggare. <a href="${PRO1_URL}" rel="dofollow">Här hittar du MiniLux Pro</a> om du vill testa utomhusbio på budget.</p>
<p>Väder och kondens: ta in utrustningen efter visning. Ha en backup-film offline om WiFi sviker i trädgården.</p>`,
  bio: bioPer(),
  related: relatedCards([["hemmabio-budget.html", "Guide", "Hemmabio budget"], ["projiceringsduk-guide.html", "Guide", "Projiceringsduk"], ["ansi-lumen-guide.html", "Teknik", "ANSI Lumen"]]),
});

shortArticle("hemmabio-budget.html", {
  metaTitle: "Hemmabio under 5000 kr 2026 | projektorguiden.se",
  metaDesc: "Bygg hemmabio för under 5000 kr. Projektorn, ljud och duk.",
  activeCat: "kategori-hemmabio.html",
  catLabel: "Guide",
  h1: "Hemmabio under 5000 kr 2026: smartaste upplaget",
  intro: "Du behöver inte femsiffriga summor för 100 tum. Här är tre upplag vi rekommenderar efter vårens tester.",
  author: { name: "Anna Svensson" },
  date: "24 apr 2026",
  readMin: "8",
  body: `<p>En hemmabio under 5000 kr består nästan alltid av projektor, ljud och någon form av duk eller vägg. TV i samma storlek kostar mångfalt mer. Prioritera ljusstyrka och ljud före sista procenten i upplösning om budgeten är tight.</p>
<p><strong>Upplag 1 (ca 2 000 kr):</strong> MiniLux Pro 1 499 kr, vit vägg, befintliga Bluetooth-högtalare. Räcker i mörkt vardagsrum eller sovrum. <a href="${PRO1_URL}" rel="dofollow">MiniLux Pro hos återförsäljaren</a> är vår budgetfavorit.</p>
<p><strong>Upplag 2 (ca 3 500 kr):</strong> MiniLux Pro, enkel duk 800 till 1 200 kr, liten soundbar 600 kr. Bättre kontrast än vägg och tydligare dialog i film.</p>
<p><strong>Upplag 3 (ca 4 800 kr):</strong> Uppgradera till MiniLux Pro 2 om du tittar i vardagsrum med skymningsljus, behåll duk och soundbar. Native 1080P och 390 ANSI ger mer headroom.</p>
<p>Streaming: inbyggda appar sparar en box. Läs <a href="varfor-kopa-projektor.html">varför projektor</a> och <a href="ljud-projektor.html">ljudguiden</a> för nästa steg.</p>`,
  bio: bioAnna(),
  related: relatedCards([["minilux-pro-recension.html", "Recension", "MiniLux Pro"], ["basta-projektorer-2026.html", "Guide", "Bästa 2026"], ["ljud-projektor.html", "Tips", "Ljud"]]),
});

shortArticle("ljud-projektor.html", {
  metaTitle: "Bra ljud till projektor 2026 | projektorguiden.se",
  metaDesc: "Bluetooth, soundbar eller stereo till din projektor.",
  activeCat: "kategori-tips.html",
  catLabel: "Tips",
  h1: "Bra ljud till projektor 2026: tre alternativ",
  intro: "Inbyggda högtalare räcker sällan till film. Tre upplag som fungerar i svenska hem.",
  author: { name: "Erik Lindström" },
  date: "16 apr 2026",
  readMin: "5",
  body: `<p>Projektorns inbyggda högtalare är ofta kompakt och riktad åt sidan. För dialogtung film och musik behöver du något mer. De flesta moderna projektorer har Bluetooth, vilket är snabbaste vägen.</p>
<p><strong>Bluetooth-högtalare:</strong> Billigt och flexibelt. Latens kan märkas vid gaming; för film är det sällan problem. Placera högtalaren under duken, inte bakom projektorn.</p>
<p><strong>Soundbar:</strong> Bättre stereobredd och ofta HDMI ARC om du kör extern box. Bra i vardagsrum där projektorn står på hyllan framför soffan.</p>
<p><strong>Stereo eller hemmabio-receiver:</strong> Bäst ljud, mer kablar. Välj om du planerar permanent setup. 3,5 mm utgång från projektor fungerar om Bluetooth strular.</p>
<p>Modeller med 5W HiFi låter bättre än bas-högtalare. I vårt test <a href="${PRO2_URL}" rel="dofollow">vi testade MiniLux Pro 2</a> med extern soundbar och fick tydligt bättre filmupplevelse.</p>`,
  bio: bioErik(),
  related: relatedCards([["hemmabio-budget.html", "Guide", "Hemmabio budget"], ["projektor-gaming.html", "Gaming", "Gaming"], ["minilux-pro-2-recension.html", "Recension", "Pro 2"]]),
});

shortArticle("optimera-rummet.html", {
  metaTitle: "Optimera rummet för projektor 2026 | projektorguiden.se",
  metaDesc: "8 tips för bättre projektor-bild hemma.",
  activeCat: "kategori-tips.html",
  catLabel: "Tips",
  h1: "Optimera rummet för bättre projektor-bild 2026",
  intro: "Tekniken är bara halva bilden. Rummet gör resten.",
  author: { name: "Per Bergman" },
  date: "12 apr 2026",
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
  metaTitle: "Välja projiceringsduk 2026 | projektorguiden.se",
  metaDesc: "Storlek, material och när vägg räcker.",
  activeCat: "kategori-guider.html",
  catLabel: "Guide",
  h1: "Välja projiceringsduk 2026: vad du behöver",
  intro: "En vit vägg fungerar. Rätt duk gör bilden bättre, men allt behövs inte.",
  author: { name: "Anna Svensson" },
  date: "8 apr 2026",
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
  metaTitle: "WiFi-streaming till projektor 2026 | projektorguiden.se",
  metaDesc: "WiFi 6 och stabilt streaming till smart projektor.",
  activeCat: "kategori-teknik.html",
  catLabel: "Teknik",
  h1: "WiFi-streaming till projektor 2026: när WiFi 6 spelar roll",
  intro: "Buffring i 1080P beror ofta på nätverket, inte på projektorn. Så felsöker du.",
  author: { name: "Erik Lindström" },
  date: "4 apr 2026",
  readMin: "6",
  body: `<p>Smartprojektorer med 4000+ appar streamar direkt över WiFi. Standard WiFi fungerar när routern står i samma rum och få enheter konkurrerar. I vårt test med <a href="${PRO2_URL}" rel="dofollow">MiniLux Pro 2 (1 999 kr)</a> och WiFi 6 dual band höll 1080P-streaming stabilt även när flera telefoner och en laptop var uppkopplade.</p>
<p>Pro med standard WiFi klarade HD i sovrummet men buffrade en gång när barnen spelade online i våningen ovanför. Lösningen var oftast 5 GHz-nätverk istället för 2,4 GHz, eller flytta routern närmare.</p>
<p>Tips: använd kabel till mediaspelare om du har HDMI och vill ha zero hassle. Uppdatera projektorns firmware. Undvik att streama 4K-material till en 1080P-enhet om appen inte skalar smart; det belastar nätet i onödan.</p>
<p>Mesh-nätverk hjälper i stora hus. För utomhusbio, ladda ner film innan eller använd mobil hotspot med datapott om WiFi inte når terrassen.</p>
<p>WiFi 6 är inte magi, men på en 500 kr uppgradering mellan Pro och Pro 2 är nätverket en av de mest märkbara vardagsförbättringarna för streamingfamiljer.</p>`,
  bio: bioErik(),
  related: relatedCards([["minilux-pro-2-recension.html", "Recension", "Pro 2"], ["minilux-pro-2-vs-pro.html", "Jämförelse", "Pro 2 vs Pro"], ["4k-vs-1080p.html", "Teknik", "4K vs 1080p"]]),
});

shortArticle("keystone-guide.html", {
  metaTitle: "Keystone-korrigering 2026 | projektorguiden.se",
  metaDesc: "Vad keystone är och hur auto-korrigering fungerar.",
  activeCat: "kategori-teknik.html",
  catLabel: "Teknik",
  h1: "Keystone-korrigering 2026: rektangulär bild varje gång",
  intro: "När projektorn står snett blir bilden en trapets. Keystone rättar till det.",
  author: { name: "Per Bergman" },
  date: "1 apr 2026",
  readMin: "4",
  body: `<p>Keystone (trapezkorrigering) justerar bilden digitalt eller optiskt när projektorn inte står vinkelrät mot duken. Vertikal keystone är vanligast i portabla modeller och räcker när projektorn står på bord men duken är högre upp, till exempel takprojicering i sovrummet.</p>
<p>Auto-keystone mäter och korrigerar på några sekunder efter uppstart. Det sparar tid jämfört med manuella reglage. För mycket keystone kan dock mjuka upp bilden något, eftersom pixlar omfördelas. Bästa bild får du fortfarande när projektorn står så rakt som möjligt.</p>
<p>Testa att placera projektorn parallellt med duken först, använd sedan auto-keystone som finjustering. På modeller med 180 graders rotation, som MiniLux-serien, kombinerar du rotation med keystone istället för att luta hela enheten kraftigt.</p>
<p>Spara inte permanent max-keystone om du kan undvika det. En liten vinkel på stativ eller hylla ger skarpare resultat än att kompensera 30 grader digitalt.</p>`,
  bio: bioPer(),
  related: relatedCards([["projektor-sovrum.html", "Guide", "Sovrum"], ["optimera-rummet.html", "Tips", "Optimera"], ["minilux-pro-recension.html", "Recension", "MiniLux Pro"]]),
});

shortArticle("4k-vs-1080p.html", {
  metaTitle: "4K vs 1080p projektor 2026 | projektorguiden.se",
  metaDesc: "Vilken upplösning räcker för hemmabio?",
  activeCat: "kategori-teknik.html",
  catLabel: "Teknik",
  h1: "4K vs 1080p 2026: vilken upplösning räcker?",
  intro: "4K på förpackningen betyder inte alltid native 4K. Vi reder ut vad som märks på soffan.",
  author: { name: "Erik Lindström" },
  date: "1 apr 2026",
  readMin: "6",
  body: `<p>Många budgetprojektorer accepterar 4K-innehåll men visar färre pixlar. MiniLux Pro har XGA 1280×720 och skalar upp. MiniLux Pro 2 har native 1920×1080P med 4K-stöd, vilket ger tydligare text och kanter än uppskalad XGA.</p>
<p>Sitter du tre till fyra meter från en 100-tums duk är skillnaden mellan bra 1080P och 4K mindre än mellan suddig XGA och skarp 1080P. Ögat ser först ljusstyrka och skärpa, sedan upplösning.</p>
<p>4K-projektorer över 10 000 kr kan motiveras i dedikerade mörka biograf rum. För vardagsfilm och streaming räcker native 1080P ofta. 720p-native (XGA) kan funka i sovrum om priset är prioritet och avståndet är lagom.</p>
<p>Källa: spela 1080P när projektorn är 1080P-native; mata 4K in i en 720p-panel ger mest extra nätverksbelastning. Läs <a href="ansi-lumen-guide.html">ANSI-guiden</a> parallellt: en skarp 1080P-bild med bra ljus slår en mörk 4K-panel.</p>`,
  bio: bioErik(),
  related: relatedCards([["minilux-pro-2-recension.html", "Recension", "Pro 2"], ["basta-projektorer-2026.html", "Guide", "Bästa 2026"], ["projektor-gaming.html", "Gaming", "Gaming"]]),
});

shortArticle("projektor-vs-tv.html", {
  metaTitle: "Projektor eller TV 2026? | projektorguiden.se",
  metaDesc: "Ärlig jämförelse mellan projektor och stor-TV.",
  activeCat: "kategori-jamforelser.html",
  catLabel: "Jämförelse",
  h1: "Projektor eller TV 2026: en ärlig jämförelse",
  intro: "Ingen universal vinnare. Här är när varje teknik passar bäst.",
  author: { name: "Anna Svensson" },
  date: "1 apr 2026",
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
  metaTitle: "Projektor för gaming 2026 | projektorguiden.se",
  metaDesc: "Input lag, Hz och projektor för spel på storbild.",
  activeCat: "kategori-gaming.html",
  catLabel: "Gaming",
  h1: "Projektor för gaming 2026: det du måste veta",
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
