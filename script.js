const menu = document.querySelector('.menu');
const mobileNav = document.querySelector('.mobile-nav');
const mobileLinks = document.querySelectorAll('.mobile-nav a');
const artGrid = document.querySelector('#artGrid');
const moreProducts = document.querySelector('#moreProducts');
const lightbox = document.querySelector('#imageLightbox');
const lightboxImage = document.querySelector('.lightbox-image');
const lightboxClose = document.querySelector('.lightbox-close');

function createArtworkCard(artwork, contactHref) {
  const article = document.createElement('article');
  const details = [
    artwork.size ? `<li>Size: ${artwork.size}</li>` : '',
    artwork.year ? `<li>Year: ${artwork.year}</li>` : '',
    artwork.woods ? `<li>Used wood: ${artwork.woods}</li>` : ''
  ].filter(Boolean).join('') || '<li>Details coming soon</li>';

  article.innerHTML = `
    <img src="${artwork.image}" alt="${artwork.alt}" />
    <h3>${artwork.title}</h3>
    <p>Marquetry Artwork</p>
    <ul class="art-specs">
      ${details}
    </ul>
    <a href="${contactHref}">View Details <span>→</span></a>
  `;
  return article;
}

function renderArtworks() {
  if (!artGrid || !Array.isArray(window.ZARWOOD_ARTWORKS)) return;
  const contactHref = artGrid.dataset.contactHref || '#contact';

  artGrid.innerHTML = '';
  window.ZARWOOD_ARTWORKS.forEach(artwork => {
    artGrid.appendChild(createArtworkCard(artwork, contactHref));
  });
}

renderArtworks();

const productCards = artGrid ? Array.from(artGrid.querySelectorAll('article')) : [];

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

function getGridColumnCount() {
  if (!artGrid) return 1;
  const columns = getComputedStyle(artGrid).gridTemplateColumns;
  return Math.max(1, columns.split(' ').filter(Boolean).length);
}

function getInitialProductCount() {
  if (window.matchMedia('(max-width: 720px)').matches) return 2;
  return getGridColumnCount() * 2;
}

let visibleProductCount = getInitialProductCount();

function updateProductVisibility() {
  if (!moreProducts || !productCards.length) return;

  productCards.forEach((card, index) => {
    card.classList.toggle('product-hidden', index >= visibleProductCount);
  });

  moreProducts.hidden = false;
}

moreProducts?.addEventListener('click', () => {
  window.location.href = 'gallery.html';
});

window.addEventListener('resize', () => {
  visibleProductCount = getInitialProductCount();
  updateProductVisibility();
});

updateProductVisibility();

function openLightbox(image) {
  if (!lightbox || !lightboxImage) return;
  lightboxImage.src = image.currentSrc || image.src;
  lightboxImage.alt = image.alt;
  lightbox.classList.add('open');
  lightbox.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  if (!lightbox || !lightboxImage) return;
  lightbox.classList.remove('open');
  lightbox.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
  lightboxImage.src = '';
  lightboxImage.alt = '';
}

artGrid?.querySelectorAll('img').forEach(image => {
  image.addEventListener('click', () => openLightbox(image));
});

lightboxClose?.addEventListener('click', closeLightbox);

lightbox?.addEventListener('click', event => {
  if (event.target === lightbox) closeLightbox();
});

document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && lightbox?.classList.contains('open')) {
    closeLightbox();
  }
});
