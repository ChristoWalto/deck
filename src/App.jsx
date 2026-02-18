import { useRef, useState } from 'react'
import './App.css'
import {Scoreboard} from './assets/scoreboard.jsx';
import { Card } from './assets/cards.jsx';

export default function Board(){
  const boardRef = useRef(0);
  const [gameState, setGameState] = useState("Starting");
  const [gameOverText, setGameOverText] = useState("");
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(1);
  const [total, setTotal] = useState(0);

  function incrementScore(){
    setScore(100);
    setStreak(streak + 1);
    setTotal(total + score * streak);
  }

  function resetScore(){
      setStreak(1);
  }

  function restartScore(){
      setScore(0);
      setStreak(1);
      setTotal(0);
  }
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
    var buttons = card.children;
    buttons[0].setAttribute("disabled", "true");
    buttons[1].setAttribute("disabled", "true");
  }

  let startDeck = shuffleDeck([2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,6,6,6,6,7,7,7,7,8,8,8,8,9,9,9,9,10,10,10,10,11,11,11,11,12,12,12,12,13,13,13,13,14,14,14,14]);
  let startingCards = startCards(startDeck, Array(9).fill(null));
  const[deck, setDeck] = useState(startDeck);
  const[cards, setCards] = useState(startingCards);

  function handleCardCick(i, higher){
    var nextCards = cards.slice();
    nextCards[i] = deck.pop();

    var badGuess = false;

    if(higher && cards[i] >= nextCards[i]){
      badGuess = true;
    } else if (!higher && cards[i] <= nextCards[i]){
      badGuess = true;
    }
    if(badGuess){
      guessedWrong(i);
    } else {
      incrementScore();
    }
    var board = boardRef.current;
    var card = board.querySelectorAll('div').item(i).childNodes;
    card.forEach(button => {
      button.classList.add("show");
    });
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
      setGameState("Lost");
      setGameOverText("You Lost");
    }

    if(deck.length == 0){
      setGameState("Won");
      setGameOverText("You Won");
    }
  }

  function resetGame(){
    console.log("resetting");
    startDeck = shuffleDeck([2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,6,6,6,6,7,7,7,7,8,8,8,8,9,9,9,9,10,10,10,10,11,11,11,11,12,12,12,12,13,13,13,13,14,14,14,14]);
    startingCards = startCards(startDeck, Array(9).fill(null));
    setGameState("Running");
    var cardArray = document.getElementsByClassName("card");
    for(var card of cardArray){
      card.removeAttribute("disabled");
      card.children[0].removeAttribute("disabled");
      card.children[1].removeAttribute("disabled");
    }
    restartScore();
    setDeck(startDeck);
    setCards(startingCards);
  }  

  function startGame(){
    setGameState("Running");
  }
  return(
    <>
    <div id="appDiv">
      {gameState == 'Starting' && (
      <div id="menuDiv">
        <h1>Beat the Deck!</h1>
        <button onClick={startGame} id="startButton">Start</button>
      </div>
      )}
      {gameState != 'Starting' && (
        <div id="gameDiv">
          <Scoreboard score={score} streak={streak} total={total} />
          {gameState != 'Running' && (
            <div id="endGameDiv">
              <div id="endGameText">
                {gameOverText}
              </div>
              <button onClick={resetGame}>
                Play Again
              </button>
            </div> 
          )}
          {gameState == "Running" && (
            <div id="boardDiv" >
              <div>Cards Remaining: {deck.length}</div>
              <ul id='boardList' ref={boardRef}>
                  <Card className="card" id="card0" value={cards[0]} clickHigher={() => handleCardCick(0, true)} clickLower={() => handleCardCick(0, false)}/>
                  <Card className="card" id="card1" value={cards[1]} clickHigher={() => handleCardCick(1, true)} clickLower={() => handleCardCick(1, false)}/>
                  <Card className="card" id="card2" value={cards[2]} clickHigher={() => handleCardCick(2, true)} clickLower={() => handleCardCick(2, false)}/>
                
                  <Card className="card" id="card3" value={cards[3]} clickHigher={() => handleCardCick(3, true)} clickLower={() => handleCardCick(3, false)}/>
                  <Card className="card" id="card4" value={cards[4]} clickHigher={() => handleCardCick(4, true)} clickLower={() => handleCardCick(4, false)}/>
                  <Card className="card" id="card5" value={cards[5]} clickHigher={() => handleCardCick(5, true)} clickLower={() => handleCardCick(5, false)}/>

                  <Card className="card" id="card6" value={cards[6]} clickHigher={() => handleCardCick(6, true)} clickLower={() => handleCardCick(6, false)}/>
                  <Card className="card" id="card7" value={cards[7]} clickHigher={() => handleCardCick(7, true)} clickLower={() => handleCardCick(7, false)}/>
                  <Card className="card" id="card8" value={cards[8]} clickHigher={() => handleCardCick(8, true)} clickLower={() => handleCardCick(8, false)}/>
              </ul>
              <button onClick={resetGame}>
                Reset
              </button>
            </div>
          )}
        </div>
      )}
    </div>
    </>
  )
}