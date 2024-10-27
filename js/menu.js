const menuItems = [
    { id: 1, name: 'Espresso', description: 'Rich and bold', price: 180, category: 'coffee', image: 'images/esspresso.png' },
    { id: 2, name: 'Cappuccino', description: 'Creamy and frothy', price: 250, category: 'coffee', image: 'images/cappucino.jpg' },
    { id: 3, name: 'Latte', description: 'Smooth and milky', price: 270, category: 'coffee', image: 'images/latte.png' },
    { id: 4, name: 'Americano', description: 'Bold and smooth', price: 220, category: 'coffee', image: 'images/americano.png' },
    { id: 5, name: 'Green Tea', description: 'Light and refreshing', price: 200, category: 'tea', image: 'images/green-tea.jpg' },
    { id: 6, name: 'Earl Grey', description: 'Aromatic and citrusy', price: 200, category: 'tea', image: 'images/earl-grey.jpg' },
    { id: 7, name: 'Chai Latte', description: 'Spicy and comforting', price: 250, category: 'tea', image: 'images/chai-latte.jpg' },
    { id: 8, name: 'Chocolate Shake', description: 'Rich and indulgent', price: 320, category: 'shakes', image: 'images/choco-shake.jpg' },
    { id: 9, name: 'Vanilla Shake', description: 'Creamy and classic', price: 320, category: 'shakes', image: 'images/vanilla-shake.jpg' },
    { id: 10, name: 'Strawberry Shake', description: 'Fresh and fruity', price: 340, category: 'shakes', image: 'images/strawberry-shake.png' },
    { id: 11, name: 'Carrot Cake', description: 'Moist and delicious', price: 270, category: 'cakes', image: 'images/carrot-cake.jpg' },
    { id: 12, name: 'Chocolate Brownie', description: 'Rich and fudgy', price: 250, category: 'cakes', image: 'images/chocolate-cake.png' },
    { id: 13, name: 'Cheesecake', description: 'Creamy and tangy', price: 290, category: 'cakes', image: 'images/cheescake.jpg' },
    { id: 14, name: 'Quiche', description: 'Savory and satisfying', price: 390, category: 'savory', image: 'images/blueberry-muffin.png' },
    { id: 15, name: 'Avocado Toast', description: 'Fresh and healthy', price: 460, category: 'savory', image: 'images/avacado.jpg' },
    { id: 16, name: 'Chicken Sandwich', description: 'Hearty and delicious', price: 500, category: 'savory', image: 'images/sand.jpg' },
];

function renderMenuItems(category = 'all') {
    const menuItemsContainer = document.getElementById('menu-items');
    if (!menuItemsContainer) return;

    menuItemsContainer.innerHTML = '';

    const filteredItems = category === 'all' ? menuItems : menuItems.filter(item => item.category === category);

    filteredItems.forEach(item => {
        const menuItem = document.createElement('div');
        menuItem.classList.add('menu-item');
        menuItem.innerHTML = `
            <img src="${item.image}" alt="${item.name}">
            <div class="menu-item-content">
                <h3>${item.name}</h3>
                <p>${item.description}</p>
                <p class="price">₹${item.price.toFixed(2)}</p>
                <button class="add-to-cart-btn" data-item='${JSON.stringify(item)}'>Add to Cart</button>
            </div>
        `;
        menuItemsContainer.appendChild(menuItem);
    });

    // Add event listeners to all "Add to Cart" buttons
    const addToCartButtons = document.querySelectorAll('.add-to-cart-btn');
    addToCartButtons.forEach(button => {
        button.addEventListener('click', function() {
            const item = JSON.parse(this.getAttribute('data-item'));
            window.addToCart(item);
        });
    });
}

document.addEventListener('DOMContentLoaded', () => {
    renderMenuItems();

    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            renderMenuItems(button.dataset.filter);
        });
    });
});
