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

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    loadUsers();
    setupEventListeners();
});

function setupEventListeners() {
    document.getElementById('searchInput').addEventListener('input', filterAndRender);
    document.getElementById('roleFilter').addEventListener('change', filterAndRender);
}

function loadUsers() {
    filterAndRender();
}

function filterAndRender() {
    const search = document.getElementById('searchInput').value.toLowerCase();
    const roleFilter = document.getElementById('roleFilter').value;

    const filtered = users.filter(user => {
        const matchesSearch = 
            user.name.toLowerCase().includes(search) || 
            user.email.toLowerCase().includes(search);
        const matchesRole = !roleFilter || user.role === roleFilter;
        return matchesSearch && matchesRole;
    });

    renderUsers(filtered);
}

function renderUsers(usersToRender) {
    const tbody = document.getElementById('usersBody');
    
    if (usersToRender.length === 0) {
        tbody.innerHTML = '<tr><td colspan="7" style="text-align:center;padding:2rem;">No users found</td></tr>';
        return;
    }

    tbody.innerHTML = usersToRender.map(user => `
        <tr>
            <td>#${user.id}</td>
            <td>${user.name}</td>
            <td>${user.email}</td>
            <td>
                <span class="badge ${user.role === 'admin' ? 'badge--admin' : 'badge--client'}">
                    ${user.role === 'admin' ? 'Admin' : 'Client'}
                </span>
            </td>
            <td>
                <span class="user-status ${user.blocked ? 'blocked' : 'active'}">
                    ${user.blocked ? 'Blocked' : 'Active'}
                </span>
            </td>
            <td>${new Date(user.joined).toLocaleDateString()}</td>
            <td>
                <div class="action-buttons">
                    ${user.id !== 1 ? `
                        <button class="btn-action edit" onclick="toggleRole(${user.id})" title="Toggle role">
                            ${user.role === 'admin' ? 'Demote' : 'Promote'}
                        </button>
                        <button class="btn-action ${user.blocked ? 'edit' : 'delete'}" onclick="toggleBlock(${user.id})" title="Block/Unblock">
                            ${user.blocked ? 'Unblock' : 'Block'}
                        </button>
                        <button class="btn-action delete" onclick="deleteUser(${user.id})" title="Delete user">Delete</button>
                    ` : `
                        <span style="color: var(--muted); font-size: .75rem;">Owner</span>
                    `}
                </div>
            </td>
        </tr>
    `).join('');
}

function toggleRole(userId) {
    const user = users.find(u => u.id === userId);
    if (!user || user.id === 1) return;

    const newRole = user.role === 'admin' ? 'client' : 'admin';
    const action = newRole === 'admin' ? 'promote' : 'demote';
    
    if (confirm(`Are you sure you want to ${action} ${user.name} to ${newRole}?`)) {
        user.role = newRole;
        filterAndRender();
    }
}

function toggleBlock(userId) {
    const user = users.find(u => u.id === userId);
    if (!user || user.id === 1) return;

    if (confirm(`Are you sure you want to ${user.blocked ? 'unblock' : 'block'} ${user.name}?`)) {
        user.blocked = !user.blocked;
        filterAndRender();
    }
}

function deleteUser(userId) {
    const user = users.find(u => u.id === userId);
    if (!user || user.id === 1) return;

    if (confirm(`Are you sure you want to permanently delete ${user.name}? This action cannot be undone.`)) {
        const index = users.findIndex(u => u.id === userId);
        if (index > -1) {
            users.splice(index, 1);
            filterAndRender();
        }
    }
}
