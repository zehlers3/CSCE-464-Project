document.addEventListener('DOMContentLoaded', function() {
    
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Function to add items to the cart
    function addToCart(productName, price) {
        const productIndex = cart.findIndex(item => item.name === productName);
        
        if (productIndex !== -1) {
            cart[productIndex].quantity += 1;
        } else {
            cart.push({ name: productName, price, quantity: 1 });
        }
        
        alert(`${productName} added to cart!`);
        localStorage.setItem('cart', JSON.stringify(cart));
    }

    
    window.addToCart = addToCart;

    
    function displayCart() {
        const cartContainer = document.getElementById('cart-items');
        const totalPriceElement = document.getElementById('total-price');
        
        if (!cartContainer || !totalPriceElement) return;
        
        let totalPrice = 0;
        cartContainer.innerHTML = '';
        
        cart.forEach(item => {
            const itemElement = document.createElement('div');
            itemElement.textContent = `${item.name} - $${item.price} x ${item.quantity}`;
            cartContainer.appendChild(itemElement);
            totalPrice += item.price * item.quantity;
        });
        
        totalPriceElement.textContent = totalPrice.toFixed(2);
    }

    
    function checkout() {
        alert('Checkout complete!');
        cart = [];
        localStorage.setItem('cart', JSON.stringify(cart));
        displayCart();
    }

    window.checkout = checkout;

    
    if (window.location.pathname.includes('checkout.html')) {
        displayCart();
    }

    
    const hamburger = document.getElementById('hamburger');
    const navWrapper = document.getElementById('nav-wrapper'); // Ensure this ID matches your HTML
    const navMobile = document.getElementById('nav-mobile'); // Ensure this ID matches your HTML

    if (hamburger) {
        hamburger.addEventListener('click', function() {
            if (navWrapper && navMobile) { // Check if elements exist
                navWrapper.classList.toggle('active');
                navMobile.classList.toggle('hidden');
            } else {
                console.error('Element IDs not found');
            }
        });
    }
});
