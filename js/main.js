// ============================================
// NAVIGATION
// ============================================
const navbar = document.getElementById('navbar');
const mobileToggle = document.getElementById('mobileToggle');
const navLinks = document.getElementById('navLinks');

// Scroll effect for navbar with throttling
let ticking = false;
window.addEventListener('scroll', () => {
    if (!ticking) {
        window.requestAnimationFrame(() => {
            if (window.scrollY > 20) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
            ticking = false;
        });
        ticking = true;
    }
});

// Mobile menu toggle
if (mobileToggle) {
    mobileToggle.addEventListener('click', () => {
        mobileToggle.classList.toggle('active');
        navLinks.classList.toggle('active');
        document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
    });
}

// Close mobile menu when clicking a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        if (mobileToggle && mobileToggle.classList.contains('active')) {
            mobileToggle.classList.remove('active');
            navLinks.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
});

// Keyboard support for mobile menu
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileToggle && mobileToggle.classList.contains('active')) {
        mobileToggle.classList.remove('active');
        navLinks.classList.remove('active');
        document.body.style.overflow = '';
    }
});

// ============================================
// TYPEWRITER EFFECT
// ============================================
const typewriterElement = document.getElementById('typewriter');
if (typewriterElement) {
    const words = ['IT Student', 'Web Developer', 'Tech Enthusiast', 'Problem Solver'];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function typeWriter() {
        const currentWord = words[wordIndex];
        
        if (isDeleting) {
            typewriterElement.textContent = currentWord.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typewriterElement.textContent = currentWord.substring(0, charIndex + 1);
            charIndex++;
        }

        let typeSpeed = isDeleting ? 50 : 100;

        if (!isDeleting && charIndex === currentWord.length) {
            typeSpeed = 2000;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
            typeSpeed = 500;
        }

        setTimeout(typeWriter, typeSpeed);
    }

    // Start typewriter after a delay
    setTimeout(typeWriter, 1000);
}

// ============================================
// PARTICLES (Background effect)
// ============================================
const particlesContainer = document.getElementById('particles');
if (particlesContainer) {
    for (let i = 0; i < 20; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.cssText = `
            position: absolute;
            width: 4px;
            height: 4px;
            background: rgba(34, 211, 238, 0.3);
            border-radius: 50%;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation: floatParticle ${10 + Math.random() * 20}s ease-in-out infinite;
            animation-delay: ${Math.random() * 5}s;
            will-change: transform, opacity;
        `;
        particlesContainer.appendChild(particle);
    }
}

// ============================================
// SKILL TOGGLE (Fixed - Independent toggling)
// ============================================
function toggleSkill(button) {
    const category = button.closest('.skill-category');
    const isExpanded = category.classList.contains('expanded');
    
    // Use requestAnimationFrame for smoother animations
    requestAnimationFrame(() => {
        if (isExpanded) {
            // If already expanded, collapse it
            category.classList.remove('expanded');
            // Reset progress bars for this category only
            category.querySelectorAll('.skill-progress').forEach(bar => {
                bar.style.width = '0%';
            });
        } else {
            // If collapsed, expand it and animate its progress bars
            category.classList.add('expanded');
            
            // Animate the progress bars for this category only
            const animateBars = () => {
                category.querySelectorAll('.skill-progress').forEach((bar, index) => {
                    setTimeout(() => {
                        const progress = bar.getAttribute('data-progress');
                        bar.style.transition = 'width 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
                        bar.style.width = progress + '%';
                    }, index * 150);
                });
            };
            
            // Wait for the height animation to complete
            setTimeout(animateBars, 100);
        }
    });
}

// ============================================
// PROJECT TOGGLE
// ============================================
function toggleProject(card) {
    const wasExpanded = card.classList.contains('expanded');
    
    // Close all projects
    document.querySelectorAll('.project-card').forEach(project => {
        project.classList.remove('expanded');
    });

    // Open clicked project if it wasn't open
    if (!wasExpanded) {
        card.classList.add('expanded');
    }
}

// ============================================
// CONTACT FORM VALIDATION
// ============================================
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function showError(fieldId, message) {
    const field = document.getElementById(fieldId);
    const formGroup = field.closest('.form-group');
    const errorMessage = formGroup.querySelector('.error-message');
    
    formGroup.classList.add('error');
    errorMessage.textContent = message;
    errorMessage.style.display = 'block';
}

function clearErrors() {
    document.querySelectorAll('.form-group').forEach(group => {
        group.classList.remove('error');
        const errorMessage = group.querySelector('.error-message');
        if (errorMessage) {
            errorMessage.style.display = 'none';
        }
    });
}

// ============================================
// CONTACT FORM SUBMISSION
// ============================================
const contactForm = document.getElementById('contactForm');
const successMessage = document.getElementById('successMessage');

if (contactForm) {
    // Clear error on input
    contactForm.querySelectorAll('input, textarea').forEach(field => {
        field.addEventListener('input', () => {
            const formGroup = field.closest('.form-group');
            formGroup.classList.remove('error');
            const errorMessage = formGroup.querySelector('.error-message');
            if (errorMessage) {
                errorMessage.style.display = 'none';
            }
        });
    });

    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // Clear previous errors
        clearErrors();

        // Get form data
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const message = document.getElementById('message').value.trim();

        let hasError = false;

        // Validate name
        if (!name) {
            showError('name', 'Name is required');
            hasError = true;
        }

        // Validate email
        if (!email) {
            showError('email', 'Email is required');
            hasError = true;
        } else if (!isValidEmail(email)) {
            showError('email', 'Please enter a valid email');
            hasError = true;
        }

        // Validate message
        if (!message) {
            showError('message', 'Message is required');
            hasError = true;
        } else if (message.length < 10) {
            showError('message', 'Message must be at least 10 characters');
            hasError = true;
        }

        if (hasError) return;

        // Show loading state with smooth transition
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        const originalWidth = submitBtn.offsetWidth;
        
        submitBtn.style.width = `${originalWidth}px`;
        submitBtn.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
        submitBtn.disabled = true;
        submitBtn.innerHTML = `
            <svg class="spin" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M21 12a9 9 0 1 1-6.219-8.56"></path>
            </svg>
            Sending...
        `;

        // Add spinning animation style
        const style = document.createElement('style');
        style.textContent = `
            @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
            }
            .spin {
                animation: spin 1s cubic-bezier(0.4, 0, 0.2, 1) infinite;
            }
        `;
        document.head.appendChild(style);

        try {
            // Smooth fade out form
            contactForm.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            contactForm.style.opacity = '0';
            contactForm.style.transform = 'translateY(-10px)';
            
            await new Promise(resolve => setTimeout(resolve, 1500));
            
            // Smooth fade in success message
            successMessage.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            successMessage.style.opacity = '0';
            successMessage.style.transform = 'translateY(20px)';
            successMessage.style.display = 'block';
            
            requestAnimationFrame(() => {
                successMessage.style.opacity = '1';
                successMessage.style.transform = 'translateY(0)';
            });
            
        } catch (error) {
            console.error('Error submitting form:', error);
            
            // Smooth error recovery
            contactForm.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            contactForm.style.opacity = '1';
            contactForm.style.transform = 'translateY(0)';
            
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalText;
            
            // Show error with animation
            const errorAlert = document.createElement('div');
            errorAlert.className = 'error-alert';
            errorAlert.style.cssText = `
                position: fixed;
                top: 20px;
                right: 20px;
                background: #ef4444;
                color: white;
                padding: 1rem 1.5rem;
                border-radius: 0.75rem;
                animation: slideInRight 0.3s ease;
                z-index: 1000;
            `;
            errorAlert.textContent = 'An error occurred. Please try again.';
            document.body.appendChild(errorAlert);
            
            setTimeout(() => {
                errorAlert.style.animation = 'slideOutRight 0.3s ease';
                setTimeout(() => errorAlert.remove(), 300);
            }, 3000);
        }
    });
}

// ============================================
// RESET FORM FUNCTION
// ============================================
function resetForm() {
    const contactForm = document.getElementById('contactForm');
    const successMessage = document.getElementById('successMessage');
    
    if (contactForm && successMessage) {
        // Smooth transition
        successMessage.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        successMessage.style.opacity = '0';
        successMessage.style.transform = 'translateY(-20px)';
        
        setTimeout(() => {
            contactForm.reset();
            successMessage.style.display = 'none';
            contactForm.style.display = 'flex';
            clearErrors();
            
            // Reset button state
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            submitBtn.disabled = false;
            submitBtn.innerHTML = `
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <line x1="22" y1="2" x2="11" y2="13"></line>
                    <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                </svg>
                Send Message
            `;
            
            // Fade in form
            contactForm.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            contactForm.style.opacity = '0';
            contactForm.style.transform = 'translateY(20px)';
            contactForm.style.display = 'flex';
            
            requestAnimationFrame(() => {
                contactForm.style.opacity = '1';
                contactForm.style.transform = 'translateY(0)';
            });
        }, 500);
    }
}

// ============================================
// SCROLL ANIMATIONS
// ============================================
function animateOnScroll() {
    const elements = document.querySelectorAll('.timeline-item, .achievement-item, .stat-card, .tool-card, .certification-card, .project-card, .research-card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translate3d(0, 0, 0)';
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '50px 0px -50px 0px'
    });

    elements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translate3d(0, 30px, 0)';
        element.style.transition = 'opacity 0.6s cubic-bezier(0.4, 0, 0.2, 1), transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
        observer.observe(element);
    });
}

// Initialize scroll animations when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Fade in body content
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
    
    animateOnScroll();
});

// ============================================
// SMOOTH SCROLL FOR ANCHOR LINKS
// ============================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ============================================
// HOVER EFFECTS FOR CARDS
// ============================================
document.querySelectorAll('.glass-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translate3d(0, -5px, 0) scale(1.01)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translate3d(0, 0, 0) scale(1)';
    });
});

// ============================================
// PRELOADER (Optional)
// ============================================
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
    
    // Remove any preloader elements with animation
    const preloader = document.querySelector('.preloader');
    if (preloader) {
        preloader.style.transition = 'opacity 0.5s ease';
        preloader.style.opacity = '0';
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 500);
    }
});

// ============================================
// IMAGE LAZY LOADING
// ============================================
function lazyLoadImages() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                img.style.opacity = '0';
                img.style.transition = 'opacity 0.5s ease';
                
                setTimeout(() => {
                    img.style.opacity = '1';
                }, 100);
                
                observer.unobserve(img);
            }
        });
    }, {
        rootMargin: '50px 0px',
        threshold: 0.1
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Initialize lazy loading
document.addEventListener('DOMContentLoaded', lazyLoadImages);

// ============================================
// SMOOTH PAGE TRANSITIONS
// ============================================
document.querySelectorAll('a').forEach(link => {
    if (link.href && link.href.includes(window.location.origin) && !link.href.includes('#') && link.href !== window.location.href) {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            document.body.style.opacity = '0';
            document.body.style.transition = 'opacity 0.3s ease';
            
            setTimeout(() => {
                window.location.href = link.href;
            }, 300);
        });
    }
});

// ============================================
// BACK TO TOP BUTTON
// ============================================
const backToTop = document.createElement('button');
backToTop.innerHTML = `
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <polyline points="18 15 12 9 6 15"></polyline>
    </svg>
`;
backToTop.className = 'back-to-top';
backToTop.style.cssText = `
    position: fixed;
    bottom: 2rem;
    right: 2rem;
    width: 3rem;
    height: 3rem;
    background: linear-gradient(135deg, var(--cyan), var(--purple));
    border: none;
    border-radius: 50%;
    color: white;
    cursor: pointer;
    display: none;
    align-items: center;
    justify-content: center;
    z-index: 99;
    opacity: 0;
    transform: translateY(20px);
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    box-shadow: 0 10px 25px rgba(34, 211, 238, 0.3);
`;

document.body.appendChild(backToTop);

backToTop.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
        backToTop.style.display = 'flex';
        setTimeout(() => {
            backToTop.style.opacity = '1';
            backToTop.style.transform = 'translateY(0)';
        }, 10);
    } else {
        backToTop.style.opacity = '0';
        backToTop.style.transform = 'translateY(20px)';
        setTimeout(() => {
            if (window.scrollY <= 500) {
                backToTop.style.display = 'none';
            }
        }, 300);
    }
});

// ============================================
// PARALLAX EFFECT FOR BACKGROUND
// ============================================
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const rate = scrolled * -0.5;
    
    const orbs = document.querySelectorAll('.gradient-orb');
    orbs.forEach((orb, index) => {
        const speed = 0.1 * (index + 1);
        orb.style.transform = `translateY(${rate * speed}px)`;
    });
});

// ============================================
// DYNAMIC YEAR IN FOOTER
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    const yearSpan = document.querySelector('.current-year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }
});

// ============================================
// ADD CSS FOR NEW ANIMATIONS
// ============================================
const styleSheet = document.createElement('style');
styleSheet.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
    
    @keyframes slideInUp {
        from {
            transform: translateY(20px);
            opacity: 0;
        }
        to {
            transform: translateY(0);
            opacity: 1;
        }
    }
    
    .back-to-top:hover {
        transform: translateY(-5px) scale(1.1);
        box-shadow: 0 15px 35px rgba(34, 211, 238, 0.4);
    }
    
    /* Reduced motion preferences */
    @media (prefers-reduced-motion: reduce) {
        *,
        *::before,
        *::after {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
        }
    }
`;

document.head.appendChild(styleSheet);

// ============================================
// INITIALIZE ALL COMPONENTS
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    console.log('Portfolio website initialized successfully!');
    
    // Set active nav link based on current page
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-link').forEach(link => {
        const linkPage = link.getAttribute('href');
        if (linkPage === currentPage || (currentPage === '' && linkPage === 'index.html')) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
});