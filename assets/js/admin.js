// Ally Shop - Admin Dashboard Application Logic
document.addEventListener("DOMContentLoaded", () => {
  // Admin State
  let adminState = {
    isAuthenticated: sessionStorage.getItem("ally_admin_auth") === "true",
    products: JSON.parse(localStorage.getItem("ally_products")) || PRODUCTS_DATA,
    orders: JSON.parse(localStorage.getItem("ally_orders")) || [],
    currentTab: "products",
    editingProductId: null,
    searchQuery: "",
    selectedCategory: "all"
  };

  const DEFAULT_PASSCODE = "admin123";

  // DOM Elements
  const loginOverlay = document.getElementById("loginOverlay");
  const loginForm = document.getElementById("loginForm");
  const passcodeInput = document.getElementById("passcodeInput");
  const loginErrorMsg = document.getElementById("loginErrorMsg");
  const logoutBtn = document.getElementById("logoutBtn");

  const tabBtns = document.querySelectorAll(".admin-tab-btn");
  const productsView = document.getElementById("productsView");
  const ordersView = document.getElementById("ordersView");

  // Stats Elements
  const statTotalProducts = document.getElementById("statTotalProducts");
  const statTotalOrders = document.getElementById("statTotalOrders");
  const statTotalRevenue = document.getElementById("statTotalRevenue");
  const statBestSellers = document.getElementById("statBestSellers");

  // Products Table & Controls
  const adminProductsTableBody = document.getElementById("adminProductsTableBody");
  const adminSearchInput = document.getElementById("adminSearchInput");
  const adminCategoryFilter = document.getElementById("adminCategoryFilter");
  const openAddProductModalBtn = document.getElementById("openAddProductModalBtn");
  const resetDefaultsBtn = document.getElementById("resetDefaultsBtn");
  const exportCodeBtn = document.getElementById("exportCodeBtn");

  // Product Modal Elements
  const productModal = document.getElementById("productModal");
  const productModalTitle = document.getElementById("productModalTitle");
  const productModalCloseBtn = document.getElementById("productModalCloseBtn");
  const productForm = document.getElementById("productForm");
  const pName = document.getElementById("pName");
  const pCategory = document.getElementById("pCategory");
  const pPrice = document.getElementById("pPrice");
  const pOriginalPrice = document.getElementById("pOriginalPrice");
  const pDiscount = document.getElementById("pDiscount");
  const pImage = document.getElementById("pImage");
  const pImagePreview = document.getElementById("pImagePreview");
  const pSecondaryImage = document.getElementById("pSecondaryImage");
  const pRating = document.getElementById("pRating");
  const pReviewsCount = document.getElementById("pReviewsCount");
  const pDescription = document.getElementById("pDescription");
  const pFeatures = document.getElementById("pFeatures");
  const pIsBestSeller = document.getElementById("pIsBestSeller");
  const pIsNew = document.getElementById("pIsNew");
  const pIsFlashSale = document.getElementById("pIsFlashSale");
  
  // Shades Builder
  const shadesContainer = document.getElementById("shadesContainer");
  const addShadeRowBtn = document.getElementById("addShadeRowBtn");

  // Orders Table Elements
  const adminOrdersTableBody = document.getElementById("adminOrdersTableBody");
  const clearOrdersBtn = document.getElementById("clearOrdersBtn");

  // Export Code Modal
  const exportModal = document.getElementById("exportModal");
  const exportModalCloseBtn = document.getElementById("exportModalCloseBtn");
  const exportCodeTextarea = document.getElementById("exportCodeTextarea");
  const copyCodeBtn = document.getElementById("copyCodeBtn");

  const toastContainer = document.getElementById("adminToastContainer");

  // ================= 1. Initialization =================
  function init() {
    checkAuth();
    updateStats();
    renderProductsTable();
    renderOrdersTable();
    setupEventListeners();
  }

  function checkAuth() {
    if (adminState.isAuthenticated) {
      loginOverlay.style.display = "none";
    } else {
      loginOverlay.style.display = "flex";
    }
  }

  // ================= 2. Authentication =================
  if (loginForm) {
    loginForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const code = passcodeInput.value.trim();
      if (code === DEFAULT_PASSCODE) {
        adminState.isAuthenticated = true;
        sessionStorage.setItem("ally_admin_auth", "true");
        loginOverlay.style.display = "none";
        loginErrorMsg.style.display = "none";
        showToast("Welcome to Ally Shop Admin Panel! 👑");
      } else {
        loginErrorMsg.textContent = "Incorrect passcode! Default is admin123";
        loginErrorMsg.style.display = "block";
      }
    });
  }

  if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
      sessionStorage.removeItem("ally_admin_auth");
      adminState.isAuthenticated = false;
      passcodeInput.value = "";
      checkAuth();
    });
  }

  // ================= 3. Dashboard Stats =================
  function updateStats() {
    if (statTotalProducts) statTotalProducts.textContent = adminState.products.length;
    if (statTotalOrders) statTotalOrders.textContent = adminState.orders.length;
    
    const revenue = adminState.orders.reduce((sum, ord) => sum + (ord.total || 0), 0);
    if (statTotalRevenue) statTotalRevenue.textContent = `Rs. ${revenue.toLocaleString()}`;

    const bestSellersCount = adminState.products.filter(p => p.isBestSeller).length;
    if (statBestSellers) statBestSellers.textContent = bestSellersCount;
  }

  // ================= 4. Render Products Table =================
  function renderProductsTable() {
    if (!adminProductsTableBody) return;

    let list = [...adminState.products];

    // Filter by Category
    if (adminState.selectedCategory !== "all") {
      list = list.filter(p => p.category === adminState.selectedCategory);
    }

    // Filter by Search Query
    if (adminState.searchQuery.trim() !== "") {
      const q = adminState.searchQuery.toLowerCase();
      list = list.filter(p => 
        p.name.toLowerCase().includes(q) || 
        p.id.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q)
      );
    }

    if (list.length === 0) {
      adminProductsTableBody.innerHTML = `
        <tr>
          <td colspan="7" style="text-align: center; padding: 3rem 1rem; color: var(--text-muted);">
            <i class="ph ph-magnifying-glass" style="font-size: 2.5rem; color: #4C267B; display:block; margin-bottom:0.5rem;"></i>
            No products found matching your search.
          </td>
        </tr>
      `;
      return;
    }

    adminProductsTableBody.innerHTML = list.map((p, idx) => {
      const shadesHtml = (p.shades || []).map(s => `
        <span class="admin-shade-dot" style="background-color:${s.hex};" title="${s.name}"></span>
      `).join('');

      const badgesHtml = [
        p.isBestSeller ? '<span class="admin-badge badge-gold">Best Seller</span>' : '',
        p.isNew ? '<span class="admin-badge badge-purple">New</span>' : '',
        p.isFlashSale ? '<span class="admin-badge badge-pink">Flash Sale</span>' : ''
      ].filter(Boolean).join(' ');

      return `
        <tr>
          <td style="width: 50px; text-align: center; color: var(--text-light); font-weight:700;">${idx + 1}</td>
          <td>
            <div style="display:flex; align-items:center; gap:0.85rem;">
              <img src="${p.image}" alt="${p.name}" class="admin-p-thumb" />
              <div>
                <div class="admin-p-name">${p.name}</div>
                <div class="admin-p-id">${p.id}</div>
              </div>
            </div>
          </td>
          <td>
            <span class="admin-cat-pill">${formatCategoryName(p.category)}</span>
          </td>
          <td>
            <div style="font-weight:700; color:var(--accent-purple);">Rs. ${p.price.toLocaleString()}</div>
            ${p.originalPrice ? `<div style="font-size:0.78rem; text-decoration:line-through; color:var(--text-light);">Rs. ${p.originalPrice.toLocaleString()}</div>` : ''}
          </td>
          <td>
            <div style="display:flex; align-items:center; gap:0.25rem;">
              ${shadesHtml || '<span style="color:var(--text-light); font-size:0.75rem;">1 Standard</span>'}
            </div>
          </td>
          <td>
            <div>${badgesHtml || '<span style="color:var(--text-light); font-size:0.75rem;">Standard</span>'}</div>
            <div style="font-size:0.75rem; color:var(--accent-gold); margin-top:3px;">
              ★ ${p.rating} (${p.reviewsCount || 0})
            </div>
          </td>
          <td>
            <div class="admin-actions-cell">
              <button class="btn-action-icon btn-edit" title="Edit Product" onclick="window.editProduct('${p.id}')">
                <i class="ph-bold ph-pencil-simple"></i>
              </button>
              <button class="btn-action-icon btn-delete" title="Delete Product" onclick="window.deleteProduct('${p.id}')">
                <i class="ph-bold ph-trash"></i>
              </button>
            </div>
          </td>
        </tr>
      `;
    }).join('');
  }

  function formatCategoryName(cat) {
    const map = {
      "lips": "💄 Lips",
      "eyes": "👁️ Eyes",
      "face": "✨ Face",
      "skincare": "🌸 Skincare",
      "brushes-kits": "👑 Brushes & Kits",
      "perfumes": "💎 Perfumes"
    };
    return map[cat] || cat;
  }

  // ================= 5. Shade Rows Management =================
  function addShadeRow(name = "", hex = "#E91E63") {
    if (!shadesContainer) return;
    const row = document.createElement("div");
    row.className = "shade-input-row";
    row.innerHTML = `
      <input type="color" class="shade-color-picker" value="${hex}" onchange="this.nextElementSibling.value=this.value" />
      <input type="text" class="shade-hex-input" value="${hex}" placeholder="#HEX" onchange="this.previousElementSibling.value=this.value" style="width:90px;" />
      <input type="text" class="shade-name-input" value="${name}" placeholder="Shade Name (e.g. Ruby Red)" style="flex:1;" required />
      <button type="button" class="btn-remove-shade" onclick="this.parentElement.remove()" title="Remove Shade">
        <i class="ph-bold ph-x"></i>
      </button>
    `;
    shadesContainer.appendChild(row);
  }

  if (addShadeRowBtn) {
    addShadeRowBtn.addEventListener("click", () => addShadeRow());
  }

  // ================= 6. Product Add / Edit Modal =================
  function openAddProductModal() {
    adminState.editingProductId = null;
    productModalTitle.innerHTML = `<i class="ph-bold ph-plus-circle"></i> Add New Cosmetic Product`;
    productForm.reset();
    shadesContainer.innerHTML = "";
    addShadeRow("Default Shade", "#9D4EDD");
    if (pImagePreview) pImagePreview.src = "https://images.unsplash.com/photo-1586495777744-4413f21062fa?auto=format&fit=crop&w=400&q=80";
    productModal.classList.add("active");
  }

  window.editProduct = function(id) {
    const p = adminState.products.find(item => item.id === id);
    if (!p) return;

    adminState.editingProductId = id;
    productModalTitle.innerHTML = `<i class="ph-bold ph-pencil-simple"></i> Edit Product (${p.id})`;

    pName.value = p.name || "";
    pCategory.value = p.category || "lips";
    pPrice.value = p.price || 0;
    pOriginalPrice.value = p.originalPrice || "";
    pDiscount.value = p.discount || "";
    pImage.value = p.image || "";
    if (pImagePreview) pImagePreview.src = p.image || "";
    pSecondaryImage.value = p.secondaryImage || "";
    pRating.value = p.rating || 5.0;
    pReviewsCount.value = p.reviewsCount || 50;
    pDescription.value = p.description || "";
    pFeatures.value = (p.features || []).join("\n");
    pIsBestSeller.checked = !!p.isBestSeller;
    pIsNew.checked = !!p.isNew;
    pIsFlashSale.checked = !!p.isFlashSale;

    // Load Shades
    shadesContainer.innerHTML = "";
    if (p.shades && p.shades.length > 0) {
      p.shades.forEach(s => addShadeRow(s.name, s.hex));
    } else {
      addShadeRow("Standard Shade", "#9D4EDD");
    }

    productModal.classList.add("active");
  };

  // Image Input live preview
  if (pImage) {
    pImage.addEventListener("input", (e) => {
      if (pImagePreview && e.target.value) {
        pImagePreview.src = e.target.value;
      }
    });
  }

  // Handle Product Form Submit
  if (productForm) {
    productForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const name = pName.value.trim();
      const category = pCategory.value;
      const price = parseInt(pPrice.value, 10) || 0;
      const originalPrice = pOriginalPrice.value ? parseInt(pOriginalPrice.value, 10) : null;
      const discount = pDiscount.value.trim() || null;
      const image = pImage.value.trim() || "https://images.unsplash.com/photo-1586495777744-4413f21062fa?auto=format&fit=crop&w=800&q=80";
      const secondaryImage = pSecondaryImage.value.trim() || null;
      const rating = parseFloat(pRating.value) || 5.0;
      const reviewsCount = parseInt(pReviewsCount.value, 10) || 10;
      const description = pDescription.value.trim();
      const features = pFeatures.value.split("\n").map(f => f.trim()).filter(Boolean);
      const isBestSeller = pIsBestSeller.checked;
      const isNew = pIsNew.checked;
      const isFlashSale = pIsFlashSale.checked;

      // Extract Shades
      const shadeRows = shadesContainer.querySelectorAll(".shade-input-row");
      const shades = [];
      shadeRows.forEach(row => {
        const hex = row.querySelector(".shade-color-picker").value;
        const shadeName = row.querySelector(".shade-name-input").value.trim();
        if (shadeName) {
          shades.push({ name: shadeName, hex });
        }
      });

      if (adminState.editingProductId) {
        // Update existing product
        const idx = adminState.products.findIndex(p => p.id === adminState.editingProductId);
        if (idx > -1) {
          adminState.products[idx] = {
            ...adminState.products[idx],
            name, category, price, originalPrice, discount, image, secondaryImage,
            rating, reviewsCount, description, features, shades, isBestSeller, isNew, isFlashSale
          };
          showToast(`Updated <strong>${name}</strong> successfully!`);
        }
      } else {
        // Create new product
        const newId = `ally-${Date.now().toString().slice(-4)}`;
        const newProduct = {
          id: newId,
          name, category, price, originalPrice, discount, image, secondaryImage,
          rating, reviewsCount, description, features, shades, isBestSeller, isNew, isFlashSale
        };
        adminState.products.unshift(newProduct);
        showToast(`Created new product <strong>${name}</strong> (${newId})!`);
      }

      saveProducts();
      renderProductsTable();
      updateStats();
      productModal.classList.remove("active");
    });
  }

  // Delete Product
  window.deleteProduct = function(id) {
    const p = adminState.products.find(item => item.id === id);
    if (!p) return;

    if (confirm(`Are you sure you want to delete product "${p.name}"?`)) {
      adminState.products = adminState.products.filter(item => item.id !== id);
      saveProducts();
      renderProductsTable();
      updateStats();
      showToast(`Product <strong>${p.name}</strong> deleted.`);
    }
  };

  function saveProducts() {
    localStorage.setItem("ally_products", JSON.stringify(adminState.products));
  }

  // ================= 7. Customer Orders Table =================
  function renderOrdersTable() {
    if (!adminOrdersTableBody) return;

    if (adminState.orders.length === 0) {
      adminOrdersTableBody.innerHTML = `
        <tr>
          <td colspan="7" style="text-align: center; padding: 3rem 1rem; color: var(--text-muted);">
            <i class="ph ph-shopping-cart-simple" style="font-size: 2.5rem; color: #4C267B; display:block; margin-bottom:0.5rem;"></i>
            No customer orders received yet.
          </td>
        </tr>
      `;
      return;
    }

    adminOrdersTableBody.innerHTML = adminState.orders.map((ord, idx) => {
      const itemsList = (ord.items || []).map(item => `
        <div style="font-size:0.82rem; margin-bottom:2px;">
          • ${item.name} (${item.shade}) x ${item.quantity}
        </div>
      `).join('');

      const cleanPhone = (ord.customer?.phone || "").replace(/[^0-9]/g, "");
      const waLink = cleanPhone.startsWith("0") ? `92${cleanPhone.slice(1)}` : cleanPhone;

      return `
        <tr>
          <td style="font-weight:700; color:var(--accent-purple);">${ord.orderId || `ORD-${idx+1}`}</td>
          <td>
            <div style="font-weight:700; color:#FFFFFF;">${ord.customer?.name || "Customer"}</div>
            <div style="font-size:0.8rem; color:var(--text-muted);">${ord.customer?.city || "Pakistan"}</div>
          </td>
          <td>
            <div style="font-weight:600; color:#FFFFFF;">${ord.customer?.phone || "N/A"}</div>
            <a href="https://wa.me/${waLink}?text=Hello%20${encodeURIComponent(ord.customer?.name || '')}!%20Your%20Ally%20Shop%20Order%20${ord.orderId}%20is%20being%20processed." target="_blank" class="admin-wa-link" title="Chat on WhatsApp">
              <i class="ph-bold ph-whatsapp-logo"></i> WhatsApp Customer
            </a>
          </td>
          <td>
            <div style="font-size:0.82rem; max-width:220px; line-height:1.4; color:#D3BFE8;">
              ${ord.customer?.address || "Delivery Address"}
            </div>
          </td>
          <td>
            <div style="max-height:80px; overflow-y:auto;">
              ${itemsList || '<span style="color:var(--text-light);">No items details</span>'}
            </div>
          </td>
          <td>
            <div style="font-weight:800; color:var(--success); font-size:0.95rem;">
              Rs. ${(ord.total || 0).toLocaleString()}
            </div>
            <div style="font-size:0.75rem; color:var(--text-light);">${ord.customer?.paymentMethod || "COD"}</div>
          </td>
          <td>
            <button class="btn-action-icon btn-delete" title="Delete Order" onclick="window.deleteOrder('${ord.orderId}')">
              <i class="ph-bold ph-trash"></i>
            </button>
          </td>
        </tr>
      `;
    }).join('');
  }

  window.deleteOrder = function(orderId) {
    if (confirm("Delete this order record?")) {
      adminState.orders = adminState.orders.filter(o => o.orderId !== orderId);
      localStorage.setItem("ally_orders", JSON.stringify(adminState.orders));
      renderOrdersTable();
      updateStats();
      showToast("Order record removed.");
    }
  };

  if (clearOrdersBtn) {
    clearOrdersBtn.addEventListener("click", () => {
      if (confirm("Are you sure you want to clear all order records?")) {
        adminState.orders = [];
        localStorage.setItem("ally_orders", JSON.stringify([]));
        renderOrdersTable();
        updateStats();
        showToast("All orders cleared.");
      }
    });
  }

  // ================= 8. Reset & Export Code Features =================
  if (resetDefaultsBtn) {
    resetDefaultsBtn.addEventListener("click", () => {
      if (confirm("Reset all products back to default 16 catalog items? Any custom products will be replaced.")) {
        adminState.products = [...PRODUCTS_DATA];
        saveProducts();
        renderProductsTable();
        updateStats();
        showToast("Catalog reset to factory default products!");
      }
    });
  }

  if (exportCodeBtn) {
    exportCodeBtn.addEventListener("click", () => {
      const codeString = `// Ally Shop - Cosmetic Products Catalog Database\nconst PRODUCTS_DATA = ${JSON.stringify(adminState.products, null, 2)};`;
      exportCodeTextarea.value = codeString;
      exportModal.classList.add("active");
    });
  }

  if (copyCodeBtn) {
    copyCodeBtn.addEventListener("click", () => {
      exportCodeTextarea.select();
      navigator.clipboard.writeText(exportCodeTextarea.value);
      copyCodeBtn.innerHTML = `<i class="ph-bold ph-check"></i> Copied to Clipboard!`;
      setTimeout(() => {
        copyCodeBtn.innerHTML = `<i class="ph-bold ph-copy"></i> Copy Code to Clipboard`;
      }, 2000);
      showToast("Code copied! You can paste it into assets/js/products.js");
    });
  }

  // ================= 9. Navigation & Filter Events =================
  function setupEventListeners() {
    // Tabs Switch
    tabBtns.forEach(btn => {
      btn.addEventListener("click", () => {
        tabBtns.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        adminState.currentTab = btn.dataset.tab;

        if (adminState.currentTab === "products") {
          productsView.style.display = "block";
          ordersView.style.display = "none";
        } else {
          productsView.style.display = "none";
          ordersView.style.display = "block";
          renderOrdersTable();
        }
      });
    });

    // Search Input
    if (adminSearchInput) {
      adminSearchInput.addEventListener("input", (e) => {
        adminState.searchQuery = e.target.value;
        renderProductsTable();
      });
    }

    // Category Filter
    if (adminCategoryFilter) {
      adminCategoryFilter.addEventListener("change", (e) => {
        adminState.selectedCategory = e.target.value;
        renderProductsTable();
      });
    }

    // Open Modal
    if (openAddProductModalBtn) {
      openAddProductModalBtn.addEventListener("click", openAddProductModal);
    }

    // Close Modals
    if (productModalCloseBtn) {
      productModalCloseBtn.addEventListener("click", () => productModal.classList.remove("active"));
    }

    if (exportModalCloseBtn) {
      exportModalCloseBtn.addEventListener("click", () => exportModal.classList.remove("active"));
    }

    [productModal, exportModal].forEach(m => {
      if (m) {
        m.addEventListener("click", (e) => {
          if (e.target === m) m.classList.remove("active");
        });
      }
    });
  }

  // ================= 10. Admin Toast Notification =================
  function showToast(html) {
    if (!toastContainer) return;
    const toast = document.createElement("div");
    toast.className = "toast";
    toast.innerHTML = `<i class="ph-bold ph-sparkle" style="color:var(--secondary);"></i> <span>${html}</span>`;
    toastContainer.appendChild(toast);
    setTimeout(() => {
      toast.style.opacity = "0";
      toast.style.transform = "translateY(10px)";
      setTimeout(() => toast.remove(), 300);
    }, 3500);
  }

  // Run
  init();
});
