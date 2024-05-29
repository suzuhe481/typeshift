import { useContext, createContext, ReactNode } from "react";
import { GameOptionsContext } from "./GameOptionsContext";

interface ChildrenProps {
  children?: ReactNode;
}

interface IStylesContextProps {
  children?: ReactNode;

  BOX_HEIGHT: number;
  LETTER_SIZE: string;
  ARROW_WIDTH: number;
}

export const StylesContext = createContext<IStylesContextProps>(
  {} as IStylesContextProps
);

const StylesProvider = ({ children }: ChildrenProps) => {
  const { lettersDifficulty } = useContext(GameOptionsContext);

  const BOX_HEIGHT = getBoxHeight(); // In pixels
  const LETTER_SIZE = getLetterSize(); // In rem
  const ARROW_WIDTH = 2; // In rem

  // Returns a value for BOX_HEIGHT based on difficulty.
  function getBoxHeight() {
    if (lettersDifficulty === "EASY") {
      return 100;
    } else if (lettersDifficulty === "MEDIUM") {
      return 100;
    } /* lettersDifficulty === "HARD" */ else {
      return 75;
    }
  }

  // Get LETTER_SIZE based on difficulty.
  function getLetterSize() {
    if (lettersDifficulty === "EASY") {
      return `5`;
    } else if (lettersDifficulty === "MEDIUM") {
      return `5`;
    } /* lettersDifficulty === "HARD" */ else {
      return `2.5`;
    }
  }

  return (
    <StylesContext.Provider value={{ BOX_HEIGHT, LETTER_SIZE, ARROW_WIDTH }}>
      {children}
    </StylesContext.Provider>
  );
};

export default StylesProvider;
