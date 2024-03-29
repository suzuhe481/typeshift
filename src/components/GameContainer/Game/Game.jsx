import { useState, useEffect } from "react";
import PropTypes from "prop-types";

import Column from "./Column/Column";
import WinMessage from "../WinMessage/WinMessage";

import "./Game.scss";

function Game({
  allLetters,
  sendViewedWord,
  gameWon,
  wordIsFound,
  setWordIsFound,
}) {
  const letters = allLetters;

  const [viewedWord, setViewedWord] = useState(
    `${letters[0][1] + letters[1][1] + letters[2][1]}`
  );
  const [onTouchScreen, setOnTouchScreen] = useState(() => {
    if (
      "ontouchstart" in window ||
      navigator.maxTouchPoints > 0 ||
      navigator.msMaxTouchPoints > 0
    ) {
      return true;
    } else {
      return false;
    }
  });

  // Sets onTouchScreen state according if user is on a touch device or desktop
  const handleScreenSizeChange = () => {
    if (
      "ontouchstart" in window ||
      navigator.maxTouchPoints > 0 ||
      navigator.msMaxTouchPoints > 0
    ) {
      setOnTouchScreen(true);
    } else {
      setOnTouchScreen(false);
    }
  };

  // On initial page load.
  // Attaches resize event listener.
  useEffect(() => {
    window.addEventListener("resize", handleScreenSizeChange);

    return () => {
      window.removeEventListener("resize", handleScreenSizeChange);
    };
  }, []);

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
      wordIsFound={wordIsFound}
      setWordIsFound={setWordIsFound}
      onTouchScreen={onTouchScreen}
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
  wordIsFound: PropTypes.bool,
  setWordIsFound: PropTypes.func,
};
