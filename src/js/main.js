import fetchImages from '../api/fetchImages';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import '../css/styles.css'; // CSS dosyasını import edin

const searchForm = document.getElementById('search-form');
const searchInput = document.getElementById('search-input');
const gallery = document.getElementById('gallery');
const loader = document.getElementById('loader');

const clearGallery = () => {
  gallery.innerHTML = '';
};

let lightbox;

searchForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const query = searchInput.value.trim();
  if (!query) {
    iziToast.error({ title: '', message: 'Please enter a search query!' });
    return;
  }
  clearGallery();
  loader.classList.remove('hidden');
  try {
    const images = await fetchImages(query);
    if (images.length === 0) {
      iziToast.error({ title: '', message: 'Sorry, there are no images matching your search query. Please try again!' });
      loader.classList.add('hidden');
      return;
    }
    const imageCards = images.map((image) => `
      <a href="${image.largeImageURL}" class="gallery-item">
        <img src="${image.webformatURL}" alt="${image.tags}">
        <div class="info">
          <div class="stat">
            <span class="label">Likes</span>
            <span class="value">${image.likes}</span>
          </div>
          <div class="stat">
            <span class="label">Views</span>
            <span class="value">${image.views}</span>
          </div>
          <div class="stat">
            <span class="label">Comments</span>
            <span class="value">${image.comments}</span>
          </div>
          <div class="stat">
            <span class="label">Downloads</span>
            <span class="value">${image.downloads}</span>
          </div>
        </div>
      </a>
    `).join('');
    gallery.innerHTML = imageCards;

    if (lightbox) {
      lightbox.destroy();
    }
    lightbox = new SimpleLightbox('.gallery-item a', {
      captions: true,
      captionsData: 'alt',
      captionDelay: 250,
      close: true,
      loop: true,
      nav: true,
      swipeClose: true,
      animationSpeed: 250,
      fadeSpeed: 300
    });
    lightbox.refresh(); // Lightbox'u yenileyin
  } catch (error) {
    iziToast.error({ title: '', message: 'An error occurred. Please try again later.' });
  } finally {
    loader.classList.add('hidden');
  }
});
