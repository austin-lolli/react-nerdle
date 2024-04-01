// client/App.js

import React, { useState } from 'react';
import Row from './Row';
import './output.css';
import Popup from 'reactjs-popup';

function App() {
  // dummy guess if needed for display purposes: [1, 7, '+', 2, 4, '=', 4, 1]
  const answer = [5, 2, '+', 1, 7, '=', 6, 9];
  let remainingAnswer = [5, 2, '+', 1, 7, '=', 6, 9];
  let guesses = [[], [], [], [], [], []]; // use something like this as state for holding past guesses and passing to guess rows
  let guessData = [['', '', '', '', '', '', '', ''], 
    ['', '', '', '', '', '', '', ''], 
    ['', '', '', '', '', '', '', ''], 
    ['', '', '', '', '', '', '', ''], 
    ['', '', '', '', '', '', '', ''], 
    ['', '', '', '', '', '', '', '']
  ];
  const rows = [];

  const [texts, setTexts] = useState(guesses);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [feedback, setFeedback] = useState(guessData);
  const [currentGuess, setCurrentGuess] = useState(0);
  const [buttonIndicators, setButtonIndicators] = useState(new Map());
  const [gameIsWon, setGameIsWon] = useState(false);
  const [displayGameOver, setDisplayGameOver] = useState(false);
  
  
  const closeGameOverMenu = () => setDisplayGameOver(false);

  // add a delete button and corresponding logic
  const updateText = (text) => {
    const updatedText = [...texts];
    updatedText[currentGuess][currentIndex] = text;
    setTexts(updatedText);
    if(text === "") {
      setCurrentIndex(currentIndex > 0 ? currentIndex - 1 : 0);
    } else {
      setCurrentIndex(currentIndex < 7 ? currentIndex + 1 : 7);
    }
  }

  const receiveIndexFromRow = (index) => {
    setCurrentIndex(index);
  }

  // use this function to determine how to style guess buttons 
  // To Do: validate that guesses are an equation and that they compute
  // - resolves invalid guess submission
  // - prevents empty/incomplete guesses from being submitted

  const submitGuess = () => {
    const updatedGuess = [...feedback];
    const updatedButtonIndicators = new Map(buttonIndicators);

    // guess validation:
    // base cases: assert 8 characters and contains an equals sign, otherwise throw incomplete/expression vs equation error
    // need to parse left and right side of the '=' operator
    // eval left and eval right
    // assert that left = right
    // if so, proceed with guess logic, if not throw 'equation does not compute' and do not process guess

    for (let i = 0; i < 8; ++i) {
      updatedGuess[currentGuess][i] = 'wrong';
      if (texts[currentGuess][i] === answer[i]) {
        updatedGuess[currentGuess][i] = 'right';
        updatedButtonIndicators.set(texts[currentGuess][i], 'right');
        let index = remainingAnswer.indexOf(texts[currentGuess][i]);
        remainingAnswer.splice(index, 1);
      } 
    } 

    for (let i = 0; i < 8; ++i) {
      if (remainingAnswer.includes(texts[currentGuess][i])) {
        updatedGuess[currentGuess][i] = 'close';
        let index = remainingAnswer.indexOf(texts[currentGuess][i]);
        remainingAnswer.splice(index, 1);

        if (!updatedButtonIndicators.has(texts[currentGuess][i])) {
          updatedButtonIndicators.set(texts[currentGuess][i], 'close');
        }
      } else {
        if (!updatedButtonIndicators.has(texts[currentGuess][i])) {
          updatedButtonIndicators.set(texts[currentGuess][i], 'wrong');
        }
      }
    }

    const gameStatus = [...new Set(updatedGuess[currentGuess])];

    setFeedback(updatedGuess);
    setCurrentGuess(currentGuess + 1);
    setCurrentIndex(0);
    setButtonIndicators(updatedButtonIndicators);
    remainingAnswer = answer;

    // seems like the set functions are asyncronous with the execution of this function, so checking currentGuess = 5 (on last guess vs on first guess not allowed/past limit)
    if (gameStatus.length === 1 && gameStatus[0] === 'right') {
      setGameIsWon(true);
      setDisplayGameOver(true);
    } else if (currentGuess === 5) {
      setDisplayGameOver(true);
    }

  }

  // eventually add a play again button and some extra styling to pop up to make it look nicer 
  const GameOverPopup = () => (
    <Popup open={displayGameOver} closeOnDocumentClick onClose={closeGameOverMenu}>
      <div className="w-96 h-64 bg-slate-200 rounded-sm static border border-slate-700">
        <a className="rounded-full h-6 w-6 bg-slate-300 border border-slate-700 cursor-pointer font-medium text-xl text-center absolute -top-2 -right-2" onClick={closeGameOverMenu}>
          &times;
        </a>
        <h1 className="font-medium font-mono text-2xl">{gameIsWon ? 'You won!' : 'You lost!'}</h1>
        <p className="font-mono text-lg">{gameIsWon ? 'You found the correct equation in ' + currentGuess + ' guesses, nicely done!' : 'You ran out of guesses! The equation was ' + answer.join('')}</p>
      </div>
    </Popup>
  )


  for (let i = 0; i < 6; ++i) { 
    rows.push(<Row values={texts[i]} currentRow={i === currentGuess} sendDataToApp={receiveIndexFromRow} squareIndex={currentIndex} guessData={feedback[i]} />);
  }

  return (
    <div>
      <div className="bg-slate-400 m-10 container mx-auto">
        <h1 className="text-3xl font-bold underline">Nerdle.js</h1>
      </div>
      <div className="container mx-auto max-w-3xl">
        <GameOverPopup/>
        <div id="popup-root" />
        {rows}
        <div className="container mx-auto flex flex-row">
          <button className={`box-border basis-[10%] p-4 m-1 rounded-md text-2xl font-medium 
                  ${buttonIndicators.get(1) === 'right' ? 'bg-emerald-700' : ''}
                  ${buttonIndicators.get(1) === 'close' ? 'bg-pink-800' : ''}
                  ${buttonIndicators.get(1) === 'wrong' ? 'bg-black' : ''}
                  ${buttonIndicators.has(1) ? 'text-white' : 'bg-slate-300'}`} 
                  onClick={() => updateText(1)}>1</button>
          <button className={`box-border basis-[10%] p-4 m-1 rounded-md text-2xl font-medium 
                  ${buttonIndicators.get(2) === 'right' ? 'bg-emerald-700' : ''}
                  ${buttonIndicators.get(2) === 'close' ? 'bg-pink-800' : ''}
                  ${buttonIndicators.get(2) === 'wrong' ? 'bg-black' : ''}
                  ${buttonIndicators.has(2) ? 'text-white' : 'bg-slate-300'}`} 
                  onClick={() => updateText(2)}>2</button>
          <button className={`box-border basis-[10%] p-4 m-1 rounded-md text-2xl font-medium 
                  ${buttonIndicators.get(3) === 'right' ? 'bg-emerald-700' : ''}
                  ${buttonIndicators.get(3) === 'close' ? 'bg-pink-800' : ''}
                  ${buttonIndicators.get(3) === 'wrong' ? 'bg-black' : ''}
                  ${buttonIndicators.has(3) ? 'text-white' : 'bg-slate-300'}`} 
                  onClick={() => updateText(3)}>3</button>
          <button className={`box-border basis-[10%] p-4 m-1 rounded-md text-2xl font-medium 
                  ${buttonIndicators.get(4) === 'right' ? 'bg-emerald-700' : ''}
                  ${buttonIndicators.get(4) === 'close' ? 'bg-pink-800' : ''}
                  ${buttonIndicators.get(4) === 'wrong' ? 'bg-black' : ''}
                  ${buttonIndicators.has(4) ? 'text-white' : 'bg-slate-300'}`} 
                  onClick={() => updateText(4)}>4</button>
          <button className={`box-border basis-[10%] p-4 m-1 rounded-md text-2xl font-medium 
                  ${buttonIndicators.get(5) === 'right' ? 'bg-emerald-700' : ''}
                  ${buttonIndicators.get(5) === 'close' ? 'bg-pink-800' : ''}
                  ${buttonIndicators.get(5) === 'wrong' ? 'bg-black' : ''}
                  ${buttonIndicators.has(5) ? 'text-white' : 'bg-slate-300'}`} 
                  onClick={() => updateText(5)}>5</button>
          <button className={`box-border basis-[10%] p-4 m-1 rounded-md text-2xl font-medium 
                  ${buttonIndicators.get(6) === 'right' ? 'bg-emerald-700' : ''}
                  ${buttonIndicators.get(6) === 'close' ? 'bg-pink-800' : ''}
                  ${buttonIndicators.get(6) === 'wrong' ? 'bg-black' : ''}
                  ${buttonIndicators.has(6) ? 'text-white' : 'bg-slate-300'}`} 
                  onClick={() => updateText(6)}>6</button>
          <button className={`box-border basis-[10%] p-4 m-1 rounded-md text-2xl font-medium 
                  ${buttonIndicators.get(7) === 'right' ? 'bg-emerald-700' : ''}
                  ${buttonIndicators.get(7) === 'close' ? 'bg-pink-800' : ''}
                  ${buttonIndicators.get(7) === 'wrong' ? 'bg-black' : ''}
                  ${buttonIndicators.has(7) ? 'text-white' : 'bg-slate-300'}`} 
                  onClick={() => updateText(7)}>7</button>
          <button className={`box-border basis-[10%] p-4 m-1 rounded-md text-2xl font-medium 
                  ${buttonIndicators.get(8) === 'right' ? 'bg-emerald-700' : ''}
                  ${buttonIndicators.get(8) === 'close' ? 'bg-pink-800' : ''}
                  ${buttonIndicators.get(8) === 'wrong' ? 'bg-black' : ''}
                  ${buttonIndicators.has(8) ? 'text-white' : 'bg-slate-300'}`} 
                  onClick={() => updateText(8)}>8</button>
          <button className={`box-border basis-[10%] p-4 m-1 rounded-md text-2xl font-medium 
                  ${buttonIndicators.get(9) === 'right' ? 'bg-emerald-700' : ''}
                  ${buttonIndicators.get(9) === 'close' ? 'bg-pink-800' : ''}
                  ${buttonIndicators.get(9) === 'wrong' ? 'bg-black' : ''}
                  ${buttonIndicators.has(9) ? 'text-white' : 'bg-slate-300'}`} 
                  onClick={() => updateText(9)}>9</button>
          <button className={`box-border basis-[10%] p-4 m-1 rounded-md text-2xl font-medium 
                  ${buttonIndicators.get(0) === 'right' ? 'bg-emerald-700' : ''}
                  ${buttonIndicators.get(0) === 'close' ? 'bg-pink-800' : ''}
                  ${buttonIndicators.get(0) === 'wrong' ? 'bg-black' : ''}
                  ${buttonIndicators.has(0) ? 'text-white' : 'bg-slate-300'}`} 
                  onClick={() => updateText(0)}>0</button>  
        </div>
        <div className="container mx-auto flex flex-row">
          <button className={`box-border basis-[10%] p-4 m-1 rounded-md text-2xl font-medium 
                  ${buttonIndicators.get("+") === 'right' ? 'bg-emerald-700' : ''}
                  ${buttonIndicators.get("+") === 'close' ? 'bg-pink-800' : ''}
                  ${buttonIndicators.get("+") === 'wrong' ? 'bg-black' : ''}
                  ${buttonIndicators.has("+") ? 'text-white' : 'bg-slate-300'}`} 
                  onClick={() => updateText("+")}>+</button>
          <button className={`box-border basis-[10%] p-4 m-1 rounded-md text-2xl font-medium 
                  ${buttonIndicators.get("-") === 'right' ? 'bg-emerald-700' : ''}
                  ${buttonIndicators.get("-") === 'close' ? 'bg-pink-800' : ''}
                  ${buttonIndicators.get("-") === 'wrong' ? 'bg-black' : ''}
                  ${buttonIndicators.has("-") ? 'text-white' : 'bg-slate-300'}`} 
                  onClick={() => updateText("-")}>-</button>
          <button className={`box-border basis-[10%] p-4 m-1 rounded-md text-2xl font-medium 
                  ${buttonIndicators.get("*") === 'right' ? 'bg-emerald-700' : ''}
                  ${buttonIndicators.get("*") === 'close' ? 'bg-pink-800' : ''}
                  ${buttonIndicators.get("*") === 'wrong' ? 'bg-black' : ''}
                  ${buttonIndicators.has("*") ? 'text-white' : 'bg-slate-300'}`} 
                  onClick={() => updateText("*")}>*</button>
          <button className={`box-border basis-[10%] p-4 m-1 rounded-md text-2xl font-medium 
                  ${buttonIndicators.get("/") === 'right' ? 'bg-emerald-700' : ''}
                  ${buttonIndicators.get("/") === 'close' ? 'bg-pink-800' : ''}
                  ${buttonIndicators.get("/") === 'wrong' ? 'bg-black' : ''}
                  ${buttonIndicators.has("/") ? 'text-white' : 'bg-slate-300 '}`} 
                  onClick={() => updateText("/")}>/</button>
          <button className={`box-border basis-[10%] p-4 m-1 rounded-md text-2xl font-medium 
                  ${buttonIndicators.get("=") === 'right' ? 'bg-emerald-700' : ''}
                  ${buttonIndicators.get("=") === 'close' ? 'bg-pink-800' : ''}
                  ${buttonIndicators.get("=") === 'wrong' ? 'bg-black' : ''}
                  ${buttonIndicators.has("=") ? 'text-white' : 'bg-slate-300'}`} 
                  onClick={() => updateText("=")}>=</button>
          <button className="box-border basis-[25%] p-4 m-1 bg-slate-300 rounded-md text-2xl font-medium" onClick={() => updateText("")}>Delete</button>
          <button className="box-border basis-[25%] p-4 m-1 bg-slate-300 rounded-md text-2xl font-medium" onClick={() => submitGuess()}>Enter</button>
        </div>
      </div>
    </div>
  );
}


export default App;
