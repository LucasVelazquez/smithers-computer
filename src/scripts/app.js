const IMAGES_PATH = './src/images/';

let main;
let mainImage;
let selectedAudio;

let audios;
let images = [];
let loadedImagesCount = 0;

const loadResources = () => {
  for (let i = 0; i < 4; i++) {
    let image = new Image();
    image.src = IMAGES_PATH + i + '.jpg';
    image.addEventListener('load', checkImagesLoaded);
    images.push(image);
  }
};

const checkImagesLoaded = () => {
  if (++loadedImagesCount == images.length) {
    init();
  }
};

const init = () => {
  audios = [document.getElementById('message1'), document.getElementById('message2')];

  main = document.getElementById('main');
  mainImage = main.children[0];
  main.addEventListener('click', startAnimation);
};

const startAnimation = () => {
  if (selectedAudio && !selectedAudio.paused) {
    return;
  }

  selectedAudio = getRandomAudio();
  mainImage.src = images[1].src;
  setTimeout(() => {
    mainImage.src = images[2].src;
    selectedAudio.play();
    let actualImageIndex = 2;
    let animationInterval = setInterval(() => {
      if (selectedAudio.ended) {
        mainImage.src = images[2].src;
        clearInterval(animationInterval);
      } else {
        actualImageIndex = actualImageIndex == 2 ? 3 : 2;
        mainImage.src = images[actualImageIndex].src;
      }
    }, 300);
  }, 150);
};

const getRandomAudio = () => {
  return audios[Math.floor(Math.random() * 2)];
};

window.addEventListener('load', loadResources);
