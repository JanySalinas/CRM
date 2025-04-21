document.addEventListener('DOMContentLoaded', () => {
    const token = localStorage.getItem('token');
    if (!token) {
      window.location.href = 'login.html';
      return;
    }
  
    // Get the customerId from the URL query string (e.g., ?customerId=123)
    const params = new URLSearchParams(window.location.search);
    const customerId = params.get('customerId');
    if (!customerId) {
      document.getElementById('form-error').textContent = 'Customer ID is missing in the URL.';
      return;
    }
    
  
    const form = document.getElementById('activity-form');
    const formError = document.getElementById('form-error');
  
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      formError.textContent = '';
  
      const type = document.getElementById('type').value;
      const note = document.getElementById('note').value;
      const date = document.getElementById('date').value;
  
      const activityData = {
        customerId: parseInt(customerId),
        type: type,
        note: note,
        date: date
      };
  
      try {
        const res = await fetch('http://localhost:3000/api/activities', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
          },
          body: JSON.stringify(activityData)
        });
        const data = await res.json();
        if (!res.ok) {
          throw new Error(data.message || 'Failed to add activity');
        }
        // Redirect to customer details page after successful submission.
        window.location.href = `customerDetails.html?id=${customerId}`;
      } catch (error) {
        formError.textContent = error.message;
      }
    });
  });
