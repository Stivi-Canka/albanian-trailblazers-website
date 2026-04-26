document.querySelectorAll('.job-card__header').forEach(header => {
  header.addEventListener('click', () => {
    const card = header.closest('.job-card');
    const isOpen = card.classList.toggle('is-open');
    header.setAttribute('aria-expanded', String(isOpen));
  });

  header.addEventListener('keydown', e => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      header.click();
    }
  });
});

const dialog = document.getElementById('notLiveDialog');

document.querySelectorAll('.job-card__apply').forEach(btn => {
  const href = btn.getAttribute('href');
  if (href && href !== '#' && !href.startsWith('javascript:')) return;
  btn.addEventListener('click', e => {
    e.preventDefault();
    dialog.showModal();
  });
});

document.querySelector('.app-dialog__close').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', e => { if (e.target === dialog) dialog.close(); });
