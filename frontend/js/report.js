document.addEventListener('DOMContentLoaded', () => {
    fetch('http://localhost:3000/api/inactiveCustomers')
      .then(res => res.json())
      .then(data => {
        const tbody = document.querySelector('#report-table tbody');
        tbody.innerHTML = '';
        if (data.inactiveCustomers && data.inactiveCustomers.length > 0) {
          data.inactiveCustomers.forEach(customer => {
            // Format the lastContacted date to a human-readable format
            const lastActivityDate = customer.lastContacted ? new Date(customer.lastContacted).toLocaleDateString() : 'N/A';
            const row = `
              <tr>
                <td>${customer.name}</td>
                <td>${customer.email}</td>
                <td>${lastActivityDate}</td>
              </tr>
            `;
            tbody.innerHTML += row;
          });
        } else {
          tbody.innerHTML = `<tr><td colspan="3" style="text-align: center;">No inactive customers found</td></tr>`;
        }
      })
      .catch(error => {
        console.error('Error fetching inactive customers:', error);
        document.querySelector('#report-table tbody').innerHTML = `<tr><td colspan="3" style="text-align: center;">Error loading data</td></tr>`;
      });
  });;
