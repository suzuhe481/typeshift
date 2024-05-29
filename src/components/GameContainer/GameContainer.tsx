import { useEffect, useContext } from "react";
import Game from "./Game/Game";
import DifficultyMenu from "./DifficultyMenu/DifficultyMenu";
import WordsList from "./WordsList/WordsList";
import Rules from "./Rules/Rules";
import { GameOptionsContext } from "../../Context/GameOptionsContext";

import "./GameContainer.scss";

function GameContainer() {
  // Getting variables from context.
  const {
    foundWords,
    setFoundWords,
    setWordIsFound,
    setGameWon,
    currentWord,
    goalWords,
    gameStart,
  } = useContext(GameOptionsContext);

  // Checks if word is valid on every change of the currentWord variable.
  useEffect(() => {
    if (!gameStart) {
      return;
    }
    // If currentWord is a word in words but NOT in foundWords.
    if (goalWords.includes(currentWord) && !foundWords.includes(currentWord)) {
      setFoundWords((prevState) => [...prevState, currentWord]);
      setWordIsFound(true);
    }
  }, [goalWords, currentWord, foundWords, setFoundWords, setWordIsFound]);

  // Checks for win on every change of the foundWords variable.
  // Win condition: When the length of the arrays of "words" and "foundWords" are equal.
  useEffect(() => {
    if (!gameStart) {
      return;
    }

    if (goalWords.length === foundWords.length) {
      setGameWon(true);
    }
  }, [goalWords, foundWords, setGameWon]);

  return (
    <div className="game-container">
      {gameStart ? <Game /> : <DifficultyMenu />}
      <WordsList />
      <Rules />
    </div>
  );
}

export default GameContainer;
