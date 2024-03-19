// client/App.js

import React from 'react';
import './output.css';

// to do, add an onClick prop and handler that selects the box, so users can update a specific field in a guess
// border class applies but doesnt display, might be incomplete class or wrong class to add 
function Square({value, isSelected, onClick}) {
  return (
    <button className={`box-border h-20 basis-[12.5%] p-4 m-2 bg-green-300 rounded-md text-4xl font-medium ${isSelected ? ' border-black border-2' : ''}`} onClick={onClick} >
      {value}
    </button>
  );
}

export default Square;