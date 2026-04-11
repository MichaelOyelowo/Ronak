(function () {

    function getSavedName() {
        try {
            return localStorage.getItem('ronaks_user_name') || null;
        } catch (e) { return null; }
    }

    function getNameSavedAt() {
        try {
            return parseInt(localStorage.getItem('ronaks_user_name_at') || '0', 10);
        } catch (e) { return 0; }
    }

    function getGreeting() {
        const hour = new Date().getHours();
        if (hour >= 5  && hour < 12) return 'Good morning';
        if (hour >= 12 && hour < 17) return 'Good afternoon';
        if (hour >= 17 && hour < 21) return 'Good evening';
        return 'Welcome back';
    }

    function getSubMessage() {
        const hour = new Date().getHours();
        if (hour >= 5  && hour < 12) return 'Ready to explore new collections today?';
        if (hour >= 12 && hour < 17) return 'Great to have you back at Ronaks.';
        if (hour >= 17 && hour < 21) return 'Lovely to see you again this evening.';
        return 'Browsing late — we love the dedication.';
    }

    function hasGreetedThisSession() {
        try {
            return sessionStorage.getItem('ronaks_greeted') === 'true';
        } catch (e) { return false; }
    }

    function markGreetedThisSession() {
        try {
            sessionStorage.setItem('ronaks_greeted', 'true');
        } catch (e) {}
    }

    // ─────────────────────────────────────
    // KEY FIX — only greet if name was saved
    // more than 60 seconds ago.
    // This prevents the awkward "welcome back"
    // immediately after they typed their name
    // on the same visit.
    // On a genuine return visit the timestamp
    // will be hours or days old so it passes.
    // ─────────────────────────────────────
    function isReturnVisit() {
        const savedAt = getNameSavedAt();
        if (!savedAt) return false;
        const secondsAgo = (Date.now() - savedAt) / 1000;
        return secondsAgo > 60; // must be at least 60 seconds old
    }

    function showGreeting(name) {
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
                        ${getGreeting()}, <strong>${name}</strong>! 👋
                    </p>
                    <p class="greeting-sub">${getSubMessage()}</p>
                </div>
                <button class="greeting-close" id="greetingClose" aria-label="Dismiss greeting">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
                         stroke-width="2.5" stroke-linecap="round"
                         stroke-linejoin="round" aria-hidden="true">
                        <line x1="18" y1="6" x2="6" y2="18"/>
                        <line x1="6" y1="6" x2="18" y2="18"/>
                    </svg>
                </button>
            </div>
        `;

        document.body.appendChild(toast);

        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                toast.classList.add('greeting-toast--visible');
            });
        });

        document.getElementById('greetingClose').addEventListener('click', () => {
            dismissGreeting(toast);
        });

        setTimeout(() => dismissGreeting(toast), 5000);
        markGreetedThisSession();
    }

    function dismissGreeting(toast) {
        if (!toast) return;
        toast.classList.remove('greeting-toast--visible');
        setTimeout(() => {
            if (toast.parentNode) toast.parentNode.removeChild(toast);
        }, 400);
    }

    function init() {
        const name = getSavedName();
        if (!name)               return; // no name saved yet
        if (!isReturnVisit())    return; // name saved too recently — same visit
        if (hasGreetedThisSession()) return; // already greeted this session

        setTimeout(() => showGreeting(name), 1500);
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();