import { useState } from "react";

import Column from "./Column/Column";

import "./Game.scss";

function Game(props) {
  const letters = props.allLetters;
  const sendViewedWord = props.sendViewedWord;

  const [viewedWord, setViewedWord] = useState(
    `${letters[0][1] + letters[1][1] + letters[2][1]}`
  );

  // Creates a column for each array in letters.
  const columnItems = letters.map((col, index) => (
    <Column
      key={index}
      index={index}
      letters={col}
      viewedWord={viewedWord}
      setViewedWord={setViewedWord}
      sendViewedWord={sendViewedWord}
    />
  ));

  return <div className="game">{columnItems}</div>;
}

export default Game;
