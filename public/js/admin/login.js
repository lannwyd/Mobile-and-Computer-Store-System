document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();
    const errorMessage = document.getElementById('errorMessage');
    
    // Validate fields
    if (!email || !password) {
        errorMessage.textContent = 'Please enter both email and password.';
        errorMessage.classList.add('show');
        return;
    }
    
    // Check credentials against users array
    const adminUser = users.find(user => 
        (user.email === email || user.name === email) && 
        user.password === password && 
        user.role === 'admin'
    );
    
    if (adminUser) {
        // Save session
        sessionStorage.setItem('adminLoggedIn', 'true');
        sessionStorage.setItem('adminUser', JSON.stringify(adminUser));
        
        // Redirect to dashboard
        window.location.href = './dashboard.html';
    } else {
        errorMessage.textContent = 'Invalid email/username or password. Make sure you have admin privileges.';
        errorMessage.classList.add('show');
        document.getElementById('password').value = '';
    }
});
