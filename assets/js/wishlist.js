document.addEventListener("DOMContentLoaded", () => {

    // ═══════════════════════════════════════
    // PRODUCTS — same data as shop.js
    // Both pages need this to render cards
    // ═══════════════════════════════════════
    const products = [
        { id:1,  name:"Wine Echo Drape",      category:"silk-batik",        categoryLabel:"Silk Batik",         price:85000, originalPrice:95000,  image:"./assets/images/homepage/indigo.webp",            badge:"new-arrival", badgeLabel:"New Arrival" },
        { id:2,  name:"Earth Brown Adire",    category:"customized-cotton", categoryLabel:"Customized Cotton",  price:42000, originalPrice:65000,  image:"./assets/images/homepage/earth_brown.webp",       badge:"sale",        badgeLabel:"Sale"        },
        { id:3,  name:"Heritage Wrap",        category:"tissue-chiffon",    categoryLabel:"Tissue Chiffon",     price:72000, originalPrice:101000, image:"./assets/images/homepage/heritage.webp",          badge:"sale",        badgeLabel:"Sale"        },
        { id:4,  name:"Midnight Sky Adire",   category:"batik-cotton",      categoryLabel:"Batik Cotton",       price:22000, originalPrice:25000,  image:"./assets/images/homepage/midnight_sky_adire.webp",badge:"sale",        badgeLabel:"Sale"        },
        { id:5,  name:"Indigo Silk Wrap",     category:"silk-batik",        categoryLabel:"Silk Batik",         price:18000, originalPrice:22000,  image:"./assets/images/homepage/indigo.webp",            badge:"sale",        badgeLabel:"Sale"        },
        { id:6,  name:"Osogbo Tunic",         category:"customized-cotton", categoryLabel:"Customized Cotton",  price:42000, originalPrice:null,   image:"./assets/images/homepage/earth_brown.webp",       badge:"bestseller",  badgeLabel:"Bestseller"  },
        { id:7,  name:"Heritage Adire",       category:"tissue-chiffon",    categoryLabel:"Tissue Chiffon",     price:56000, originalPrice:62000,  image:"./assets/images/homepage/heritage.webp",          badge:"sale",        badgeLabel:"Sale"        },
        { id:8,  name:"Ankara Chore Jacket",  category:"batik-cotton",      categoryLabel:"Batik Cotton",       price:59000, originalPrice:null,   image:"./assets/images/homepage/midnight_sky_adire.webp",badge:"bestseller",  badgeLabel:"Bestseller"  },
        { id:9,  name:"Kijipa Oversized",     category:"batik-cotton",      categoryLabel:"Batik Cotton",       price:38000, originalPrice:null,   image:"./assets/images/homepage/midnight_sky_adire.webp",badge:null,          badgeLabel:null          },
        { id:10, name:"Eleko Wrap Skirt",     category:"silk-batik",        categoryLabel:"Silk Batik",         price:32000, originalPrice:null,   image:"./assets/images/homepage/indigo.webp",            badge:"new-arrival", badgeLabel:"New Arrival" },
        { id:11, name:"Aso-Oke Drape",        category:"customized-cotton", categoryLabel:"Customized Cotton",  price:74000, originalPrice:82000,  image:"./assets/images/homepage/earth_brown.webp",       badge:"sale",        badgeLabel:"Sale"        },
        { id:12, name:"Blue Batik Cotton",    category:"batik-cotton",      categoryLabel:"Batik Cotton",       price:45000, originalPrice:null,   image:"./assets/images/homepage/midnight_sky_adire.webp",badge:"new-arrival", badgeLabel:"New Arrival" },
    ];

    const WA_NUMBER = '2349029702549';

    // ── DOM ──
    const wishlistGrid    = document.getElementById('wishlistGrid');
    const wishlistEmpty   = document.getElementById('wishlistEmpty');
    const wishlistBar     = document.getElementById('wishlistBar');
    const wishlistCountText = document.getElementById('wishlistCountText');
    const wishlistClearBtn  = document.getElementById('wishlistClearBtn');
    const navCount          = document.getElementById('navWishlistCount');
    const mobileNavCount    = document.getElementById('mobileNavWishlistCount');

    // ─────────────────────────────────────
    // LOAD wishlist IDs from localStorage
    // ─────────────────────────────────────
    function loadWishlistIds() {
        try {
            const saved = localStorage.getItem('ronaks_wishlist');
            return saved ? JSON.parse(saved) : [];
        } catch (e) {
            return [];
        }
    }

    function saveWishlistIds(ids) {
        try {
            localStorage.setItem('ronaks_wishlist', JSON.stringify(ids));
        } catch (e) {
            console.warn('Could not save wishlist:', e);
        }
    }

    // ─────────────────────────────────────
    // UPDATE nav counter badges
    // ─────────────────────────────────────
    function updateNavCounters(count) {
        [navCount, mobileNavCount].forEach(el => {
            if (!el) return;
            el.textContent = count;
            el.classList.toggle('has-items', count > 0);
        });
    }

    // ─────────────────────────────────────
    // BUILD a wishlist product card
    // Same structure as shop.js but with
    // a Remove button instead of heart
    // ─────────────────────────────────────
    function buildWishlistCard(product) {
        const saleLine = product.originalPrice
            ? ` (was ₦${product.originalPrice.toLocaleString()})`
            : '';

        const waText = encodeURIComponent(
            `Hello Ronaks! I would like to order the *${product.name}* (${product.categoryLabel}) priced at ₦${product.price.toLocaleString()}${saleLine}. Please let me know availability and next steps. Thank you!`
        );

        const badgeHTML = product.badge ? `
            <span class="product-badge ${
                product.badge === 'sale'       ? 'product-badge--sale' :
                product.badge === 'bestseller' ? 'product-badge--best' : ''
            }">${product.badgeLabel}</span>` : '';

        const originalHTML = product.originalPrice ? `
            <span class="product-original-price">₦${product.originalPrice.toLocaleString()}</span>` : '';

        return `
            <article class="product-card" role="listitem"
                     itemscope itemtype="https://schema.org/Product"
                     data-id="${product.id}">
                <div class="product-img-wrap">
                    <img src="${product.image}"
                         alt="${product.name} — ${product.categoryLabel} by Ronaks Adire"
                         itemprop="image"
                         loading="lazy">
                    ${badgeHTML}
                    <button class="wishlist-btn active"
                            data-product-id="${product.id}"
                            aria-label="Remove ${product.name} from wishlist"
                            aria-pressed="true">
                        <svg viewBox="0 0 24 24" aria-hidden="true">
                            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                        </svg>
                    </button>
                </div>
                <div class="product-body">
                    <span class="product-category" itemprop="category">${product.categoryLabel}</span>
                    <h3 class="product-name" itemprop="name">${product.name}</h3>
                    <div class="product-pricing">
                        <span class="product-price" itemprop="price" content="${product.price}">
                            ₦${product.price.toLocaleString()}
                        </span>
                        ${originalHTML}
                    </div>
                    <a class="product-order-btn"
                       href="https://wa.me/${WA_NUMBER}?text=${waText}"
                       target="_blank"
                       rel="noopener noreferrer"
                       aria-label="Order ${product.name} on WhatsApp">
                        <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                            <path d="M12 0C5.373 0 0 5.373 0 12c0 2.126.554 4.122 1.526 5.856L0 24l6.343-1.497A11.946 11.946 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.818 9.818 0 0 1-5.006-1.373l-.36-.214-3.727.979.995-3.638-.234-.374A9.818 9.818 0 0 1 2.182 12C2.182 6.58 6.58 2.182 12 2.182c5.42 0 9.818 4.398 9.818 9.818 0 5.42-4.398 9.818-9.818 9.818z"/>
                        </svg>
                        Order on Now
                    </a>
                </div>
            </article>
        `;
    }

    // ─────────────────────────────────────
    // REMOVE one item from wishlist
    // ─────────────────────────────────────
    function removeFromWishlist(productId) {
        let ids = loadWishlistIds();
        ids     = ids.filter(id => id !== productId);
        saveWishlistIds(ids);
        render();
    }

    // ─────────────────────────────────────
    // CLEAR all wishlist items
    // ─────────────────────────────────────
    function clearWishlist() {
        saveWishlistIds([]);
        render();
    }

    // ─────────────────────────────────────
    // RENDER the wishlist page
    // ─────────────────────────────────────
    function render() {
        const ids      = loadWishlistIds();
        // Find the full product object for each saved ID
        const saved    = ids.map(id => products.find(p => p.id === id)).filter(Boolean);
        const count    = saved.length;

        // Update nav counters
        updateNavCounters(count);

        if (count === 0) {
            // Show empty state
            wishlistGrid.innerHTML = '';
            wishlistEmpty.style.display  = 'flex';
            wishlistBar.style.display    = 'none';
        } else {
            // Hide empty state, show grid and bar
            wishlistEmpty.style.display  = 'none';
            wishlistBar.style.display    = 'flex';

            wishlistCountText.textContent =
                `${count} saved piece${count !== 1 ? 's' : ''}`;

            // Build and inject all cards
            wishlistGrid.innerHTML = saved.map(buildWishlistCard).join('');

            // Bind remove buttons
            wishlistGrid.querySelectorAll('.wishlist-btn').forEach(btn => {
                btn.addEventListener('click', () => {
                    removeFromWishlist(Number(btn.dataset.productId));
                });
            });
        }
    }

    // ─────────────────────────────────────
    // CLEAR ALL button
    // ─────────────────────────────────────
    if (wishlistClearBtn) {
        wishlistClearBtn.addEventListener('click', () => {
            if (confirm('Remove all items from your wishlist?')) {
                clearWishlist();
            }
        });
    }

    // ─────────────────────────────────────
    // NAVBAR mobile hamburger
    // ─────────────────────────────────────
    const hamburger        = document.getElementById('hamburger');
    const mobileNavInner   = document.querySelector('.mobile-nav-inner');
    const mobileShopToggle = document.getElementById('mobileShopToggle');
    const mobileShopSub    = document.getElementById('mobileShopSub');

    if (hamburger && mobileNavInner) {
        hamburger.addEventListener('click', () => {
            const isOpen = hamburger.getAttribute('aria-expanded') === 'true';
            hamburger.setAttribute('aria-expanded', String(!isOpen));
        });
    }

    if (mobileShopToggle && mobileShopSub) {
        mobileShopToggle.addEventListener('click', () => {
            const isOpen = mobileShopToggle.getAttribute('aria-expanded') === 'true';
            mobileShopToggle.setAttribute('aria-expanded', String(!isOpen));
            mobileShopSub.classList.toggle('open', !isOpen);
        });
    }

    // Navbar scroll effect
    const deskNav = document.getElementById('deskNav');
    if (deskNav) {
        window.addEventListener('scroll', () => {
            deskNav.classList.toggle('scrolled', window.scrollY > 60);
        }, { passive: true });
    }

    // Newsletter
    window.handleNewsletterSubmit = function (e) {
        e.preventDefault();
        const input = document.getElementById('newsletterEmail');
        const btn   = e.target.querySelector('button');
        if (!input?.value) return;
        const original    = btn.textContent;
        btn.textContent   = 'Subscribed ✓';
        btn.style.color   = '#1a6b3c';
        input.value       = '';
        input.placeholder = 'Thank you!';
        setTimeout(() => {
            btn.textContent   = original;
            btn.style.color   = '';
            input.placeholder = 'Your email address';
        }, 3000);
    };

    // ─────────────────────────────────────
    // INIT
    // ─────────────────────────────────────
    render();

}); // end DOMContentLoaded