import { useState } from 'react'
import $ from 'jquery';
import Menu from './assets/menu.jsx'
import './App.css'
import {Scoreboard, incrementScore, resetScore, restartScore} from './assets/scoreboard.jsx';
import { Card } from './assets/cards.jsx';

var gameState = "running";

function Board(){
  function shuffleDeck(deck){
    var drawn = -1
    var shuffleDeck = Array();
    while (deck.length > 0){
      drawn = deck.splice(Math.random() * deck.length, 1)[0];
      shuffleDeck.push(drawn);
    }
    return shuffleDeck;
  }

  function startCards(deck, cards){
    var returnCards = Array(cards.length);
    for(var x = 0; x < cards.length;x++){
      returnCards[x] = deck.pop();
    }
    return returnCards;
  }

  function guessedWrong(i){
    var cardArray = document.getElementsByClassName("card");
    var card = cardArray[i];
    resetScore();
    card.setAttribute("disabled", "true");
  }

  let startDeck = shuffleDeck([2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,6,6,6,6,7,7,7,7,8,8,8,8,9,9,9,9,10,10,10,10,11,11,11,11,12,12,12,12,13,13,13,13,14,14,14,14]);
  let startingCards = startCards(startDeck, Array(9).fill(null));
  const[deck, setDeck] = useState(startDeck);
  const[cards, setCards] = useState(startingCards);
  // const[level, setLevel] = useState(1);
  // const[requiredScore, setRequiredScore] = useState(level * 1000);

  function handleCardCick(i){
    var nextCards = cards.slice();
    nextCards[i] = deck.pop();
    var guess = $("#guessBox").is(":checked");
    var badGuess = false;

    if(guess && cards[i] <= nextCards[i]){
      badGuess = true;
    } else if (!guess && cards[i] >= nextCards[i]){
      badGuess = true;
    }
    if(badGuess){
      guessedWrong(i);
    } else {
      incrementScore();
    }

    checkGameEnd();
    setCards(nextCards);
  }

  function checkGameEnd(){
    var htmlCards = document.getElementsByClassName("card");
    
    var openCard = false;
    for(var x = 0; x < htmlCards.length; x++){
      if(!htmlCards[x].getAttribute("disabled")){
        openCard = true;
      }
    }

    if(!openCard){
      alert("You Lose");
      gameState = "Lost";
    }

    if(deck.length == 0){
      alert("You Win!");
      gameState = "Won"
    }

    if(gameState != 'Running'){
      $("#endGameDiv")[0].setAttribute("style", "display: inline");
      $("#boardDiv")[0].setAttribute("style", "display: none");
      if(gameState == "Won"){
        $("#endGameText").text("You Win");
      } else {
        $("#endGameText").text("You Lose!");
      }
    }
  }

  function resetGame(){
    startDeck = shuffleDeck([2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,6,6,6,6,7,7,7,7,8,8,8,8,9,9,9,9,10,10,10,10,11,11,11,11,12,12,12,12,13,13,13,13,14,14,14,14]);
    startingCards = startCards(startDeck, Array(9).fill(null));
    var cardArray = document.getElementsByClassName("card");
    for(var card of cardArray){
      card.removeAttribute("disabled");
    }
    $("#endGameDiv")[0].setAttribute("style", "display: none");
    $("#boardDiv")[0].setAttribute("style", "display: inline");
    restartScore();
    setDeck(startDeck);
    setCards(startingCards);
  }

  return(
    <>
    <div id="endGameDiv" style={{display: "none"}}>
      <div id="endGameText">
        
      </div>
      <button onClick={resetGame}>
        Play Again
      </button>
    </div> 
    <div id="boardDiv" style={{display: "none"}}>
      <div>Cards Remaining: {deck.length}</div>
      <ul id='boardList'>
        <div className='boardRow'>
          <Card className="card" id="card0" value={cards[0]} cardOnClick={() => handleCardCick(0)}/>
          <Card className="card" id="card1" value={cards[1]} cardOnClick={() => handleCardCick(1)}/>
          <Card className="card" id="card2" value={cards[2]} cardOnClick={() => handleCardCick(2)}/>
        </div>
        <div className='boardRow'>
          <Card className="card" id="card3" value={cards[3]} cardOnClick={() => handleCardCick(3)}/>
          <Card className="card" id="card4" value={cards[4]} cardOnClick={() => handleCardCick(4)}/>
          <Card className="card" id="card5" value={cards[5]} cardOnClick={() => handleCardCick(5)}/>
        </div>
        <div className='boardRow'>
          <Card className="card" id="card6" value={cards[6]} cardOnClick={() => handleCardCick(6)}/>
          <Card className="card" id="card7" value={cards[7]} cardOnClick={() => handleCardCick(7)}/>
          <Card className="card" id="card8" value={cards[8]} cardOnClick={() => handleCardCick(8)}/>
        </div>
      </ul>
      <button onClick={resetGame}>
        Reset
      </button>
    </div>
    </>
  )
}

export default function Game(){
  return(
    <>
    <div id="appDiv">
    <Menu />
    <div id="gameDiv" style={{display: "none"}}>
    <Scoreboard />
    <Board />
    </div>
    </div>
    </>
  )
}