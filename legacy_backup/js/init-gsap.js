/**
 * Vidare - GSAP ScrollSmoother Shared Initialization
 * Consistent smooth scroll behavior across all pages
 */

(function() {
  'use strict';

  // Configuration
  const CONFIG = {
    smoothDesktop: 1.5,
    smoothMobile: 0.8,
    smoothReducedMotion: 0.5,
    wrapper: '#smooth-wrapper',
    content: '#smooth-content'
  };

  // Check if GSAP and ScrollSmoother are available
  function checkDependencies() {
    if (typeof gsap === 'undefined') {
      console.warn('[GSAP] gsap not loaded. Using native scroll.');
      return false;
    }
    if (typeof ScrollSmoother === 'undefined') {
      console.warn('[GSAP] ScrollSmoother not loaded. Using native scroll.');
      return false;
    }
    if (!ScrollSmoother.create) {
      console.warn('[GSAP] ScrollSmoother.create not available. Using native scroll.');
      return false;
    }
    return true;
  }

  // Check for user preferences
  function shouldDisableSmoothScroll() {
    // Check for reduced motion preference
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      console.log('[GSAP] Reduced motion preferred. Using native scroll.');
      return true;
    }
    return false;
  }

  // Check for required DOM elements
  function checkDOMElements() {
    const wrapper = document.querySelector(CONFIG.wrapper);
    const content = document.querySelector(CONFIG.content);
    
    if (!wrapper || !content) {
      console.warn('[GSAP] Smooth wrapper/content elements not found. Using native scroll.');
      return false;
    }
    return { wrapper, content };
  }

  // Initialize ScrollSmoother
  function initScrollSmoother() {
    // Check all prerequisites
    if (!checkDependencies()) {
      document.documentElement.classList.add('no-gsap-smooth');
      return;
    }

    if (shouldDisableSmoothScroll()) {
      document.documentElement.classList.add('no-gsap-smooth');
      return;
    }

    const elements = checkDOMElements();
    if (!elements) {
      document.documentElement.classList.add('no-gsap-smooth');
      return;
    }

    try {
      // Register plugin
      gsap.registerPlugin(ScrollSmoother);

      // Detect device capabilities
      const isTouchDevice = window.matchMedia('(pointer: coarse)').matches;
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      // Determine smoothness level
      let smoothValue = CONFIG.smoothDesktop;
      if (prefersReducedMotion) {
        smoothValue = CONFIG.smoothReducedMotion;
      } else if (isTouchDevice) {
        smoothValue = CONFIG.smoothMobile;
      }

      // Create ScrollSmoother instance
      const smoother = ScrollSmoother.create({
        wrapper: CONFIG.wrapper,
        content: CONFIG.content,
        smooth: smoothValue,
        smoothTouch: 0.1,
        effects: !isTouchDevice,
        normalizeScroll: true,
        ignoreMobileResize: true
      });

      // Expose globally for debugging
      window.smoother = smoother;

      // Handle visibility changes for performance
      document.addEventListener('visibilitychange', function() {
        if (smoother && smoother.paused) {
          smoother.paused(document.hidden);
        }
      });

      console.log('[GSAP] ScrollSmoother initialized successfully.');

    } catch (error) {
      console.error('[GSAP] Error initializing ScrollSmoother:', error);
      document.documentElement.classList.add('no-gsap-smooth');
    }
  }

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initScrollSmoother);
  } else {
    initScrollSmoother();
  }

})();
