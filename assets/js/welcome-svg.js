(function () {
  // Inlines the "Welcome Animation" SVG so its gradients can be
  // recolored via CSS (an <img src="*.svg"> is opaque to the page's
  // stylesheets/variables). Falls back to the plain <img> on failure.
  var images = document.querySelectorAll('img.svg-theme-inject');

  images.forEach(function (img) {
    fetch(img.getAttribute('src'))
      .then(function (res) { return res.text(); })
      .then(function (markup) {
        var wrapper = document.createElement('div');
        wrapper.innerHTML = markup;
        var svg = wrapper.querySelector('svg');
        if (!svg) return;

        svg.removeAttribute('width');
        svg.removeAttribute('height');
        svg.setAttribute('preserveAspectRatio', 'xMidYMid slice');
        svg.classList.add('welcome-animation-svg');
        if (img.id) svg.id = img.id;

        img.replaceWith(svg);
      })
      .catch(function () { /* keep the <img> fallback */ });
  });
})();
