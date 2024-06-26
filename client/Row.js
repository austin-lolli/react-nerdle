// client/App.js

import React, { useState, useEffect } from 'react';
import Square from './Square';
import './output.css';

// to do: add a prop for 'current' row. Only squares in current row can be selected or updated

// can we ensure a min height on the rows to keep the boxes square? 
// if not, revert by removing all tailwind classes from Row and Square
// may need a prop and logic for determining if the rendered row is the current row, may consider moving this to App if there's not enough to abstract to here
// need to either emit the selectedSquareIndex to Parent App component, or move this inside of that 

function Row({values, currentRow, sendDataToApp, squareIndex, guessData}) {
  const [selectedSquareIndex, setSelectedSquareIndex] = useState(squareIndex);

  useEffect(() => {
    setSelectedSquareIndex(squareIndex);
  }, [squareIndex]);

  const selectSquare = (index) => {
    setSelectedSquareIndex(index);
    sendDataToApp(index);
  };

  // // setSelectedSquareIndex(squareIndex);
  // if (currentRow) {
  //   // setSelectedSquareIndex(squareIndex);
  //   console.log("Square Index prop: " + squareIndex);
  //   console.log("Square Index state: " + selectedSquareIndex);
  // }

  return (
    <div className="container mx-auto flex flex-row">
      <Square value={values[0]} isSelected={currentRow && selectedSquareIndex === 0} onClick={() => selectSquare(0)} guessFeedback={guessData[0]} />
      <Square value={values[1]} isSelected={currentRow && selectedSquareIndex === 1} onClick={() => selectSquare(1)} guessFeedback={guessData[1]} />
      <Square value={values[2]} isSelected={currentRow && selectedSquareIndex === 2} onClick={() => selectSquare(2)} guessFeedback={guessData[2]} />
      <Square value={values[3]} isSelected={currentRow && selectedSquareIndex === 3} onClick={() => selectSquare(3)} guessFeedback={guessData[3]} />
      <Square value={values[4]} isSelected={currentRow && selectedSquareIndex === 4} onClick={() => selectSquare(4)} guessFeedback={guessData[4]} />
      <Square value={values[5]} isSelected={currentRow && selectedSquareIndex === 5} onClick={() => selectSquare(5)} guessFeedback={guessData[5]} />
      <Square value={values[6]} isSelected={currentRow && selectedSquareIndex === 6} onClick={() => selectSquare(6)} guessFeedback={guessData[6]} />
      <Square value={values[7]} isSelected={currentRow && selectedSquareIndex === 7} onClick={() => selectSquare(7)} guessFeedback={guessData[7]} />
    </div>
  );
}

export default Row;