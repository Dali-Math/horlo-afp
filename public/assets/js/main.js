// HorloLearn - Matériaux Horlogers Suisses
// JavaScript for page interactions and animations

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initNavigation();
    initAnimations();
    initCounters();
    initTabs();
    initScrollReveal();
    initForm();
    initFloatingBall();
    
    console.log('HorloLearn page initialized successfully');
});

// ===== NAVIGATION FUNCTIONS =====
function initNavigation() {
    const navbar = document.getElementById('navbar');
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    
    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // Mobile menu toggle
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
        });
        
        // Close menu when clicking on links
        const navLinks = navMenu.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
            });
        });
    }
    
    // Smooth scrolling for anchor links
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                const headerOffset = 80;
                const elementPosition = targetElement.offsetTop;
                const offsetPosition = elementPosition - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ===== SCROLL TO SECTION =====
function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        const headerOffset = 80;
        const elementPosition = element.offsetTop;
        const offsetPosition = elementPosition - headerOffset;
        
        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
        });
    }
}

// ===== ANIMATIONS =====
function initAnimations() {
    // Add animation classes to elements
    const animatedElements = document.querySelectorAll('.fade-in-up, .fade-in-left, .fade-in-right');
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animationDelay = '0.2s';
                entry.target.style.animationFillMode = 'forwards';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    animatedElements.forEach(element => {
        observer.observe(element);
    });
}

// ===== COUNTER ANIMATIONS =====
function initCounters() {
    const counters = document.querySelectorAll('.stat-number[data-target]');
    
    const observerOptions = {
        threshold: 0.5
    };
    
    const counterObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                counterObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    counters.forEach(counter => {
        counterObserver.observe(counter);
    });
}

function animateCounter(element) {
    const target = parseInt(element.getAttribute('data-target'));
    const duration = 2000; // 2 seconds
    const startTime = performance.now();
    
    function updateCounter(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Easing function (ease out)
        const easeOut = 1 - Math.pow(1 - progress, 3);
        const current = Math.floor(target * easeOut);
        
        element.textContent = current;
        
        if (progress < 1) {
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target;
        }
    }
    
    requestAnimationFrame(updateCounter);
}

// ===== TABS FUNCTIONALITY =====
function initTabs() {
    // Timeline tabs
    initTabSystem('.timeline-tabs', '.timeline-content .timeline-item');
    
    // Materials tabs
    initTabSystem('.materials-tabs', '.materials-content .tab-content');
    
    // District tabs
    initTabSystem('.district-tabs', '.district-content .district-info');
    
    // Future trends tabs
    initTabSystem('.trend-tabs', '.trend-content .trend-item');
}

function initTabSystem(tabsContainer, contentContainer) {
    const tabs = document.querySelectorAll(`${tabsContainer} .tab-btn`);
    const contents = document.querySelectorAll(contentContainer);
    
    tabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const target = this.getAttribute('data-' + getTabType(tabsContainer));
            
            // Remove active class from all tabs and contents
            tabs.forEach(t => t.classList.remove('active'));
            contents.forEach(c => c.classList.remove('active'));
            
            // Add active class to clicked tab and corresponding content
            this.classList.add('active');
            const targetContent = document.getElementById(target);
            if (targetContent) {
                targetContent.classList.add('active');
            }
        });
    });
}

function getTabType(tabsContainer) {
    if (tabsContainer.includes('timeline')) return 'timeline';
    if (tabsContainer.includes('materials')) return 'material';
    if (tabsContainer.includes('district')) return 'district';
    if (tabsContainer.includes('trend')) return 'trend';
    return 'tab';
}

// ===== SCROLL REVEAL =====
function initScrollReveal() {
    const revealElements = document.querySelectorAll('.scroll-reveal');
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const revealObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                revealObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    revealElements.forEach(element => {
        revealObserver.observe(element);
    });
}

// ===== FORM HANDLING =====
function initForm() {
    const form = document.getElementById('newsletter-form');
    
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(form);
            const data = Object.fromEntries(formData);
            
            // Validate form
            if (validateForm(data)) {
                // Show success message
                showFormMessage('Merci ! Votre inscription a été enregistrée.', 'success');
                form.reset();
            } else {
                showFormMessage('Veuillez remplir tous les champs requis.', 'error');
            }
        });
    }
}

function validateForm(data) {
    return data.email && data.name && data.interest && data.updates;
}

function showFormMessage(message, type) {
    // Create message element
    const messageEl = document.createElement('div');
    messageEl.className = `form-message ${type}`;
    messageEl.textContent = message;
    
    // Style the message
    messageEl.style.padding = '1rem';
    messageEl.style.margin = '1rem 0';
    messageEl.style.borderRadius = '8px';
    messageEl.style.fontWeight = '500';
    
    if (type === 'success') {
        messageEl.style.backgroundColor = '#d4edda';
        messageEl.style.color = '#155724';
        messageEl.style.border = '1px solid #c3e6cb';
    } else {
        messageEl.style.backgroundColor = '#f8d7da';
        messageEl.style.color = '#721c24';
        messageEl.style.border = '1px solid #f5c6cb';
    }
    
    // Insert message after form
    const form = document.getElementById('newsletter-form');
    form.parentNode.insertBefore(messageEl, form.nextSibling);
    
    // Remove message after 5 seconds
    setTimeout(() => {
        messageEl.remove();
    }, 5000);
}

// ===== FLOATING BALL =====
function initFloatingBall() {
    // Create floating ball if it doesn't exist
    let floatingBall = document.getElementById('minimax-floating-ball');
    
    if (!floatingBall) {
        floatingBall = document.createElement('div');
        floatingBall.id = 'minimax-floating-ball';
        floatingBall.innerHTML = `
            <div class="minimax-ball-content">
                <div class="minimax-logo-wave"></div>
                <span class="minimax-ball-text">MiniMax Agent</span>
                <div class="minimax-close-icon" onclick="closeFloatingBall()">×</div>
            </div>
        `;
        
        floatingBall.addEventListener('click', function() {
            // Handle click (e.g., redirect to MiniMax)
            window.open('https://www.minimaxi.com', '_blank');
        });
        
        document.body.appendChild(floatingBall);
    }
}

function closeFloatingBall() {
    const floatingBall = document.getElementById('minimax-floating-ball');
    if (floatingBall) {
        floatingBall.style.display = 'none';
    }
}

// ===== UTILITY FUNCTIONS =====

// Debounce function for performance optimization
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

// Throttle function for scroll events
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

// Performance optimized scroll handler
const optimizedScrollHandler = throttle(function() {
    // Handle scroll events here
}, 16); // ~60fps

window.addEventListener('scroll', optimizedScrollHandler);

// ===== COLOR SAMPLES INTERACTION =====
document.addEventListener('DOMContentLoaded', function() {
    const colorSamples = document.querySelectorAll('.color-sample');
    
    colorSamples.forEach(sample => {
        sample.addEventListener('click', function() {
            // Remove active class from siblings
            this.parentElement.querySelectorAll('.color-sample').forEach(s => {
                s.classList.remove('active');
            });
            
            // Add active class to clicked sample
            this.classList.add('active');
            
            // Add some visual feedback
            this.style.transform = 'scale(1.2)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 200);
        });
    });
});

// ===== LOADING STATES =====
function showLoading(element) {
    element.classList.add('loading');
}

function hideLoading(element) {
    element.classList.remove('loading');
}

// ===== ACCESSIBILITY ENHANCEMENTS =====
document.addEventListener('DOMContentLoaded', function() {
    // Add keyboard navigation for tabs
    const tabButtons = document.querySelectorAll('.tab-btn');
    
    tabButtons.forEach((button, index) => {
        button.addEventListener('keydown', function(e) {
            let nextIndex;
            
            if (e.key === 'ArrowRight') {
                nextIndex = (index + 1) % tabButtons.length;
                tabButtons[nextIndex].focus();
                tabButtons[nextIndex].click();
            } else if (e.key === 'ArrowLeft') {
                nextIndex = (index - 1 + tabButtons.length) % tabButtons.length;
                tabButtons[nextIndex].focus();
                tabButtons[nextIndex].click();
            }
        });
    });
    
    // Add ARIA attributes for better screen reader support
    const tabContainers = document.querySelectorAll('[class*="tabs"]');
    tabContainers.forEach(container => {
        container.setAttribute('role', 'tablist');
    });
    
    const tabButtons = container.querySelectorAll('.tab-btn');
    tabButtons.forEach(button => {
        button.setAttribute('role', 'tab');
    });
    
    const tabContents = container.querySelectorAll('[class*="item"]');
    tabContents.forEach(content => {
        content.setAttribute('role', 'tabpanel');
    });
});

console.log('HorloLearn JavaScript loaded successfully');
