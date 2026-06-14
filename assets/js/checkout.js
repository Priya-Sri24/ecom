// Checkbox toggle
    function toggleCheckbox(group) {
      const box = group.querySelector('.custom-checkbox');
      box.classList.toggle('checked');
    }

    // Shipping selection
    function selectShipping(option) {
      document.querySelectorAll('.shipping-option').forEach(o => o.classList.remove('selected'));
      option.classList.add('selected');

      // Update shipping line in summary
      const shippingName = option.querySelector('.shipping-option-name').textContent;
      const shippingPrice = option.querySelector('.shipping-option-price').textContent;
      const summaryShipping = document.querySelector('.total-line-value.free, .total-line-value[data-shipping]');
      if (summaryShipping) {
        if (shippingPrice === 'Free') {
          summaryShipping.textContent = 'Free';
          summaryShipping.className = 'total-line-value free';
        } else {
          summaryShipping.textContent = shippingPrice;
          summaryShipping.className = 'total-line-value';
          summaryShipping.setAttribute('data-shipping', 'true');
        }
      }
    }

    // Mark the shipping value for dynamic update
    document.querySelectorAll('.total-line').forEach(line => {
      if (line.querySelector('.total-line-label') && line.querySelector('.total-line-label').textContent === 'Shipping') {
        const val = line.querySelector('.total-line-value');
        if (val) val.setAttribute('data-shipping', 'true');
      }
    });

    // Promo code toggle
    function togglePromo() {
      const toggle = document.getElementById('promoToggle');
      const wrap = document.getElementById('promoInputWrap');
      toggle.classList.toggle('open');
      wrap.classList.toggle('visible');
      if (wrap.classList.contains('visible')) {
        setTimeout(() => document.getElementById('promoInput').focus(), 50);
      }
    }

    // Input hover/focus enhancement
    document.querySelectorAll('.form-input').forEach(input => {
      input.addEventListener('focus', () => {
        input.parentElement.style.zIndex = '1';
      });
      input.addEventListener('blur', () => {
        input.parentElement.style.zIndex = '';
      });
    });

    // Form validation visual feedback on submit attempt
    document.querySelector('.btn-checkout').addEventListener('click', function () {
      const requiredInputs = document.querySelectorAll('.form-input:not([placeholder="Apt 4B"])');
      let hasEmpty = false;
      requiredInputs.forEach(input => {
        if ((input.tagName === 'INPUT' && input.value.trim() === '') ||
            (input.tagName === 'SELECT' && input.value === '')) {
          input.style.borderColor = 'rgba(184, 64, 64, 0.5)';
          input.style.boxShadow = '0 0 0 3px rgba(184,64,64,0.07)';
          hasEmpty = true;
          setTimeout(() => {
            input.style.borderColor = '';
            input.style.boxShadow = '';
          }, 2000);
        }
      });
    });
