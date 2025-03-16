const API_KEY = '49003372-3de9a450de0a99d64583d6c94';
const BASE_URL = 'https://pixabay.com/api/';

const fetchImages = async (query) => {
  const response = await fetch(`${BASE_URL}?key=${API_KEY}&q=${query}&image_type=photo&orientation=horizontal&safesearch=true`);
  const data = await response.json();
  return data.hits;
};

export default fetchImages;
