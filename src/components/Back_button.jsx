import React from 'react';

const Back_button = ({ onClick, text }) => {
  return (
    <button onClick={onClick} class="mt-10 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
      {text}
    </button>
  );
};

export default Back_button;
