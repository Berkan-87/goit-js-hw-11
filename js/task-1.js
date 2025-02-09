// ul#categories içindeki kategorilerin sayısını hesapla
const categoriesEl = document.querySelector('#categories');
const itemsEl = categoriesEl.querySelectorAll('.item');

console.log(`Number of categories: ${itemsEl.length}`);

itemsEl.forEach(item => {
  const titleEl = item.querySelector('h2').textContent;
  const elementsCount = item.querySelectorAll('ul li').length;
  console.log(`Category: ${titleEl}`);
  console.log(`Elements: ${elementsCount}`);
});
