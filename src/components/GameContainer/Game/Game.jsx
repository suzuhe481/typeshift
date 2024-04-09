import { useEffect, useContext } from "react";

import Column from "./Column/Column";
import WinMessage from "../WinMessage/WinMessage";

import { GameOptionsContext } from "../../../Context/GameOptionsContext";

import "./Game.scss";

function Game() {
  // Getting variables from context.
  const { setOnTouchScreen, letters, longestColumn } =
    useContext(GameOptionsContext);

  // Styles
  var gameSelectionStyle = {
    bottom: `${longestColumn * 100}px`,
  };

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
  const columnItems = LettersData.map((col, index) => (
    <Column
      key={index}
      columnIndex={index}
      letters={col.letters}
      initialPosition={col.initialPosition}
      gameWon={gameWon}
      wordIsFound={wordIsFound}
      setWordIsFound={setWordIsFound}
      onTouchScreen={onTouchScreen}
      currentWord={currentWord}
      setCurrentWord={setCurrentWord}
      longestColumn={longestColumn}
    />
  ));

  return (
    <div className="game">
      <WinMessage gameWon={gameWon} />
      <div className="game__columns">{columnItems}</div>
      <div className="game__selection" style={gameSelectionStyle}></div>
    </div>
  );
}

export default Game;

Game.propTypes = {
  LettersData: PropTypes.array,
  gameWon: PropTypes.bool,
  wordIsFound: PropTypes.bool,
  setWordIsFound: PropTypes.func,
  currentWord: PropTypes.string,
  setCurrentWord: PropTypes.func,
};
