document.addEventListener("DOMContentLoaded", () => {

    // ═══════════════════════════════════════
    // SHOP PAGE CONFIG
    // ═══════════════════════════════════════

    const WA_NUMBER      = '2349029702549';
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
                        Order on WhatsApp
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
    function toggleWishlist(productId) {
        const idx = state.wishlist.indexOf(productId);

        if (idx === -1) {
            // Not in wishlist — add it
            state.wishlist.push(productId);
        } else {
            // Already in wishlist — remove it
            state.wishlist.splice(idx, 1);
        }

        // Update the floating wishlist counter
        const count = state.wishlist.length;
        wishlistCount.textContent = count;
        wishlistFloat.classList.toggle('visible', count > 0);
        wishlistFloat.setAttribute('aria-label', `Wishlist — ${count} item${count !== 1 ? 's' : ''}`);

        // Update just this button without full re-render
        const btn = shopGrid.querySelector(`.wishlist-btn[data-product-id="${productId}"]`);
        if (btn) {
            const isNowWishlisted = state.wishlist.includes(productId);
            btn.classList.toggle('active', isNowWishlisted);
            btn.setAttribute('aria-pressed', isNowWishlisted ? 'true' : 'false');

            const product = products.find(p => p.id === productId);
            if (product) {
                btn.setAttribute('aria-label',
                    `${isNowWishlisted ? 'Remove' : 'Add'} ${product.name} ${isNowWishlisted ? 'from' : 'to'} wishlist`
                );
            }
        }
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

    // ─────────────────────────────────────
    // NAVBAR: Mobile hamburger
    // Copy of your existing main.js logic
    // ─────────────────────────────────────
    const hamburger       = document.getElementById('hamburger');
    const mobileNavInner  = document.querySelector('.mobile-nav-inner');
    const mobileShopToggle = document.getElementById('mobileShopToggle');
    const mobileShopSub   = document.getElementById('mobileShopSub');

    if (hamburger && mobileNavInner) {
        hamburger.addEventListener('click', () => {
            const isOpen = hamburger.getAttribute('aria-expanded') === 'true';
            hamburger.setAttribute('aria-expanded', !isOpen);
        });
    }

    if (mobileShopToggle && mobileShopSub) {
        mobileShopToggle.addEventListener('click', () => {
            const isOpen = mobileShopToggle.getAttribute('aria-expanded') === 'true';
            mobileShopToggle.setAttribute('aria-expanded', !isOpen);
            mobileShopSub.classList.toggle('open', !isOpen);
        });
    }

    // ─────────────────────────────────────
    // NAVBAR: Desktop scroll effect
    // ─────────────────────────────────────
    const deskNav = document.getElementById('deskNav');
    if (deskNav) {
        window.addEventListener('scroll', () => {
            deskNav.classList.toggle('scrolled', window.scrollY > 60);
        }, { passive: true });
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

    // ─────────────────────────────────────
    // INIT: Safety check before rendering
    // If products array doesn't exist, something
    // is wrong with the file path or load order
    // ─────────────────────────────────────
    if (typeof products === 'undefined' || !Array.isArray(products)) {
        console.error('products.js not loaded — check the script src path in shop.html');
        return;
    }

    readURLParams();
    render();


}); // end DOMContentLoaded