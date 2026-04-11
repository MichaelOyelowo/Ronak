(function () {

    // ═══════════════════════════════════════
    // 1. COOKIE CONSENT BANNER
    // Simple Accept / Reject — no categories
    // Stored in localStorage permanently
    // ═══════════════════════════════════════

    function initCookieBanner() {
        // Check if already responded
        try {
            const decision = localStorage.getItem('ronaks_cookies');
            if (decision) return; // already accepted or rejected — do nothing
        } catch (e) {
            return;
        }

        // Build banner
        const banner = document.createElement('div');
        banner.id        = 'cookieBanner';
        banner.className = 'cookie-banner';
        banner.setAttribute('role', 'dialog');
        banner.setAttribute('aria-modal', 'false');
        banner.setAttribute('aria-label', 'Cookie consent');

        banner.innerHTML = `
            <div class="cookie-banner-inner">
                <div class="cookie-text-wrap">
                    <p class="cookie-title">We use cookies</p>
                    <p class="cookie-text">
                        We use cookies to improve your browsing experience on Ronaks Adire.
                        By clicking <strong>Accept</strong>, you agree to our use of cookies.
                        <a href="#" class="cookie-link">Privacy Policy</a>
                    </p>
                </div>
                <div class="cookie-btns">
                    <button class="cookie-btn cookie-btn--reject" id="cookieReject" aria-label="Reject cookies">
                        Reject
                    </button>
                    <button class="cookie-btn cookie-btn--accept" id="cookieAccept" aria-label="Accept cookies">
                        Accept
                    </button>
                </div>
            </div>
        `;

        document.body.appendChild(banner);

        // Slide up after a short delay so it doesn't
        // compete with the preloader dismissing
        setTimeout(() => {
            banner.classList.add('cookie-banner--visible');
        }, 2400);

        // Accept
        document.getElementById('cookieAccept').addEventListener('click', () => {
            saveCookieDecision('accepted');
            dismissCookieBanner(banner);
        });

        // Reject
        document.getElementById('cookieReject').addEventListener('click', () => {
            saveCookieDecision('rejected');
            dismissCookieBanner(banner);
        });
    }

    function saveCookieDecision(decision) {
        try {
            localStorage.setItem('ronaks_cookies', decision);
        } catch (e) {}
    }

    function dismissCookieBanner(banner) {
        banner.classList.remove('cookie-banner--visible');
        banner.classList.add('cookie-banner--dismissed');
        setTimeout(() => {
            if (banner.parentNode) banner.parentNode.removeChild(banner);
        }, 500);
    }

    // ═══════════════════════════════════════
    // 2. BACK TO TOP BUTTON
    // Appears after scrolling 400px
    // Smooth scrolls to top on click
    // ═══════════════════════════════════════

    function initBackToTop() {
        // Build button
        const btn = document.createElement('button');
        btn.id        = 'backToTop';
        btn.className = 'back-to-top';
        btn.setAttribute('aria-label', 'Back to top');
        btn.setAttribute('title', 'Back to top');

        btn.innerHTML = `
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
                 stroke-width="2.5" stroke-linecap="round"
                 stroke-linejoin="round" aria-hidden="true">
                <polyline points="18 15 12 9 6 15"/>
            </svg>
        `;

        document.body.appendChild(btn);

        // Show/hide on scroll
        // passive: true tells browser this listener won't call preventDefault
        // so it can optimise scrolling performance
        let scrollTimer;
        window.addEventListener('scroll', () => {
            // Debounce — only check every 100ms to avoid layout thrashing
            clearTimeout(scrollTimer);
            scrollTimer = setTimeout(() => {
                const shouldShow = window.scrollY > 400;
                btn.classList.toggle('back-to-top--visible', shouldShow);
                btn.setAttribute('aria-hidden', !shouldShow);
            }, 100);
        }, { passive: true });

        // Smooth scroll to top on click
        btn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // ═══════════════════════════════════════
    // INIT ALL — run on DOMContentLoaded
    // ═══════════════════════════════════════

    function init() {
        initCookieBanner();
        initBackToTop();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();