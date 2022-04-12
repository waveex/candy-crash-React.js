import React, { useState, useEffect } from "react";
import blueCandy from "./images/blue-candy.png";
import greenCandy from "./images/green-candy.png";
import orangeCandy from "./images/orange-candy.png";
import purpleCandy from "./images/purple-candy.png";
import redCandy from "./images/red-candy.png";
import yellowCandy from "./images/yellow-candy.png";
import blank from "./images/blank.png";
import Scoreboard from "./components/ScoreBoard";

const width = 8;
const candyColors = [
  blueCandy,
  greenCandy,
  orangeCandy,
  purpleCandy,
  redCandy,
  yellowCandy,
  blank,
];

const App = () => {
  const [currnetColorArrangement, setCurrnetColorArrangement] = useState([]);
  const [squereBeingDragged, setSquereBeingDragged] = useState(null);
  const [squerBeingReplaced, setSquerBeingReplaced] = useState(null);
  const [scoreDisplay, setScoreDisplay] = useState(0);

  const checkForRowOfFour = () => {

    for (let i = 0; i < 64; i++) {
      const rowOfFour = [i, i + 1, i + 2, i + 3];
      const decidedColor = currnetColorArrangement[i];
      const notValid = [
        5, 6, 7, 13, 14, 15, 21, 22, 23, 29, 30, 31, 37, 38, 39, 45, 46, 47, 53,
        54, 55, 62, 63, 64,
      ];
      const isBlank = currnetColorArrangement[i] === blank

      if (notValid.includes(i)) continue;

      if (
        rowOfFour.every(
          (square) => currnetColorArrangement[square] === decidedColor && !isBlank
        )
      ) {
        setScoreDisplay((score) => score + 4);
        rowOfFour.forEach(
          (square) => (currnetColorArrangement[square] = blank)
        );
        return true;
      }
    }
  };

  const checkForRowOfThree = () => {
    for (let i = 0; i < 64; i++) {
      const rowOfThree = [i, i + 1, i + 2];
      const decidedColor = currnetColorArrangement[i];
      const notValid = [
        5, 6, 7, 13, 14, 15, 21, 22, 23, 30, 31, 38, 39, 46, 47, 54, 55, 63, 64,
      ];
      const isBlank = currnetColorArrangement[i] === blank
      if (notValid.includes(i)) continue;

      if (
        rowOfThree.every(
          (square) => currnetColorArrangement[square] === decidedColor && !isBlank
        )
      ) {
        setScoreDisplay((score) => score + 3);
        rowOfThree.forEach(
          (square) => (currnetColorArrangement[square] = blank)
        );
        return true;
      }
    }
  };

  const checkForColumnOfFour = () => {
    for (let i = 0; i <= 39; i++) {
      const columnOfFour = [i, i + width, i + width * 2, i + width * 3];
      const decidedColor = currnetColorArrangement[i];
      const isBlank = currnetColorArrangement[i] === blank
      if (
        columnOfFour.every(
          (square) => currnetColorArrangement[square] === decidedColor && !isBlank
        )
      ) {
        setScoreDisplay((score) => score + 4);
        columnOfFour.forEach(
          (square) => (currnetColorArrangement[square] = blank)
        );
        return true;
      }
    }
  };
  const checkForColumnOfThree = () => {
    for (let i = 0; i <= 47; i++) {
      const columnOfThree = [i, i + width, i + width * 2];
      const decidedColor = currnetColorArrangement[i];
      const isBlank = currnetColorArrangement[i] === blank
      if (
        columnOfThree.every(
          (square) => currnetColorArrangement[square] === decidedColor && !isBlank
        )
      ) {
        setScoreDisplay((score) => score + 3);
        columnOfThree.forEach(
          (square) => (currnetColorArrangement[square] = blank)
        );
        return true;
      }
    }
  };

  const moveIntoSquareBelow = () => {
    for (let i = 0; i <= 55; i++) {
      const firstRow = [0, 1, 2, 3, 4, 5, 6, 7];
      const isFirstRow = firstRow.includes(i);
      if (isFirstRow && currnetColorArrangement[i] === blank) {
        let randomNumber = Math.floor(Math.random() * candyColors.length);
        currnetColorArrangement[i] = candyColors[randomNumber];
      }
      if (currnetColorArrangement[i + width] === blank) {
        currnetColorArrangement[i + width] = currnetColorArrangement[i];
        currnetColorArrangement[i] = blank;
      }
    }
  };


  const dragStart = (e) => {
    console.log(e.target);
    console.log("drag start");
    setSquereBeingDragged(e.target);
  };
  const dragDrop = (e) => {
    console.log(e.target);
    console.log("drag drop");
    setSquerBeingReplaced(e.target);
  };
  const dragEnd = (e) => {
    console.log("drag end");
    const squerBeingDragededId = parseInt(
      squereBeingDragged.getAttribute("data-id")
    );
    const squerBeingReplacedId = parseInt(
      squerBeingReplaced.getAttribute("data-id")
    );
    currnetColorArrangement[squerBeingReplacedId] =
      squereBeingDragged.getAttribute("src");
    currnetColorArrangement[squerBeingDragededId] =
      squerBeingReplaced.getAttribute("src");

    console.log(squerBeingDragededId, squerBeingReplacedId);

    const validMoves = [
      squerBeingDragededId - 1,
      squerBeingDragededId - width,
      squerBeingDragededId + 1,
      squerBeingDragededId + width,
    ];
    const validMove = validMoves.includes(squerBeingReplacedId);
    const isAColumnOfFour = checkForColumnOfFour();
    const isARowOfFour = checkForRowOfFour();
    const isAColumnOfThree = checkForColumnOfThree();
    const isARowOfThree = checkForRowOfThree();
    if (
      squerBeingReplacedId &&
      validMove &&
      (isAColumnOfFour || isARowOfFour || isAColumnOfThree || isARowOfThree)
    ) {
      setSquereBeingDragged(null);
      setSquerBeingReplaced(null);
    } else {
      currnetColorArrangement[squerBeingReplacedId] =
        squerBeingReplaced.getAttribute("src");
      currnetColorArrangement[squerBeingDragededId] =
        squereBeingDragged.getAttribute("src");
      setCurrnetColorArrangement([...currnetColorArrangement]);
    }
  };
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

  useEffect(() => {
    const timer = setInterval(() => {
      checkForColumnOfFour();
      checkForColumnOfThree();
      checkForRowOfFour();
      checkForRowOfThree();
      moveIntoSquareBelow();
      setCurrnetColorArrangement([...currnetColorArrangement]);
    }, 1);
    return () => clearInterval(timer);
  }, [

    checkForColumnOfFour,
    checkForRowOfFour,
    checkForRowOfThree,
    checkForColumnOfThree,
    moveIntoSquareBelow,
    currnetColorArrangement,
  ]);

  return (
    <div>
      <div className="app">
        <div className="game">
          {currnetColorArrangement.map((candyColor, index) => (
            <img
              key={index}
              src={candyColor}
              alt={candyColor}
              data-id={index}
              draggable={true}
              onDragStart={dragStart}
              onDragOver={(e) => e.preventDefault()}
              onDragEnter={(e) => e.preventDefault()}
              onDragLeave={(e) => e.preventDefault()}
              onDrop={dragDrop}
              onDragEnd={dragEnd}
            />
          ))}
        </div>
        <Scoreboard score={scoreDisplay} />
      </div>
    </div>
  );
};

export default App;
