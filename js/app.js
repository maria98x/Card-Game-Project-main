// variables
var cards = document.querySelectorAll(".card");
var cardsArray = [];
const timer = document.getElementById("timer");
var movesCount = document.getElementById("moves");
var heart = document.getElementById("heart");
var restart = document.getElementById("restart");
var finishGame = document.querySelector(".endMsg");
var finishBut = document.querySelector(".endButton");
var deck = document.querySelector("#deck");
var beforeShuffle = Array.from(cards);
let time = 0;
let timerID = 0;
let timeOut = true;
var counter = 0;
var matchedCardNums = 0;
var heartDec = 2;

//functions
//shuffle
function shuffle(array) {
  var currentIndex = array.length,
    temporaryValue,
    randomIndex;
  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}
//shuffleArray();
function shuffleArray() {
  var afterShuffle = shuffle(beforeShuffle);
  for (const card of afterShuffle) {
    deck.appendChild(card);
  }
}

function openedCard(card){

}
//if cards matched
function cardsMatch() {
  cardsArray[0].classList.add("match");
  cardsArray[1].classList.add("match");
  cardsArray = [];

  checkGameFinish();
}
// if cards not matched
function cardsNotMach() {
  cardsArray[0].classList.remove("open");
  cardsArray[1].classList.remove("open");
  cardsArray = [];
}
// initilaze timer
function initTimer() {
  timeOut = false;
  timerID = setInterval(() => {
    //to play the function again each second
    time++;
    timerCount();
  }, 1000);
}

function timerCount() {
  const min = Math.floor(time / 60);
  const sec = time % 60;
  if (sec < 10) {
    timer.innerHTML = `${min}:0${sec}`;
  } else {
    timer.innerHTML = `${min}:${sec}`;
  }
}

// stop and clear the timer
function stopTimer() {
  clearInterval(timerID);
  timeOut = true;
}
//set moves in html
function movesSet() {
  movesCount.innerHTML = counter + " moves";
}
//decrease number of heart
function deleteHeart() {
  heart.children[heartDec].style.display = "none";
  heartDec--;
}
//restart game
function restartGame() {
  timer.innerHTML = "0:00";
  stopTimer();
  cardsArray = [];
  matchedCardNums = 0;
  min = 0;
  sec = 0;
  counter = 0;
  movesCount.innerHTML = counter + " moves";

  for (let i = 0; i < heart.childElementCount; i++) {
    heart.children[i].style.display = "inline";
  }

  for (let i = 0; i < cards.length; i++) {
    cards[i].classList.remove("open");
    cards[i].classList.remove("match");
  }
  shuffleArray();
}
// if game finished
function checkGameFinish() {
  if (matchedCardNums == 8) {
      finishGame.style.display ="inline"
    document.getElementById("totalMoves").innerHTML =
      "Total moves: " + movesCount.innerHTML;
    document.getElementById("totalTime").innerHTML = "in: " + timer.innerHTML;
    document.getElementById("totalHearts").innerHTML =
      "Hearts: " + heart.innerHTML;

    restartGame();
  }
}

//listeners
for (let i = 0; i < cards.length; i++) {
  cards[i].addEventListener("click", function () {
    if (timeOut) {
      initTimer();
    }

    //هنا اول كارد تنضغط ويسويلها بوش
    if (cardsArray.length == 0) {
      cards[i].classList.add("open");
      cardsArray.push(cards[i]);
    }
    //هنا بعد ما تنضاف الكارد الاولى يشيك على الثانيه
    else if (cardsArray.length == 1) {
      if (!cardsArray.includes(cards[i])) {
        //اذا ضغط على الكارد مرتين المفروض مايدخل ذا الشرط
        counter++;
        movesSet();
        if (counter == 16 || counter == 24) {
          deleteHeart();
        }
        cards[i].classList.add("open");
        cardsArray.push(cards[i]);
      }
    }

    if (cardsArray.length == 2) {
      if (
        cardsArray[0].children[0].className ==
        cardsArray[1].children[0].className
      ) {
        matchedCardNums++;
        cardsMatch();
      } else {
        setTimeout("cardsNotMach()", 600);
      }
    }
  });
}

restart.addEventListener("click", restartGame);

finishBut.addEventListener("click", function () {
  finishGame.style.display = "none"
});
