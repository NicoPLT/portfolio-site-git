(function () {
  // Elements that should trigger the "tap" hint (built from every
  // cursor:pointer / click affordance actually used on this site).
  var CLICKABLE_SELECTOR = [
    'a[href]', 'button', 'label', 'summary',
    'input[type="submit"]', 'input[type="button"]', 'input[type="reset"]',
    'input[type="checkbox"]', 'input[type="radio"]', 'input[type="range"]', 'input[type="color"]',
    '.btn', '.btn-fab', '.btn-back_to_top', '.nav-link', '.color-item',
    '.nice-select', '.nice-select .option', '.owl-nav > div', '.owl-dot',
    '.grid-item', '.img-place', '[data-fancybox]', '[data-toggle]', '[data-filter]',
    '[role="button"]', '[role="link"]', '[onclick]',
    '[tabindex]:not([tabindex="-1"])'
  ].join(', ');

  // Text-entry fields: leave the native cursor/caret alone so the
  // giant finger doesn't cover the field while the user is typing.
  var TEXT_FIELD_SELECTOR = [
    'input:not([type="checkbox"]):not([type="radio"]):not([type="range"])' +
      ':not([type="color"]):not([type="submit"]):not([type="button"])' +
      ':not([type="reset"]):not([type="file"]):not([type="image"])',
    'textarea', 'select', '[contenteditable="true"]'
  ].join(', ');

  var isCoarsePointer = window.matchMedia && window.matchMedia('(pointer: coarse)').matches;

  if (isCoarsePointer) {
    // Mobile/touch: no floating cursor (the finger is already on the
    // glass) — show a quick tap "pop" on clickable elements instead.
    document.addEventListener('click', function (e) {
      var target = e.target && e.target.closest && e.target.closest(CLICKABLE_SELECTOR);
      if (!target) return;

      var fx = document.createElement('div');
      fx.className = 'giant-cursor-tap-fx';
      fx.textContent = '\u{1F446}'; // 👆
      fx.style.left = e.clientX + 'px';
      fx.style.top = e.clientY + 'px';
      document.body.appendChild(fx);
      fx.addEventListener('animationend', function () {
        fx.remove();
      });
    }, true);
    return;
  }

  var cursor = document.createElement('div');
  cursor.id = 'giant-cursor';

  var inner = document.createElement('span');
  inner.className = 'giant-cursor-inner';
  inner.textContent = '\u{1F446}'; // 👆
  cursor.appendChild(inner);

  document.body.appendChild(cursor);
  document.body.classList.add('giant-cursor-active');

  document.addEventListener('mousemove', function (e) {
    var overTextField = e.target && e.target.closest && e.target.closest(TEXT_FIELD_SELECTOR);

    if (overTextField) {
      cursor.classList.remove('visible');
      return;
    }

    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
    cursor.classList.add('visible');
    cursor.classList.toggle('pointer', !!(e.target.closest && e.target.closest(CLICKABLE_SELECTOR)));
  });

  // Keep the cursor hidden while a text field is focused even if the
  // mouse doesn't move (e.g. focused via click then the user types).
  document.addEventListener('focusin', function (e) {
    if (e.target && e.target.closest && e.target.closest(TEXT_FIELD_SELECTOR)) {
      cursor.classList.remove('visible');
    }
  });

  document.addEventListener('mouseleave', function () {
    cursor.classList.remove('visible');
  });
})();
