document.addEventListener('DOMContentLoaded', () => {
  let translations = {};
  let currentLang = localStorage.getItem('lang') || 'en';

  function applyLang(lang) {
    currentLang = lang;
    localStorage.setItem('lang', lang);
    document.documentElement.lang = (lang === 'en') ? 'en' : 'sv';

    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      const text = translations[lang] && translations[lang][key];
      if (text !== undefined) {
        // keep placeholders for inputs, otherwise set innerHTML (supports <br>)
        if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
          el.placeholder = text;
        } else {
          el.innerHTML = text;
        }
      }
    });

    document.querySelectorAll('.lang-name').forEach(el => {
      if (translations[lang] && translations[lang]['lang.name']) el.textContent = translations[lang]['lang.name'];
    });
  }

  function initButtons() {
    document.querySelectorAll('.language-selector').forEach(btn => {
      btn.addEventListener('click', () => {
        const newLang = currentLang === 'en' ? 'sv' : 'en';
        applyLang(newLang);
      });
    });
  }

  // try to load external JSON. If it fails, fall back to an inline default.
  fetch('language.json')
    .then(res => res.ok ? res.json() : Promise.reject())
    .then(data => {
      translations = data;
      applyLang(currentLang);
      initButtons();
    })
    .catch(() => {
      // fallback translations (shouldn't be needed if language.json exists)
      translations = {
        en: {
          "logo": "DIPLO",
          "nav.about": "About",
          "nav.privacy": "Privacy",
          "nav.contact": "Contact",
          "homepage.starter_text": "Learn Math <br>Revolutionary <br>Tools and Ease!",
          "homepage.get_started": "Get started",
          "homepage.about_link": "About",
          "math.title": "Welcome to Math!",
          "subject.math": "Math",
          "about.title": "About",
          "footer.copy": "© 2026 Diplo",
          "lang.name": "English"
        },
        sv: {
          "logo": "DIPLO",
          "nav.about": "Om oss",
          "nav.privacy": "Privatliv",
          "nav.contact": "Kontakt",
          "homepage.starter_text": "Lär dig <br>matematikens revolutionerande <br>verktyg och gör det enkelt!",
          "homepage.get_started": "Kom igång",
          "homepage.about_link": "Om oss",
          "math.title": "Välkommen till Matematik!",
          "subject.math": "Matematik",
          "about.title": "Om oss",
          "footer.copy": "© 2026 Diplo",
          "lang.name": "Svenska"
        }
      };
      applyLang(currentLang);
      initButtons();
    });
});