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

    // Category chip toggle
    function filterHomepageProducts(filter) {
      document.querySelectorAll('.products-grid .product-card').forEach(card => {
        const groups = card.dataset.groups?.split(',') || [];
        const isAll = filter === 'all';
        const isSale = filter === 'sale';
        const show = isAll || groups.includes(filter) || (isSale && card.dataset.groups?.includes('sale'));
        card.style.display = show ? '' : 'none';
      });
    }

    document.querySelectorAll('.category-chip').forEach(chip => {
      chip.addEventListener('click', () => {
        document.querySelectorAll('.category-chip').forEach(c => c.classList.remove('active'));
        chip.classList.add('active');
        const filter = chip.textContent.trim().toLowerCase().replace(/\s+/g, '-');
        if (filter === 'all') {
          filterHomepageProducts('all');
        } else if (filter === 'new-arrivals') {
          filterHomepageProducts('new');
        } else if (filter === 'sale') {
          filterHomepageProducts('sale');
        } else {
          filterHomepageProducts(filter);
        }
      });
    });

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

    // Scroll reveal
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.product-card, .collection-card, .editorial-banner').forEach(el => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(24px)';
      el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
      observer.observe(el);
    });
