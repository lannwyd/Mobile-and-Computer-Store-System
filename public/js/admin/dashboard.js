// Check if admin is logged in
function checkAdminAuth() {
    if (!sessionStorage.getItem('adminLoggedIn')) {
        window.location.href = './login.html';
    }
}

checkAdminAuth();

// Logout functionality
document.getElementById('logoutBtn').addEventListener('click', function() {
    sessionStorage.removeItem('adminLoggedIn');
    sessionStorage.removeItem('adminUser');
    window.location.href = './login.html';
});

// Initialize dashboard
function initDashboard() {
    updateStats();
    loadRecentOrders();
}

function updateStats() {
    // Total Products
    document.getElementById('totalProducts').textContent = products.length;
    
    // Total Orders
    document.getElementById('totalOrders').textContent = orders.length;
    
    // Total Users (excluding admin)
    const clientCount = users.filter(u => u.role === 'client').length;
    document.getElementById('totalUsers').textContent = clientCount;
    
    // Total Revenue
    const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0);
    document.getElementById('totalRevenue').textContent = 'د.ج ' + totalRevenue.toLocaleString();
}

function loadRecentOrders() {
    const tbody = document.getElementById('recentOrdersBody');
    const recentOrders = orders.slice(-5).reverse();
    
    tbody.innerHTML = recentOrders.map(order => `
        <tr>
            <td>#${order.id}</td>
            <td>${order.customer}</td>
            <td>${order.product}</td>
            <td>د.ج ${order.total.toLocaleString()}</td>
            <td>
                <span class="badge badge--${order.status.toLowerCase().replace(' ', '-')}">
                    ${order.status}
                </span>
            </td>
            <td>${new Date(order.date).toLocaleDateString()}</td>
        </tr>
    `).join('');
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', initDashboard);

// Set active nav link
document.querySelectorAll('.navbar__links a, .sidebar__item a').forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === './dashboard.html' || link.getAttribute('href') === './dashboard.html') {
        link.classList.add('active');
    }
});
