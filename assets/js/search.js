const maisonSearchProducts = [
  'Silk Charmeuse Slip Dress',
  'Double-Breasted Tailored Blazer',
  'Cabas Market Leather Tote',
  'High-Waist Wide-Leg Trousers',
  'Fluid Silk Cowl-Neck Maxi Dress',
  'Linen A-Line Midi Dress',
  'Crepe Wrap Midi Dress',
  'Silk Bias-Cut Slip Dress',
  'Double-Breasted Blazer Mini Dress',
  'Floral Smocked Maxi Dress',
  'Ribbed Knit Turtleneck Mini Dress',
  'Chiffon Flutter-Sleeve Midi Dress',
  'Wool Crepe Column Midi Dress'
];

function openSearchOverlay() {
  document.body.classList.add('search-open');
  const overlay = document.getElementById('searchOverlay');
  if (overlay) {
    overlay.style.display = 'flex';
    const input = overlay.querySelector('.search-input');
    if (input) {
      input.value = '';
      input.focus();
      renderSearchResults('');
    }
  }
}

function closeSearchOverlay() {
  document.body.classList.remove('search-open');
  const overlay = document.getElementById('searchOverlay');
  if (overlay) {
    overlay.style.display = 'none';
  }
}

function renderSearchResults(query) {
  const results = document.getElementById('searchResults');
  if (!results) return;
  const normalized = query.trim().toLowerCase();
  const matches = normalized
    ? maisonSearchProducts.filter(name => name.toLowerCase().includes(normalized)).slice(0, 6)
    : [];

  results.innerHTML = matches.length
    ? matches.map(name => `<button type="button" class="search-result-item">${name}</button>`).join('')
    : `<p class="search-empty">${query ? 'No results found.' : 'Search for products, brands, collections…'}</p>`;
}

function handleSearchInput(event) {
  renderSearchResults(event.target.value);
}

function handleSearchKeydown(event) {
  if (event.key === 'Escape') {
    closeSearchOverlay();
  }
}

window.addEventListener('keydown', handleSearchKeydown);
