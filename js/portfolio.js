/* Eric McNeel — portfolio
 *
 * Deliberately almost nothing. The design does not depend on script:
 * with JS disabled the nav is a plain list of links and every section
 * is reachable. Two behaviours only.
 */

document.addEventListener('DOMContentLoaded', () => {

    /* 1. Collapsed nav on narrow viewports. The button is hidden by CSS
     *    above 620px, so this is inert on desktop. */
    const toggle = document.querySelector('.nav__toggle');
    const nav = document.getElementById('nav');

    if (toggle && nav) {
        toggle.addEventListener('click', () => {
            const open = nav.getAttribute('data-open') === 'true';
            nav.setAttribute('data-open', String(!open));
            toggle.setAttribute('aria-expanded', String(!open));
        });

        // Close after jumping to a section.
        nav.addEventListener('click', (e) => {
            if (e.target.tagName === 'A') {
                nav.setAttribute('data-open', 'false');
                toggle.setAttribute('aria-expanded', 'false');
            }
        });
    }

    /* 2. Mark the section currently in view. IntersectionObserver rather
     *    than a scroll handler — no work on frames where nothing crossed. */
    const sections = document.querySelectorAll('main section[id]');
    const links = new Map();

    document.querySelectorAll('.nav a[href^="#"]').forEach((a) => {
        links.set(a.getAttribute('href').slice(1), a);
    });

    if (sections.length && links.size && 'IntersectionObserver' in window) {
        const seen = new Set();

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    seen.add(entry.target.id);
                } else {
                    seen.delete(entry.target.id);
                }
            });

            links.forEach((a, id) => {
                a.removeAttribute('aria-current');
                if (seen.has(id)) { a.setAttribute('aria-current', 'true'); }
            });
        }, { rootMargin: '-45% 0px -45% 0px' });

        sections.forEach((section) => observer.observe(section));
    }
});
