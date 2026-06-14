// Nav scroll
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

    // Gallery switch
    function switchImage(thumb, src, alt) {
      document.querySelectorAll('.gallery-thumb').forEach(t => t.classList.remove('active'));
      thumb.classList.add('active');
      const mainImg = document.getElementById('mainImage');
      mainImg.style.opacity = '0';
      setTimeout(() => {
        mainImg.src = src.startsWith('assets/images/') ? src : `assets/images/${src}`;
        mainImg.alt = alt;
        mainImg.style.opacity = '1';
      }, 200);
    }

    // Color selector
    function selectColor(el, name) {
      document.querySelectorAll('.color-swatch-wrap').forEach(s => s.classList.remove('active'));
      el.classList.add('active');
      document.getElementById('colorName').textContent = name;
    }

    // Size selector
    function selectSize(el, size) {
      document.querySelectorAll('.size-pill:not(.out-of-stock)').forEach(p => p.classList.remove('active'));
      el.classList.add('active');
      document.getElementById('sizeName').textContent = size;
    }

    // Quantity stepper
    let qty = 1;
    function adjustQty(delta) {
      qty = Math.max(1, Math.min(10, qty + delta));
      document.getElementById('qtyVal').textContent = qty;
    }

    // Add to bag
    function addToBag(btn) {
      const productId = btn.dataset.productId || document.body.dataset.productId;
      if (productId) {
        addToCart(productId, qty, {});
      }
      const original = btn.innerHTML;
      btn.innerHTML = '<i class="fas fa-check" style="font-size:14px;"></i> Added to Bag';
      btn.style.background = 'var(--gold)';
      setTimeout(() => {
        btn.innerHTML = original;
        btn.style.background = '';
        window.location.href = 'Shopping Cart.html';
      }, 1200);
    }

    // Wishlist
    let wishlisted = false;
    function toggleWishlist() {
      const btn = document.getElementById('wishlistBtn');
      const productId = btn.dataset.productId || document.body.dataset.productId;
      if (!productId) {
        return;
      }
      toggleProductWishlist(productId, btn);
    }

    // Card wishlist
    function toggleCardWishlist(btn) {
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

    // Accordion
    function toggleAccordion(trigger) {
      const item = trigger.closest('.accordion-item');
      const isOpen = item.classList.contains('open');
      // Close all
      document.querySelectorAll('.accordion-item').forEach(i => i.classList.remove('open'));
      // Open clicked if it was closed
      if (!isOpen) item.classList.add('open');
    }

    // Scroll reveal for recommendation cards
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.reveal-card').forEach((el, i) => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(28px)';
      el.style.transition = `opacity 0.6s ease ${i * 0.1}s, transform 0.6s ease ${i * 0.1}s`;
      observer.observe(el);
    });
