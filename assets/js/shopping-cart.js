// Nav scroll effect
const nav = document.getElementById('mainNav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 20);
});

// Mobile nav toggle
const navMenuBtn = document.querySelector('.nav-menu-btn');
if (navMenuBtn) {
  navMenuBtn.addEventListener('click', () => {
    const isOpen = navMenuBtn.classList.toggle('open');
    nav.classList.toggle('nav-open', isOpen);
    navMenuBtn.setAttribute('aria-expanded', String(isOpen));
    navMenuBtn.innerHTML = isOpen ? '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
  });
}
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    if (navMenuBtn && navMenuBtn.classList.contains('open')) {
      navMenuBtn.classList.remove('open');
      nav.classList.remove('nav-open');
      navMenuBtn.setAttribute('aria-expanded', 'false');
      navMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
    }
  });
});

const TAX_RATE = 0.08;
let promoApplied = false;
const PROMO_DISCOUNT = 0.15;

function formatPrice(n) {
  return '$' + n.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 });
}

function getCartItems() {
  return loadCart();
}

function saveCartItems(items) {
  saveCart(items);
  updateCartBadge();
}

function createCartItemRow(item) {
  const row = document.createElement('div');
  row.className = 'cart-item';
  row.id = item.key;
  row.innerHTML = `
    <div class="cart-item-image">
      <img src="${item.image}" alt="${item.title}" width="120" height="158">
    </div>
    <div class="cart-item-details">
      <p class="cart-item-brand">${item.brand}</p>
      <p class="cart-item-name">${item.title}</p>
      <div class="cart-item-meta">
        <div class="cart-item-meta-item">
          <span class="cart-item-meta-label">Size</span>
          <span class="cart-item-meta-value">S</span>
        </div>
        <div class="cart-item-meta-item">
          <span class="cart-item-meta-label">Color</span>
          <span class="color-swatch" style="background:#c4b7a6;"></span>
          <span class="cart-item-meta-value">Ivory</span>
        </div>
      </div>
      <div class="cart-item-actions">
        <div class="qty-stepper">
          <button class="qty-btn" onclick="updateQty('${item.key}', -1)" aria-label="Decrease quantity">
            <i class="fas fa-minus" style="font-size:10px;"></i>
          </button>
          <input class="qty-input" type="text" value="${item.qty}" id="qty-${item.key}" readonly="">
          <button class="qty-btn" onclick="updateQty('${item.key}', 1)" aria-label="Increase quantity">
            <i class="fas fa-plus" style="font-size:10px;"></i>
          </button>
        </div>
        <button class="remove-link" onclick="removeItem('${item.key}')">Remove</button>
      </div>
    </div>
    <div class="cart-item-price">
      <span class="item-price-main" id="price-${item.key}" data-unit="${item.price}">${formatPrice(item.price * item.qty)}</span>
      ${item.originalPrice ? `<span class="item-price-original">${formatPrice(item.originalPrice)}</span>` : ''}
    </div>
  `;
  return row;
}

function renderCartItems() {
  const cartList = document.getElementById('cartItemsList');
  const items = getCartItems();
  cartList.innerHTML = '';

  if (!items.length) {
    cartList.innerHTML = '<div class="empty-cart-message"><h3>Your bag is currently empty.</h3><p>Browse our collection and add your favorites to continue.</p><a href="Product Listing.html" class="checkout-btn">Continue Shopping</a></div>';
    document.getElementById('summarySubtotal').textContent = '$0';
    document.getElementById('summaryTax').textContent = '$0';
    document.getElementById('summaryTotal').textContent = '$0';
    document.getElementById('summaryItemCount').textContent = '0';
    document.getElementById('itemCountText').textContent = '0 items';
    document.getElementById('discountLine').style.display = 'none';
    return;
  }

  items.forEach(item => cartList.appendChild(createCartItemRow(item)));
  recalculate();
}

function recalculate() {
  const items = getCartItems();
  let subtotal = 0;
  let activeCount = 0;
  items.forEach(item => {
    subtotal += item.price * item.qty;
    activeCount += item.qty;
  });

  const discount = promoApplied ? Math.round(subtotal * PROMO_DISCOUNT) : 0;
  const discountedSubtotal = subtotal - discount;
  const tax = Math.round(discountedSubtotal * TAX_RATE);
  const total = discountedSubtotal + tax;

  document.getElementById('summarySubtotal').textContent = formatPrice(subtotal);
  document.getElementById('summaryTax').textContent = formatPrice(tax);
  document.getElementById('summaryTotal').textContent = formatPrice(total);
  document.getElementById('summaryItemCount').textContent = activeCount;

  const itemCountText = activeCount === 1 ? '1 item' : activeCount + ' items';
  document.getElementById('itemCountText').textContent = itemCountText;
  updateCartBadge();

  if (promoApplied && discount > 0) {
    document.getElementById('discountLine').style.display = 'flex';
    document.getElementById('discountValue').textContent = '−' + formatPrice(discount);
  } else {
    document.getElementById('discountLine').style.display = 'none';
  }
}

function updateQty(itemKey, delta) {
  const cart = getCartItems();
  const item = cart.find(i => i.key === itemKey);
  if (!item) return;
  const newQty = item.qty + delta;
  if (newQty < 1) return;
  item.qty = newQty;
  saveCartItems(cart);
  const qtyEl = document.getElementById('qty-' + itemKey);
  const priceEl = document.getElementById('price-' + itemKey);
  if (qtyEl) qtyEl.value = newQty;
  if (priceEl) priceEl.textContent = formatPrice(item.price * newQty);
  recalculate();
}

function removeItem(itemKey) {
  const cart = getCartItems().filter(item => item.key !== itemKey);
  saveCartItems(cart);
  const el = document.getElementById(itemKey);
  if (el) {
    el.classList.add('removing');
    setTimeout(() => {
      el.remove();
      if (!cart.length) renderCartItems();
      else recalculate();
    }, 200);
  } else {
    renderCartItems();
  }
}

function applyPromo() {
  const val = document.getElementById('promoInput').value.trim().toUpperCase();
  if (val === 'MAISON15') {
    promoApplied = true;
    document.getElementById('promoApplied').classList.add('visible');
    recalculate();
  } else {
    document.getElementById('promoInput').style.borderColor = '#b84040';
    document.getElementById('promoInput').style.boxShadow = '0 0 0 1px #b84040';
    setTimeout(() => {
      document.getElementById('promoInput').style.borderColor = '';
      document.getElementById('promoInput').style.boxShadow = '';
    }, 2000);
  }
}

// Wishlist toggle
function toggleWishlist(btn) {
  const icon = btn.querySelector('i');
  btn.classList.toggle('liked');
  if (btn.classList.contains('liked')) {
    icon.className = 'fas fa-heart';
    btn.style.color = '#c44';
  } else {
    icon.className = 'far fa-heart';
    btn.style.color = '';
  }
}

// Scroll reveal for upsell cards
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.upsell-grid .product-card').forEach((el, i) => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(24px)';
  el.style.transition = `opacity 0.6s ease ${i * 0.1}s, transform 0.6s ease ${i * 0.1}s`;
  observer.observe(el);
});

// Allow Enter key for promo
const promoInput = document.getElementById('promoInput');
if (promoInput) {
  promoInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') applyPromo();
  });
}

window.addEventListener('DOMContentLoaded', renderCartItems);
