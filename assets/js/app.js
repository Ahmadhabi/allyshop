// Aylle Shop - Main E-Commerce Application Logic
document.addEventListener("DOMContentLoaded", () => {
  const initialProducts = JSON.parse(localStorage.getItem("aylle_products") || localStorage.getItem("ally_products")) || PRODUCTS_DATA;
  let state = {
    products: initialProducts,
    filteredProducts: initialProducts,
    cart: JSON.parse(localStorage.getItem("aylle_cart") || localStorage.getItem("ally_cart")) || [],
    wishlist: JSON.parse(localStorage.getItem("aylle_wishlist") || localStorage.getItem("ally_wishlist")) || [],
    appliedCoupon: null,
    discountAmount: 0,
    currentCategory: "all",
    searchQuery: "",
    sortBy: "default",
    activeProductForModal: null,
    selectedShadeForModal: null
  };

  const WHATSAPP_PHONE = "923148604291"; // 03148604291 formatted for WhatsApp API
  const STORE_EMAIL = "aylleshopoffical@gmail.com";
  const STORE_EMAIL_ALT = "aylleshopofficial@gmail.com";
  const FREE_SHIPPING_THRESHOLD = 2999;
  const STANDARD_SHIPPING_FEE = 200;

  // DOM Elements
  const productsGrid = document.getElementById("productsGrid");
  const productsCountLabel = document.getElementById("productsCountLabel");
  const catButtons = document.querySelectorAll(".cat-btn");
  const sortSelect = document.getElementById("sortSelect");
  const searchInput = document.getElementById("searchInput");
  const searchClearBtn = document.getElementById("searchClearBtn");

  // Cart Drawer Elements
  const cartToggleBtn = document.getElementById("cartToggleBtn");
  const cartCloseBtn = document.getElementById("cartCloseBtn");
  const cartDrawer = document.getElementById("cartDrawer");
  const drawerBackdrop = document.getElementById("drawerBackdrop");
  const cartBadge = document.getElementById("cartBadge");
  const cartItemsBody = document.getElementById("cartItemsBody");
  const cartSubtotalEl = document.getElementById("cartSubtotal");
  const cartDiscountEl = document.getElementById("cartDiscount");
  const cartDiscountRow = document.getElementById("cartDiscountRow");
  const cartShippingEl = document.getElementById("cartShipping");
  const cartGrandTotalEl = document.getElementById("cartGrandTotal");
  const couponInput = document.getElementById("couponInput");
  const applyCouponBtn = document.getElementById("applyCouponBtn");
  const shippingProgressText = document.getElementById("shippingProgressText");
  const shippingProgressFill = document.getElementById("shippingProgressFill");
  const checkoutCodBtn = document.getElementById("checkoutCodBtn");
  const checkoutWhatsAppBtn = document.getElementById("checkoutWhatsAppBtn");

  // Wishlist Elements
  const wishlistToggleBtn = document.getElementById("wishlistToggleBtn");
  const wishlistCloseBtn = document.getElementById("wishlistCloseBtn");
  const wishlistDrawer = document.getElementById("wishlistDrawer");
  const wishlistBadge = document.getElementById("wishlistBadge");
  const wishlistItemsBody = document.getElementById("wishlistItemsBody");

  // Modals
  const quickViewModal = document.getElementById("quickViewModal");
  const quickViewCloseBtn = document.getElementById("quickViewCloseBtn");
  const quickViewContent = document.getElementById("quickViewContent");

  const checkoutModal = document.getElementById("checkoutModal");
  const checkoutModalCloseBtn = document.getElementById("checkoutModalCloseBtn");
  const checkoutForm = document.getElementById("checkoutForm");
  const checkoutItemsSummary = document.getElementById("checkoutItemsSummary");
  const submitOrderBtn = document.getElementById("submitOrderBtn");

  const successModal = document.getElementById("successModal");
  const successModalCloseBtn = document.getElementById("successModalCloseBtn");
  const successOrderId = document.getElementById("successOrderId");
  const successTotalAmount = document.getElementById("successTotalAmount");
  const successWhatsAppNotifyBtn = document.getElementById("successWhatsAppNotifyBtn");
  const successDirectEmailBtn = document.getElementById("successDirectEmailBtn");
  const emailNotificationBadge = document.getElementById("emailNotificationBadge");
  const emailNotificationText = document.getElementById("emailNotificationText");

  const toastContainer = document.getElementById("toastContainer");

  // ================= 1. Initial Render =================
  function init() {
    renderProducts();
    updateCartUI();
    updateWishlistUI();
    initCountdown();
    setupEventListeners();
  }

  // ================= 2. Render Products =================
  function renderProducts() {
    if (!productsGrid) return;

    let items = [...state.products];

    // Filter by Category
    if (state.currentCategory !== "all") {
      items = items.filter(p => p.category === state.currentCategory);
    }

    // Filter by Search
    if (state.searchQuery.trim() !== "") {
      const q = state.searchQuery.toLowerCase();
      items = items.filter(p => 
        p.name.toLowerCase().includes(q) || 
        p.description.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q)
      );
    }

    // Sort Products
    if (state.sortBy === "price-low") {
      items.sort((a, b) => a.price - b.price);
    } else if (state.sortBy === "price-high") {
      items.sort((a, b) => b.price - a.price);
    } else if (state.sortBy === "rating") {
      items.sort((a, b) => b.rating - a.rating);
    } else if (state.sortBy === "bestseller") {
      items.sort((a, b) => (b.isBestSeller ? 1 : 0) - (a.isBestSeller ? 1 : 0));
    }

    state.filteredProducts = items;

    if (productsCountLabel) {
      productsCountLabel.textContent = `Showing ${items.length} cosmetic items`;
    }

    if (items.length === 0) {
      productsGrid.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 4rem 1rem; color: var(--text-muted);">
          <i class="ph ph-magnifying-glass" style="font-size: 3.5rem; color: #D6C2E6; margin-bottom: 1rem; display: block;"></i>
          <h3 style="font-family: var(--font-heading); color: var(--text-main); font-size: 1.5rem; margin-bottom: 0.5rem;">No cosmetics found</h3>
          <p>Try searching for lipstick, palette, foundation, primer or switch category.</p>
          <button class="btn-primary" style="margin-top: 1.25rem;" onclick="document.getElementById('searchInput').value=''; document.querySelector('.cat-btn[data-category=all]').click();">
            View All Cosmetics
          </button>
        </div>
      `;
      return;
    }

    productsGrid.innerHTML = items.map(p => {
      const isWishlisted = state.wishlist.some(w => w.id === p.id);
      const defaultShade = p.shades && p.shades[0] ? p.shades[0].name : "Standard";

      return `
        <div class="product-card" data-id="${p.id}">
          <div class="product-image-box">
            <img src="${p.image}" alt="${p.name}" loading="lazy" />
            
            <div class="card-badges">
              ${p.discount ? `<span class="badge-pill badge-discount">${p.discount}</span>` : ''}
              ${p.isBestSeller ? `<span class="badge-pill badge-bestseller">⭐ Best Seller</span>` : ''}
              ${p.isNew ? `<span class="badge-pill badge-new">New Arrival</span>` : ''}
            </div>

            <button class="wishlist-toggle-btn ${isWishlisted ? 'active' : ''}" data-id="${p.id}" title="Add to Wishlist">
              <i class="${isWishlisted ? 'ph-fill' : 'ph'} ph-heart"></i>
            </button>

            <div class="quick-view-overlay">
              <button class="btn-quick-view" data-id="${p.id}">
                <i class="ph ph-eye"></i> Quick View
              </button>
            </div>
          </div>

          <div class="product-info">
            <span class="product-category-tag">${formatCategory(p.category)}</span>
            <h4 class="product-title" data-id="${p.id}">${p.name}</h4>

            <div class="shades-row">
              ${p.shades && p.shades.length > 1 ? p.shades.map((s, idx) => `
                <span class="shade-dot ${idx === 0 ? 'active' : ''}" style="background-color: ${s.hex};" title="${s.name}" data-shade="${s.name}"></span>
              `).join('') : '<span style="font-size:0.75rem; color:var(--text-light);">Standard Shade</span>'}
            </div>

            <div class="rating-row">
              <i class="ph-fill ph-star"></i>
              <span>${p.rating.toFixed(1)}</span>
              <span class="reviews-num">(${p.reviewsCount} reviews)</span>
            </div>

            <div class="price-row">
              <span class="current-price">Rs. ${p.price.toLocaleString()}</span>
              ${p.originalPrice ? `<span class="original-price">Rs. ${p.originalPrice.toLocaleString()}</span>` : ''}
            </div>

            <button class="btn-add-cart" data-id="${p.id}" data-shade="${defaultShade}">
              <i class="ph ph-shopping-bag"></i> Add To Cart
            </button>
          </div>
        </div>
      `;
    }).join('');
  }

  function formatCategory(cat) {
    const map = {
      "lips": "💄 Lip Care & Color",
      "eyes": "👁️ Eyes & Brows",
      "face": "✨ Face & Glow",
      "skincare": "🌸 Skincare & Prep",
      "brushes-kits": "👑 Luxury Brushes & Kits",
      "perfumes": "💎 Signature Fragrances"
    };
    return map[cat] || cat;
  }

  // ================= 3. Cart Management =================
  function addToCart(productId, shadeName = null, qty = 1) {
    const product = state.products.find(p => p.id === productId);
    if (!product) return;

    const chosenShade = shadeName || (product.shades && product.shades[0] ? product.shades[0].name : "Standard");
    const cartItemId = `${product.id}-${chosenShade}`;

    const existingIndex = state.cart.findIndex(item => item.cartItemId === cartItemId);
    if (existingIndex > -1) {
      state.cart[existingIndex].quantity += qty;
    } else {
      state.cart.push({
        cartItemId: cartItemId,
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        shade: chosenShade,
        quantity: qty
      });
    }

    saveCart();
    updateCartUI();
    showToast(`Added <strong>${product.name}</strong> (${chosenShade}) to Cart!`);
    openCartDrawer();
  }

  function updateCartItemQty(cartItemId, delta) {
    const itemIndex = state.cart.findIndex(i => i.cartItemId === cartItemId);
    if (itemIndex > -1) {
      state.cart[itemIndex].quantity += delta;
      if (state.cart[itemIndex].quantity <= 0) {
        state.cart.splice(itemIndex, 1);
      }
      saveCart();
      updateCartUI();
    }
  }

  function removeFromCart(cartItemId) {
    state.cart = state.cart.filter(i => i.cartItemId !== cartItemId);
    saveCart();
    updateCartUI();
    showToast("Item removed from your cart.");
  }

  function saveCart() {
    localStorage.setItem("aylle_cart", JSON.stringify(state.cart));
  }

  function updateCartUI() {
    const totalItems = state.cart.reduce((sum, item) => sum + item.quantity, 0);
    if (cartBadge) cartBadge.textContent = totalItems;

    if (!cartItemsBody) return;

    if (state.cart.length === 0) {
      cartItemsBody.innerHTML = `
        <div class="empty-cart-view">
          <i class="ph ph-shopping-cart-simple"></i>
          <h4>Your Shopping Bag is Empty</h4>
          <p>Looks like you haven't added any beauty items yet.</p>
          <button class="btn-primary" style="margin-top: 1.5rem;" onclick="document.getElementById('cartCloseBtn').click();">
            Start Shopping
          </button>
        </div>
      `;
      if (cartSubtotalEl) cartSubtotalEl.textContent = "Rs. 0";
      if (cartDiscountRow) cartDiscountRow.style.display = "none";
      if (cartShippingEl) cartShippingEl.textContent = "Rs. 0";
      if (cartGrandTotalEl) cartGrandTotalEl.textContent = "Rs. 0";
      if (shippingProgressFill) shippingProgressFill.style.width = "0%";
      if (shippingProgressText) shippingProgressText.innerHTML = `Add Rs. ${FREE_SHIPPING_THRESHOLD.toLocaleString()} for <strong>FREE Delivery</strong> across Pakistan!`;
      return;
    }

    cartItemsBody.innerHTML = state.cart.map(item => `
      <div class="cart-item-card">
        <img src="${item.image}" alt="${item.name}" class="cart-item-thumb" />
        <div class="cart-item-details">
          <h5 class="cart-item-title">${item.name}</h5>
          <div class="cart-item-shade">
            <span class="cart-shade-preview" style="background:#6C2EB9;"></span> Shade: <strong>${item.shade}</strong>
          </div>
          <div style="display:flex; justify-content:space-between; align-items:center; margin-top:0.35rem;">
            <div class="cart-qty-ctrl">
              <button class="qty-btn" onclick="window.updateCartQty('${item.cartItemId}', -1)">-</button>
              <span class="qty-num">${item.quantity}</span>
              <button class="qty-btn" onclick="window.updateCartQty('${item.cartItemId}', 1)">+</button>
            </div>
            <span class="cart-item-price">Rs. ${(item.price * item.quantity).toLocaleString()}</span>
          </div>
        </div>
        <button class="btn-remove-item" onclick="window.removeCartItem('${item.cartItemId}')" title="Remove item">
          <i class="ph ph-trash"></i>
        </button>
      </div>
    `).join('');

    // Totals Calculation
    const subtotal = state.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    let discount = 0;

    if (state.appliedCoupon) {
      discount = Math.round((subtotal * state.appliedCoupon.discountPercent) / 100);
      state.discountAmount = discount;
      if (cartDiscountRow) {
        cartDiscountRow.style.display = "flex";
        cartDiscountEl.textContent = `- Rs. ${discount.toLocaleString()}`;
      }
    } else {
      if (cartDiscountRow) cartDiscountRow.style.display = "none";
    }

    const shipping = subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : (subtotal > 0 ? STANDARD_SHIPPING_FEE : 0);
    const grandTotal = Math.max(0, subtotal - discount + shipping);

    if (cartSubtotalEl) cartSubtotalEl.textContent = `Rs. ${subtotal.toLocaleString()}`;
    if (cartShippingEl) cartShippingEl.textContent = shipping === 0 ? "FREE" : `Rs. ${shipping}`;
    if (cartGrandTotalEl) cartGrandTotalEl.textContent = `Rs. ${grandTotal.toLocaleString()}`;

    // Free Shipping Progress
    if (shippingProgressFill && shippingProgressText) {
      const percentage = Math.min(100, Math.round((subtotal / FREE_SHIPPING_THRESHOLD) * 100));
      shippingProgressFill.style.width = `${percentage}%`;
      
      if (subtotal >= FREE_SHIPPING_THRESHOLD) {
        shippingProgressText.innerHTML = `🎉 Congratulations! You have qualified for <strong>FREE Delivery!</strong>`;
      } else {
        const remaining = FREE_SHIPPING_THRESHOLD - subtotal;
        shippingProgressText.innerHTML = `Add <strong>Rs. ${remaining.toLocaleString()}</strong> more for <strong>FREE Delivery</strong> across Pakistan!`;
      }
    }
  }

  // Global Cart Helpers for inline onclicks
  window.updateCartQty = (id, delta) => updateCartItemQty(id, delta);
  window.removeCartItem = (id) => removeFromCart(id);

  function applyPromoCode() {
    const code = (couponInput ? couponInput.value : "").trim().toUpperCase();
    if (!code) {
      showToast("Please enter a promo coupon code.");
      return;
    }

    const coupon = PROMO_COUPONS[code];
    const subtotal = state.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    if (coupon) {
      if (subtotal < coupon.minOrder) {
        showToast(`This coupon requires a minimum cart value of Rs. ${coupon.minOrder.toLocaleString()}`);
        return;
      }
      state.appliedCoupon = coupon;
      updateCartUI();
      showToast(`🎉 Coupon <strong>${code}</strong> applied! You got ${coupon.discountPercent}% OFF.`);
    } else {
      showToast("Invalid discount code. Try AYLLE10 for 10% off!");
    }
  }

  // ================= 4. Direct WhatsApp Order Generator =================
  function buildWhatsAppOrderMessage(customerInfo = null, itemsList = null) {
    const items = itemsList || state.cart;
    if (!items || items.length === 0) return "";

    const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const shipping = subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : STANDARD_SHIPPING_FEE;
    const discount = (customerInfo && customerInfo.discountAmount !== undefined) ? customerInfo.discountAmount : state.discountAmount;
    const grandTotal = (customerInfo && customerInfo.grandTotal) ? customerInfo.grandTotal : Math.max(0, subtotal - discount + shipping);

    let msg = `🌸 *NEW ORDER - AYLLE SHOP* 🌸\n`;
    msg += `----------------------------------------\n`;
    
    if (customerInfo) {
      if (customerInfo.orderId) msg += `🔖 *Tracking ID:* ${customerInfo.orderId}\n`;
      msg += `👤 *Customer Name:* ${customerInfo.name}\n`;
      msg += `📞 *Phone Number:* ${customerInfo.phone}\n`;
      if (customerInfo.email) msg += `📧 *Email:* ${customerInfo.email}\n`;
      msg += `📍 *City:* ${customerInfo.city}\n`;
      msg += `🏠 *Delivery Address:* ${customerInfo.address}\n`;
      if (customerInfo.notes) {
        msg += `📝 *Notes:* ${customerInfo.notes}\n`;
      }
      msg += `💳 *Payment Method:* ${customerInfo.paymentMethod}\n`;
      msg += `----------------------------------------\n`;
    }

    msg += `🛍️ *ORDERED PRODUCTS:*\n`;
    items.forEach((item, i) => {
      msg += `${i + 1}. *${item.name}*\n`;
      msg += `   - Shade: ${item.shade || 'Standard'}\n`;
      msg += `   - Qty: ${item.quantity} x Rs. ${item.price.toLocaleString()}\n`;
      msg += `   - Sub: Rs. ${(item.price * item.quantity).toLocaleString()}\n`;
    });

    msg += `----------------------------------------\n`;
    msg += `Subtotal: Rs. ${subtotal.toLocaleString()}\n`;
    if (discount > 0) {
      msg += `Discount: -Rs. ${discount.toLocaleString()}\n`;
    }
    msg += `Delivery Charges: ${shipping === 0 ? 'FREE' : 'Rs. ' + shipping}\n`;
    msg += `💰 *TOTAL PAYABLE: Rs. ${grandTotal.toLocaleString()}*\n`;
    msg += `----------------------------------------\n`;
    msg += `Please confirm my order. Thank you! ✨`;

    return encodeURIComponent(msg);
  }

  function orderViaWhatsApp() {
    if (state.cart.length === 0) {
      showToast("Your shopping cart is empty!");
      return;
    }

    const encodedMsg = buildWhatsAppOrderMessage();
    const url = `https://wa.me/${WHATSAPP_PHONE}?text=${encodedMsg}`;
    window.open(url, "_blank");
  }

  // ================= 5. Automated Email Notification Dispatch =================
  async function sendOrderEmailNotification(orderData) {
    const itemsFormatted = orderData.items.map((it, idx) => {
      return `${idx + 1}. ${it.name} | Shade: ${it.shade || 'Standard'} | Qty: ${it.quantity} x Rs. ${it.price.toLocaleString()} = Rs. ${(it.price * it.quantity).toLocaleString()}`;
    }).join('\n');

    const payload = {
      _subject: `🛍️ New Order #${orderData.orderId} - ${orderData.customer.name} (Rs. ${orderData.total.toLocaleString()})`,
      _template: "table",
      _captcha: "false",
      _cc: STORE_EMAIL_ALT,
      "Order ID": orderData.orderId,
      "Order Date & Time": new Date().toLocaleString('en-PK', { dateStyle: 'medium', timeStyle: 'short' }),
      "Customer Name": orderData.customer.name,
      "Phone / WhatsApp": orderData.customer.phone,
      "Customer Email": orderData.customer.email || "Not Provided",
      "City": orderData.customer.city,
      "Delivery Address": orderData.customer.address,
      "Payment Method": orderData.customer.paymentMethod,
      "Special Notes / Requests": orderData.customer.notes || "None",
      "-------------------------": "----------------------------------------",
      "Ordered Items Breakdown": itemsFormatted,
      "Subtotal": `Rs. ${orderData.subtotal.toLocaleString()}`,
      "Promo Discount": orderData.discount > 0 ? `- Rs. ${orderData.discount.toLocaleString()}` : "Rs. 0",
      "Delivery Fee": orderData.shipping === 0 ? "FREE (Above Rs. 2,999)" : `Rs. ${orderData.shipping}`,
      "GRAND TOTAL PAYABLE": `Rs. ${orderData.total.toLocaleString()}`,
      "Store Contact": `03148604291 / ${STORE_EMAIL}`
    };

    try {
      const response = await fetch(`https://formsubmit.co/ajax/${STORE_EMAIL}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify(payload)
      });

      const resData = await response.json();
      console.log("FormSubmit email response:", resData);
      return { success: true, data: resData };
    } catch (error) {
      console.warn("Automated email fetch error (fallback enabled):", error);
      return { success: false, error };
    }
  }

  function buildOrderMailtoUrl(orderData) {
    const subject = encodeURIComponent(`Order Details #${orderData.orderId} - Aylle Shop`);
    let body = `Hello Aylle Shop Team,\n\nOrder Confirmation #${orderData.orderId}\n\n`;
    body += `Customer: ${orderData.customer.name}\n`;
    body += `Phone/WhatsApp: ${orderData.customer.phone}\n`;
    if (orderData.customer.email) body += `Email: ${orderData.customer.email}\n`;
    body += `City: ${orderData.customer.city}\n`;
    body += `Address: ${orderData.customer.address}\n`;
    if (orderData.customer.notes) body += `Notes: ${orderData.customer.notes}\n`;
    body += `Payment: ${orderData.customer.paymentMethod}\n\n`;
    body += `--- ORDERED ITEMS ---\n`;
    orderData.items.forEach((it, i) => {
      body += `${i + 1}. ${it.name} (${it.shade || 'Standard'}) - ${it.quantity} x Rs. ${it.price.toLocaleString()}\n`;
    });
    body += `\nSubtotal: Rs. ${orderData.subtotal.toLocaleString()}\n`;
    if (orderData.discount > 0) body += `Discount: -Rs. ${orderData.discount.toLocaleString()}\n`;
    body += `Delivery: ${orderData.shipping === 0 ? 'FREE' : 'Rs. ' + orderData.shipping}\n`;
    body += `Total Payable: Rs. ${orderData.total.toLocaleString()}\n`;

    return `mailto:${STORE_EMAIL}?cc=${STORE_EMAIL_ALT}&subject=${subject}&body=${encodeURIComponent(body)}`;
  }

  // ================= 6. Cash on Delivery (COD) Checkout =================
  function openCheckoutModal() {
    if (state.cart.length === 0) {
      showToast("Please add cosmetics to your cart first!");
      return;
    }

    closeCartDrawer();

    const subtotal = state.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const shipping = subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : STANDARD_SHIPPING_FEE;
    const grandTotal = Math.max(0, subtotal - state.discountAmount + shipping);

    if (checkoutItemsSummary) {
      checkoutItemsSummary.innerHTML = `
        <div style="background: var(--primary-light); padding: 1rem; border-radius: var(--radius-md); margin-bottom: 1.25rem;">
          <div style="display:flex; justify-content:space-between; font-weight:700; margin-bottom:0.4rem;">
            <span>Items in Bag (${state.cart.length}):</span>
            <span>Rs. ${subtotal.toLocaleString()}</span>
          </div>
          ${state.discountAmount > 0 ? `
            <div style="display:flex; justify-content:space-between; color:var(--secondary); font-size:0.85rem; margin-bottom:0.25rem;">
              <span>Discount:</span>
              <span>- Rs. ${state.discountAmount.toLocaleString()}</span>
            </div>
          ` : ''}
          <div style="display:flex; justify-content:space-between; font-size:0.85rem; color:var(--text-muted); margin-bottom:0.4rem;">
            <span>Delivery:</span>
            <span>${shipping === 0 ? 'FREE' : 'Rs. ' + shipping}</span>
          </div>
          <div style="display:flex; justify-content:space-between; font-weight:800; font-size:1.1rem; color:var(--primary); border-top:1px solid rgba(108,46,185,0.2); padding-top:0.4rem;">
            <span>Grand Total:</span>
            <span>Rs. ${grandTotal.toLocaleString()}</span>
          </div>
        </div>
      `;
    }

    checkoutModal.classList.add("active");
  }

  async function handleCheckoutSubmit(e) {
    e.preventDefault();

    const name = document.getElementById("orderName").value.trim();
    const phone = document.getElementById("orderPhone").value.trim();
    const email = document.getElementById("orderEmail") ? document.getElementById("orderEmail").value.trim() : "";
    const city = document.getElementById("orderCity").value.trim();
    const address = document.getElementById("orderAddress").value.trim();
    const notes = document.getElementById("orderNotes") ? document.getElementById("orderNotes").value.trim() : "";
    const paymentMethod = document.querySelector('input[name="paymentMethod"]:checked') ? document.querySelector('input[name="paymentMethod"]:checked').value : "Cash on Delivery (COD)";

    if (!name || !phone || !city || !address) {
      showToast("Please fill all mandatory delivery details.");
      return;
    }

    // Disable button & indicate progress
    if (submitOrderBtn) {
      submitOrderBtn.disabled = true;
      submitOrderBtn.innerHTML = `<i class="ph-bold ph-spinner spin-icon"></i> Placing Order & Sending Notification...`;
    }

    const orderId = `AYLLE-${Math.floor(100000 + Math.random() * 900000)}`;
    const subtotal = state.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const shipping = subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : STANDARD_SHIPPING_FEE;
    const discountAmount = state.discountAmount;
    const grandTotal = Math.max(0, subtotal - discountAmount + shipping);
    const orderedItems = [...state.cart];

    const customerInfo = { name, phone, email, city, address, notes, paymentMethod, orderId, grandTotal, discountAmount };

    const orderRecord = {
      orderId,
      date: new Date().toLocaleDateString(),
      items: orderedItems,
      customer: customerInfo,
      subtotal,
      discount: discountAmount,
      shipping,
      total: grandTotal
    };

    // Save recent order locally
    const orderHistory = JSON.parse(localStorage.getItem("aylle_orders") || localStorage.getItem("ally_orders") || "[]");
    orderHistory.push(orderRecord);
    localStorage.setItem("aylle_orders", JSON.stringify(orderHistory));

    // Clear Cart
    state.cart = [];
    state.appliedCoupon = null;
    state.discountAmount = 0;
    saveCart();
    updateCartUI();

    // Send Real-time Email Notification
    const emailResult = await sendOrderEmailNotification(orderRecord);

    // Re-enable button
    if (submitOrderBtn) {
      submitOrderBtn.disabled = false;
      submitOrderBtn.innerHTML = `<i class="ph-bold ph-check-circle"></i> Place Cash on Delivery Order`;
    }

    checkoutModal.classList.remove("active");

    // Configure and Show Success Modal
    if (successOrderId) successOrderId.textContent = orderId;
    if (successTotalAmount) successTotalAmount.textContent = `Rs. ${grandTotal.toLocaleString()}`;

    if (emailNotificationText) {
      if (emailResult.success && emailResult.data && emailResult.data.message && emailResult.data.message.includes('Activation')) {
        emailNotificationText.innerHTML = `Dispatched! First-time setup: Check Gmail inbox to click 'Activate Form'.`;
      } else if (emailResult.success) {
        emailNotificationText.innerHTML = `Notification sent to: <strong>${STORE_EMAIL}</strong>`;
      } else {
        emailNotificationText.innerHTML = `Order recorded! Direct email backup available below.`;
      }
    }

    if (successDirectEmailBtn) {
      successDirectEmailBtn.href = buildOrderMailtoUrl(orderRecord);
    }

    if (successWhatsAppNotifyBtn) {
      successWhatsAppNotifyBtn.onclick = () => {
        const encodedMsg = buildWhatsAppOrderMessage(customerInfo, orderedItems);
        window.open(`https://wa.me/${WHATSAPP_PHONE}?text=${encodedMsg}`, "_blank");
      };
    }

    successModal.classList.add("active");
    showToast(`🎉 Order <strong>${orderId}</strong> placed successfully!`);
  }

  // ================= 7. Wishlist Management =================
  function toggleWishlist(productId) {
    const product = state.products.find(p => p.id === productId);
    if (!product) return;

    const idx = state.wishlist.findIndex(w => w.id === productId);
    if (idx > -1) {
      state.wishlist.splice(idx, 1);
      showToast(`Removed <strong>${product.name}</strong> from Wishlist.`);
    } else {
      state.wishlist.push(product);
      showToast(`Added <strong>${product.name}</strong> to your Wishlist! ❤️`);
    }

    localStorage.setItem("aylle_wishlist", JSON.stringify(state.wishlist));
    updateWishlistUI();
    renderProducts();
  }

  function updateWishlistUI() {
    if (wishlistBadge) wishlistBadge.textContent = state.wishlist.length;

    if (!wishlistItemsBody) return;

    if (state.wishlist.length === 0) {
      wishlistItemsBody.innerHTML = `
        <div class="empty-cart-view">
          <i class="ph ph-heart-straight" style="font-size:3.5rem; color:#D6C2E6; margin-bottom:1rem;"></i>
          <h4>Your Wishlist is Empty</h4>
          <p>Save your favorite cosmetics here to purchase later!</p>
        </div>
      `;
      return;
    }

    wishlistItemsBody.innerHTML = state.wishlist.map(item => `
      <div class="cart-item-card">
        <img src="${item.image}" alt="${item.name}" class="cart-item-thumb" />
        <div class="cart-item-details">
          <h5 class="cart-item-title">${item.name}</h5>
          <span class="cart-item-price">Rs. ${item.price.toLocaleString()}</span>
          <div style="margin-top: 0.5rem;">
            <button class="btn-primary" style="padding: 0.35rem 0.85rem; font-size: 0.78rem;" onclick="window.addFromWishlistToCart('${item.id}')">
              <i class="ph ph-shopping-bag"></i> Move to Bag
            </button>
          </div>
        </div>
        <button class="btn-remove-item" onclick="window.removeWishlistItem('${item.id}')" title="Remove">
          <i class="ph ph-trash"></i>
        </button>
      </div>
    `).join('');
  }

  window.removeWishlistItem = (id) => toggleWishlist(id);
  window.addFromWishlistToCart = (id) => {
    addToCart(id);
    toggleWishlist(id);
  };

  // ================= 7. Quick View Modal =================
  function openQuickView(productId) {
    const product = state.products.find(p => p.id === productId);
    if (!product || !quickViewContent) return;

    state.activeProductForModal = product;
    state.selectedShadeForModal = product.shades && product.shades[0] ? product.shades[0].name : "Standard";

    quickViewContent.innerHTML = `
      <div class="quick-view-grid">
        <div>
          <div class="modal-gallery-main">
            <img src="${product.image}" alt="${product.name}" id="modalMainImg" />
          </div>
          ${product.secondaryImage ? `
            <div style="display:flex; gap:0.5rem;">
              <img src="${product.image}" style="width:60px; height:60px; border-radius:8px; cursor:pointer; border:2px solid var(--primary);" onclick="document.getElementById('modalMainImg').src='${product.image}'" />
              <img src="${product.secondaryImage}" style="width:60px; height:60px; border-radius:8px; cursor:pointer; border:1px solid var(--border-color);" onclick="document.getElementById('modalMainImg').src='${product.secondaryImage}'" />
            </div>
          ` : ''}
        </div>

        <div class="modal-product-details">
          <span class="product-category-tag">${formatCategory(product.category)}</span>
          <h2>${product.name}</h2>
          
          <div class="rating-row" style="margin-bottom: 0.75rem;">
            <i class="ph-fill ph-star"></i>
            <span>${product.rating.toFixed(1)}</span>
            <span class="reviews-num">(${product.reviewsCount} customer reviews)</span>
            <span style="margin-left: 0.5rem; color: var(--success); font-weight: 700;">● In Stock (Authentic)</span>
          </div>

          <div class="price-row" style="margin-bottom: 1rem;">
            <span class="current-price" style="font-size: 1.75rem;">Rs. ${product.price.toLocaleString()}</span>
            ${product.originalPrice ? `<span class="original-price" style="font-size: 1.1rem;">Rs. ${product.originalPrice.toLocaleString()}</span>` : ''}
            ${product.discount ? `<span class="badge-pill badge-discount" style="margin-left:0.5rem;">${product.discount}</span>` : ''}
          </div>

          <p class="modal-product-desc">${product.description}</p>

          ${product.shades && product.shades.length > 0 ? `
            <div class="shade-select-block">
              <div class="shade-select-title">Selected Shade: <span id="modalSelectedShadeLabel" style="color:var(--primary); font-weight:800;">${state.selectedShadeForModal}</span></div>
              <div class="shade-pills-row">
                ${product.shades.map((s, idx) => `
                  <button type="button" class="shade-pill-btn ${idx === 0 ? 'active' : ''}" data-shade="${s.name}" onclick="window.selectModalShade('${s.name}', this)">
                    <span style="width:12px; height:12px; border-radius:50%; background-color:${s.hex}; display:inline-block;"></span>
                    ${s.name}
                  </button>
                `).join('')}
              </div>
            </div>
          ` : ''}

          <ul class="feature-bullets">
            ${(product.features || []).map(f => `
              <li><i class="ph-bold ph-check-circle"></i> ${f}</li>
            `).join('')}
          </ul>

          <div style="display: flex; gap: 1rem; margin-top: 1.5rem;">
            <div class="cart-qty-ctrl" style="padding: 0.35rem 0.5rem;">
              <button class="qty-btn" id="modalQtyMinus">-</button>
              <span class="qty-num" id="modalQtyVal">1</span>
              <button class="qty-btn" id="modalQtyPlus">+</button>
            </div>
            <button class="btn-primary" style="flex:1;" id="modalAddCartBtn">
              <i class="ph ph-shopping-bag"></i> Add To Bag
            </button>
          </div>

          <button class="btn-whatsapp" style="width:100%; margin-top:0.75rem;" id="modalBuyWhatsAppBtn">
            <i class="ph-bold ph-whatsapp-logo"></i> Instant Order via WhatsApp (03148604291)
          </button>
        </div>
      </div>
    `;

    // Modal Qty Logic
    let modalQty = 1;
    const qtyVal = document.getElementById("modalQtyVal");
    document.getElementById("modalQtyMinus").onclick = () => {
      if (modalQty > 1) {
        modalQty--;
        qtyVal.textContent = modalQty;
      }
    };
    document.getElementById("modalQtyPlus").onclick = () => {
      modalQty++;
      qtyVal.textContent = modalQty;
    };

    document.getElementById("modalAddCartBtn").onclick = () => {
      addToCart(product.id, state.selectedShadeForModal, modalQty);
      quickViewModal.classList.remove("active");
    };

    document.getElementById("modalBuyWhatsAppBtn").onclick = () => {
      const msg = `Hello Aylle Shop! I want to order:\nProduct: ${product.name}\nShade: ${state.selectedShadeForModal}\nQty: ${modalQty}\nPrice: Rs. ${(product.price * modalQty).toLocaleString()}`;
      window.open(`https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(msg)}`, "_blank");
    };

    quickViewModal.classList.add("active");
  }

  window.selectModalShade = (shadeName, btnElement) => {
    state.selectedShadeForModal = shadeName;
    const label = document.getElementById("modalSelectedShadeLabel");
    if (label) label.textContent = shadeName;
    document.querySelectorAll(".shade-pill-btn").forEach(b => b.classList.remove("active"));
    btnElement.classList.add("active");
  };

  // ================= 8. Drawers & Modals Controls =================
  function openCartDrawer() {
    closeWishlistDrawer();
    cartDrawer.classList.add("active");
    drawerBackdrop.classList.add("active");
    document.body.style.overflow = "hidden";
  }

  function closeCartDrawer() {
    cartDrawer.classList.remove("active");
    drawerBackdrop.classList.remove("active");
    document.body.style.overflow = "";
  }

  function openWishlistDrawer() {
    closeCartDrawer();
    wishlistDrawer.classList.add("active");
    drawerBackdrop.classList.add("active");
    document.body.style.overflow = "hidden";
  }

  function closeWishlistDrawer() {
    wishlistDrawer.classList.remove("active");
    drawerBackdrop.classList.remove("active");
    document.body.style.overflow = "";
  }

  function closeAllModals() {
    quickViewModal.classList.remove("active");
    checkoutModal.classList.remove("active");
    successModal.classList.remove("active");
  }

  // ================= 9. Flash Sale Countdown =================
  function initCountdown() {
    const hoursEl = document.getElementById("cdHours");
    const minsEl = document.getElementById("cdMins");
    const secsEl = document.getElementById("cdSecs");

    if (!hoursEl || !minsEl || !secsEl) return;

    let totalSeconds = 14 * 3600 + 45 * 60 + 30; // 14h 45m 30s

    setInterval(() => {
      if (totalSeconds <= 0) totalSeconds = 24 * 3600;
      totalSeconds--;

      const h = Math.floor(totalSeconds / 3600);
      const m = Math.floor((totalSeconds % 3600) / 60);
      const s = totalSeconds % 60;

      hoursEl.textContent = String(h).padStart(2, "0");
      minsEl.textContent = String(m).padStart(2, "0");
      secsEl.textContent = String(s).padStart(2, "0");
    }, 1000);
  }

  // ================= 10. Toast Notification =================
  function showToast(htmlMessage) {
    if (!toastContainer) return;

    const toast = document.createElement("div");
    toast.className = "toast";
    toast.innerHTML = `<i class="ph-bold ph-sparkle" style="color:var(--secondary);"></i> <span>${htmlMessage}</span>`;

    toastContainer.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = "0";
      toast.style.transform = "translateY(10px)";
      setTimeout(() => toast.remove(), 300);
    }, 3500);
  }

  // ================= 11. Event Listeners Setup =================
  function setupEventListeners() {
    // Header Scroll Effect
    window.addEventListener("scroll", () => {
      const header = document.querySelector(".main-header");
      if (header) {
        if (window.scrollY > 40) {
          header.classList.add("scrolled");
        } else {
          header.classList.remove("scrolled");
        }
      }
    });

    // Category Tabs
    catButtons.forEach(btn => {
      btn.addEventListener("click", () => {
        catButtons.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        state.currentCategory = btn.dataset.category;
        renderProducts();
      });
    });

    // Sort Select
    if (sortSelect) {
      sortSelect.addEventListener("change", (e) => {
        state.sortBy = e.target.value;
        renderProducts();
      });
    }

    // Live Search
    if (searchInput) {
      searchInput.addEventListener("input", (e) => {
        state.searchQuery = e.target.value;
        if (searchClearBtn) {
          searchClearBtn.style.display = state.searchQuery ? "block" : "none";
        }
        renderProducts();
      });
    }

    if (searchClearBtn) {
      searchClearBtn.addEventListener("click", () => {
        searchInput.value = "";
        state.searchQuery = "";
        searchClearBtn.style.display = "none";
        renderProducts();
      });
    }

    // Products Grid Delegated Click Events (Add to Cart, Wishlist, Quick View)
    if (productsGrid) {
      productsGrid.addEventListener("click", (e) => {
        // Add to Cart
        const addCartBtn = e.target.closest(".btn-add-cart");
        if (addCartBtn) {
          const id = addCartBtn.dataset.id;
          const shade = addCartBtn.dataset.shade;
          addToCart(id, shade);
          addCartBtn.classList.add("added");
          addCartBtn.innerHTML = `<i class="ph-bold ph-check"></i> Added!`;
          setTimeout(() => {
            addCartBtn.classList.remove("added");
            addCartBtn.innerHTML = `<i class="ph ph-shopping-bag"></i> Add To Cart`;
          }, 1500);
          return;
        }

        // Wishlist Toggle
        const wishBtn = e.target.closest(".wishlist-toggle-btn");
        if (wishBtn) {
          const id = wishBtn.dataset.id;
          toggleWishlist(id);
          return;
        }

        // Quick View
        const quickBtn = e.target.closest(".btn-quick-view") || e.target.closest(".product-title");
        if (quickBtn) {
          const id = quickBtn.dataset.id;
          openQuickView(id);
          return;
        }

        // Shade Dot Swatch Click in Product Card
        const shadeDot = e.target.closest(".shade-dot");
        if (shadeDot) {
          const parentCard = shadeDot.closest(".product-card");
          const shadeName = shadeDot.dataset.shade;
          parentCard.querySelectorAll(".shade-dot").forEach(d => d.classList.remove("active"));
          shadeDot.classList.add("active");
          const cardAddBtn = parentCard.querySelector(".btn-add-cart");
          if (cardAddBtn) cardAddBtn.dataset.shade = shadeName;
          return;
        }
      });
    }

    // Drawer Toggles
    if (cartToggleBtn) cartToggleBtn.addEventListener("click", openCartDrawer);
    if (cartCloseBtn) cartCloseBtn.addEventListener("click", closeCartDrawer);
    if (wishlistToggleBtn) wishlistToggleBtn.addEventListener("click", openWishlistDrawer);
    if (wishlistCloseBtn) wishlistCloseBtn.addEventListener("click", closeWishlistDrawer);
    if (drawerBackdrop) {
      drawerBackdrop.addEventListener("click", () => {
        closeCartDrawer();
        closeWishlistDrawer();
      });
    }

    // Coupon Apply
    if (applyCouponBtn) applyCouponBtn.addEventListener("click", applyPromoCode);

    // Checkout Actions
    if (checkoutWhatsAppBtn) checkoutWhatsAppBtn.addEventListener("click", orderViaWhatsApp);
    if (checkoutCodBtn) checkoutCodBtn.addEventListener("click", openCheckoutModal);
    if (checkoutForm) checkoutForm.addEventListener("submit", handleCheckoutSubmit);

    // Close Modals
    if (quickViewCloseBtn) quickViewCloseBtn.addEventListener("click", () => quickViewModal.classList.remove("active"));
    if (checkoutModalCloseBtn) checkoutModalCloseBtn.addEventListener("click", () => checkoutModal.classList.remove("active"));
    if (successModalCloseBtn) successModalCloseBtn.addEventListener("click", () => successModal.classList.remove("active"));

    // Close modal on outside backdrop click
    [quickViewModal, checkoutModal, successModal].forEach(modal => {
      if (modal) {
        modal.addEventListener("click", (e) => {
          if (e.target === modal) {
            modal.classList.remove("active");
          }
        });
      }
    });

    // Payment Radio Selector Stylings
    document.querySelectorAll(".pay-radio-card").forEach(card => {
      card.addEventListener("click", () => {
        document.querySelectorAll(".pay-radio-card").forEach(c => c.classList.remove("active"));
        card.classList.add("active");
        const radio = card.querySelector('input[type="radio"]');
        if (radio) radio.checked = true;
      });
    });
  }

  // Run Application
  init();
});
