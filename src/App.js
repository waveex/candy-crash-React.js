import React, { useState, useEffect } from "react";
const width = 8;
const candyColors = ["blue", "green", "orange", "purple", "red", "yellow"];

const App = () => {
  const [currnetColorArrangement, setCurrnetColorArrangement] = useState([]);

  const createBoard = () => {
    const randomColorArrangement = [];
    for (let i = 0; i < width * width; i++) {
      const randomColor =
        candyColors[Math.floor(Math.random() * candyColors.length)];
      randomColorArrangement.push(randomColor);
    }
    setCurrnetColorArrangement(randomColorArrangement);
  };
  useEffect(() => {
    createBoard();
  }, []);
  return (
    <div>
      <div className="app">
        <div className="game">
          {currnetColorArrangement.map((currentColor, index) => (
            <img
              key={index}
              style={{backgroundColor : currentColor}}

            />
          )) }
        </div>
      </div>
    </div>
  );
};

export default App;
