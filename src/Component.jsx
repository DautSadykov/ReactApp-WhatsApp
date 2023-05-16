import React from 'react';

export default function Component() {
  const handleClick = () => {
    const inputElement = document.getElementById('myInput');
    const text = inputElement.value;
    const displayElement = document.getElementById('myDisplay');
    displayElement.textContent = text;
  };

  return (
    <div>
      <h1 id="myDisplay"></h1>
      <input id="myInput" type="text" />
      <button onClick={handleClick}>Change text</button>
    </div>
  );
}