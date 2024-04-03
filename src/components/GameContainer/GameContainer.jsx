import { useState, useEffect } from "react";
import Game from "./Game/Game";
import WordsList from "./WordsList/WordsList";
import Rules from "./Rules/Rules";

import LettersData from "../../assets/LettersData";

import "./GameContainer.scss";

function GameContainer() {
  const [foundWords, setFoundWords] = useState([]);
  const [wordIsFound, setWordIsFound] = useState(false);
  const [gameWon, setGameWon] = useState(false);

  // Sets the starting word based on the initial position fo each column.
  const [currentWord, setCurrentWord] = useState(() => {
    var word = "";
    LettersData.forEach((colData) => {
      word += colData.letters[colData.initialPosition];
    });

    return word;
  });

  // Checks if word is valid on every change of the currentWord variable.
  useEffect(() => {
    // If currentWord is a word in words but NOT in foundWords.
    if (words.includes(currentWord) && !foundWords.includes(currentWord)) {
      setFoundWords((prevState) => [...prevState, currentWord]);
      setWordIsFound(true);
    }
  }, [currentWord, foundWords]);

  // Checks for win on every change of the foundWords variable.
  // Win condition: When the length of the arrays of "words" and "foundWords" are equal.
  useEffect(() => {
    if (words.length === foundWords.length) {
      setGameWon(true);
    }
  }, [foundWords]);

  return (
    <div className="game-container">
      <Game
        LettersData={LettersData}
        gameWon={gameWon}
        wordIsFound={wordIsFound}
        setWordIsFound={setWordIsFound}
        currentWord={currentWord}
        setCurrentWord={setCurrentWord}
      />
      <WordsList words={words} foundWords={foundWords} />
      <Rules />
    </div>
  );
}

export default GameContainer;
