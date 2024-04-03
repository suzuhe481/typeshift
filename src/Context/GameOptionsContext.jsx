import PropTypes from "prop-types";
import { useState, createContext } from "react";

export const GameOptionsContext = createContext();

const GameOptionsProvider = ({ children }) => {
  const [lettersDifficulty, setLettersDifficulty] = useState("EASY");

  return (
    <div>
      <GameOptionsContext.Provider
        value={{ lettersDifficulty, setLettersDifficulty }}
      >
        {children}
      </GameOptionsContext.Provider>
    </div>
  );
};

GameOptionsProvider.propTypes = { children: PropTypes.element };

export default GameOptionsProvider;
