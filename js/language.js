/**
 * VIF.Dev Portfolio - Language/i18n System
 * Handles English/Filipino language switching with localStorage persistence
 */

const translations = {
  en: {
    // Navbar
    'nav.home': 'Home',
    'nav.about': 'About',
    'nav.personality': 'Personality',
    'nav.skills': 'Skills',
    'nav.education': 'Education',
    'nav.certifications': 'Certifications',
    'nav.projects': 'Projects',
    'nav.contact': 'Contact',
    
    // Hero
    'hero.badge': 'Open for Work',
    'hero.greeting': "Hi, I'm",
    'hero.viewWork': 'View My Work',
    'hero.getInTouch': 'Get in Touch',
    'hero.scrollDown': 'Scroll Down',
    
    // Typed text phrases
    'hero.typed.1': 'Full Stack Developer',
    'hero.typed.2': 'React & Vue.js Enthusiast',
    'hero.typed.3': 'Building Modern Web Experiences',
    'hero.typed.4': 'Clean Code Advocate',
    'hero.typed.5': 'Problem Solver & Innovator',
    
    // About
    'about.title': 'About Me',
    'about.lead': 'A passionate Full Stack Developer dedicated to building exceptional digital experiences.',
    'about.p1': "Hello! I'm <strong>Voun Irish Florence Dejumo</strong>, an aspiring Full Stack Developer with a deep passion for creating modern, responsive and user-centric web applications. I specialize in JavaScript ecosystems including React and Vue.js, complemented by robust backend development using Laravel, Spring Boot and database management with MySQL.",
    'about.p2': "My journey in technology is driven by curiosity and a constant desire to learn. I love exploring new technologies, contributing to open-source projects and transforming complex problems into elegant, intuitive solutions. When I'm not coding, you'll find me exploring the latest tech trends or working on personal projects.",
    'about.tag.cleanCode': 'Clean Code Advocate',
    'about.tag.problemSolver': 'Problem Solver',
    'about.tag.teamPlayer': 'Team Player',
    'about.tag.continuousLearner': 'Continuous Learner',
    'about.stat.yearsLearning': 'Years Learning',
    'about.stat.projects': 'Projects',
    'about.stat.technologies': 'Technologies',
    
    // Skills
    'skills.title': 'Skills & Expertise',
    'skills.subtitle': 'Technologies and tools I work with to bring ideas to life',
    'skills.frontend': 'Frontend Development',
    'skills.frontend.desc': 'Creating responsive and interactive user interfaces with modern frameworks.',
    'skills.backend': 'Backend Development',
    'skills.backend.desc': 'Building robust server-side applications and RESTful APIs.',
    'skills.database': 'Database & DevOps',
    'skills.database.desc': 'Managing data and deploying applications efficiently.',
    'skills.techStack': 'Tech Stack',
    'skills.techStack.desc': 'Tools and technologies in my daily workflow —',
    'skills.techStack.hover': 'hover to see proficiency',
    
    // Projects
    'projects.title': 'Featured Projects',
    'projects.subtitle': 'A showcase of my recent work and creative endeavors',
    'projects.liveDemo': 'Live Demo',
    'projects.sourceCode': 'Source Code',
    'projects.viewAll': 'View All Projects on GitHub',
    
    // Contact
    'contact.title': 'Get In Touch',
    'contact.subtitle': 'Have a project in mind? Let\'s work together!',
    'contact.connect': 'Let\'s Connect',
    'contact.lead': "I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision.",
    'contact.desc': "Whether you have a question, want to collaborate on a project, or just want to say hello, feel free to reach out. I'll try my best to get back to you as soon as possible!",
    'contact.form.name': 'Your Name',
    'contact.form.email': 'Your Email',
    'contact.form.subject': 'Subject',
    'contact.form.message': 'Your Message',
    'contact.form.send': 'Send Message',
    'contact.form.sending': 'Sending...',
    'contact.form.success': 'Message sent successfully! I\'ll get back to you soon.',
    'contact.form.error': 'Something went wrong. Please try again or email me directly.',
    
    // Footer
    'footer.copyright': 'All rights reserved.',
    'footer.madeWith': 'Made with',
    'footer.and': 'and',
  },
  
  fil: {
    // Navbar
    'nav.home': 'Tahanan',
    'nav.about': 'Tungkol',
    'nav.personality': 'Personalidad',
    'nav.skills': 'Kasanayan',
    'nav.education': 'Edukasyon',
    'nav.certifications': 'Sertipikasyon',
    'nav.projects': 'Proyekto',
    'nav.contact': 'Kontak',
    
    // Hero
    'hero.badge': 'Bukas para sa Trabaho',
    'hero.greeting': 'Kumusta, ako si',
    'hero.viewWork': 'Tingnan ang Gawa Ko',
    'hero.getInTouch': 'Makipag-ugnayan',
    'hero.scrollDown': 'Mag-scroll Pababa',
    
    // Typed text phrases
    'hero.typed.1': 'Full Stack Developer',
    'hero.typed.2': 'React & Vue.js Enthusiast',
    'hero.typed.3': 'Gumagawa ng Modernong Web',
    'hero.typed.4': 'Tagapagtaguyod ng Malinis na Code',
    'hero.typed.5': 'Tagalutas ng Problema at Innovator',
    
    // About
    'about.title': 'Tungkol sa Akin',
    'about.lead': 'Isang masigasig na Full Stack Developer na nakatuon sa pagbuo ng mga pambihirang digital na karanasan.',
    'about.p1': 'Kumusta! Ako si <strong>Voun Irish Florence Dejumo</strong>, isang naghahangad na Full Stack Developer na may malalim na hilig sa paglikha ng mga moderno, responsive at user-centric na web application. Dalubhasa ako sa JavaScript ecosystems kabilang ang React at Vue.js, na sinusuportahan ng matatag na backend development gamit ang Laravel, Spring Boot at database management sa MySQL.',
    'about.p2': 'Ang aking paglalakbay sa teknolohiya ay hinihimok ng kuryosidad at patuloy na pagnanais na matuto. Mahilig akong mag-explore ng mga bagong teknolohiya, mag-ambag sa mga open-source na proyekto at gawing elegante at intuitive na solusyon ang mga kumplikadong problema. Kapag hindi ako nagko-code, makikita mo akong nag-eeksplor ng pinakabagong tech trends o nagtatrabaho sa mga personal na proyekto.',
    'about.tag.cleanCode': 'Tagapagtaguyod ng Malinis na Code',
    'about.tag.problemSolver': 'Tagalutas ng Problema',
    'about.tag.teamPlayer': 'Manlalaro ng Koponan',
    'about.tag.continuousLearner': 'Patuloy na Nag-aaral',
    'about.stat.yearsLearning': 'Taon ng Pag-aaral',
    'about.stat.projects': 'Proyekto',
    'about.stat.technologies': 'Teknolohiya',
    
    // Skills
    'skills.title': 'Kasanayan at Kadalubhasaan',
    'skills.subtitle': 'Mga teknolohiya at tool na ginagamit ko para mabuhay ang mga ideya',
    'skills.frontend': 'Frontend Development',
    'skills.frontend.desc': 'Paglikha ng mga responsive at interactive na user interface gamit ang mga modernong framework.',
    'skills.backend': 'Backend Development',
    'skills.backend.desc': 'Pagbuo ng matatag na server-side applications at RESTful APIs.',
    'skills.database': 'Database at DevOps',
    'skills.database.desc': 'Pamamahala ng data at mahusay na pag-deploy ng mga application.',
    'skills.techStack': 'Tech Stack',
    'skills.techStack.desc': 'Mga tool at teknolohiya sa aking pang-araw-araw na workflow —',
    'skills.techStack.hover': 'mag-hover para makita ang kahusayan',
    
    // Projects
    'projects.title': 'Mga Tampok na Proyekto',
    'projects.subtitle': 'Isang showcase ng aking mga kamakailang gawa at mga malikhaing pagsisikap',
    'projects.liveDemo': 'Live Demo',
    'projects.sourceCode': 'Source Code',
    'projects.viewAll': 'Tingnan Lahat ng Proyekto sa GitHub',
    
    // Contact
    'contact.title': 'Makipag-ugnayan',
    'contact.subtitle': 'May proyekto sa isip? Magtulungan tayo!',
    'contact.connect': 'Mag-connect Tayo',
    'contact.lead': 'Lagi akong bukas sa pagtalakay ng mga bagong proyekto, malikhaing ideya, o mga oportunidad na maging bahagi ng iyong bisyon.',
    'contact.desc': 'Kung may tanong ka, gustong makipagtulungan sa isang proyekto, o gusto mo lang bumati, huwag mag-atubiling makipag-ugnayan. Susubukan kong sumagot sa iyo sa lalong madaling panahon!',
    'contact.form.name': 'Ang Pangalan Mo',
    'contact.form.email': 'Ang Email Mo',
    'contact.form.subject': 'Paksa',
    'contact.form.message': 'Ang Mensahe Mo',
    'contact.form.send': 'Ipadala ang Mensahe',
    'contact.form.sending': 'Ipinapadala...',
    'contact.form.success': 'Matagumpay na naipadala ang mensahe! Sasagutin kita sa lalong madaling panahon.',
    'contact.form.error': 'May nangyaring mali. Subukan ulit o direktang mag-email sa akin.',
    
    // Footer
    'footer.copyright': 'Lahat ng karapatan ay nakalaan.',
    'footer.madeWith': 'Ginawa nang may',
    'footer.and': 'at',
  }
};

class LanguageManager {
  constructor() {
    this.currentLang = 'en';
    this.storageKey = 'vif-portfolio-lang';
    this.toggleBtn = null;
  }

  /**
   * Initialize language system
   */
  init() {
    this.loadSavedLanguage();
    this.createToggleButton();
    this.applyLanguage(this.currentLang);
    this.bindEvents();
  }

  /**
   * Load saved language from localStorage
   */
  loadSavedLanguage() {
    const savedLang = localStorage.getItem(this.storageKey);
    if (savedLang && translations[savedLang]) {
      this.currentLang = savedLang;
    }
  }

  /**
   * Create the language toggle button
   */
  createToggleButton() {
    // Check if navbar button exists first
    const navbarBtn = document.getElementById('langToggleNavbar');
    if (navbarBtn) {
      this.toggleBtn = navbarBtn;
      this.toggleBtn.querySelector('.lang-code').textContent = this.currentLang.toUpperCase();
      return;
    }

    // Fallback: create fixed position button (shouldn't be needed now)
    if (document.querySelector('.lang-toggle')) return;

    const button = document.createElement('button');
    button.className = 'lang-toggle';
    button.setAttribute('aria-label', 'Toggle language');
    button.setAttribute('title', 'Switch language (EN/FIL)');
    button.innerHTML = `
      <span class="lang-code">${this.currentLang.toUpperCase()}</span>
    `;

    document.body.appendChild(button);
    this.toggleBtn = button;
  }

  /**
   * Apply translations to the page
   */
  applyLanguage(lang) {
    if (!translations[lang]) return;

    this.currentLang = lang;
    localStorage.setItem(this.storageKey, lang);
    document.documentElement.setAttribute('lang', lang === 'fil' ? 'fil' : 'en');

    // Update all elements with data-i18n attribute
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      const translation = this.t(key);
      
      if (el.hasAttribute('data-i18n-html')) {
        el.innerHTML = translation;
      } else {
        el.textContent = translation;
      }
    });

    // Update placeholder attributes
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
      const key = el.getAttribute('data-i18n-placeholder');
      el.placeholder = this.t(key) || el.placeholder;
    });

    // Update button text
    if (this.toggleBtn) {
      this.toggleBtn.querySelector('.lang-code').textContent = lang.toUpperCase();
      this.toggleBtn.setAttribute('aria-label', `Current language: ${lang === 'en' ? 'English' : 'Filipino'}. Click to switch.`);
    }

    // Update typed text phrases if animation manager exists
    if (window.animationManager && typeof window.animationManager.updateTypedPhrases === 'function') {
      window.animationManager.updateTypedPhrases(this.getTypedPhrases());
    }

    // Dispatch event
    document.dispatchEvent(new CustomEvent('languageChanged', { detail: { lang } }));
  }

  /**
   * Get translation by key
   */
  t(key) {
    return translations[this.currentLang]?.[key] || translations['en']?.[key] || key;
  }

  /**
   * Get typed phrases for current language
   */
  getTypedPhrases() {
    return [
      this.t('hero.typed.1'),
      this.t('hero.typed.2'),
      this.t('hero.typed.3'),
      this.t('hero.typed.4'),
      this.t('hero.typed.5')
    ];
  }

  /**
   * Toggle between languages
   */
  toggle() {
    const newLang = this.currentLang === 'en' ? 'fil' : 'en';
    this.applyLanguage(newLang);
  }

  /**
   * Bind event listeners
   */
  bindEvents() {
    if (this.toggleBtn) {
      this.toggleBtn.addEventListener('click', () => this.toggle());
    }

    // Keyboard shortcut: Ctrl/Cmd + Shift + L
    document.addEventListener('keydown', (e) => {
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'L') {
        e.preventDefault();
        this.toggle();
      }
    });
  }

  /**
   * Get current language
   */
  getLanguage() {
    return this.currentLang;
  }
}

// Create global instance
window.languageManager = new LanguageManager();

// Initialize after components are loaded
document.addEventListener('allComponentsLoaded', () => {
  window.languageManager.init();
});

// Fallback initialization
if (document.readyState === 'complete') {
  setTimeout(() => {
    if (!document.querySelector('.lang-toggle')) {
      window.languageManager.init();
    }
  }, 1000);
}

// Export for module use
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { LanguageManager, translations };
}
