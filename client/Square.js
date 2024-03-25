// client/App.js

import React from 'react';
import './output.css';

// to do, add an onClick prop and handler that selects the box, so users can update a specific field in a guess
// border class applies but doesnt display, might be incomplete class or wrong class to add 
function Square({value, isSelected, onClick, guessFeedback}) {
  return (
    <button className={`box-border h-20 basis-[12.5%] p-4 m-1 rounded-md text-4xl font-medium text-white 
        ${isSelected ? ' border-black border-[3px]' : ''}
        ${guessFeedback === 'right' ? 'bg-emerald-700' : ''}
        ${guessFeedback === 'close' ? 'bg-pink-800' : ''}
        ${guessFeedback === 'wrong' ? 'bg-black' : ''}
        ${guessFeedback === '' ? 'bg-stone-400' : ''}
        `} 
      onClick={onClick} 
    >
      {value}
    </button>
  );
}

export default Square;