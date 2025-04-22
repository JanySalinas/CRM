document.addEventListener('DOMContentLoaded', () => {
    const token = localStorage.getItem('token');
    if (!token) {
      window.location.href = 'login.html';
      return;
    }
  
    const form = document.getElementById('customer-form');
    const formTitle = document.getElementById('form-title');
    const errorDiv = document.getElementById('form-error');
  
    // Parse query parameters to check for an "id" parameter.
    const params = new URLSearchParams(window.location.search);
    const customerId = params.get('id');
  
    // If editing (when an id is present), fetch the customer and pre-fill the form.
    if (customerId) {
      formTitle.textContent = 'Edit Customer';
      fetch(`http://localhost:3000/api/customers/${customerId}`, {
        headers: { 'Authorization': 'Bearer ' + token }
      })
        .then(res => {
          if (!res.ok) {
            throw new Error('Failed to fetch customer details');
          }
          return res.json();
        })
        .then(data => {
          // Assuming the backend returns the customer in data.customer.
          const customer = data.customer;
          document.getElementById('name').value = customer.name;
          document.getElementById('email').value = customer.email;
          document.getElementById('phone').value = customer.phone || '';
          document.getElementById('address').value = customer.address || '';
          // Format date value to "yyyy-mm-dd" if lastContacted exists.
          if (customer.lastContacted) {
            const date = new Date(customer.lastContacted);
            const yyyy = date.getFullYear();
            let mm = date.getMonth() + 1;
            mm = mm < 10 ? '0' + mm : mm;
            let dd = date.getDate();
            dd = dd < 10 ? '0' + dd : dd;
            document.getElementById('lastContacted').value = `${yyyy}-${mm}-${dd}`;
          }
        })
        .catch(error => {
          errorDiv.textContent = error.message;
        });
    } else {
      formTitle.textContent = 'Add Customer';
    }
  
    // Handle form submission.
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      errorDiv.textContent = '';

      if (!document.getElementById('name').value.trim() || !document.getElementById('email').value.trim()) {
        errorDiv.textContent = 'Name and Email are required.';
        return;
      }
  
      const customerData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        address: document.getElementById('address').value,
        lastContacted: document.getElementById('lastContacted').value
      };
  
      try {
        let res;
        if (customerId) {
          // Editing: Send PUT request to update the customer.
          res = await fetch(`http://localhost:3000/api/customers/${customerId}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': 'Bearer ' + token
            },
            body: JSON.stringify(customerData)
          });
        } else {
          // Creating: Send POST request to add a new customer.
          res = await fetch('http://localhost:3000/api/customers', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': 'Bearer ' + token
            },
            body: JSON.stringify(customerData)
          });
        }
        const data = await res.json();
        if (!res.ok) {
          throw new Error(data.message || 'Failed to submit form');
        }
        // Redirect to the dashboard after a successful operation.
        window.location.href = 'dashboard.html';
      } catch (error) {
        errorDiv.textContent = error.message;
      }
    });
  });