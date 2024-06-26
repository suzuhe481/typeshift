import { useEffect, useContext } from "react";

import Column from "./Column/Column";
import WinMessage from "../WinMessage/WinMessage";
import InstructionsModal from "./InstructionsModal/InstructionsModal";

import { GameOptionsContext } from "../../../Context/GameOptionsContext";
import { StylesContext } from "../../../Context/StylesContext";

import "./Game.scss";

function Game() {
  // Getting variables from context.
  const { setOnTouchScreen, letters, longestColumn } =
    useContext(GameOptionsContext);

  const { BOX_HEIGHT } = useContext(StylesContext);

  // Styles
  var gameSelectionStyle = {
    bottom: `${longestColumn * BOX_HEIGHT}px`,
    height: `${BOX_HEIGHT}px`,

    // Moves selection area along with the column.
    transform: `translateY(${(longestColumn / 3) * BOX_HEIGHT}px)`,
  };

  var gameColumnsStyle = {
    // Moves columns down to provide more play area.
    transform: `translateY(${(longestColumn / 3) * BOX_HEIGHT}px)`,
  };

  // Sets onTouchScreen state according if user is on a touch device or desktop
  const handleScreenSizeChange = () => {
    if ("ontouchstart" in window || navigator.maxTouchPoints > 0) {
      setOnTouchScreen(true);
    } else {
      setOnTouchScreen(false);
    }
  };

  // On initial page load.
  // Attaches resize event listener.
  useEffect(() => {
    window.addEventListener("resize", handleScreenSizeChange);

    return () => {
      window.removeEventListener("resize", handleScreenSizeChange);
    };
  }, []);

  // Creates a column for each array in letters.
  const columnItems = letters.map((col, index: number) => (
    <Column
      key={index}
      columnIndex={index}
      initialPosition={col.initialPosition}
    />
  ));

  return (
    <div className="game">
      <InstructionsModal />
      <WinMessage />
      <div className="game__columns" style={gameColumnsStyle}>
        {columnItems}
      </div>
      <div className="game__selection" style={gameSelectionStyle}></div>
    </div>
  );
}

export default Game;
