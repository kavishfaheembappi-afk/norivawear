// ==================== VARIABLES ====================
let cart = [];
let cartCount = 0;
let cartTotal = 0;

// ==================== MOBILE MENU ====================
function toggleMobileMenu() {
    const menu = document.getElementById('mobile-menu');
    menu.classList.toggle('active');
}

// ==================== CART FUNCTIONS ====================
function addToCart(productName = 'Classic Tee', price = 34.99) {
    // Add item to cart array
    cart.push({
        name: productName,
        price: price
    });
    
    // Update cart count
    cartCount++;
    document.getElementById('cart-badge').textContent = cartCount;
    
    // Update cart total
    cartTotal += price;
    document.getElementById('cart-total').textContent = '$' + cartTotal.toFixed(2);
    
    // Update cart items display
    renderCartItems();
    
    // Show notification
    showNotification(`Added ${productName} to bag!`);
    
    // If cart is closed, open it briefly
    const sidebar = document.getElementById('cart-sidebar');
    if (!sidebar.classList.contains('open')) {
        toggleCart();
    }
}

function renderCartItems() {
    const cartItemsContainer = document.getElementById('cart-items');
    
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p class="empty-cart">Your bag is empty.</p>';
        return;
    }
    
    cartItemsContainer.innerHTML = cart.map((item, index) => `
        <div class="cart-item">
            <div class="cart-item-info">
                <h4>${item.name}</h4>
                <span class="cart-item-price">$${item.price.toFixed(2)}</span>
            </div>
            <button class="remove-btn" onclick="removeFromCart(${index})">
                <i class="fa-solid fa-trash"></i>
            </button>
        </div>
    `).join('');
}

function removeFromCart(index) {
    // Remove item from cart
    const removedItem = cart[index];
    cart.splice(index, 1);
    
    // Update cart count
    cartCount--;
    document.getElementById('cart-badge').textContent = cartCount;
    
    // Update cart total
    cartTotal -= removedItem.price;
    document.getElementById('cart-total').textContent = '$' + cartTotal.toFixed(2);
    
    // Update display
    renderCartItems();
    
    showNotification('Item removed from bag');
}

function toggleCart() {
    const sidebar = document.getElementById('cart-sidebar');
    const overlay = document.getElementById('cart-overlay');
    const body = document.body;
    
    sidebar.classList.toggle('open');
    overlay.classList.toggle('open');
    
    if (sidebar.classList.contains('open')) {
        body.style.overflow = 'hidden';
    } else {
        body.style.overflow = 'auto';
    }
}

function showNotification(message) {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.innerHTML = `
        <i class="fa-solid fa-check-circle"></i>
        <span>${message}</span>
    `;
    
    // Add styles dynamically
    notification.style.cssText = `
        position: fixed;
        bottom: 30px;
        left: 50%;
        transform: translateX(-50%);
        background: linear-gradient(135deg, #8b5cf6, #ec4899);
        color: white;
        padding: 15px 25px;
        border-radius: 50px;
        display: flex;
        align-items: center;
        gap: 10px;
        z-index: 2000;
        animation: slideUp 0.3s ease, fadeOut 0.3s ease 2.7s forwards;
        font-weight: 600;
        box-shadow: 0 10px 30px rgba(139, 92, 246, 0.4);
    `;
    
    document.body.appendChild(notification);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// ==================== NAVBAR SCROLL EFFECT ====================
window.addEventListener('scroll', () => {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// ==================== ANIMATIONS ON SCROLL ====================
const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
        }
    });
}, observerOptions);

// Observe elements
document.querySelectorAll('.product-card, .custom-wrapper, .insta-post').forEach(el => {
    observer.observe(el);
});

// ==================== ADD KEYFRAME ANIMATIONS ====================
const style = document.createElement('style');
style.textContent = `
    @keyframes slideUp {
        from {
            transform: translateX(-50%) translateY(20px);
            opacity: 0;
        }
        to {
            transform: translateX(-50%) translateY(0);
            opacity: 1;
        }
    }
    
    @keyframes fadeOut {
        from {
            opacity: 1;
        }
        to {
            opacity: 0;
        }
    }
    
    .product-card, .custom-wrapper, .insta-post {
        opacity: 0;
        transform: translateY(30px);
        transition: all 0.6s ease;
    }
    
    .product-card.animate, .custom-wrapper.animate, .insta-post.animate {
        opacity: 1;
        transform: translateY(0);
    }
`;
document.head.appendChild(style);

// ==================== NEWSLETTER FORM ====================
document.querySelector('.newsletter-form')?.addEventListener('submit', function(e) {
    e.preventDefault();
    const email = this.querySelector('input').value;
    
    if (email) {
        showNotification('Thanks for subscribing!');
        this.reset();
    }
});

// ==================== SMOOTH REVEAL ON LOAD ====================
window.addEventListener('load', () => {
    document.body.style.opacity = '1';
});

document.body.style.opacity = '0';
document.body.style.transition = 'opacity 0.5s ease';