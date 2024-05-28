document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('pizzaForm');
  const ordersDiv = document.getElementById('orders');
  const errorMessageDiv = document.getElementById('error-message');
  
  const fetchOrders = async () => {
    const response = await fetch('http://localhost:9009/api/pizza/history');
    const data = await response.json();
    displayOrders(data);
  };
  
  const displayOrders = (orders) => {
    ordersDiv.innerHTML = '';
    orders.forEach(order => {
      const toppings = order.toppings ? order.toppings.join(', ') : 'no toppings';
      const orderDiv = document.createElement('div');
      orderDiv.className = 'order';
      orderDiv.innerHTML = `<strong>${order.customer}</strong> ordered a size ${order.size} with ${Array.isArray(order.toppings) ? order.toppings.length : 'no'} topping(s): ${toppings}`;
      ordersDiv.appendChild(orderDiv);
    });
  };
  
  const postOrder = async (order) => {
    const response = await fetch('http://localhost:9009/api/pizza/order', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(order)
    });
    if (response.status === 422) {
      const errorData = await response.json();
      showError(errorData.message);
    } else {
      alert('Order placed successfully!');
      fetchOrders();
      form.reset();
      hideError();
    }
  };

  const showError = (message) => {
    errorMessageDiv.textContent = `Order failed: ${message}`;
    errorMessageDiv.style.display = 'block';
  };

  const hideError = () => {
    errorMessageDiv.style.display = 'none';
  };
  
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const fullName = document.getElementById('fullName').value;
    const size = document.getElementById('size').value;
    const toppings = Array.from(document.querySelectorAll('input[type="checkbox"]:checked')).map(cb => cb.value);
    const newOrder = { fullName, size, toppings };
    postOrder(newOrder);
  });
  
  fetchOrders();
});
