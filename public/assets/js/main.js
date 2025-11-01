// ===== GLOBAL VARIABLES =====
let isScrolling = false;
let ticking = false;

// ===== DOM CONTENT LOADED =====
document.addEventListener('DOMContentLoaded', function() {
    initializeNavigation();
    initializeScrollAnimations();
    initializeCounters();
    initializeTabs();
    initializeParallax();
    initializeFormHandling();
    initializeImageLazyLoading();
    initializeInteractiveElements();
});

// ===== NAVIGATION =====
function initializeNavigation() {
    const navbar = document.getElementById('navbar');
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Navbar scroll effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Mobile menu toggle
    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        navToggle.classList.toggle('active');
    });

    // Close mobile menu when clicking on links
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        });
    });

    // Smooth scroll for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            scrollToSection(targetId);
        });
    });

    // Update active nav link on scroll
    window.addEventListener('scroll', updateActiveNavLink);
}

function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (window.scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}

// ===== SCROLL FUNCTIONS =====
function scrollToSection(sectionId) {
    const targetElement = document.getElementById(sectionId);
    if (targetElement) {
        const offsetTop = targetElement.offsetTop - 80; // Account for fixed navbar
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
    }
}

function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// ===== SCROLL ANIMATIONS =====
function initializeScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                
                // Trigger specific animations
                if (entry.target.classList.contains('material-card')) {
                    animateMaterialCard(entry.target);
                }
                
                if (entry.target.classList.contains('company-card')) {
                    animateCompanyCard(entry.target);
                }
                
                if (entry.target.classList.contains('school-card')) {
                    animateSchoolCard(entry.target);
                }
            }
        });
    }, observerOptions);

    // Observe all elements that should animate on scroll
    const animatedElements = document.querySelectorAll(
        '.material-card, .company-card, .school-card, .trend-card, .technique-card, .benefit-item, .step, .innovation-card, .district-info, .timeline-item'
    );
    
    animatedElements.forEach(el => {
        el.classList.add('scroll-reveal');
        observer.observe(el);
    });
}

function animateMaterialCard(card) {
    const materials = card.querySelectorAll('.material-tag');
    materials.forEach((tag, index) => {
        setTimeout(() => {
            tag.style.transform = 'scale(1)';
            tag.style.opacity = '1';
        }, index * 100);
    });
}

function animateCompanyCard(card) {
    const strategyTags = card.querySelectorAll('.strategy-tag');
    strategyTags.forEach((tag, index) => {
        setTimeout(() => {
            tag.style.transform = 'translateY(0)';
            tag.style.opacity = '1';
        }, index * 150);
    });
}

function animateSchoolCard(card) {
    const specialties = card.querySelectorAll('.specialty');
    specialties.forEach((specialty, index) => {
        setTimeout(() => {
            specialty.style.transform = 'rotateY(0)';
            specialty.style.opacity = '1';
        }, index * 100);
    });
}

// ===== COUNTER ANIMATIONS =====
function initializeCounters() {
    const counters = document.querySelectorAll('.stat-number[data-target]');
    
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                counterObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.5
    });

    counters.forEach(counter => {
        counterObserver.observe(counter);
    });
}

function animateCounter(element) {
    const target = parseInt(element.getAttribute('data-target'));
    const duration = 2000; // 2 seconds
    const increment = target / (duration / 16); // 60fps
    let current = 0;

    const updateCounter = () => {
        current += increment;
        
        if (current < target) {
            element.textContent = Math.floor(current);
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target.toLocaleString();
        }
    };

    // Add initial styling
    element.style.opacity = '0';
    element.style.transform = 'scale(0.8)';
    element.style.transition = 'all 0.6s ease-out';
    
    // Start animation
    setTimeout(() => {
        element.style.opacity = '1';
        element.style.transform = 'scale(1)';
        updateCounter();
    }, 100);
}

// ===== TABS FUNCTIONALITY =====
function initializeTabs() {
    // Timeline tabs
    const timelineTabs = document.querySelectorAll('.timeline-tabs .tab-btn');
    const timelineItems = document.querySelectorAll('.timeline-item');

    timelineTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const period = tab.getAttribute('data-period');
            
            // Remove active class from all tabs and items
            timelineTabs.forEach(t => t.classList.remove('active'));
            timelineItems.forEach(item => item.classList.remove('active'));
            
            // Add active class to clicked tab and corresponding item
            tab.classList.add('active');
            document.getElementById(period).classList.add('active');
        });
    });

    // Materials tabs
    const materialsTabs = document.querySelectorAll('.materials-tabs .tab-btn');
    const materialsContent = document.querySelectorAll('.tab-content');

    materialsTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const category = tab.getAttribute('data-category');
            
            // Remove active class from all tabs and content
            materialsTabs.forEach(t => t.classList.remove('active'));
            materialsContent.forEach(content => content.classList.remove('active'));
            
            // Add active class to clicked tab and corresponding content
            tab.classList.add('active');
            document.getElementById(category).classList.add('active');
        });
    });

    // Districts tabs
    const districtTabs = document.querySelectorAll('.district-tabs .tab-btn');
    const districtInfo = document.querySelectorAll('.district-info');

    districtTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const district = tab.getAttribute('data-district');
            
            // Remove active class from all tabs and info
            districtTabs.forEach(t => t.classList.remove('active'));
            districtInfo.forEach(info => info.classList.remove('active'));
            
            // Add active class to clicked tab and corresponding info
            tab.classList.add('active');
            document.getElementById(district).classList.add('active');
        });
    });

    // Future trends tabs
    const trendTabs = document.querySelectorAll('.trend-tabs .tab-btn');
    const trendItems = document.querySelectorAll('.trend-item');

    trendTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const trend = tab.getAttribute('data-trend');
            
            // Remove active class from all tabs and items
            trendTabs.forEach(t => t.classList.remove('active'));
            trendItems.forEach(item => item.classList.remove('active'));
            
            // Add active class to clicked tab and corresponding item
            tab.classList.add('active');
            document.getElementById(trend).classList.add('active');
        });
    });
}

// ===== PARALLAX EFFECTS =====
function initializeParallax() {
    const parallaxElements = document.querySelectorAll('.hero-background');
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        
        parallaxElements.forEach(element => {
            element.style.transform = `translateY(${rate}px)`;
        });
    });
}

// ===== INTERACTIVE ELEMENTS =====
function initializeInteractiveElements() {
    // Material cards hover effects
    const materialCards = document.querySelectorAll('.material-card');
    materialCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px) rotateX(5deg)';
            card.style.boxShadow = '0 25px 50px rgba(0, 0, 0, 0.15)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) rotateX(0)';
            card.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
        });
    });

    // Company cards animation
    const companyCards = document.querySelectorAll('.company-card');
    companyCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            const logo = card.querySelector('.company-logo');
            logo.style.transform = 'rotateY(180deg)';
        });
        
        card.addEventListener('mouseleave', () => {
            const logo = card.querySelector('.company-logo');
            logo.style.transform = 'rotateY(0deg)';
        });
    });

    // Color samples interaction
    const colorSamples = document.querySelectorAll('.color-sample');
    colorSamples.forEach(sample => {
        sample.addEventListener('click', () => {
            // Add ripple effect
            const ripple = document.createElement('div');
            ripple.classList.add('color-ripple');
            sample.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });

    // Technique cards animation
    const techniqueCards = document.querySelectorAll('.technique-card');
    techniqueCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            const icon = card.querySelector('.technique-icon');
            icon.style.transform = 'scale(1.2) rotate(15deg)';
            icon.style.filter = 'hue-rotate(30deg)';
        });
        
        card.addEventListener('mouseleave', () => {
            const icon = card.querySelector('.technique-icon');
            icon.style.transform = 'scale(1) rotate(0deg)';
            icon.style.filter = 'hue-rotate(0deg)';
        });
    });

    // School cards flip effect
    const schoolCards = document.querySelectorAll('.school-card');
    schoolCards.forEach(card => {
        card.addEventListener('click', () => {
            card.style.transform = 'rotateY(180deg)';
            setTimeout(() => {
                card.style.transform = 'rotateY(0deg)';
            }, 2000);
        });
    });

    // Strategy tags animation
    const strategyTags = document.querySelectorAll('.strategy-tag');
    strategyTags.forEach(tag => {
        tag.addEventListener('mouseenter', () => {
            tag.style.transform = 'scale(1.1)';
            tag.style.background = '#b91c3c';
        });
        
        tag.addEventListener('mouseleave', () => {
            tag.style.transform = 'scale(1)';
            tag.style.background = '';
        });
    });

    // Company tags pulse effect
    const companyTags = document.querySelectorAll('.company-tag');
    companyTags.forEach(tag => {
        tag.addEventListener('mouseenter', () => {
            tag.style.animation = 'pulse 0.6s ease-in-out infinite';
        });
        
        tag.addEventListener('mouseleave', () => {
            tag.style.animation = '';
        });
    });

    // Benefit items staggered animation
    const benefitItems = document.querySelectorAll('.benefit-item');
    benefitItems.forEach((item, index) => {
        item.addEventListener('mouseenter', () => {
            item.style.transform = 'translateX(10px)';
            item.style.background = '#f8f9fa';
        });
        
        item.addEventListener('mouseleave', () => {
            item.style.transform = 'translateX(0)';
            item.style.background = '';
        });
    });

    // Step items sequential animation
    const stepItems = document.querySelectorAll('.step');
    stepItems.forEach((step, index) => {
        step.addEventListener('mouseenter', () => {
            const number = step.querySelector('.step-number');
            number.style.transform = 'scale(1.2)';
            number.style.boxShadow = '0 0 20px rgba(220, 20, 60, 0.5)';
        });
        
        step.addEventListener('mouseleave', () => {
            const number = step.querySelector('.step-number');
            number.style.transform = 'scale(1)';
            number.style.boxShadow = '';
        });
    });
}

// ===== FORM HANDLING =====
function initializeFormHandling() {
    const form = document.getElementById('newsletter-form');
    
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Add loading state
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        
        submitBtn.innerHTML = '<span>Inscription...</span>';
        submitBtn.disabled = true;
        submitBtn.style.opacity = '0.7';
        
        // Simulate form submission
        setTimeout(() => {
            // Show success message
            showSuccessMessage();
            
            // Reset form
            form.reset();
            
            // Reset button
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
            submitBtn.style.opacity = '1';
        }, 2000);
    });
}

function showSuccessMessage() {
    const successMessage = document.createElement('div');
    successMessage.innerHTML = `
        <div style="
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: linear-gradient(135deg, #22c55e, #16a34a);
            color: white;
            padding: 2rem 3rem;
            border-radius: 16px;
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
            z-index: 10000;
            text-align: center;
            animation: fadeInUp 0.5s ease-out;
        ">
            <div style="font-size: 3rem; margin-bottom: 1rem;">✓</div>
            <h3 style="margin: 0 0 0.5rem 0;">Inscription Réussie!</h3>
            <p style="margin: 0; opacity: 0.9;">Vous recevrez bientôt nos dernières innovations horlogères</p>
        </div>
    `;
    
    document.body.appendChild(successMessage);
    
    setTimeout(() => {
        successMessage.remove();
    }, 3000);
}

// ===== LAZY LOADING =====
function initializeImageLazyLoading() {
    const images = document.querySelectorAll('img[src]');
    
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                
                // Add loading state
                img.classList.add('loading');
                
                // When image loads
                img.addEventListener('load', () => {
                    img.classList.remove('loading');
                    img.classList.add('fade-in');
                });
                
                // Error handling
                img.addEventListener('error', () => {
                    img.classList.remove('loading');
                    img.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZGRkIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzk5OSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkltYWdlIG5vbiBkaXNwb25pYmxlPC90ZXh0Pjwvc3ZnPg==';
                });
                
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => {
        imageObserver.observe(img);
    });
}

// ===== UTILITY FUNCTIONS =====
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function throttle(func, limit) {
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
}

// ===== PERFORMANCE OPTIMIZATION =====
window.addEventListener('scroll', throttle(() => {
    // Handle scroll events with throttling
    updateActiveNavLink();
}, 16)); // ~60fps

window.addEventListener('resize', debounce(() => {
    // Handle resize events
    const navMenu = document.getElementById('nav-menu');
    if (window.innerWidth > 968) {
        navMenu.classList.remove('active');
    }
}, 250));

// ===== CSS ANIMATIONS UTILITIES =====
function addCSSAnimation(element, animationClass, duration = 1000) {
    element.classList.add(animationClass);
    
    setTimeout(() => {
        element.classList.remove(animationClass);
    }, duration);
}

function createFloatingAnimation(element, intensity = 10, duration = 3000) {
    element.style.animation = `float ${duration}ms ease-in-out infinite`;
    element.style.animationDelay = `${Math.random() * 1000}ms`;
}

// ===== SPECIAL EFFECTS =====
function initializeSpecialEffects() {
    // Swiss cross glow effect
    const swissCross = document.querySelector('.swiss-cross');
    if (swissCross) {
        swissCross.addEventListener('mouseenter', () => {
            swissCross.style.boxShadow = '0 0 20px rgba(220, 20, 60, 0.8)';
            swissCross.style.background = 'rgba(220, 20, 60, 0.1)';
        });
        
        swissCross.addEventListener('mouseleave', () => {
            swissCross.style.boxShadow = '';
            swissCross.style.background = '';
        });
    }

    // Timeline progress indicator
    const timelineItems = document.querySelectorAll('.timeline-item');
    const progressBar = document.createElement('div');
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        height: 4px;
        background: linear-gradient(90deg, #DC143C, #b91c3c);
        z-index: 9999;
        transition: width 0.3s ease;
    `;
    document.body.appendChild(progressBar);

    window.addEventListener('scroll', () => {
        const scrollPercent = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
        progressBar.style.width = `${scrollPercent}%`;
    });
}

// Initialize special effects on load
document.addEventListener('DOMContentLoaded', () => {
    initializeSpecialEffects();
});

// ===== ERROR HANDLING =====
window.addEventListener('error', (e) => {
    console.warn('JavaScript error handled:', e.error);
});

window.addEventListener('unhandledrejection', (e) => {
    console.warn('Unhandled promise rejection:', e.reason);
});

// ===== EXPORT FUNCTIONS FOR GLOBAL ACCESS =====
window.scrollToSection = scrollToSection;
window.scrollToTop = scrollToTop;

// ===== FINAL INITIALIZATION =====
console.log('Swiss Watch Materials Interactive Website Loaded Successfully! 🇨🇭');