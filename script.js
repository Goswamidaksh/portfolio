document.addEventListener("DOMContentLoaded", () => {
    
    // 0. Custom Cursor Logic
    const cursorDot = document.querySelector("[data-cursor-dot]");
    const cursorOutline = document.querySelector("[data-cursor-outline]");

    if (cursorDot && cursorOutline) {
        window.addEventListener("mousemove", function (e) {
            const posX = e.clientX;
            const posY = e.clientY;

            // Dot follows exactly
            cursorDot.style.left = `${posX}px`;
            cursorDot.style.top = `${posY}px`;

            // Outline follows with a smooth delay
            cursorOutline.animate({
                left: `${posX}px`,
                top: `${posY}px`
            }, { duration: 500, fill: "forwards" });
        });
    }

    // 1. Initialize Vanta.js 3D Neural Network
    if (window.VANTA) {
        VANTA.NET({
            el: "#vanta-bg",
            mouseControls: true,
            touchControls: true,
            gyroControls: false,
            minHeight: 200.00,
            minWidth: 200.00,
            scale: 1.00,
            scaleMobile: 1.00,
            color: 0x00f3ff, // Neon Cyan High Contrast Nodes
            backgroundColor: 0x020308, // Deep Luxury Black/Blue
            points: 14.00,
            maxDistance: 22.00,
            spacing: 18.00,
            showDots: true
        });
    }

    // 2. Intersection Observer for Smooth Scroll Animations
    const faders = document.querySelectorAll('.fade-in');

    const appearOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const appearOnScroll = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            } else {
                entry.target.classList.add('appear');
                observer.unobserve(entry.target);
            }
        });
    }, appearOptions);

    faders.forEach(fader => {
        appearOnScroll.observe(fader);
    });

    // 3. Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // 4. Initialize 3D Vanilla Tilt for Glass Cards
    if (typeof VanillaTilt !== 'undefined') {
        VanillaTilt.init(document.querySelectorAll(".glass-card"), {
            max: 12,           // max tilt rotation (degrees)
            speed: 400,        // Speed of the enter/exit transition
            glare: true,       // if it should have a "glare" effect
            "max-glare": 0.15, // the maximum "glare" opacity
            perspective: 1000, // Transform perspective
            scale: 1.02        // Slight zoom on hover
        });
    }
});
