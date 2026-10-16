/**
 * AJ Bags - Global Interactive Script
 * Pure Vanilla JavaScript (ES6+)
 */

// 1. Shopping Cart Functionality
function addtocart(image, details, price) {
    const product = {
        image: image,
        details: details,
        price: price
    };
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.push(product);
    localStorage.setItem("cart", JSON.stringify(cart));
    alert("Product added successfully!");
}

// 2. Hero Section Variant Switcher
function switchHeroVariant(variant) {
    const mainImg = document.getElementById('hero-product-img');
    const badgeTitle = document.getElementById('hero-card-title');
    const badgePrice = document.getElementById('hero-card-price');
    const btnEmerald = document.getElementById('hero-btn-emerald');
    const btnSandstone = document.getElementById('hero-btn-sandstone');
    if (!mainImg) return;
    
    mainImg.style.opacity = '0.3';
    mainImg.style.transform = 'scale(0.97)';
    
    setTimeout(() => {
        if (variant === 'sandstone') {
            mainImg.src = 'hero_bag_2.jpg';
            mainImg.alt = 'Avelon Sandstone Backpack';
            if (badgeTitle) badgeTitle.textContent = 'Avelon Canvas Pack';
            if (badgePrice) badgePrice.textContent = '$195';
            if (btnSandstone && btnEmerald) {
                btnSandstone.className = 'hero-variant-btn hero-variant-btn--active';
                btnEmerald.className = 'hero-variant-btn';
            }
        } else {
            mainImg.src = 'hero_bag.jpg';
            mainImg.alt = 'Terra Nova Signature Tote';
            if (badgeTitle) badgeTitle.textContent = 'Terra Nova Signature Tote';
            if (badgePrice) badgePrice.textContent = '$185';
            if (btnEmerald && btnSandstone) {
                btnEmerald.className = 'hero-variant-btn hero-variant-btn--active';
                btnSandstone.className = 'hero-variant-btn';
            }
        }
        mainImg.style.opacity = '1';
        mainImg.style.transform = 'scale(1)';
    }, 200);
}

// 3. DOM Ready Interactivity & Accessibility
document.addEventListener('DOMContentLoaded', () => {
    // Mobile Navigation Toggle
    const mobileToggle = document.querySelector('.site-nav__mobile-toggle');
    const navLinks = document.querySelector('.site-nav__links');
    
    if (mobileToggle && navLinks) {
        mobileToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            const isOpen = navLinks.classList.toggle('site-nav__links--open');
            const icon = mobileToggle.querySelector('.material-symbols-outlined');
            if (icon) {
                icon.textContent = isOpen ? 'close' : 'menu';
            }
        });

        // Close mobile nav when clicking outside
        document.addEventListener('click', (e) => {
            if (!navLinks.contains(e.target) && !mobileToggle.contains(e.target)) {
                if (navLinks.classList.contains('site-nav__links--open')) {
                    navLinks.classList.remove('site-nav__links--open');
                    const icon = mobileToggle.querySelector('.material-symbols-outlined');
                    if (icon) icon.textContent = 'menu';
                }
            }
        });
    }

    // Header Shadow on Scroll
    window.addEventListener('scroll', () => {
        const nav = document.querySelector('.site-nav');
        if (nav) {
            if (window.scrollY > 20) {
                nav.classList.add('site-nav--scrolled');
            } else {
                nav.classList.remove('site-nav--scrolled');
            }
        }
    });

    // Scroll Reveal Intersection Observer
    if ('IntersectionObserver' in window) {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -40px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
    } else {
        // Fallback for older browsers
        document.querySelectorAll('.reveal').forEach(el => el.classList.add('active'));
    }

    // Contact Form Field Focus & Validation Effects
    const formInputs = document.querySelectorAll('.contact-field-group input, .contact-field-group textarea');
    formInputs.forEach(input => {
        input.addEventListener('focus', () => {
            const label = input.parentElement.querySelector('label');
            if (label) label.style.color = 'var(--color-primary)';
        });
        input.addEventListener('blur', () => {
            if (!input.value.trim()) {
                const label = input.parentElement.querySelector('label');
                if (label) label.style.color = '';
            }
        });
    });

    // Contact Form Submission Handling
    const contactForm = document.getElementById('contact-form') || document.querySelector('.contact-form-grid');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const alertToast = document.getElementById('contact-alert');
            if (alertToast) {
                alertToast.classList.add('contact-form__alert-toast--visible');
                setTimeout(() => {
                    alertToast.classList.remove('contact-form__alert-toast--visible');
                }, 5000);
            } else {
                alert('Thank you for reaching out! We will respond to your message shortly.');
            }
            contactForm.reset();
            formInputs.forEach(input => {
                const label = input.parentElement.querySelector('label');
                if (label) label.style.color = '';
            });
        });
    }

    // Smooth scroll for in-page anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId && targetId !== '#') {
                const targetEl = document.querySelector(targetId);
                if (targetEl) {
                    e.preventDefault();
                    targetEl.scrollIntoView({ behavior: 'smooth' });
                }
            }
        });
    });
});
