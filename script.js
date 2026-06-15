const menu = document.querySelector('.menu');
const mobileNav = document.querySelector('.mobile-nav');
const mobileLinks = document.querySelectorAll('.mobile-nav a');
const artGrid = document.querySelector('#artGrid');
const prev = document.querySelector('#prev');
const next = document.querySelector('#next');
const form = document.querySelector('.contact-form');
const note = document.querySelector('.form-note');

menu?.addEventListener('click', () => {
  const open = mobileNav.classList.toggle('open');
  menu.setAttribute('aria-expanded', String(open));
});

mobileLinks.forEach(link => {
  link.addEventListener('click', () => {
    mobileNav.classList.remove('open');
    menu?.setAttribute('aria-expanded', 'false');
  });
});

function scrollCards(direction) {
  if (!artGrid) return;
  const card = artGrid.querySelector('article');
  const distance = card ? card.clientWidth + 37 : 320;
  artGrid.scrollBy({ left: direction * distance, behavior: 'smooth' });
}

prev?.addEventListener('click', () => scrollCards(-1));
next?.addEventListener('click', () => scrollCards(1));

form?.addEventListener('submit', event => {
  event.preventDefault();
  note.textContent = 'Thank you. This demo form is ready to connect to your email or backend.';
  form.reset();
});
