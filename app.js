// dom elements
const tableGame = document.querySelector('#cards');
const restartGameBtn = document.querySelector('.restart');
const nextCard = document.querySelector('#next-card');
const yourScore = document.querySelector('#score');
const cards = document.querySelectorAll('.card .fas')
let cardsGame = [];
let score = 0;
let isFlipped;

const startGame = () => {
  for(let i = 0; i < cards.length; i++){
    cardsGame.push(cards[i].className);
  }
  isFlipped = false;
}

window.addEventListener('load', startGame);

//function to flip the card
const flipTheCard = (e) => {
  if(e.target.className === 'card' && !e.target.classList.contains('matched') && !isFlipped){
    e.target.classList.add('show');
    isFlipped = true;
    score++;

    //check for a match
    //if it's match add to a match array else flip back score++
    checkForMatch(e.target);
    yourScore.innerText = score;

    if(!checkForMatch(e.target)){
      setTimeout(() => {
        e.target.classList.remove('show');
        isFlipped = false;
      }, 500)
    }
    winGame();
  }
}

tableGame.addEventListener('click', flipTheCard)

const checkForMatch = (card) => {
  if(card.children[0].className === nextCard.children[0].className){
    card.classList.add('matched');

    cardsGame = cardsGame.filter(element => element !== card.children[0].className)
    nextCard.innerHTML = `<i class="${cardsGame[getRandomArbitrary(0, cardsGame.length-1)]}"></i>`
  }
}

const winGame = () => {
  if(cardsGame.length === 0){
    alert(`You've matched all the cards. You win with ${score} points!`);
  }
}

const restartGame = () => {
  for (let i = 0; i < cards.length; i++){
    cards[i].parentNode.classList.remove('show', 'matched');
    cardsGame.push(cards[i].className);
  } 
  score = 0;
  yourScore.innerText = score;
  cardsGame = shuffle(cardsGame);

  for(let j = 0; j < cardsGame.length; j++){
    if(cards[j] === undefined){
      return;
    } else {
      cards[j].className = cardsGame[j];     
    }
  }
  nextCard.innerHTML = `<i class="${cardsGame[getRandomArbitrary(0, cardsGame.length-1)]}"></i>`;
}

restartGameBtn.addEventListener('click', restartGame);

//shuffle function 
function shuffle(array) {
  let currentIndex = array.length,
    temporaryValue, randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  
  return array;
}

function getRandomArbitrary(min, max) {
  return Math.floor(Math.random() * (max + 1 - min)) + min;
}


