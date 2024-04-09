import { useContext } from "react";
import PropTypes from "prop-types";

import { GameOptionsContext } from "../../../Context/GameOptionsContext";

import "./WinMessage.scss";

function WinMessage() {
  const { gameWon } = useContext(GameOptionsContext);

  const message = (
    <div className={`game__message ${gameWon && "show"}`}>You Win!</div>
  );

  return <>{message}</>;
}

export default WinMessage;

WinMessage.propTypes = {
  gameWon: PropTypes.bool,
};
