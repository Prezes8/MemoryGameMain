const cards = document.querySelectorAll('.memory-card');
let counter = 35;
let time = document.querySelector('.timer')


//timer

setInterval( function countdown(){
  counter--;

  if (counter >= 0){
    id = document.getElementById("timer");
    id.innerHTML = counter
  }
}, 1000);

let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;

// flip Animation

function flipCard() {
  if (lockBoard) return;
  if (this === firstCard) return;

  this.classList.add('flip');
  this.classList.add('border')

  if (!hasFlippedCard) {
    // first click
    hasFlippedCard = true;
    firstCard = this;
    win = false

    return;
  }

  // second click
  secondCard = this;

  checkForMatch();
}

function checkForMatch() {
  let isMatch = firstCard.dataset.food === secondCard.dataset.food;

  isMatch ? disableCards() : unflipCards();
}


function disableCards() {
  firstCard.removeEventListener('click', flipCard);
  secondCard.removeEventListener('click', flipCard);

  resetBoard();
}



function unflipCards() {
  lockBoard = true;

  setTimeout(() => {
    firstCard.classList.remove('flip');
    secondCard.classList.remove('flip');
    firstCard.classList.remove('border');
    secondCard.classList.remove('border');

    resetBoard();
  }, 900);
}

function resetBoard() {
  [hasFlippedCard, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
}

// shuffle

(function shuffle() {
  cards.forEach(card => {
    let randomPos = Math.floor(Math.random() * 12);
    card.style.order = randomPos;
  });
})();

cards.forEach(card => card.addEventListener('click', flipCard));