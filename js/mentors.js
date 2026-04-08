// ========= CATEGORY LABELS =========
var categoryLabels = {
  'accounting-finance': 'Finance',
  'biology-biotech': 'Biology',
  'business': 'Business',
  'college-apps': 'College Apps',
  'fintech': 'FinTech',
  'hr-recruiting': 'HR',
  'law': 'Law',
  'math-cs': 'Math & CS',
  'medicine': 'Medicine',
  'polisci': 'Pol. Science'
};

var filterToggle = document.getElementById('filterToggle');
var filterDropdown = document.getElementById('filterDropdown');
var filterButtons = document.querySelectorAll('.mentors-filter');
var mentorCards = document.querySelectorAll('.mentor-card');

var modal = document.getElementById('mentorModal');
var modalClose = document.getElementById('mentorModalClose');
var modalBackdrop = document.getElementById('mentorModalBackdrop');

// ========= INJECT CATEGORY TAGS =========
mentorCards.forEach(function(card) {
  var info = card.querySelector('.mentor-card__info');
  var categories = (card.getAttribute('data-category') || '').split(' ').filter(Boolean);
  if (categories.length) {
    var tagsDiv = document.createElement('div');
    tagsDiv.className = 'mentor-card__tags';
    categories.forEach(function(cat) {
      var tag = document.createElement('span');
      tag.className = 'mentor-card__tag';
      tag.textContent = categoryLabels[cat] || cat;
      tagsDiv.appendChild(tag);
    });
    info.appendChild(tagsDiv);
  }
});

// ========= DROPDOWN FILTER =========
filterToggle.addEventListener('click', function() {
  filterToggle.classList.toggle('open');
  filterDropdown.classList.toggle('open');
});

document.addEventListener('click', function(e) {
  if (!filterToggle.contains(e.target) && !filterDropdown.contains(e.target)) {
    filterToggle.classList.remove('open');
    filterDropdown.classList.remove('open');
  }
});

filterButtons.forEach(function(btn) {
  btn.addEventListener('click', function() {
    filterButtons.forEach(function(b) { b.classList.remove('active'); });
    btn.classList.add('active');

    var filter = btn.getAttribute('data-filter');
    var label = filter === 'all' ? 'Filter by field' : btn.textContent;
    filterToggle.firstChild.textContent = label + ' ';

    mentorCards.forEach(function(card) {
      if (filter === 'all') {
        card.classList.remove('hidden');
      } else {
        var categories = card.getAttribute('data-category') || '';
        card.classList.toggle('hidden', categories.indexOf(filter) === -1);
      }
    });

    filterToggle.classList.remove('open');
    filterDropdown.classList.remove('open');
  });
});

// ========= MODAL =========
function openModal(card) {
  var img = card.querySelector('.mentor-card__image img');
  var name = card.querySelector('.mentor-card__name').textContent;
  var role = card.querySelector('.mentor-card__role').textContent;
  var bio = card.querySelector('.mentor-card__bio p').innerHTML;
  var categories = (card.getAttribute('data-category') || '').split(' ').filter(Boolean);

  document.getElementById('mentorModalImg').src = img.src;
  document.getElementById('mentorModalImg').alt = img.alt;
  document.getElementById('mentorModalName').textContent = name;
  document.getElementById('mentorModalRole').textContent = role;
  document.getElementById('mentorModalBio').innerHTML = bio;

  var tagsEl = document.getElementById('mentorModalTags');
  tagsEl.innerHTML = '';
  categories.forEach(function(cat) {
    var tag = document.createElement('span');
    tag.className = 'mentor-card__tag';
    tag.textContent = categoryLabels[cat] || cat;
    tagsEl.appendChild(tag);
  });

  modal.classList.add('open');
  modal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  modal.classList.remove('open');
  modal.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

mentorCards.forEach(function(card) {
  card.addEventListener('click', function() { openModal(card); });
});

modalClose.addEventListener('click', closeModal);
modalBackdrop.addEventListener('click', closeModal);

document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') closeModal();
});
