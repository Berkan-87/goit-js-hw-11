function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0')}`;
  }
  
  const controls = document.querySelector('#controls');
  const boxesContainer = document.querySelector('#boxes');
  const input = controls.querySelector('input');
  const createButton = controls.querySelector('button[data-create]');
  const destroyButton = controls.querySelector('button[data-destroy]');
  
  function createBoxes(amount) {
    boxesContainer.innerHTML = ''; // Mevcut kutuları temizleyin
    for (let i = 0; i < amount; i++) {
      const box = document.createElement('div');
      const size = 30 + i * 10;
      box.style.width = `${size}px`;
      box.style.height = `${size}px`;
      box.style.backgroundColor = getRandomHexColor();
      boxesContainer.appendChild(box);
    }
  }
  
  function destroyBoxes() {
    boxesContainer.innerHTML = '';
  }
  
  createButton.addEventListener('click', () => {
    const amount = Number(input.value);
    if (amount >= 1 && amount <= 100) {
      createBoxes(amount);
      input.value = ''; // Giriş değerini temizle
    } else {
      alert('Please enter a number between 1 and 100');
    }
  });
  
  destroyButton.addEventListener('click', () => {
    destroyBoxes();
  });
  