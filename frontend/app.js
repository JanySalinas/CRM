document.addEventListener('DOMContentLoaded', () => {
    const loginContainer = document.getElementById('login-container');
    const dashboardContainer = document.getElementById('dashboard-container');
    const loginForm = document.getElementById('login-form');
    const loginError = document.getElementById('login-error');
    const logoutBtn = document.getElementById('logout-btn');
    const customersBtn = document.getElementById('customers-btn');
    const activitiesBtn = document.getElementById('activities-btn');
    const reportsBtn = document.getElementById('reports-btn');
    const contentSection = document.getElementById('content');
  
    // Check for stored token; if exists, show dashboard
    const token = localStorage.getItem('token');
    if (token) {
      showDashboard();
    }
  
    // Login event
    loginForm.addEventListener('submit', async (e) => {
      e.preventDefault();
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
          loginError.textContent = data.message || 'Login failed';
          return;
        }
        localStorage.setItem('token', data.token);
        showDashboard();
      } catch (error) {
        loginError.textContent = 'Error logging in';
      }
    });
  
    // Logout event: clear token and show login screen
    logoutBtn.addEventListener('click', () => {
      localStorage.removeItem('token');
      loginContainer.classList.remove('hidden');
      dashboardContainer.classList.add('hidden');
    });
  
    // Navigation events
    customersBtn.addEventListener('click', loadCustomers);
    activitiesBtn.addEventListener('click', loadActivities);
    reportsBtn.addEventListener('click', loadInactiveReport);
  
    function showDashboard() {
      loginContainer.classList.add('hidden');
      dashboardContainer.classList.remove('hidden');
      loadCustomers(); // Default view
    }
  
    // Fetch and render customers
    async function loadCustomers() {
      const token = localStorage.getItem('token');
      try {
        const res = await fetch('http://localhost:3000/api/customers', {
          headers: { 'Authorization': 'Bearer ' + token }
        });
        const data = await res.json();
        if (data.customers) {
          let html = '<h2>Customers</h2><ul>';
          data.customers.forEach(customer => {
            html += `<li>${customer.name} - ${customer.email}</li>`;
          });
          html += '</ul>';
          contentSection.innerHTML = html;
        } else {
          contentSection.innerHTML = '<p>No customers found.</p>';
        }
      } catch (error) {
        contentSection.innerHTML = '<p>Error loading customers.</p>';
      }
    }
  
    // Load activities placeholder
    async function loadActivities() {
      contentSection.innerHTML = '<h2>Activities</h2><p>Feature coming soon...</p>';
    }
  
    // Fetch and render inactive customers report
    async function loadInactiveReport() {
      const token = localStorage.getItem('token');
      try {
        const res = await fetch('http://localhost:3000/api/reports/inactive-customers', {
          headers: { 'Authorization': 'Bearer ' + token }
        });
        const data = await res.json();
        let html = '<h2>Inactive Customers</h2>';
        if (data.inactiveCustomers && data.inactiveCustomers.length > 0) {
          html += '<ul>';
          data.inactiveCustomers.forEach(customer => {
            html += `<li>${customer.name} - Last Contacted: ${customer.lastContacted || 'N/A'}</li>`;
          });
          html += '</ul>';
        } else {
          html += '<p>No inactive customers found.</p>';
        }
        contentSection.innerHTML = html;
      } catch (error) {
        contentSection.innerHTML = '<p>Error loading report.</p>';
      }
    }
  });