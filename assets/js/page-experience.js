(function () {

    // ═══════════════════════════════════════
    // 1. PAGE PRELOADER
    // ═══════════════════════════════════════

    function initPreloader() {
        // Create the preloader element
        const preloader = document.createElement('div');
        preloader.id        = 'sitePreloader';
        preloader.className = 'site-preloader';
        preloader.setAttribute('aria-hidden', 'true');
        preloader.setAttribute('role', 'presentation');

        preloader.innerHTML = `
            <div class="preloader-content">
                <p class="preloader-logo">RONAKS</p>
                <p class="preloader-sub">Adire &amp; Textile</p>
            </div>
            <div class="preloader-bar-wrap">
                <div class="preloader-bar" id="preloaderBar"></div>
            </div>
        `;

        // Insert as first child of body so it sits on top of everything
        document.body.insertBefore(preloader, document.body.firstChild);

        // Prevent scroll while preloader is active
        document.body.style.overflow = 'hidden';

        // Dismiss after 1.8 seconds — enough to feel intentional
        // but not long enough to frustrate
        setTimeout(dismissPreloader, 1800);
    }

    function dismissPreloader() {
        const preloader = document.getElementById('sitePreloader');
        if (!preloader) return;

        // Fade out
        preloader.classList.add('site-preloader--done');
        document.body.style.overflow = '';

        // Remove from DOM after transition finishes
        setTimeout(() => {
            if (preloader.parentNode) preloader.parentNode.removeChild(preloader);
        }, 600);
    }

    // ═══════════════════════════════════════
    // 2. PAGE TRANSITIONS
    // Indigo curtain sweeps in when leaving
    // then sweeps out when new page loads
    // ═══════════════════════════════════════

    function initPageTransitions() {
        // Create the transition curtain
        const curtain = document.createElement('div');
        curtain.id        = 'pageCurtain';
        curtain.className = 'page-curtain';
        curtain.setAttribute('aria-hidden', 'true');
        document.body.appendChild(curtain);

        // On page load — sweep the curtain OUT (right to left)
        // This reveals the new page content
        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                curtain.classList.add('page-curtain--reveal');
            });
        });

        // Intercept all internal link clicks
        document.addEventListener('click', (e) => {
            const link = e.target.closest('a');
            if (!link) return;

            const href = link.getAttribute('href');
            if (!href) return;

            // Skip: external links, anchors, new tab, no href, javascript:
            const isExternal   = link.hostname !== window.location.hostname;
            const isAnchor     = href.startsWith('#');
            const isNewTab     = link.target === '_blank';
            const isJavascript = href.startsWith('javascript');
            const isMailTo     = href.startsWith('mailto');
            const isTel        = href.startsWith('tel');

            if (isExternal || isAnchor || isNewTab || isJavascript || isMailTo || isTel) return;

            // Prevent default navigation
            e.preventDefault();

            // Sweep curtain IN (left to right) — covers the page
            curtain.classList.remove('page-curtain--reveal');
            curtain.classList.add('page-curtain--cover');

            // Navigate after curtain finishes (0.45s)
            setTimeout(() => {
                window.location.href = href;
            }, 450);
        });
    }

    // ═══════════════════════════════════════
    // 3. COOKIE CONSENT BANNER
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
    // 5. BACK TO TOP BUTTON
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
        initPreloader();
        initPageTransitions();
        initCookieBanner();
        initBackToTop();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();