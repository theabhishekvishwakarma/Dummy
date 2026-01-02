// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    // Navigation Elements
    const navbar = document.getElementById('navbar');
    const navMenu = document.getElementById('nav-menu');
    const navToggle = document.getElementById('nav-toggle');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Toggle Mobile Menu
    navToggle.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        navToggle.classList.toggle('active');
    });
    
    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        });
    });
    
    // Navbar Scroll Effect
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        // Active section highlighting
        highlightActiveSection();
    });
    
    // Smooth Scrolling for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Active Section Highlighting
    function highlightActiveSection() {
        const sections = document.querySelectorAll('section');
        const navLinks = document.querySelectorAll('.nav-link');
        
        let currentSection = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (window.scrollY >= sectionTop - 100 && 
                window.scrollY < sectionTop + sectionHeight - 100) {
                currentSection = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSection}`) {
                link.classList.add('active');
            }
        });
    }
    
    // Scroll Animation for Elements
    const scrollElements = document.querySelectorAll('.scroll-fade-in');
    
    const elementInView = (el, dividend = 1) => {
        const elementTop = el.getBoundingClientRect().top;
        return (
            elementTop <= (window.innerHeight || document.documentElement.clientHeight) / dividend
        );
    };
    
    const displayScrollElement = (element) => {
        element.classList.add('active');
    };
    
    const hideScrollElement = (element) => {
        element.classList.remove('active');
    };
    
    const handleScrollAnimation = () => {
        scrollElements.forEach((el) => {
            if (elementInView(el, 1.2)) {
                displayScrollElement(el);
            } else {
                hideScrollElement(el);
            }
        });
    };
    
    // Initialize scroll animations
    window.addEventListener('scroll', () => {
        handleScrollAnimation();
    });
    
    // Initial check on page load
    handleScrollAnimation();
    
    // Form Submission
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = this.querySelector('input[type="text"]').value;
            const email = this.querySelector('input[type="email"]').value;
            const message = this.querySelector('textarea').value;
            
            // Simple validation
            if (name && email && message) {
                // In a real application, you would send this data to a server
                alert('Thank you for your message! We will get back to you soon.');
                this.reset();
            } else {
                alert('Please fill in all fields.');
            }
        });
    }
    
    // Add scroll-fade-in class to elements
    document.querySelectorAll('.service-card, .portfolio-item, .about-content > *').forEach(el => {
        el.classList.add('scroll-fade-in');
    });
    
    // Add some interactive effects
    document.querySelectorAll('.service-card, .portfolio-item').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Add loading animation
    window.addEventListener('load', function() {
        document.body.classList.add('loaded');
    });
});

// About Section Animations and Interactions
function initAboutSection() {
    // Animate progress bars
    animateProgressBars();
    
    // Animate counter numbers
    animateCounters();
    
    // Add hover effects to team members
    initTeamInteractions();
}

function animateProgressBars() {
    const progressBars = document.querySelectorAll('.progress');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progress = entry.target;
                const width = progress.getAttribute('data-width') + '%';
                progress.style.width = width;
                observer.unobserve(progress);
            }
        });
    }, { threshold: 0.5 });
    
    progressBars.forEach(bar => {
        observer.observe(bar);
    });
}

function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.getAttribute('data-target'));
                const duration = 2000; // 2 seconds
                const step = target / (duration / 16); // 60fps
                let current = 0;
                
                const timer = setInterval(() => {
                    current += step;
                    if (current >= target) {
                        current = target;
                        clearInterval(timer);
                    }
                    counter.textContent = Math.floor(current);
                }, 16);
                
                observer.unobserve(counter);
            }
        });
    }, { threshold: 0.5 });
    
    counters.forEach(counter => {
        observer.observe(counter);
    });
}

function initTeamInteractions() {
    const teamMembers = document.querySelectorAll('.team-member');
    
    teamMembers.forEach(member => {
        member.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        member.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
}

// Initialize about section when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // ... existing code ...
    
    // Initialize about section
    initAboutSection();
    
    // Add scroll-fade-in class to about elements
    document.querySelectorAll('.about-text, .about-visual, .team-preview').forEach(el => {
        el.classList.add('scroll-fade-in');
    });
});


// Services Section Functionality
function initServicesSection() {
    // Tab functionality
    initServiceTabs();
    
    // Package card interactions
    initPackageInteractions();
    
    // Video player simulation
    initVideoPlayer();
    
    // Code editor animation
    initCodeEditor();
}

function initServiceTabs() {
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabPanes = document.querySelectorAll('.tab-pane');
    
    tabBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const targetTab = this.getAttribute('data-tab');
            
            // Remove active class from all buttons and panes
            tabBtns.forEach(b => b.classList.remove('active'));
            tabPanes.forEach(p => p.classList.remove('active'));
            
            // Add active class to current button and target pane
            this.classList.add('active');
            document.getElementById(targetTab).classList.add('active');
        });
    });
}

function initPackageInteractions() {
    const packageCards = document.querySelectorAll('.package-card');
    
    packageCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
            this.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.15)';
        });
        
        card.addEventListener('mouseleave', function() {
            const isFeatured = this.classList.contains('featured');
            this.style.transform = isFeatured ? 'scale(1.05) translateY(-5px)' : 'translateY(0)';
            this.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.1)';
        });
        
        // Get Started button click
        const btn = this.querySelector('.btn');
        if (btn) {
            btn.addEventListener('click', function(e) {
                e.stopPropagation();
                const packageName = this.closest('.package-card').querySelector('h5').textContent;
               const btn = card.querySelector('.btn');

btn.addEventListener('click', function (e) {
    e.preventDefault();
    e.stopPropagation();

    const packageName = card.querySelector('h5').innerText;
    const activeTab = document.querySelector('.tab-pane.active');
    const serviceType = activeTab ? activeTab.id : 'web';

    window.location.href =
        `get-started.html?service=${serviceType}&package=${encodeURIComponent(packageName)}`;
});

            });
        }
    });
}

function initVideoPlayer() {
    const playButton = document.querySelector('.play-button');
    const timelineCursor = document.querySelector('.timeline-cursor');
    
    if (playButton) {
        playButton.addEventListener('click', function() {
            this.innerHTML = this.innerHTML.includes('play') ? 
                '<i class="fas fa-pause"></i>' : 
                '<i class="fas fa-play"></i>';
            
            // Simulate timeline animation
            if (timelineCursor) {
                let position = 0;
                const interval = setInterval(() => {
                    position += 0.5;
                    timelineCursor.style.left = position + '%';
                    
                    if (position >= 100) {
                        clearInterval(interval);
                        playButton.innerHTML = '<i class="fas fa-play"></i>';
                        timelineCursor.style.left = '60%';
                    }
                }, 50);
            }
        });
    }
}

function initCodeEditor() {
    const codeElement = document.querySelector('.editor-content code');
    if (codeElement) {
        // Simulate typing animation
        const originalCode = codeElement.textContent;
        codeElement.textContent = '';
        let i = 0;
        
        const typeWriter = setInterval(() => {
            if (i < originalCode.length) {
                codeElement.textContent += originalCode.charAt(i);
                i++;
            } else {
                clearInterval(typeWriter);
            }
        }, 50);
    }
}

// Update DOMContentLoaded event listener
document.addEventListener('DOMContentLoaded', function() {
    // ... existing code ...
    
    // Initialize services section
    initServicesSection();
    
    // Add scroll-fade-in class to services elements
    document.querySelectorAll('.service-info, .service-visual, .process-section').forEach(el => {
        el.classList.add('scroll-fade-in');
    });
});






function initPortfolioFilter() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    
    console.log('Filter buttons:', filterBtns.length);
    console.log('Portfolio items:', portfolioItems.length);
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');
            console.log('Filter clicked:', filter);
            
            // Update active button
            filterBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            // Filter items - SIMPLE VERSION
            portfolioItems.forEach(item => {
                const category = item.getAttribute('data-category');
                
                if (filter === 'all' || category === filter) {
                    item.style.display = 'block';
                    item.style.visibility = 'visible';
                    item.style.opacity = '1';
                    item.style.position = 'relative';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });
}



// Add this to debug portfolio
function debugPortfolio() {
    const grid = document.querySelector('.portfolio-grid');
    const items = document.querySelectorAll('.portfolio-item');
    
    console.log('=== PORTFOLIO DEBUG ===');
    console.log('Grid element:', grid);
    console.log('Grid display:', window.getComputedStyle(grid).display);
    console.log('Grid visibility:', window.getComputedStyle(grid).visibility);
    
    items.forEach((item, index) => {
        console.log(`Item ${index}:`, item);
        console.log(`- Display:`, window.getComputedStyle(item).display);
        console.log(`- Visibility:`, window.getComputedStyle(item).visibility);
        console.log(`- Opacity:`, window.getComputedStyle(item).opacity);
        console.log(`- Position:`, window.getComputedStyle(item).position);
    });
}
document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll(".get-started-btn").forEach(btn => {
        btn.addEventListener("click", () => {
            const service = btn.dataset.service;
            const packageName = btn.dataset.package;

            window.location.href =
                `get-started.html?service=${service}&package=${encodeURIComponent(packageName)}`;
        });
    });
});

// Call this after DOM loads
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(debugPortfolio, 1000);
});