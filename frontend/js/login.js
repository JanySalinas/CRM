document.getElementById('login-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    // Clear any previous error message
    document.getElementById('error-message').textContent = '';

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
        const res = await fetch('http://localhost:3000/api/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });
        const data = await res.json();

        if (!res.ok) {
            // If login fails, display error message
            document.getElementById('error-message').textContent = data.message || 'Login failed';
            return;
        }
        
        // Save JWT to localStorage and redirect to dashboard
        localStorage.setItem('token', data.token);
        window.location.href = 'dashboard.html';
    } catch (error) {
        // In case of network or other errors
        document.getElementById('error-message').textContent = 'Error logging in';
    }
});
