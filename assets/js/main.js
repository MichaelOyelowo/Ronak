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

    const searchInput = document.querySelectorAll('.search-input');
    searchInput.forEach(input => {
        input.addEventListener('focus', () => {
            window.location.href = './shop.html';
        });
    });

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
                    ? `<img src="${img.img}" alt="${img.label}" fetchpriority="high" loading="eager" style="width: 100%; height: 100%; object-fit: cover;" onerror="this.style.display='none'; this.nextElementSibling.style.display='block';" />
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
   9. WISHLIST WITH LOCALSTORAGE
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
  10. LIGHTBOX
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
   11. VIDEO MODAL
═══════════════════════════════════════ */
const videoModal     = document.getElementById('videoModal');
const videoFull      = document.getElementById('videoFull');
const videoPlayBtn   = document.getElementById('videoPlayBtn');
const videoModalClose = document.getElementById('videoModalClose');

function openVideoModal() {
    if (!videoFull.src || videoFull.src === window.location.href) {
        videoFull.src = "https://res.cloudinary.com/dffuf2gwh/video/upload/q_auto/f_auto/w_1280/v1775481814/Ngande_Textiles_MP4_yfke0l.mp4";
    }
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


/* ═══════════════════════════════════════
        12. CHAT STORY
═══════════════════════════════════════ */
const MESSAGES =[
  { from: 'left',  text: 'Babe have you seen the new Ronaks pieces?? 😍', delay: 800 },
  { from: 'typing', delay: 1200 },
  { from: 'right', text: 'Yes oh!! I have been staring at the indigo drape since morning 😭', delay: 2400, tick: 3200 },
  { from: 'typing', delay: 4000 },
  { from: 'left',  text: 'The craftsmanship is on another level. Real hand-dyed Adire 🙌🏾', delay: 5000 },
  { from: 'typing', delay: 6000 },
  { from: 'right', text: 'I ordered the Heritage Wrap last week and it came so beautifully packaged ✨', delay: 7000, tick: 8000 },
  { from: 'left',  text: 'Wait you already ordered?? 😩 How is it??', delay: 8800 },
  { from: 'typing', delay: 9600 },
  { from: 'right', text: 'I wore it to Seun\'s dinner and everyone was asking where I got it from 🔥', delay: 10600, tick: 11400 },
  { from: 'typing', delay: 12000 },
  { from: 'left',  text: 'That\'s it. I\'m ordering right now. Which one do you recommend? 👀', delay: 13000 },
  { from: 'typing', delay: 13800 },
  { from: 'right', text: 'The Indigo Echo Drape! Just message them on WhatsApp, they\'re super responsive 🛍️', delay: 14800, tick: 15600 },
];

const waBody    = document.getElementById('waBody');
const waTimeEl  = document.getElementById('waTime');
const waButton  = document.querySelector('.whatsapp-float'); /* 1. GRAB THE WHATSAPP BUTTON */
let chatStarted = false;

// Set current time in status bar
function setWaTime() {
  const now = new Date();
  waTimeEl.textContent = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}
setWaTime();

function getTimeString() {
  return new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

function createBubble(msg) {
  const isRight = msg.from === 'right';
  const row = document.createElement('div');
  row.className = `wa-row ${isRight ? 'wa-row-right' : 'wa-row-left'}`;

  const tickHTML = isRight
    ? `<span class="wa-tick">
        <svg viewBox="0 0 18 11" fill="none" xmlns="http://www.w3.org/2000/svg" class="grey">
          <path d="M1 5.5L4.5 9L11 1" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M6 5.5L9.5 9L16 1" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </span>`
    : '';

  row.innerHTML = `
    <div class="wa-bubble ${isRight ? 'wa-bubble-right' : 'wa-bubble-left'}">
      ${msg.text}
      <div class="wa-meta">
        <span class="wa-time">${getTimeString()}</span>
        ${tickHTML}
      </div>
    </div>
  `;
  return row;
}

function createTyping() {
  const row = document.createElement('div');
  row.className = 'wa-row wa-row-left';
  row.id = 'waTyping';
  row.innerHTML = `
    <div class="wa-typing">
      <span class="wa-dot"></span>
      <span class="wa-dot"></span>
      <span class="wa-dot"></span>
    </div>
  `;
  return row;
}

function scrollToBottom() {
  setTimeout(() => {
    waBody.scrollTop = waBody.scrollHeight;
  }, 60);
}

function startChat() {
  if (chatStarted) return;
  chatStarted = true;

  let chatEndTime = 0; /* 2. CREATE A TIMER TRACKER */

  MESSAGES.forEach((msg, i) => {
    
    // 3. TRACK THE LONGEST DELAY TO KNOW EXACTLY WHEN THE CHAT FINISHES
    const currentEventEnd = Math.max(msg.delay || 0, msg.tick || 0);
    if (currentEventEnd > chatEndTime) chatEndTime = currentEventEnd;

    if (msg.from === 'typing') {
      setTimeout(() => {
        const typing = createTyping();
        waBody.appendChild(typing);
        scrollToBottom();
      }, msg.delay);

      // Remove typing after 900ms
      setTimeout(() => {
        const t = document.getElementById('waTyping');
        if (t) t.remove();
      }, msg.delay + 900);
      return;
    }

    setTimeout(() => {
      const bubble = createBubble(msg);
      waBody.appendChild(bubble);
      scrollToBottom();

      // Blue tick after delay
      if (msg.tick) {
        setTimeout(() => {
          const svg = bubble.querySelector('.wa-tick svg');
          if (svg) svg.classList.replace('grey', 'blue');
        }, msg.tick - msg.delay);
      }
    }, msg.delay);
  });

  // 4. TRIGGER WHATSAPP GIF 800ms AFTER THE VERY LAST MESSAGE/TICK FINISHES!
  if (waButton) {
    setTimeout(() => {
      waButton.classList.add('is-visible');
    }, chatEndTime + 800);
  }
}

// Trigger when section scrolls into view
const chatObserver = new IntersectionObserver(([entry]) => {
    if (entry.isIntersecting) {
      startChat();
      chatObserver.disconnect();
    }
  },
  { threshold: 0.3 }
);

const chatSection = document.getElementById('chat-story');
if (chatSection) chatObserver.observe(chatSection);

/* ═══════════════════════════════════════════════════════
   13. REVIEW CAROUSEL (Dot Syncing)
═══════════════════════════════════════════════════════ */
const reviewTrack = document.getElementById('reviewTrack');
const dots = document.querySelectorAll('.r-nav .dot');

if (reviewTrack && dots.length > 0) {
    // 1. Update dot when user manually scrolls/swipes
    reviewTrack.addEventListener('scroll', () => {
        // Calculate which card is currently in the center of the view
        const scrollPosition = reviewTrack.scrollLeft;
        const cardWidth = reviewTrack.querySelector('.r-card').offsetWidth;
        
        // Math to find the active index
        let activeIndex = Math.round(scrollPosition / cardWidth);
        
        // Safety check to ensure it doesn't exceed the number of dots
        if (activeIndex > dots.length - 1) activeIndex = dots.length - 1;

        // Update classes
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === activeIndex);
        });
    });

    // 2. Scroll to card when user clicks a specific dot
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            const cards = reviewTrack.querySelectorAll('.r-card');
            if(cards[index]) {
                // Smooth scroll to the specific card
                cards[index].scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' });
            }
        });
    });
}

/* ═══════════════════════════════════════════════════════
       14. SMART CALENDAR TOGGLE & LOADER
    ═══════════════════════════════════════════════════════ */
    const scheduleBtn = document.getElementById('scheduleBtn');
    const scheduleBtnText = document.getElementById('scheduleBtnText');
    const calendarWrapper = document.getElementById('calendar-wrapper');
    const calendarIframe = document.getElementById('calendar-iframe');
    
    let isIframeLoaded = false;

    if (scheduleBtn && calendarWrapper && calendarIframe) {
        
        const toggleCalendar = (forceClose = false) => {
            const isOpen = calendarWrapper.classList.contains('is-open');
            
            if (isOpen || forceClose) {
                // Close It
                calendarWrapper.classList.remove('is-open');
                scheduleBtn.setAttribute('aria-expanded', 'false');
                scheduleBtnText.textContent = 'Schedule a Visit';
            } else {
                // Open It
                calendarWrapper.classList.add('is-open');
                scheduleBtn.setAttribute('aria-expanded', 'true');
                scheduleBtnText.textContent = 'Close Calendar';
                
                // Lazy-load the Google Calendar only on the first click
                if (!isIframeLoaded) {
                    const sourceUrl = calendarIframe.getAttribute('data-src');
                    if (sourceUrl) {
                        calendarIframe.src = sourceUrl;
                        isIframeLoaded = true; // Marks it as loaded so we don't re-download it
                    }
                }
            }
        };

        // Button Click Event
        scheduleBtn.addEventListener('click', (e) => {
            e.stopPropagation(); 
            toggleCalendar();
        });

        // Close calendar if user clicks outside of it
        document.addEventListener('click', (e) => {
            if (!calendarWrapper.contains(e.target) && !scheduleBtn.contains(e.target)) {
                toggleCalendar(true); // Forces it closed
            }
        });
    }

    /* ═══════════════════════════════════════════════════════
       14. NEWSLETTER FORM
    ═══════════════════════════════════════════════════════ */
    function handleNewsletterSubmit(e) {
        e.preventDefault();
        const input = document.getElementById('newsletterEmail');
        const btn = e.target.querySelector('button');
        if (!input.value) return;

        // Swap button text to confirm
        const original = btn.textContent;
        btn.textContent = 'Subscribed ✓';
        btn.style.color = '#1a6b3c';
        input.value = '';
        input.placeholder = 'Thank you!';

        setTimeout(() => {
            btn.textContent = original;
            btn.style.color = '';
            input.placeholder = 'Your email address';
        }, 3000);
    }

    
    /* ═══════════════════════════════════════════════════════
       16. UPLOAD TO CLOUDINARY
    ═══════════════════════════════════════════════════════ */
    const CLOUD_NAME    = 'dweacouwm';    // found on your Cloudinary dashboard
    const UPLOAD_PRESET = 'ronaks_designs';     // the unsigned preset you create
    const WA_NUMBER     = '2349018766615';

    // ── Grab all the elements we need from the DOM ──
    const uploadForm     = document.getElementById('uploadForm');
    const uploadZone     = document.getElementById('uploadZone');
    const fileInput      = document.getElementById('fileInput');
    const browseBtn      = document.getElementById('uploadBrowseBtn');
    const removeBtn      = document.getElementById('uploadRemoveBtn');
    const idleUI         = document.getElementById('uploadIdle');
    const previewUI      = document.getElementById('uploadPreview');
    const previewImg     = document.getElementById('previewImg');
    const fileNameEl     = document.getElementById('uploadFileName');
    const progressWrap   = document.getElementById('uploadProgress');
    const progressBar    = document.getElementById('uploadProgressBar');
    const progressLabel  = document.getElementById('uploadProgressLabel');
    const submitBtn      = document.getElementById('uploadSubmitBtn');
    const formStatus     = document.getElementById('formStatus');


    // Only run this block if the upload form exists on the page
    // This prevents errors on pages that don't have the form
    if (!uploadForm) return;

    // ── State variables ──
    // These two track what the user has selected/uploaded
    let selectedFile     = null;  // the raw File object from the input
    let uploadedImageUrl = null;  // the final Cloudinary URL after upload

    // HELPER: Validate the selected file
    // Checks type and size before doing anything
    // ─────────────────────────────────────
    function validateFile(file) {
        const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];
        const maxSize      = 10 * 1024 * 1024; // 10MB in bytes

        if (!allowedTypes.includes(file.type)) {
            showStatus('Please upload a JPG, PNG or WEBP image only.', 'error');
            return false;
        }
        if (file.size > maxSize) {
            showStatus('Image must be under 10MB.', 'error');
            return false;
        }
        return true;
    }

    // ─────────────────────────────────────
    // HELPER: Show a local preview of the image
    // Uses FileReader to read the file as a data URL
    // so we can show it without uploading yet
    // ─────────────────────────────────────
    function showPreview(file) {
        const reader = new FileReader();

        reader.onload = (e) => {
            previewImg.src = e.target.result;
            previewImg.alt = `Preview of ${file.name}`;
            fileNameEl.textContent = file.name;

            // Swap the idle UI (upload icon + text) for the preview UI
            idleUI.classList.add('hidden');
            previewUI.classList.add('visible');
        };

        reader.readAsDataURL(file);
    }

    // ─────────────────────────────────────
    // HELPER: Clear everything back to default
    // Called when user removes the image or form resets
    // ─────────────────────────────────────
    function clearPreview() {
        selectedFile        = null;
        uploadedImageUrl    = null;
        previewImg.src      = '';
        fileNameEl.textContent = '';
        fileInput.value     = ''; // clears the file input so same file can be re-selected

        idleUI.classList.remove('hidden');
        previewUI.classList.remove('visible');
        progressWrap.classList.remove('visible');
        progressBar.style.setProperty('--progress', '0%');
        progressBar.setAttribute('aria-valuenow', 0);
    }

    // ─────────────────────────────────────
    // HELPER: Update the status message below the button
    // type can be 'info', 'error' or 'success'
    // ─────────────────────────────────────
    function showStatus(message, type = 'info') {
        formStatus.textContent = message;
        formStatus.style.color =
            type === 'error'   ? '#c0392b' :
            type === 'success' ? '#1a6b3c' :
            'var(--text-faint)';
    }

    // ─────────────────────────────────────
    // CORE: Upload the image to Cloudinary
    // Returns a Promise that resolves with the image URL
    // We use XMLHttpRequest (not fetch) so we can track upload progress
    // ─────────────────────────────────────
    function uploadToCloudinary(file) {
        return new Promise((resolve, reject) => {

            // FormData is how we send the file to Cloudinary's API
            const formData = new FormData();
            formData.append('file', file);
            formData.append('upload_preset', UPLOAD_PRESET);
            formData.append('folder', 'ronaks_designs'); // organises uploads in a folder

            const xhr = new XMLHttpRequest();

            // Show the progress bar
            progressWrap.classList.add('visible');
            progressWrap.setAttribute('aria-hidden', 'false');

            // This fires repeatedly as the upload progresses
            // e.loaded = bytes sent, e.total = total bytes
            xhr.upload.onprogress = (e) => {
                if (e.lengthComputable) {
                    const percent = Math.round((e.loaded / e.total) * 100);
                    // We use a CSS custom property --progress to drive the bar width
                    progressBar.style.setProperty('--progress', percent + '%');
                    progressBar.setAttribute('aria-valuenow', percent);
                    progressLabel.textContent = `Uploading... ${percent}%`;
                }
            };

            // This fires when the upload completes (success or fail)
            xhr.onload = () => {
                if (xhr.status === 200) {
                    const response = JSON.parse(xhr.responseText);
                    progressLabel.textContent = 'Upload complete ✓';
                    // secure_url is the permanent HTTPS link to the image
                    resolve(response.secure_url);
                } else {
                    reject(new Error('Cloudinary returned an error: ' + xhr.status));
                }
            };

            // This fires on network failure (no internet etc)
            xhr.onerror = () => reject(new Error('Network error — check your connection.'));

            // Open the request to Cloudinary's upload endpoint
            xhr.open('POST', `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`);
            xhr.send(formData);
        });
    } 

    // ─────────────────────────────────────
    // CORE: Build the WhatsApp message text
    // Takes the form data + image URL and formats it nicely
    // encodeURIComponent converts special characters so the URL works
    // ─────────────────────────────────────
    function buildWhatsAppMessage({ name, phone, fabric, description, imageUrl }) {
        const lines = [
            `Hello Ronaks! I have a custom design request`,
            ``,
            `*Name:* ${name}`,
            `*Phone:* ${phone}`,
            `*Fabric:* ${fabric || 'Not specified'}`,
            `*Description:* ${description || 'Not provided'}`,
            ``,
            imageUrl
                ? `*Design Image:* ${imageUrl}`
                : `_(No image uploaded)_`,
            ``,
            `Please let me know the next steps. Thank you!`
        ];
        // Join lines into one string, then encode it for a URL
        return encodeURIComponent(lines.join('\n'));
    }

    // ─────────────────────────────────────
    // RESET: Restore the submit button to its original state
    // Called after submit (success or error)
    // ─────────────────────────────────────
    function resetSubmitBtn() {
        submitBtn.disabled = false;
        submitBtn.innerHTML = `
            <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" width="20" height="20">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                <path d="M12 0C5.373 0 0 5.373 0 12c0 2.126.554 4.122 1.526 5.856L0 24l6.343-1.497A11.946 11.946 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.818 9.818 0 0 1-5.006-1.373l-.36-.214-3.727.979.995-3.638-.234-.374A9.818 9.818 0 0 1 2.182 12C2.182 6.58 6.58 2.182 12 2.182c5.42 0 9.818 4.398 9.818 9.818 0 5.42-4.398 9.818-9.818 9.818z"/>
            </svg>
            Send Design on WhatsApp
        `;
    }

    // ─────────────────────────────────────
    // EVENT: Drag over the upload zone
    // preventDefault() stops the browser from opening the file
    // ─────────────────────────────────────
    uploadZone.addEventListener('dragover', (e) => {
        e.preventDefault();
        uploadZone.classList.add('dragover');
    });

    uploadZone.addEventListener('dragleave', () => {
        uploadZone.classList.remove('dragover');
    });

    uploadZone.addEventListener('drop', (e) => {
        e.preventDefault();
        uploadZone.classList.remove('dragover');

        const file = e.dataTransfer.files[0]; // only take the first file
        if (file && validateFile(file)) {
            selectedFile = file;
            showPreview(file);
        }
    });

    // ─────────────────────────────────────
    // EVENT: Click browse button or click the zone itself
    // Both trigger the hidden file input
    // ─────────────────────────────────────
    browseBtn.addEventListener('click', (e) => {
        e.stopPropagation(); // stops the click from bubbling to the zone
        fileInput.click();
    });

    uploadZone.addEventListener('click', () => {
        // Only open file picker if we are not already showing a preview
        if (!previewUI.classList.contains('visible')) {
            fileInput.click();
        }
    });

    // Keyboard accessibility — Enter or Space triggers the file picker
    uploadZone.addEventListener('keydown', (e) => {
        if ((e.key === 'Enter' || e.key === ' ') && !previewUI.classList.contains('visible')) {
            e.preventDefault();
            fileInput.click();
        }
    });

    // ─────────────────────────────────────
    // EVENT: File selected via the input
    // ─────────────────────────────────────
    fileInput.addEventListener('change', () => {
        const file = fileInput.files[0];
        if (file && validateFile(file)) {
            selectedFile = file;
            showPreview(file);
        }
    });

    // ─────────────────────────────────────
    // EVENT: Remove the selected image
    // stopPropagation stops the click reaching the zone
    // which would immediately re-open the file picker
    // ─────────────────────────────────────
    removeBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        clearPreview();
        showStatus('Your details are sent directly to us via WhatsApp. We never store your data.');
    });

    // ─────────────────────────────────────
    // EVENT: Form submit — the main flow
    // 1. Validate fields
    // 2. Upload image to Cloudinary if one was selected
    // 3. Build WhatsApp message with all details + image URL
    // 4. Open WhatsApp
    // 5. Reset the form
    // ─────────────────────────────────────
    uploadForm.addEventListener('submit', async (e) => {
        e.preventDefault(); // stops the page from reloading

        // Read field values
        const name        = document.getElementById('designName').value.trim();
        const phone       = document.getElementById('designPhone').value.trim();
        const fabric      = document.getElementById('designFabric').value;
        const description = document.getElementById('designDesc').value.trim();

        // Validate required fields
        if (!name)  { showStatus('Please enter your name.', 'error');             return; }
        if (!phone) { showStatus('Please enter your WhatsApp number.', 'error');  return; }

        // Disable button so user cannot click twice
        submitBtn.disabled    = true;
        submitBtn.textContent = 'Processing...';
        showStatus('Please wait...');

        try {
            // Only upload if the user actually selected a file
            if (selectedFile) {
                showStatus('Uploading your design image...');
                uploadedImageUrl = await uploadToCloudinary(selectedFile);
                // await pauses here until uploadToCloudinary resolves with the URL
            }

            // Build the message and open WhatsApp in a new tab
            const message = buildWhatsAppMessage({ name, phone, fabric, description, imageUrl: uploadedImageUrl });
            window.open(`https://wa.me/${WA_NUMBER}?text=${message}`, '_blank');

            // Reset everything
            uploadForm.reset();
            clearPreview();
            showStatus('WhatsApp opened with your details! We will be in touch within 24 hours.', 'success');

        } catch (err) {
            // If Cloudinary upload failed, tell the user clearly
            console.error('Upload error:', err);
            showStatus('Image upload failed. You can remove the image and send without it, or try again.', 'error');

        } finally {
            // finally always runs — success or failure — so the button always resets
            resetSubmitBtn();
        }
    });

});