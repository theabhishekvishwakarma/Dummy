// Advanced animations and micro-interactions
class AdvancedAnimations {
    constructor() {
        this.initCursor();
        this.initMagneticButtons();
        this.initScrollAnimations();
        this.initPageTransitions();
    }

    initCursor() {
        const cursorDot = document.querySelector('[data-cursor-dot]');
        const cursorOutline = document.querySelector('[data-cursor-outline]');

        if (!cursorDot || !cursorOutline) return;

        window.addEventListener('mousemove', (e) => {
            const posX = e.clientX;
            const posY = e.clientY;

            cursorDot.style.left = `${posX}px`;
            cursorDot.style.top = `${posY}px`;

            cursorOutline.style.left = `${posX}px`;
            cursorOutline.style.top = `${posY}px`;
        });

        // Cursor effects on interactive elements
        const interactiveElements = document.querySelectorAll('a, button, .magnetic, .nav-link, .floating-card');

        interactiveElements.forEach(element => {
            element.addEventListener('mouseenter', () => {
                cursorDot.style.transform = 'translate(-50%, -50%) scale(1.5)';
                cursorOutline.style.transform = 'translate(-50%, -50%) scale(1.5)';
                cursorOutline.style.background = 'rgba(99, 102, 241, 0.1)';
            });

            element.addEventListener('mouseleave', () => {
                cursorDot.style.transform = 'translate(-50%, -50%) scale(1)';
                cursorOutline.style.transform = 'translate(-50%, -50%) scale(1)';
                cursorOutline.style.background = 'transparent';
            });
        });
    }

    initMagneticButtons() {
        const magneticButtons = document.querySelectorAll('.magnetic');

        magneticButtons.forEach(button => {
            button.addEventListener('mousemove', (e) => {
                const rect = button.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;

                const strength = 20;
                const moveX = (x / rect.width) * strength;
                const moveY = (y / rect.height) * strength;

                button.style.transform = `translate(${moveX}px, ${moveY}px)`;
            });

            button.addEventListener('mouseleave', () => {
                button.style.transform = 'translate(0, 0)';
            });
        });
    }

    initScrollAnimations() {
        // Create scroll-triggered animations using Intersection Observer
        const animatedElements = document.querySelectorAll('.stagger-item, .feature-card, .service-item');

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateOnScroll(entry.target);
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        animatedElements.forEach(el => observer.observe(el));
    }

    animateOnScroll(element) {
        if (element.classList.contains('stagger-item')) {
            const delay = Array.from(element.parentElement.children).indexOf(element) * 100;
            setTimeout(() => {
                element.classList.add('animated');
            }, delay);
        }
    }

    initPageTransitions() {
        // Smooth page transitions for internal links
        const internalLinks = document.querySelectorAll('a[href^="#"]');

        internalLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                const href = link.getAttribute('href');
                
                if (href !== '#') {
                    e.preventDefault();
                    
                    const target = document.querySelector(href);
                    if (target) {
                        const offsetTop = target.offsetTop - 80; // Account for fixed nav

                        window.scrollTo({
                            top: offsetTop,
                            behavior: 'smooth'
                        });
                    }
                }
            });
        });
    }

    // Particle system for hero section (optional enhancement)
    initParticleSystem() {
        // This would be an advanced feature for background particles
        console.log('Particle system initialized');
    }
}

// Initialize advanced animations
document.addEventListener('DOMContentLoaded', () => {
    new AdvancedAnimations();
});
