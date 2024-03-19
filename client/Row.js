// client/App.js

import React, { useState } from 'react';
import Square from './Square';
import './output.css';

// to do: add a prop for 'current' row. Only squares in current row can be selected or updated

// can we ensure a min height on the rows to keep the boxes square? 
// if not, revert by removing all tailwind classes from Row and Square
// may need a prop and logic for determining if the rendered row is the current row, may consider moving this to App if there's not enough to abstract to here
// need to either emit the selectedSquareIndex to Parent App component, or move this inside of that 

function Row({values, currentRow, sendDataToApp}) {
  const [selectedSquareIndex, setSelectedSquareIndex] = useState(0);

  const selectSquare = (index) => {
    setSelectedSquareIndex(index);
    console.log(index + " square clicked!");
    sendDataToApp(index);
  };

  return (
    <div className="container mx-auto flex flex-row">
      <Square value={values[0]} isSelected={currentRow && selectedSquareIndex === 0} onClick={() => selectSquare(0)} />
      <Square value={values[1]} isSelected={currentRow && selectedSquareIndex === 1} onClick={() => selectSquare(1)} />
      <Square value={values[2]} isSelected={currentRow && selectedSquareIndex === 2} onClick={() => selectSquare(2)} />
      <Square value={values[3]} isSelected={currentRow && selectedSquareIndex === 3} onClick={() => selectSquare(3)} />
      <Square value={values[4]} isSelected={currentRow && selectedSquareIndex === 4} onClick={() => selectSquare(4)} />
      <Square value={values[5]} isSelected={currentRow && selectedSquareIndex === 5} onClick={() => selectSquare(5)} />
      <Square value={values[6]} isSelected={currentRow && selectedSquareIndex === 6} onClick={() => selectSquare(6)} />
      <Square value={values[7]} isSelected={currentRow && selectedSquareIndex === 7} onClick={() => selectSquare(7)} />
    </div>
  );
}

export default Row;