document.addEventListener("DOMContentLoaded", function() {
    // ======================
    // Mobile Navigation
    // ======================
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    const navbar = document.querySelector('.navbar');

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            menuToggle.textContent = navLinks.classList.contains('active') ? '✕' : '☰';
        });
    }

    // ======================
    // Enhanced Smooth Scroll With Offset
    // ======================
    // Enhanced smooth scroll function
    function smoothScroll(target) {
        const targetElement = document.querySelector(target);
        if (!targetElement) return;

        const navbarHeight = navbar ? navbar.offsetHeight : 0;
        const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navbarHeight;
        
        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });

        // Close mobile menu if open
        if (window.innerWidth <= 768 && navLinks && navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
            menuToggle.textContent = '☰';
        }
    }

    // Handle all navigation clicks
    document.querySelectorAll('.navbar a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const target = this.getAttribute('href');
            if (target !== '#') {
                smoothScroll(target);
            }
        });
    });


    // ======================
    // Navbar Scroll Effect
    // ======================
    if (navbar) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
    }

    // ======================
    // Product Card Scroll Animation
    // ======================
    const initCardAnimations = () => {
        const cards = document.querySelectorAll('.product-card');

        if (cards.length > 0) {
            cards.forEach((card, index) => {
                const direction = index % 2 === 0 ? -1 : 1;
                card.style.transform = `translateX(${direction * 100}px)`;
                card.style.opacity = '0';
                card.style.transition = 'transform 1.2s ease, opacity 0.6s ease';
            });

            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    const card = entry.target;
                    const index = Array.from(cards).indexOf(card);
                    const direction = index % 2 === 0 ? -1 : 1;

                    if (entry.isIntersecting) {
                        card.style.transform = 'translateX(0)';
                        card.style.opacity = '1';
                    } else if (entry.boundingClientRect.top > 0) {
                        card.style.transform = `translateX(${direction * 100}px)`;
                        card.style.opacity = '0';
                    }
                });
            }, {
                threshold: 0.3,
                rootMargin: '0px 0px -50px 0px'
            });

            cards.forEach(card => observer.observe(card));
        }
    };

    // ======================
    // Logo Slider Pause on Hover
    // ======================
    const initLogoSlider = () => {
        const logoSlider = document.querySelector('.logo-slider');
        const logoTrack = document.querySelector('.logo-track');

        if (logoSlider && logoTrack) {
            logoSlider.addEventListener('mouseenter', () => {
                logoTrack.style.animationPlayState = 'paused';
            });
            logoSlider.addEventListener('mouseleave', () => {
                logoTrack.style.animationPlayState = 'running';
            });
        }
    };

    // ======================
    // Contact Form Focus Animation
    // ======================
    const initContactForm = () => {
        const contactForm = document.querySelector('.contact-form');
        if (contactForm) {
            const inputs = contactForm.querySelectorAll('input, textarea');
            inputs.forEach(input => {
                input.addEventListener('focus', () => {
                    input.classList.add('animate__animated', 'animate__pulse');
                });
                input.addEventListener('blur', () => {
                    input.classList.remove('animate__animated', 'animate__pulse');
                });
            });
        }
    };

    // ======================
    // Init All
    // ======================
    initCardAnimations();
    initLogoSlider();
    initContactForm();
});
