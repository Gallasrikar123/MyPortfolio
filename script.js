document.addEventListener('DOMContentLoaded', () => {

    // ==========================================================================
    // 1. MOBILE NAVIGATION TOGGLE
    // ==========================================================================
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // ==========================================================================
    // 2. STICKY NAVBAR & SCROLL-TO-TOP BUTTON
    // ==========================================================================
    const header = document.querySelector('.header');
    const scrollTopBtn = document.getElementById('scrollTopBtn');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('sticky');
        } else {
            header.classList.remove('sticky');
        }

        if (window.scrollY > 300) {
            scrollTopBtn.classList.add('active');
        } else {
            scrollTopBtn.classList.remove('active');
        }

        // Trigger Active Link Highlight and Animations
        highlightActiveNavLink();
        revealOnScroll();
        animateSkills();
    });

    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // ==========================================================================
    // 3. ACTIVE NAVBAR HIGHLIGHT ON SCROLL
    // ==========================================================================
    const sections = document.querySelectorAll('section[id]');

    function highlightActiveNavLink() {
        const scrollY = window.pageYOffset;

        sections.forEach(current => {
            const sectionHeight = current.offsetHeight;
            const sectionTop = current.offsetTop - 100;
            const sectionId = current.getAttribute('id');
            const navLink = document.querySelector(`.nav-menu a[href*=${sectionId}]`);

            if (navLink) {
                if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                    navLink.classList.add('active');
                } else {
                    navLink.classList.remove('active');
                }
            }
        });
    }

    // ==========================================================================
    // 4. TYPING ANIMATION
    // ==========================================================================
    const typingText = document.querySelector('.typing-text');
    const textToType = "Web Developer";
    let charIndex = 0;
    let isDeleting = false;

    function typeEffect() {
        const currentText = textToType.substring(0, charIndex);
        typingText.textContent = currentText;

        if (!isDeleting && charIndex < textToType.length) {
            charIndex++;
            setTimeout(typeEffect, 120);
        } else if (isDeleting && charIndex > 0) {
            charIndex--;
            setTimeout(typeEffect, 60);
        } else {
            isDeleting = !isDeleting;
            setTimeout(typeEffect, isDeleting ? 1500 : 500);
        }
    }

    typeEffect();

    // ==========================================================================
    // 5. BUTTON RIPPLE EFFECT
    // ==========================================================================
    const rippleButtons = document.querySelectorAll('.ripple');

    rippleButtons.forEach(button => {
        button.addEventListener('click', function (e) {
            const rect = button.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const circle = document.createElement('span');
            circle.classList.add('ripple-span');
            circle.style.top = `${y}px`;
            circle.style.left = `${x}px`;

            const diameter = Math.max(rect.width, rect.height);
            circle.style.width = circle.style.height = `${diameter}px`;

            // Clean up old ripples
            const oldRipple = button.querySelector('.ripple-span');
            if (oldRipple) {
                oldRipple.remove();
            }

            button.appendChild(circle);
        });
    });

    // ==========================================================================
    // 6. SCROLL REVEAL ANIMATIONS
    // ==========================================================================
    const reveals = document.querySelectorAll('.reveal');

    function revealOnScroll() {
        const windowHeight = window.innerHeight;
        const revealPoint = 100;

        reveals.forEach(reveal => {
            const revealTop = reveal.getBoundingClientRect().top;
            if (revealTop < windowHeight - revealPoint) {
                reveal.classList.add('active');
            }
        });
    }

    // Initial check on load
    revealOnScroll();

    // ==========================================================================
    // 7. ANIMATED SKILL PROGRESS BARS
    // ==========================================================================
    const skillBars = document.querySelectorAll('.progress-bar');
    let animatedSkills = false;

    function animateSkills() {
        const skillsSection = document.getElementById('skills');
        if (!skillsSection) return;

        const sectionPos = skillsSection.getBoundingClientRect().top;
        const screenPos = window.innerHeight / 1.3;

        if (sectionPos < screenPos && !animatedSkills) {
            skillBars.forEach(bar => {
                const targetWidth = bar.getAttribute('data-progress');
                bar.style.width = targetWidth;
            });
            animatedSkills = true;
        }
    }

    // Check skills animation on load
    animateSkills();

    // ==========================================================================
    // 8. CONTACT FORM VALIDATION
    // ==========================================================================
    const contactForm = document.getElementById('contactForm');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const messageInput = document.getElementById('message');

    const nameError = document.getElementById('nameError');
    const emailError = document.getElementById('emailError');
    const messageError = document.getElementById('messageError');

    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    }

    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        let isValid = true;

        // Name Validation
        if (nameInput.value.trim() === '') {
            nameInput.classList.add('invalid');
            nameError.classList.add('visible');
            isValid = false;
        } else {
            nameInput.classList.remove('invalid');
            nameError.classList.remove('visible');
        }

        // Email Validation
        if (emailInput.value.trim() === '' || !validateEmail(emailInput.value.trim())) {
            emailInput.classList.add('invalid');
            emailError.classList.add('visible');
            isValid = false;
        } else {
            emailInput.classList.remove('invalid');
            emailError.classList.remove('visible');
        }

        // Message Validation
        if (messageInput.value.trim() === '') {
            messageInput.classList.add('invalid');
            messageError.classList.add('visible');
            isValid = false;
        } else {
            messageInput.classList.remove('invalid');
            messageError.classList.remove('visible');
        }

        // Successful Submission
        if (isValid) {
            console.log('Form Submitted Successfully!');
            console.log({
                name: nameInput.value.trim(),
                email: emailInput.value.trim(),
                message: messageInput.value.trim()
            });

            // Clear inputs
            contactForm.reset();
            alert('Thank you! Your message has been sent successfully.');
        }
    });

    // Real-time error removal
    [nameInput, emailInput, messageInput].forEach(input => {
        input.addEventListener('input', () => {
            if (input.value.trim() !== '') {
                input.classList.remove('invalid');
                const errorSpan = input.nextElementSibling;
                if (errorSpan && errorSpan.classList.contains('error-msg')) {
                    errorSpan.classList.remove('visible');
                }
            }
        });
    });
});