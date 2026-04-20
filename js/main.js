// ========= STICKY NAV =========
var nav = document.querySelector('.nav');

function handleNavScroll() {
  if (overlay && overlay.classList.contains('open')) return;
  if (window.scrollY > 40) {
    nav.classList.add('scrolled');
  } else {
    nav.classList.remove('scrolled');
  }
}

window.addEventListener('scroll', handleNavScroll, { passive: true });
handleNavScroll();

// ========= MOBILE NAV TOGGLE =========
var hamburger = document.querySelector('.nav__hamburger');
var overlay = document.querySelector('.nav__overlay');

hamburger.addEventListener('click', function () {
  hamburger.classList.toggle('active');
  overlay.classList.toggle('open');
  if (overlay.classList.contains('open')) {
    window.scrollTo(0, 0);
    document.body.style.overflow = 'hidden';
  } else {
    document.body.style.overflow = '';
  }
});

// Close overlay when any direct link is clicked
overlay.querySelectorAll('a').forEach(function (link) {
  link.addEventListener('click', function () {
    hamburger.classList.remove('active');
    overlay.classList.remove('open');
    document.body.style.overflow = '';
    overlay.querySelectorAll('.nav__overlay-group').forEach(function (g) {
      g.classList.remove('open');
    });
  });
});

// Mobile overlay accordion — one group open at a time
overlay.querySelectorAll('.nav__overlay-toggle').forEach(function (toggle) {
  toggle.addEventListener('click', function () {
    var group = toggle.closest('.nav__overlay-group');
    var isOpen = group.classList.contains('open');
    overlay.querySelectorAll('.nav__overlay-group').forEach(function (g) {
      g.classList.remove('open');
    });
    if (!isOpen) {
      group.classList.add('open');
    }
  });
});

// ========= DESKTOP DROPDOWNS =========
var dropdownItems = document.querySelectorAll('.nav__item--has-dropdown');

dropdownItems.forEach(function (item) {
  var toggle = item.querySelector('.nav__dropdown-toggle');

  toggle.addEventListener('click', function (e) {
    e.stopPropagation();
    var isOpen = item.classList.contains('open');
    dropdownItems.forEach(function (i) {
      i.classList.remove('open');
      i.querySelector('.nav__dropdown-toggle').setAttribute('aria-expanded', 'false');
    });
    if (!isOpen) {
      item.classList.add('open');
      toggle.setAttribute('aria-expanded', 'true');
    }
  });

  item.querySelectorAll('.nav__dropdown a').forEach(function (link) {
    link.addEventListener('click', function () {
      item.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
    });
  });
});

document.addEventListener('click', function () {
  dropdownItems.forEach(function (i) {
    i.classList.remove('open');
    i.querySelector('.nav__dropdown-toggle').setAttribute('aria-expanded', 'false');
  });
});

// ========= FADE-IN ON SCROLL =========
var faders = document.querySelectorAll('.fade-in');

if ('IntersectionObserver' in window) {
  var fadeObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        fadeObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -50px 0px'
  });

  faders.forEach(function (el) {
    fadeObserver.observe(el);
  });
}

// ========= HERO BACKGROUND PARALLAX =========
var heroBgImg = document.querySelector('.hero__bg img');

if (heroBgImg) {
  window.addEventListener('scroll', function () {
    var scrollY = window.scrollY;
    var heroHeight = document.querySelector('.hero').offsetHeight;
    if (scrollY < heroHeight) {
      heroBgImg.style.transform = 'translateY(' + (scrollY * 0.3) + 'px) scale(1)';
    }
  }, { passive: true });
}

// ========= TESTIMONIAL ROTATION =========
var slides = document.querySelectorAll('.testimonial__slide');
var dots = document.querySelectorAll('.testimonial__dot');
var currentSlide = 0;

function showSlide(index) {
  slides.forEach(function (s) { s.classList.remove('active'); });
  dots.forEach(function (d) { d.classList.remove('active'); });
  slides[index].classList.add('active');
  dots[index].classList.add('active');
  currentSlide = index;
}

dots.forEach(function (dot) {
  dot.addEventListener('click', function () {
    showSlide(parseInt(dot.getAttribute('data-index'), 10));
  });
});

if (slides.length > 1) {
  setInterval(function () {
    showSlide((currentSlide + 1) % slides.length);
  }, 6000);
}

// ========= GALLERY DRAG SCROLL =========
var track = document.querySelector('.gallery__track');

if (track) {
  var isDown = false;
  var startX;
  var scrollLeft;

  track.addEventListener('mousedown', function (e) {
    isDown = true;
    track.style.cursor = 'grabbing';
    startX = e.pageX - track.offsetLeft;
    scrollLeft = track.scrollLeft;
  });

  track.addEventListener('mouseleave', function () {
    isDown = false;
    track.style.cursor = 'grab';
  });

  track.addEventListener('mouseup', function () {
    isDown = false;
    track.style.cursor = 'grab';
  });

  track.addEventListener('mousemove', function (e) {
    if (!isDown) return;
    e.preventDefault();
    var x = e.pageX - track.offsetLeft;
    var walk = (x - startX) * 1.5;
    track.scrollLeft = scrollLeft - walk;
  });
}

// ========= NETWORK CLUSTER ENTRANCE + GLOW =========
var networkCluster = document.querySelector('.network__cluster');

if (networkCluster && 'IntersectionObserver' in window) {
  new IntersectionObserver(function(entries) {
    if (entries[0].isIntersecting) {
      var STAGGER    = 0.12;   // seconds between each name appearing
      var ENTER_DUR  = 0.9;    // entrance animation duration (seconds)
      var FADE_MS    = 500;    // glow fade transition (ms)
      var GLOW_ON_MS = 1800;   // how long each name stays lit (ms)

      var names = Array.from(networkCluster.querySelectorAll('.network__name'));

      // Shuffle entrance order so names appear in random positions
      var order = names.map(function(_, i) { return i; });
      for (var i = order.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var tmp = order[i]; order[i] = order[j]; order[j] = tmp;
      }

      // Apply entrance-only animations (random red flash → white)
      names.forEach(function(el, i) {
        el.style.animation = 'name-entrance ' + ENTER_DUR + 's ease-out ' + (order[i] * STAGGER) + 's 1 normal both';
      });

      // Once all entrances are done, hand off to JS-driven sequential glow
      var totalMs = Math.ceil(((names.length - 1) * STAGGER + ENTER_DUR) * 1000) + 350;
      setTimeout(function() {
        // Freeze all names at white with a smooth color transition enabled
        names.forEach(function(el) {
          el.style.cssText = 'opacity:1;color:rgba(255,255,255,0.5);text-shadow:none;' +
            'transition:color ' + (FADE_MS / 1000) + 's ease,text-shadow ' + (FADE_MS / 1000) + 's ease;';
        });

        // Sequential random glow — strictly one name at a time
        var current = -1;
        (function next() {
          // Fade out the current name
          if (current !== -1) {
            names[current].style.color = 'rgba(255,255,255,0.5)';
            names[current].style.textShadow = 'none';
          }
          // Wait for fade-out, then light up a new random name
          setTimeout(function() {
            var pick;
            do { pick = Math.floor(Math.random() * names.length); }
            while (pick === current);
            current = pick;
            names[current].style.color = '#E05535';
            names[current].style.textShadow = '0 0 28px rgba(224,85,53,0.45)';
            setTimeout(next, GLOW_ON_MS);
          }, current === -1 ? 0 : FADE_MS);
        })();

      }, totalMs);

      this.disconnect();
    }
  }, { threshold: 0.15 }).observe(networkCluster);
}

// ========= DYNAMIC COPYRIGHT YEAR =========
var yearEl = document.querySelector('.footer__year');
if (yearEl) { yearEl.textContent = new Date().getFullYear(); }

// ========= STAT COUNT-UP =========
var statNumbers = document.querySelectorAll('.stats__number[data-target]');
var statsAnimated = false;

function animateCountUp(el) {
  var target = parseInt(el.getAttribute('data-target'), 10);
  var suffix = el.getAttribute('data-suffix') || '';
  var duration = 1800;
  var startTime = null;

  function easeOutCubic(t) {
    return 1 - Math.pow(1 - t, 3);
  }

  function tick(now) {
    if (!startTime) startTime = now;
    var elapsed = now - startTime;
    var progress = Math.min(elapsed / duration, 1);
    var easedProgress = easeOutCubic(progress);
    var current = Math.round(easedProgress * target);

    el.textContent = current + suffix;

    if (progress < 1) {
      requestAnimationFrame(tick);
    }
  }

  requestAnimationFrame(tick);
}

function triggerStatCountUp() {
  if (statsAnimated) return;
  statsAnimated = true;
  statNumbers.forEach(function (el, i) {
    setTimeout(function () {
      animateCountUp(el);
    }, i * 150);
  });
}

// Trigger count-up when stats bar becomes visible
var statsBar = document.querySelector('.stats');

if (statsBar && 'IntersectionObserver' in window) {
  var statsObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        triggerStatCountUp();
        statsObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  statsObserver.observe(statsBar);
}
