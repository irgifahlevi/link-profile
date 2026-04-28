/* ============================================
   script.js — Dark Mode & Language Switcher
   ============================================ */

/* ---------- Language Data ---------- */
const LANG_DATA = {
  en: {
    status:         'Open for collaboration',
    bio:            'Backend Developer & Tech Enthusiast. Passionate about building scalable web applications and exploring new technologies. Always eager to collaborate on exciting projects and contribute to the developer community.',
    sectionTitle:   'My Links',
    nowPlaying:     'Now Playing',
    footer:         'Made with ❤️ by Irgi Fahlevi',
    link_portfolio: 'Portfolio',
    link_github:    'GitHub',
    link_linkedin:  'LinkedIn',
    link_youtube:   'YouTube',
    link_discord:   'Discord',
  },
  id: {
    status:         'Terbuka untuk kolaborasi',
    bio:            'Pengembang Backend & Penggemar Teknologi. Bersemangat membangun aplikasi web yang skalabel dan mengeksplorasi teknologi baru. Selalu ingin berkolaborasi dalam proyek menarik dan berkontribusi pada komunitas pengembang.',
    sectionTitle:   'Tautan Saya',
    nowPlaying:     'Sedang Diputar',
    footer:         'Dibuat dengan ❤️ oleh Irgi Fahlevi',
    link_portfolio: 'Portofolio',
    link_github:    'GitHub',
    link_linkedin:  'LinkedIn',
    link_youtube:   'YouTube',
    link_discord:   'Discord',
  },
  jp: {
    status:         '協力募集中',
    bio:            'フルスタック開発者 & UIデザイナー • 美しいデジタル体験を構築',
    sectionTitle:   'リンク',
    nowPlaying:     '再生中',
    footer:         '❤️ で作った by Alex Morgan',
    link_portfolio: 'ポートフォリオ',
    link_github:    'GitHub',
    link_linkedin:  'LinkedIn',
    link_youtube:   'YouTube',
    link_discord:   'Discord',
  },
};

const LANG_LABELS = { en: 'EN', id: 'ID', jp: 'JP' };

/* ---------- DOM ---------- */
const html         = document.documentElement;
const themeToggle  = document.getElementById('themeToggle');
const langToggle   = document.getElementById('langToggle');
const langDropdown = document.getElementById('langDropdown');
const langLabel    = document.getElementById('langLabel');
const langOptions  = document.querySelectorAll('.lang-option');

/* ---------- Theme ---------- */
let currentTheme = localStorage.getItem('theme') || 'light';

function applyTheme(theme) {
  currentTheme = theme;
  html.setAttribute('data-theme', theme);
  localStorage.setItem('theme', theme);
}

themeToggle.addEventListener('click', () => {
  applyTheme(currentTheme === 'light' ? 'dark' : 'light');
});

/* ---------- Language ---------- */
let currentLang = localStorage.getItem('preferred_lang') || 'en';

function applyLanguage(lang) {
  if (!LANG_DATA[lang]) return;
  currentLang = lang;

  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.dataset.i18n;
    if (LANG_DATA[lang][key] !== undefined) el.textContent = LANG_DATA[lang][key];
  });

  langLabel.textContent = LANG_LABELS[lang];

  langOptions.forEach(opt => {
    opt.classList.toggle('active', opt.dataset.langCode === lang);
  });

  localStorage.setItem('preferred_lang', lang);
}

/* Dropdown */
function openDropdown() {
  langDropdown.classList.add('is-open');
  langToggle.setAttribute('aria-expanded', 'true');
}
function closeDropdown() {
  langDropdown.classList.remove('is-open');
  langToggle.setAttribute('aria-expanded', 'false');
}

langToggle.addEventListener('click', e => {
  e.stopPropagation();
  langDropdown.classList.contains('is-open') ? closeDropdown() : openDropdown();
});

langOptions.forEach(opt => {
  opt.addEventListener('click', () => {
    applyLanguage(opt.dataset.langCode);
    closeDropdown();
  });
});

document.addEventListener('click', () => closeDropdown());
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeDropdown(); });

/* ---------- Init ---------- */
function init() {
  if (typeof lucide !== 'undefined') lucide.createIcons();
  applyTheme(currentTheme);
  applyLanguage(currentLang);
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}