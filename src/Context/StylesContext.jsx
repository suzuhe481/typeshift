import PropTypes from "prop-types";
import { useContext, createContext } from "react";
import { GameOptionsContext } from "./GameOptionsContext";

export const StylesContext = createContext();

const StylesProvider = ({ children }) => {
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
    } else if (lettersDifficulty === "HARD") {
      return 75;
    }
  }

  // Get LETTER_SIZE based on difficulty.
  function getLetterSize() {
    if (lettersDifficulty === "EASY") {
      return `5`;
    } else if (lettersDifficulty === "MEDIUM") {
      return `5`;
    } else if (lettersDifficulty === "HARD") {
      return `2.5`;
    }
  }

  return (
    <StylesContext.Provider value={{ BOX_HEIGHT, LETTER_SIZE, ARROW_WIDTH }}>
      {children}
    </StylesContext.Provider>
  );
};

StylesProvider.propTypes = { children: PropTypes.element };

export default StylesProvider;
