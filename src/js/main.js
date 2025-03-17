import fetchImages from '../api/fetchImages';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const searchForm = document.getElementById('search-form');
const searchInput = document.getElementById('search-input');
const gallery = document.getElementById('gallery');
const loader = document.getElementById('loader');


let lightbox; // SimpleLightbox örneği

const clearGallery = () => {
  gallery.innerHTML = '';
};

const renderGallery = (images) => {
  const imageCards = images.map(image => `
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
};

searchForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const query = searchInput.value.trim();

  if (!query) {
    iziToast.error({ title: '', message: 'Please enter a search query!', backgroundColor: 'red', position: 'topRight' });
    return;
  }

  clearGallery();
  loader.classList.remove('hidden'); // Yükleyiciyi göster
  try {
    const images = await fetchImages(query);
    if (images.length === 0) {
      iziToast.error({ title: '', icon: 'fas fa-times-circle', message: 'Sorry, there are no images matching your search query. Please try again!', backgroundColor: 'red', position: 'topRight'});
      return;
    }

    renderGallery(images); 

    // SimpleLightbox'ı oluştur veya yenile
    if (lightbox) {
      lightbox.destroy(); // Önceki Lightbox'ı yok et
    }
    lightbox = new SimpleLightbox('.gallery-item', {
      captionsData: 'alt',
      captionDelay: 250,
      loop: true, // Slayt döngüsü etkinleştirildi
    });
  } catch (error) {
    iziToast.error({ title: '', message: 'An error occurred. Please try again!' });
  } finally {
    loader.classList.add('hidden'); // Yükleyiciyi gizle
  }
});

