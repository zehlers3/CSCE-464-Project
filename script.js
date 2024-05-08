// Initialize local storage for the cart and previous orders if they do not exist
if (!localStorage.getItem('cart')) {
    localStorage.setItem('cart', JSON.stringify([]));
}
if (!localStorage.getItem('previousOrders')) {
    localStorage.setItem('previousOrders', JSON.stringify([]));
}

// Function to add items to the cart
function addToCart(productName, price, quantity = 1) {
    let cart = JSON.parse(localStorage.getItem('cart'));
    const productIndex = cart.findIndex(item => item.name === productName);
    if (productIndex !== -1) {
        cart[productIndex].quantity += quantity;
    } else {
        cart.push({ name: productName, price, quantity });
    }
    localStorage.setItem('cart', JSON.stringify(cart));    
}

// Function to display the cart items on the checkout page
function displayCart() {
    const cartContainer = document.getElementById('cart-items');
    const totalPriceElement = document.getElementById('total-price');
    const cart = JSON.parse(localStorage.getItem('cart'));
    if (!cartContainer || !totalPriceElement) return;

    cartContainer.innerHTML = '';
    let subtotal = 0;
    cart.forEach(item => {
        const itemElement = document.createElement('div');
        itemElement.textContent = `${item.name} - $${item.price} x ${item.quantity}`;
        cartContainer.appendChild(itemElement);
        subtotal += item.price * item.quantity;
    });

    const tax = subtotal * 0.07;  // 7% tax
    const shippingFee = 4.00;  // $4 shipping fee
    const total = subtotal + tax + shippingFee;
    totalPriceElement.textContent = total.toFixed(2);
}

// Function to handle checkout and save order
function checkout() {
    const cart = JSON.parse(localStorage.getItem('cart'));
    if (cart.length === 0) {
        alert("Your cart is empty!");
        return;
    }

    const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const tax = subtotal * 0.07;
    const shippingFee = 4.00;
    const total = subtotal + tax + shippingFee;

    const order = {
        date: new Date().toLocaleDateString(),
        items: cart,
        subtotal: subtotal,
        tax: tax,
        shippingFee: shippingFee,
        total: total
    };

    const previousOrders = JSON.parse(localStorage.getItem('previousOrders'));
    previousOrders.push(order);
    localStorage.setItem('previousOrders', JSON.stringify(previousOrders));
    localStorage.setItem('cart', JSON.stringify([]));
    alert(`Checkout complete! Total: $${total.toFixed(2)}`);
    window.location.href = 'previous-orders.html';
}

// Function to display previous orders on the Previous Orders page
function displayPreviousOrders() {
    const ordersList = document.getElementById('orders-list');
    const orders = JSON.parse(localStorage.getItem('previousOrders'));
    if (!ordersList || orders.length === 0) {
        ordersList.innerHTML = '<p>No previous orders found.</p>';
        return;
    }

    orders.forEach(order => {
        const orderDiv = document.createElement('div');
        orderDiv.className = 'order-item';
        orderDiv.innerHTML = `<strong>Date:</strong> ${order.date} <br>
                              <strong>Items:</strong> ${order.items.map(item => `${item.name} (x${item.quantity})`).join(', ')} <br>
                              <strong>Subtotal:</strong> $${order.subtotal.toFixed(2)} <br>
                              <strong>Tax:</strong> $${order.tax.toFixed(2)} <br>
                              <strong>Shipping Fee:</strong> $${order.shippingFee.toFixed(2)} <br>
                              <strong>Total:</strong> $${order.total.toFixed(2)}`;
        ordersList.appendChild(orderDiv);
    });
}

// Function to filter products based on search input
function filterProducts() {
    let searchInput = document.getElementById('product-search').value.toLowerCase();
    let productCards = document.querySelectorAll('.product-card');
    productCards.forEach(card => {
        let productName = card.querySelector('h2').textContent.toLowerCase();
        card.style.display = productName.includes(searchInput) ? '' : 'none';
    });
}

// Function to toggle the visibility of the navigation menu
function toggleNavigationMenu() {
    var navMenu = document.getElementById('nav-mobile');
    if (navMenu.style.display === 'none' || navMenu.style.display === '') {
        navMenu.style.display = 'block';
    } else {
        navMenu.style.display = 'none';
    }
}

// Function to toggle dropdown visibility
function toggleDropdown() {
    var dropdownContent = document.getElementById('dropdown-content');
    dropdownContent.style.display = dropdownContent.style.display === 'block' ? 'none' : 'block';
}

// Function to filter products by category
function filterCategory(category) {
    const cards = document.querySelectorAll('.product-card');
    cards.forEach(card => {
        card.style.display = card.getAttribute('data-category') === category || category === 'all' ? '' : 'none';
    });
}

// Ensure the DOM is fully loaded before executing any script
document.addEventListener('DOMContentLoaded', function() {
    if (window.location.pathname.includes('checkout.html')) {
        displayCart();
    } else if (window.location.pathname.includes('previous-orders.html')) {
        displayPreviousOrders();
    }
});
