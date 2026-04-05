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

const wilayaSelect = document.getElementById('wilaya')
wilayas.forEach(w => {
    const opt = document.createElement('option')
    opt.value = w.code
    opt.textContent = `${w.code} - ${w.name}`
    wilayaSelect.appendChild(opt)
})

// update shipping cost in summary when delivery method changes
function toggleDelivery() {
    const method = document.querySelector('input[name="delivery"]:checked').value
    const shippingEl = document.getElementById('summary-shipping')
    shippingEl.textContent = method === 'home' ? '500 DZD' : '300 DZD'
}