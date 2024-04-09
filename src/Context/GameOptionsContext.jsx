import PropTypes from "prop-types";
import { useState, createContext } from "react";

import LettersData from "../assets/LettersData";

export const GameOptionsContext = createContext();

const GameOptionsProvider = ({ children }) => {
  // The difficulty of the current game.
  const [lettersDifficulty, setLettersDifficulty] = useState("HARD");

  // The words found of the current game.
  const [foundWords, setFoundWords] = useState([]);

  // Boolean if a word is found.
  const [wordIsFound, setWordIsFound] = useState(false);

  // State for game win.
  const [gameWon, setGameWon] = useState(false);

  // The letters for the current difficulty.
  const [letters, setLetters] = useState(
    LettersData[lettersDifficulty].ColumnData
  );
  // The goal words to find for the current difficulty.
  const [goalWords, setGoalWords] = useState(
    LettersData[lettersDifficulty].goalWords
  );

  // Sets the starting word based on the initial position fo each column.
  const [currentWord, setCurrentWord] = useState(() => {
    var word = "";
    letters.forEach((colData) => {
      word += colData.letters[colData.initialPosition];
    });

    return word;
  });

  // Determines longest column of the current game.
  const [longestColumn, setLongestColumn] = useState(() => {
    var longestColumn = 0;
    for (var i = 0; i < letters.length; i++) {
      if (letters[i].letters.length > longestColumn) {
        longestColumn = letters[i].letters.length;
      }
    }

    return longestColumn;
  });

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
        }}
      >
        {children}
      </GameOptionsContext.Provider>
    </div>
  );
};

GameOptionsProvider.propTypes = { children: PropTypes.element };

export default GameOptionsProvider;
