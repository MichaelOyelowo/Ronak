document.addEventListener("DOMContentLoaded", () => {
    
    // 1. THE PRODUCT DATABASE 
    const products =[
        {
            id: 1, name: "Indigo Echo Drape", category: "Silk Batik",
            price: 85000, originalPrice: 95000, image: "./assets/images/products/indigo-echo.jpg",
            badge: "New Arrival", badgeType: ""
        },
        {
            id: 2, name: "Osogbo Tunic", category: "Customized Cotton",
            price: 42000, originalPrice: null, image: "./assets/images/products/osogbo-tunic.jpg",
            badge: "Bestseller", badgeType: "product-badge--best"
        },
        {
            id: 3, name: "Heritage Wrap", category: "Tissue Chiffon",
            price: 56000, originalPrice: 62000, image: "./assets/images/products/heritage-wrap.jpg",
            badge: "Sale", badgeType: "product-badge--sale"
        },
        {
            id: 4, name: "Kijipa Oversized", category: "Batik Cotton",
            price: 38000, originalPrice: null, image: "./assets/images/products/kijipa-oversized.jpg",
            badge: "", badgeType: ""
        }
        // Add more products here!
    ];

    // 2. DOM ELEMENTS
    const grid = document.getElementById('shop-grid');
    const emptyState = document.getElementById('shop-empty');
    const filterBtns = document.querySelectorAll('.shop-filter-btn');
    const sortSelect = document.getElementById('sortProducts');

    if (!grid) return; // Only run on shop page

    // ── HIGHLIGHT "SHOP" IN NAVBAR ──
    document.querySelectorAll('.nav-links a').forEach(link => {
        if (link.textContent.trim().toLowerCase() === 'shop') {
            link.setAttribute('aria-current', 'page');
        } else {
            link.removeAttribute('aria-current');
        }
    });

    // 3. RENDER FUNCTION
    function renderProducts(itemsToRender) {
        grid.innerHTML = ''; 
        
        if (itemsToRender.length === 0) {
            grid.style.display = 'none';
            emptyState.style.display = 'block';
            return;
        }

        grid.style.display = 'grid';
        emptyState.style.display = 'none';

        const htmlString = itemsToRender.map(product => {
            const formattedPrice = product.price.toLocaleString('en-NG');
            const originalPriceHTML = product.originalPrice ? `<span class="product-original-price">₦${product.originalPrice.toLocaleString('en-NG')}</span>` : '';
            const badgeHTML = product.badge ? `<span class="product-badge ${product.badgeType}">${product.badge}</span>` : '';
            const waMessage = encodeURIComponent(`Hello Ronaks, I would like to order the *${product.name}* (${product.category}) priced at ₦${formattedPrice}.`);

            return `
                <article class="product-card reveal-up">
                    <div class="product-img-wrap">
                        <img src="${product.image}" alt="${product.name}">
                        ${badgeHTML}
                        <!-- Wishlist Button -->
                        <button class="wishlist-btn" aria-label="Add to wishlist">
                            <svg viewBox="0 0 24 24"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
                        </button>
                    </div>
                    <div class="product-body">
                        <span class="product-category">${product.category}</span>
                        <h3 class="product-name">${product.name}</h3>
                        <div class="product-pricing">
                            <span class="product-price">₦${formattedPrice}</span>
                            ${originalPriceHTML}
                        </div>
                        <a class="product-order-btn" href="https://wa.me/2349029702549?text=${waMessage}" target="_blank">
                            <svg viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.126.554 4.122 1.526 5.856L0 24l6.343-1.497A11.946 11.946 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.818 9.818 0 0 1-5.006-1.373l-.36-.214-3.727.979.995-3.638-.234-.374A9.818 9.818 0 0 1 2.182 12C2.182 6.58 6.58 2.182 12 2.182c5.42 0 9.818 4.398 9.818 9.818 0 5.42-4.398 9.818-9.818 9.818z"/></svg>
                            Order Now
                        </a>
                    </div>
                </article>
            `;
        }).join('');

        grid.insertAdjacentHTML('beforeend', htmlString);
        
        // Trigger animations
        setTimeout(() => {
            const cards = document.querySelectorAll('#shop-grid .reveal-up');
            cards.forEach((card, index) => {
                setTimeout(() => card.classList.add('is-revealed'), index * 50); 
            });
        }, 50);

        // RE-BIND WISHLIST & LIGHTBOX TO THE NEWLY CREATED CARDS!
        bindDynamicEvents();
    }

    // 4. BIND DYNAMIC EVENTS (Wishlist & Lightbox)
    function bindDynamicEvents() {
        
        // --- WISHLIST LOGIC ---
        const wishlistFloat = document.getElementById('wishlistFloat');
        const wishlistCount = document.getElementById('wishlistCount');
        let savedWishlist = JSON.parse(localStorage.getItem('ronaks-wishlist') || '[]');

        function updateWishlistUI() {
            const count = savedWishlist.length;
            if(wishlistCount) wishlistCount.textContent = count;
            if(wishlistFloat) wishlistFloat.classList.toggle('visible', count > 0);
        }

        document.querySelectorAll('.wishlist-btn').forEach(btn => {
            const card = btn.closest('.product-card');
            const productName = card.querySelector('.product-name').textContent.trim();

            // Highlight if already saved
            if (savedWishlist.includes(productName)) btn.classList.add('active');

            // Handle Click
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const isActive = btn.classList.toggle('active');

                if (isActive && !savedWishlist.includes(productName)) {
                    savedWishlist.push(productName);
                } else if (!isActive) {
                    savedWishlist = savedWishlist.filter(name => name !== productName);
                }

                localStorage.setItem('ronaks-wishlist', JSON.stringify(savedWishlist));
                updateWishlistUI();
            });
        });
        updateWishlistUI();

        // --- LIGHTBOX LOGIC ---
        const overlay   = document.getElementById('lightboxOverlay');
        const lbImg     = document.getElementById('lightboxImg');
        const lbCaption = document.getElementById('lightboxCaption');
        const lbClose   = document.getElementById('lightboxClose');

        if(overlay && lbImg && lbCaption) {
            document.querySelectorAll('.product-img-wrap').forEach(wrap => {
                wrap.addEventListener('click', (e) => {
                    if (e.target.closest('.wishlist-btn')) return; // Ignore clicks on wishlist heart

                    const img = wrap.querySelector('img');
                    const card = wrap.closest('.product-card');
                    const name = card.querySelector('.product-name').textContent;
                    const category = card.querySelector('.product-category').textContent;

                    lbImg.src = img.src;
                    lbImg.alt = img.alt;
                    lbCaption.textContent = `${category} — ${name}`;

                    overlay.classList.add('active');
                    document.body.style.overflow = 'hidden';
                });
            });

            const closeLightbox = () => {
                overlay.classList.remove('active');
                document.body.style.overflow = '';
            };

            if(lbClose) lbClose.addEventListener('click', closeLightbox);
            overlay.addEventListener('click', (e) => { if (e.target === overlay) closeLightbox(); });
            document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeLightbox(); });
        }
    }

    // 5. FILTERING LOGIC
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');
            let filteredProducts = products;
            
            if (filterValue !== 'all') {
                filteredProducts = products.filter(p => p.category === filterValue);
            }
            sortAndRender(filteredProducts);
        });
    });

    // 6. SORTING LOGIC
    function sortAndRender(items) {
        const sortValue = sortSelect.value;
        let sortedArray =[...items]; 
        
        if (sortValue === 'price-low') {
            sortedArray.sort((a, b) => a.price - b.price);
        } else if (sortValue === 'price-high') {
            sortedArray.sort((a, b) => b.price - a.price);
        } 
        
        renderProducts(sortedArray);
    }

    if(sortSelect) {
        sortSelect.addEventListener('change', () => {
            const activeFilter = document.querySelector('.shop-filter-btn.active').getAttribute('data-filter');
            let itemsToSort = products;
            if (activeFilter !== 'all') {
                itemsToSort = products.filter(p => p.category === activeFilter);
            }
            sortAndRender(itemsToSort);
        });
    }

    // 7. STICKY TOOLBAR SHADOW EFFECT
    const toolbar = document.getElementById('shopToolbar');
    if(toolbar) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 250) {
                toolbar.classList.add('is-stuck');
            } else {
                toolbar.classList.remove('is-stuck');
            }
        });
    }

    // 8. INITIAL RENDER
    renderProducts(products);

});