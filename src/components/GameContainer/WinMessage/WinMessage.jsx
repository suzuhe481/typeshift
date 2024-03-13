import PropTypes from "prop-types";

import "./WinMessage.scss";

function WinMessage({ gameWon }) {
  const message = (
    <div className={`game__message ${gameWon && "show"}`}>You Win!</div>
  );

  return <>{message}</>;
}

export default WinMessage;

WinMessage.propTypes = {
  gameWon: PropTypes.bool,
};
