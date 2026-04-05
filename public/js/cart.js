// ── Load cart from localStorage ───────────────────────
let cart = [];
try {
    const saved = localStorage.getItem('cart');
    if (saved) cart = JSON.parse(saved);
} catch (e) { }

// ── Save back ─────────────────────────────────────────
function saveCart() {
    try { localStorage.setItem('cart', JSON.stringify(cart)); } catch (e) { }
}

// ── Recalculate and update summary ────────────────────
function updateSummary() {
    const subtotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
    document.getElementById('subtotal').textContent = subtotal.toLocaleString() + ' DZD';
    document.getElementById('total').textContent = subtotal.toLocaleString() + ' DZD';
}

// ── Remove item ───────────────────────────────────────
function removeItem(btn) {
    const card = btn.closest('.cart-item');
    const id = parseInt(card.dataset.id);
    cart = cart.filter(item => item.id !== id);
    saveCart();
    renderCart();
}

// ── Change quantity ───────────────────────────────────
function changeQty(btn, delta) {
    const card = btn.closest('.cart-item');
    const id = parseInt(card.dataset.id);
    const item = cart.find(i => i.id === id);
    if (!item) return;

    item.qty += delta;
    if (item.qty <= 0) {
        cart = cart.filter(i => i.id !== id);
    }

    saveCart();
    renderCart();
}

// ── Render ────────────────────────────────────────────
function renderCart() {
    const col = document.getElementById('cart-items-col');
    const emptyState = document.getElementById('empty-cart');
    const summaryCol = document.querySelector('.cart-summary-col');

    col.innerHTML = '';

    if (cart.length === 0) {
        emptyState.style.display = 'flex';
        summaryCol.style.display = 'none';
        return;
    }

    emptyState.style.display = 'none';
    summaryCol.style.display = '';

    cart.forEach(item => {
        const tags = Object.entries(item.specs)
            .slice(0, 2)
            .map(([, val]) => `<span class="tag">${val}</span>`)
            .join('');

        col.innerHTML += `
        <div class="cart-item" data-id="${item.id}">
            <div class="cart-item__img">
                <img src="${item.images[0]}" alt="${item.name}" />
            </div>
            <div class="cart-item__body">
                <div class="cart-item__top">
                    <div>
                        <div class="cart-item__name">${item.name}</div>
                        <div class="cart-item__tags">${tags}</div>
                    </div>
                    <span class="cart-item__price">${(item.price * item.qty).toLocaleString()} DZD</span>
                </div>
                <div class="cart-item__bottom">
                    <div class="qty-control">
                        <button class="qty-btn" onclick="changeQty(this, -1)" aria-label="Decrease">
                            <span class="material-symbols-outlined">-</span>
                        </button>
                        <span class="qty-value">${item.qty}</span>
                        <button class="qty-btn" onclick="changeQty(this, 1)" aria-label="Increase">
                            <span class="material-symbols-outlined">+</span>
                        </button>
                    </div>
                    <button class="btn-remove" onclick="removeItem(this)">
                    <button class="btn-remove" onclick="removeItem(this)" aria-label="Remove">
                        <i class="fa-solid fa-trash-can"></i>
                        Remove
                    </button>
                </div>
            </div>
        </div>`;
    });

    updateSummary();
}

renderCart();