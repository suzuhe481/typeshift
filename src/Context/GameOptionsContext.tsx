import { useState, createContext, ReactNode } from "react";

import LettersData from "../assets/LettersData";

interface ChildrenProps {
  children?: ReactNode;
}

// Interface declaration containing types for the Context's
// variables and functions.
interface IGameOptionsContextProps {
  children?: ReactNode;

  lettersDifficulty: string;
  setLettersDifficulty: (difficulty: string) => void;
  foundWords: string[];
  setFoundWords: React.Dispatch<React.SetStateAction<string[]>>;
  wordIsFound: boolean;
  setWordIsFound: React.Dispatch<React.SetStateAction<boolean>>;
  gameWon: boolean;
  setGameWon: React.Dispatch<React.SetStateAction<boolean>>;
  onTouchScreen: boolean;
  setOnTouchScreen: (value: boolean) => void;
  currentWord: string;
  setCurrentWord: React.Dispatch<React.SetStateAction<string>>;
  letters: any[];
  setLetters: React.Dispatch<React.SetStateAction<any>>;
  goalWords: string[];
  setGoalWords: React.Dispatch<React.SetStateAction<string[]>>;
  longestColumn: number;
  setLongestColumn: React.Dispatch<React.SetStateAction<number>>;
  gameStart: boolean;
  setGameStart: React.Dispatch<React.SetStateAction<boolean>>;
  changeDifficulty: (newDifficulty: string) => void;
  resetGame: () => void;
}

export const GameOptionsContext = createContext<IGameOptionsContextProps>(
  {} as IGameOptionsContextProps
);

const GameOptionsProvider = ({ children }: ChildrenProps) => {
  const [gameStart, setGameStart] = useState(false);

  // The difficulty of the current game.
  const [lettersDifficulty, setLettersDifficulty] = useState("");

  // The words found of the current game.
  const [foundWords, setFoundWords] = useState<string[]>([]);

  // Boolean if a word is found.
  const [wordIsFound, setWordIsFound] = useState(false);

  // State for game win.
  const [gameWon, setGameWon] = useState<boolean>(false);

  // The letters for the current difficulty.
  const [letters, setLetters] = useState([]);

  // The goal words to find for the current difficulty.
  const [goalWords, setGoalWords] = useState<string[]>([]);

  // Sets the starting word based on the initial position fo each column.
  const [currentWord, setCurrentWord] = useState<string>("");

  // Determines longest column of the current game.
  const [longestColumn, setLongestColumn] = useState<number>(0);

  // interface ISetOnTouchScreen {
  //   onTouchScreen: boolean;
  //   setOnTouchScreen?: React.Dispatch<
  //     React.SetStateAction<boolean | ISetOnTouchScreen>
  //   >;
  // }

  // State to store whether user is on touchscreen or not.
  const [onTouchScreen, setOnTouchScreen] = useState(() => {
    if (
      "ontouchstart" in window ||
      navigator.maxTouchPoints > 0 ||
      navigator.maxTouchPoints > 0
    ) {
      return true;
    } else {
      return false;
    }
  });

  // Sets game options based on chosen difficulty.
  function changeDifficulty(newDifficulty: string) {
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
      gameData.ColumnData.forEach(
        (colData: {
          letters: { [x: string]: string };
          initialPosition: string | number;
        }) => {
          word += colData.letters[colData.initialPosition];
        }
      );

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
    setLetters;
    setGoalWords;
    setLongestColumn;
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

export default GameOptionsProvider;
