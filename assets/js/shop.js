document.addEventListener("DOMContentLoaded", () => {

    // ═══════════════════════════════════════
    // SHOP PAGE CONFIG
    // ═══════════════════════════════════════

    const WA_NUMBER      = '234901234567'; // your WhatsApp number in international format without the + sign
    const PRODUCTS_PER_PAGE = 8; // how many to show before Load More

    // ── State ──
    // These track everything currently applied
    const state = {
        fabric   : 'all',   // which fabric tab is active
        badge    : 'all',   // which badge filter is active
        price    : 'all',   // which price range is active
        sort     : 'default',
        page     : 1,       // how many "pages" of PRODUCTS_PER_PAGE we are showing
        wishlist : [],      // array of product IDs the user has wishlisted
    };

    // ── DOM References ──
    const shopGrid       = document.getElementById('shopGrid');
    const shopEmpty      = document.getElementById('shopEmpty');
    const loadMoreWrap   = document.getElementById('loadMoreWrap');
    const loadMoreBtn    = document.getElementById('loadMoreBtn');
    const loadMoreCount  = document.getElementById('loadMoreCount');
    const countShowing   = document.getElementById('countShowing');
    const countTotal     = document.getElementById('countTotal');
    const activeFilters  = document.getElementById('activeFilters');
    const clearFiltersBtn = document.getElementById('clearFilters');
    const emptyResetBtn  = document.getElementById('emptyResetBtn');
    const badgeFilter    = document.getElementById('badgeFilter');
    const priceFilter    = document.getElementById('priceFilter');
    const sortSelect     = document.getElementById('sortSelect');
    const wishlistFloat  = document.getElementById('wishlistFloat');
    const wishlistCount  = document.getElementById('wishlistCount');

    // ─────────────────────────────────────
    // READ URL PARAMS
    // Allows shop links like shop.html?filter=silk-batik
    // to pre-apply a fabric filter on page load
    // ─────────────────────────────────────
    function readURLParams() {
        const params = new URLSearchParams(window.location.search);
        const filter = params.get('filter');
        if (filter && filter !== 'all') {
            state.fabric = filter;
            // Sync the pill UI
            document.querySelectorAll('.filter-pill[data-filter="fabric"]').forEach(btn => {
                const isActive = btn.dataset.value === filter;
                btn.classList.toggle('active', isActive);
                btn.setAttribute('aria-pressed', isActive ? 'true' : 'false');
            });
        }
    }

    // ─────────────────────────────────────
    // FILTER: Apply all active filters to products array
    // Returns a new filtered + sorted array — never mutates the original
    // ─────────────────────────────────────
    function getFilteredProducts() {
        let result = [...products]; // spread to avoid mutating the source array

        // Fabric filter
        if (state.fabric !== 'all') {
            result = result.filter(p => p.category === state.fabric);
        }

        // Badge filter
        if (state.badge !== 'all') {
            result = result.filter(p => p.badge === state.badge);
        }

        // Price filter — split the "min-max" string into numbers
        if (state.price !== 'all') {
            const [min, max] = state.price.split('-').map(Number);
            result = result.filter(p => p.price >= min && p.price <= max);
        }

        // Sort
        switch (state.sort) {
            case 'price-asc':
                result.sort((a, b) => a.price - b.price);
                break;
            case 'price-desc':
                result.sort((a, b) => b.price - a.price);
                break;
            case 'newest':
                // Newest = highest ID (last added to products.js)
                result.sort((a, b) => b.id - a.id);
                break;
            case 'sale':
                // Sale items first, then the rest
                result.sort((a, b) => {
                    if (a.badge === 'sale' && b.badge !== 'sale') return -1;
                    if (a.badge !== 'sale' && b.badge === 'sale') return  1;
                    return 0;
                });
                break;
        }

        return result;
    }

    // ─────────────────────────────────────
    // BUILD: Create one product card HTML string
    // We build a string and inject via innerHTML for performance
    // ─────────────────────────────────────
    function buildCard(product) {
        const isWishlisted = state.wishlist.includes(product.id);

        // Build the WhatsApp message for this specific product
        const originalPriceStr = product.originalPrice
            ? `₦${product.originalPrice.toLocaleString()}`
            : '';
        const saleLine = product.originalPrice
            ? ` (was ${originalPriceStr})`
            : '';

        const waText = encodeURIComponent(
            `Hello Ronaks! I would like to order the *${product.name}* (${product.categoryLabel}) priced at ₦${product.price.toLocaleString()}${saleLine}. Please let me know availability and next steps. Thank you!`
        );

        // Badge HTML — only rendered if the product has a badge
        const badgeHTML = product.badge ? `
            <span class="product-badge ${
                product.badge === 'sale'        ? 'product-badge--sale' :
                product.badge === 'bestseller'  ? 'product-badge--best' : ''
            }" aria-label="${product.badgeLabel}">
                ${product.badgeLabel}
            </span>` : '';

        // Original price HTML — only rendered if there is one
        const originalHTML = product.originalPrice ? `
            <span class="product-original-price" aria-label="Original price ₦${product.originalPrice.toLocaleString()}">
                ₦${product.originalPrice.toLocaleString()}
            </span>` : '';

        return `
            <article class="product-card" role="listitem"
                     itemscope itemtype="https://schema.org/Product"
                     data-id="${product.id}">
                <div class="product-img-wrap" data-lightbox="${product.image}" data-caption="${product.name}">
                    <img src="${product.image}"
                         alt="${product.name} — ${product.categoryLabel} by Ronaks Adire"
                         itemprop="image"
                         loading="lazy">
                    ${badgeHTML}
                    <button class="wishlist-btn ${isWishlisted ? 'active' : ''}"
                            data-product-id="${product.id}"
                            aria-label="${isWishlisted ? 'Remove' : 'Add'} ${product.name} ${isWishlisted ? 'from' : 'to'} wishlist"
                            aria-pressed="${isWishlisted ? 'true' : 'false'}">
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
                       aria-label="Order ${product.name} on WhatsApp"
                       itemprop="url">
                        <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                            <path d="M12 0C5.373 0 0 5.373 0 12c0 2.126.554 4.122 1.526 5.856L0 24l6.343-1.497A11.946 11.946 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.818 9.818 0 0 1-5.006-1.373l-.36-.214-3.727.979.995-3.638-.234-.374A9.818 9.818 0 0 1 2.182 12C2.182 6.58 6.58 2.182 12 2.182c5.42 0 9.818 4.398 9.818 9.818 0 5.42-4.398 9.818-9.818 9.818z"/>
                        </svg>
                        Order Now
                    </a>
                </div>
            </article>
        `;
    }

    // ─────────────────────────────────────
    // RENDER: Main render function
    // Called every time filters/sort/page changes
    // ─────────────────────────────────────
    function render() {
        const filtered  = getFilteredProducts();
        const total     = filtered.length;
        const showing   = Math.min(state.page * PRODUCTS_PER_PAGE, total);
        const visible   = filtered.slice(0, showing); // only show up to current page

        // Update result count
        countShowing.textContent = showing;
        countTotal.textContent   = total;

        // Show empty state or grid
        if (total === 0) {
            shopGrid.innerHTML = '';
            shopEmpty.hidden   = false;
            loadMoreWrap.hidden = true;
        } else {
            shopEmpty.hidden = true;

            // Build all card HTML and inject at once
            // This is faster than appending cards one by one
            shopGrid.innerHTML = visible.map(buildCard).join('');

            // Show/hide Load More based on whether there are more to show
            const hasMore = showing < total;
            loadMoreWrap.hidden    = !hasMore;
            loadMoreBtn.disabled   = !hasMore;
            loadMoreCount.textContent = hasMore
                ? `Showing ${showing} of ${total} — ${total - showing} more to load`
                : '';
        }

        // Update active filter tags
        renderActiveTags();

        // Show/hide the Clear All button
        const hasActiveFilters =
            state.fabric !== 'all' ||
            state.badge  !== 'all' ||
            state.price  !== 'all' ||
            state.sort   !== 'default';

        clearFiltersBtn.hidden = !hasActiveFilters;

        // Rebind wishlist buttons since we just rebuilt the DOM
        bindWishlistButtons();

        // Rebind lightbox triggers
        bindLightboxTriggers();
    }

    // ─────────────────────────────────────
    // RENDER: Active filter tag pills
    // Shows a dismissible tag for each active filter
    // ─────────────────────────────────────
    function renderActiveTags() {
        const tags = [];

        if (state.fabric !== 'all') {
            const label = document.querySelector(`.filter-pill[data-value="${state.fabric}"]`)?.textContent || state.fabric;
            tags.push({ key: 'fabric', label: `Fabric: ${label}` });
        }
        if (state.badge !== 'all') {
            tags.push({ key: 'badge', label: `Type: ${badgeFilter.options[badgeFilter.selectedIndex].text}` });
        }
        if (state.price !== 'all') {
            tags.push({ key: 'price', label: `Price: ${priceFilter.options[priceFilter.selectedIndex].text}` });
        }
        if (state.sort !== 'default') {
            tags.push({ key: 'sort', label: `Sort: ${sortSelect.options[sortSelect.selectedIndex].text}` });
        }

        activeFilters.innerHTML = tags.map(tag => `
            <button class="active-tag" data-clear="${tag.key}" aria-label="Remove ${tag.label} filter">
                ${tag.label}
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" aria-hidden="true">
                    <line x1="18" y1="6" x2="6" y2="18"/>
                    <line x1="6" y1="6" x2="18" y2="18"/>
                </svg>
            </button>
        `).join('');

        // Bind dismiss events on the tags
        activeFilters.querySelectorAll('.active-tag').forEach(tag => {
            tag.addEventListener('click', () => {
                clearFilter(tag.dataset.clear);
            });
        });
    }

    // ─────────────────────────────────────
    // HELPER: Clear one specific filter
    // ─────────────────────────────────────
    function clearFilter(key) {
        state[key] = key === 'sort' ? 'default' : 'all';
        state.page = 1;

        // Reset the corresponding UI element
        if (key === 'fabric') {
            document.querySelectorAll('.filter-pill[data-filter="fabric"]').forEach(btn => {
                const isAll = btn.dataset.value === 'all';
                btn.classList.toggle('active', isAll);
                btn.setAttribute('aria-pressed', isAll ? 'true' : 'false');
            });
        }
        if (key === 'badge')  badgeFilter.value  = 'all';
        if (key === 'price')  priceFilter.value  = 'all';
        if (key === 'sort')   sortSelect.value   = 'default';

        render();
    }

    // ─────────────────────────────────────
    // HELPER: Reset all filters at once
    // ─────────────────────────────────────
    function resetAllFilters() {
        state.fabric = 'all';
        state.badge  = 'all';
        state.price  = 'all';
        state.sort   = 'default';
        state.page   = 1;

        // Reset all pill UIs
        document.querySelectorAll('.filter-pill[data-filter="fabric"]').forEach(btn => {
            const isAll = btn.dataset.value === 'all';
            btn.classList.toggle('active', isAll);
            btn.setAttribute('aria-pressed', isAll ? 'true' : 'false');
        });

        badgeFilter.value = 'all';
        priceFilter.value = 'all';
        sortSelect.value  = 'default';

        render();
    }

    // ─────────────────────────────────────
    // WISHLIST: Toggle a product in/out of wishlist
    // ─────────────────────────────────────
    // ─────────────────────────────────────


        // Load wishlist from localStorage on start
        // If nothing saved yet, default to empty array
        function loadWishlist() {
            try {
                const saved = localStorage.getItem('ronaks_wishlist');
                return saved ? JSON.parse(saved) : [];
            } catch (e) {
                // If localStorage is blocked or corrupted, fail silently
                return [];
            }
        }

        // Save wishlist back to localStorage every time it changes
        function saveWishlist() {
            try {
                localStorage.setItem('ronaks_wishlist', JSON.stringify(state.wishlist));
            } catch (e) {
                console.warn('Could not save wishlist:', e);
            }
        }

        // Toggle a product in or out of the wishlist
        function toggleWishlist(productId) {
            const idx     = state.wishlist.indexOf(productId);
            const product = products.find(p => p.id === productId);
            let   added   = false;

            if (idx === -1) {
                // Not in wishlist — add it
                state.wishlist.push(productId);
                added = true;
            } else {
                // Already in wishlist — remove it
                state.wishlist.splice(idx, 1);
                added = false;
            }

            // Persist to localStorage immediately
            saveWishlist();

            // Update the floating counter
            updateWishlistCounter();

            // Update just this button's visual state
            // without triggering a full re-render
            const btn = shopGrid.querySelector(
                `.wishlist-btn[data-product-id="${productId}"]`
            );
            if (btn) {
                const wishlisted = state.wishlist.includes(productId);
                btn.classList.toggle('active', wishlisted);
                btn.setAttribute('aria-pressed', wishlisted ? 'true' : 'false');
                btn.setAttribute('aria-label',
                    `${wishlisted ? 'Remove' : 'Add'} ${product?.name || ''} ${wishlisted ? 'from' : 'to'} wishlist`
                );
            }

            // Show toast notification
            if (product) showWishlistToast(product, added);
        }

        function updateWishlistCounter() {
            const count = state.wishlist.length;
            if (wishlistCount) wishlistCount.textContent = count;
            if (wishlistFloat) {
                wishlistFloat.classList.toggle('visible', count > 0);
                wishlistFloat.setAttribute('aria-label',
                    `Wishlist — ${count} item${count !== 1 ? 's' : ''}`
                );
            }
        }

        // ─────────────────────────────────────
        // TOAST NOTIFICATION
        // Slides in from bottom right
        // Auto-dismisses after 3.5 seconds
        // ─────────────────────────────────────
        let toastTimer = null; // track active timer so we can cancel it

        function showWishlistToast(product, added) {
            // Remove any existing toast first
            const existing = document.getElementById('wishlistToast');
            if (existing) existing.remove();
            if (toastTimer) clearTimeout(toastTimer);

            // Build the toast HTML
            const toast = document.createElement('div');
            toast.id        = 'wishlistToast';
            toast.className = 'wishlist-toast';
            toast.setAttribute('role', 'status');
            toast.setAttribute('aria-live', 'polite');
            toast.setAttribute('aria-atomic', 'true');

            toast.innerHTML = `
                <div class="toast-img-wrap">
                    <img src="${product.image}" alt="${product.name}">
                </div>
                <div class="toast-content">
                    <p class="toast-action">
                        ${added
                            ? `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg> Added to Wishlist`
                            : `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg> Removed from Wishlist`
                        }
                    </p>
                    <p class="toast-name">${product.name}</p>
                    ${added
                        ? `<a href="./wishlist.html" class="toast-link">View Wishlist →</a>`
                        : ''
                    }
                </div>
                <button class="toast-close" aria-label="Dismiss notification">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                        <line x1="18" y1="6" x2="6" y2="18"/>
                        <line x1="6" y1="6" x2="18" y2="18"/>
                    </svg>
                </button>
            `;

            document.body.appendChild(toast);

            // Trigger slide-in animation on next frame
            // requestAnimationFrame ensures the element is painted before
            // we add the class, so the CSS transition actually runs
            requestAnimationFrame(() => {
                requestAnimationFrame(() => {
                    toast.classList.add('toast--visible');
                });
            });

            // Close button
            toast.querySelector('.toast-close').addEventListener('click', () => {
                dismissToast(toast);
            });

            // Auto dismiss after 3.5 seconds
            toastTimer = setTimeout(() => dismissToast(toast), 3500);
        }

        function dismissToast(toast) {
            toast.classList.remove('toast--visible');
            // Remove from DOM after the CSS transition finishes (0.3s)
            setTimeout(() => toast.remove(), 300);
        }

    // ─────────────────────────────────────
    // BIND: Wishlist button events
    // Must be called after every render since the DOM is rebuilt
    // ─────────────────────────────────────
    function bindWishlistButtons() {
        shopGrid.querySelectorAll('.wishlist-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation(); // prevent lightbox from triggering
                toggleWishlist(Number(btn.dataset.productId));
            });
        });
    }

    // ─────────────────────────────────────
    // LIGHTBOX: Bind image click to open lightbox
    // ─────────────────────────────────────
    const lightboxOverlay = document.getElementById('lightboxOverlay');
    const lightboxImg     = document.getElementById('lightboxImg');
    const lightboxCaption = document.getElementById('lightboxCaption');
    const lightboxClose   = document.getElementById('lightboxClose');

    function openLightbox(src, caption) {
        lightboxImg.src            = src;
        lightboxImg.alt            = caption;
        lightboxCaption.textContent = caption;
        lightboxOverlay.classList.add('active');
        lightboxOverlay.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden'; // prevent background scroll
    }

    function closeLightbox() {
        lightboxOverlay.classList.remove('active');
        lightboxOverlay.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
        // Clear src after transition so old image doesn't flash
        setTimeout(() => { lightboxImg.src = ''; }, 300);
    }

    function bindLightboxTriggers() {
        shopGrid.querySelectorAll('.product-img-wrap').forEach(wrap => {
            wrap.addEventListener('click', () => {
                openLightbox(wrap.dataset.lightbox, wrap.dataset.caption);
            });
        });
    }

    if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);

    // Close lightbox on overlay click (outside the content)
    if (lightboxOverlay) {
        lightboxOverlay.addEventListener('click', (e) => {
            if (e.target === lightboxOverlay) closeLightbox();
        });
    }

    // Close lightbox on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && lightboxOverlay?.classList.contains('active')) {
            closeLightbox();
        }
    });

    // ─────────────────────────────────────
    // EVENTS: Fabric filter pills
    // ─────────────────────────────────────
    document.querySelectorAll('.filter-pill[data-filter="fabric"]').forEach(btn => {
        btn.addEventListener('click', () => {
            state.fabric = btn.dataset.value;
            state.page   = 1; // reset to page 1 on filter change

            // Update pill active states
            document.querySelectorAll('.filter-pill[data-filter="fabric"]').forEach(b => {
                const isActive = b === btn;
                b.classList.toggle('active', isActive);
                b.setAttribute('aria-pressed', isActive ? 'true' : 'false');
            });

            render();
        });
    });

    // ─────────────────────────────────────
    // EVENTS: Badge, price and sort selects
    // ─────────────────────────────────────
    if (badgeFilter) {
        badgeFilter.addEventListener('change', () => {
            state.badge = badgeFilter.value;
            state.page  = 1;
            render();
        });
    }

    if (priceFilter) {
        priceFilter.addEventListener('change', () => {
            state.price = priceFilter.value;
            state.page  = 1;
            render();
        });
    }

    if (sortSelect) {
        sortSelect.addEventListener('change', () => {
            state.sort = sortSelect.value;
            state.page = 1;
            render();
        });
    }

    // ─────────────────────────────────────
    // EVENTS: Clear filters
    // ─────────────────────────────────────
    if (clearFiltersBtn) {
        clearFiltersBtn.addEventListener('click', resetAllFilters);
    }

    if (emptyResetBtn) {
        emptyResetBtn.addEventListener('click', resetAllFilters);
    }

    // ─────────────────────────────────────
    // EVENTS: Load More
    // Increments the page counter and re-renders
    // No new fetch needed — all products are already in memory
    // ─────────────────────────────────────
    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', () => {
            state.page++;
            render();
            // Scroll to the first newly visible card smoothly
            const cards = shopGrid.querySelectorAll('.product-card');
            const firstNew = cards[(state.page - 1) * PRODUCTS_PER_PAGE];
            if (firstNew) {
                firstNew.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            }
        });
    }


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
       . DESKTOP DROPDOWN
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
       . MOBILE HAMBURGER
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
       . MOBILE SHOP SUB-MENU
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



    // ─────────────────────────────────────
    // NEWSLETTER
    // ─────────────────────────────────────
    window.handleNewsletterSubmit = function (e) {
        e.preventDefault();
        const input = document.getElementById('newsletterEmail');
        const btn   = e.target.querySelector('button');
        if (!input?.value) return;

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
    };

    // ═══════════════════════════════════════
// SHOP ASSISTANT PANEL
// Shows once per day — stored in localStorage
// ═══════════════════════════════════════

(function () {

    const STORAGE_KEY  = 'ronaks_assistant_shown';
    const WA_NUMBER    = '234901234567';

    const panel        = document.getElementById('assistantPanel');
    const closeBtn     = document.getElementById('assistantClose');
    const messagesEl   = document.getElementById('assistantMessages');
    const typingEl     = document.getElementById('assistantTyping');
    const nameWrap     = document.getElementById('assistantNameWrap');
    const nameInput    = document.getElementById('assistantNameInput');
    const sendBtn      = document.getElementById('assistantSendBtn');
    const choicesEl    = document.getElementById('assistantChoices');

    if (!panel) return;

    let userName = '';

    // ── Check if shown today ──
    function hasShownToday() {
        try {
            const stored = localStorage.getItem(STORAGE_KEY);
            if (!stored) return false;
            const today = new Date().toDateString();
            return stored === today;
        } catch (e) {
            return false;
        }
    }

    function markShownToday() {
        try {
            localStorage.setItem(STORAGE_KEY, new Date().toDateString());
        } catch (e) {}
    }

    // ── Open / close ──
    function openPanel() {
        panel.classList.add('is-open');
        panel.setAttribute('aria-hidden', 'false');
        markShownToday();
        startFlow();
    }

    function closePanel() {
        panel.classList.remove('is-open');
        panel.setAttribute('aria-hidden', 'true');
    }

    closeBtn.addEventListener('click', closePanel);

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && panel.classList.contains('is-open')) {
            closePanel();
        }
    });

    // ── Add a bot message with typing delay ──
    // Returns a Promise so we can await it
    function addBotMsg(html, typingDelay = 1200) {
        return new Promise(resolve => {

            // Show typing indicator for typingDelay ms
            typingEl.style.display = 'flex';
            messagesEl.scrollTop   = messagesEl.scrollHeight;

            setTimeout(() => {
                typingEl.style.display = 'none';

                const div = document.createElement('div');
                div.className = 'assistant-msg';

                const now  = new Date();
                const time = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

                div.innerHTML = `
                    <div class="assistant-bubble">${html}</div>
                    <span class="assistant-msg-time">${time}</span>
                `;

                // Insert before the typing indicator
                messagesEl.insertBefore(div, typingEl);
                messagesEl.scrollTop = messagesEl.scrollHeight;

                resolve();
            }, typingDelay);
        });
    }

    // ── Add a user message (right-aligned, indigo) ──
    function addUserMsg(text) {
        typingEl.style.display = 'none';

        const div = document.createElement('div');
        div.className = 'assistant-msg assistant-msg--user';
        div.innerHTML = `<div class="assistant-bubble">${text}</div>`;

        messagesEl.insertBefore(div, typingEl);
        messagesEl.scrollTop = messagesEl.scrollHeight;
    }

    // ── Render choice buttons ──
    function showChoices(choices) {
        typingEl.style.display  = 'none';
        nameWrap.classList.add('hidden');
        choicesEl.classList.remove('hidden');
        choicesEl.innerHTML = '';

        choices.forEach(choice => {
            const btn = document.createElement('button');
            btn.className = `choice-btn choice-btn--${choice.type}`;
            btn.setAttribute('aria-label', choice.label);
            btn.innerHTML = choice.icon
                ? `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${choice.icon}</svg>${choice.label}`
                : choice.label;

            btn.addEventListener('click', () => choice.action());
            choicesEl.appendChild(btn);
        });
    }

    // ── Hide choice buttons ──
    function hideChoices() {
        choicesEl.classList.add('hidden');
        choicesEl.innerHTML = '';
    }

    // ── THE CONVERSATION FLOW ──
    async function startFlow() {

        // Step 1 — greeting
        await addBotMsg(
            `Hi there! Welcome to <strong>Ronaks Adire</strong> 👋`,
            900
        );

        // Step 2 — intro
        await addBotMsg(
            `We craft handmade Adire fabrics for every occasion and we can always create something just for you.`,
            1400
        );

        // Step 3 — ask name
        await addBotMsg(
            `Before I help — what's your name?`,
            1200
        );

        // Show name input
        typingEl.style.display = 'none';
        nameInput.focus();
    }

    // ── Handle name submission ──
    async function handleNameSubmit() {
        const val = nameInput.value.trim();
        if (!val) { nameInput.focus(); return; }

        userName = val;

        // ── Save name permanently to localStorage ──
        // This is what greeting.js reads on return visits
        try {
            localStorage.setItem('ronaks_user_name', userName);
        } catch (e) {}

        nameWrap.classList.add('hidden');
        addUserMsg(userName);

        nameWrap.classList.add('hidden');

        addUserMsg(userName);

        // Respond with name
        await addBotMsg(
            `Nice to meet you, <strong>${userName}</strong>!`,
            1000
        );

        // Ask the key question
        await addBotMsg(
            `I hope you are able to find the design you're looking for today?`,
            1300
        );

        typingEl.style.display = 'none';

        // Show yes / no choices
        showChoices([
            {
                type  : 'yes',
                label : 'Yes, I found something I love!',
                icon  : '<polyline points="20 6 9 17 4 12"/>',
                action: async () => {
                    hideChoices();
                    addUserMsg('Yes, I found something I love!');

                    await addBotMsg(
                        `That is wonderful, ${userName}! 🎊`,
                        900
                    );
                    await addBotMsg(
                        `Just tap <strong>Order on WhatsApp</strong> on any product and our team will handle everything from there. Enjoy!`,
                        1300
                    );

                    typingEl.style.display = 'none';

                    // Auto close after 4 seconds
                    setTimeout(closePanel, 4000);
                }
            },
            {
                type  : 'no',
                label : "No, I can't quite find what I want",
                icon  : '<circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>',
                action: async () => {
                    hideChoices();
                    addUserMsg("No, I can't quite find what I want");

                    await addBotMsg(
                        `No worries at all, ${userName}! We do fully custom Adire — for weddings, events, everyday wear, anything you have in mind.`,
                        1100
                    );

                    await addBotMsg(
                        `How would you like to show us what you're thinking?`,
                        1300
                    );

                    typingEl.style.display = 'none';

                    // Show the two paths
                    showChoices([
                        {
                            type  : 'upload',
                            label : 'Upload my design or reference image',
                            icon  : '<polyline points="16 16 12 12 8 16"/><line x1="12" y1="12" x2="12" y2="21"/><path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3"/>',
                            action: () => {
                                closePanel();
                                // Scroll to the upload section on the page
                                const uploadSection = document.querySelector('.upload-section');
                                if (uploadSection) {
                                    uploadSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                                } else {
                                    // Fallback — go to homepage upload section
                                    window.location.href = './index.html#upload-section';
                                }
                            }
                        },
                        {
                            type  : 'chat',
                            label : 'Describe it to us on WhatsApp',
                            icon  : '<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>',
                            action: () => {
                                const msg = encodeURIComponent(
                                    `Hello Ronaks! My name is ${userName} and I have a custom Adire design in mind that I couldn't find on your shop. I'd love to discuss it with you!`
                                );
                                window.open(`https://wa.me/${WA_NUMBER}?text=${msg}`, '_blank');
                                closePanel();
                            }
                        }
                    ]);
                }
            }
        ]);
    }

    // ── Name input events ──
    sendBtn.addEventListener('click', handleNameSubmit);
    nameInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') handleNameSubmit();
    });

    // ── Trigger after 5 seconds if not shown today ──
    if (!hasShownToday()) {
        setTimeout(openPanel, 5000);
    }

})(); // end assistant IIFE

    // ─────────────────────────────────────
    // INIT: Read URL params then render
    // ─────────────────────────────────────
        // Load persisted wishlist from localStorage before first render
    state.wishlist = loadWishlist();
    updateWishlistCounter();

    readURLParams();
    render();

}); // end DOMContentLoaded