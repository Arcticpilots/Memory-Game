/*
 * Create a list that holds all of your cards
 */
let cards = document.querySelectorAll('.card');
let openCards = [];
let moves = 0;
let counter = document.querySelector('.moves');
const deck = document.querySelector('.deck');
let nbOfStars = 3 ;
let matchedCards = document.querySelectorAll('.match');
let matchedCardCount =0 ;

let sec = 0, min = 0;
const timer = document.querySelector('.timer');
let interval;

const stars = document.querySelectorAll(".stars");

let modal =  document.querySelector('.modal');
const closeBtn = document.querySelector(".close");
const replayBtn = document.querySelector('.replay');

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

function randomize(){
    shuffuledCards = shuffle([...cards]);
    const deck = document.querySelector('.deck');
    deck.innerHTML = '' ;
    shuffuledCards.forEach(function(item){
      deck.appendChild(item);
    });
}

document.addEventListener('DOMContentLoaded', startGame);

/*
 * set up the event listener for a card. If a card is clicked:
 */

//Check if all cards are matched return true if they are
function allmatched(){
  if(matchedCardCount === 16) return true ;
  return false ;
}

//add event listener when a card is clicked
$('.deck').on('click', '.card', function () {
    $(this).addClass('open');
    $(this).addClass('show');
    openCards.push(this);
    $(this).addClass('disabled');

    if (openCards.length === 2) {
        incrementCounter();
        let name1 = openCards[0].innerHTML;
        let name2 = openCards[1].innerHTML;
        if (name1 === name2) {
            matched();

            if (allmatched()) {
                displayScore();
            }
        }
        else {
            unmatched();
        }
    }
});

$('.restart').on('click',startGame);

//disable cards temporarily by adding diasabled class
function disable(){
  cards.forEach(function(card){
    card.classList.add('disabled');
  });
}

//enable the cards by removing disabled class
function enable(){
  cards.forEach(function(card){
      card.classList.remove('disabled');
  });
  for(let i=0 ; i<matchedCards.length ; i++){
    matchedCards[i].classList.add('disabled');
  }
}

//when two cards match add "match" class and remove other classes
function matched() {
    openCards[0].classList.add("match");
    openCards[1].classList.add("match");
    openCards[0].classList.remove("show", "open");
    openCards[1].classList.remove("show", "open");
    openCards = [];
    matchedCardCount += 2;
}

//when cards don't match remove "match" class and keep them open for 1 sec
function unmatched() {
    openCards[0].classList.remove("match");
    openCards[1].classList.remove("match");
    disable();
    setTimeout(function () {
        openCards[0].classList.remove("show", "open");
        openCards[1].classList.remove("show", "open");
        openCards = [];
        enable();
    }, 1000);
}

/*  - display the card's symbol (put this functionality in another function that you call from this one)
*  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
*  - if the list already has another card, check to see if the two cards match
*    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
*    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
*    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
*    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
*/

//starts timer when first card is clicked
function startTimer() {
    interval = setInterval(function () {
        timer.textContent = min + ": " + sec ;
        sec++;
        if (sec == 60) {
            min++;
            sec = 0;
        }
        if (min == 60) {
            hour++;
            min = 0;
        }
    }, 1000);
}

//increment moves and display them of page with the according star rating
function incrementCounter() {
    moves++;
    counter.innerHTML = moves ;
    //start timer on first move
    if (moves == 1) {
        sec = 0;
        min = 0;
        hour = 0;
        startTimer();
    }
    // setting rates based on moves
    if(moves>0 && moves <=10){
      stars[1].innerHTML =  '<li><i class="fa fa-star"></i></li> <li><i class="fa fa-star"></i></li> <li><i class="fa fa-star"></i></li>' ;
    }
    else if(moves>11 && moves<=18){
      stars[1].innerHTML = '	<li><i class="fa fa-star"></i></li> <li><i class="fa fa-star"></i></li> <li><i class="fa fa-star-o" aria-hidden="true"></i></li>' ;
    }
    else if(moves >= 19){
      nbOfStars = 1;
      stars[1].innerHTML = '	<li><i class="fa fa-star"></i></li> <li><i class="fa fa-star-o" aria-hidden="true"></i></li> <li><i class="fa fa-star-o" aria-hidden="true"></i></li>' ;
    }
}

//Default parameters are restored to start new game
function startGame() {
    // shuffle deck
    randomize();
    // remove all existing classes from each card
    cards.forEach(function(card) {card.classList.remove("match","open","show")});
    moves = 0;
    counter.innerHTML = moves;

    // reset star rating
    stars[1].innerHTML = '<li><i class="fa fa-star"></i></li><li><i class="fa fa-star"></i></li><li><i class="fa fa-star"></i></li>';
    //reset timer
    timer.innerHTML = "00:00" ;
    clearInterval(interval);
}

// display the score when all cards match, show modal and moves, time and stars rating + replay button
function displayScore() {
    finalTime = timer.textContent ;
    clearInterval(interval);
    // show modal
     $('.container').css({"position" : "absolute" , "z-index" : "-1"});
     modal.style.display = 'block' ;
     modal.style.position = 'fixed' ;

    //show moves, rating, time elapsed on modal
    document.querySelector(".score").textContent = moves;
    stars[0].innerHTML = stars[1].innerHTML;
    document.querySelector(".timeElapsed").innerHTML = finalTime;

    //add event listener for closing modal and replay button
    closeModal();
    playAgain();
}


//close modal onclick on (x)
function closeModal() {
    closeBtn.addEventListener("click", function () {
        modal.style.display = "none";
       $('.container').css({"position" : "absolute" , "z-index" : "0"});
        startGame();
    });
}

//restore default parameters when replay button is clicked
function playAgain() {
    replayBtn.addEventListener('click' , function(){
        modal.style.display = "none";
        $('.container').css({"position" : "absolute" , "z-index" : "0"});
        startGame();
    });
}
