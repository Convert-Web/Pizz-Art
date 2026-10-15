/* =====================================================================
   LE TOUAREG — logique du site : carte, panier, commande WhatsApp
   Aucune dépendance. Les infos du restaurant sont dans window.SITE (index.html).
   Les plats sont générés depuis la carte fournie par le restaurant.
   ===================================================================== */
'use strict';
const SITE = window.SITE;

/* ============ LA CARTE ============
   price = prix du plat seul, menu = prix en menu (avec frites + boisson).
   img = photo (dossier img/), tile = illustration. meats/base/sauces = options à choisir. */
const CATEGORIES = [
  { id:'sandwichs', label:'Sandwichs' },
  { id:'tacos', label:'Tacos' },
  { id:'burgers', label:'Burgers' },
  { id:'pizzas', label:'Pizzas' },
  { id:'paninis', label:'Paninis & croques' },
  { id:'assiettes', label:'Assiettes' },
  { id:'buckets', label:'Buckets' },
  { id:'texmex', label:'Tex-Mex' },
  { id:'salades', label:'Salades' },
  { id:'desserts', label:'Desserts' },
  { id:'boissons', label:'Boissons' },
];

const PRODUCTS = [
  { id:1, cat:'sandwichs', name:'Sandwich chicken curry', desc:'Poulet mariné, sauce curry et fromage.', price:7.80, menu:10.40, tile:'wrap', sauces:1 },
  { id:2, cat:'sandwichs', name:'Sandwich kebab', desc:'Viande kebab, salade, tomates et oignons.', price:7.80, menu:10.40, pop:1, img:'kebab', sauces:1 },
  { id:3, cat:'sandwichs', name:'Sandwich paprika', desc:'Poulet mariné, paprika et crème fraîche.', price:7.80, menu:10.40, tile:'wrap', sauces:1 },
  { id:4, cat:'sandwichs', name:'Sandwich mixte', desc:'2 viandes au choix et fromage.', price:7.80, menu:10.40, tile:'wrap', meats:2, sauces:1 },
  { id:5, cat:'sandwichs', name:'Sandwich cordon bleu', desc:'Cordon bleu et fromage.', price:6.50, menu:8.45, pop:7, tile:'wrap', sauces:1 },
  { id:6, cat:'sandwichs', name:'Sandwich double croc', desc:'2 steaks 45 g, cordon bleu et fromage.', price:7.80, menu:10.40, tile:'wrap', sauces:1 },
  { id:7, cat:'sandwichs', name:'Sandwich Boursin', desc:'Garni au Boursin et au fromage.', price:7.80, menu:10.40, tile:'wrap', sauces:1 },
  { id:8, cat:'sandwichs', name:'Sandwich shempa', desc:'Chicken, crème fraîche, fromage râpé et champignons.', price:7.80, menu:10.40, tile:'wrap', sauces:1 },
  { id:9, cat:'sandwichs', name:'Sandwich Touareg', desc:'Steak viande hachée, œuf, fromage, olives, oignons et tomates.', price:7.80, menu:10.40, tile:'wrap', sauces:1 },
  { id:10, cat:'sandwichs', name:'Sandwich kefta', desc:'2 steaks, viande hachée et fromage.', price:7.80, menu:10.40, tile:'wrap', sauces:1 },
  { id:11, cat:'sandwichs', name:'Sandwich brochette d\'agneau', desc:'Brochette d\'agneau et fromage.', price:7.80, menu:10.40, tile:'wrap', sauces:1 },
  { id:12, cat:'sandwichs', name:'Sandwich américain', desc:'2 steaks 45 g, œuf et fromage.', price:9.10, menu:10.40, pop:4, tile:'wrap', sauces:1 },
  { id:13, cat:'sandwichs', name:'Sandwich forma', desc:'Viande au choix, crème fraîche, fromage râpé, lardons, œuf et galette de pommes de terre.', price:9.10, menu:11.05, tile:'wrap', meats:1, sauces:1 },
  { id:14, cat:'sandwichs', name:'Sandwich zinger rolo', desc:'Pita poulet façon KFC, bacon de dinde, steak 45 g, 1 galette de pommes de terre et fromage.', price:9.10, menu:11.05, tile:'wrap', sauces:1 },
  { id:15, cat:'sandwichs', name:'Sandwich spécial', desc:'Pita, viande marinée au choix, oignons frits, borcha et cordon bleu.', price:9.10, menu:11.05, tile:'wrap', meats:1, sauces:1 },
  { id:16, cat:'tacos', name:'Tacos L', desc:'1 viande au choix.', price:9.10, menu:11.05, img:'tacos', meats:1, sauces:1 },
  { id:17, cat:'tacos', name:'Tacos XL', desc:'2 viandes au choix.', price:10.40, menu:13.00, pop:2, img:'tacos', meats:2, sauces:1 },
  { id:18, cat:'burgers', name:'Double big burger', desc:'2 steaks 180 g, 2 fromages, salade et tomates.', price:10.40, menu:13.00, img:'burger', sauces:1 },
  { id:19, cat:'burgers', name:'Big burger', desc:'1 steak 180 g, 2 fromages, salade et tomates.', price:7.80, menu:10.40, pop:3, img:'burger', sauces:1 },
  { id:20, cat:'burgers', name:'Double big burger plus', desc:'2 steaks 180 g, galette de pommes de terre, œuf et 2 fromages.', price:13.00, menu:15.60, img:'burger', sauces:1 },
  { id:21, cat:'burgers', name:'Cheese burger', desc:'1 steak et fromage.', price:3.90, menu:7.15, pop:5, img:'burger', sauces:1 },
  { id:22, cat:'burgers', name:'Double cheeseburger', desc:'2 steaks et 2 fromages.', price:5.20, menu:8.45, pop:6, img:'burger', sauces:1 },
  { id:23, cat:'burgers', name:'Chicken burger', desc:'Chicken pané et fromage.', price:5.20, menu:7.80, tile:'burger', sauces:1 },
  { id:24, cat:'burgers', name:'Zinger burger', desc:'Poulet façon KFC et fromage.', price:5.85, menu:8.45, tile:'burger', sauces:1 },
  { id:25, cat:'burgers', name:'Fish burger', desc:'Poisson pané, salade, oignons et fromage.', price:4.55, menu:7.15, tile:'burger', sauces:1 },
  { id:26, cat:'burgers', name:'Burger maison', desc:'Steak viande hachée 100 g, fromage, raclette, salade, tomates et oignons.', price:7.15, menu:9.10, img:'burger', sauces:1 },
  { id:27, cat:'burgers', name:'Burger végétarien', desc:'Steak de pommes de terre, œuf et fromage.', price:5.20, menu:7.80, tile:'burger', sauces:1 },
  { id:28, cat:'pizzas', name:'Pizza Margherita', desc:'Base au choix, fromage et oignons. Taille sénior.', price:9.75, pop:9, tile:'pizza', base:1 },
  { id:29, cat:'pizzas', name:'Pizza Touareg', desc:'Base au choix, fromage, poulet, sauce fromagère et pommes de terre. Taille sénior.', price:9.75, tile:'pizza', base:1 },
  { id:30, cat:'pizzas', name:'Pizza combine', desc:'Base au choix, fromage, viande hachée, champignons et œuf. Taille sénior.', price:9.75, tile:'pizza', base:1 },
  { id:31, cat:'pizzas', name:'Pizza orientale', desc:'Base au choix, fromage, oignons, olives, merguez et œuf. Taille sénior.', price:9.75, tile:'pizza', base:1 },
  { id:32, cat:'pizzas', name:'Pizza saisons', desc:'Base au choix, fromage, jambon dinde, olives, poivrons et champignons. Taille sénior.', price:9.75, tile:'pizza', base:1 },
  { id:33, cat:'pizzas', name:'Pizza végétarienne', desc:'Base au choix, fromage, olives, poivrons, champignons et oignons. Taille sénior.', price:9.75, tile:'pizza', base:1 },
  { id:34, cat:'pizzas', name:'Pizza chèvre miel', desc:'Base au choix, fromage, chèvre et miel. Taille sénior.', price:9.75, tile:'pizza', base:1 },
  { id:35, cat:'pizzas', name:'Pizza chicken', desc:'Base au choix, fromage, chicken et pommes de terre. Taille sénior.', price:9.75, tile:'pizza', base:1 },
  { id:36, cat:'pizzas', name:'Pizza saumon', desc:'Base au choix, fromage, saumon et pommes de terre. Taille sénior.', price:9.75, tile:'pizza', base:1 },
  { id:37, cat:'pizzas', name:'Pizza thon', desc:'Base au choix, fromage, thon et olives. Taille sénior.', price:9.75, tile:'pizza', base:1 },
  { id:38, cat:'pizzas', name:'Pizza 3 viandes', desc:'Base et 3 viandes au choix et fromage. Taille sénior.', price:9.75, tile:'pizza', meats:3, meatList:'pizza', base:1 },
  { id:39, cat:'pizzas', name:'Pizza turque', desc:'Pâte fine façon turque, garniture et assaisonnement traditionnels.', price:5.85, menu:7.80, pop:10, tile:'turkish', sauces:1 },
  { id:40, cat:'paninis', name:'Panini thon', desc:'Panini pressé, garni de thon.', price:5.85, menu:8.45, pop:8, tile:'panini', sauces:1 },
  { id:41, cat:'paninis', name:'Panini fromage', desc:'Panini grillé, fromage fondu.', price:5.85, menu:8.45, tile:'panini', sauces:1 },
  { id:42, cat:'paninis', name:'Panini saumon', desc:'Pain panini pressé garni de saumon.', price:5.85, menu:8.45, tile:'panini', sauces:1 },
  { id:43, cat:'paninis', name:'Panini bolognaise', desc:'Panini garni de sauce bolognaise, pain pressé et chaud.', price:5.85, menu:8.45, tile:'panini', sauces:1 },
  { id:44, cat:'paninis', name:'Panini 1 viande', desc:'Panini garni d\'1 viande au choix.', price:5.85, menu:8.45, tile:'panini', meats:1, sauces:1 },
  { id:45, cat:'paninis', name:'Croque monsieur', desc:'Sandwich chaud au jambon et fromage.', price:3.90, menu:6.50, pop:11, tile:'croque' },
  { id:46, cat:'assiettes', name:'Assiette classique', desc:'1 viande au choix.', price:13.00, tile:'plate', meats:1, sauces:1 },
  { id:47, cat:'assiettes', name:'Assiette mixte', desc:'4 viandes au choix.', price:14.30, tile:'plate', meats:4, sauces:1 },
  { id:48, cat:'buckets', name:'Bucket frites', desc:'Seau de frites, format à partager.', price:2.60, img:'fries', sauces:1 },
  { id:49, cat:'buckets', name:'Bucket kebab', desc:'Viande kebab, format bucket.', price:9.10, tile:'bucket', sauces:1 },
  { id:50, cat:'buckets', name:'Bucket chicken', desc:'Morceaux de poulet servis en bucket, à partager.', price:9.10, tile:'bucket', sauces:1 },
  { id:51, cat:'texmex', name:'Nuggets', desc:'3 pièces.', price:2.60, img:'nuggets', sauces:1 },
  { id:52, cat:'texmex', name:'Tenders', desc:'3 pièces.', price:5.20, tile:'bites', sauces:1 },
  { id:53, cat:'texmex', name:'Camembert', desc:'3 pièces.', price:2.60, pop:12, tile:'bites', sauces:1 },
  { id:54, cat:'texmex', name:'Jalapeños', desc:'3 pièces.', price:3.90, tile:'bites', sauces:1 },
  { id:55, cat:'texmex', name:'Onion rings', desc:'3 pièces.', price:2.60, tile:'bites', sauces:1 },
  { id:56, cat:'salades', name:'Salade César', desc:'Salade, tomates, poulet frit, copeaux de fromage et maïs.', price:7.80, tile:'salad' },
  { id:57, cat:'salades', name:'Salade niçoise', desc:'Salade, tomates, olives, maïs et thon.', price:6.50, tile:'salad' },
  { id:58, cat:'salades', name:'Salade mixte', desc:'Salade, tomates et olives.', price:5.20, tile:'salad' },
  { id:59, cat:'desserts', name:'Tiramisu', desc:'Classique italien au café, biscuits imbibés et crème mascarpone, saupoudré de cacao.', price:3.90, tile:'tiramisu' },
  { id:60, cat:'desserts', name:'Tarte au Daim', desc:'Tarte garnie de Daim.', price:3.90, pop:13, tile:'dessert' },
  { id:61, cat:'boissons', name:'Pepsi', desc:'Boisson fraîche.', price:1.95, img:'pepsi' },
  { id:62, cat:'boissons', name:'Lipton Ice Tea', desc:'Boisson fraîche.', price:1.95, img:'lipton' },
  { id:63, cat:'boissons', name:'Coca-Cola', desc:'Boisson fraîche.', price:1.95, img:'coca' },
];


/* ============ COMPOSITION DES PLATS (à valider avec le restaurant) ============ */
const MEATS       = ['Kebab', 'Poulet mariné', 'Steak haché', 'Kefta', 'Merguez', 'Cordon bleu', 'Tenders', 'Nuggets'];
const MEATS_PIZZA = ['Poulet', 'Viande hachée', 'Merguez', 'Jambon de dinde', 'Kebab', 'Chicken'];
const SAUCES      = ['Blanche', 'Algérienne', 'Samouraï', 'Harissa', 'Ketchup', 'Mayonnaise', 'Barbecue', 'Andalouse', 'Curry', 'Fromagère'];
const BASES       = ['Tomate', 'Crème'];
const DRINKS      = ['Coca-Cola', 'Pepsi', 'Lipton Ice Tea'];
const MAX_SAUCES = 2;       // sauces par plat
const MAX_QTY = 15;         // quantité max dans la fiche d'un plat
const MAX_LINE_QTY = 30;    // quantité max d'une ligne du panier

/* Photos disponibles (img/<clé>-<largeur>.webp) et couleur des tuiles illustrées par catégorie */
const IMGS = { kebab:[240, 480], tacos:[240, 480], burger:[240, 480], fries:[240], nuggets:[240], pizza:[240], lipton:[240], pepsi:[240], coca:[240] };
const TILE_BG = { sandwichs:'saffron', tacos:'ember', burgers:'ember', pizzas:'chili', paninis:'chili', assiettes:'ember', buckets:'chili', texmex:'chili', salades:'saffron', desserts:'chili', boissons:'saffron' };
const CAT_VISUAL = { sandwichs:{ img:'kebab' }, tacos:{ img:'tacos' }, burgers:{ img:'burger' }, pizzas:{ img:'pizza' }, paninis:{ tile:'panini' }, assiettes:{ tile:'plate' },
                     buckets:{ img:'fries' }, texmex:{ img:'nuggets' }, salades:{ tile:'salad' }, desserts:{ tile:'dessert' }, boissons:{ img:'coca' } };
const CAT_NOTES = { pizzas:'Taille sénior' };
const KEYS = SITE.keys;

/* ============ OUTILS ============ */
const $  = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
const esc = (t) => String(t == null ? '' : t).replace(/[&<>"']/g, c => ({ '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;' }[c]));
const norm = (s) => String(s || '').toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[’]/g, "'").trim();
const debounce = (fn, ms) => { let t; return (...a) => { clearTimeout(t); t = setTimeout(() => fn(...a), ms); }; };
const reduceMotion = () => window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const fmtEUR = new Intl.NumberFormat('fr-FR', { style:'currency', currency:'EUR' });
const eur = (cents) => fmtEUR.format(cents / 100);

/* Prix : la carte × priceFactor (1 par défaut), calculés en centimes pour éviter les erreurs d'arrondi */
const FX = Number(SITE.priceFactor) > 0 ? Number(SITE.priceFactor) : 1;
const priceCents = (p, variant) => Math.round((variant === 'menu' && p.menu ? p.menu : p.price) * FX * 100);

const byId = (id) => PRODUCTS.find(p => p.id === id);
const catLabel = (id) => (CATEGORIES.find(c => c.id === id) || {}).label || id;
const needsConfig = (p) => !!(p.menu || p.meats || p.base || p.sauces);
const meatList = (p) => p.meatList === 'pizza' ? MEATS_PIZZA : MEATS;

/* Stockage local : ne plante jamais (navigation privée, stockage bloqué…) */
const LS = {
  get(k, fallback) { try { const v = localStorage.getItem(k); return v == null ? fallback : JSON.parse(v); } catch (e) { return fallback; } },
  set(k, v)        { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) {} },
  del(k)           { try { localStorage.removeItem(k); } catch (e) {} }
};

let toastTimer;
function hideToast() { const t = $('#toast'); if (t) t.classList.remove('show'); clearTimeout(toastTimer); }
function toast(msg, ms = 2400) {
  const t = $('#toast'); if (!t) return;
  t.textContent = msg;
  t.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => t.classList.remove('show'), ms);
}

/* Plats indisponibles : liste du site (soldOut) + ruptures marquées sur cet appareil */
const soldOutIds = new Set((SITE.soldOut || []).map(Number));
let stock = {};
const isOut = (p) => soldOutIds.has(p.id) || !!stock[p.id];

/* Favoris du client */
let favs = [];

/* =====================================================================
   Tuiles illustrées (pour les plats sans photo)
   ===================================================================== */
const TILE_SVG = (inner) => `<svg viewBox="0 0 100 100" fill="none" stroke="#2a1409" stroke-width="3" stroke-linejoin="round" stroke-linecap="round" aria-hidden="true" focusable="false">${inner}</svg>`;
const TILE_SCALE = (k, inner) => `<g transform="translate(50 52) scale(${k}) translate(-50 -52)">${inner}</g>`;
const TILES = {
  wrap: TILE_SVG(TILE_SCALE(1.15, `<g transform="rotate(16 50 52)">
    <path d="M34 30 L36 78 Q36 90 48 90 H52 Q64 90 64 78 L66 30 Z" fill="#f6c36b"/>
    <path d="M35 56 H65 L64 78 Q64 90 52 90 H48 Q36 90 36 78 Z" fill="#fff"/>
    <path d="M35.6 68 H64.4" stroke="#d93a1c" stroke-width="5"/>
    <ellipse cx="50" cy="30" rx="16.5" ry="6.5" fill="#fff4d6"/>
    <path d="M36 28 q2 -10 7 -5 q3 -9 8 -3 q5 -8 9 0 q5 -3 5 6 q-8 6 -29 2 z" fill="#6fd94b"/>
    <circle cx="44" cy="25" r="4.6" fill="#ff4b3e"/>
    <rect x="52" y="20" width="9" height="5" rx="2.5" fill="#7a3f22" transform="rotate(-18 56 22)"/></g>`)),
  burger: TILE_SVG(`<path d="M17 46 C17 26 31 16 50 16 C69 16 83 26 83 46 Z" fill="#f6a43e"/>
    <g fill="#fff4d6" stroke="none"><ellipse cx="36" cy="28" rx="3.2" ry="1.7" transform="rotate(-20 36 28)"/><ellipse cx="53" cy="23" rx="3.2" ry="1.7"/><ellipse cx="67" cy="32" rx="3.2" ry="1.7" transform="rotate(25 67 32)"/><ellipse cx="46" cy="37" rx="3.2" ry="1.7"/></g>
    <rect x="14" y="56" width="72" height="14" rx="7" fill="#7a3f22"/>
    <path d="M13 50 q6.5 8 13 0 q6.5 8 13 0 q6.5 8 13 0 q6.5 8 13 0 q6.5 8 13 0 q3 -3 1 -6 H12 q-2 3 1 6 z" fill="#6fd94b"/>
    <path d="M18 62 H82 L74 72 L65 64 L57 72 L49 64 L41 72 L33 64 L26 72 Z" fill="#ffd83a"/>
    <path d="M16 74 H84 V78 Q84 86 76 86 H24 Q16 86 16 78 Z" fill="#f6a43e"/>`),
  pizza: TILE_SVG(`<path d="M12 32 Q50 4 88 32 L50 92 Z" fill="#ffd83a"/>
    <path d="M10 34 Q50 2 90 34 L83 45 Q50 21 17 45 Z" fill="#e8963a"/>
    <circle cx="40" cy="52" r="6.5" fill="#e8412c"/><circle cx="60" cy="55" r="6.5" fill="#e8412c"/><circle cx="50" cy="73" r="6" fill="#e8412c"/>
    <circle cx="50" cy="56" r="2.4" fill="#2d7a2d" stroke-width="2"/><circle cx="36" cy="67" r="2.4" fill="#2d7a2d" stroke-width="2"/>`),
  panini: TILE_SVG(TILE_SCALE(1.08, `<rect x="12" y="54" width="76" height="26" rx="10" fill="#f6c36b"/>
    <path d="M15 54 q5 11 10 0 q5 11 10 0 q5 11 10 0 q5 11 10 0 q5 11 10 0 q5 9 10 0 z" fill="#ffd83a"/>
    <rect x="12" y="30" width="76" height="26" rx="10" fill="#f6c36b"/>
    <path d="M30 36 l7 14 M48 36 l7 14 M66 36 l7 14" stroke="#b4701f" stroke-width="3.4"/>`)),
  croque: TILE_SVG(TILE_SCALE(1.12, `<rect x="18" y="54" width="64" height="28" rx="8" fill="#f6c36b"/>
    <rect x="13" y="44" width="74" height="14" rx="7" fill="#ff9aa2"/>
    <path d="M20 46 C20 24 80 24 80 46 q-6 8 -10 2 q-6 8 -12 0 q-6 8 -12 0 q-6 8 -12 0 q-6 6 -10 -2 z" fill="#ffd83a"/>`)),
  plate: TILE_SVG(`<circle cx="50" cy="52" r="38" fill="#fff"/>
    <circle cx="50" cy="52" r="27" fill="none" stroke="#d9d3c2" stroke-width="3"/>
    <path d="M24 50 q8 -14 24 -8 q14 6 6 20 q-12 10 -26 0 q-6 -6 -4 -12 z" fill="#7a3f22"/>
    <rect x="58" y="34" width="6" height="28" rx="3" fill="#ffd83a" transform="rotate(18 61 48)"/>
    <rect x="66" y="36" width="6" height="26" rx="3" fill="#ffd83a" transform="rotate(8 69 49)"/>
    <rect x="52" y="38" width="6" height="26" rx="3" fill="#ffd83a" transform="rotate(30 55 51)"/>
    <circle cx="38" cy="68" r="6" fill="#6fd94b"/><circle cx="49" cy="72" r="5" fill="#ff4b3e"/>`),
  bucket: TILE_SVG(`<path d="M24 36 q-6 -14 6 -18 q12 -4 16 6 q4 10 -4 14 z" fill="#f0a640"/>
    <path d="M44 32 q-3 -14 11 -17 q13 -3 16 9 q3 13 -10 16 z" fill="#f0a640"/>
    <path d="M60 40 q-2 -12 10 -14 q11 -2 13 9 q2 10 -9 12 z" fill="#f0a640"/>
    <path d="M24 42 L31 90 H69 L76 42 Z" fill="#fff"/>
    <path d="M33 42 L36.5 90 H44.5 L41 42 Z" fill="#ff4b3e"/><path d="M59 42 L55.5 90 H63.5 L67 42 Z" fill="#ff4b3e"/>
    <rect x="20" y="36" width="60" height="11" rx="5.5" fill="#ff4b3e"/>`),
  bites: TILE_SVG(`<path d="M10 58 q-4 -16 12 -20 q16 -4 20 10 q4 16 -12 20 q-16 4 -20 -10z" fill="#f0a640"/>
    <path d="M38 36 q-3 -14 13 -17 q15 -3 18 10 q3 14 -12 17 q-16 3 -19 -10z" fill="#f0a640"/>
    <path d="M46 68 q-3 -14 12 -17 q15 -3 18 11 q3 13 -12 16 q-15 3 -18 -10z" fill="#f0a640"/>
    <g stroke="none" fill="#c97a1c"><circle cx="24" cy="48" r="1.8"/><circle cx="32" cy="56" r="1.8"/><circle cx="52" cy="30" r="1.8"/><circle cx="60" cy="38" r="1.8"/><circle cx="58" cy="62" r="1.8"/><circle cx="68" cy="72" r="1.8"/></g>
    <path d="M12 76 H34 L31 92 H15 Z" fill="#fff"/><ellipse cx="23" cy="76" rx="11" ry="3.6" fill="#ff4b3e"/>`),
  salad: TILE_SVG(`<path d="M12 50 H88 C88 74 72 88 50 88 C28 88 12 74 12 50 Z" fill="#fff"/>
    <path d="M14 50 C8 34 24 22 36 32 C40 18 60 18 64 32 C76 22 94 36 86 50 Z" fill="#6fd94b"/>
    <circle cx="38" cy="43" r="6" fill="#ff4b3e"/><circle cx="60" cy="40" r="6" fill="#ff4b3e"/>
    <circle cx="50" cy="47" r="2.4" fill="#ffd83a" stroke-width="2"/><circle cx="73" cy="46" r="2.4" fill="#ffd83a" stroke-width="2"/><circle cx="26" cy="46" r="2.4" fill="#ffd83a" stroke-width="2"/>`),
  dessert: TILE_SVG(TILE_SCALE(1.22, `<path d="M14 62 H58 V82 Q58 86 54 86 H18 Q14 86 14 82 Z" fill="#f6d9a0"/>
    <path d="M14 62 L34 42 H78 L58 62 Z" fill="#7a3f22"/>
    <path d="M58 62 L78 42 V64 L58 84 Z" fill="#e0b672"/>
    <path d="M14 74 H58" stroke-width="3"/>
    <circle cx="52" cy="50" r="5.5" fill="#ff4b3e"/><path d="M52 44 q2 -6 8 -6" stroke-width="2.6"/>`)),
  tiramisu: TILE_SVG(`<path d="M12 48 L30 32 H90 L72 48 Z" fill="#7a3f22"/>
    <rect x="12" y="48" width="60" height="34" fill="#fff4d6"/>
    <path d="M72 48 L90 32 V66 L72 82 Z" fill="#e8cf9f"/>
    <path d="M12 58 H72 M12 66 H72 M12 74 H72" stroke-width="2.6"/>
    <rect x="12" y="58" width="60" height="8" fill="#b97a43" stroke="none"/><rect x="12" y="74" width="60" height="8" fill="#b97a43" stroke="none"/>
    <path d="M12 48 H72 V82 H12 Z" fill="none"/>
    <g stroke="none" fill="#4a230f"><circle cx="38" cy="40" r="1.8"/><circle cx="52" cy="38" r="1.8"/><circle cx="66" cy="38" r="1.8"/><circle cx="46" cy="44" r="1.8"/><circle cx="74" cy="42" r="1.8"/></g>`),
  turkish: TILE_SVG(TILE_SCALE(1.12, `<path d="M8 54 Q50 12 92 54 Q50 90 8 54 Z" fill="#f6c36b"/>
    <path d="M24 54 Q50 32 76 54 Q50 72 24 54 Z" fill="#ff7a4a"/>
    <circle cx="38" cy="53" r="3.4" fill="#6fd94b" stroke-width="2.4"/><circle cx="52" cy="48" r="3.4" fill="#6fd94b" stroke-width="2.4"/><circle cx="62" cy="57" r="3.4" fill="#6fd94b" stroke-width="2.4"/>
    <path d="M44 60 l8 -2" stroke="#7a3f22" stroke-width="4"/>`)),
  can: TILE_SVG(`<rect x="30" y="20" width="40" height="66" rx="8" fill="#d93a1c"/>
    <rect x="30" y="40" width="40" height="22" fill="#fff"/>
    <ellipse cx="50" cy="20" rx="20" ry="5.5" fill="#d9d3c2"/>`)
};


/* =====================================================================
   HORAIRES : calculés en heure de Paris, quel que soit le fuseau du visiteur
   ===================================================================== */
const DAYS = ['dimanche', 'lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi'];
const cap = (s) => s.charAt(0).toUpperCase() + s.slice(1);
const toMin = (hhmm) => { const [h, m] = String(hhmm).split(':'); return (+h) * 60 + (+m || 0); };
const fmtHM = (min) => { const m = ((Math.round(min) % 1440) + 1440) % 1440; return `${Math.floor(m / 60)}h${String(m % 60).padStart(2, '0')}`; };

const parisFmt = new Intl.DateTimeFormat('en-US', { timeZone:'Europe/Paris', weekday:'short', hour:'2-digit', minute:'2-digit', hourCycle:'h23' });
function parisNow(d = new Date()) {
  const parts = {};
  parisFmt.formatToParts(d).forEach(p => { parts[p.type] = p.value; });
  return { dow: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].indexOf(parts.weekday), min: (parseInt(parts.hour, 10) % 24) * 60 + parseInt(parts.minute, 10) };
}

/* Créneaux d'un jour en minutes depuis minuit ; une fermeture après minuit donne une fin > 1440 */
function hoursFor(dow) {
  const raw = (SITE.hours && SITE.hours[dow]) || [];
  return raw.map(([o, c]) => { const a = toMin(o); let b = toMin(c); if (b <= a) b += 1440; return [a, b]; });
}

/* Tous les créneaux d'hier à dans 7 jours, en minutes depuis minuit aujourd'hui (Paris) */
function weekIntervals(now) {
  const out = [];
  for (let k = -1; k <= 7; k++) {
    const dow = (now.dow + k + 7) % 7;
    hoursFor(dow).forEach(([a, b]) => out.push({ start: k * 1440 + a, end: k * 1440 + b, k, dow }));
  }
  return out.sort((x, y) => x.start - y.start);
}

function getStatus() {
  const now = parisNow();
  const ints = weekIntervals(now);
  const cur = ints.find(i => i.start <= now.min && now.min < i.end);
  if (cur) { const left = cur.end - now.min; return { open: true, soon: left <= 30, closeAt: cur.end, left, now, ints }; }
  const next = ints.find(i => i.start > now.min) || null;
  return { open: false, next, now, ints };
}

function whenLabel(k, dow, startMin) {
  const t = fmtHM(startMin);
  if (k === 0) return `à ${t}`;
  if (k === 1) return `demain à ${t}`;
  return `${DAYS[dow]} à ${t}`;
}

function statusText(s) {
  if (s.open) return s.soon ? `Ferme bientôt, à ${fmtHM(s.closeAt)}` : `Ouvert jusqu'à ${fmtHM(s.closeAt)}`;
  if (s.next) return `Fermé, ouvre ${whenLabel(s.next.k, s.next.dow, s.next.start)}`;
  return 'Fermé';
}

function updateStatus() {
  const s = getStatus();
  const text = statusText(s);
  $$('[data-status]').forEach(el => {
    el.classList.toggle('is-open', s.open && !s.soon);
    el.classList.toggle('is-soon', s.open && s.soon);
    el.classList.toggle('is-closed', !s.open);
    const t = $('[data-status-text]', el);
    if (t && t.textContent !== text) t.textContent = text;
  });
  document.documentElement.dataset.open = s.open ? '1' : '0';
  renderHours();
  return s;
}

/* Tableau des horaires : les jours identiques sont regroupés (lundi à dimanche → « Tous les jours ») */
function rangesLabel(ranges) {
  if (!ranges.length) return 'Fermé';
  return ranges.map(([a, b]) => `${fmtHM(a)} – ${fmtHM(b)}`).join(' et ');
}
function hoursGroups() {
  const order = [1, 2, 3, 4, 5, 6, 0];
  const groups = [];
  order.forEach(d => {
    const label = rangesLabel(hoursFor(d));
    const g = groups[groups.length - 1];
    if (g && g.label === label) g.days.push(d); else groups.push({ label, days: [d] });
  });
  return groups.map(g => {
    const names = g.days.map(d => DAYS[d]);
    const dayLabel = g.days.length === 7 ? 'Tous les jours' : (names.length === 1 ? cap(names[0]) : `${cap(names[0])} au ${names[names.length - 1]}`);
    return { ...g, dayLabel };
  });
}
function renderHours() {
  const el = $('#hoursList'); if (!el) return;
  const today = parisNow().dow;
  el.innerHTML = hoursGroups().map(g =>
    `<div class="hours-row${g.days.includes(today) ? ' today' : ''}"><dt>${esc(g.dayLabel)}</dt><dd>${esc(g.label)}</dd></div>`).join('');
}
/* Courte phrase pour le bandeau, la FAQ et les données structurées */
function hoursSummary() {
  const gs = hoursGroups();
  if (gs.length === 1 && gs[0].days.length === 7) return `7j/7, ${gs[0].label}`;
  return gs.map(g => `${g.dayLabel} ${g.label}`).join(', ');
}
function hoursSentence() {
  const gs = hoursGroups();
  if (gs.length === 1 && gs[0].days.length === 7) return `Tous les jours, de ${gs[0].label.replace(/ – /g, ' à ')}.`;
  return gs.map(g => `${g.dayLabel} : ${g.label.replace(/ – /g, ' à ')}`).join(' ; ') + '.';
}

/* Retrait : « dès que possible » si ouvert, sinon créneaux du prochain jour d'ouverture (toutes les 15 min) */
function pickupOptions() {
  const s = getStatus();
  const lead = Number(SITE.prepMinutes) || 15, step = 15, lastBuffer = 10;
  const slots = [];
  let day = null;
  for (const i of s.ints) {
    if (i.end <= s.now.min + lead) continue;
    if (day !== null && i.k !== day) break;
    let t = Math.ceil((Math.max(i.start, s.now.min) + lead) / step) * step;   // après l'ouverture : on laisse le temps de préparer
    for (; t <= i.end - lastBuffer; t += step) {
      if (day === null) day = i.k;
      slots.push({ value: String(t), label: fmtHM(t), k: i.k, dow: i.dow });
    }
  }
  const dayLabel = slots.length ? (slots[0].k === 0 ? "Aujourd'hui" : slots[0].k === 1 ? 'Demain' : cap(DAYS[slots[0].dow])) : '';
  return { asap: s.open, slots, dayLabel, status: s };
}


/* =====================================================================
   LA CARTE : visuels, cartes produit, filtres, recherche, favoris
   ===================================================================== */
const filt = { cat: 'all', q: '', budget: 'all', favs: false };
const SIZES_CARD = '(min-width:620px) 300px, 112px';

function imgHTML(key, sizes) {
  const sz = IMGS[key]; if (!sz) return '';
  const srcset = sz.length > 1 ? ` srcset="${sz.map(w => `img/${key}-${w}.webp ${w}w`).join(', ')}" sizes="${sizes}"` : '';
  return `<img src="img/${key}-${sz[0]}.webp"${srcset} width="240" height="240" alt="" loading="lazy" decoding="async">`;
}
const tileHTML = (name, bg) => `<span class="tile t-${bg}">${TILES[name] || TILES.wrap}</span>`;
/* Rang de chaque plat dans sa catégorie : sert à alterner les couleurs des tuiles illustrées */
const TILE_SEQ = ['saffron', 'ember', 'chili'];
const CAT_RANK = (() => { const n = {}, r = {}; PRODUCTS.forEach(p => { n[p.cat] = n[p.cat] || 0; r[p.id] = n[p.cat]++; }); return r; })();
const tileBg = (p) => TILE_SEQ[(Math.max(0, TILE_SEQ.indexOf(TILE_BG[p.cat])) + (CAT_RANK[p.id] || 0)) % TILE_SEQ.length];
function visualHTML(p, sizes = SIZES_CARD) {
  if (p.img && IMGS[p.img]) return imgHTML(p.img, sizes);
  return tileHTML(p.tile, tileBg(p));
}
function catVisualHTML(catId) {
  const v = CAT_VISUAL[catId] || {};
  if (v.img) return imgHTML(v.img, '48px');
  return tileHTML(v.tile || 'wrap', TILE_BG[catId] || 'saffron');
}

function cardHTML(p, o = {}) {
  const out = isOut(p), fav = favs.includes(p.id), cfgd = needsConfig(p);
  const menuPrice = p.menu ? `<small>Menu ${eur(priceCents(p, 'menu'))}</small>` : '';
  return `<article class="card${o.v ? ' card--v' : ''}${out ? ' is-out' : ''}"${o.noId ? '' : ` id="p-${p.id}"`} data-pid="${p.id}">
    <button class="card-hit" type="button" tabindex="-1" aria-hidden="true" data-action="pick" data-id="${p.id}"></button>
    <div class="card-media">${visualHTML(p)}${p.pop && !o.rank ? '<span class="tag-pop"><svg class="i i-fill"><use href="#i-star"/></svg>Populaire</span>' : ''}${o.rank ? `<span class="rank">#${o.rank}</span>` : ''}${out ? '<span class="tag-out">Épuisé</span>' : ''}</div>
    <button class="fav${fav ? ' is-fav' : ''}" type="button" data-action="fav" data-id="${p.id}" aria-pressed="${fav}" aria-label="${esc(p.name)} : ${fav ? 'retirer des favoris' : 'ajouter aux favoris'}"><svg class="i"><use href="#i-heart"/></svg></button>
    <div class="card-body">
      <h3 class="card-name">${esc(p.name)}</h3>
      <p class="card-desc">${esc(p.desc)}</p>
      <div class="card-foot">
        <div class="price">${eur(priceCents(p, 'seul'))}${menuPrice}</div>
        <button class="add" type="button" data-action="pick" data-id="${p.id}"${out ? ' disabled' : ''} aria-label="${out ? 'Épuisé : ' : (cfgd ? 'Composer : ' : 'Ajouter : ')}${esc(p.name)}"><svg class="i"><use href="#i-plus"/></svg></button>
      </div>
    </div>
  </article>`;
}

/* ---------- Les plus commandés ---------- */
function renderStars() {
  const el = $('#starsTrack'); if (!el) return;
  const list = PRODUCTS.filter(p => p.pop).sort((a, b) => a.pop - b.pop).slice(0, 10);
  el.innerHTML = list.map((p, i) => cardHTML(p, { v: true, rank: i + 1, noId: true })).join('');
}
function initStarsNav() {
  const tr = $('#starsTrack'); if (!tr) return;
  const go = (dir) => tr.scrollBy({ left: dir * Math.max(260, Math.round(tr.clientWidth * 0.8)), behavior: reduceMotion() ? 'auto' : 'smooth' });
  $('#starsPrev').addEventListener('click', () => go(-1));
  $('#starsNext').addEventListener('click', () => go(1));
}

/* ---------- Filtres ---------- */
function renderCatChips() {
  const el = $('#catChips'); if (!el) return;
  el.innerHTML = [{ id: 'all', label: 'Tout' }, ...CATEGORIES]
    .map(c => `<button class="chip" type="button" data-cat="${c.id}" aria-pressed="${filt.cat === c.id}">${esc(c.label)}</button>`).join('');
}
function syncFilterUI() {
  $$('#catChips .chip').forEach(b => b.setAttribute('aria-pressed', String(b.dataset.cat === filt.cat)));
  $$('#budgetChips [data-budget]').forEach(b => b.setAttribute('aria-pressed', String(b.dataset.budget === filt.budget)));
  const fc = $('#favChip'); if (fc) fc.setAttribute('aria-pressed', String(filt.favs));
  const n = $('#favCount'); if (n) n.textContent = favs.length;
  const clr = $('#menuSearchClear'); if (clr) clr.hidden = !filt.q;
}
function filtered() {
  const words = norm(filt.q).split(/\s+/).filter(Boolean);
  return PRODUCTS.filter(p => {
    if (filt.cat !== 'all' && p.cat !== filt.cat) return false;
    if (filt.favs && !favs.includes(p.id)) return false;
    if (filt.budget !== 'all') {
      const c = priceCents(p, 'seul') / 100;
      if (filt.budget === 'lt6' && !(c <= 6)) return false;
      if (filt.budget === '6to10' && !(c > 6 && c <= 10)) return false;
      if (filt.budget === 'gt10' && !(c > 10)) return false;
    }
    if (words.length) {
      const hay = norm(`${p.name} ${p.desc} ${catLabel(p.cat)}`);
      if (!words.every(w => hay.includes(w))) return false;
    }
    return true;
  });
}

function renderMenu() {
  const root = $('#menuRoot'), empty = $('#menuEmpty'); if (!root) return;
  syncFilterUI();
  const list = filtered();
  if (!list.length) {
    root.innerHTML = '';
    const onlyFavs = filt.favs && !favs.length && filt.cat === 'all' && !filt.q && filt.budget === 'all';
    $('#menuEmptyTitle').textContent = onlyFavs ? 'Pas encore de favori' : 'Rien ne correspond';
    $('#menuEmptyText').textContent = onlyFavs ? "Touche le cœur d'un plat pour le retrouver ici."
      : (filt.q ? `Aucun plat pour « ${filt.q} ». Essaie un autre mot ou enlève un filtre.` : 'Aucun plat dans cette sélection. Enlève un filtre pour voir toute la carte.');
    empty.hidden = false;
    return;
  }
  empty.hidden = true;
  const groups = new Map();
  list.forEach(p => { if (!groups.has(p.cat)) groups.set(p.cat, []); groups.get(p.cat).push(p); });
  root.innerHTML = CATEGORIES.filter(c => groups.has(c.id)).map(c => `
    <section class="cat" id="cat-${c.id}" aria-labelledby="cat-t-${c.id}">
      <div class="cat-head">
        <span class="cat-vis" aria-hidden="true">${catVisualHTML(c.id)}</span>
        <h3 class="cat-title" id="cat-t-${c.id}">${esc(c.label)}</h3>
        <span class="cat-count" aria-label="${groups.get(c.id).length} plats">${groups.get(c.id).length}</span>
        <span class="cat-line" aria-hidden="true"></span>
        ${CAT_NOTES[c.id] ? `<span class="cat-note">${esc(CAT_NOTES[c.id])}</span>` : ''}
      </div>
      <div class="grid">${groups.get(c.id).map(p => cardHTML(p)).join('')}</div>
    </section>`).join('');
}

function setFilter(patch, scroll) {
  Object.assign(filt, patch);
  renderMenu();
  if (scroll) scrollToMenuTop();
}
function scrollToMenuTop() {
  const root = $('#menuRoot'), bar = $('#catbar'); if (!root) return;
  const limit = (bar ? bar.getBoundingClientRect().bottom : 0) + 12;
  const top = root.getBoundingClientRect().top;
  if (top < limit) window.scrollTo({ top: window.scrollY + top - limit, behavior: reduceMotion() ? 'auto' : 'smooth' });
}
function resetFilters() {
  Object.assign(filt, { cat: 'all', q: '', budget: 'all', favs: false });
  const input = $('#menuSearch'); if (input) input.value = '';
  renderMenu();
}

function bindMenuEvents() {
  const input = $('#menuSearch');
  input.addEventListener('input', debounce(() => { filt.q = input.value.trim(); renderMenu(); }, 120));
  input.addEventListener('keydown', (e) => { if (e.key === 'Enter') { e.preventDefault(); input.blur(); scrollToMenuTop(); } });
  $('#menuSearchClear').addEventListener('click', () => { input.value = ''; filt.q = ''; renderMenu(); input.focus(); });
  $('#catChips').addEventListener('click', (e) => { const b = e.target.closest('[data-cat]'); if (!b) return; setFilter({ cat: b.dataset.cat }, true); revealChip($('#catChips [aria-pressed="true"]')); });
  $('#budgetChips').addEventListener('click', (e) => {
    const b = e.target.closest('[data-budget]');
    if (b) { setFilter({ budget: filt.budget === b.dataset.budget ? 'all' : b.dataset.budget }, true); return; }
    if (e.target.closest('#favChip')) setFilter({ favs: !filt.favs }, true);
  });
}

/* ---------- Barres de choix qui défilent : fondu + flèches ---------- */
function updateChipScroll(el) {
  const max = el.scrollWidth - el.clientWidth;
  el.dataset.fl = el.scrollLeft > 4 ? '1' : '0';
  el.dataset.fr = el.scrollLeft < max - 4 ? '1' : '0';
  if (el.id === 'catChips') {
    const bar = $('#catbar');
    bar.classList.toggle('can-prev', el.dataset.fl === '1');
    bar.classList.toggle('can-next', el.dataset.fr === '1');
  }
}
function revealChip(chip) {
  const sc = chip && chip.parentElement; if (!sc) return;
  const r = chip.getBoundingClientRect(), c = sc.getBoundingClientRect();
  if (r.left < c.left + 40) sc.scrollBy({ left: r.left - c.left - 40, behavior: reduceMotion() ? 'auto' : 'smooth' });
  else if (r.right > c.right - 40) sc.scrollBy({ left: r.right - c.right + 40, behavior: reduceMotion() ? 'auto' : 'smooth' });
}
function initChipScroll() {
  const all = () => $$('.chips');
  all().forEach(el => { el.addEventListener('scroll', () => updateChipScroll(el), { passive: true }); updateChipScroll(el); });
  window.addEventListener('resize', debounce(() => all().forEach(updateChipScroll), 120));
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(() => all().forEach(updateChipScroll));
  const sc = $('#catChips');
  const step = (dir) => sc.scrollBy({ left: dir * Math.round(sc.clientWidth * 0.7), behavior: reduceMotion() ? 'auto' : 'smooth' });
  $('#catPrev').addEventListener('click', () => step(-1));
  $('#catNext').addEventListener('click', () => step(1));
}

/* ---------- Favoris ---------- */
function toggleFav(id) {
  const p = byId(id); if (!p) return;
  const i = favs.indexOf(id), was = i !== -1;
  if (was) favs.splice(i, 1); else favs.push(id);
  LS.set(KEYS.favs, favs);
  $$(`[data-action="fav"][data-id="${id}"]`).forEach(b => {
    b.classList.toggle('is-fav', !was);
    b.setAttribute('aria-pressed', String(!was));
    b.setAttribute('aria-label', `${p.name} : ${was ? 'ajouter aux favoris' : 'retirer des favoris'}`);
  });
  const n = $('#favCount'); if (n) n.textContent = favs.length;
  if (!was) toast(`${p.name} ajouté aux favoris`);
  if (filt.favs) renderMenu();
}

/* ---------- Toucher un plat ---------- */
function pick(id, src) {
  const p = byId(id); if (!p) return;
  if (isOut(p)) { toast(`${p.name} n'est plus disponible aujourd'hui`); return; }
  if (needsConfig(p)) { openConfig(id, src); return; }
  addLine({ id, variant: 'seul', meats: [], base: '', sauces: [], drink: '', qty: 1 }, src);
}


/* =====================================================================
   PANIER ET COMMANDE WHATSAPP
   Une ligne du panier ne stocke que le choix du client (plat, menu, viandes, base,
   sauces, boisson, quantité) : le prix est toujours recalculé depuis la carte.
   ===================================================================== */
let cart = [];
let cartMode = 'edit';            // 'edit' | 'done' (après l'envoi sur WhatsApp)
let pickupChoice = 'asap';

const lineKey = (l) => [l.id, l.variant, [...l.meats].sort().join('+'), l.base || '', [...l.sauces].sort().join('+'), l.drink || ''].join('|');

/* Vérifie qu'une ligne est valide pour la carte actuelle (sinon elle est ignorée) */
function normalizeLine(raw) {
  if (!raw) return null;
  const p = byId(Number(raw.id)); if (!p) return null;
  const variant = raw.variant === 'menu' && p.menu ? 'menu' : 'seul';
  const pickFrom = (arr, allowed) => (Array.isArray(arr) ? arr : []).filter((v, i, a) => allowed.includes(v) && a.indexOf(v) === i);
  const meats = p.meats ? pickFrom(raw.meats, meatList(p)) : [];
  if (p.meats && meats.length !== p.meats) return null;
  let base = '';
  if (p.base) { base = BASES.includes(raw.base) ? raw.base : ''; if (!base) return null; }
  const sauces = p.sauces ? pickFrom(raw.sauces, SAUCES).slice(0, MAX_SAUCES) : [];
  let drink = '';
  if (variant === 'menu') { drink = DRINKS.includes(raw.drink) ? raw.drink : ''; if (!drink) return null; }
  const qty = Math.max(1, Math.min(MAX_LINE_QTY, parseInt(raw.qty, 10) || 1));
  return { id: p.id, variant, meats, base, sauces, drink, qty };
}
function mergeLine(l) {
  const k = lineKey(l), ex = cart.find(x => lineKey(x) === k);
  if (ex) ex.qty = Math.min(MAX_LINE_QTY, ex.qty + l.qty); else cart.push(l);
}
function loadCart() {
  cart = [];
  const saved = LS.get(KEYS.cart, []);
  (Array.isArray(saved) ? saved : []).forEach(r => { const l = normalizeLine(r); if (l) mergeLine(l); });
}
const saveCart = () => LS.set(KEYS.cart, cart);
const lineCents = (l) => priceCents(byId(l.id), l.variant) * l.qty;
const cartCents = () => cart.reduce((s, l) => s + lineCents(l), 0);
const cartCount = () => cart.reduce((s, l) => s + l.qty, 0);
const hasLastOrder = () => { const last = LS.get(KEYS.last, []); return Array.isArray(last) && last.some(r => normalizeLine(r)); };

function lineDetails(l) {
  const d = [];
  if (l.meats.length) d.push(['Viandes', l.meats.join(', ')]);
  if (l.base) d.push(['Base', l.base]);
  if (l.sauces.length) d.push(['Sauces', l.sauces.join(', ')]);
  if (l.drink) d.push(['Boisson', l.drink]);
  return d;
}

/* ---------- Ajout / modification ---------- */
function addLine(raw, src) {
  const l = normalizeLine(raw); if (!l) return false;
  mergeLine(l);
  saveCart();
  renderCart();
  const p = byId(l.id);
  toast(`${l.qty > 1 ? l.qty + '× ' : ''}${p.name} ajouté au panier`);
  flashAdd(src);
  flyToCart(src);
  if (navigator.vibrate) { try { navigator.vibrate(12); } catch (e) {} }
  return true;
}
function changeQty(key, d) {
  const l = cart.find(x => lineKey(x) === key); if (!l) return;
  l.qty = Math.min(MAX_LINE_QTY, l.qty + d);
  if (l.qty <= 0) cart = cart.filter(x => x !== l);
  saveCart();
  renderCart();
}
function clearCart() {
  cart = [];
  cartMode = 'edit';
  saveCart();
  renderCart();
}
function reorderLast() {
  const last = LS.get(KEYS.last, []);
  let n = 0;
  (Array.isArray(last) ? last : []).forEach(r => { const l = normalizeLine(r); if (l && !isOut(byId(l.id))) { mergeLine(l); n++; } });
  saveCart();
  renderCart();
  toast(n ? 'Ta dernière commande est dans le panier' : "Ces plats ne sont plus disponibles aujourd'hui");
}

/* Petits retours visuels */
function flashAdd(src) {
  const u = src && src.classList && src.classList.contains('add') ? src.querySelector('use') : null;
  if (!u) return;
  u.setAttribute('href', '#i-check');
  setTimeout(() => u.setAttribute('href', '#i-plus'), 800);
}
function bumpCart() {
  const b = $('#cartBtn'); if (!b || reduceMotion()) return;
  b.classList.remove('bump'); void b.offsetWidth; b.classList.add('bump');
}
function flyToCart(src) {
  const target = $('#cartBtn');
  if (!src || !target || reduceMotion() || !document.body.animate || !src.getBoundingClientRect) return bumpCart();
  const a = src.getBoundingClientRect(), b = target.getBoundingClientRect();
  if (!a.width || !b.width) return bumpCart();
  const dot = document.createElement('span');
  dot.className = 'fly';
  document.body.appendChild(dot);
  const x0 = a.left + a.width / 2 - 14, y0 = a.top + a.height / 2 - 14;
  const x1 = b.left + b.width / 2 - 14, y1 = b.top + b.height / 2 - 14;
  const anim = dot.animate([
    { transform: `translate(${x0}px, ${y0}px) scale(1)`, opacity: 1 },
    { transform: `translate(${x1}px, ${y1}px) scale(.35)`, opacity: .9 }
  ], { duration: 560, easing: 'cubic-bezier(.5,0,.2,1)' });
  anim.onfinish = () => { dot.remove(); bumpCart(); };
  setTimeout(() => dot.remove(), 1000);
}

/* ---------- Affichage ---------- */
function lineHTML(l) {
  const p = byId(l.id), key = esc(lineKey(l)), out = isOut(p);
  const det = lineDetails(l).map(([k, v]) => `<span>${esc(k)} : ${esc(v)}</span>`).join('<br>');
  return `<li class="line" data-key="${key}">
    <div class="line-thumb">${visualHTML(p, '56px')}</div>
    <div class="line-main">
      <div class="line-name">${esc(p.name)}${l.variant === 'menu' ? '<span class="line-tag">Menu</span>' : ''}${out ? '<span class="line-tag line-tag-out">Épuisé</span>' : ''}</div>
      ${det ? `<div class="line-det">${det}</div>` : ''}
    </div>
    <div class="line-side">
      <div class="line-price">${eur(lineCents(l))}</div>
      <div class="qty qty-sm" role="group" aria-label="Quantité : ${esc(p.name)}">
        <button type="button" data-action="qty" data-key="${key}" data-d="-1" aria-label="${l.qty === 1 ? 'Retirer' : 'Un de moins'} : ${esc(p.name)}"><svg class="i"><use href="${l.qty === 1 ? '#i-trash' : '#i-minus'}"/></svg></button>
        <output>${l.qty}</output>
        <button type="button" data-action="qty" data-key="${key}" data-d="1" aria-label="Un de plus : ${esc(p.name)}"><svg class="i"><use href="#i-plus"/></svg></button>
      </div>
    </div>
  </li>`;
}

function renderCart() {
  const n = cartCount(), total = eur(cartCents());
  const badge = $('#cartBadge'); if (badge) { badge.textContent = n; badge.hidden = n === 0; }
  const bar = $('#cartbar');
  if (bar) {
    const wasHidden = bar.hidden;
    bar.hidden = n === 0;
    if (wasHidden && n > 0 && !reduceMotion()) { bar.classList.remove('pop'); void bar.offsetWidth; bar.classList.add('pop'); }
  }
  $('#cartbarCount').textContent = n;
  $('#cartbarTotal').textContent = total;
  document.body.classList.toggle('has-cart', n > 0);
  const btn = $('#cartBtn');
  if (btn) btn.setAttribute('aria-label', n ? `Ouvrir ma commande, ${n} article${n > 1 ? 's' : ''}, ${total}` : 'Ouvrir ma commande');

  const editing = cartMode === 'edit';
  $('#cartEmpty').hidden = !(editing && n === 0);
  $('#cartFilled').hidden = !(editing && n > 0);
  $('#cartDone').hidden = editing;
  $('#cartFoot').hidden = !(editing && n > 0);
  $('#cartLines').innerHTML = cart.map(lineHTML).join('');
  $('#cartTotal').textContent = total;
  const rb = $('#reorderBtn'); if (rb) rb.hidden = !hasLastOrder();
}

/* ---------- Retrait ---------- */
function renderPickup() {
  const sel = $('#pickup'), note = $('#closedNote'); if (!sel) return;
  const o = pickupOptions();
  let html = '';
  if (o.asap) html += '<option value="asap">Dès que possible</option>';
  if (o.slots.length) {
    // Aujourd'hui : groupe « Aujourd'hui » ; un autre jour : le jour est écrit dans chaque créneau (visible une fois la liste refermée)
    if (o.slots[0].k === 0) html += `<optgroup label="${esc(o.dayLabel)}">${o.slots.map(s => `<option value="${s.value}">${esc(s.label)}</option>`).join('')}</optgroup>`;
    else html += o.slots.map(s => `<option value="${s.value}">${esc(`${s.k === 1 ? 'Demain' : cap(DAYS[s.dow])} à ${s.label}`)}</option>`).join('');
  }
  if (!html) html = '<option value="">Aucun créneau disponible</option>';
  if (sel.dataset.sig !== html) { sel.innerHTML = html; sel.dataset.sig = html; }
  const values = $$('option', sel).map(x => x.value);
  sel.value = values.includes(pickupChoice) ? pickupChoice : values[0];
  pickupChoice = sel.value;
  if (!o.status.open) {
    note.hidden = false;
    note.textContent = `${statusText(o.status)}. Choisis un créneau : ta commande sera lue à l'ouverture.`;
  } else note.hidden = true;
}
function pickupMessage() {
  const v = $('#pickup').value;
  if (!v || v === 'asap') return 'dès que possible';
  const s = pickupOptions().slots.find(x => x.value === v);
  if (!s) return 'dès que possible';
  return `${s.k === 0 ? "aujourd'hui" : s.k === 1 ? 'demain' : DAYS[s.dow]} à ${s.label}`;
}

/* ---------- Message WhatsApp ---------- */
function buildOrderText() {
  const name = $('#custName').value.trim() || 'Client';
  const note = $('#custNote').value.trim();
  let t = `Bonjour ${SITE.name} 👋\nJe souhaite passer commande à emporter.\n\n`;
  t += `👤 Prénom : ${name}\n🕒 Retrait : ${pickupMessage()}\n\n🛒 Ma commande :\n`;
  cart.forEach(l => {
    const p = byId(l.id);
    t += `${l.qty}× ${p.name}${l.variant === 'menu' ? ' (menu)' : ''} — ${eur(lineCents(l))}\n`;
    lineDetails(l).forEach(([k, v]) => { t += `   ${k} : ${v}\n`; });
  });
  t += `\n💶 Total : ${eur(cartCents())} (à régler sur place)\n`;
  if (note) t += `📝 Remarque : ${note}\n`;
  t += '\nMerci !';
  return t;
}

function validateOrder() {
  if (!cart.length) { toast('Ton panier est vide'); return false; }
  if (cart.some(l => isOut(byId(l.id)))) { toast('Retire les plats épuisés pour continuer'); return false; }
  const nm = $('#custName'), err = $('#nameErr');
  if (!nm.value.trim()) {
    nm.setAttribute('aria-invalid', 'true');
    err.hidden = false;
    nm.focus();
    nm.classList.remove('shake'); void nm.offsetWidth; nm.classList.add('shake');
    return false;
  }
  nm.removeAttribute('aria-invalid');
  err.hidden = true;
  const chosen = $('#pickup').value;
  renderPickup();                                     // les créneaux ont pu changer depuis l'ouverture du panier
  if ($('#pickup').value !== chosen) { toast('Les créneaux ont changé, vérifie ton retrait'); return false; }
  if (!$('#pickup').value) { toast('Aucun créneau de retrait disponible pour le moment'); return false; }
  return true;
}
function commitOrder() {
  LS.set(KEYS.name, $('#custName').value.trim());
  LS.set(KEYS.last, cart);
}

function sendOrder() {
  if (!validateOrder()) return;
  commitOrder();
  const url = `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(buildOrderText())}`;
  const w = window.open(url, '_blank');
  if (w) { try { w.opener = null; } catch (e) {} } else { location.href = url; }
  cartMode = 'done';
  renderCart();
}

async function copyText(text) {
  try { if (navigator.clipboard && window.isSecureContext) { await navigator.clipboard.writeText(text); return true; } } catch (e) {}
  try {
    const ta = document.createElement('textarea');
    ta.value = text; ta.setAttribute('readonly', '');
    ta.style.cssText = 'position:fixed;top:-1000px;opacity:0';
    document.body.appendChild(ta); ta.select();
    const ok = document.execCommand('copy');
    ta.remove();
    return ok;
  } catch (e) { return false; }
}
async function copyOrder() {
  if (!validateOrder()) return;
  commitOrder();
  const ok = await copyText(buildOrderText());
  toast(ok ? `Commande copiée. Colle-la dans WhatsApp, au ${SITE.phoneDisplay}.` : 'Copie impossible sur ce navigateur');
}

function openCart(opener) {
  cartMode = 'edit';
  renderCart();
  renderPickup();
  const nm = $('#custName');
  if (nm && !nm.value) nm.value = LS.get(KEYS.name, '') || '';
  openDialog($('#cartDlg'), opener);
}


/* =====================================================================
   FENÊTRES (panier, composition d'un plat, menu mobile, mentions légales…)
   Une pile gère l'ouverture/fermeture, le focus, la touche Échap et l'inertie du fond.
   ===================================================================== */
const DLG = { stack: [], openers: new Map(), timers: new Map() };

function syncInert() {
  const top = DLG.stack[DLG.stack.length - 1];
  const page = $('#page'); if (page) page.inert = !!top;
  $$('.dlg').forEach(d => { d.inert = !!top && d !== top; });
}
function openDialog(el, opener) {
  if (!el) return;
  hideToast();
  clearTimeout(DLG.timers.get(el));
  if (!DLG.stack.includes(el)) DLG.stack.push(el);
  DLG.openers.set(el, opener || document.activeElement);
  el.hidden = false;
  void el.offsetWidth;                       // force le calcul de mise en page pour lancer la transition
  el.classList.add('open');
  const scrim = $('#scrim');
  scrim.hidden = false; void scrim.offsetWidth; scrim.classList.add('open');
  document.documentElement.classList.add('lock');
  syncInert();
  const target = el.querySelector('[data-autofocus]') || el;
  setTimeout(() => { try { target.focus({ preventScroll: true }); } catch (e) {} }, 40);
}
function closeDialog(el) {
  if (!el || !DLG.stack.includes(el)) return;
  DLG.stack = DLG.stack.filter(d => d !== el);
  el.classList.remove('open');
  DLG.timers.set(el, setTimeout(() => { if (!DLG.stack.includes(el)) el.hidden = true; }, 360));
  if (!DLG.stack.length) {
    const scrim = $('#scrim');
    scrim.classList.remove('open');
    setTimeout(() => { if (!DLG.stack.length) scrim.hidden = true; }, 280);
    document.documentElement.classList.remove('lock');
  }
  syncInert();
  if (typeof el._onClose === 'function') el._onClose();
  const op = DLG.openers.get(el);
  DLG.openers.delete(el);
  if (op && document.contains(op) && !DLG.stack.length) { try { op.focus({ preventScroll: true }); } catch (e) {} }
}
function closeTopDialog() { closeDialog(DLG.stack[DLG.stack.length - 1]); }

function initDialogs() {
  $('#scrim').addEventListener('click', closeTopDialog);
  document.addEventListener('keydown', (e) => {
    if (!DLG.stack.length) return;
    if (e.key === 'Escape') { e.preventDefault(); closeTopDialog(); return; }
    if (e.key !== 'Tab') return;
    const top = DLG.stack[DLG.stack.length - 1];
    const f = $$('a[href],button:not([disabled]),input:not([disabled]),select:not([disabled]),textarea:not([disabled]),[tabindex]:not([tabindex="-1"])', top)
      .filter(x => x.getClientRects().length > 0);
    if (!f.length) return;
    const first = f[0], last = f[f.length - 1], cur = document.activeElement;
    if (e.shiftKey && (cur === first || cur === top)) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && cur === last) { e.preventDefault(); first.focus(); }
  });
}

/* =====================================================================
   COMPOSER UN PLAT : seul ou menu, viandes, base, sauces, boisson, quantité
   ===================================================================== */
const cfg = { p: null, variant: 'seul', meats: [], base: '', sauces: [], drink: '', qty: 1 };

function optGroup({ id, title, hint, hintOk, multi, options, selected, need }) {
  const btns = options.map(v => {
    const on = selected.includes(v);
    const attrs = multi ? `aria-pressed="${on}"` : `role="radio" aria-checked="${on}"`;
    return `<button type="button" class="opt" ${attrs} data-opt="${id}:${esc(v)}"><svg class="i ck"><use href="#i-check"/></svg>${esc(v)}</button>`;
  }).join('');
  return `<div class="og" data-og="${id}"${need ? ' data-need="1"' : ''}>
    <div class="og-head"><h3 class="og-title" id="og-${id}">${title}</h3>${hint ? `<span class="og-hint${hintOk ? ' ok' : ''}">${hint}</span>` : ''}</div>
    <div class="opts" role="${multi ? 'group' : 'radiogroup'}" aria-labelledby="og-${id}">${btns}</div>
  </div>`;
}
function variantHTML(p) {
  const v = (id, label, sub) => `<button type="button" class="vopt" role="radio" aria-checked="${cfg.variant === id}" data-opt="variant:${id}"><strong>${label}</strong><span class="vp">${eur(priceCents(p, id))}</span><small>${sub}</small></button>`;
  return `<div class="og" data-og="variant">
    <div class="og-head"><h3 class="og-title" id="og-variant">Seul ou en menu ?</h3></div>
    <div class="variant" role="radiogroup" aria-labelledby="og-variant">${v('seul', 'Seul', 'Juste le plat')}${v('menu', 'En menu', 'Avec frites et boisson')}</div>
  </div>`;
}

function renderConfig() {
  const p = cfg.p; if (!p) return;
  const body = $('#cfgBody'), st = body.scrollTop;
  const active = document.activeElement && document.activeElement.dataset ? document.activeElement.dataset.opt : null;
  let h = '';
  if (p.menu) h += variantHTML(p);
  if (p.meats) {
    const n = cfg.meats.length;
    h += optGroup({ id: 'meats', title: `Choisis ${p.meats} viande${p.meats > 1 ? 's' : ''}`, hint: `${n}/${p.meats}`, hintOk: n === p.meats, multi: true, options: meatList(p), selected: cfg.meats, need: n !== p.meats });
  }
  if (p.base) h += optGroup({ id: 'base', title: 'Ta base', hint: cfg.base ? '' : 'Choisis-en une', multi: false, options: BASES, selected: [cfg.base], need: !cfg.base });
  if (p.sauces) h += optGroup({ id: 'sauces', title: 'Tes sauces', hint: `${cfg.sauces.length}/${MAX_SAUCES}, facultatif`, hintOk: cfg.sauces.length > 0, multi: true, options: SAUCES, selected: cfg.sauces });
  if (p.menu && cfg.variant === 'menu') h += optGroup({ id: 'drink', title: 'Ta boisson', hint: cfg.drink ? '' : 'Comprise dans le menu', multi: false, options: DRINKS, selected: [cfg.drink], need: !cfg.drink });
  body.innerHTML = h;
  body.scrollTop = st;
  if (active) { const el = $$('[data-opt]', body).find(b => b.dataset.opt === active); if (el) el.focus({ preventScroll: true }); }
  updateCfgFooter();
}

function cfgMissing() {
  const p = cfg.p; if (!p) return '';
  if (p.meats && cfg.meats.length !== p.meats) {
    const left = p.meats - cfg.meats.length;
    return cfg.meats.length ? `Encore ${left} viande${left > 1 ? 's' : ''}` : `Choisis ${p.meats} viande${p.meats > 1 ? 's' : ''}`;
  }
  if (p.base && !cfg.base) return 'Choisis ta base';
  if (p.menu && cfg.variant === 'menu' && !cfg.drink) return 'Choisis ta boisson';
  return '';
}
function updateCfgFooter() {
  const miss = cfgMissing(), btn = $('#cfgAdd');
  $('#cfgQty').textContent = cfg.qty;
  $('#cfgMinus').disabled = cfg.qty <= 1;
  $('#cfgPlus').disabled = cfg.qty >= MAX_QTY;
  btn.setAttribute('aria-disabled', miss ? 'true' : 'false');
  $('#cfgAddLabel').textContent = miss || 'Ajouter';
  $('#cfgAddPrice').textContent = miss ? '' : eur(priceCents(cfg.p, cfg.variant) * cfg.qty);
}

function cfgPick(kind, val) {
  const p = cfg.p; if (!p) return;
  const toggle = (arr, max) => { const i = arr.indexOf(val); if (i > -1) arr.splice(i, 1); else { arr.push(val); while (arr.length > max) arr.shift(); } };
  if (kind === 'variant') cfg.variant = val === 'menu' ? 'menu' : 'seul';
  else if (kind === 'meats') toggle(cfg.meats, p.meats);
  else if (kind === 'base') cfg.base = val;
  else if (kind === 'sauces') toggle(cfg.sauces, MAX_SAUCES);
  else if (kind === 'drink') cfg.drink = val;
  renderConfig();
}

function openConfig(id, opener) {
  const p = byId(id); if (!p || isOut(p)) return;
  Object.assign(cfg, { p, variant: 'seul', meats: [], base: '', sauces: [], drink: '', qty: 1 });
  $('#cfgVisual').innerHTML = visualHTML(p, '76px');
  $('#cfgTitle').textContent = p.name;
  $('#cfgDesc').textContent = p.desc;
  renderConfig();
  $('#cfgBody').scrollTop = 0;
  openDialog($('#cfgDlg'), opener);
}

function nudgeMissing() {
  const g = $('#cfgBody [data-need="1"]'); if (!g) return;
  g.scrollIntoView({ block: 'center', behavior: reduceMotion() ? 'auto' : 'smooth' });
  g.classList.remove('shake'); void g.offsetWidth; g.classList.add('shake');
}
function cfgAdd() {
  if (cfgMissing()) { nudgeMissing(); return; }
  const p = cfg.p, src = $('#cfgAdd');
  const ok = addLine({ id: p.id, variant: cfg.variant, meats: [...cfg.meats], base: cfg.base, sauces: [...cfg.sauces], drink: cfg.variant === 'menu' ? cfg.drink : '', qty: cfg.qty }, src);
  if (ok) closeDialog($('#cfgDlg'));
}

function shareProduct() {
  const p = cfg.p; if (!p) return;
  const url = `${location.href.split('#')[0]}#produit-${p.id}`;
  if (navigator.share) { navigator.share({ title: p.name, text: `${p.name} chez ${SITE.name}`, url }).catch(() => {}); return; }
  copyText(url).then(ok => toast(ok ? 'Lien du plat copié' : 'Copie impossible sur ce navigateur'));
}

function initConfig() {
  $('#cfgBody').addEventListener('click', (e) => {
    const b = e.target.closest('[data-opt]'); if (!b) return;
    const s = b.dataset.opt, i = s.indexOf(':');
    cfgPick(s.slice(0, i), s.slice(i + 1));
  });
  $('#cfgMinus').addEventListener('click', () => { if (cfg.qty > 1) { cfg.qty--; updateCfgFooter(); } });
  $('#cfgPlus').addEventListener('click', () => { if (cfg.qty < MAX_QTY) { cfg.qty++; updateCfgFooter(); } });
  $('#cfgAdd').addEventListener('click', cfgAdd);
  $('#cfgShare').addEventListener('click', shareProduct);
  $('#cfgDlg')._onClose = () => { cfg.p = null; };
}

/* =====================================================================
   MENU MOBILE « AFFICHE »
   ===================================================================== */
function renderPoster() {
  const ul = $('#posterList'); if (!ul) return;
  const big = CATEGORIES.slice(0, 4), more = CATEGORIES.slice(4);
  ul.innerHTML = big.map((c, i) => `<li><a href="#carte" data-nav-cat="${c.id}">${esc(c.label)}<span class="pp pp-${(i % 3) + 1}" aria-hidden="true">${catVisualHTML(c.id)}</span></a></li>`).join('')
    + `<li><div class="poster-more">${more.map(c => `<a href="#carte" data-nav-cat="${c.id}">${esc(c.label)}</a>`).join('')}<a href="#carte" data-nav-cat="all">Toute la carte</a></div></li>`;
}


/* =====================================================================
   SITE : configuration → page, bandeau, FAQ, données structurées, carte Google (avec accord),
   pages légales, espace équipe, événements, démarrage
   ===================================================================== */
const FULL_ADDRESS = `${SITE.street}, ${SITE.postalCode} ${SITE.city}`;
const LEGAL = SITE.legal || {};
const siteHref = {
  dir:    () => `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(`${SITE.street} ${SITE.postalCode} ${SITE.city}`)}`,
  maps:   () => SITE.mapsUrl || `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${SITE.name} ${FULL_ADDRESS}`)}`,
  tel:    () => `tel:${SITE.phone}`,
  wa:     () => `https://wa.me/${SITE.whatsapp}`,
  mailto: () => `mailto:${SITE.email}`
};
const SS = {
  get(k) { try { return sessionStorage.getItem(k); } catch (e) { return null; } },
  set(k, v) { try { sessionStorage.setItem(k, v); } catch (e) {} }
};
const safe = (fn) => { try { fn(); } catch (e) { console.error(e); } };
const hasUber = () => /^https:\/\//i.test(SITE.uberEatsUrl || '');
const setAttr = (sel, attr, val) => { const el = $(sel); if (el) el.setAttribute(attr, val); };
const baseUrl = () => (SITE.domain ? SITE.domain.replace(/\/?$/, '/') : '');

/* ---------- Configuration → page ---------- */
function applySiteConfig() {
  $$('[data-site-text]').forEach(el => {
    const k = el.dataset.siteText;
    const v = SITE[k] != null ? SITE[k] : LEGAL[k];
    if (typeof v === 'string' && v) el.textContent = v;
  });
  $$('[data-site-href]').forEach(el => { const f = siteHref[el.dataset.siteHref]; if (f) el.setAttribute('href', f()); });

  const openDays = [0, 1, 2, 3, 4, 5, 6].filter(d => hoursFor(d).length).length;
  const sticker = $('[data-hours-sticker]');
  if (sticker) sticker.textContent = openDays === 7 ? 'Ouvert 7j/7' : (openDays ? `Ouvert ${openDays}j/7` : 'Horaires plus bas');

  const chips = $('#payChips');
  if (chips && Array.isArray(SITE.payments) && SITE.payments.length) chips.innerHTML = SITE.payments.map(x => `<li>${esc(x)}</li>`).join('');

  if (hasUber()) {
    const cta = $('.hero-cta');
    if (cta) cta.insertAdjacentHTML('beforeend', `<a class="btn btn-ink btn-lg" href="${esc(SITE.uberEatsUrl)}" target="_blank" rel="noopener">Livraison Uber Eats</a>`);
  }

  const base = baseUrl();
  if (base) {
    setAttr('link[rel="canonical"]', 'href', base);
    setAttr('meta[property="og:url"]', 'content', base);
    setAttr('meta[property="og:image"]', 'content', `${base}img/og-image.jpg`);
    setAttr('meta[name="twitter:image"]', 'content', `${base}img/og-image.jpg`);
  }
  if (SITE.demoMode) {
    const note = $('#demoNotice'); if (note) note.hidden = false;
    setAttr('meta[name="robots"]', 'content', 'noindex,nofollow');
  }
  const y = $('#year'); if (y) y.textContent = new Date().getFullYear();
}

/* ---------- Bandeau défilant : répété autant de fois qu'il faut pour couvrir l'écran ---------- */
function buildTicker() {
  const tr = $('#tickerTrack'); if (!tr) return;
  const items = [...(SITE.cuisine || []).slice(0, 3), 'Commande sur WhatsApp', `Ouvert ${hoursSummary()}`];
  if (Array.isArray(SITE.payments) && SITE.payments.length) items.push('Titres-restaurant acceptés');
  items.push(SITE.city);
  const one = items.map(t => `<span>${esc(t)}</span><svg class="i i-fill"><use href="#i-sun"/></svg>`).join('');
  tr.innerHTML = one;
  const period = tr.scrollWidth || 1200;                 // largeur d'un motif (marge de gauche = espace entre éléments)
  const copies = Math.max(2, 2 * Math.ceil(window.innerWidth / period));
  tr.innerHTML = one.repeat(copies);
  tr.style.animationDuration = `${Math.max(24, Math.round((copies / 2) * period / 50))}s`;
}
function initTicker() {
  buildTicker();
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(() => safe(buildTicker));
  let w = window.innerWidth;
  window.addEventListener('resize', debounce(() => { if (Math.abs(window.innerWidth - w) > 40) { w = window.innerWidth; safe(buildTicker); } }, 250));
}

/* ---------- Questions fréquentes + données structurées ---------- */
const orList = (a) => (a.length < 2 ? a.join('') : `${a.slice(0, -1).join(', ')} ou ${a[a.length - 1]}`);
function faqItems() {
  const pay = Array.isArray(SITE.payments) && SITE.payments.length ? ` Titres-restaurant acceptés : ${SITE.payments.join(', ')}.` : '';
  return [
    { q: 'Comment commander ?', a: "Choisis tes plats dans la carte, ajoute ton prénom et appuie sur « Envoyer sur WhatsApp ». Ta commande arrive au restaurant déjà rédigée : rien à recopier." },
    { q: "Que se passe-t-il après l'envoi ?", a: "Le restaurant te répond sur WhatsApp pour confirmer et te dire quand passer. Un changement de dernière minute ? Réponds dans la même conversation ou appelle le {tel}." },
    { q: 'Quels sont vos horaires ?', a: hoursSentence() },
    { q: 'Comment je paie ?', a: `Sur place, au retrait. Il n'y a pas de paiement en ligne sur ce site.${pay}` },
    { q: 'Je peux commander pour plus tard ?', a: "Oui. Dans ta commande, choisis « Dès que possible » ou un créneau de retrait, toutes les 15 minutes. Si le restaurant est fermé, tu peux programmer ta commande pour l'ouverture." },
    { q: "C'est quoi un menu ?", a: `Ton plat avec des frites et une boisson (${orList(DRINKS)}). Tu passes en menu quand tu composes ton plat : le prix s'affiche tout de suite.` },
    { q: 'Vous livrez ?', a: hasUber()
        ? "Oui, via Uber Eats : le bouton « Livraison Uber Eats » en haut de page te mène à notre fiche. Les commandes passées sur ce site sont à emporter."
        : "Les commandes passées ici sont à emporter, à récupérer au comptoir. Une question sur la livraison ? Appelle-nous au {tel}." },
    { q: "J'ai une allergie, je fais comment ?", a: "Écris-le dans la remarque de ta commande et appelle-nous au {tel} avant de commander : l'équipe te dit ce que contient chaque plat. Tous les plats sont préparés dans la même cuisine, des traces d'allergènes sont possibles." }
  ];
}
const faqPlain = (a) => a.replace(/\{tel\}/g, SITE.phoneDisplay);
const faqHTML = (a) => esc(a).replace(/\{tel\}/g, `<a href="${esc(siteHref.tel())}">${esc(SITE.phoneDisplay)}</a>`);

function renderFAQ() {
  const el = $('#faqList'); if (!el) return;
  el.innerHTML = faqItems().map(it => `<details class="qa"><summary><span>${esc(it.q)}</span><span class="qa-plus" aria-hidden="true"><svg class="i"><use href="#i-plus"/></svg></span></summary><div class="qa-a"><p>${faqHTML(it.a)}</p></div></details>`).join('');
}

function setJsonLd(id, data) {
  let el = document.getElementById(id);
  if (!el) { el = document.createElement('script'); el.type = 'application/ld+json'; el.id = id; document.head.appendChild(el); }
  el.textContent = JSON.stringify(data).replace(/</g, '\\u003c');
}
function injectJsonLd() {
  const base = baseUrl();
  const dayName = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const hhmm = (m) => `${String(Math.floor(m / 60) % 24).padStart(2, '0')}:${String(m % 60).padStart(2, '0')}`;
  const spec = [];
  for (let d = 0; d < 7; d++) hoursFor(d).forEach(([a, b]) => spec.push({ '@type': 'OpeningHoursSpecification', dayOfWeek: dayName[d], opens: hhmm(a), closes: hhmm(b) }));
  setJsonLd('ld-restaurant', {
    '@context': 'https://schema.org',
    '@type': 'FastFoodRestaurant',
    name: SITE.name,
    description: `${SITE.tagline} à ${SITE.city}. Commande en ligne sur WhatsApp, retrait sur place.`,
    url: base || undefined,
    image: base ? `${base}img/og-image.jpg` : undefined,
    telephone: SITE.phone,
    email: SITE.email,
    address: { '@type': 'PostalAddress', streetAddress: SITE.street, postalCode: SITE.postalCode, addressLocality: SITE.city, addressCountry: 'FR' },
    servesCuisine: SITE.cuisine,
    priceRange: SITE.priceRange,
    openingHoursSpecification: spec,
    paymentAccepted: Array.isArray(SITE.payments) && SITE.payments.length ? `Titres-restaurant : ${SITE.payments.join(', ')}` : undefined,
    menu: base ? `${base}#carte` : undefined,
    sameAs: [SITE.mapsUrl, hasUber() ? SITE.uberEatsUrl : ''].filter(Boolean)
  });
  setJsonLd('ld-faq', {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqItems().map(it => ({ '@type': 'Question', name: it.q, acceptedAnswer: { '@type': 'Answer', text: faqPlain(it.a) } }))
  });
}

/* ---------- Carte Google Maps : chargée seulement après l'accord du visiteur ---------- */
const mapConsent = () => LS.get(KEYS.maps, false) === true;
function renderMap() {
  const box = $('#mapBox'); if (!box) return;
  if (mapConsent()) {
    const q = encodeURIComponent(`${SITE.name} ${FULL_ADDRESS}`);
    box.innerHTML = `<iframe title="Carte Google Maps : ${esc(SITE.name)}, ${esc(FULL_ADDRESS)}" src="https://www.google.com/maps?q=${q}&hl=fr&z=16&output=embed" loading="lazy" referrerpolicy="no-referrer-when-downgrade" allowfullscreen></iframe>
      <button class="map-off" type="button" data-action="map-off">Masquer la carte</button>`;
  } else {
    box.innerHTML = `<div class="map-ph">
      <span class="pin" aria-hidden="true"><svg class="i"><use href="#i-pin"/></svg></span>
      <p><strong>${esc(FULL_ADDRESS)}</strong></p>
      <p>La carte Google Maps ne se charge qu'avec ton accord : Google reçoit alors ton adresse IP et peut déposer des cookies.</p>
      <div class="row">
        <button class="btn btn-neon" type="button" data-action="map-on">Afficher la carte</button>
        <a class="btn btn-paper" href="${esc(siteHref.dir())}" target="_blank" rel="noopener">Itinéraire</a>
      </div>
    </div>`;
  }
}

/* ---------- Pages légales (générées depuis SITE.legal) ---------- */
const todoHTML = (t) => `<span class="legal-todo">${esc(t)}</span>`;
const fieldHTML = (v, fallback = '[À compléter]') => {
  const s = String(v == null ? '' : v).trim();
  if (!s) return todoHTML(fallback);
  return /^\[.*\]$/.test(s) ? todoHTML(s) : esc(s);
};
const mailLink = (m) => `<a href="mailto:${esc(m)}">${esc(m)}</a>`;
const LEGAL_TITLES = { mentions: 'Mentions légales', confidentialite: 'Confidentialité', allergenes: 'Allergènes' };
let legalKind = null;

function legalMentions() {
  const tva = LEGAL.tva ? `<br>TVA intracommunautaire : ${fieldHTML(LEGAL.tva)}` : '';
  const mail = LEGAL.contactEmail || SITE.email;
  return `
  <h3>Éditeur du site</h3>
  <p><strong>${fieldHTML(LEGAL.companyName)}</strong>, ${fieldHTML(LEGAL.legalForm)} au capital de ${fieldHTML(LEGAL.capital)}.<br>
  Établissement : ${esc(FULL_ADDRESS)}<br>
  SIRET : ${fieldHTML(LEGAL.siret)}<br>
  ${fieldHTML(LEGAL.rcs)}${tva}<br>
  Téléphone : <a href="${esc(siteHref.tel())}">${esc(SITE.phoneDisplay)}</a><br>
  E-mail : ${mailLink(mail)}</p>
  <p>Directeur de la publication : ${fieldHTML(LEGAL.publisher)}.</p>
  <h3>Hébergement</h3>
  <p>${fieldHTML(LEGAL.host)}, ${fieldHTML(LEGAL.hostAddress)}.${LEGAL.hostUrl ? ` <a href="${esc(LEGAL.hostUrl)}" target="_blank" rel="noopener">${esc(LEGAL.hostUrl.replace(/^https?:\/\//, ''))}</a>` : ''}</p>
  <h3>Conception du site</h3>
  <p>${fieldHTML(LEGAL.creditLine)}.</p>
  <h3>Prix et commandes</h3>
  <p>Les prix sont indiqués en euros, toutes taxes comprises. Une commande envoyée par WhatsApp n'est définitive qu'après confirmation du restaurant. Le paiement se fait sur place, au retrait. Les photos sont illustratives et non contractuelles.</p>
  <h3>Propriété intellectuelle</h3>
  <p>Les textes, illustrations, logos, photos et le code de ce site sont protégés. Toute reproduction sans autorisation écrite est interdite.</p>
  <h3>Médiation de la consommation</h3>
  <p>En cas de litige, tu peux saisir gratuitement un médiateur de la consommation après avoir contacté le restaurant. ${fieldHTML(LEGAL.mediator, '[Nom et coordonnées du médiateur à compléter]')}</p>
  <h3>Données personnelles</h3>
  <p>Tout est expliqué sur la page <button class="btn-link" type="button" data-legal="confidentialite">Confidentialité</button>.</p>`;
}

function legalConfidentialite() {
  const mail = LEGAL.contactEmail || SITE.email;
  const consent = mapConsent();
  return `
  <p>Ce site n'a ni compte client, ni base de données, ni outil de mesure d'audience, ni publicité.</p>
  <h3>Qui est responsable ?</h3>
  <p>${fieldHTML(LEGAL.companyName)}, ${esc(FULL_ADDRESS)}. Contact : ${mailLink(mail)}.</p>
  <h3>Ce que tu nous donnes</h3>
  <p>Quand tu envoies une commande, ton prénom, ta remarque éventuelle et le détail de ta commande sont écrits dans un message WhatsApp que tu envoies toi-même au restaurant. Le restaurant reçoit ce message et ton numéro WhatsApp. Il les utilise uniquement pour préparer et confirmer ta commande (base légale : l'exécution de ta demande). WhatsApp (Meta) traite ensuite ces échanges selon ses propres règles.</p>
  <p>Durée de conservation des messages : ${fieldHTML(LEGAL.retention, '[à confirmer par le restaurant]')}</p>
  <h3>Ce qui reste sur ton appareil</h3>
  <p>Pour fonctionner, le site garde dans ton navigateur ton panier, tes plats favoris, ta dernière commande et ton prénom (pour le pré-remplir). Ces informations ne sont jamais envoyées à un serveur et ne servent à aucun suivi : il n'y a donc pas de bandeau cookies.</p>
  <p><button class="btn btn-paper" type="button" data-action="clear-local">Effacer mes données sur cet appareil</button></p>
  <h3>Carte Google Maps</h3>
  <p>La carte ne se charge qu'après ton clic sur « Afficher la carte ». Google reçoit alors ton adresse IP et peut utiliser des cookies, selon sa propre politique de confidentialité. Ton choix est mémorisé sur cet appareil.</p>
  ${consent
    ? '<p>Tu as activé la carte. <button class="btn btn-paper" type="button" data-action="map-off">Retirer mon accord</button></p>'
    : "<p>Tu n'as pas activé la carte : Google ne reçoit rien de ta visite.</p>"}
  <h3>Hébergement</h3>
  <p>Le site est hébergé par ${fieldHTML(LEGAL.host)}. Comme tout hébergeur, il peut enregistrer des journaux techniques (adresse IP, date et heure de la visite).</p>
  <h3>Tes droits</h3>
  <p>Tu peux demander l'accès, la rectification ou l'effacement des données que le restaurant détient sur toi, t'opposer à leur utilisation ou demander leur limitation, en écrivant à ${mailLink(mail)}. Tu peux aussi saisir la CNIL : <a href="https://www.cnil.fr" target="_blank" rel="noopener">cnil.fr</a>.</p>`;
}

function legalAllergenes() {
  const list = ['Céréales contenant du gluten (blé, seigle, orge, avoine…)', 'Crustacés', 'Œufs', 'Poissons', 'Arachides', 'Soja', 'Lait (lactose compris)', 'Fruits à coque', 'Céleri', 'Moutarde', 'Graines de sésame', 'Anhydride sulfureux et sulfites', 'Lupin', 'Mollusques'];
  return `
  <p>La réglementation impose d'informer sur 14 allergènes. Ils peuvent se trouver dans les plats, les sauces, les panures ou les pains :</p>
  <ul>${list.map(x => `<li>${esc(x)}</li>`).join('')}</ul>
  <p>Tous les plats sont préparés dans la même cuisine : des traces d'allergènes sont possibles partout.</p>
  <p><strong>Allergie ou intolérance ?</strong> Écris-le dans la remarque de ta commande et appelle-nous au <a href="${esc(siteHref.tel())}">${esc(SITE.phoneDisplay)}</a> avant de commander : l'équipe te dit ce que contient chaque plat.</p>
  <p>${fieldHTML(LEGAL.allergenNote, '[À compléter par le restaurant : tableau des allergènes de chaque plat, à tenir à disposition des clients.]')}</p>`;
}

function legalContent(kind) {
  return kind === 'mentions' ? legalMentions() : kind === 'confidentialite' ? legalConfidentialite() : legalAllergenes();
}
function openLegal(kind, opener) {
  if (!LEGAL_TITLES[kind]) return;
  legalKind = kind;
  $('#legalTitle').textContent = LEGAL_TITLES[kind];
  $('#legalBody').innerHTML = legalContent(kind);
  $('#legalBody').scrollTop = 0;
  const dlg = $('#legalDlg');
  if (!DLG.stack.includes(dlg)) openDialog(dlg, opener);
}
function refreshLegal() {
  const dlg = $('#legalDlg');
  if (!legalKind || !DLG.stack.includes(dlg)) return;
  const st = $('#legalBody').scrollTop;
  $('#legalBody').innerHTML = legalContent(legalKind);
  $('#legalBody').scrollTop = st;
  dlg.focus({ preventScroll: true });
}

/* ---------- Espace équipe : plats épuisés sur cet appareil (code vérifié par empreinte SHA-256) ---------- */
async function hashPin(pin) {
  if (!(window.crypto && crypto.subtle && window.TextEncoder)) return null;
  const buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(pin));
  return Array.from(new Uint8Array(buf)).map(b => b.toString(16).padStart(2, '0')).join('');
}
const vendorUnlocked = () => SS.get(KEYS.vendor) === '1';

function renderVendor() {
  const el = $('#vendorList'); if (!el) return;
  el.innerHTML = CATEGORIES.map(c => {
    const items = PRODUCTS.filter(p => p.cat === c.id);
    return `<h3 class="vendor-cat">${esc(c.label)}</h3>` + items.map(p => {
      const siteOut = soldOutIds.has(p.id), out = isOut(p);
      const label = `${p.name} : ${siteOut ? 'épuisé pour tout le monde (réglage du site)' : out ? 'épuisé, toucher pour remettre en vente' : 'en vente, toucher pour marquer épuisé'}`;
      return `<button type="button" class="vendor-item${out ? ' is-out' : ''}" data-action="stock" data-id="${p.id}" aria-label="${esc(label)}"${siteOut ? ' disabled' : ''}>
        <span><span class="vi-name">${esc(p.name)}</span> <span class="vi-id" aria-hidden="true">n° ${p.id}</span>${siteOut ? '<small>Épuisé pour tout le monde (réglage du site)</small>' : ''}</span>
        <span class="vendor-toggle" aria-hidden="true"></span></button>`;
    }).join('');
  }).join('');
}
function openVendor(opener) {
  const unlocked = vendorUnlocked(), pin = $('#pinInput');
  $('#pinForm').hidden = unlocked;
  $('#vendorContent').hidden = !unlocked;
  $('#pinErr').hidden = true;
  pin.value = '';
  if (unlocked) { renderVendor(); pin.removeAttribute('data-autofocus'); } else pin.setAttribute('data-autofocus', '');
  openDialog($('#vendorDlg'), opener);
}
function refreshAvailability() {
  renderStars();
  renderMenu();
  renderCart();
}
function toggleStock(id) {
  const p = byId(id); if (!p || soldOutIds.has(id)) return;
  if (stock[id]) delete stock[id]; else stock[id] = true;
  LS.set(KEYS.stock, stock);
  refreshAvailability();
  renderVendor();
  const b = $$('#vendorList [data-id]').find(x => Number(x.dataset.id) === id);
  if (b) b.focus({ preventScroll: true });
}
async function submitPin(e) {
  e.preventDefault();
  const input = $('#pinInput'), err = $('#pinErr');
  const h = await hashPin(input.value.trim());
  if (h === null) { err.textContent = 'Le code équipe fonctionne uniquement sur une connexion sécurisée (https).'; err.hidden = false; return; }
  if (h === SITE.vendorPinHash) {
    SS.set(KEYS.vendor, '1');
    err.hidden = true; input.value = '';
    $('#pinForm').hidden = true; $('#vendorContent').hidden = false;
    renderVendor();
    $('#vendorReset').focus({ preventScroll: true });
  } else {
    err.textContent = 'Code incorrect. Réessaie.'; err.hidden = false;
    input.value = ''; input.focus();
    input.classList.remove('shake'); void input.offsetWidth; input.classList.add('shake');
  }
}
function resetStock() {
  stock = {};
  LS.del(KEYS.stock);
  refreshAvailability();
  renderVendor();
  toast('Tous les plats sont remis en vente');
}

/* ---------- Données du navigateur ---------- */
function loadState() {
  const f = LS.get(KEYS.favs, []);
  favs = (Array.isArray(f) ? f : []).map(Number).filter((id, i, a) => byId(id) && a.indexOf(id) === i);
  const s = LS.get(KEYS.stock, {});
  stock = {};
  if (s && typeof s === 'object') Object.keys(s).forEach(k => { if (s[k] && byId(Number(k))) stock[Number(k)] = true; });
}
function clearLocalData() {
  [KEYS.cart, KEYS.favs, KEYS.last, KEYS.name, KEYS.maps].forEach(k => LS.del(k));
  cart = []; favs = []; cartMode = 'edit'; pickupChoice = 'asap';
  const nm = $('#custName'), nt = $('#custNote');
  if (nm) nm.value = '';
  if (nt) nt.value = '';
  renderCart(); renderStars(); renderMenu(); renderMap(); refreshLegal();
  toast('Données effacées sur cet appareil');
}

/* ---------- Navigation ---------- */
function showCategory(cat) {
  Object.assign(filt, { cat, q: '', budget: 'all', favs: false });
  const input = $('#menuSearch'); if (input) input.value = '';
  renderMenu();
}
function goTo(hash) {
  const el = hash && hash.length > 1 ? $(hash) : null; if (!el) return;
  requestAnimationFrame(() => el.scrollIntoView({ behavior: reduceMotion() ? 'auto' : 'smooth', block: 'start' }));
  try { history.replaceState(null, '', hash); } catch (e) {}
}
/* Lien direct vers un plat : #produit-12 */
function handleHash() {
  const m = /^#produit-(\d+)$/.exec(location.hash);
  if (!m) return;
  const p = byId(Number(m[1])); if (!p) return;
  resetFilters();
  const card = $(`#p-${p.id}`);
  if (card) {
    card.scrollIntoView({ block: 'center' });
    card.classList.add('flash');
    setTimeout(() => card.classList.remove('flash'), 2400);
  }
  try { history.replaceState(null, '', location.pathname + location.search); } catch (e) {}
  if (needsConfig(p) && !isOut(p)) openConfig(p.id, card ? $('.add', card) : null);
}
/* Après un clic sur +/− dans le panier, le HTML est refait : on rend le focus au bon bouton */
function refocusQty(key, d) {
  const btns = $$('#cartLines [data-action="qty"]');
  const b = btns.find(x => x.dataset.key === key && x.dataset.d === d) || btns[0];
  if (b) { b.focus({ preventScroll: true }); return; }
  const dlg = $('#cartDlg');
  if (dlg && DLG.stack.includes(dlg)) ($('#cartEmpty .btn', dlg) || dlg).focus({ preventScroll: true });
}

/* ---------- Événements ---------- */
function bindGlobalEvents() {
  document.addEventListener('click', (e) => {
    const t = e.target;
    const lg = t.closest('[data-legal]');
    if (lg) { e.preventDefault(); openLegal(lg.dataset.legal, lg); return; }
    const nc = t.closest('[data-nav-cat]');
    if (nc) { e.preventDefault(); closeDialog($('#navDlg')); showCategory(nc.dataset.navCat); goTo('#carte'); return; }
    const nl = t.closest('[data-nav-link]');
    if (nl) { e.preventDefault(); closeDialog($('#navDlg')); goTo(nl.getAttribute('href')); return; }
    const a = t.closest('[data-action]'); if (!a) return;
    const id = Number(a.dataset.id);
    switch (a.dataset.action) {
      case 'pick': { const card = a.closest('.card'); pick(id, (card && card.querySelector('.add')) || a); break; }
      case 'fav': toggleFav(id); break;
      case 'open-cart': openCart(a); break;
      case 'open-nav': openDialog($('#navDlg'), a); break;
      case 'open-vendor': openVendor(a); break;
      case 'close': closeDialog(a.closest('.dlg')); break;
      case 'goto-menu': closeDialog($('#cartDlg')); goTo('#carte'); break;
      case 'reset-filters': resetFilters(); break;
      case 'qty': changeQty(a.dataset.key, Number(a.dataset.d)); refocusQty(a.dataset.key, a.dataset.d); break;
      case 'reorder': reorderLast(); renderPickup(); break;
      case 'clear-cart': clearCart(); closeDialog($('#cartDlg')); break;
      case 'back-to-cart': cartMode = 'edit'; renderCart(); renderPickup(); break;
      case 'map-on': LS.set(KEYS.maps, true); renderMap(); refreshLegal(); { const b = $('#mapBox .map-off'); if (b && !b.closest('[inert]')) b.focus({ preventScroll: true }); } break;
      case 'map-off': LS.del(KEYS.maps); renderMap(); refreshLegal(); { const b = $('#mapBox [data-action="map-on"]'); if (b && !b.closest('[inert]')) b.focus({ preventScroll: true }); } break;
      case 'clear-local': clearLocalData(); break;
      case 'stock': toggleStock(id); break;
    }
  });

  $('#sendWa').addEventListener('click', () => {
    sendOrder();
    if (cartMode === 'done') { $('#cartBody').scrollTop = 0; const b = $('#cartDone .btn'); if (b) b.focus({ preventScroll: true }); }
  });
  $('#copyOrder').addEventListener('click', copyOrder);
  $('#orderForm').addEventListener('submit', (e) => { e.preventDefault(); $('#sendWa').click(); });
  $('#custName').addEventListener('input', () => {
    const nm = $('#custName');
    if (nm.value.trim()) { nm.removeAttribute('aria-invalid'); $('#nameErr').hidden = true; }
  });
  $('#pickup').addEventListener('change', (e) => { pickupChoice = e.target.value; });
  $('#pinForm').addEventListener('submit', submitPin);
  $('#vendorReset').addEventListener('click', resetStock);
  $('#legalDlg')._onClose = () => { legalKind = null; };

  window.addEventListener('hashchange', handleHash);
  document.addEventListener('visibilitychange', () => { if (!document.hidden) tick(); });
}

/* Mise à jour régulière : statut ouvert/fermé, tableau des horaires, créneaux de retrait */
function tick() {
  updateStatus();
  if (cartMode === 'edit' && DLG.stack.includes($('#cartDlg'))) renderPickup();
}
function initObservers() {
  const bar = $('#catbar');
  if (!bar || !window.ResizeObserver) return;
  const set = () => document.documentElement.style.setProperty('--catbar-h', `${bar.offsetHeight}px`);
  new ResizeObserver(set).observe(bar);
  set();
}

/* ---------- Démarrage ---------- */
function init() {
  safe(loadState);
  safe(applySiteConfig);
  safe(initTicker);
  safe(renderStars);
  safe(initStarsNav);
  safe(renderCatChips);
  safe(renderMenu);
  safe(bindMenuEvents);
  safe(initChipScroll);
  safe(renderPoster);
  safe(renderFAQ);
  safe(injectJsonLd);
  safe(renderMap);
  safe(initDialogs);
  safe(initConfig);
  safe(bindGlobalEvents);
  safe(loadCart);
  safe(renderCart);
  safe(updateStatus);
  safe(initObservers);
  setInterval(() => safe(tick), 30000);
  safe(handleHash);
}
if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
