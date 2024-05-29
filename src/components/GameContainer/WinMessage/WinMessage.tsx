import { useContext } from "react";

import { GameOptionsContext } from "../../../Context/GameOptionsContext";

import "./WinMessage.scss";

function WinMessage() {
  const { gameWon, resetGame } = useContext(GameOptionsContext);

  const message = (
    <div className={`game__message ${gameWon ? "show" : "disabled"}`}>
      <div>You Win!</div>
      <button className="win-button" onClick={resetGame}>
        Play again?
      </button>
    </div>
  );

  return <>{message}</>;
}

export default WinMessage;
