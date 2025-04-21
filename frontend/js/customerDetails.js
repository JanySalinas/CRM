document.addEventListener('DOMContentLoaded', () => {
    const token = localStorage.getItem('token');
    if (!token) {
      window.location.href = 'login.html';
      return;
    }
  
    // Get the customer ID from the URL query parameters
    const params = new URLSearchParams(window.location.search);
    const customerId = params.get('id');
    if (!customerId) {
      document.getElementById('customer-info').textContent = 'Customer ID not provided.';
      return;
    }
  
    // Fetch customer details
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
      const customer = data.customer; // Assumes the customer details are returned as data.customer
      const customerInfoDiv = document.getElementById('customer-info');
      customerInfoDiv.innerHTML = `
        <p><strong>Name:</strong> ${customer.name}</p>
        <p><strong>Email:</strong> ${customer.email}</p>
        <p><strong>Phone:</strong> ${customer.phone || 'N/A'}</p>
        <p><strong>Address:</strong> ${customer.address || 'N/A'}</p>
        <p><strong>Last Contacted:</strong> ${customer.lastContacted ? new Date(customer.lastContacted).toLocaleDateString() : 'N/A'}</p>
      `;
    })
    .catch(error => {
      document.getElementById('customer-info').textContent = error.message;
    });
  
    // Fetch activities for the customer
    fetch(`http://localhost:3000/api/activities?customerId=${customerId}`, {
      headers: { 'Authorization': 'Bearer ' + token }
    })
    .then(res => {
      if (!res.ok) {
        throw new Error('Failed to fetch activities');
      }
      return res.json();
    })

    .then(data => {
        const activitiesList = document.getElementById('activities-list');
        activitiesList.innerHTML = '';
      
        if (data.activities && data.activities.length > 0) {
          data.activities.forEach(activity => {
            const li = document.createElement('li');
            li.textContent = `${activity.type} on ${new Date(activity.date).toLocaleDateString()}: ${activity.note}`;
            activitiesList.appendChild(li);
          });
        } else {
          activitiesList.innerHTML = '<li>No activities found.</li>';
        }
      })

    .catch(error => {
      const activitiesList = document.getElementById('activities-list');
      activitiesList.innerHTML = `<li>${error.message}</li>`;
    });
  });
  