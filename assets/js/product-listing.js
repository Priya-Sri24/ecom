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

    // Filter group toggle
    function toggleFilterGroup(header) {
      const body = header.nextElementSibling;
      header.classList.toggle('collapsed');
      body.classList.toggle('collapsed');
    }

    // Size pill toggle
    function togglePill(pill) {
      pill.classList.toggle('active');
    }

    // Color swatch toggle
    function toggleSwatch(item) {
      const swatch = item.querySelector('.color-swatch');
      swatch.classList.toggle('active');
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

    // Remove filter tag
    function removeFilter(tag) {
      tag.style.opacity = '0';
      tag.style.transform = 'scale(0.9)';
      tag.style.transition = 'all 0.2s ease';
      setTimeout(() => tag.remove(), 200);
    }

    // Clear all filters
    function clearAllFilters(e) {
      e.preventDefault();
      document.querySelectorAll('.filter-tag').forEach(tag => {
        tag.style.opacity = '0';
        tag.style.transform = 'scale(0.9)';
        tag.style.transition = 'all 0.2s ease';
        setTimeout(() => tag.remove(), 200);
      });
      document.querySelectorAll('.size-pill').forEach(p => p.classList.remove('active'));
      document.querySelectorAll('.color-swatch').forEach(s => s.classList.remove('active'));
      document.querySelectorAll('.brand-checkbox input').forEach(cb => cb.checked = false);
      document.querySelectorAll('.filter-category-list a').forEach(l => l.classList.remove('active'));
      const allLink = document.querySelector('.filter-category-list a');
      if (allLink) allLink.classList.add('active');
      document.querySelectorAll('.products-grid .product-card').forEach(card => card.style.display = '');
    }

    // View toggle
    document.querySelectorAll('.view-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.view-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
      });
    });

    // Pagination
    document.querySelectorAll('.page-btn:not(.arrow)').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.page-btn:not(.arrow)').forEach(b => {
          b.classList.remove('active');
          b.removeAttribute('aria-current');
        });
        btn.classList.add('active');
        btn.setAttribute('aria-current', 'page');
      });
    });

    function applyCategoryFilter(category) {
      document.querySelectorAll('.products-grid .product-card').forEach(card => {
        const groups = card.dataset.groups?.split(',') || [];
        const normalized = category.toLowerCase();
        let show = false;

        if (normalized === 'all' || normalized === 'all dresses') {
          show = true;
        } else if (normalized === 'mini dresses') {
          show = card.dataset.productId?.includes('mini') || groups.includes('mini dresses');
        } else if (normalized === 'midi dresses') {
          show = groups.includes('midi dresses');
        } else if (normalized === 'maxi dresses') {
          show = groups.includes('maxi dresses');
        } else if (normalized === 'slip dresses') {
          show = groups.includes('slip dresses');
        } else if (normalized === 'wrap dresses') {
          show = groups.includes('wrap dresses');
        } else {
          show = groups.includes(normalized) || card.dataset.productId?.includes(normalized);
        }

        card.style.display = show ? '' : 'none';
      });
    }

    // Category filter list
    document.querySelectorAll('.filter-category-list a').forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        document.querySelectorAll('.filter-category-list a').forEach(l => l.classList.remove('active'));
        link.classList.add('active');
        applyCategoryFilter(link.textContent.trim());
      });
    });

    // Scroll reveal
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }
      });
    }, { threshold: 0.05 });

    document.querySelectorAll('.product-card').forEach((el, i) => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(20px)';
      el.style.transition = `opacity 0.5s ease ${i * 0.06}s, transform 0.5s ease ${i * 0.06}s`;
      observer.observe(el);
    });
