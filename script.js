document.addEventListener('DOMContentLoaded', function () {
    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('nav a');

    navLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);

            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 70, // Adjust offset for fixed header/nav
                    behavior: 'smooth'
                });

                // Update active class
                navLinks.forEach(navLink => navLink.classList.remove('active'));
                this.classList.add('active');
            }
        });
    });

    // Highlight active nav link on scroll
    const sections = document.querySelectorAll('section[id]');
    window.addEventListener('scroll', function () {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (pageYOffset >= sectionTop - 75) { // Adjust offset
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').substring(1) === current) {
                link.classList.add('active');
            }
        });

        // Default to first link if no section is active (e.g., at the very top)
        if (!current && navLinks.length > 0) {
            const firstLink = document.querySelector('nav a[href="#resumo"]');
            if (firstLink) {
                 // Remove active from all
                navLinks.forEach(navLink => navLink.classList.remove('active'));
                // Add to first if it exists
                firstLink.classList.add('active');
            }
        }
    });

    // Set the first link as active by default on page load
    const firstNavLink = document.querySelector('nav a[href="#resumo"]');
    if (firstNavLink) {
        firstNavLink.classList.add('active');
    }

    // Scroll Reveal Animation
    const revealElements = document.querySelectorAll('.reveal-on-scroll');

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                // Optional: Unobserve after revealing to save resources if animation is one-time
                // observer.unobserve(entry.target); 
            }
            // Optional: To re-trigger animation every time it scrolls in/out
            // else {
            //     entry.target.classList.remove('revealed');
            // }
        });
    }, {
        root: null, // relative to document viewport
        threshold: 0.1, // 10% of item visible
        // rootMargin: '0px 0px -50px 0px' // Optional: trigger a bit earlier/later
    });

    revealElements.forEach(el => {
        revealObserver.observe(el);
    });
});
