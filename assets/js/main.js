// Main JavaScript file for Oltrematica website

(function() {
  'use strict';

  // Mobile menu toggle
  function initMobileMenu() {
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');

    if (mobileMenuButton && mobileMenu) {
      mobileMenuButton.addEventListener('click', function() {
        mobileMenu.classList.toggle('hidden');

        // Update aria-expanded
        const isExpanded = !mobileMenu.classList.contains('hidden');
        mobileMenuButton.setAttribute('aria-expanded', isExpanded);
      });

      // Close menu when clicking outside
      document.addEventListener('click', function(event) {
        if (!mobileMenuButton.contains(event.target) && !mobileMenu.contains(event.target)) {
          mobileMenu.classList.add('hidden');
          mobileMenuButton.setAttribute('aria-expanded', 'false');
        }
      });

      // Close menu on escape key
      document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape' && !mobileMenu.classList.contains('hidden')) {
          mobileMenu.classList.add('hidden');
          mobileMenuButton.setAttribute('aria-expanded', 'false');
        }
      });
    }
  }

  // Back to top button
  function initBackToTop() {
    const backToTopButton = document.getElementById('back-to-top');

    if (backToTopButton) {
      // Show/hide button based on scroll position
      window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
          backToTopButton.classList.remove('opacity-0', 'invisible');
          backToTopButton.classList.add('opacity-100', 'visible');
        } else {
          backToTopButton.classList.remove('opacity-100', 'visible');
          backToTopButton.classList.add('opacity-0', 'invisible');
        }
      });

      // Scroll to top when clicked
      backToTopButton.addEventListener('click', function(e) {
        e.preventDefault();
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      });
    }
  }

  // Smooth scroll for anchor links
  function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');

    links.forEach(link => {
      link.addEventListener('click', function(e) {
        const href = this.getAttribute('href');

        // Skip if href is just "#"
        if (href === '#') {
          e.preventDefault();
          return;
        }

        const target = document.querySelector(href);

        if (target) {
          e.preventDefault();
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      });
    });
  }

  // Add active class to current nav item
  function initActiveNav() {
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll('.nav-link');

    navLinks.forEach(link => {
      const linkPath = new URL(link.href).pathname;

      if (currentPath === linkPath ||
          (linkPath !== '/' && currentPath.startsWith(linkPath))) {
        link.classList.add('text-brand-primary');
      }
    });
  }

  // Lazy load images
  function initLazyLoad() {
    if ('loading' in HTMLImageElement.prototype) {
      const images = document.querySelectorAll('img[loading="lazy"]');
      images.forEach(img => {
        if (img.dataset.src) {
          img.src = img.dataset.src;
        }
      });
    } else {
      // Fallback for browsers that don't support lazy loading
      const script = document.createElement('script');
      script.src = 'https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.3.2/lazysizes.min.js';
      document.body.appendChild(script);
    }
  }

  // Add animation on scroll
  function initScrollAnimation() {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-fade-in-up');
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    const elements = document.querySelectorAll('.card, .section-title');
    elements.forEach(el => observer.observe(el));
  }

  // Code syntax highlighting (if needed)
  function initCodeHighlight() {
    const codeBlocks = document.querySelectorAll('pre code');

    codeBlocks.forEach(block => {
      // Add line numbers
      const lines = block.textContent.split('\n').length;
      if (lines > 1) {
        block.classList.add('line-numbers');
      }
    });
  }

  // Initialize all functions when DOM is ready
  function init() {
    initMobileMenu();
    initBackToTop();
    initSmoothScroll();
    initActiveNav();
    initLazyLoad();

    // Only init scroll animation if user hasn't disabled animations
    if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      initScrollAnimation();
    }

    initCodeHighlight();
  }

  // Run init when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  // Handle external links
  document.addEventListener('DOMContentLoaded', function() {
    const links = document.querySelectorAll('a[href^="http"]');

    links.forEach(link => {
      const url = new URL(link.href);

      // Add external link attributes if it's not the same origin
      if (url.hostname !== window.location.hostname) {
        link.setAttribute('target', '_blank');
        link.setAttribute('rel', 'noopener noreferrer');

        // Add external link icon if not already present
        if (!link.querySelector('.external-icon')) {
          const icon = document.createElement('svg');
          icon.classList.add('external-icon', 'inline-block', 'w-4', 'h-4', 'ml-1');
          icon.setAttribute('fill', 'none');
          icon.setAttribute('stroke', 'currentColor');
          icon.setAttribute('viewBox', '0 0 24 24');
          icon.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>';
          link.appendChild(icon);
        }
      }
    });
  });

  // Performance monitoring (optional)
  if ('PerformanceObserver' in window) {
    try {
      const perfObserver = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          // Log slow resources (optional, for development)
          if (entry.duration > 1000) {
            console.warn('Slow resource:', entry.name, entry.duration + 'ms');
          }
        }
      });

      perfObserver.observe({ entryTypes: ['resource'] });
    } catch (e) {
      // PerformanceObserver not supported or error
    }
  }

})();
