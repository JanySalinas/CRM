document.addEventListener('DOMContentLoaded', () => {
    const token = localStorage.getItem('token');
    if (!token) {
        window.location.href = 'login.html';
        return;
    }

    // Logout functionality
    document.getElementById('logout-btn').addEventListener('click', () => {
        localStorage.removeItem('token');
        window.location.href = 'login.html';
    });

    // Navigation to add customer and inactive customers pages
    document.getElementById('add-customer-btn').addEventListener('click', () => {
        window.location.href = 'addEditCustomer.html';
    });
    document.getElementById('view-inactive-btn').addEventListener('click', () => {
        window.location.href = 'report.html';
    });

    // Function to load customers and attach click handlers for actions
    async function loadCustomers() {
        try {
            const res = await fetch('http://localhost:3000/api/customers', {
                headers: { 'Authorization': 'Bearer ' + token }
            });
            const data = await res.json();
            const tbody = document.querySelector('#customers-table tbody');
            tbody.innerHTML = '';

            if (data.customers && data.customers.length > 0) {
                data.customers.forEach(customer => {
                    const tr = document.createElement('tr');
                    tr.innerHTML = `
                        <td>${customer.name}</td>
                        <td>${customer.email}</td>
                        <td>${customer.phone || ''}</td>
                        <td>
                            <button class="view-btn" data-id="${customer.id}">View</button>
                            <button class="edit-btn" data-id="${customer.id}">Edit</button>
                            <button class="activity-btn" data-id="${customer.id}">Add Activity</button>
                            <button class="delete-btn" data-id="${customer.id}">Delete</button>
                        </td>
                    `;
                    tbody.appendChild(tr);

                    // Attach click handlers for each button
                    tr.querySelector('.view-btn').addEventListener('click', () => {
                        // Redirect to customerDetails.html with ID parameter
                        window.location.href = `customerDetails.html?id=${customer.id}`;
                    });
                    
                    tr.querySelector('.edit-btn').addEventListener('click', () => {
                        // Redirect to addEditCustomer.html in edit mode with ID parameter
                        window.location.href = `addEditCustomer.html?id=${customer.id}`;
                    });
                    
                    tr.querySelector('.activity-btn').addEventListener('click', () => {
                        // Redirect to addActivity.html with customerId parameter
                        window.location.href = `addActivity.html?customerId=${customer.id}`;
                    });
                    
                    tr.querySelector('.delete-btn').addEventListener('click', () => {
                        deleteCustomer(customer.id);
                    });
                });
            } else {
                tbody.innerHTML = '<tr><td colspan="4">No customers found.</td></tr>';
            }
        } catch (error) {
            console.error('Error loading customers:', error);
        }
    }

    // Delete customer function remains unchanged
    async function deleteCustomer(id) {
        if (confirm('Are you sure you want to delete this customer?')) {
            try {
                const res = await fetch(`http://localhost:3000/api/customers/${id}`, {
                    method: 'DELETE',
                    headers: { 'Authorization': 'Bearer ' + token }
                });
                if (!res.ok) {
                    const errorData = await res.json();
                    throw new Error(errorData.message || 'Failed to delete customer');
                }
                loadCustomers();
            } catch (error) {
                console.error('Error deleting customer:', error);
                alert('Error deleting customer: ' + error.message);
            }
        }
    }

    loadCustomers();
});