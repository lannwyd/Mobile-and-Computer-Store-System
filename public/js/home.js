// ── Pagination state ──────────────────────────────────────────────
const ITEMS_PER_PAGE = 15;
let currentPage = 1;
let currentList = [];

// ── Chip filter (multi-select toggle) ────────────────────────────
document.querySelectorAll('.chip').forEach(chip => {
    chip.addEventListener('click', () => {
        chip.classList.toggle('active');
        applyFilters();
    });
});

// ── Build pagination buttons dynamically ─────────────────────────
function renderPagination(totalItems) {
    const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);
    const container = document.querySelector('.pagination');
    if (!container) return;

    container.innerHTML = '';

    if (totalPages <= 1) {
        container.style.display = 'none';
        return;
    }
    container.style.display = '';

    const prev = document.createElement('button');
    prev.className = 'page-btn' + (currentPage === 1 ? ' disabled' : '');
    prev.disabled = currentPage === 1;
    prev.setAttribute('aria-label', 'Previous page');
    prev.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none"
            stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <polyline points="15 18 9 12 15 6"/>
        </svg>`;
    prev.addEventListener('click', () => {
        if (currentPage > 1) {
            currentPage--;
            renderCurrentPage();
        }
    });
    container.appendChild(prev);

    for (let i = 1; i <= totalPages; i++) {
        const btn = document.createElement('button');
        btn.className = 'page-btn' + (i === currentPage ? ' active' : '');
        btn.textContent = i;
        btn.setAttribute('aria-label', `Page ${i}`);
        btn.addEventListener('click', () => {
            currentPage = i;
            renderCurrentPage();
        });
        container.appendChild(btn);
    }

    const next = document.createElement('button');
    next.className = 'page-btn' + (currentPage === totalPages ? ' disabled' : '');
    next.disabled = currentPage === totalPages;
    next.setAttribute('aria-label', 'Next page');
    next.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none"
            stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <polyline points="9 18 15 12 9 6"/>
        </svg>`;
    next.addEventListener('click', () => {
        if (currentPage < totalPages) {
            currentPage++;
            renderCurrentPage();
        }
    });
    container.appendChild(next);
}

// ── Render the slice for currentPage ─────────────────────────────
function renderCurrentPage() {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    const pageItems = currentList.slice(start, start + ITEMS_PER_PAGE);
    renderProducts(pageItems, currentList.length);
    renderPagination(currentList.length);
    document.getElementById('products')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// ── Render product cards ──────────────────────────────────────────
function renderProducts(list, totalCount) {
    const grid = document.getElementById("product-grid");
    const resultsNumber = document.getElementById("results-number");
    const total = totalCount !== undefined ? totalCount : list.length;

    resultsNumber.textContent = `( ${total} result${total !== 1 ? 's' : ''} )`;
    grid.innerHTML = "";

    if (list.length === 0) {
        grid.innerHTML = `<p class="no-results">No products found.</p>`;
        return;
    }

    list.forEach(product => {
        const inStock = product.stock > 0;
        const tags = Object.entries(product.specs)
            .slice(0, 3)
            .map(([key, val]) => `<span class="tag">${val}</span>`)
            .join("");

        grid.innerHTML += `
        <a href="product.html?id=${product.id}" class="product-card-link">
            <div class="product-card">
                <div class="card-img">
                    <img src="${product.images[0]}" alt="${product.name}" />
                </div>
                <div class="card-body">
                    <div class="card-header">
                        <div>
                            <h3>${product.name}</h3>
                        </div>
                        ${inStock
                ? `<span class="badge badge--stock"><span class="dot"></span><span>In Stock</span></span>`
                : `<span class="badge badge--out"><span class="dotout"></span><span>Out of Stock</span></span>`
            }
                    </div>
                    <div class="card-tags">${tags}</div>
                    <div class="card-footer">
                        <span class="price">${product.price.toLocaleString()} DZD</span>
                        <button class="add-btn" type="button" aria-label="Add to cart"
                            onclick="handleAddToCart(event, ${product.id})">
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none"
                                stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                                <circle cx="9" cy="21" r="1"/>
                                <circle cx="20" cy="21" r="1"/>
                                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </a>`;
    });
}

function handleAddToCart(event, id) {
    event.preventDefault();
    event.stopPropagation();

    const product = products.find(p => p.id === id);
    if (!product) return;

    alert(`"${product.name}" added to cart!`);
}

function applyFilters() {
    const checkedBrands = [];
    document.querySelectorAll('.checkbox-list input[type="checkbox"]').forEach(cb => {
        if (cb.checked) checkedBrands.push(cb.nextElementSibling.textContent.trim());
    });

    const activeTypes = [...document.querySelectorAll('.chip.active')]
        .map(c => c.textContent.trim());

    const minPrice = parseFloat(document.getElementById("price-min").value) || 0;
    const maxPrice = parseFloat(document.getElementById("price-max").value) || Infinity;
    const sortValue = document.getElementById("sort").value;
    const searchQuery = document.querySelector('.nav__search input').value.trim().toLowerCase();

    let result = [...products];

    if (checkedBrands.length > 0) {
        result = result.filter(p => checkedBrands.includes(p.brand));
    }

    if (activeTypes.length > 0) {
        result = result.filter(p => activeTypes.includes(p.type));
    }

    if (searchQuery) {
        result = result.filter(p =>
            p.name.toLowerCase().includes(searchQuery) ||
            p.brand.toLowerCase().includes(searchQuery) ||
            p.type.toLowerCase().includes(searchQuery)
        );
    }

    result = result.filter(p => p.price >= minPrice && p.price <= maxPrice);

    if (sortValue === "Price: Low to High") result.sort((a, b) => a.price - b.price);
    if (sortValue === "Price: High to Low") result.sort((a, b) => b.price - a.price);

    currentList = result;
    currentPage = 1;
    renderCurrentPage();
}

document.querySelector('.nav__search input').addEventListener('input', () => {
    applyFilters();
    const q = document.querySelector('.nav__search input').value.trim();
    if (q.length === 1) {
        document.getElementById('products').scrollIntoView({ behavior: 'smooth' });
    }
});

document.querySelectorAll('.checkbox-list input[type="checkbox"]').forEach(cb => {
    cb.addEventListener("change", applyFilters);
});
document.getElementById("sort").addEventListener("change", applyFilters);
document.getElementById("price-min").addEventListener("input", applyFilters);
document.getElementById("price-max").addEventListener("input", applyFilters);

currentList = [...products];
renderCurrentPage();