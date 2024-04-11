import { useContext } from "react";

import { GameOptionsContext } from "../../../Context/GameOptionsContext";

import "./DifficultyMenu.scss";

function DifficultyMenu() {
  const { setGameStart, changeDifficulty } = useContext(GameOptionsContext);

  const difficulties = ["EASY", "MEDIUM", "HARD"];

  // Starts the game after setting the difficulty.
  const handleButtonClick = (e) => {
    changeDifficulty(e.target.value);
    setGameStart(true);
  };

  const menuItems = difficulties.map((item, index) => {
    return (
      <button
        key={index}
        className="menu-item button"
        value={item}
        onClick={handleButtonClick}
      >
        {item}
      </button>
    );
  });

  return <div className="game difficulty-menu">{menuItems}</div>;
}

export default DifficultyMenu;
