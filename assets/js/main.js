document.addEventListener("DOMContentLoaded", () => {

    /* ═══════════════════════════════════════════════════════
      1. SCROLL REVEAL (Intersection Observer)
    ═══════════════════════════════════════════════════════ */
    const revealOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px" // Triggers slightly before it fully hits the bottom
    };

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-revealed');
                observer.unobserve(entry.target);
            }
        });
    }, revealOptions);

    const revealElements = document.querySelectorAll('.reveal-up, .reveal-fade, .reveal-left');
    revealElements.forEach(el => {
        revealObserver.observe(el);
    });

    /* ═══════════════════════════════════════════════════════
       2. TYPEWRITER PLACEHOLDER
    ═══════════════════════════════════════════════════════ */
    const searchInputs = document.querySelectorAll('input[name="search"]');

    if (searchInputs.length > 0) {
        const phrases =['Search Batik...', 'Search Silk...', 'Search Chiffon...', 'Search Tie-Dye...'];
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
       3. DESKTOP DROPDOWN
    ═══════════════════════════════════════════════════════ */
    const shopTrigger  = document.getElementById('shop-trigger');
    const shopDropdown = document.getElementById('shop-dropdown');

    if (shopTrigger && shopDropdown) {
        function setDropdown(open) {
            shopTrigger.setAttribute('aria-expanded', String(open));
        }

        shopTrigger.addEventListener('click', (e) => {
            e.stopPropagation();
            const isOpen = shopTrigger.getAttribute('aria-expanded') === 'true';
            setDropdown(!isOpen);
        });

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

        shopDropdown.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                setDropdown(false);
                shopTrigger.focus();
            }
        });

        document.addEventListener('click', (e) => {
            if (!shopTrigger.closest('li').contains(e.target)) {
                setDropdown(false);
            }
        });

        document.addEventListener('touchstart', (e) => {
            if (!shopTrigger.closest('li').contains(e.target)) {
                setDropdown(false);
            }
        }, { passive: true });
    }


    /* ═══════════════════════════════════════════════════════
       4. MOBILE HAMBURGER
    ═══════════════════════════════════════════════════════ */
    const hamburger = document.getElementById('hamburger');

    if (hamburger) {
        hamburger.addEventListener('click', () => {
            const isOpen = hamburger.getAttribute('aria-expanded') === 'true';
            hamburger.setAttribute('aria-expanded', String(!isOpen));
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && hamburger.getAttribute('aria-expanded') === 'true') {
                hamburger.setAttribute('aria-expanded', 'false');
                hamburger.focus();
            }
        });
    }


    /* ═══════════════════════════════════════════════════════
       5. MOBILE SHOP SUB-MENU
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
       6. ACTIVE PAGE HIGHLIGHT
    ═══════════════════════════════════════════════════════ */
    function getCurrentPage() {
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


    /* ═══════════════════════════════════════════════════════
       7. HERO SECTION LOGIC
    ═══════════════════════════════════════════════════════ */
    const heroWord = document.getElementById('heroWord');
    const heroPills = document.getElementById('heroPills');
    const heroDots = document.getElementById('heroDots');
    const heroImgStack = document.getElementById('heroImgStack');
    const heroRightArea = document.getElementById('heroRightArea');

    // SAFETY CHECK: Only run this if the hero elements exist on this specific page
    if (heroWord && heroPills && heroDots && heroImgStack && heroRightArea) {
        
        const categories =[
            {
              word: 'Batik',
              images:[
                { img: 'assets/images/products/cotton-batik/cotton-batik1.webp', label: 'Traditional Batik', rotate: '6deg', size: { w: 200, h: 210 }, pos: { top: '0px', right: '0px' } },
                { img: 'assets/images/products/cotton-batik/cotton-batik2.webp', label: 'Modern Batik', rotate: '-5deg', size: { w: 170, h: 185 }, pos: { top: '10px', left: '0px' } },
                { img: 'assets/images/products/cotton-batik/cotton-batik3.webp', label: 'Elegant Batik', rotate: '3deg', size: { w: 155, h: 165 }, pos: { bottom: '0px', right: '20px' } },
                { img: 'assets/images/products/cotton-batik/cotton-batik4.webp', label: 'Artistic Batik', rotate: '-4deg', size: { w: 140, h: 150 }, pos: { bottom: '10px', left: '10px' } },
              ]
            },
            {
              word: 'Chiffon',
              images:[
                { img: 'assets/images/products/tissue-chiffon/chiffon1.png', label: 'Light Chiffon', rotate: '6deg', size: { w: 200, h: 210 }, pos: { top: '0px', right: '0px' } },
                { img: 'assets/images/products/tissue-chiffon/chiffon2.png', label: 'Silk Chiffon', rotate: '-5deg', size: { w: 170, h: 185 }, pos: { top: '10px', left: '0px' } },
                { img: 'assets/images/products/tissue-chiffon/chiffon3.png', label: 'Floral Chiffon', rotate: '3deg', size: { w: 155, h: 165 }, pos: { bottom: '0px', right: '20px' } },
                { img: 'assets/images/products/tissue-chiffon/chiffon4.png', label: 'Tissue Chiffon', rotate: '-4deg', size: { w: 140, h: 150 }, pos: { bottom: '10px', left: '10px' } },
              ]
            },
            {
              word: 'Silk',
              images:[
                { img: 'assets/images/products/silk-batik/batik1.webp', label: 'Premium Silk', rotate: '6deg', size: { w: 200, h: 210 }, pos: { top: '0px', right: '0px' } },
                { img: 'assets/images/products/silk-batik/batik2.webp', label: 'Dye Silk', rotate: '-5deg', size: { w: 170, h: 185 }, pos: { top: '10px', left: '0px' } },
                { img: 'assets/images/products/silk-batik/batik3.webp', label: 'Royal Silk', rotate: '3deg', size: { w: 155, h: 165 }, pos: { bottom: '0px', right: '20px' } },
                { img: 'assets/images/products/silk-batik/batik4.webp', label: 'Classic Silk', rotate: '-4deg', size: { w: 140, h: 150 }, pos: { bottom: '10px', left: '10px' } },
              ]
            },
            {
              word: 'Tie-Dye',
              images:[
                { img: 'assets/images/products/tie-dye/tie-dye1.png', label: 'Premium Silk', rotate: '6deg', size: { w: 200, h: 210 }, pos: { top: '0px', right: '0px' } },
                { img: 'assets/images/products/tie-dye/tie-dye4.png', label: 'Dye Silk', rotate: '-5deg', size: { w: 170, h: 185 }, pos: { top: '10px', left: '0px' } },
                { img: 'assets/images/products/tie-dye/tie-dye3.png', label: 'Royal Silk', rotate: '3deg', size: { w: 155, h: 165 }, pos: { bottom: '0px', right: '20px' } },
                { img: 'assets/images/products/tie-dye/tie-dye2.png', label: 'Classic Silk', rotate: '-4deg', size: { w: 140, h: 150 }, pos: { bottom: '10px', left: '10px' } },
              ]
            }
        ];

        let current = 0;
        let autoPlayInterval;
        const fadeDelay = 500;

        function initHero() {
            categories.forEach((cat, index) => {
                const pill = document.createElement('button');
                pill.className = `hero-pill ${index === 0 ? 'active' : ''}`;
                pill.textContent = cat.word;
                pill.onclick = () => goTo(index);
                heroPills.appendChild(pill);

                const dot = document.createElement('button');
                dot.className = `hero-dot ${index === 0 ? 'active' : ''}`;
                dot.setAttribute('aria-label', `Go to ${cat.word}`);
                dot.onclick = () => goTo(index);
                heroDots.appendChild(dot);
            });

            renderCategory(0);
            startTimer();
        }

        function renderCategory(index) {
            const cat = categories[index];
            heroWord.textContent = cat.word;
            heroRightArea.setAttribute('aria-label', `${cat.word} images`);

            Array.from(heroPills.children).forEach((pill, i) => pill.classList.toggle('active', i === index));
            Array.from(heroDots.children).forEach((dot, i) => dot.classList.toggle('active', i === index));

            heroImgStack.innerHTML = cat.images.map((img, i) => {
                let styles = `width: ${img.size.w}px; height: ${img.size.h}px; transform: rotate(${img.rotate});`;
                if (img.pos.top) styles += ` top: ${img.pos.top};`;
                if (img.pos.bottom) styles += ` bottom: ${img.pos.bottom};`;
                if (img.pos.left) styles += ` left: ${img.pos.left};`;
                if (img.pos.right) styles += ` right: ${img.pos.right};`;

                return `
                <div class="hero-img-card hero-img-card--${i + 1}" style="${styles}">
                    ${img.img 
                    ? `<img src="${img.img}" alt="${img.label}" style="width: 100%; height: 100%; object-fit: cover;" onerror="this.style.display='none'; this.nextElementSibling.style.display='block';" />
                        <div style="background: #e0e0e0; width: 100%; height: 100%; display: none;"></div>` 
                    : `<div style="background: #e0e0e0; width: 100%; height: 100%;"></div>`
                    }
                    <span class="hero-img-label">${img.label}</span>
                </div>
                `;
            }).join('');
        }

        function goTo(index) {
            if (index === current) return;
            clearInterval(autoPlayInterval);
            heroWord.classList.remove('visible');
            heroImgStack.classList.remove('visible');

            setTimeout(() => {
                current = index;
                renderCategory(index);
                heroWord.classList.add('visible');
                heroImgStack.classList.add('visible');
                startTimer(); 
            }, fadeDelay);
        }

        function startTimer() {
            autoPlayInterval = setInterval(() => {
                const nextIndex = (current + 1) % categories.length;
                goTo(nextIndex);
            }, 4000); 
        }

        // Initialize immediately because we are already inside DOMContentLoaded!
        initHero(); 
    }

    // Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

// Target the elements for animation
const editorialSection = document.querySelector('.editorial-section');
const largeCard = editorialSection.querySelector('.large-card');
const largeCardImg = largeCard.querySelector('img');
const largeCardOverlay = largeCard.querySelector('.editorial-overlay');
const editorialStacked = editorialSection.querySelector('.editorial-stacked'); // Container for small cards
const smallCards = editorialSection.querySelectorAll('.small-card');

if (editorialSection) {
    // --- Initial State Setup (CSS will handle initial hidden state for FOUC protection) ---
    // Ensure all animated elements start hidden and slightly offset
    gsap.set([largeCard, largeCardOverlay, editorialStacked], { opacity: 0, y: 50 });
    gsap.set(largeCardOverlay, { y: 30 }); // Text starts a bit lower

    // --- 1. Animation for the Large Card Image (Zoom and Parallax) ---
    // This animation runs as the largeCard itself scrolls into and out of view
    gsap.fromTo(largeCardImg, {
        y: 0,    // Start at original y position
        scale: 1.0 // Start at original scale
    }, {
        y: -100,   // End slightly pushed up (parallax effect)
        scale: 1.15, // End zoomed in more (15% larger)
        ease: "none", // Linear ease for constant speed during scroll
        scrollTrigger: {
            trigger: largeCard, // Trigger this animation specifically on the largeCard
            start: "top bottom", // Starts when the top of the largeCard hits the bottom of the viewport
            end: "bottom top",   // Ends when the bottom of the largeCard leaves the top of the viewport
            scrub: 1, // Smoothly link animation to scroll position
            // markers: true, // Uncomment for debugging
        }
    });

    // --- 2. Animation for the Large Card Container and Overlay Text (Reveal) ---
    // This will simply fade in the large card and its text when the section enters view.
    gsap.timeline({
        scrollTrigger: {
            trigger: largeCard, // Trigger when the large card comes into view
            start: "top 80%",   // Start when 80% of card is in view
            // markers: true, // Uncomment for debugging
        }
    })
    .to(largeCard, { opacity: 1, y: 0, ease: "power2.out", duration: 0.8 }, 0)
    .to(largeCardOverlay, { opacity: 1, y: 0, ease: "power2.out", duration: 0.7 }, 0.2);

    // --- 3. Animation for the Stacked Small Cards (Reveal) ---
    // This will fade in the small cards when their container enters view.
    gsap.to(editorialStacked, {
        opacity: 1,
        y: 0,
        ease: "power2.out",
        duration: 0.8,
        scrollTrigger: {
            trigger: editorialStacked, // Trigger when the stacked cards container comes into view
            start: "top 80%",         // Start when 80% of container is in view
            // markers: true, // Uncomment for debugging
        }
    });

    // --- Optional: Individual Small Card Image Parallax ---
    smallCards.forEach(card => {
        const cardImg = card.querySelector('img');
        gsap.to(cardImg, {
            yPercent: 15, // Move image 15% of its height relative to scroll
            ease: "none",
            scrollTrigger: {
                trigger: card,
                start: "top bottom",
                end: "bottom top",
                scrub: 0.8,
                // markers: true, // For debugging individual card parallax
            }
        });
    });
}

});