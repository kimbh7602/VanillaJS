const body = document.querySelector("body");

const IMG_NUMBER = 7;

function paintImage(imgNumber) {
  const image = new Image();
  image.src = `./img/back${imgNumber}.jpg`;
  image.classList.add("bgImage");
  body.appendChild(image);
}

function resetImage(imgNumber) {
  const image = body.querySelector(".bgImage");
}

function getRandom() {
  const number = Math.floor(Math.random() * IMG_NUMBER + 1);
  return number;
}

function init() {
  const randomNumber = getRandom();
  paintImage(randomNumber);
  setInterval(function() {
    const exist = document.querySelector(".bgImage");
    exist.remove();
    const randomNumber = getRandom();
    paintImage(randomNumber);
  }, 3000);
}

init();
