(function () {
  // Mobile/touch gets no custom cursor or effect at all — native behavior only.
  if (window.matchMedia && window.matchMedia('(pointer: coarse)').matches) {
    return;
  }

  var LERP_SPEED = 0.35; // how quickly the ring catches up to the real cursor

  // Elements that trigger the hover ring style (built from every
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
  // ring doesn't cover the field while the user is typing.
  var TEXT_FIELD_SELECTOR = [
    'input:not([type="checkbox"]):not([type="radio"]):not([type="range"])' +
      ':not([type="color"]):not([type="submit"]):not([type="button"])' +
      ':not([type="reset"]):not([type="file"]):not([type="image"])',
    'textarea', 'select', '[contenteditable="true"]'
  ].join(', ');

  var cursor = document.createElement('div');
  cursor.id = 'giant-cursor';

  var arrow = document.createElement('i');
  arrow.className = 'giant-cursor-arrow ti-angle-right';
  cursor.appendChild(arrow);

  document.body.appendChild(cursor);
  document.body.classList.add('giant-cursor-active');

  var mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
  var pos = { x: mouse.x, y: mouse.y };

  document.addEventListener('mousemove', function (e) {
    mouse.x = e.clientX;
    mouse.y = e.clientY;

    var overTextField = e.target && e.target.closest && e.target.closest(TEXT_FIELD_SELECTOR);
    if (overTextField) {
      cursor.classList.remove('visible');
      return;
    }

    var isClickable = e.target && e.target.closest && e.target.closest(CLICKABLE_SELECTOR);
    cursor.classList.toggle('pointer', !!isClickable);
    cursor.classList.add('visible');
  });

  document.addEventListener('focusin', function (e) {
    if (e.target && e.target.closest && e.target.closest(TEXT_FIELD_SELECTOR)) {
      cursor.classList.remove('visible');
    }
  });

  document.addEventListener('mouseleave', function () {
    cursor.classList.remove('visible');
  });

  (function tick() {
    pos.x += (mouse.x - pos.x) * LERP_SPEED;
    pos.y += (mouse.y - pos.y) * LERP_SPEED;
    cursor.style.transform = 'translate(' + pos.x + 'px, ' + pos.y + 'px) translate(-50%, -50%)';
    requestAnimationFrame(tick);
  })();
})();
