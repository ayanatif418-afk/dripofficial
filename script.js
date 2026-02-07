// ============================================
// DRIP — INDUSTRIAL ROYALTY JAVASCRIPT
// ============================================

// CART STATE (GLOBAL)
window.cart = JSON.parse(localStorage.getItem('dripCart')) || [];

// ============================================
// NAVBAR SCROLL & MENU OVERLAY
// ============================================
const navbar = document.getElementById('navbar');
const menuBtn = document.getElementById('menuBtn');
const menuOverlay = document.getElementById('menuOverlay');
const closeMenu = document.getElementById('closeMenu');

// Scroll Effect
window.addEventListener('scroll', () => {
    if (window.pageYOffset > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Menu Toggle Logic
function toggleMenu() {
    const isActive = menuOverlay.classList.contains('active');

    if (isActive) {
        menuOverlay.classList.remove('active');
        document.body.style.overflow = ''; // Restore scrolling
    } else {
        menuOverlay.classList.add('active');
        document.body.style.overflow = 'hidden'; // Lock scrolling
    }
}

if (menuBtn && closeMenu) {
    menuBtn.addEventListener('click', toggleMenu);
    closeMenu.addEventListener('click', toggleMenu);

    // Close menu when clicking a link
    const menuLinks = document.querySelectorAll('.menu-link');
    menuLinks.forEach(link => {
        link.addEventListener('click', toggleMenu);
    });
}

// ============================================
// CART FUNCTIONALITY (GLOBAL)
// ============================================
const cartBtn = document.getElementById('cartBtn');
const cartDropdown = document.getElementById('cartDropdown');
const closeCart = document.getElementById('closeCart');
const cartCount = document.getElementById('cartCount');
const cartItems = document.getElementById('cartItems');
const cartTotal = document.getElementById('cartTotal');

function toggleCart() {
    cartDropdown.classList.toggle('active');
}

if (cartBtn) cartBtn.addEventListener('click', toggleCart);
if (closeCart) closeCart.addEventListener('click', toggleCart);

// Checkout Redirection
const checkoutBtn = document.getElementById('checkoutBtn');
if (checkoutBtn) {
    checkoutBtn.addEventListener('click', () => {
        window.location.href = 'checkout.html';
    });
}

// Close cart when clicking outside
document.addEventListener('click', (e) => {
    if (cartDropdown && cartBtn && !cartDropdown.contains(e.target) && !cartBtn.contains(e.target)) {
        cartDropdown.classList.remove('active');
    }
});

window.updateCart = function () {
    if (!cartCount) return;

    cartCount.textContent = cart.length;

    if (cart.length === 0) {
        cartItems.innerHTML = '<p class="empty-cart">Your vault is empty</p>';
    } else {
        cartItems.innerHTML = cart.map(item => `
            <div class="cart-item">
                <img src="${item.image}" alt="${item.name}" class="cart-item-image">
                <div class="cart-item-info">
                    <p class="cart-item-name">${item.name}</p>
                    <p class="cart-item-price">Rs. ${item.price.toLocaleString()}</p>
                    <p class="cart-item-quantity">Qty: ${item.quantity}</p>
                </div>
            </div>
        `).join('');
    }

    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    cartTotal.textContent = `Rs. ${total.toLocaleString()}`;
}

window.addToVaultGlobal = function (product, btnElement) {
    if (!product) return;

    const existingItem = cart.find(item => item.id === product.id);

    if (existingItem) {
        // existingItem.quantity += 1; // Optional: Increment or just warn it's already secured
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            quantity: 1
        });
    }

    localStorage.setItem('dripCart', JSON.stringify(cart));
    updateCart();

    // VISUALS: Snap Animation & Haptic
    if (btnElement) {
        // Haptic feedback (Mobile)
        if (navigator.vibrate) navigator.vibrate(200);

        // Snap Scale Animation
        btnElement.style.transform = 'scale(1.1)';
        setTimeout(() => {
            btnElement.style.transform = 'scale(1)';
        }, 150);

        // Update Text/Icon
        btnElement.innerHTML = '<span style="font-size: 14px;">🔒</span> SECURED';
        btnElement.style.borderColor = 'var(--empire-gold)';
        btnElement.style.color = 'var(--empire-gold)';
        btnElement.classList.add('vault-locked');
    }

    // Refresh all buttons on page
    updateVaultVisuals();

    // Show Cart
    cartDropdown.classList.add('active');
    setTimeout(() => {
        cartDropdown.classList.remove('active');
    }, 2500);
}

window.updateVaultVisuals = function () {
    const buttons = document.querySelectorAll('.btn-add-cart');
    buttons.forEach(btn => {
        const productId = parseInt(btn.dataset.product);
        const isInCart = cart.some(item => item.id === productId);

        if (isInCart) {
            btn.innerHTML = '<span style="font-size: 14px;">🔒</span> SECURED';
            btn.style.borderColor = 'var(--empire-gold)';
            btn.style.color = 'var(--empire-gold)';
            btn.classList.add('vault-locked');
        } else {
            btn.innerHTML = 'ADD TO VAULT';
            btn.style.borderColor = '';
            btn.style.color = '';
            btn.classList.remove('vault-locked');
        }
    });
}

// ============================================
// MODAL LOGIC (GLOBAL)
// ============================================
window.openModal = function (productId) {
    if (!window.allProducts) return;
    const product = allProducts.find(p => p.id === productId);
    if (!product) return;

    const modal = document.getElementById('quickViewModal');
    if (!modal) return;

    // Populate Modal
    const modalImage = document.getElementById('modalImage');
    const modalName = document.getElementById('modalName');
    const modalPrice = document.getElementById('modalPrice');
    const modalDesc = document.getElementById('modalDesc');
    const modalSpecs = document.getElementById('modalSpecs');

    if (modalImage) modalImage.src = product.image;
    if (modalName) modalName.textContent = product.name;
    if (modalPrice) modalPrice.textContent = `Rs. ${product.price.toLocaleString()}`;
    if (modalDesc) modalDesc.textContent = product.desc;

    if (modalSpecs) {
        modalSpecs.innerHTML = `
            <p>ITEM ID: ${product.specs.id}</p>
            <p>FABRIC: ${product.specs.fabric}</p>
            <p>WEIGHT: ${product.specs.weight}</p>
            <p>FINISH: ${product.specs.finish}</p>
            <p>FIT: ${product.specs.fit}</p>
        `;
    }

    modal.classList.add('active');
    modal.dataset.productId = productId;
}

window.closeModalFunc = function () {
    const modal = document.getElementById('quickViewModal');
    if (modal) modal.classList.remove('active');
}

// Global Click Listeners for Buttons
document.addEventListener('click', (e) => {
    // Quick View
    if (e.target.classList.contains('btn-quick-view')) {
        const productId = parseInt(e.target.dataset.product);
        openModal(productId);
    }

    // Add to Vault (Global)
    if (e.target.classList.contains('btn-add-cart')) {
        const productId = parseInt(e.target.dataset.product);
        const product = allProducts.find(p => p.id === productId);
        if (product && window.addToVaultGlobal) {
            window.addToVaultGlobal(product, e.target);
        }
    }
});

// Close Quick View Listeners
document.addEventListener('DOMContentLoaded', () => {
    const closeBtn = document.getElementById('closeModal');
    if (closeBtn) closeBtn.addEventListener('click', closeModalFunc);

    const qvModal = document.getElementById('quickViewModal');
    if (qvModal) {
        qvModal.addEventListener('click', (e) => {
            if (e.target === qvModal) closeModalFunc();
        });
    }
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModalFunc();
});

// Policy Modal Tabs
window.openPolicyTab = function (evt, policyName) {
    const texts = document.querySelectorAll('.policy-text');
    texts.forEach(t => t.classList.remove('active'));

    const tabs = document.querySelectorAll('.policy-tab-btn');
    tabs.forEach(t => t.classList.remove('active'));

    document.getElementById(policyName).classList.add('active');
    evt.currentTarget.classList.add('active');
}

window.openPolicyModal = function (tabName = 'returns') {
    const modal = document.getElementById('policiesModal');
    if (modal) {
        modal.classList.add('active');
        const btn = document.querySelector(`.policy-tab-btn[onclick*="'${tabName}'"]`);
        if (btn) btn.click();
    }
}

window.closePolicyModal = function () {
    const modal = document.getElementById('policiesModal');
    if (modal) modal.classList.remove('active');
}

window.openSizeModal = function () {
    const modal = document.getElementById('sizeChartModal');
    if (modal) modal.classList.add('active');
}

window.closeSizeModal = function () {
    const modal = document.getElementById('sizeChartModal');
    if (modal) modal.classList.remove('active');
}

// Close on outside click
window.onclick = function (event) {
    if (event.target.classList.contains('glass-modal')) {
        event.target.classList.remove('active');
    }
}


// ============================================
// QUICK BUY FLOW (GLOBAL)
// ============================================
window.startQuickBuyFlow = function (productName) { // Simplified to just use name/generic for now or object
    // 1. Close Quick View if open
    if (quickViewModal) quickViewModal.classList.remove('active');

    // 2. Open Processing Modal
    const processModal = document.getElementById('processingModal');
    const progressBar = document.getElementById('orderProgressBar');

    if (processModal && progressBar) {
        processModal.classList.add('active');

        // Reset Bar
        progressBar.style.width = '0%';
        progressBar.style.transition = 'width 0s';

        // Start Animation
        setTimeout(() => {
            progressBar.style.transition = 'width 2.5s cubic-bezier(0.22, 1, 0.36, 1)';
            progressBar.style.width = '100%';
        }, 100);

        // 3. Redirect to Checkout
        setTimeout(() => {
            processModal.classList.remove('active');
            window.location.href = `checkout.html?quickbuy=${encodeURIComponent(productName)}`;
        }, 2800);
    }
}


// ============================================
// WHATSAPP
// ============================================
const whatsappNumber = '923352723423';

const whatsappBtn = document.getElementById('whatsappCheckout');
if (whatsappBtn) {
    whatsappBtn.addEventListener('click', () => {
        if (cart.length === 0) {
            alert('Your vault is empty');
            return;
        }

        let message = 'Hello! I want to order:\n\n';
        cart.forEach(item => {
            message += `${item.name} x${item.quantity} - Rs. ${(item.price * item.quantity).toLocaleString()}\n`;
        });

        const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        message += `\nTotal: Rs. ${total.toLocaleString()}`;

        const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
        window.open(whatsappUrl, '_blank');
    });
}
// Note: modalWhatsapp listener is handled in products.js or below if global

// ============================================
// LEGACY HOMEPAGE LOGIC (HERO, FEATURED, TYPEWRITER)
// ============================================
// Only run if elements exist

// HERO SLIDER
const slides = document.querySelectorAll('.hero-slide');
const heroButtons = document.querySelectorAll('.hero-btn');

if (slides.length > 0) {
    heroButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const slideIndex = parseInt(btn.dataset.slide);
            slides.forEach(slide => slide.classList.remove('active'));
            slides[slideIndex].classList.add('active');
        });
    });
}

// FEATURED CAROUSEL
const carousel = document.getElementById('carousel');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

if (prevBtn && nextBtn && carousel) {
    prevBtn.addEventListener('click', () => carousel.scrollBy({ left: -380, behavior: 'smooth' }));
    nextBtn.addEventListener('click', () => carousel.scrollBy({ left: 380, behavior: 'smooth' }));
}

// TYPEWRITER
const typeElement = document.getElementById('typewriterText');
if (typeElement) {
    const typewriterText = "I built DRIP from a frustration with weightless fashion—clothes that look loud but mean nothing. I wanted something heavier, something that feels earned. Every piece comes from the idea that what you wear should carry presence, like armor. DRIP is my vision of streetwear stripped of shortcuts: real fabric, deliberate washes, and designs made to last beyond trends. This is for those who move with intent, who don’t follow noise, and who understand that quality is power. DRIP isn’t worn—it’s claimed.";
    const typeSpeed = 20;
    const pauseSpeed = 600;
    let i = 0;

    function typeWriter() {
        if (i < typewriterText.length) {
            const char = typewriterText.charAt(i);
            typeElement.textContent += char;
            let delay = (char === '.' || char === '—' || char === ':') ? pauseSpeed : typeSpeed;
            i++;
            setTimeout(typeWriter, delay);
        }
    }

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                typeElement.textContent = '';
                i = 0;
                typeWriter();
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });

    const manifestSection = document.getElementById('manifest');
    if (manifestSection) observer.observe(manifestSection);
}

// ============================================
// INITIALIZATION
// ============================================
window.addEventListener('scroll', () => {
    // Mobile product toggle logic (legacy) removed/simplified or kept if needed. 
    // keeping purely mostly global mechanics here.
});

// Initialize Cart Visuals on Load
document.addEventListener('DOMContentLoaded', () => {
    updateCart();
    updateVaultVisuals();
});

// Fade In
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
});
