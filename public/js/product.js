const params = new URLSearchParams(window.location.search);
const productId = parseInt(params.get("id"), 10);
const product = products.find(item => item.id === productId);

if (!product) {
    const productLayout = document.querySelector(".product-layout");
    if (productLayout) {
        productLayout.innerHTML = `
            <div style="padding:40px 0;">
                <h2>Product not found</h2>
                <p>This product does not exist.</p>
                <a href="index.html">Back to shop</a>
            </div>`;
    }
} else {
    initProductPage(product);
}

function initProductPage(p) {
    window.currentProduct = p;

    document.title = `${p.name} — Nuvix Store`;

    const breadcrumbType = document.getElementById("breadcrumb-type");
    const breadcrumbName = document.getElementById("breadcrumb-name");
    const productName    = document.getElementById("product-name");
    const productPrice   = document.getElementById("product-price");
    const mainImage      = document.getElementById("main-image");
    const thumbnails     = document.getElementById("thumbnails");
    const specsGrid      = document.getElementById("specs-grid");
    const colorOptions   = document.getElementById("color-options");
    const storageOptions = document.getElementById("storage-options");
    const storageWrapper = document.getElementById("storage-wrapper");
    const stockBadge     = document.getElementById("product-badge");
    const buyBtn         = document.querySelector(".btn-buy");
    const cartBtn        = document.querySelector(".btn-cart");

    if (breadcrumbType) breadcrumbType.textContent = p.type;
    if (breadcrumbName) breadcrumbName.textContent = p.name;
    if (productName)    productName.textContent    = p.name;
    if (productPrice)   productPrice.textContent   = `${p.price.toLocaleString()} DZD`;

    if (mainImage) {
        mainImage.src = p.images[0];
        mainImage.alt = p.name;
    }

    if (thumbnails) {
        thumbnails.innerHTML = p.images.map((img, i) => `
            <button class="gallery__thumb ${i === 0 ? 'active' : ''}" onclick="switchImage(this, ${i})">
                <img src="${img}" alt="${p.name} view ${i + 1}" />
            </button>
        `).join("");
    }

    if (stockBadge) {
        stockBadge.textContent = p.stock > 0 ? "In Stock" : "Out of Stock";
        if (p.stock === 0) stockBadge.style.background = "#c0392b";
    }

    if (specsGrid) {
        specsGrid.innerHTML = Object.entries(p.specs).map(([key, value]) => `
            <div class="spec-card">
                <div class="spec-card__label">${formatLabel(key)}</div>
                <div class="spec-card__value">${value}</div>
            </div>
        `).join("");
    }

    if (colorOptions) {
        colorOptions.innerHTML = p.colors.map((color, i) => `
            <button
                class="color-btn ${i === 0 ? 'active' : ''}"
                style="background: ${color.hex};"
                title="${color.name}"
                aria-label="${color.name}"
                onclick="selectColor(this)">
            </button>
        `).join("");
    }

    if (storageWrapper) {
        if (!p.storage || p.storage.length === 0) {
            storageWrapper.remove();
        } else if (storageOptions) {
            storageOptions.innerHTML = p.storage.map((item, i) => `
                <button class="storage-btn ${i === 0 ? 'active' : ''}" onclick="selectStorage(this)">
                    ${item}
                </button>
            `).join("");
        }
    }

    if (p.stock === 0) {
        if (buyBtn)  { buyBtn.disabled  = true; buyBtn.textContent  = "Out of Stock"; }
        if (cartBtn) { cartBtn.disabled = true; cartBtn.textContent = "Unavailable"; }
    } else {
        if (buyBtn)  buyBtn.addEventListener("click",  () => alert(`Buying "${p.name}"`));
        if (cartBtn) cartBtn.addEventListener("click", () => alert(`"${p.name}" added to cart!`));
    }

    renderRelated(p);
}

// ── Related products ──────────────────────────────────────────────
function renderRelated(p) {
    const grid = document.getElementById("related-grid");
    const section = document.querySelector(".related-section");
    if (!grid) return;

    const related = products
        .filter(item => item.type === p.type && item.id !== p.id)
        .slice(0, 4);

    if (related.length === 0) {
        if (section) section.style.display = "none";
        return;
    }

    grid.innerHTML = related.map(item => {
        const inStock = item.stock > 0;
        return `
        <a href="product.html?id=${item.id}" class="related-card">
            <div class="related-card__img">
                <img src="${item.images[0]}" alt="${item.name}" loading="lazy" />
            </div>
            <div class="related-card__body">
                <div class="related-card__name">${item.name}</div>
                <div class="related-card__desc">${item.brand} · ${item.type}</div>
                <div class="related-card__footer">
                    <span class="related-card__price">${item.price.toLocaleString()} DZD</span>
                    ${inStock
                        ? `<span class="badge badge--stock"><span class="dot"></span>In Stock</span>`
                        : `<span class="badge badge--out"><span class="dotout"></span>Out of Stock</span>`
                    }
                </div>
            </div>
        </a>`;
    }).join("");
}

// ── Gallery switcher ──────────────────────────────────────────────
function switchImage(btn, index) {
    document.querySelectorAll(".gallery__thumb").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    document.getElementById("main-image").src = window.currentProduct.images[index];
}

function selectColor(btn) {
    document.querySelectorAll(".color-btn").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
}

function selectStorage(btn) {
    document.querySelectorAll(".storage-btn").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
}

function formatLabel(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}