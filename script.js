document.addEventListener('DOMContentLoaded', () => {
    // Header Scroll Effect
    const header = document.getElementById('header');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        updateActiveNavLink();
    });

    // Mobile Menu Toggle
    const menuToggle = document.getElementById('menu-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    menuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        const icon = menuToggle.querySelector('i');
        if (navMenu.classList.contains('active')) {
            icon.classList.remove('ph-list');
            icon.classList.add('ph-x');
        } else {
            icon.classList.remove('ph-x');
            icon.classList.add('ph-list');
        }
    });

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            const icon = menuToggle.querySelector('i');
            icon.classList.remove('ph-x');
            icon.classList.add('ph-list');
        });
    });

    function updateActiveNavLink() {
        let fromTop = window.scrollY + 100;
        navLinks.forEach(link => {
            // Skip external links (no hash anchor)
            if (!link.hash) return;
            let section = document.querySelector(link.hash);
            if (section && section.offsetTop <= fromTop && section.offsetTop + section.offsetHeight > fromTop) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    }
    updateActiveNavLink();

    // Mark body as JS-ready so reveal animations activate
    document.body.classList.add('js-ready');

    // Scroll Reveal Animation with Intersection Observer
    const revealElements = document.querySelectorAll('.reveal');
    const revealOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            entry.target.classList.add('active');
            observer.unobserve(entry.target);
            
            // Start counter animation if it's the metrics section
            if(entry.target.classList.contains('metrics')) {
                startCounters();
            }
        });
    }, revealOptions);

    revealElements.forEach(el => revealObserver.observe(el));

    // Counter Animation
    function startCounters() {
        const counters = document.querySelectorAll('.counter');
        const speed = 200; // The lower the slower

        counters.forEach(counter => {
            const target = +counter.getAttribute('data-target');
            const isFloat = counter.hasAttribute('data-decimals');
            const inc = target / speed;
            let currentCount = 0;

            const updateCount = () => {
                if (currentCount < target) {
                    currentCount += inc;
                    if(isFloat) {
                        counter.innerText = Math.min(currentCount, target).toFixed(1).replace('.', ',');
                    } else {
                        counter.innerText = Math.ceil(currentCount);
                    }
                    setTimeout(updateCount, 15);
                } else {
                    if(isFloat) {
                        counter.innerText = target.toFixed(1).replace('.', ',');
                    } else {
                        counter.innerText = target;
                    }
                }
            };
            updateCount();
        });
    }
    
    // Trigger reveals on load for elements already in viewport
    setTimeout(() => {
        revealElements.forEach(el => {
            const rect = el.getBoundingClientRect();
            if (rect.top < window.innerHeight) {
                el.classList.add('active');
            }
        });
    }, 100);

    // ==========================================
    // PRODUCTS LOGIC (HOME CAROUSEL)
    // ==========================================
    const homeCarousel = document.getElementById('home-products-carousel');
    if (homeCarousel && typeof produtosData !== 'undefined') {
        // Filter only featured products
        const featuredProducts = produtosData.filter(p => p.destaque);
        
        // Render cards
        homeCarousel.innerHTML = featuredProducts.map(p => createProductCard(p)).join('');

        // Carousel Navigation
        const prevBtn = document.querySelector('.carousel-container .prev-btn');
        const nextBtn = document.querySelector('.carousel-container .next-btn');
        
        if (prevBtn && nextBtn) {
            // Scroll amount (card width + gap)
            const scrollAmount = 324; 
            
            nextBtn.addEventListener('click', () => {
                homeCarousel.scrollBy({ left: scrollAmount, behavior: 'smooth' });
            });
            
            prevBtn.addEventListener('click', () => {
                homeCarousel.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
            });
        }
    }

    // ==========================================
    // PRODUCTS LOGIC (APARELHOS PAGE)
    // ==========================================
    const productsGrid = document.getElementById('products-grid');
    if (productsGrid && typeof produtosData !== 'undefined') {
        let currentBrand = 'all';
        let currentCondition = 'all';
        let currentSearch = '';

        const searchInput = document.getElementById('search-input');
        const filterBtns = document.querySelectorAll('.filter-btn');

        function renderGrid(products) {
            if (products.length === 0) {
                productsGrid.innerHTML = '<div class="no-results">Nenhum aparelho encontrado com esses filtros.</div>';
                return;
            }
            productsGrid.innerHTML = products.map(p => createProductCard(p)).join('');
        }

        function filterProducts() {
            let filtered = produtosData;

            if (currentBrand !== 'all') {
                filtered = filtered.filter(p => p.marca === currentBrand);
            }

            if (currentCondition !== 'all') {
                filtered = filtered.filter(p => p.condicao === currentCondition);
            }

            if (currentSearch.trim() !== '') {
                const searchLower = currentSearch.toLowerCase();
                filtered = filtered.filter(p => p.nome.toLowerCase().includes(searchLower) || p.marca.toLowerCase().includes(searchLower));
            }

            renderGrid(filtered);
        }

        // Initial Render
        renderGrid(produtosData);

        // Event Listeners for Filters
        filterBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const filterType = e.target.getAttribute('data-filter');
                const filterValue = e.target.getAttribute('data-value');

                // Update active class on buttons of the same group
                document.querySelectorAll(`.filter-btn[data-filter="${filterType}"]`).forEach(b => b.classList.remove('active'));
                e.target.classList.add('active');

                if (filterType === 'brand') currentBrand = filterValue;
                if (filterType === 'condition') currentCondition = filterValue;

                filterProducts();
            });
        });

        // Event Listener for Search
        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                currentSearch = e.target.value;
                filterProducts();
            });
        }
    }
});
