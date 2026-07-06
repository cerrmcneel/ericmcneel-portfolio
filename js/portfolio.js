document.addEventListener('DOMContentLoaded', () => {
    // 1. Header Scroll Shadow & Blur Effect
    const header = document.querySelector('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.style.background = 'rgba(7, 9, 14, 0.9)';
            header.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.3)';
        } else {
            header.style.background = 'rgba(7, 9, 14, 0.75)';
            header.style.boxShadow = 'none';
        }
    });

    // 2. Active Link Highlighting on Scroll
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('nav ul li a');

    window.addEventListener('scroll', () => {
        let currentSectionId = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 120; // offset header height
            const sectionHeight = section.offsetHeight;
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                currentSectionId = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').endsWith(`#${currentSectionId}`)) {
                link.classList.add('active');
            }
        });
    });

    // 3. Dynamic Glow Parallax Background on Hero
    const hero = document.getElementById('hero');
    if (hero) {
        hero.addEventListener('mousemove', (e) => {
            const { clientX, clientY } = e;
            const { width, height } = hero.getBoundingClientRect();
            const xPercent = (clientX / width) * 100;
            const yPercent = (clientY / height) * 100;
            
            // Adjust the radial gradient center slightly based on cursor
            hero.style.background = `
                radial-gradient(circle at ${15 + (xPercent * 0.1)}% ${25 + (yPercent * 0.1)}%, rgba(99, 102, 241, 0.09) 0%, transparent 45%),
                radial-gradient(circle at ${85 - (xPercent * 0.1)}% ${75 - (yPercent * 0.1)}%, rgba(16, 185, 129, 0.09) 0%, transparent 45%),
                var(--bg-primary)
            `;
        });
    }

    // 4. Smooth Scrolling for Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
});
