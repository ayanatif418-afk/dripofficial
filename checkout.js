document.addEventListener('DOMContentLoaded', () => {
    const checkoutItems = document.getElementById('checkoutItems');
    const summarySubtotal = document.getElementById('summarySubtotal');
    const summaryShipping = document.getElementById('summaryShipping');
    const summaryTotal = document.getElementById('summaryTotal');
    const freeShippingNotice = document.getElementById('freeShippingNotice');
    const suggestionItems = document.getElementById('suggestionItems');
    const placeOrderBtn = document.getElementById('placeOrderBtn');

    function renderCheckout() {
        // Handle QuickBuy param if coming from a direct buy action
        const urlParams = new URLSearchParams(window.location.search);
        const quickBuyName = urlParams.get('quickbuy');

        let cart = JSON.parse(localStorage.getItem('dripCart')) || [];

        if (quickBuyName && window.allProducts) {
            const product = allProducts.find(p => p.name === quickBuyName);
            if (product && !cart.some(item => item.id === product.id)) {
                cart.push({
                    id: product.id,
                    name: product.name,
                    price: product.price,
                    image: product.image,
                    quantity: 1,
                    size: 'M'
                });
                localStorage.setItem('dripCart', JSON.stringify(cart));
                // Clear the param so it doesn't re-add on refresh
                window.history.replaceState({}, document.title, window.location.pathname);
            }
        }

        if (cart.length === 0) {
            checkoutItems.innerHTML = '<p class="empty-cart" style="text-align: center; padding: 40px; color: var(--concrete-grey);">Your vault is empty. Return to the store to secure pieces.</p>';
            updateTotals(0);
            return;
        }

        checkoutItems.innerHTML = cart.map((item, index) => `
            <div class="order-item">
                <img src="${item.image}" alt="${item.name}" class="order-item-img">
                <div class="order-item-info">
                    <h4 class="order-item-name">${item.name}</h4>
                    <p class="order-item-price">Rs. ${item.price.toLocaleString()}</p>
                    <select class="size-selector-mini" onchange="updateItemSize(${index}, this.value)">
                        <option value="S" ${item.size === 'S' ? 'selected' : ''}>SIZE: S</option>
                        <option value="M" ${item.size === 'M' ? 'selected' : ''}>SIZE: M</option>
                        <option value="L" ${item.size === 'L' ? 'selected' : ''}>SIZE: L</option>
                        <option value="XL" ${item.size === 'XL' ? 'selected' : ''}>SIZE: XL</option>
                    </select>
                </div>
                <div style="text-align: right;">
                    <p style="font-size: 11px; opacity: 0.5;">QTY: ${item.quantity}</p>
                    <button onclick="removeFromCheckout(${index})" style="color: var(--urgency-red); font-size: 10px; margin-top: 10px; text-decoration: underline;">REMOVE</button>
                </div>
            </div>
        `).join('');

        const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        updateTotals(subtotal);
        renderSuggestions(cart);
    }

    function updateTotals(subtotal) {
        const shipping = subtotal >= 5000 || subtotal === 0 ? 0 : 200;
        const total = subtotal + shipping;

        summarySubtotal.textContent = `Rs. ${subtotal.toLocaleString()}`;
        summaryShipping.textContent = subtotal === 0 ? 'Rs. 0' : (shipping === 0 ? 'FREE' : `Rs. ${shipping}`);
        summaryTotal.textContent = `Rs. ${total.toLocaleString()}`;

        if (subtotal >= 5000) {
            freeShippingNotice.style.display = 'block';
            summaryShipping.style.color = 'var(--empire-gold)';
        } else {
            freeShippingNotice.style.display = 'none';
            summaryShipping.style.color = '';
        }
    }

    function renderSuggestions(cart) {
        if (!window.allProducts) return;

        // Find products not in cart
        const cartIds = cart.map(item => item.id);
        const availableSuggestions = allProducts.filter(p => !cartIds.includes(p.id));

        // Shuffle and pick 2
        const shuffled = availableSuggestions.sort(() => 0.5 - Math.random());
        const selected = shuffled.slice(0, 2);

        suggestionItems.innerHTML = selected.map(product => `
            <div class="suggestion-card">
                <img src="${product.image}" alt="${product.name}" class="suggestion-img">
                <h4 class="suggestion-name">${product.name}</h4>
                <p style="color: var(--empire-gold); font-weight: 700; font-size: 12px;">Rs. ${product.price.toLocaleString()}</p>
                <button class="btn-add-mini" onclick="addSuggestionToCheckout(${product.id})">+ ADD TO ORDER</button>
            </div>
        `).join('');
    }

    // EXPOSE TO WINDOW FOR ONCLICK ATTRIBUTES
    window.updateItemSize = (index, size) => {
        const cart = JSON.parse(localStorage.getItem('dripCart')) || [];
        cart[index].size = size;
        localStorage.setItem('dripCart', JSON.stringify(cart));
        // No need to re-render everything unless visuals change significantly
    };

    window.removeFromCheckout = (index) => {
        const cart = JSON.parse(localStorage.getItem('dripCart')) || [];
        cart.splice(index, 1);
        localStorage.setItem('dripCart', JSON.stringify(cart));
        renderCheckout();
        if (window.updateCart) window.updateCart(); // Sync navbar cart if helper exists
    };

    window.addSuggestionToCheckout = (productId) => {
        const product = allProducts.find(p => p.id === productId);
        if (product) {
            const cart = JSON.parse(localStorage.getItem('dripCart')) || [];
            cart.push({
                id: product.id,
                name: product.name,
                price: product.price,
                image: product.image,
                quantity: 1,
                size: 'M' // Default
            });
            localStorage.setItem('dripCart', JSON.stringify(cart));
            renderCheckout();
            if (window.updateCart) window.updateCart();
        }
    };

    if (placeOrderBtn) {
        placeOrderBtn.addEventListener('click', () => {
            const cart = JSON.parse(localStorage.getItem('dripCart')) || [];
            if (cart.length === 0) {
                alert('Your vault is empty.');
                return;
            }

            // Simple validation
            const fields = ['email', 'fName', 'lName', 'address', 'city', 'phone'];
            for (const field of fields) {
                if (!document.getElementById(field).value) {
                    alert(`Please enter your ${field}.`);
                    return;
                }
            }

            alert('ORDER SECURED SUCCESSFULLY!\n\nRedirecting to confirmation...');
            // In a real app, clear cart and redirect
            localStorage.removeItem('dripCart');
            window.location.href = 'index.html';
        });
    }

    renderCheckout();
});
