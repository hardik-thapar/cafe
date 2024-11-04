let cart = [];

function addToCart(item) {
    const existingItem = cart.find(cartItem => cartItem.id === item.id);
    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({ ...item, quantity: 1 });
    }
    updateCartCount();
    saveCart();
    console.log('Item added to cart:', item);
}

function updateCartCount() {
    const cartCount = document.getElementById('cart-count');
    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
    cartCount.textContent = totalItems;
    console.log('Cart updated, total items:', totalItems);
}

function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

function loadCart() {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
        cart = JSON.parse(savedCart);
        updateCartCount();
    }
}

function renderCart() {
    const cartItemsContainer = document.getElementById('cart-items');
    if (!cartItemsContainer) return;

    cartItemsContainer.innerHTML = '';

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p>Your cart is empty.</p>';
        return;
    }

    cart.forEach(item => {
        const cartItem = document.createElement('div');
        cartItem.classList.add('cart-item');
        cartItem.innerHTML = `
            <div class="cart-item-details">
                <h3>${item.name}</h3>
                <p>Price: ₹${item.price.toFixed(2)}</p>
                <div class="cart-item-quantity">
                    <button class="quantity-btn minus" onclick="updateQuantity(${item.id}, -1)">-</button>
                    <span class="current-quantity">${item.quantity}</span>
                    <button class="quantity-btn plus" onclick="updateQuantity(${item.id}, 1)">+</button>
                </div>
            </div>
            <button class="cart-item-remove" onclick="removeFromCart(${item.id})">Remove</button>
        `;
        cartItemsContainer.appendChild(cartItem);
    });

    updateCartSummary();
}

function updateQuantity(itemId, change) {
    const item = cart.find(cartItem => cartItem.id === itemId);
    if (item) {
        item.quantity += change;
        if (item.quantity <= 0) {
            removeFromCart(itemId);
        } else {
            updateCartCount();
            saveCart();
            renderCart();
        }
    }
}

function removeFromCart(itemId) {
    cart = cart.filter(item => item.id !== itemId);
    updateCartCount();
    saveCart();
    renderCart();
}

function calculateSubtotal() {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
}

function updateCartSummary() {
    const subtotal = calculateSubtotal();
    const gst = subtotal * 0.12;
    const total = subtotal + gst;

    const subtotalElement = document.getElementById('subtotal');
    const gstElement = document.getElementById('gst');
    const totalElement = document.getElementById('total');

    if (subtotalElement && gstElement && totalElement) {
        subtotalElement.textContent = `₹${subtotal.toFixed(2)}`;
        gstElement.textContent = `₹${gst.toFixed(2)}`;
        totalElement.textContent = `₹${total.toFixed(2)}`;
    } else {
        console.error('One or more summary elements not found');
    }
}

function clearCart() {
    cart = [];
    localStorage.setItem('cart', JSON.stringify(cart));
    renderCart(); // Changed from renderCartItems to renderCart
    updateCartSummary();
    updateCartCount();
}

function checkout() {
    if (cart.length === 0) {
        alert('Your cart is empty. Add some items before checking out.');
        return;
    }

    const contactNumber = document.getElementById('contact-number').value;
    if (!contactNumber) {
        alert('Please enter a contact number before checking out.');
        return;
    }

    // Validate the contact number (you can adjust the regex pattern as needed)
    const phoneRegex = /^\d{10}$/;  // Assumes a 10-digit phone number
    if (!phoneRegex.test(contactNumber)) {
        alert('Please enter a valid 10-digit contact number.');
        return;
    }
    const user_name = document.getElementById('customer-name').value;
    if (!user_name) {
        alert('Please enter a name before checking out.');
        return;
    }
    const table_no = document.getElementById('table').value;
    if (!contactNumber) {
        alert('Please enter a Table number.');
        return;
    }

    // Perform checkout logic here
    alert(`Hey ${user_name}, your order will be served soon at table no: ${table_no}. For any queries we'll contact you at ${contactNumber} if needed.`);
    clearCart();
}

document.addEventListener('DOMContentLoaded', () => {
    loadCart();
    renderCart();
    updateCartSummary(); // Add this line to update the summary on page load

    const checkoutBtn = document.getElementById('checkout-btn');
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', checkout);
    }
});

window.addToCart = addToCart;
window.updateQuantity = updateQuantity;
window.removeFromCart = removeFromCart;
