/* script.js - Pure JavaScript, Strict Mode, Modular Architecture | Performance Optimized | Defensive Coding */
"use strict";

(function() {
    // --- Configuration & Constants ---
    const CONFIG = {
        scrollReveal: {
            selector: '.reveal-on-scroll',
            activeClass: 'revealed',
            options: {
                root: null, // Default browser viewport
                rootMargin: '0px',
                threshold: 0.2 // Trigger when 20% of the element is visible
            }
        },
        lazyLoad: {
            selector: 'img[lazy="scroll"]',
            activeClass: 'lazy-loaded',
            options: {
                root: null,
                rootMargin: '100px 0px', // Load 100px before it comes into view
                threshold: 0.0
            }
        },
        imageSpotlight: {
            containerSelector: '.image-spotlight-container',
            imageSelector: '.spotlight-image',
            activeClass: 'spotlight-active'
        },
        debounce: {
            defaultDelay: 250
        }
    };

    // --- DOM Elements ---
    const DOM = {};

    function cacheElements() {
        DOM.reveals = document.querySelectorAll(CONFIG.scrollReveal.selector);
        DOM.lazyImages = document.querySelectorAll(CONFIG.lazyLoad.selector);
        DOM.smoothScrollLinks = document.querySelectorAll('.smooth-scroll');
        DOM.spotlightContainer = document.querySelector(CONFIG.imageSpotlight.containerSelector);
        DOM.spotlightImage = document.querySelector(CONFIG.imageSpotlight.imageSelector);
    }

    // --- Utility Functions ---

    // Simple debouncing function to limit function execution frequency
    function debounce(func, delay = CONFIG.debounce.defaultDelay) {
        let timer;
        return function(...args) {
            clearTimeout(timer);
            timer = setTimeout(() => {
                func.apply(this, args);
            }, delay);
        };
    }

    // Securely update an element's textContent without risk of innerHTML XSS
    function updateTextSecurely(element, text) {
        if (!element || !(element instanceof HTMLElement)) return;
        element.textContent = String(text);
    }

    // Defensive class manipulation
    function addClassSecurely(element, className) {
        if (!element || !(element instanceof HTMLElement)) return;
        element.classList.add(className);
    }

    function removeClassSecurely(element, className) {
        if (!element || !(element instanceof HTMLElement)) return;
        element.classList.remove(className);
    }

    // --- Performance Enhancements: Lazy Loading ---

    function initLazyLoad() {
        if ('IntersectionObserver' in window) {
            const observer = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        // For this challenge, generated-image.png is critical, but we set up for others.
                        if (img.dataset.src) {
                            img.src = img.dataset.src; // Assuming defensive dataset usage
                            observer.unobserve(img);
                        }
                    }
                });
            }, CONFIG.lazyLoad.options);

            DOM.lazyImages.forEach(img => observer.observe(img));
        } else {
            // Fallback for browsers without IntersectionObserver - load all immediately
            DOM.lazyImages.forEach(img => {
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                }
            });
        }
    }

    // --- UI Animations: Scroll Reveal ---

    function initScrollReveal() {
        if ('IntersectionObserver' in window) {
            const observer = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        addClassSecurely(entry.target, CONFIG.scrollReveal.activeClass);
                        observer.unobserve(entry.target); // Unobserve to avoid re-triggering and reduce load
                    }
                });
            }, CONFIG.scrollReveal.options);

            DOM.reveals.forEach(reveal => observer.observe(reveal));
        } else {
            // Fallback: reveal all immediately if observer is missing
            DOM.reveals.forEach(reveal => addClassSecurely(reveal, CONFIG.scrollReveal.activeClass));
        }
    }

    // --- User Interaction: Image Spotlight Effect ---

    function initImageSpotlight() {
        if (!DOM.spotlightContainer || !DOM.spotlightImage) return;

        // Uses pointermove to capture mouse/touch movement over the container
        DOM.spotlightContainer.addEventListener('pointermove', function(e) {
            if (!DOM.spotlightContainer || !DOM.spotlightImage) return;

            // GPU-accelerated calculations (translateZ)
            requestAnimationFrame(() => {
                const rect = DOM.spotlightContainer.getBoundingClientRect();
                const x = e.clientX - rect.left; // x position within the element
                const y = e.clientY - rect.top;  // y position within the element

                // Translate position into percentages for CSS centering
                const percentX = (x / rect.width) * 100;
                const percentY = (y / rect.height) * 100;

                // Adjust the origin and scale slightly for a subtler look
                DOM.spotlightImage.style.transformOrigin = `${percentX}% ${percentY}%`;
                DOM.spotlightImage.style.transform = "scale(1.1) translateZ(0)"; // GPU acceleration
            });
        }, { passive: true }); // Performance hint: passive listener

        DOM.spotlightContainer.addEventListener('pointerleave', function() {
            if (!DOM.spotlightImage) return;
            // Reset state
            DOM.spotlightImage.style.transformOrigin = "50% 50%";
            DOM.spotlightImage.style.transform = "scale(1) translateZ(0)"; // GPU acceleration
        });
    }

    // --- User Experience: Smooth Scrolling ---

    function initSmoothScroll() {
        DOM.smoothScrollLinks.forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                const targetId = this.getAttribute('href');
                if (!targetId || targetId === '#' || !targetId.startsWith('#')) return;

                const targetElement = document.getElementById(targetId.substring(1));
                if (targetElement) {
                    e.preventDefault();
                    // Uses native scrollBehavior: 'smooth' - fallback already in CSS
                    targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            });
        });
    }

    // --- Lifecycle and Optimization ---

    function onDOMContentLoaded() {
        cacheElements();
        initLazyLoad(); // Initialize first for performance
        initScrollReveal();
        initImageSpotlight();
        initSmoothScroll();
    }

    // Main script initialization on ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', onDOMContentLoaded);
    } else {
        onDOMContentLoaded();
    }

})();