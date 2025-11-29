// Advanced GSAP Animations Controller
class GSAPAnimations {
    constructor() {
        this.init();
    }

    init() {
        this.registerScrollTrigger();
        this.initHeroAnimations();
        this.initTextAnimations();
        this.initScrollAnimations();
        this.initParallaxEffects();
        this.initMagneticButtons();
        this.initPageTransitions();
        this.initCustomCursor();
        this.initInteractiveElements();
    }

    registerScrollTrigger() {
        // Register ScrollTrigger plugin
        if (typeof ScrollTrigger !== 'undefined') {
            ScrollTrigger.defaults({
                toggleActions: "play none none reverse",
                scroller: window
            });

            // Refresh ScrollTrigger on resize
            window.addEventListener('resize', () => ScrollTrigger.refresh());
        }
    }

    initHeroAnimations() {
        // Hero section master timeline
        const heroTimeline = gsap.timeline();

        // Animate floating shapes with staggered delays
        gsap.to('.shape', {
            duration: 4,
            rotation: 360,
            repeat: -1,
            ease: "none",
            stagger: {
                each: 1,
                repeat: -1
            }
        });

        // Split text into characters for animation
        this.splitText('.hero-title');

        // Hero title character animation
        heroTimeline.from('.char', {
            duration: 0.8,
            y: 100,
            rotationX: -90,
            transformOrigin: "bottom",
            opacity: 0,
            stagger: 0.03,
            ease: "back.out(1.7)"
        });

        // Hero description fade up
        heroTimeline.from('.hero-description', {
            duration: 1,
            y: 50,
            opacity: 0,
            ease: "power3.out"
        }, "-=0.3");

        // Button stagger animation
        heroTimeline.from('.hero-actions .btn', {
            duration: 0.8,
            y: 30,
            opacity: 0,
            stagger: 0.2,
            ease: "back.out(1.7)"
        }, "-=0.5");

        // Floating cards 3D animation
        heroTimeline.from('.floating-card', {
            duration: 1.5,
            scale: 0,
            rotationY: 180,
            rotationX: -45,
            transformOrigin: "center",
            stagger: 0.3,
            ease: "back.out(1.7)"
        }, "-=0.8");

        // Scroll indicator bounce
        gsap.to('.scroll-line', {
            duration: 2,
            y: -10,
            repeat: -1,
            yoyo: true,
            ease: "power2.inOut"
        });
    }

    splitText(selector) {
        const elements = document.querySelectorAll(selector);
        
        elements.forEach(element => {
            const text = element.textContent;
            element.innerHTML = '';
            
            const words = text.split(' ');
            words.forEach(word => {
                const wordSpan = document.createElement('span');
                wordSpan.className = 'word';
                
                const chars = word.split('');
                chars.forEach(char => {
                    const charSpan = document.createElement('span');
                    charSpan.className = 'char';
                    charSpan.textContent = char === ' ' ? '\u00A0' : char;
                    wordSpan.appendChild(charSpan);
                });
                
                element.appendChild(wordSpan);
                element.appendChild(document.createTextNode(' '));
            });
        });
    }

    initTextAnimations() {
        // Animate all elements with data-gsap="chars"
        gsap.utils.toArray('[data-gsap="chars"]').forEach(element => {
            this.splitText(element);
            
            ScrollTrigger.create({
                trigger: element,
                start: "top 80%",
                onEnter: () => this.animateChars(element)
            });
        });

        // Fade up animations
        gsap.utils.toArray('[data-gsap="fade-up"]').forEach(element => {
            ScrollTrigger.create({
                trigger: element,
                start: "top 85%",
                onEnter: () => this.animateFadeUp(element)
            });
        });

        // Stagger animations
        gsap.utils.toArray('[data-gsap="stagger"]').forEach(container => {
            ScrollTrigger.create({
                trigger: container,
                start: "top 80%",
                onEnter: () => this.animateStagger(container.children)
            });
        });
    }

    animateChars(element) {
        const chars = element.querySelectorAll('.char');
        
        gsap.to(chars, {
            duration: 0.8,
            y: 0,
            rotationX: 0,
            opacity: 1,
            stagger: 0.03,
            ease: "back.out(1.7)"
        });
    }

    animateFadeUp(element) {
        gsap.to(element, {
            duration: 1,
            y: 0,
            opacity: 1,
            ease: "power3.out"
        });
    }

    animateStagger(elements) {
        gsap.to(elements, {
            duration: 0.8,
            y: 0,
            opacity: 1,
            stagger: 0.1,
            ease: "back.out(1.7)"
        });
    }

    initScrollAnimations() {
        // Scroll progress indicator
        gsap.to('.scroll-progress', {
            width: "100%",
            ease: "none",
            scrollTrigger: {
                trigger: "body",
                start: "top top",
                end: "bottom bottom",
                scrub: true
            }
        });

        // Section scroll animations
        gsap.utils.toArray('[data-gsap="section"]').forEach(section => {
            gsap.from(section, {
                opacity: 0,
                y: 100,
                duration: 1,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: section,
                    start: "top 80%",
                    end: "bottom 20%",
                    toggleActions: "play none none reverse"
                }
            });
        });

        // Parallax scroll effects
        gsap.utils.toArray('[data-speed]').forEach(element => {
            const speed = element.dataset.speed;
            
            gsap.to(element, {
                y: () => -100 * speed,
                ease: "none",
                scrollTrigger: {
                    trigger: element.parentElement,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: true
                }
            });
        });
    }

    initParallaxEffects() {
        // Mouse parallax for hero section
        const hero = document.querySelector('.hero');
        if (hero) {
            hero.addEventListener('mousemove', (e) => {
                const { clientX, clientY } = e;
                const { width, height } = hero.getBoundingClientRect();
                
                const x = (clientX - width / 2) / 25;
                const y = (clientY - height / 2) / 25;
                
                gsap.to('.floating-card', {
                    duration: 1,
                    x: x,
                    y: y,
                    rotationZ: x * 0.1,
                    ease: "power2.out",
                    stagger: 0.1
                });
            });
        }

        // Depth-based parallax
        gsap.utils.toArray('[data-depth]').forEach(element => {
            const depth = parseFloat(element.dataset.depth);
            
            element.addEventListener('mousemove', (e) => {
                const { clientX, clientY } = e;
                const { left, top, width, height } = element.getBoundingClientRect();
                
                const x = (clientX - left - width / 2) * depth;
                const y = (clientY - top - height / 2) * depth;
                
                gsap.to(element, {
                    duration: 0.8,
                    x: x,
                    y: y,
                    ease: "power2.out"
                });
            });
            
            element.addEventListener('mouseleave', () => {
                gsap.to(element, {
                    duration: 0.8,
                    x: 0,
                    y: 0,
                    ease: "elastic.out(1, 0.5)"
                });
            });
        });
    }

    initMagneticButtons() {
        gsap.utils.toArray('[data-magnetic]').forEach(button => {
            button.addEventListener('mousemove', (e) => {
                const { left, top, width, height } = button.getBoundingClientRect();
                const x = (e.clientX - left - width / 2) * 0.3;
                const y = (e.clientY - top - height / 2) * 0.3;
                
                gsap.to(button, {
                    duration: 0.5,
                    x: x,
                    y: y,
                    ease: "power2.out"
                });
            });
            
            button.addEventListener('mouseleave', () => {
                gsap.to(button, {
                    duration: 0.5,
                    x: 0,
                    y: 0,
                    ease: "elastic.out(1, 0.5)"
                });
            });
        });
    }

    initPageTransitions() {
        // Smooth section transitions
        gsap.utils.toArray('section').forEach((section, index) => {
            ScrollTrigger.create({
                trigger: section,
                start: "top 50%",
                end: "bottom 50%",
                onEnter: () => this.activateSection(section),
                onEnterBack: () => this.activateSection(section)
            });
        });

        // Update active navigation link
        gsap.utils.toArray('.nav-link').forEach(link => {
            const target = link.getAttribute('href');
            
            ScrollTrigger.create({
                trigger: target,
                start: "top 50%",
                end: "bottom 50%",
                onEnter: () => this.setActiveNavLink(link),
                onEnterBack: () => this.setActiveNavLink(link)
            });
        });
    }

    activateSection(section) {
        // Remove active class from all sections
        gsap.utils.toArray('section').forEach(sec => {
            sec.classList.remove('active-section');
        });
        
        // Add active class to current section
        section.classList.add('active-section');
        
        // Animate section background if needed
        gsap.to(section, {
            duration: 0.5,
            backgroundColor: "rgba(99, 102, 241, 0.02)",
            ease: "power2.out"
        });
    }

    setActiveNavLink(activeLink) {
        // Remove active class from all links
        gsap.utils.toArray('.nav-link').forEach(link => {
            link.classList.remove('active');
            gsap.to(link.querySelector('.link-hover'), {
                duration: 0.3,
                scaleX: 0,
                transformOrigin: "left"
            });
        });
        
        // Add active class to current link
        activeLink.classList.add('active');
        gsap.to(activeLink.querySelector('.link-hover'), {
            duration: 0.3,
            scaleX: 1,
            transformOrigin: "left"
        });
    }

    initCustomCursor() {
        // Enhanced cursor with trail effect
        const cursor = document.querySelector('.cursor-dot');
        const outline = document.querySelector('.cursor-outline');
        
        if (!cursor || !outline) return;

        // Cursor position animation
        gsap.set([cursor, outline], { xPercent: -50, yPercent: -50 });

        const cursorX = gsap.quickTo(cursor, "x", { duration: 0.6, ease: "power2.out" });
        const cursorY = gsap.quickTo(cursor, "y", { duration: 0.6, ease: "power2.out" });
        const outlineX = gsap.quickTo(outline, "x", { duration: 0.3, ease: "power2.out" });
        const outlineY = gsap.quickTo(outline, "y", { duration: 0.3, ease: "power2.out" });

        document.addEventListener('mousemove', (e) => {
            cursorX(e.clientX);
            cursorY(e.clientY);
            outlineX(e.clientX);
            outlineY(e.clientY);
        });

        // Interactive element effects
        const interactiveElements = document.querySelectorAll('a, button, .magnetic, .portfolio-card');
        
        interactiveElements.forEach(element => {
            element.addEventListener('mouseenter', () => {
                gsap.to(cursor, { scale: 1.5, duration: 0.3 });
                gsap.to(outline, { scale: 1.5, duration: 0.3 });
                
                // Create ripple effect
                this.createRipple(element, e);
            });
            
            element.addEventListener('mouseleave', () => {
                gsap.to(cursor, { scale: 1, duration: 0.3 });
                gsap.to(outline, { scale: 1, duration: 0.3 });
            });
        });
    }

    createRipple(element, event) {
        const ripple = document.createElement('div');
        ripple.className = 'cursor-ripple';
        document.body.appendChild(ripple);

        const rect = element.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;

        gsap.set(ripple, {
            x: event.clientX,
            y: event.clientY,
            scale: 0,
            opacity: 1,
            background: "radial-gradient(circle, var(--primary-color) 0%, transparent 70%)"
        });

        gsap.to(ripple, {
            duration: 0.6,
            scale: 2,
            opacity: 0,
            ease: "power2.out",
            onComplete: () => ripple.remove()
        });
    }

    initInteractiveElements() {
        // Portfolio card hover animations
        gsap.utils.toArray('.portfolio-card').forEach(card => {
            card.addEventListener('mouseenter', () => {
                gsap.to(card, {
                    duration: 0.5,
                    y: -10,
                    rotationY: 5,
                    rotationX: 5,
                    boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
                    ease: "power2.out"
                });
                
                // Animate image
                gsap.to(card.querySelector('.portfolio-image'), {
                    duration: 0.5,
                    scale: 1.1,
                    ease: "power2.out"
                });
            });
            
            card.addEventListener('mouseleave', () => {
                gsap.to(card, {
                    duration: 0.5,
                    y: 0,
                    rotationY: 0,
                    rotationX: 0,
                    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
                    ease: "power2.out"
                });
                
                gsap.to(card.querySelector('.portfolio-image'), {
                    duration: 0.5,
                    scale: 1,
                    ease: "power2.out"
                });
            });
        });

        // Service card animations
        gsap.utils.toArray('.service-card').forEach(card => {
            card.addEventListener('mouseenter', () => {
                gsap.to(card, {
                    duration: 0.5,
                    y: -15,
                    scale: 1.02,
                    ease: "power2.out"
                });
                
                // Animate icon
                gsap.to(card.querySelector('.service-icon'), {
                    duration: 0.5,
                    rotationY: 180,
                    scale: 1.1,
                    ease: "power2.out"
                });
            });
            
            card.addEventListener('mouseleave', () => {
                gsap.to(card, {
                    duration: 0.5,
                    y: 0,
                    scale: 1,
                    ease: "power2.out"
                });
                
                gsap.to(card.querySelector('.service-icon'), {
                    duration: 0.5,
                    rotationY: 0,
                    scale: 1,
                    ease: "power2.out"
                });
            });
        });

        // Counter animations with ScrollTrigger
        gsap.utils.toArray('[data-counter]').forEach(counter => {
            ScrollTrigger.create({
                trigger: counter,
                start: "top 80%",
                onEnter: () => this.animateCounter(counter)
            });
        });
    }

    animateCounter(counterElement) {
        const numberElement = counterElement.querySelector('.stat-number');
        const target = parseInt(numberElement.dataset.count);
        const duration = 2;
        
        gsap.fromTo(numberElement, 
            { textContent: 0 },
            {
                textContent: target,
                duration: duration,
                snap: { textContent: 1 },
                ease: "power2.out",
                onUpdate: function() {
                    numberElement.textContent = Math.ceil(this.targets()[0].textContent);
                }
            }
        );
    }

    // Utility method for complex staggers
    createStaggerAnimation(elements, config = {}) {
        const {
            from = { y: 50, opacity: 0 },
            to = { y: 0, opacity: 1 },
            stagger = 0.1,
            duration = 0.8,
            ease = "power3.out"
        } = config;

        gsap.fromTo(elements, from, {
            ...to,
            duration: duration,
            stagger: stagger,
            ease: ease
        });
    }

    // Page load sequence
    createPageLoadSequence() {
        const loadTimeline = gsap.timeline();

        loadTimeline
            .from('.navbar', {
                duration: 1,
                y: -100,
                opacity: 0,
                ease: "power3.out"
            })
            .from('.hero-title .char', {
                duration: 0.8,
                y: 100,
                rotationX: -90,
                opacity: 0,
                stagger: 0.03,
                ease: "back.out(1.7)"
            }, "-=0.5")
            .from('.hero-description', {
                duration: 1,
                y: 50,
                opacity: 0,
                ease: "power3.out"
            }, "-=0.3")
            .from('.hero-actions .btn', {
                duration: 0.8,
                y: 30,
                opacity: 0,
                stagger: 0.2,
                ease: "back.out(1.7)"
            }, "-=0.5")
            .from('.floating-card', {
                duration: 1.5,
                scale: 0,
                rotationY: 180,
                stagger: 0.3,
                ease: "back.out(1.7)"
            }, "-=0.8");
    }
}

// Initialize GSAP animations when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Wait for GSAP to be available
    if (typeof gsap !== 'undefined') {
        new GSAPAnimations();
        
        // Create page load sequence
        const gsapAnimations = new GSAPAnimations();
        gsapAnimations.createPageLoadSequence();
    }
});

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = GSAPAnimations;
}