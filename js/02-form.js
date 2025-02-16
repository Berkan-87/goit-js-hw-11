const form = document.querySelector('.feedback-form');
const STORAGE_KEY = 'feedback-form-state';

// Formun yerel depodan doldurulması
const populateForm = () => {
  const savedData = localStorage.getItem(STORAGE_KEY);
  if (savedData) {
    const { email, message } = JSON.parse(savedData);
    form.elements.email.value = email || '';
    form.elements.message.value = message || '';
  }
};

// Form verilerinin yerel depoya kaydedilmesi
const saveFormData = (event) => {
  const email = form.elements.email.value.trim();
  const message = form.elements.message.value.trim();
  const formData = { email, message };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
};

// Form gönderildiğinde işlem
const handleSubmit = (event) => {
  event.preventDefault();
  const email = form.elements.email.value.trim();
  const message = form.elements.message.value.trim();

  if (email === '' || message === '') {
    alert('Lütfen tüm alanları doldurunuz.');
    return;
  }

  console.log({ email, message });

  localStorage.removeItem(STORAGE_KEY);
  form.reset();
};

// Formun yerel depodan doldurulması
populateForm();

// Olay dinleyiciler
form.addEventListener('input', saveFormData);
form.addEventListener('submit', handleSubmit);

const input = document.querySelector('.eposta');

// Input tıklanınca geçici yazıyı göster
input.addEventListener('mousedown', () => {
  input.setAttribute('placeholder', "Type area");
});

// Tıklama bırakıldığında veya input'tan çıkıldığında yazıyı kaldır
input.addEventListener('mouseup', () => {
  setTimeout(() => input.removeAttribute('placeholder'), 100);
});
input.addEventListener('blur', () => {
  input.removeAttribute('placeholder');
});
