import { fetchImages } from './api/pixabay';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.getElementById('search-form');
const gallery = document.querySelector('.gallery');
const loader = document.getElementById('loader');

let simpleLightbox;

function renderGallery(images) {
  const markup = images.map(image => {
    return `
      <li class="gallery-item">
        <a class="gallery-link" href="${image.largeImageURL}">
          <img src="${image.webformatURL}" alt="${image.tags}" />
        </a>
        <div class="info">
          <p><strong>Likes:</strong> ${image.likes}</p>
          <p><strong>Views:</strong> ${image.views}</p>
          <p><strong>Comments:</strong> ${image.comments}</p>
          <p><strong>Downloads:</strong> ${image.downloads}</p>
        </div>
      </li>`;
  }).join('');
  gallery.innerHTML = markup;
  if (simpleLightbox) {
    simpleLightbox.refresh();
  } else {
    simpleLightbox = new SimpleLightbox('.gallery a');
  }
}

form.addEventListener('submit', async (event) => {
  event.preventDefault();
  const query = event.currentTarget.elements.query.value.trim();
  if (query === '') {
    iziToast.warning({ title: 'Warning', message: 'Please enter a search query.' });
    return;
  }

  gallery.innerHTML = '';
  loader.style.display = 'block';

  try {
    const data = await fetchImages(query);
    if (data.hits.length > 0) {
      renderGallery(data.hits);
    } else {
      iziToast.info({ title: 'No results', message: 'Sorry, no images matching your search query.' });
    }
  } catch (error) {
    iziToast.error({ title: 'Error', message: 'Failed to fetch images.' });
  } finally {
    loader.style.display = 'none';
  }
});

console.log("Hello, TypeScript!");
