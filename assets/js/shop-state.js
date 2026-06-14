(function() {
  const STORAGE_KEYS = {
    cart: 'maisonCart',
    wishlist: 'maisonWishlist'
  };

  const productData = {
    'prod-slip-cream': {
      id: 'prod-slip-cream',
      title: 'Silk Charmeuse Slip Dress',
      brand: 'Totême',
      category: 'Slip Dresses',
      groups: ['women', 'new'],
      price: 485,
      image: 'assets/images/product_silk_slip_dress_cream.jpg'
    },
    'prod-blazer-navy': {
      id: 'prod-blazer-navy',
      title: 'Double-Breasted Tailored Blazer',
      brand: 'Jacquemus',
      category: 'Blazers',
      groups: ['men', 'new'],
      price: 890,
      image: 'assets/images/product_tailored_blazer_navy.jpg'
    },
    'prod-tote-tan': {
      id: 'prod-tote-tan',
      title: 'Cabas Market Leather Tote',
      brand: 'A.P.C.',
      category: 'Bags',
      groups: ['bags', 'accessories'],
      price: 265,
      originalPrice: 380,
      label: 'Sale',
      image: 'assets/images/product_leather_tote_tan.jpg'
    },
    'prod-trousers-camel': {
      id: 'prod-trousers-camel',
      title: 'High-Waist Wide-Leg Trousers',
      brand: 'Theory',
      category: 'Trousers',
      groups: ['women', 'sale'],
      price: 210,
      originalPrice: 325,
      label: 'Sale',
      image: 'assets/images/product_wide_leg_trousers_camel.jpg'
    },
    'prod-black-silk-maxi': {
      id: 'prod-black-silk-maxi',
      title: 'Fluid Silk Cowl-Neck Maxi Dress',
      brand: 'Totême',
      category: 'Maxi Dresses',
      groups: ['women', 'new', 'maxi dresses'],
      price: 720,
      image: 'assets/images/dress_silk_maxi_black_primary.jpg'
    },
    'prod-cream-linen-midi': {
      id: 'prod-cream-linen-midi',
      title: 'Linen A-Line Midi Dress',
      brand: 'The Row',
      category: 'Midi Dresses',
      groups: ['women', 'new', 'midi dresses'],
      price: 1290,
      image: 'assets/images/dress_linen_midi_cream_primary.jpg'
    },
    'prod-terracotta-wrap': {
      id: 'prod-terracotta-wrap',
      title: 'Crepe Wrap Midi Dress',
      brand: 'Isabel Marant',
      category: 'Wrap Dresses',
      groups: ['women', 'sale', 'wrap dresses'],
      price: 265,
      originalPrice: 420,
      label: 'Sale',
      image: 'assets/images/dress_wrap_terracotta_primary.jpg'
    },
    'prod-navy-silk-slip': {
      id: 'prod-navy-silk-slip',
      title: 'Silk Bias-Cut Slip Dress',
      brand: 'Totême',
      category: 'Slip Dresses',
      groups: ['women', 'slip dresses'],
      price: 580,
      image: 'assets/images/dress_slip_navy_silk_primary.jpg'
    },
    'prod-black-blazer-mini': {
      id: 'prod-black-blazer-mini',
      title: 'Double-Breasted Blazer Mini Dress',
      brand: 'Jacquemus',
      category: 'Mini Dresses',
      groups: ['women', 'new', 'mini dresses'],
      price: 945,
      image: 'assets/images/dress_mini_blazer_black_primary.jpg'
    },
    'prod-floral-sage-maxi': {
      id: 'prod-floral-sage-maxi',
      title: 'Floral Smocked Maxi Dress',
      brand: 'Reformation',
      category: 'Maxi Dresses',
      groups: ['women', 'maxi dresses'],
      price: 348,
      image: 'assets/images/dress_floral_sage_maxi_primary.jpg'
    },
    'prod-camel-knit-mini': {
      id: 'prod-camel-knit-mini',
      title: 'Ribbed Knit Turtleneck Mini Dress',
      brand: 'Sandro',
      category: 'Mini Dresses',
      groups: ['women', 'sale', 'mini dresses'],
      price: 195,
      originalPrice: 310,
      label: 'Sale',
      image: 'assets/images/dress_knit_camel_mini_primary.jpg'
    },
    'prod-blush-chiffon-midi': {
      id: 'prod-blush-chiffon-midi',
      title: 'Chiffon Flutter-Sleeve Midi Dress',
      brand: 'Zimmermann',
      category: 'Midi Dresses',
      groups: ['women', 'new', 'midi dresses'],
      price: 875,
      image: 'assets/images/dress_blush_chiffon_midi_primary.jpg'
    },
    'prod-black-wool-column': {
      id: 'prod-black-wool-column',
      title: 'Wool Crepe Column Midi Dress',
      brand: 'The Row',
      category: 'Midi Dresses',
      groups: ['women', 'midi dresses'],
      price: 1650,
      image: 'assets/images/dress_column_black_wool_primary.jpg'
    }
  };

  function safeKey(key) {
    return btoa(key).replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_');
  }

  function loadCart() {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEYS.cart) || '[]');
    } catch {
      return [];
    }
  }

  function saveCart(cart) {
    localStorage.setItem(STORAGE_KEYS.cart, JSON.stringify(cart));
  }

  function loadWishlist() {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEYS.wishlist) || '[]');
    } catch {
      return [];
    }
  }

  function saveWishlist(wishlist) {
    localStorage.setItem(STORAGE_KEYS.wishlist, JSON.stringify(wishlist));
  }

  function getCartCount() {
    return loadCart().reduce((count, item) => count + (item.qty || 0), 0);
  }

  function updateCartBadge() {
    const count = getCartCount();
    document.querySelectorAll('.cart-badge').forEach(badge => {
      badge.textContent = count;
      badge.style.display = count ? 'inline-flex' : 'none';
    });
  }

  function getWishlistCount() {
    return loadWishlist().length;
  }

  function updateWishlistBadge() {
    const count = getWishlistCount();
    document.querySelectorAll('.wishlist-badge').forEach(badge => {
      badge.textContent = count;
      badge.style.display = count ? 'inline-flex' : 'none';
    });
  }

  function getCartItemKey(productId, options = {}) {
    const optionKey = Object.entries(options).sort().map(([key, value]) => `${key}:${value}`).join('|');
    return `${productId}|${optionKey}`;
  }

  function addToCart(productId, qty = 1, options = {}) {
    const cart = loadCart();
    const itemKey = safeKey(getCartItemKey(productId, options));
    const existing = cart.find(item => item.key === itemKey);
    const product = productData[productId] || { id: productId, title: productId, brand: '', price: 0, image: '' };

    if (existing) {
      existing.qty = Math.min(99, existing.qty + qty);
    } else {
      cart.push({
        key: itemKey,
        id: productId,
        title: product.title,
        brand: product.brand,
        price: product.price,
        image: product.image,
        label: product.label || '',
        originalPrice: product.originalPrice || null,
        qty,
        options
      });
    }

    saveCart(cart);
    updateCartBadge();
    return cart;
  }

  function isWishlisted(productId) {
    return loadWishlist().includes(productId);
  }

  function setWishlist(productId, liked) {
    const wishlist = loadWishlist();
    const index = wishlist.indexOf(productId);

    if (liked && index === -1) {
      wishlist.push(productId);
    }
    if (!liked && index !== -1) {
      wishlist.splice(index, 1);
    }

    saveWishlist(wishlist);
  }

  function toggleProductWishlist(productId, btn) {
    const liked = !isWishlisted(productId);
    setWishlist(productId, liked);

    if (btn) {
      btn.classList.toggle('liked', liked);
      const icon = btn.querySelector('i');
      if (icon) {
        icon.className = liked ? 'fas fa-heart' : 'far fa-heart';
      }
      if (btn.classList.contains('btn-wishlist')) {
        btn.innerHTML = `<i class="${liked ? 'fas' : 'far'} fa-heart"></i>${liked ? ' Saved to Wishlist' : ' Save to Wishlist'}`;
      }
      btn.style.color = liked ? '#c44' : '';
    }

    // update any badges and buttons on the page
    try { updateWishlistButtons(); } catch (e) {}
    try { updateWishlistBadge(); } catch (e) {}

    return liked;
  }

  function updateWishlistButtons() {
    document.querySelectorAll('.product-wishlist, .btn-wishlist').forEach(btn => {
      const productId = btn.dataset.productId || btn.closest('[data-product-id]')?.dataset.productId || document.body.dataset.productId;
      if (!productId) {
        return;
      }

      const liked = isWishlisted(productId);
      btn.classList.toggle('liked', liked);
      const icon = btn.querySelector('i');
      if (icon) {
        icon.className = liked ? 'fas fa-heart' : 'far fa-heart';
      }
      if (btn.classList.contains('btn-wishlist')) {
        btn.innerHTML = `<i class="${liked ? 'fas' : 'far'} fa-heart"></i>${liked ? ' Saved to Wishlist' : ' Save to Wishlist'}`;
      }
      btn.style.color = liked ? '#c44' : '';
    });
  }

  function initShopState() {
    updateCartBadge();
    updateWishlistButtons();
    updateWishlistBadge();

    document.querySelectorAll('.product-quick-add').forEach(btn => {
      btn.addEventListener('click', event => {
        event.stopPropagation();
        event.preventDefault();
        const card = btn.closest('.product-card');
        const productId = btn.dataset.productId || card?.dataset.productId;
        if (!productId) return;

        addToCart(productId, 1, {});
        const originalText = btn.textContent;
        btn.textContent = 'Added';
        setTimeout(() => {
          btn.textContent = originalText;
        }, 900);
      });
    });

    document.querySelectorAll('.product-wishlist').forEach(btn => {
      btn.addEventListener('click', event => {
        event.stopPropagation();
        event.preventDefault();
        const productId = btn.dataset.productId || btn.closest('[data-product-id]')?.dataset.productId;
        if (!productId) return;
        toggleProductWishlist(productId, btn);
      });
    });

    document.querySelectorAll('.btn-wishlist').forEach(btn => {
      btn.addEventListener('click', event => {
        event.preventDefault();
        const productId = btn.dataset.productId || document.body.dataset.productId;
        if (!productId) return;
        toggleProductWishlist(productId, btn);
      });
    });
  }

  window.maisonProducts = productData;
  window.loadCart = loadCart;
  window.saveCart = saveCart;
  window.addToCart = addToCart;
  window.loadWishlist = loadWishlist;
  window.saveWishlist = saveWishlist;
  window.isWishlisted = isWishlisted;
  window.toggleProductWishlist = toggleProductWishlist;
  window.updateCartBadge = updateCartBadge;
  window.updateWishlistButtons = updateWishlistButtons;
  window.updateWishlistBadge = updateWishlistBadge;
  window.getWishlistCount = getWishlistCount;
  window.getCartItemKey = getCartItemKey;

  window.addEventListener('DOMContentLoaded', initShopState);
})();
