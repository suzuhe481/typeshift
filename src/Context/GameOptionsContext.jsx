import PropTypes from "prop-types";
import { useState, createContext } from "react";

import LettersData from "../assets/LettersData";

export const GameOptionsContext = createContext();

const GameOptionsProvider = ({ children }) => {
  const [gameStart, setGameStart] = useState(false);

  // The difficulty of the current game.
  const [lettersDifficulty, setLettersDifficulty] = useState("");

  // The words found of the current game.
  const [foundWords, setFoundWords] = useState([]);

  // Boolean if a word is found.
  const [wordIsFound, setWordIsFound] = useState(false);

  // State for game win.
  const [gameWon, setGameWon] = useState(false);

  // The letters for the current difficulty.
  const [letters, setLetters] = useState();

  // The goal words to find for the current difficulty.
  const [goalWords, setGoalWords] = useState();

  // Sets the starting word based on the initial position fo each column.
  const [currentWord, setCurrentWord] = useState();

  // Determines longest column of the current game.
  const [longestColumn, setLongestColumn] = useState();

  // State to store whether user is on touchscreen or not.
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

  // Sets game options based on chosen difficulty.
  function changeDifficulty(newDifficulty) {
    const gameData = LettersData[newDifficulty];

    // Setting difficulty.
    setLettersDifficulty(newDifficulty);

    // Setting letters data.
    setLetters(gameData.ColumnData);

    // Setting goal words.
    setGoalWords(gameData.goalWords);

    // Setting the current word.
    setCurrentWord(() => {
      var word = "";
      gameData.ColumnData.forEach((colData) => {
        word += colData.letters[colData.initialPosition];
      });

      return word;
    });

    // Setting longest column.
    setLongestColumn(() => {
      var longestColumn = 0;
      for (var i = 0; i < gameData.ColumnData.length; i++) {
        if (gameData.ColumnData[i].letters.length > longestColumn) {
          longestColumn = gameData.ColumnData[i].letters.length;
        }
      }

      return longestColumn;
    });
  }

  // Resets the game.
  function resetGame() {
    setLettersDifficulty("");
    setFoundWords([]);
    setWordIsFound(false);
    setGameWon(false);
    setLetters();
    setGoalWords();
    setLongestColumn();
    setGameStart(false);
  }

  return (
    <div>
      <GameOptionsContext.Provider
        value={{
          lettersDifficulty,
          setLettersDifficulty,
          foundWords,
          setFoundWords,
          wordIsFound,
          setWordIsFound,
          gameWon,
          setGameWon,
          onTouchScreen,
          setOnTouchScreen,
          currentWord,
          setCurrentWord,
          letters,
          setLetters,
          goalWords,
          setGoalWords,
          longestColumn,
          setLongestColumn,
          gameStart,
          setGameStart,
          changeDifficulty,
          resetGame,
        }}
      >
        {children}
      </GameOptionsContext.Provider>
    </div>
  );
};

GameOptionsProvider.propTypes = { children: PropTypes.element };

export default GameOptionsProvider;
