/*
 * Create a list that holds all of your cards
 */
let cards = document.querySelectorAll('.card');

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

document.addEventListener('DOMContentLoaded', randomize());

/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
let openCards = [] ;
let counter = 0;
let nbOfStars = 3;
cards = document.querySelectorAll('.card');

function showSymbol(card){
  card.classList.add('show','open');
}

function hideSymbol(card1 , card2){
  card1.classList.remove('show','open');
  card2.classList.remove('show','open');
}

function matched(card1 , card2){
  card1.classList.add('match');
  card2.classList.add('match');
  hideSymbol(card1 , card2);
}

function increment(ct){
  counter++;
  const moves = document.querySelector('.moves');
  moves.textContent = counter ;
}

function allmatched(){
  const matchedCards = document.querySelectorAll('.match');
  if(matchedCards.length === 16) return true ;
  return false ;
}

function displayScore(ct,nbStars){
   // TODO:  Display score page !!
   let text = '<div> <h1 style="text-align:center;">Congratulations !</h1><p>You have won using '+ct+' moves</p><p>Your score:</p>' ;
   if(nbStars === 0) text +='<li><i class="fa fa-star-o" aria-hidden="true"></i></li> <li><i class="fa fa-star-o" aria-hidden="true"></i></li> <li><i class="fa fa-star-o" aria-hidden="true"></i></li>' ;
   if(nbStars === 1) text+= '	<li><i class="fa fa-star"></i></li> <li><i class="fa fa-star-o" aria-hidden="true"></i></li> <li><i class="fa fa-star-o" aria-hidden="true"></i></li>' ;
   if(nbStars === 2) text += '	<li><i class="fa fa-star"></i></li> <li><i class="fa fa-star"></i></li> <li><i class="fa fa-star-o" aria-hidden="true"></i></li>' ;
   if(nbStars === 3) text += '<li><i class="fa fa-star"></i></li> <li><i class="fa fa-star"></i></li> <li><i class="fa fa-star"></i></li>' ;
   text += '</div>';
   document.body.innerHTML = text ;
}


function starScore(ct){
  let stars=document.querySelector('.stars');
  if(ct>0 && ct <=19){
    stars.innerHTML =  '<li><i class="fa fa-star"></i></li> <li><i class="fa fa-star"></i></li> <li><i class="fa fa-star"></i></li>' ;
  }
  else if(ct>20 && ct<=28){
    nbOfStars = 2;
    stars.innerHTML = '	<li><i class="fa fa-star"></i></li> <li><i class="fa fa-star"></i></li> <li><i class="fa fa-star-o" aria-hidden="true"></i></li>' ;
  }
  else if(ct>29 && ct<=35){
    nbOfStars = 1;
    stars.innerHTML = '	<li><i class="fa fa-star"></i></li> <li><i class="fa fa-star-o" aria-hidden="true"></i></li> <li><i class="fa fa-star-o" aria-hidden="true"></i></li>' ;
  }
  else {
    nbOfStars = 0;
    stars.innerHTML = '<li><i class="fa fa-star-o" aria-hidden="true"></i></li> <li><i class="fa fa-star-o" aria-hidden="true"></i></li> <li><i class="fa fa-star-o" aria-hidden="true"></i></li>' ;
  }
}

function addToList(card){
  openCards.push(card);
  if(openCards.length === 2){
    showSymbol(openCards[1]);
    if(openCards[0].innerHTML === card.innerHTML){
      matched(openCards[0] , card);
      openCards = [];
    }
    else{
      hideSymbol(openCards[0] , card);
      openCards = [];
    }
  }
  increment(counter);
  starScore(counter);
  if(allmatched()){
    displayScore(counter,nbOfStars);
  }
}

let cardItems = document.querySelectorAll('.card');

[].forEach.call(cardItems, function(card) {
  card.addEventListener('click', function(){
  showSymbol(card);
  addToList(card);
});
});


let restartBtn = document.querySelector('.restart') ;
restartBtn.addEventListener('click', function(){
        // WE REMOVE EVERY CLASS FROM ALL OF THE CARDS (RELOAD)
  randomize();
  for(card of cards){
    if(card.classList.length > 1){
      card.classList.remove('match','show','open');
    }
  }
  counter = 0;
  let moves = document.querySelector('.moves');
  moves.textContent = counter ;
  let stars=document.querySelector('.stars');
  stars.innerHTML =  '<li><i class="fa fa-star"></i></li> <li><i class="fa fa-star"></i></li> <li><i class="fa fa-star"></i></li>' ;
});
