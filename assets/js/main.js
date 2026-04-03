document.addEventListener("DOMContentLoaded", () => {

    /* ═══════════════════════════════════════════════════════
       1. TYPEWRITER PLACEHOLDER
       Cycles animated placeholder text across all search inputs.
    ═══════════════════════════════════════════════════════ */
    const searchInputs = document.querySelectorAll('input[name="search"]');

    if (searchInputs.length > 0) {
        const phrases = ['Search Batik...', 'Search Silk...', 'Search Chiffon...', 'Search Tie-Dye...'];
        let phraseIndex = 0;
        let charIndex   = 0;
        let isDeleting  = false;

        function typeWriter() {
            const currentPhrase = phrases[phraseIndex];
            const textToShow    = isDeleting
                ? currentPhrase.substring(0, charIndex - 1)
                : currentPhrase.substring(0, charIndex + 1);

            searchInputs.forEach(input => input.setAttribute('placeholder', textToShow));

            if (isDeleting) charIndex--; else charIndex++;

            let delay = isDeleting ? 40 : 80;

            if (!isDeleting && charIndex === currentPhrase.length) {
                delay      = 2000;
                isDeleting = true;
            } else if (isDeleting && charIndex === 0) {
                isDeleting  = false;
                phraseIndex = (phraseIndex + 1) % phrases.length;
                delay       = 500;
            }

            setTimeout(typeWriter, delay);
        }

        setTimeout(typeWriter, 1000);
    }


    /* ═══════════════════════════════════════════════════════
       2. DESKTOP DROPDOWN
       Handles click-to-toggle, keyboard (Enter/Space/Escape),
       and closes when clicking anywhere outside.
    ═══════════════════════════════════════════════════════ */
    const shopTrigger  = document.getElementById('shop-trigger');
    const shopDropdown = document.getElementById('shop-dropdown');

    if (shopTrigger && shopDropdown) {

        /* Open / close helper */
        function setDropdown(open) {
            shopTrigger.setAttribute('aria-expanded', String(open));
            /* CSS reads aria-expanded="true" on the trigger via the ~ sibling selector */
        }

        /* Click toggle */
        shopTrigger.addEventListener('click', (e) => {
            e.stopPropagation();
            const isOpen = shopTrigger.getAttribute('aria-expanded') === 'true';
            setDropdown(!isOpen);
        });

        /* Keyboard: Enter / Space open; Escape closes */
        shopTrigger.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                const isOpen = shopTrigger.getAttribute('aria-expanded') === 'true';
                setDropdown(!isOpen);
            }
            if (e.key === 'Escape') {
                setDropdown(false);
                shopTrigger.focus();
            }
        });

        /* Escape from anywhere inside the dropdown */
        shopDropdown.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                setDropdown(false);
                shopTrigger.focus();
            }
        });

        /* Close on outside click */
        document.addEventListener('click', (e) => {
            if (!shopTrigger.closest('li').contains(e.target)) {
                setDropdown(false);
            }
        });

        /* Close on outside touch (mobile browsers) */
        document.addEventListener('touchstart', (e) => {
            if (!shopTrigger.closest('li').contains(e.target)) {
                setDropdown(false);
            }
        }, { passive: true });
    }


    /* ═══════════════════════════════════════════════════════
       3. MOBILE HAMBURGER
       Toggles aria-expanded on the button.
       The CSS :has() selector drives the actual open/close
       animation — no class toggling needed here.
    ═══════════════════════════════════════════════════════ */
    const hamburger = document.getElementById('hamburger');

    if (hamburger) {
        hamburger.addEventListener('click', () => {
            const isOpen = hamburger.getAttribute('aria-expanded') === 'true';
            hamburger.setAttribute('aria-expanded', String(!isOpen));
        });

        /* Close mobile menu on Escape */
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && hamburger.getAttribute('aria-expanded') === 'true') {
                hamburger.setAttribute('aria-expanded', 'false');
                hamburger.focus();
            }
        });
    }


    /* ═══════════════════════════════════════════════════════
       4. MOBILE SHOP SUB-MENU
       Toggles the .open class on the sub-panel.
       The CSS max-height transition handles animation.
    ═══════════════════════════════════════════════════════ */
    const mobileShopToggle = document.getElementById('mobileShopToggle');
    const mobileShopSub    = document.getElementById('mobileShopSub');

    if (mobileShopToggle && mobileShopSub) {
        mobileShopToggle.addEventListener('click', () => {
            const isOpen = mobileShopToggle.getAttribute('aria-expanded') === 'true';
            mobileShopToggle.setAttribute('aria-expanded', String(!isOpen));
            mobileShopSub.classList.toggle('open', !isOpen);
        });
    }


    /* ═══════════════════════════════════════════════════════
       5. ACTIVE PAGE HIGHLIGHT
       Reads data-page from nav links and marks the current
       page link with aria-current="page".
       Replace getCurrentPage() with your own routing logic
       if you move to a multi-page or SPA setup.
    ═══════════════════════════════════════════════════════ */
    function getCurrentPage() {
        /* For a flat file site, derive the page name from the filename.
           e.g. "/about.html" → "about", "/" or "/index.html" → "home"  */
        const path = window.location.pathname.replace(/\/$/, '').split('/').pop();
        return path.replace('.html', '') || 'home';
    }

    const currentPage = getCurrentPage();
    document.querySelectorAll('[data-page]').forEach(el => {
        if (el.dataset.page === currentPage) {
            el.setAttribute('aria-current', 'page');
        } else {
            el.removeAttribute('aria-current');
        }
    });

});