document.addEventListener('DOMContentLoaded', () => {
    const token = localStorage.getItem('token');
    if (!token) {
      window.location.href = 'login.html';
      return;
    }
  
    // Fetch customers with no activity in the last 30 days
    fetch('http://localhost:3000/api/reports/inactive-customers', {
      headers: { 'Authorization': 'Bearer ' + token }
    })
      .then(res => {
        if (!res.ok) {
          throw new Error('Failed to fetch inactive customers');
        }
        return res.json();
      })
      .then(data => {
        const tbody = document.querySelector('#report-table tbody');
        tbody.innerHTML = '';
  
        if (data.inactiveCustomers && data.inactiveCustomers.length > 0) {
          data.inactiveCustomers.forEach(customer => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
              <td>${customer.name}</td>
              <td>${customer.email}</td>
              <td>${customer.lastActivityDate ? new Date(customer.lastActivityDate).toLocaleDateString() : 'N/A'}</td>
            `;
            tbody.appendChild(tr);
          });
        } else {
          tbody.innerHTML = '<tr><td colspan="3">No inactive customers found.</td></tr>';
        }
      })
      .catch(error => {
        const tbody = document.querySelector('#report-table tbody');
        tbody.innerHTML = `<tr><td colspan="3">${error.message}</td></tr>`;
      });
  });
  