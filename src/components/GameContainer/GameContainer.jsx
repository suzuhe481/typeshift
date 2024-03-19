import { useState, useEffect } from "react";
import Game from "./Game/Game";
import WordsList from "./WordsList/WordsList";
import Rules from "./Rules/Rules";

import "./GameContainer.scss";

// 3 letter words
const allLetters = [
  ["B", "C"],
  ["I", "A"],
  ["T", "G"],
];

const words = ["CAT", "BIG", "BAG", "BIT", "BAT"];

function GameContainer() {
  const [foundWords, setFoundWords] = useState([]);
  const [wordIsFound, setWordIsFound] = useState(false);
  const [gameWon, setGameWon] = useState(false);

  function viewedWordCallback(currentWord) {
    // If currentWord is a word in words but NOT in foundWords.
    if (words.includes(currentWord) && !foundWords.includes(currentWord)) {
      setFoundWords((prevState) => [...prevState, currentWord]);
      setWordIsFound(true);
    }
  }

  // Checks for win on every change of the foundWords variable.
  useEffect(() => {
    if (words.length === foundWords.length) {
      setGameWon(true);
    }
  }, [foundWords]);

  return (
    <div className="game-container">
      <Game
        allLetters={allLetters}
        sendViewedWord={viewedWordCallback}
        gameWon={gameWon}
        wordIsFound={wordIsFound}
        setWordIsFound={setWordIsFound}
      />
      <WordsList words={words} foundWords={foundWords} />
      <Rules />
    </div>
  );
}

export default GameContainer;
