"use strict";
const menuBtn = document.getElementById('menu-btn');
const mobileMenu = document.getElementById('mobile-menu');
if (menuBtn && mobileMenu) {
    menuBtn.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
        menuBtn.setAttribute('aria-expanded', String(!mobileMenu.classList.contains('hidden')));
    });
    mobileMenu.querySelectorAll('a').forEach((link) => {
        link.addEventListener('click', () => {
            mobileMenu.classList.add('hidden');
            menuBtn.setAttribute('aria-expanded', 'false');
        });
    });
}
const animatedElements = document.querySelectorAll('[data-animate]');
const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.15 });
animatedElements.forEach((element) => observer.observe(element));
async function fetchVerseOfTheDay() {
    var _a, _b;
    const targetUrl = encodeURIComponent('https://www.bible.com/es/verse-of-the-day');
    const proxyUrl = `https://api.allorigins.win/raw?url=${targetUrl}`;
    const response = await fetch(proxyUrl, { method: 'GET' });
    if (!response.ok) {
        throw new Error(`No se pudo cargar bible.com (${response.status})`);
    }
    const html = await response.text();
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');
    const ogTitle = (_a = doc.querySelector('meta[property="og:title"]')) === null || _a === void 0 ? void 0 : _a.getAttribute('content');
    const ogDescription = (_b = doc.querySelector('meta[property="og:description"]')) === null || _b === void 0 ? void 0 : _b.getAttribute('content');
    return {
        title: (ogTitle === null || ogTitle === void 0 ? void 0 : ogTitle.trim()) || 'Versículo del día',
        description: (ogDescription === null || ogDescription === void 0 ? void 0 : ogDescription.trim()) || 'Lee la reflexión y el versículo del día en Bible.com.',
        url: 'https://www.bible.com/es/verse-of-the-day'
    };
}
function renderVerseNews(news) {
    const root = document.getElementById('bible-news');
    if (!root)
        return;
    root.innerHTML = `
    <article class="rounded-2xl bg-white p-6 shadow-card border border-slate-200">
      <p class="text-xs uppercase tracking-[0.2em] text-brand-700 font-semibold">Actualizado desde Bible.com</p>
      <h3 class="mt-3 text-2xl font-black text-brand-900">${news.title}</h3>
      <p class="mt-3 text-slate-600">${news.description}</p>
      <a href="${news.url}" target="_blank" rel="noopener noreferrer" class="mt-5 inline-block rounded-full bg-accent px-5 py-2.5 text-sm font-black text-brand-900 hover:brightness-95 transition">
        Ver en Bible.com
      </a>
    </article>
  `;
}
function renderVerseFallback(errorMessage) {
    const root = document.getElementById('bible-news');
    if (!root)
        return;
    root.innerHTML = `
    <article class="rounded-2xl bg-white p-6 shadow-card border border-slate-200">
      <p class="text-xs uppercase tracking-[0.2em] text-brand-700 font-semibold">Noticias / Versículo del día</p>
      <h3 class="mt-3 text-2xl font-black text-brand-900">No se pudo sincronizar automáticamente</h3>
      <p class="mt-3 text-slate-600">${errorMessage}</p>
      <a href="https://www.bible.com/es/verse-of-the-day" target="_blank" rel="noopener noreferrer" class="mt-5 inline-block rounded-full bg-accent px-5 py-2.5 text-sm font-black text-brand-900 hover:brightness-95 transition">
        Abrir Bible.com
      </a>
    </article>
  `;
}
fetchVerseOfTheDay()
    .then(renderVerseNews)
    .catch((error) => {
    const message = error instanceof Error
        ? `${error.message}. Puedes abrir la fuente oficial manualmente.`
        : 'Puedes abrir la fuente oficial manualmente.';
    renderVerseFallback(message);
});
