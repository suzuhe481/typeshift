import { useState, useEffect } from "react";
import PropTypes from "prop-types";

import Column from "./Column/Column";
import WinMessage from "../WinMessage/WinMessage";

import "./Game.scss";

function Game({ allLetters, sendViewedWord, gameWon }) {
  const letters = allLetters;

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
      gameWon={gameWon}
    />
  ));

  return (
    <div className="game">
      <WinMessage gameWon={gameWon} />
      <div className="game__columns">{columnItems}</div>
      <div className="game__selection"></div>
    </div>
  );
}

export default Game;

Game.propTypes = {
  allLetters: PropTypes.array,
  sendViewedWord: PropTypes.func,
  gameWon: PropTypes.bool,
};
