(function () {

    // ── Read the saved name ──
    // This was stored by the shop assistant when they typed their name
    function getSavedName() {
        try {
            return localStorage.getItem('ronaks_user_name') || null;
        } catch (e) {
            return null;
        }
    }

    // ── Get time-based greeting ──
    function getGreeting() {
        const hour = new Date().getHours();
        if (hour >= 5  && hour < 12) return 'Good morning';
        if (hour >= 12 && hour < 17) return 'Good afternoon';
        if (hour >= 17 && hour < 21) return 'Good evening';
        return 'Welcome back';
    }

    // ── Get time-based message ──
    function getSubMessage(hour) {
        if (hour >= 5  && hour < 12) return 'Ready to explore new collections today?';
        if (hour >= 12 && hour < 17) return 'Great to have you back at Ronaks.';
        if (hour >= 17 && hour < 21) return 'Lovely to see you again this evening.';
        return 'Browsing late — we love the dedication.';
    }

    // ── Check if already greeted this session ──
    // We only show once per browser session so it
    // doesn't pop up on every page navigation
    function hasGreetedThisSession() {
        try {
            return sessionStorage.getItem('ronaks_greeted') === 'true';
        } catch (e) {
            return false;
        }
    }

    function markGreetedThisSession() {
        try {
            sessionStorage.setItem('ronaks_greeted', 'true');
        } catch (e) {}
    }

    // ── Build and show the greeting toast ──
    function showGreeting(name) {
        const hour       = new Date().getHours();
        const greeting   = getGreeting();
        const subMessage = getSubMessage(hour);

        // Build toast element
        const toast = document.createElement('div');
        toast.id        = 'greetingToast';
        toast.className = 'greeting-toast';
        toast.setAttribute('role', 'status');
        toast.setAttribute('aria-live', 'polite');
        toast.setAttribute('aria-atomic', 'true');

        toast.innerHTML = `
            <div class="greeting-toast-inner">
                <div class="greeting-avatar" aria-hidden="true">
                    ${name.charAt(0).toUpperCase()}
                </div>
                <div class="greeting-content">
                    <p class="greeting-title">
                        ${greeting}, <strong>${name}</strong>! 👋
                    </p>
                    <p class="greeting-sub">${subMessage}</p>
                </div>
                <button class="greeting-close" id="greetingClose" aria-label="Dismiss greeting">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                        <line x1="18" y1="6" x2="6" y2="18"/>
                        <line x1="6" y1="6" x2="18" y2="18"/>
                    </svg>
                </button>
            </div>
        `;

        document.body.appendChild(toast);

        // Trigger slide-in on next paint
        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                toast.classList.add('greeting-toast--visible');
            });
        });

        // Close button
        document.getElementById('greetingClose').addEventListener('click', () => {
            dismissGreeting(toast);
        });

        // Auto dismiss after 5 seconds
        setTimeout(() => dismissGreeting(toast), 5000);

        // Mark greeted for this session
        markGreetedThisSession();
    }

    function dismissGreeting(toast) {
        if (!toast) return;
        toast.classList.remove('greeting-toast--visible');
        setTimeout(() => {
            if (toast.parentNode) toast.parentNode.removeChild(toast);
        }, 400);
    }

    // ── INIT ──
    // Wait for DOM then check conditions
    function init() {
        const name = getSavedName();

        // Only show if we have a name and haven't greeted this session
        if (!name || hasGreetedThisSession()) return;

        // Delay slightly so page content loads first
        setTimeout(() => showGreeting(name), 1500);
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();