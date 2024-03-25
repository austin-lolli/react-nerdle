// client/App.js

import React, { useState } from 'react';
import Row from './Row';
import './output.css';

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


  // add logic to update the 'selected' square
  const updateText = (text) => {
    const updatedText = [...texts];
    updatedText[currentGuess][currentIndex] = text;
    setTexts(updatedText);
    setCurrentIndex(currentIndex < 7 ? currentIndex + 1 : 7);
  }

  const receiveIndexFromRow = (index) => {
    setCurrentIndex(index);
  }

  // use this function to determine how to style guess buttons 
  const submitGuess = () => {
    const updatedGuess = [...feedback];
    const updatedButtonIndicators = new Map(buttonIndicators);

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

    setFeedback(updatedGuess);
    setCurrentGuess(currentGuess + 1);
    setCurrentIndex(0);
    setButtonIndicators(updatedButtonIndicators);
    remainingAnswer = answer;
  }


  for (let i = 0; i < 6; ++i) { 
    rows.push(<Row values={texts[i]} currentRow={i === currentGuess} sendDataToApp={receiveIndexFromRow} squareIndex={currentIndex} guessData={feedback[i]} />);
  }

  return (
    <div>
      <div className="bg-slate-400 m-10 container mx-auto">
        <h1 className="text-3xl font-bold underline">Nerdle.js</h1>
      </div>
      <div className="container mx-auto max-w-3xl">
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
          <button className={`box-border basis-[15%] p-4 m-1 rounded-md text-2xl font-medium 
                  ${buttonIndicators.get("+") === 'right' ? 'bg-emerald-700' : ''}
                  ${buttonIndicators.get("+") === 'close' ? 'bg-pink-800' : ''}
                  ${buttonIndicators.get("+") === 'wrong' ? 'bg-black' : ''}
                  ${buttonIndicators.has("+") ? 'text-white' : 'bg-slate-300'}`} 
                  onClick={() => updateText("+")}>+</button>
          <button className={`box-border basis-[15%] p-4 m-1 rounded-md text-2xl font-medium 
                  ${buttonIndicators.get("-") === 'right' ? 'bg-emerald-700' : ''}
                  ${buttonIndicators.get("-") === 'close' ? 'bg-pink-800' : ''}
                  ${buttonIndicators.get("-") === 'wrong' ? 'bg-black' : ''}
                  ${buttonIndicators.has("-") ? 'text-white' : 'bg-slate-300'}`} 
                  onClick={() => updateText("-")}>-</button>
          <button className={`box-border basis-[15%] p-4 m-1 rounded-md text-2xl font-medium 
                  ${buttonIndicators.get("*") === 'right' ? 'bg-emerald-700' : ''}
                  ${buttonIndicators.get("*") === 'close' ? 'bg-pink-800' : ''}
                  ${buttonIndicators.get("*") === 'wrong' ? 'bg-black' : ''}
                  ${buttonIndicators.has("*") ? 'text-white' : 'bg-slate-300'}`} 
                  onClick={() => updateText("*")}>*</button>
          <button className={`box-border basis-[15%] p-4 m-1 rounded-md text-2xl font-medium 
                  ${buttonIndicators.get("/") === 'right' ? 'bg-emerald-700' : ''}
                  ${buttonIndicators.get("/") === 'close' ? 'bg-pink-800' : ''}
                  ${buttonIndicators.get("/") === 'wrong' ? 'bg-black' : ''}
                  ${buttonIndicators.has("/") ? 'text-white' : 'bg-slate-300 '}`} 
                  onClick={() => updateText("/")}>/</button>
          <button className={`box-border basis-[15%] p-4 m-1 rounded-md text-2xl font-medium 
                  ${buttonIndicators.get("=") === 'right' ? 'bg-emerald-700' : ''}
                  ${buttonIndicators.get("=") === 'close' ? 'bg-pink-800' : ''}
                  ${buttonIndicators.get("=") === 'wrong' ? 'bg-black' : ''}
                  ${buttonIndicators.has("=") ? 'text-white' : 'bg-slate-300'}`} 
                  onClick={() => updateText("=")}>=</button>
          <button className="box-border basis-[25%] p-4 m-1 bg-slate-300 rounded-md text-2xl font-medium" onClick={() => submitGuess()}>Enter</button>
        </div>
      </div>
    </div>
  );
}


export default App;
