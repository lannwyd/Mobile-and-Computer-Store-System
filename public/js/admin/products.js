// Check authentication
function checkAdminAuth() {
    if (!sessionStorage.getItem('adminLoggedIn')) {
        window.location.href = './login.html';
    }
}

checkAdminAuth();

// Logout
document.getElementById('logoutBtn').addEventListener('click', function() {
    sessionStorage.removeItem('adminLoggedIn');
    sessionStorage.removeItem('adminUser');
    window.location.href = './login.html';
});

let currentEditingId = null;
let selectedColors = [];

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    renderProducts();
    setupEventListeners();
    setupColorPicker();
});

function setupEventListeners() {
    document.getElementById('addProductBtn').addEventListener('click', openAddModal);
    document.getElementById('closeModalBtn').addEventListener('click', closeModal);
    document.getElementById('cancelBtn').addEventListener('click', closeModal);
    document.getElementById('productForm').addEventListener('submit', handleFormSubmit);
    document.getElementById('searchInput').addEventListener('input', filterAndRender);
    document.getElementById('typeFilter').addEventListener('change', filterAndRender);
}

function setupColorPicker() {
    
    // Color swatch selection
    document.querySelectorAll('.color-swatch').forEach(swatch => {
        swatch.querySelector('.swatch-dot').style.backgroundColor = swatch.dataset.hex;
        swatch.addEventListener('click', function(e) {
            e.preventDefault();
            const colorName = this.dataset.color;
            const colorHex = this.dataset.hex;
            toggleColor(colorName, colorHex, this);
        });
    });

    // Custom color button
    document.getElementById('addCustomColorBtn').addEventListener('click', function(e) {
        e.preventDefault();
        const colorName = document.getElementById('customColorName').value.trim();
        const colorHex = document.getElementById('customColorHex').value;

        if (!colorName) {
            alert('Please enter a color name');
            return;
        }

        toggleColor(colorName, colorHex);
        document.getElementById('customColorName').value = '';
        renderSelectedColors();
    });
}

function toggleColor(colorName, colorHex, swatchElement = null) {
    const existingIndex = selectedColors.findIndex(c => c.hex === colorHex);

    if (existingIndex !== -1) {
        // Remove color
        selectedColors.splice(existingIndex, 1);
        if (swatchElement) swatchElement.classList.remove('selected');
    } else {
        // Add color
        selectedColors.push({ name: colorName, hex: colorHex });
        if (swatchElement) swatchElement.classList.add('selected');
    }

    renderSelectedColors();
}

function renderSelectedColors() {
    const container = document.getElementById('selectedColors');
    
    if (selectedColors.length === 0) {
        container.innerHTML = '';
        return;
    }

    container.innerHTML = selectedColors.map((color, index) => `
        <div class="color-badge">
            <span class="color-badge-dot" style="background-color: ${color.hex}"></span>
            <span>${color.name}</span>
            <button type="button" class="color-badge-remove" onclick="removeSelectedColor(${index})">❌</button>
        </div>
    `).join('');
}

function removeSelectedColor(index) {
    const removedColor = selectedColors[index];
    selectedColors.splice(index, 1);

    // Unselect the swatch if it's a preset color
    const swatch = document.querySelector(`.color-swatch[data-hex="${removedColor.hex}"]`);
    if (swatch) {
        swatch.classList.remove('selected');
    }

    renderSelectedColors();
}

function openAddModal() {
    currentEditingId = null;
    document.getElementById('modalTitle').textContent = 'Add Product';
    document.getElementById('productForm').reset();
    selectedColors = [];
    document.querySelectorAll('.color-swatch').forEach(s => s.classList.remove('selected'));
    renderSelectedColors();
    document.getElementById('productModal').classList.add('active');
}

function closeModal() {
    document.getElementById('productModal').classList.remove('active');
    currentEditingId = null;
}

function openEditModal(id) {
    const product = products.find(p => p.id === id);
    if (!product) return;

    currentEditingId = id;
    document.getElementById('modalTitle').textContent = 'Edit Product';
    document.getElementById('productName').value = product.name;
    document.getElementById('productBrand').value = product.brand;
    document.getElementById('productType').value = product.type;
    document.getElementById('productPrice').value = product.price;
    document.getElementById('productStock').value = product.stock;
    document.getElementById('productImage').value = product.images[0] || '';
    document.getElementById('productDescription').value = product.specs ? JSON.stringify(product.specs) : '';
    
    // Load existing colors
    selectedColors = product.colors ? JSON.parse(JSON.stringify(product.colors)) : [];
    document.querySelectorAll('.color-swatch').forEach(s => s.classList.remove('selected'));
    
    selectedColors.forEach(color => {
        const swatch = document.querySelector(`.color-swatch[data-hex="${color.hex}"]`);
        if (swatch) {
            swatch.classList.add('selected');
        }
    });
    
    renderSelectedColors();
    document.getElementById('productModal').classList.add('active');
}

function handleFormSubmit(e) {
    e.preventDefault();

    const formData = {
        name: document.getElementById('productName').value.trim(),
        brand: document.getElementById('productBrand').value.trim(),
        type: document.getElementById('productType').value,
        price: parseInt(document.getElementById('productPrice').value),
        stock: parseInt(document.getElementById('productStock').value),
        image: document.getElementById('productImage').value.trim()
    };

    if (!formData.name || !formData.brand || !formData.type || !formData.price) {
        alert('Please fill all required fields');
        return;
    }

    if (currentEditingId) {
        editProduct(currentEditingId, formData);
    } else {
        addProduct(formData);
    }
}

function addProduct(data) {
    const newId = Math.max(...products.map(p => p.id)) + 1;
    const newProduct = {
        id: newId,
        name: data.name,
        brand: data.brand,
        type: data.type,
        price: data.price,
        storage: [],
        colors: selectedColors.length > 0 ? JSON.parse(JSON.stringify(selectedColors)) : [],
        images: [data.image || ''],
        specs: {},
        stock: data.stock
    };

    products.push(newProduct);
    closeModal();
    filterAndRender();
}

function editProduct(id, data) {
    const product = products.find(p => p.id === id);
    if (!product) return;

    product.name = data.name;
    product.brand = data.brand;
    product.type = data.type;
    product.price = data.price;
    product.stock = data.stock;
    if (data.image) product.images[0] = data.image;
    product.colors = selectedColors.length > 0 ? JSON.parse(JSON.stringify(selectedColors)) : [];

    closeModal();
    filterAndRender();
}

function deleteProduct(id) {
    if (confirm('Are you sure you want to delete this product?')) {
        const index = products.findIndex(p => p.id === id);
        if (index > -1) {
            products.splice(index, 1);
            filterAndRender();
        }
    }
}

function filterAndRender() {
    const search = document.getElementById('searchInput').value.toLowerCase();
    const typeFilter = document.getElementById('typeFilter').value;

    const filtered = products.filter(product => {
        const matchesSearch = product.name.toLowerCase().includes(search) || 
                             product.brand.toLowerCase().includes(search);
        const matchesType = !typeFilter || product.type === typeFilter;
        return matchesSearch && matchesType;
    });

    renderFilteredProducts(filtered);
}

function renderProducts() {
    renderFilteredProducts(products);
}

function renderFilteredProducts(productsToRender) {
    const tbody = document.getElementById('productsBody');
    
    if (productsToRender.length === 0) {
        tbody.innerHTML = '<tr><td colspan="7" style="text-align:center;padding:2rem;">No products found</td></tr>';
        return;
    }

    tbody.innerHTML = productsToRender.map(product => `
        <tr>
            <td>#${product.id}</td>
            <td>${product.name}</td>
            <td>${product.brand}</td>
            <td>${product.type}</td>
            <td>د.ج ${product.price.toLocaleString()}</td>
            <td>
                <span class="${product.stock > 0 ? 'stock-in' : 'stock-out'}">
                    ${product.stock}
                </span>
            </td>
            <td>
                <div class="action-buttons">
                    <button class="btn-action edit" onclick="openEditModal(${product.id})">Edit</button>
                    <button class="btn-action delete" onclick="deleteProduct(${product.id})">Delete</button>
                </div>
            </td>
        </tr>
    `).join('');
}

// Close modal on background click
document.getElementById('productModal').addEventListener('click', function(e) {
    if (e.target === this) {
        closeModal();
    }
});