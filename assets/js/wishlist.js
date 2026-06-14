document.addEventListener('DOMContentLoaded', () => {
  const grid = document.getElementById('wishlistGrid');
  const empty = document.getElementById('emptyWishlist');
  const countEl = document.getElementById('wishlistCount');

  function render() {
    const wishlist = loadWishlist();
    grid.innerHTML = '';
    if (!wishlist.length) {
      empty.style.display = '';
      countEl.textContent = '0 items';
      return;
    }
    empty.style.display = 'none';

    wishlist.forEach(id => {
      const p = window.maisonProducts?.[id] || { id, title: id, price: 0, image: '' };
      const card = document.createElement('div');
      card.className = 'product-card';
      card.dataset.productId = id;
      card.innerHTML = `
        <div class="product-image-wrap">
          <img src="${p.image}" alt="${p.title}" width="400" height="533">
        </div>
        <p class="product-brand">${p.brand || ''}</p>
        <p class="product-title">${p.title}</p>
        <div class="product-pricing">
          <span class="product-price">$${p.price}</span>
        </div>
        <div style="display:flex; gap:8px; margin-top:12px;">
          <button class="btn-primary add-from-wishlist">Add to Bag</button>
          <button class="btn-ghost remove-from-wishlist">Remove</button>
        </div>
      `;

      grid.appendChild(card);

      card.querySelector('.add-from-wishlist').addEventListener('click', (e) => {
        e.stopPropagation();
        addToCart(id, 1, {});
      });
      card.querySelector('.remove-from-wishlist').addEventListener('click', (e) => {
        e.stopPropagation();
        toggleProductWishlist(id, null);
        render();
      });
    });

    countEl.textContent = wishlist.length === 1 ? '1 item' : wishlist.length + ' items';
  }

  render();

  // Listen for changes from other tabs
  window.addEventListener('storage', (e) => {
    if (e.key === 'maisonWishlist' || e.key === 'maisonCart') {
      render();
      if (typeof updateWishlistBadge === 'function') updateWishlistBadge();
      if (typeof updateCartBadge === 'function') updateCartBadge();
    }
  });
});