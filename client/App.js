// client/App.js

import React, { useState } from 'react';
import Row from './Row';
import Square from './Square';
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
  // const [symbolCorrect, setSymbolCorrect] = useState([]);
  // const [symbolContains, setSymbolContains] = useState([]);
  // const [symbolAbsent, setSymbolAbsent] = useState([]);


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

    for (let i = 0; i < 8; ++i) {
      updatedGuess[currentGuess][i] = 'wrong';
      if (texts[currentGuess][i] === answer[i]) {
        updatedGuess[currentGuess][i] = 'right';
        let index = remainingAnswer.indexOf(texts[currentGuess][i]);
        remainingAnswer.splice(index, 1);
      } 
    } 

    for (let i = 0; i < 8; ++i) {
      if (remainingAnswer.includes(texts[currentGuess][i])) {
        updatedGuess[currentGuess][i] = 'close';
        let index = remainingAnswer.indexOf(texts[currentGuess][i]);
        remainingAnswer.splice(index, 1);
      } 
    }

    setFeedback(updatedGuess);
    setCurrentGuess(currentGuess + 1);
    setCurrentIndex(0);
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
          <button className="box-border basis-[10%] p-4 m-1 bg-slate-300 rounded-md text-2xl font-medium" onClick={() =>updateText(1)}>1</button>
          <button className="box-border basis-[10%] p-4 m-1 bg-slate-300 rounded-md text-2xl font-medium" onClick={() =>updateText(2)}>2</button>
          <button className="box-border basis-[10%] p-4 m-1 bg-slate-300 rounded-md text-2xl font-medium" onClick={() =>updateText(3)}>3</button>
          <button className="box-border basis-[10%] p-4 m-1 bg-slate-300 rounded-md text-2xl font-medium" onClick={() =>updateText(4)}>4</button>
          <button className="box-border basis-[10%] p-4 m-1 bg-slate-300 rounded-md text-2xl font-medium" onClick={() =>updateText(5)}>5</button>
          <button className="box-border basis-[10%] p-4 m-1 bg-slate-300 rounded-md text-2xl font-medium" onClick={() =>updateText(6)}>6</button>
          <button className="box-border basis-[10%] p-4 m-1 bg-slate-300 rounded-md text-2xl font-medium" onClick={() =>updateText(7)}>7</button>
          <button className="box-border basis-[10%] p-4 m-1 bg-slate-300 rounded-md text-2xl font-medium" onClick={() =>updateText(8)}>8</button>
          <button className="box-border basis-[10%] p-4 m-1 bg-slate-300 rounded-md text-2xl font-medium" onClick={() =>updateText(9)}>9</button>
          <button className="box-border basis-[10%] p-4 m-1 bg-slate-300 rounded-md text-2xl font-medium" onClick={() =>updateText(0)}>0</button>
        </div>
        <div className="container mx-auto flex flex-row">
          <button className="box-border basis-[15%] p-4 m-1 bg-slate-300 rounded-md text-2xl font-medium" onClick={() => updateText("+")}>+</button>
          <button className="box-border basis-[15%] p-4 m-1 bg-slate-300 rounded-md text-2xl font-medium" onClick={() => updateText("-")}>-</button>
          <button className="box-border basis-[15%] p-4 m-1 bg-slate-300 rounded-md text-2xl font-medium" onClick={() => updateText("*")}>*</button>
          <button className="box-border basis-[15%] p-4 m-1 bg-slate-300 rounded-md text-2xl font-medium" onClick={() => updateText("/")}>/</button>
          <button className="box-border basis-[15%] p-4 m-1 bg-slate-300 rounded-md text-2xl font-medium" onClick={() => updateText("=")}>=</button>
          <button className="box-border basis-[25%] p-4 m-1 bg-slate-300 rounded-md text-2xl font-medium" onClick={() => submitGuess()}>Enter</button>
        </div>
      </div>
    </div>
  );
}


export default App;
