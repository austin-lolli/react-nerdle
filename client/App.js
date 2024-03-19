// client/App.js

import React, { useState } from 'react';
import Row from './Row';
import Square from './Square';
import './output.css';

function App() {
  // dummy guess if needed for display purposes: [1, 7, '+', 2, 4, '=', 4, 1]
  let guesses = [[1, 7, '+', 2, 4, '=', 4, 1], [], [], [], [], []]; // use something like this as state for holding past guesses and passing to guess rows
  let currentGuess = 1;
  const rows = [];

  const [texts, setTexts] = useState(guesses);
  const [currentIndex, setCurrentIndex] = useState(0);

  // probably want to use state for current guess as well... 

  // add logic to update the 'selected' square
  const updateText = (text) => {
    const updatedText = [...texts];
    updatedText[currentGuess][currentIndex] = text;
    setTexts(updatedText);
    setCurrentIndex(currentIndex < 7 ? currentIndex + 1 : 7);
    // console.log(text + " was clicked");
    // console.log(texts[currentGuess]);
  }

  const receiveIndexFromRow = (index) => {
    // console.log("Hit recieveIndexFromRow function");
    setCurrentIndex(index);
  }

  // const submitGuess = () => {
  //   console.log("Placeholder for submit guess... ");
  // }


  for (let i = 0; i < 6; ++i) { 
    rows.push(<Row values={texts[i]} currentRow={i === currentGuess} sendDataToApp={receiveIndexFromRow}/>);
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
          {/* <button className="box-border basis-[25%] p-4 m-1 bg-slate-300 rounded-md text-2xl font-medium" onClick={submitGuess()}>Enter</button> */}
        </div>
      </div>
    </div>
  );
}


export default App;
