/**
 * Vidare - JavaScript Integrado
 * Demonstração de funcionalidades modernas e interativas
 */

// ==============================
// Utilitários e Helpers
// ==============================

const utils = {
  // Debounce para otimizar performance
  debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  },

  // Throttle para eventos de scroll
  throttle(func, limit) {
    let inThrottle;
    return function() {
      const args = arguments;
      const context = this;
      if (!inThrottle) {
        func.apply(context, args);
        inThrottle = true;
        setTimeout(() => inThrottle = false, limit);
      }
    };
  },

  // Animação suave para elementos
  animateElement(element, animation, duration = 300) {
    element.style.animation = `${animation} ${duration}ms ease-in-out`;
    setTimeout(() => {
      element.style.animation = '';
    }, duration);
  },

  // Verificar se elemento está visível na viewport
  isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  }
};

// ==============================
// Navegação e Header
// ==============================

class NavigationManager {
  constructor() {
    this.header = document.querySelector('.site-header');
    this.navToggle = document.querySelector('.nav-toggle');
    this.mainNav = document.querySelector('.main-nav');
    this.navLinks = document.querySelectorAll('.main-nav a');
    this.lastScrollY = window.scrollY;
    this.isNavOpen = false;
    this.sections = [];
    
    this.init();
  }

  init() {
    this.updateHeaderOffset();

    // Header scroll behavior
    window.addEventListener('scroll', utils.throttle(() => {
      this.handleScroll();
    }, 16));

    // Mobile navigation toggle
    if (this.navToggle) {
      this.navToggle.addEventListener('click', () => {
        this.toggleMobileNav();
      });
    }

    // Smooth scroll para links internos
    this.navLinks.forEach(link => {
      if (link.getAttribute('href').startsWith('#')) {
        link.addEventListener('click', (e) => {
          this.handleSmoothScroll(e, link);
        });
      }
    });

    // Fechar menu mobile ao clicar em link
    this.navLinks.forEach(link => {
      link.addEventListener('click', () => {
        if (this.isNavOpen) {
          this.toggleMobileNav();
        }
      });
    });

    // Fechar menu mobile ao clicar fora
    document.addEventListener('click', (e) => {
      if (this.isNavOpen && !this.mainNav.contains(e.target) && !this.navToggle.contains(e.target)) {
        this.toggleMobileNav();
      }
    });

    // Destacar link ativo baseado na seção visível
    this.setupActiveNavigation();
  }

  handleScroll() {
    const currentScrollY = window.scrollY;
    this.header.classList.remove('hide');
    this.updateActiveOnScroll();
    this.lastScrollY = currentScrollY;
  }

  toggleMobileNav() {
    this.isNavOpen = !this.isNavOpen;
    this.mainNav.classList.toggle('open');
    this.navToggle.setAttribute('aria-expanded', this.isNavOpen);
    
    // Animação do ícone hamburger
    utils.animateElement(this.navToggle, 'rotate', 300);
    
    // Prevenir scroll do body quando menu está aberto
    document.body.style.overflow = this.isNavOpen ? 'hidden' : '';

    this.setupActiveNavigation();
  }

  handleSmoothScroll(e, link) {
    e.preventDefault();
    const targetId = link.getAttribute('href').substring(1);
    const targetElement = document.getElementById(targetId);
    this.updateHeaderOffset();
    
    if (targetElement) {
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      const behavior = prefersReducedMotion ? 'auto' : 'smooth';
      targetElement.scrollIntoView({ behavior, block: 'start' });
      this.updateActiveNavLink(targetId);
    }
  }

  updateHeaderOffset() {
    if (!this.header) {
      return 0;
    }

    const headerOffset = this.header.offsetHeight + 20;
    document.documentElement.style.setProperty('--header-offset', `${headerOffset}px`);
    return headerOffset;
  }

  setupActiveNavigation() {
    this.collectSections();
    this.updateActiveOnScroll();
  }

  updateActiveNavLink(activeId) {
    this.navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${activeId}`) {
        link.classList.add('active');
      }
    });
  }

  collectSections() {
    this.sections = Array.from(document.querySelectorAll('section[id], footer[id]'));
  }

  updateActiveOnScroll() {
    if (!this.sections.length) {
      this.collectSections();
    }

    if (!this.sections.length) {
      return;
    }

    const headerOffset = this.updateHeaderOffset();
    const viewportPosition = window.scrollY + (window.innerHeight / 2);
    let activeSectionId = this.sections[this.sections.length - 1].id;

    for (const section of this.sections) {
      const sectionTop = section.offsetTop - headerOffset;
      const sectionBottom = sectionTop + section.offsetHeight;

      if (viewportPosition >= sectionTop && viewportPosition < sectionBottom) {
        activeSectionId = section.id;
        break;
      }
    }

    this.updateActiveNavLink(activeSectionId);
  }
}

// ==============================
// Animações e Interações
// ==============================

class AnimationManager {
  constructor() {
    this.init();
  }

  init() {
    this.setupScrollAnimations();
    this.setupHoverEffects();
    this.setupParallaxEffects();
    this.setupCounterAnimations();
  }

  setupScrollAnimations() {
    const animatedElements = document.querySelectorAll('.approach-card, .issue-item, .credential-item, .step');
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
          }, index * 100);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });

    animatedElements.forEach(element => {
      element.style.opacity = '0';
      element.style.transform = 'translateY(30px)';
      element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
      observer.observe(element);
    });
  }

  setupHoverEffects() {
    // Efeito ripple nos botões
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
      button.addEventListener('click', (e) => {
        this.createRippleEffect(e, button);
      });
    });
  }

  createRippleEffect(e, element) {
    const ripple = document.createElement('span');
    const rect = element.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;
    
    ripple.style.cssText = `
      position: absolute;
      width: ${size}px;
      height: ${size}px;
      left: ${x}px;
      top: ${y}px;
      background: rgba(255, 255, 255, 0.3);
      border-radius: 50%;
      transform: scale(0);
      animation: ripple 0.6s ease-out;
      pointer-events: none;
    `;
    
    element.style.position = 'relative';
    element.style.overflow = 'hidden';
    element.appendChild(ripple);
    
    setTimeout(() => {
      ripple.remove();
    }, 600);
  }

  setupParallaxEffects() {
    const parallaxElements = document.querySelectorAll('.floating-elements .element');
    
    window.addEventListener('scroll', utils.throttle(() => {
      const scrolled = window.pageYOffset;
      
      parallaxElements.forEach((element, index) => {
        const speed = 0.5 + (index * 0.1);
        const yPos = -(scrolled * speed);
        element.style.transform = `translateY(${yPos}px) rotate(${scrolled * 0.1}deg)`;
      });
    }, 16));
  }

  setupCounterAnimations() {
    // Animação de contadores (se houver elementos com números)
    const counters = document.querySelectorAll('[data-count]');
    
    const counterObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.animateCounter(entry.target);
        }
      });
    }, { threshold: 0.5 });

    counters.forEach(counter => counterObserver.observe(counter));
  }

  animateCounter(element) {
    const target = parseInt(element.dataset.count);
    const duration = 2000;
    const step = target / (duration / 16);
    let current = 0;
    
    const timer = setInterval(() => {
      current += step;
      element.textContent = Math.floor(current);
      
      if (current >= target) {
        element.textContent = target;
        clearInterval(timer);
      }
    }, 16);
  }
}

// ==============================
// Formulários e Interações
// ==============================

class InteractionManager {
  constructor() {
    this.init();
  }

  init() {
    this.setupFormValidation();
    this.setupModalSystem();
    this.setupTooltips();
    this.setupLazyLoading();
  }

  setupFormValidation() {
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
      form.addEventListener('submit', (e) => {
        if (!this.validateForm(form)) {
          e.preventDefault();
        }
      });
      
      // Validação em tempo real
      const inputs = form.querySelectorAll('input, textarea');
      inputs.forEach(input => {
        input.addEventListener('blur', () => {
          this.validateField(input);
        });
      });
    });
  }

  validateForm(form) {
    const inputs = form.querySelectorAll('input[required], textarea[required]');
    let isValid = true;
    
    inputs.forEach(input => {
      if (!this.validateField(input)) {
        isValid = false;
      }
    });
    
    return isValid;
  }

  validateField(field) {
    const value = field.value.trim();
    const type = field.type;
    let isValid = true;
    let message = '';
    
    // Validação básica
    if (field.hasAttribute('required') && !value) {
      isValid = false;
      message = 'Este campo é obrigatório';
    } else if (type === 'email' && value && !this.isValidEmail(value)) {
      isValid = false;
      message = 'Email inválido';
    }
    
    this.showFieldValidation(field, isValid, message);
    return isValid;
  }

  isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  showFieldValidation(field, isValid, message) {
    // Remove validação anterior
    const existingError = field.parentNode.querySelector('.field-error');
    if (existingError) {
      existingError.remove();
    }
    
    field.classList.remove('field-valid', 'field-invalid');
    
    if (!isValid && message) {
      field.classList.add('field-invalid');
      const errorElement = document.createElement('span');
      errorElement.className = 'field-error';
      errorElement.textContent = message;
      field.parentNode.appendChild(errorElement);
    } else if (isValid && field.value.trim()) {
      field.classList.add('field-valid');
    }
  }

  setupModalSystem() {
    // Sistema básico de modais (se necessário)
    const modalTriggers = document.querySelectorAll('[data-modal]');
    
    modalTriggers.forEach(trigger => {
      trigger.addEventListener('click', (e) => {
        e.preventDefault();
        const modalId = trigger.dataset.modal;
        this.openModal(modalId);
      });
    });
  }

  openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.style.display = 'flex';
      modal.style.opacity = '0';
      setTimeout(() => {
        modal.style.opacity = '1';
      }, 10);
      
      document.body.style.overflow = 'hidden';
      
      // Fechar modal
      const closeBtn = modal.querySelector('.modal-close');
      if (closeBtn) {
        closeBtn.addEventListener('click', () => this.closeModal(modal));
      }
      
      modal.addEventListener('click', (e) => {
        if (e.target === modal) {
          this.closeModal(modal);
        }
      });
    }
  }

  closeModal(modal) {
    modal.style.opacity = '0';
    setTimeout(() => {
      modal.style.display = 'none';
      document.body.style.overflow = '';
    }, 300);
  }

  setupTooltips() {
    const tooltipElements = document.querySelectorAll('[data-tooltip]');
    
    tooltipElements.forEach(element => {
      element.addEventListener('mouseenter', (e) => {
        this.showTooltip(e.target);
      });
      
      element.addEventListener('mouseleave', () => {
        this.hideTooltip();
      });
    });
  }

  showTooltip(element) {
    const text = element.dataset.tooltip;
    const tooltip = document.createElement('div');
    tooltip.className = 'tooltip';
    tooltip.textContent = text;
    
    document.body.appendChild(tooltip);
    
    const rect = element.getBoundingClientRect();
    tooltip.style.left = rect.left + (rect.width / 2) - (tooltip.offsetWidth / 2) + 'px';
    tooltip.style.top = rect.top - tooltip.offsetHeight - 10 + 'px';
    
    setTimeout(() => {
      tooltip.style.opacity = '1';
    }, 10);
  }

  hideTooltip() {
    const tooltip = document.querySelector('.tooltip');
    if (tooltip) {
      tooltip.remove();
    }
  }

  setupLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          img.removeAttribute('data-src');
          imageObserver.unobserve(img);
        }
      });
    });
    
    images.forEach(img => imageObserver.observe(img));
  }
}

// ==============================
// Performance e Analytics
// ==============================

class PerformanceManager {
  constructor() {
    this.init();
  }

  init() {
    this.trackPageLoad();
    this.setupErrorHandling();
    this.optimizeImages();
  }

  trackPageLoad() {
    window.addEventListener('load', () => {
      const loadTime = performance.now();
      console.log(`Página carregada em ${Math.round(loadTime)}ms`);
      
      // Aqui você poderia enviar dados para analytics
      this.sendAnalytics('page_load', { load_time: loadTime });
    });
  }

  setupErrorHandling() {
    window.addEventListener('error', (e) => {
      console.error('Erro JavaScript:', e.error);
      this.sendAnalytics('javascript_error', {
        message: e.message,
        filename: e.filename,
        line: e.lineno
      });
    });
    
    window.addEventListener('unhandledrejection', (e) => {
      console.error('Promise rejeitada:', e.reason);
      this.sendAnalytics('promise_rejection', {
        reason: e.reason
      });
    });
  }

  sendAnalytics(event, data) {
    // Implementação básica de analytics
    if (typeof gtag !== 'undefined') {
      gtag('event', event, data);
    }
    
    // Ou enviar para seu próprio sistema
    console.log('Analytics:', event, data);
  }

  optimizeImages() {
    // Otimização básica de imagens
    const images = document.querySelectorAll('img');
    
    images.forEach(img => {
      img.addEventListener('load', () => {
        img.style.opacity = '1';
      });
      
      img.addEventListener('error', () => {
        img.style.display = 'none';
        console.warn('Falha ao carregar imagem:', img.src);
      });
    });
  }
}

// ==============================
// Inicialização da Aplicação
// ==============================

class VidareApp {
  constructor() {
    this.navigationManager = null;
    this.animationManager = null;
    this.interactionManager = null;
    this.performanceManager = null;
    
    this.init();
  }

  init() {
    // Aguardar DOM estar pronto
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => {
        this.initializeManagers();
      });
    } else {
      this.initializeManagers();
    }
  }

  initializeManagers() {
    try {
      // Inicializar gerenciadores
      this.navigationManager = new NavigationManager();
      this.animationManager = new AnimationManager();
      this.interactionManager = new InteractionManager();
      this.performanceManager = new PerformanceManager();
      
      // Configurar eventos globais
      this.setupGlobalEvents();
      
      console.log('Vidare App inicializada com sucesso!');
    } catch (error) {
      console.error('Erro ao inicializar aplicação:', error);
    }
  }

  setupGlobalEvents() {
    // Evento de redimensionamento da janela
    window.addEventListener('resize', utils.debounce(() => {
      this.handleResize();
    }, 250));
    
    // Evento de mudança de visibilidade da página
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        console.log('Página ficou oculta');
      } else {
        console.log('Página ficou visível');
      }
    });
    
  }

  handleResize() {
    // Lógica para redimensionamento
    const width = window.innerWidth;
    if (!this.navigationManager) {
      return;
    }
    
    if (width < 768 && this.navigationManager.isNavOpen) {
      this.navigationManager.toggleMobileNav();
    }

    this.navigationManager.setupActiveNavigation();
  }
}

// ==============================
// Consentimento e Privacidade
// ==============================

class PrivacyConsentManager {
  constructor() {
    this.storageKey = 'vidareConsentChoice';
    this.banner = document.getElementById('cookie-consent-banner');
    this.buttons = this.banner ? this.banner.querySelectorAll('.cookie-button') : [];
    this.init();
  }

  init() {
    if (!this.banner) {
      return;
    }

    const savedChoice = this.getStoredChoice();
    if (savedChoice) {
      this.applyChoice(savedChoice, false);
      return;
    }

    this.banner.removeAttribute('hidden');
    this.bindEvents();
  }

  bindEvents() {
    this.buttons.forEach((button) => {
      button.addEventListener('click', () => {
        const choice = button.dataset.consentChoice;
        this.handleDecision(choice);
      });
    });
  }

  handleDecision(choice) {
    if (!choice) {
      return;
    }
    this.saveChoice(choice);
    this.applyChoice(choice, true);
  }

  saveChoice(choice) {
    try {
      localStorage.setItem(this.storageKey, choice);
    } catch (error) {
      console.warn('Não foi possível salvar a preferência de consentimento.', error);
    }
  }

  getStoredChoice() {
    try {
      return localStorage.getItem(this.storageKey);
    } catch (error) {
      return null;
    }
  }

  applyChoice(choice, hideBanner = true) {
    const status = choice === 'accept' ? 'granted' : 'denied';
    if (window.__vidareConsent && typeof window.__vidareConsent.update === 'function') {
      window.__vidareConsent.update(status);
    }
    if (hideBanner && this.banner) {
      this.banner.setAttribute('hidden', 'hidden');
    }
  }

  reopenBanner() {
    if (!this.banner) {
      return;
    }
    this.banner.removeAttribute('hidden');
    try {
      localStorage.removeItem(this.storageKey);
    } catch (error) {
      console.warn('Não foi possível redefinir a preferência de consentimento.', error);
    }
  }
}

// ==============================
// Estilos CSS adicionais via JavaScript
// ==============================

const additionalStyles = `
  @keyframes ripple {
    to {
      transform: scale(4);
      opacity: 0;
    }
  }
  
  @keyframes pulse {
    0% { transform: scale(1); }
    50% { transform: scale(1.05); }
    100% { transform: scale(1); }
  }
  
  @keyframes rotate {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
  
  .field-error {
    color: #ef4444;
    font-size: 0.875rem;
    margin-top: 0.25rem;
    display: block;
  }
  
  .field-invalid {
    border-color: #ef4444 !important;
  }
  
  .field-valid {
    border-color: #10b981 !important;
  }
  
  .tooltip {
    position: absolute;
    background: #1f2937;
    color: white;
    padding: 0.5rem 0.75rem;
    border-radius: 0.375rem;
    font-size: 0.875rem;
    opacity: 0;
    transition: opacity 0.2s ease;
    z-index: 9999;
    pointer-events: none;
  }
  
  .tooltip::after {
    content: '';
    position: absolute;
    top: 100%;
    left: 50%;
    transform: translateX(-50%);
    border: 5px solid transparent;
    border-top-color: #1f2937;
  }
  
`;

// Injetar estilos adicionais
const styleSheet = document.createElement('style');
styleSheet.textContent = additionalStyles;
document.head.appendChild(styleSheet);

// ==============================
// Inicializar Aplicação
// ==============================

// Criar instância global da aplicação
window.VidareApp = new VidareApp();
window.VidarePrivacyConsent = new PrivacyConsentManager();

// Exportar para uso em outros scripts (se necessário)
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { VidareApp, utils, PrivacyConsentManager };
}
