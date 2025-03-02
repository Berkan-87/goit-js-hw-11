import fetchImages from '../api/fetchImages';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const searchForm = document.getElementById('search-form');
const searchInput = document.getElementById('search-input');
const gallery = document.getElementById('gallery');
const loader = document.getElementById('loader');

const clearGallery = () => {
  gallery.innerHTML = '';
};

searchForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const query = searchInput.value.trim();
  if (!query) {
    iziToast.error({ title: 'Error', message: 'Please enter a search query!' });
    return;
  }
  clearGallery();
  loader.classList.remove('hidden');
  try {
    const images = await fetchImages(query);
    if (images.length === 0) {
      iziToast.error({ title: 'Error', message: 'Sorry, there are no images matching your search query. Please try again!' });
      loader.classList.add('hidden');
      return;
    }
    const imageCards = images.map((image) => `
      <a href="${image.largeImageURL}" class="gallery-item">
        <img src="${image.webformatURL}" alt="${image.tags}">
        <div class="info">
          <p>Likes: ${image.likes}</p>
          <p>Views: ${image.views}</p>
          <p>Comments: ${image.comments}</p>
          <p>Downloads: ${image.downloads}</p>
        </div>
      </a>
    `).join('');
    gallery.innerHTML = imageCards;
    new SimpleLightbox('.gallery a').refresh();
  } catch (error) {
    iziToast.error({ title: 'Error', message: 'An error occurred. Please try again later.' });
  } finally {
    loader.classList.add('hidden');
  }
});
