import axios from 'axios';

const API_KEY = '49003372-3de9a450de0a99d64583d6c94';
const BASE_URL = 'https://pixabay.com/api/';

export async function fetchImages(query) {
  try {
    const response = await axios.get(BASE_URL, {
      params: {
        key: API_KEY,
        q: query,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching images:', error);
    throw error;
  }
}
