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
        initHero(); 
    }

/* ═══════════════════════════════════════════════════════
       8. EDITORIAL SECTION
    ═══════════════════════════════════════════════════════ */

    gsap.registerPlugin(ScrollTrigger);

const editorialSection = document.querySelector('.editorial-section');
const largeCard        = editorialSection.querySelector('.large-card');
const largeCardImg     = largeCard.querySelector('img');
const largeCardOverlay = largeCard.querySelector('.editorial-overlay');
const editorialStacked = editorialSection.querySelector('.editorial-stacked');
const smallCards       = editorialSection.querySelectorAll('.small-card');
const allSectionImages = editorialSection.querySelectorAll('img[data-new-src]');

if (editorialSection) {

    // --- Initial State Setup ---
    gsap.set([largeCard, largeCardOverlay, editorialStacked], { opacity: 0, y: 50 });
    gsap.set(largeCardOverlay, { y: 30 });

    // --- 1. Large Card Image Zoom and Parallax ---
    gsap.fromTo(largeCardImg, {
        y: 0, scale: 1.0
    }, {
        y: -100, scale: 1.15, ease: "none",
        scrollTrigger: {
            trigger: largeCard,
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
        }
    });

    // --- 2. Large Card Container and Overlay Reveal ---
    gsap.timeline({
        scrollTrigger: {
            trigger: largeCard,
            start: "top 80%",
        }
    })
    .to(largeCard,        { opacity: 1, y: 0, ease: "power2.out", duration: 0.8 }, 0)
    .to(largeCardOverlay, { opacity: 1, y: 0, ease: "power2.out", duration: 0.7 }, 0.2);

    // --- 3. Stacked Small Cards Reveal ---
    gsap.to(editorialStacked, {
        opacity: 1,
        y: 0,
        ease: "power2.out",
        duration: 0.8,
        scrollTrigger: {
            trigger: editorialStacked,
            start: "top 80%",
        }
    });

    // --- 4. Responsive Image Swap Trigger ---
    ScrollTrigger.matchMedia({

        // ── DESKTOP — unchanged ──
        "(min-width: 769px)": function() {
            ScrollTrigger.create({
                trigger: editorialSection,
                start: "bottom center",
                onLeave: ()     => swapImages(false),
                onEnterBack: () => swapImages(true),
            });
        },

        // ── MOBILE — 2 second delay after card enters view ──
        "(max-width: 768px)": function() {
            let swapTimer = null; // track the timeout so we can cancel it

            ScrollTrigger.create({
                trigger: largeCard,
                start: "top 80%",
                end: "bottom top",
                onEnter: () => {
                    // Clear any pending timer first
                    clearTimeout(swapTimer);
                    // User sees original images for 2s, then swap
                    swapTimer = setTimeout(() => swapImages(false), 2000);
                },
                onLeaveBack: () => {
                    // Cancel the timer if user scrolls back up before 2s
                    clearTimeout(swapTimer);
                    swapImages(true);
                },
                // markers: true,
            });
        },

        "all": function() {
            allSectionImages.forEach(img => {
                if (!img.getAttribute('data-original-src')) {
                    img.setAttribute('data-original-src', img.src);
                }
                img.setAttribute('data-current-src', img.src);
            });
        }

    });

    // --- 5. Image Swap Function ---
    function swapImages(reverse = false) {
        allSectionImages.forEach(img => {
            const originalSrc = img.getAttribute('data-original-src');
            const newSrc      = img.getAttribute('data-new-src');
            const currentSrc  = img.getAttribute('data-current-src');
            const targetSrc   = reverse ? originalSrc : newSrc;

            if (currentSrc !== targetSrc) {
                gsap.to(img, {
                    opacity: 0,
                    duration: 0.4,
                    onComplete: () => {
                        img.src = targetSrc;
                        img.setAttribute('data-current-src', targetSrc);
                        gsap.to(img, { opacity: 1, duration: 0.6 });
                    }
                });
            }
        });
    }

    // --- 6. Small Card Individual Parallax ---
    smallCards.forEach(card => {
        const cardImg = card.querySelector('img');
        gsap.to(cardImg, {
            yPercent: 15, ease: "none",
            scrollTrigger: {
                trigger: card,
                start: "top bottom",
                end: "bottom top",
                scrub: 0.8,
            }
        });
    });

}

/* ═══════════════════════════════════════
   WISHLIST WITH LOCALSTORAGE
═══════════════════════════════════════ */
const wishlistFloat = document.getElementById('wishlistFloat');
const wishlistCount = document.getElementById('wishlistCount');

// Load saved wishlist from localStorage
let savedWishlist = JSON.parse(localStorage.getItem('ronaks-wishlist') || '[]');

function updateWishlistUI() {
  const count = savedWishlist.length;
  wishlistCount.textContent = count;
  wishlistFloat.classList.toggle('visible', count > 0);
}

// On page load, restore active state on buttons
document.querySelectorAll('.wishlist-btn').forEach(btn => {
  const card = btn.closest('.product-card');
  const productName = card.querySelector('.product-name')?.textContent.trim();

  // Restore saved state
  if (savedWishlist.includes(productName)) {
    btn.classList.add('active');
  }

  btn.addEventListener('click', (e) => {
    e.stopPropagation();
    const isActive = btn.classList.toggle('active');

    if (isActive) {
      // Add to wishlist
      if (!savedWishlist.includes(productName)) {
        savedWishlist.push(productName);
      }
    } else {
      // Remove from wishlist
      savedWishlist = savedWishlist.filter(name => name !== productName);
    }

    localStorage.setItem('ronaks-wishlist', JSON.stringify(savedWishlist));
    updateWishlistUI();
  });
});

// Run on page load to reflect saved state
updateWishlistUI();


/* ═══════════════════════════════════════
   LIGHTBOX
═══════════════════════════════════════ */
const overlay   = document.getElementById('lightboxOverlay');
const lbImg     = document.getElementById('lightboxImg');
const lbCaption = document.getElementById('lightboxCaption');
const lbClose   = document.getElementById('lightboxClose');

document.querySelectorAll('.product-img-wrap').forEach(wrap => {
  wrap.addEventListener('click', (e) => {
    if (e.target.closest('.wishlist-btn')) return;

    const img = wrap.querySelector('img');
    lbImg.src = img.src;
    lbImg.alt = img.alt;

    const card = wrap.closest('.product-card');
    const name = card.querySelector('.product-name')?.textContent || '';
    const category = card.querySelector('.product-category')?.textContent || '';
    lbCaption.textContent = category + ' — ' + name;

    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  });
});

lbClose.addEventListener('click', closeLightbox);

overlay.addEventListener('click', (e) => {
  if (e.target === overlay) closeLightbox();
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeLightbox();
});

function closeLightbox() {
  overlay.classList.remove('active');
  document.body.style.overflow = '';
}

/* ═══════════════════════════════════════
   VIDEO MODAL
═══════════════════════════════════════ */
const videoModal     = document.getElementById('videoModal');
const videoFull      = document.getElementById('videoFull');
const videoPlayBtn   = document.getElementById('videoPlayBtn');
const videoModalClose = document.getElementById('videoModalClose');

function openVideoModal() {
    videoModal.classList.add('active');
    document.body.style.overflow = 'hidden';
    videoFull.play();
}

function closeVideoModal() {
    videoModal.classList.remove('active');
    document.body.style.overflow = '';
    videoFull.pause();
    videoFull.currentTime = 0;
}

videoPlayBtn.addEventListener('click', openVideoModal);
videoModalClose.addEventListener('click', closeVideoModal);

videoModal.addEventListener('click', (e) => {
    if (e.target === videoModal) closeVideoModal();
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeVideoModal();
});

});