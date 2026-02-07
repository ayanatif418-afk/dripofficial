// ============================================
// DRIP — PRODUCTS PAGE JAVASCRIPT (CLEAN)
// ============================================

// window.allProducts is provided by data.js
let filteredProducts = [...allProducts];

let activeFilters = {
    collection: [],
    weight: [],
    fit: [],
    price: [],
    availability: []
};

// ============================================
// RENDER PRODUCTS
// ============================================
function renderProducts(products) {
    const productGrid = document.getElementById('productGrid');
    const productCount = document.getElementById('productCount');

    if (productCount) {
        productCount.textContent = `Showing ${products.length} Products`;
    }

    if (!productGrid) return;

    if (products.length === 0) {
        productGrid.innerHTML = '<p style="grid-column: 1/-1; text-align: center; padding: 60px; color: var(--concrete-grey);">No products match your filters</p>';
        return;
    }

    productGrid.innerHTML = products.map(product => `
        <div class="product-card-large group" data-id="${product.id}">
            <div class="product-image-container">
                <div class="product-badge">${product.badge}</div>
                <img src="${product.image}" alt="${product.name}" class="img-front">
                <img src="${product.imageBack}" alt="${product.name} Back" class="img-back">
            </div>
            <div class="product-info">
                <h3 class="product-name">${product.name}</h3>
                <p class="product-price">Rs. ${product.price.toLocaleString()}</p>
                <p class="product-spec">${product.weight.toUpperCase()} · ${product.fit.toUpperCase()}</p>
            </div>
            <div class="product-actions">
                <button class="btn-quick-view" data-product="${product.id}">QUICK VIEW</button>
                <button class="btn-add-cart" data-product="${product.id}">ADD TO VAULT</button>
            </div>
        </div>
    `).join('');
}

// ============================================
// FILTERING LOGIC
// ============================================
function applyFilters() {
    filteredProducts = allProducts.filter(product => {
        // Collection filter
        if (activeFilters.collection.length > 0 && !activeFilters.collection.includes(product.collection)) {
            return false;
        }

        // Weight filter
        if (activeFilters.weight.length > 0 && !activeFilters.weight.includes(product.weight)) {
            return false;
        }

        // Fit filter
        if (activeFilters.fit.length > 0 && !activeFilters.fit.includes(product.fit)) {
            return false;
        }

        // Price filter
        if (activeFilters.price.length > 0) {
            const priceMatch = activeFilters.price.some(range => {
                if (range === '0-3000') return product.price < 3000;
                if (range === '3000-5000') return product.price >= 3000 && product.price < 5000;
                if (range === '5000-8000') return product.price >= 5000 && product.price < 8000;
                if (range === '8000+') return product.price >= 8000;
                return false;
            });
            if (!priceMatch) return false;
        }

        // Availability filter
        if (activeFilters.availability.length > 0 && !activeFilters.availability.includes(product.availability)) {
            return false;
        }

        return true;
    });

    renderProducts(filteredProducts);
}

// Filter checkboxes
document.querySelectorAll('.filter-option input[type="checkbox"]').forEach(checkbox => {
    checkbox.addEventListener('change', (e) => {
        const filterType = e.target.name;
        const filterValue = e.target.value;

        if (e.target.checked) {
            activeFilters[filterType].push(filterValue);
        } else {
            activeFilters[filterType] = activeFilters[filterType].filter(v => v !== filterValue);
        }

        applyFilters();
    });
});

// Clear filters
const clearBtn = document.getElementById('clearFilters');
if (clearBtn) {
    clearBtn.addEventListener('click', () => {
        document.querySelectorAll('.filter-option input[type="checkbox"]').forEach(cb => cb.checked = false);
        activeFilters = {
            collection: [],
            weight: [],
            fit: [],
            price: [],
            availability: []
        };
        applyFilters();
    });
}

// Filter toggles
document.querySelectorAll('.filter-toggle').forEach(toggle => {
    toggle.addEventListener('click', (e) => {
        const filterGroup = e.target.closest('.filter-group');
        if (filterGroup) filterGroup.classList.toggle('collapsed');
    });
});

// ============================================
// SORTING
// ============================================
const sortSelect = document.getElementById('sortSelect');
if (sortSelect) {
    sortSelect.addEventListener('change', (e) => {
        const sortValue = e.target.value;

        switch (sortValue) {
            case 'price-low':
                filteredProducts.sort((a, b) => a.price - b.price);
                break;
            case 'price-high':
                filteredProducts.sort((a, b) => b.price - a.price);
                break;
            case 'name-az':
                filteredProducts.sort((a, b) => a.name.localeCompare(b.name));
                break;
            case 'name-za':
                filteredProducts.sort((a, b) => b.name.localeCompare(a.name));
                break;
            default:
                filteredProducts = [...allProducts];
        }

        renderProducts(filteredProducts);
    });
}

// ============================================
// INITIAL LOAD & VAULT PERSISTENCE
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    renderProducts(filteredProducts);
    if (window.updateVaultVisuals) window.updateVaultVisuals();
});

// Sync visual states for "Add to Vault" buttons
window.updateVaultVisuals = function () {
    const buttons = document.querySelectorAll('.btn-add-cart');
    const cartItems = JSON.parse(localStorage.getItem('vault_cart')) || [];

    buttons.forEach(btn => {
        const productId = parseInt(btn.dataset.product);
        const isInCart = cartItems.some(item => item.id === productId);

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
// MODAL LOGIC (POLICIES & SIZES)
// ============================================
window.openPolicyTab = function (evt, policyName) {
    const texts = document.querySelectorAll('.policy-text');
    texts.forEach(t => t.classList.remove('active'));

    const tabs = document.querySelectorAll('.policy-tab-btn');
    tabs.forEach(t => t.classList.remove('active'));

    const targetText = document.getElementById(policyName);
    if (targetText) targetText.classList.add('active');
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

// Event Listeners for Checkout flow
const modalQuickBuy = document.getElementById('modalQuickBuy');
if (modalQuickBuy) {
    modalQuickBuy.addEventListener('click', () => {
        const modal = document.getElementById('quickViewModal');
        if (!modal) return;
        const productId = parseInt(modal.dataset.productId);
        const product = allProducts.find(p => p.id === productId);
        if (product && window.startQuickBuyFlow) window.startQuickBuyFlow(product.name);
    });
}

const modalWhatsapp = document.getElementById('modalWhatsapp');
if (modalWhatsapp) {
    modalWhatsapp.addEventListener('click', () => {
        const nameEl = document.getElementById('modalName');
        if (!nameEl) return;
        const name = nameEl.textContent;
        const message = `I want to inquire about: ${name}`;
        window.open(`https://wa.me/923352723423?text=${encodeURIComponent(message)}`, '_blank');
    });
}
