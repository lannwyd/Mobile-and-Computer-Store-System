// populate wilaya dropdown from data.js
function selectPayment(type) {
    const cardTab = document.getElementById('tab-card')
    const wireTab = document.getElementById('tab-wire')
    const cardFields = document.getElementById('card-fields')

    if (type === 'card') {
        cardTab.className = 'payment-tab payment-tab--active'
        wireTab.className = 'payment-tab payment-tab--inactive'
        cardFields.style.display = 'grid'
    } else {
        wireTab.className = 'payment-tab payment-tab--active'
        cardTab.className = 'payment-tab payment-tab--inactive'
        cardFields.style.display = 'none'
    }
}

// ── Load cart ─────────────────────────────────────────
let cart = [];
try {
    const saved = localStorage.getItem('cart');
    if (saved) cart = JSON.parse(saved);
} catch (e) { }

// ── Shipping cost ─────────────────────────────────────
let shippingCost = 300; // default: stopdesk

// ── Populate wilaya dropdown ──────────────────────────
const wilayaSelect = document.getElementById('wilaya');
wilayas.forEach(w => {
    const opt = document.createElement('option');
    opt.value = w.code;
    opt.textContent = `${w.code} - ${w.name}`;
    wilayaSelect.appendChild(opt);
});


// ── Show/clear field error ────────────────────────────
function setError(fieldId, message) {
    const field = document.getElementById(fieldId);
    let err = field.parentElement.querySelector('.field-error');
    if (!err) {
        err = document.createElement('span');
        err.className = 'field-error';
        field.parentElement.appendChild(err);
    }
    err.textContent = message;
    field.classList.add('field--invalid');
}

function clearErrors() {
    document.querySelectorAll('.field-error').forEach(e => e.remove());
    document.querySelectorAll('.field--invalid').forEach(f => f.classList.remove('field--invalid'));
}


// ── Render order items (max 3, then "...") ────────────
function renderSummaryItems() {
    const container = document.getElementById('summary-items');
    const visible = cart.slice(0, 3);
    const hidden = cart.length - 3;

    container.innerHTML = visible.map(item => `
        <div class="summary__item">
            <div class="summary__item-img">
                <img src="${item.images[0]}" alt="${item.name}" />
            </div>
            <span class="summary__item-name">${item.name} <span style="color:var(--muted);font-size:.8rem;">×${item.qty}</span></span>
            <span class="summary__item-price">${(item.price * item.qty).toLocaleString()} DZD</span>
        </div>
    `).join('');

    if (hidden > 0) {
        container.innerHTML += `
            <div style="text-align:center; color:var(--muted); font-size:.85rem; padding:.5rem 0;">
                + ${hidden} more item${hidden > 1 ? 's' : ''}...
            </div>`;
    }
}

// ── Update totals ─────────────────────────────────────
function updateTotals() {
    const subtotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
    const total = subtotal + shippingCost;

    document.getElementById('summary-subtotal').textContent = subtotal.toLocaleString() + ' DZD';
    document.getElementById('summary-shipping').textContent = shippingCost + ' DZD';
    document.getElementById('summary-total').textContent = total.toLocaleString() + ' DZD';
}

// ── Toggle delivery method ────────────────────────────
function toggleDelivery() {
    const method = document.querySelector('input[name="delivery"]:checked').value;
    shippingCost = method === 'home' ? 500 : 300;
    updateTotals();
}

// ── Handle form submission ────────────────────────────
document.getElementById('checkout-form').addEventListener('submit', (e) => {
    e.preventDefault();

    const method = document.querySelector('input[name="delivery"]:checked').value;
    const wilayaOpt = wilayaSelect.options[wilayaSelect.selectedIndex];

    const order = {
        customer: {
            firstName: document.getElementById('first-name').value.trim(),
            lastName: document.getElementById('last-name').value.trim(),
            email: document.getElementById('email').value.trim(),
            phone: document.getElementById('phone').value.trim(),
        },
        delivery: {
            method,
            wilaya: wilayaOpt.value ? wilayaOpt.textContent : '',
            commune: document.getElementById('commune').value.trim(),
        },
        notes: document.getElementById('notes').value.trim(),
        items: cart,
        subtotal: cart.reduce((s, i) => s + i.price * i.qty, 0),
        shipping: shippingCost,
        total: cart.reduce((s, i) => s + i.price * i.qty, 0) + shippingCost,
        placedAt: new Date().toISOString(),
    };

    // Basic validation
    clearErrors();
    let valid = true;

    if (!order.customer.firstName) { setError('first-name', 'First name is required.'); valid = false; }
    if (!order.customer.lastName) { setError('last-name', 'Last name is required.'); valid = false; }
    if (!order.customer.email) { setError('email', 'Email is required.'); valid = false; }
    if (!order.customer.phone) { setError('phone', 'Phone is required.'); valid = false; }
    if (!wilayaSelect.value) { setError('wilaya', 'Please select a wilaya.'); valid = false; }

    if (!valid) return;

    // Save order + clear cart
    try {
        localStorage.setItem('lastOrder', JSON.stringify(order));
        localStorage.removeItem('cart');
    } catch (e) { }

    // Redirect to confirmation (or just alert for now)
    alert(`Order placed! Thank you, ${order.customer.firstName}.`);
    window.location.href = 'index.html';
});

// ── Init ──────────────────────────────────────────────
renderSummaryItems();
updateTotals();