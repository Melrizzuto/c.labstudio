/*
 * Builds the public CV preview (public/cv-preview/) from the full CV page, which is private (Supabase bucket "cv").
 *
 *   node scripts/cv-preview.mjs [path/to/full/index.html]     (default: ../cv-for-supabase/index.html)
 *
 * The preview keeps only the work experience: no name, no contacts, no real photo (the drawn portrait of Mel and Calì stays),
 * no skills, education, "more", PDF or GDPR line. It refuses to write if anything personal is left.
 * It also makes the sheet awkward to keep: a watermark, no selection, no right click, no copy, no print.
 * A screenshot can never be stopped on the web: the point is that the preview holds nothing personal.
 * Run it again whenever the full CV changes, then commit public/cv-preview.
 */
import { copyFile, mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const web = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const source = path.resolve(process.argv[2] ?? path.join(web, '..', 'cv-for-supabase', 'index.html'));
const out = path.join(web, 'public', 'cv-preview');

let html = await readFile(source, 'utf8');
const must = (re, what) => {
  if (!re.test(html)) throw new Error(`cv-preview: could not find ${what} in ${source}`);
};

/* the title of the tab */
html = html.replace(/<title>[^<]*<\/title>/, '<title>CV preview · c.lab studio</title>');

/* the name becomes the sheet's title, in each language */
must(/<h1>[^]*?<\/h1>/, 'the name (h1)');
let page = 0;
html = html.replace(/<h1>[^]*?<\/h1>/g, () => (page++ === 0 ? '<h1>Work<br>experience<span class="dot">.</span></h1>' : '<h1>Esperienze<br>di lavoro<span class="dot">.</span></h1>'));

/* contacts, portfolio and social links */
must(/<dl class="links">[^]*?<\/dl>/, 'the contact links');
html = html.replace(/<dl class="links">[^]*?<\/dl>/g, '');

/* the real photo goes; the drawn portrait of Mel and Calì stays (as portrait-art.webp) */
must(/<img class="ph-real"[^>]*>/, 'the photo');
html = html.replace(/<img class="ph-real"[^>]*>/g, '');
html = html.replace(/<img class="ph-art" src="portrait\.webp"/g, '<img class="ph-art" src="portrait-art.webp" draggable="false"');

/* skills, education and "more" */
must(/<section class="grid3">[^]*?<\/section>/, 'the skills / education block');
html = html.replace(/<section class="grid3">[^]*?<\/section>/g, '');

/* the GDPR line and the PDF button */
html = html.replace(/<span class="gdpr">[^]*?<\/span>/g, '');
html = html.replace(/<a class="dl"[^>]*>[^<]*<\/a>/g, '');
html = html.replace(/var dl=document\.getElementById\('dl'\);if\(dl\)dl\.href=[^;]*;/, '');

/* where the full CV comes from, at the bottom of each sheet */
const more = {
  en: '<p class="more-cta">The full CV (skills, education, contacts and PDF) comes with a personal link. <a href="/en/cv/" target="_top">Ask for it</a>.</p>',
  it: '<p class="more-cta">Il CV completo (competenze, formazione, contatti e PDF) arriva con un link personale. <a href="/cv/" target="_top">Chiedilo qui</a>.</p>',
};
let foot = 0;
html = html.replace(/<footer>/g, () => (foot++ === 0 ? more.en : more.it) + '<footer>');

/* the preview's look and its guards */
const style = `<style>
html,body{-webkit-user-select:none;user-select:none;-webkit-touch-callout:none}
img{pointer-events:none;-webkit-user-drag:none}
.more-cta{margin:5mm 0 0;padding:3mm 4mm;border:1pt dashed var(--ink);border-radius:2.5mm;font:600 10pt/1.4 var(--body)}
.more-cta a{color:var(--ink);font-weight:800}
body::after{content:"";position:fixed;inset:0;z-index:20;pointer-events:none;opacity:.09;
  background:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='340' height='200'%3E%3Ctext x='10' y='120' transform='rotate(-24 170 100)' font-family='monospace' font-weight='700' font-size='22' fill='%2316130f'%3EANTEPRIMA · PREVIEW%3C/text%3E%3C/svg%3E") repeat}
@media print{html,body{display:none!important}}
</style>
<meta name="robots" content="noindex, nofollow">
</head>`;
html = html.replace('</head>', style);

const guard = `<script>
(function(){
  var stop=function(e){e.preventDefault()};
  ['contextmenu','copy','cut','dragstart','selectstart'].forEach(function(t){document.addEventListener(t,stop)});
  document.addEventListener('keydown',function(e){
    var k=(e.key||'').toLowerCase();
    if((e.metaKey||e.ctrlKey)&&['s','p','c','a','u'].indexOf(k)>-1)e.preventDefault();
  });
})();
</script>
</body>`;
html = html.replace('</body>', guard);

/* nothing personal may be left */
const leaks = [/Melania/i, /Rizzuto/i, /gmail/i, /mailto:/i, /linkedin/i, /instagram/i, /github/i, /youtube/i, /photo\.jpg/, /portrait\.webp/, /\.pdf/i, /\+39/, /\b3\d{2}[\s.]?\d{3}[\s.]?\d{4}\b/];
const left = leaks.filter((re) => re.test(html));
if (left.length) throw new Error(`cv-preview: personal data still in the preview: ${left.join(', ')}`);

await mkdir(path.join(out, 'fonts'), { recursive: true });
await writeFile(path.join(out, 'index.html'), html);
const fonts = [...new Set([...html.matchAll(/url\("fonts\/([^"]+)"\)/g)].map((m) => m[1]))];
for (const f of fonts) await copyFile(path.join(web, 'private', 'cv', 'fonts', f), path.join(out, 'fonts', f));
await copyFile(path.join(path.dirname(source), 'portrait.webp'), path.join(out, 'portrait-art.webp'));
console.log(`cv-preview: wrote public/cv-preview/index.html (${fonts.length} fonts, the drawn portrait) from ${source}`);
