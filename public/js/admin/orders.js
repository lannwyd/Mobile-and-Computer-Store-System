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

let currentEditingOrderId = null;

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    loadOrders();
    setupEventListeners();
});

function setupEventListeners() {
    document.getElementById('searchInput').addEventListener('input', filterAndRender);
    document.getElementById('statusFilter').addEventListener('change', filterAndRender);
    document.getElementById('exportBtn').addEventListener('click', exportOrders);
    document.getElementById('closeStatusModal').addEventListener('click', closeStatusModal);
    document.getElementById('cancelStatusBtn').addEventListener('click', closeStatusModal);
    document.getElementById('updateStatusBtn').addEventListener('click', updateStatus);
}

function loadOrders() {
    filterAndRender();
}

function filterAndRender() {
    const search = document.getElementById('searchInput').value.toLowerCase();
    const statusFilter = document.getElementById('statusFilter').value;

    const filtered = orders.filter(order => {
        const matchesSearch = 
            order.id.toString().includes(search) || 
            order.customer.toLowerCase().includes(search) ||
            order.email.toLowerCase().includes(search);
        const matchesStatus = !statusFilter || order.status === statusFilter;
        return matchesSearch && matchesStatus;
    });

    renderOrders(filtered);
}

function renderOrders(ordersToRender) {
    const tbody = document.getElementById('ordersBody');
    
    if (ordersToRender.length === 0) {
        tbody.innerHTML = '<tr><td colspan="8" style="text-align:center;padding:2rem;">No orders found</td></tr>';
        return;
    }

    tbody.innerHTML = ordersToRender.map(order => `
        <tr>
            <td>#${order.id}</td>
            <td>${order.customer}</td>
            <td>${order.email}</td>
            <td>${order.product}</td>
            <td>د.ج ${order.total.toLocaleString()}</td>
            <td>
                <span class="badge badge--${order.status.toLowerCase().replace(' ', '-')}">
                    ${order.status}
                </span>
            </td>
            <td>${new Date(order.date).toLocaleDateString()}</td>
            <td>
                <button class="btn-action edit" onclick="openStatusModal(${order.id})">Update</button>
            </td>
        </tr>
    `).join('');
}

function openStatusModal(orderId) {
    const order = orders.find(o => o.id === orderId);
    if (!order) return;

    currentEditingOrderId = orderId;
    document.getElementById('orderId').textContent = '#' + order.id;
    document.getElementById('customerName').textContent = order.customer;
    document.getElementById('statusSelect').value = order.status;
    document.getElementById('statusModal').classList.add('active');
}

function closeStatusModal() {
    document.getElementById('statusModal').classList.remove('active');
    currentEditingOrderId = null;
}

function updateStatus() {
    if (!currentEditingOrderId) return;

    const newStatus = document.getElementById('statusSelect').value;
    const order = orders.find(o => o.id === currentEditingOrderId);
    
    if (order) {
        order.status = newStatus;
        closeStatusModal();
        filterAndRender();
    }
}

function exportOrders() {
    const filtered = getFilteredOrders();
    
    if (filtered.length === 0) {
        alert('No orders to export');
        return;
    }

    let csv = 'Order ID,Customer,Email,Product,Quantity,Total,Status,Date\n';
    
    filtered.forEach(order => {
        csv += `${order.id},"${order.customer}","${order.email}","${order.product}",${order.quantity},"${order.total}","${order.status}","${order.date}"\n`;
    });

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'orders-' + new Date().toISOString().split('T')[0] + '.csv';
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
}

function getFilteredOrders() {
    const search = document.getElementById('searchInput').value.toLowerCase();
    const statusFilter = document.getElementById('statusFilter').value;

    return orders.filter(order => {
        const matchesSearch = 
            order.id.toString().includes(search) || 
            order.customer.toLowerCase().includes(search);
        const matchesStatus = !statusFilter || order.status === statusFilter;
        return matchesSearch && matchesStatus;
    });
}

// Close modal on background click
document.getElementById('statusModal').addEventListener('click', function(e) {
    if (e.target === this) {
        closeStatusModal();
    }
});
