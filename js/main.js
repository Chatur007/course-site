
document.addEventListener('DOMContentLoaded', function() {
    initNavigation();
    initScrollEffects();
    initFormValidation();
    initAnimations();
    initBackToTop();
    initScrollObserver();
});

function sendMail(){
    let params={
        name:document.getElementById("name").value,
        email:document.getElementById("email").value,
        phone:document.getElementById("phone").value,
        company:document.getElementById("company").value,
        service:document.getElementById("service").value,
        message:document.getElementById("message").value,
    }
    emailjs.send("service_g5qo4y4","template_gglu84r",params).then(alert("Email Sent!!"))
}
function initNavigation() {
    const navbar = document.getElementById('navbar');
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });


    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    document.addEventListener('click', function(e) {
        if (!navbar.contains(e.target)) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80; 
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    window.addEventListener('scroll', function() {
        const scrollY = window.scrollY;
        
        navLinks.forEach(link => {
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const sectionTop = targetSection.offsetTop - 120;
                const sectionBottom = sectionTop + targetSection.offsetHeight;
                
                if (scrollY >= sectionTop && scrollY < sectionBottom) {
                    navLinks.forEach(l => l.classList.remove('active'));
                    link.classList.add('active');
                }
            }
        });
    });
}


function initScrollEffects() {
    const navbar = document.getElementById('navbar');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    const scrollArrow = document.querySelector('.scroll-arrow');
    if (scrollArrow) {
        scrollArrow.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    }

    const ctaButtons = document.querySelectorAll('.btn[href^="#"]');
    ctaButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

function initFormValidation() {
    const form = document.getElementById('contact-form');
    const submitButton = form.querySelector('button[type="submit"]');
    const successMessage = document.getElementById('form-success');


    const validationRules = {
        name: {
            required: true,
            minLength: 2,
            pattern: /^[a-zA-Z\s]+$/,
            message: 'Please enter a valid name (letters only)'
        },
        email: {
            required: true,
            pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            message: 'Please enter a valid email address'
        },
        phone: {
            required: false,
            pattern: /^[\+]?[1-9][\d]{0,15}$/,
            message: 'Please enter a valid phone number'
        },
        message: {
            required: true,
            minLength: 10,
            message: 'Please enter a message with at least 10 characters'
        }
    };


    Object.keys(validationRules).forEach(fieldName => {
        const field = form.querySelector(`[name="${fieldName}"]`);
        if (field) {
            field.addEventListener('blur', () => validateField(field, validationRules[fieldName]));
            field.addEventListener('input', () => clearFieldError(field));
        }
    });


    form.addEventListener('submit', function(e) {
        e.preventDefault();

   
        let isValid = true;
        Object.keys(validationRules).forEach(fieldName => {
            const field = form.querySelector(`[name="${fieldName}"]`);
            if (field && !validateField(field, validationRules[fieldName])) {
                isValid = false;
            }
        });

        if (isValid) {
            submitForm(form, submitButton, successMessage);
        }
    });
}


function validateField(field, rules) {
    const value = field.value.trim();
    const formGroup = field.closest('.form-group');
    const errorElement = formGroup.querySelector('.error-message');

  
    formGroup.classList.remove('error');
    errorElement.textContent = '';

 
    if (rules.required && !value) {
        showFieldError(formGroup, errorElement, 'This field is required');
        return false;
    }

 
    if (!value && !rules.required) {
        return true;
    }


    if (rules.pattern && !rules.pattern.test(value)) {
        showFieldError(formGroup, errorElement, rules.message);
        return false;
    }


    if (rules.minLength && value.length < rules.minLength) {
        showFieldError(formGroup, errorElement, `Minimum ${rules.minLength} characters required`);
        return false;
    }

    return true;
}

function showFieldError(formGroup, errorElement, message) {
    formGroup.classList.add('error');
    errorElement.textContent = message;
}


function clearFieldError(field) {
    const formGroup = field.closest('.form-group');
    const errorElement = formGroup.querySelector('.error-message');
    
    formGroup.classList.remove('error');
    errorElement.textContent = '';
}


function submitForm(form, submitButton, successMessage) {
 
    submitButton.classList.add('loading');
    submitButton.disabled = true;

 
    setTimeout(() => {
 
        submitButton.classList.remove('loading');
        submitButton.disabled = false;

   
        successMessage.classList.add('show');
        form.reset();


        setTimeout(() => {
            successMessage.classList.remove('show');
        }, 5000);

        successMessage.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'center' 
        });
    }, 2000);
}


function initAnimations() {
  
    const counters = document.querySelectorAll('.stat-number');
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px 0px -50px 0px'
    };

    const counterObserver = new IntersectionObserver((entries) => {
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
    const target = element.textContent;
    const numericValue = target.match(/\d+/);
    
    if (!numericValue) return;
    
    const finalNumber = parseInt(numericValue[0]);
    const suffix = target.replace(numericValue[0], '');
    const duration = 2000;
    const increment = finalNumber / (duration / 16);
    let current = 0;

    const timer = setInterval(() => {
        current += increment;
        if (current >= finalNumber) {
            element.textContent = finalNumber + suffix;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current) + suffix;
        }
    }, 16);
}


function initScrollObserver() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

   
    const animatedElements = document.querySelectorAll('[data-aos]');
    animatedElements.forEach(element => {
       
        const animation = element.getAttribute('data-aos');
        switch (animation) {
            case 'fade-up':
                element.classList.add('fade-in');
                break;
            case 'fade-left':
                element.classList.add('slide-in-right');
                break;
            case 'fade-right':
                element.classList.add('slide-in-left');
                break;
            default:
                element.classList.add('fade-in');
        }
        
        scrollObserver.observe(element);
    });

   
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach((card, index) => {
        card.style.transitionDelay = `${index * 0.1}s`;
        scrollObserver.observe(card);
    });

   
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    testimonialCards.forEach((card, index) => {
        card.style.transitionDelay = `${index * 0.2}s`;
        scrollObserver.observe(card);
    });
}


function initBackToTop() {
    const backToTopButton = document.getElementById('back-to-top');

    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            backToTopButton.classList.add('show');
        } else {
            backToTopButton.classList.remove('show');
        }
    });

    backToTopButton.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}


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
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}



function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}


function getScrollPosition() {
    return window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
}


function scrollToElement(element, offset = 0) {
    const elementPosition = element.offsetTop - offset;
    window.scrollTo({
        top: elementPosition,
        behavior: 'smooth'
    });
}


window.addEventListener('error', function(e) {
    console.error('JavaScript error:', e.error);
    
});


function hidePreloader() {
    const preloader = document.querySelector('.preloader');
    if (preloader) {
        preloader.style.opacity = '0';
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 300);
    }
}


window.addEventListener('load', hidePreloader);


function shareOnSocial(platform, url, text) {
    let shareUrl;
    const encodedUrl = encodeURIComponent(url);
    const encodedText = encodeURIComponent(text);

    switch (platform) {
        case 'facebook':
            shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`;
            break;
        case 'twitter':
            shareUrl = `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedText}`;
            break;
        case 'linkedin':
            shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`;
            break;
        default:
            return;
    }

    window.open(shareUrl, '_blank', 'width=600,height=400,scrollbars=yes,resizable=yes');
}



