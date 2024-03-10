import "./WinMessage.scss";

function WinMessage(props) {
  const gameWon = props.gameWon;

  const message = (
    <div className={`game__message ${gameWon && "show"}`}>You Win!</div>
  );

  return <>{message}</>;
}

export default WinMessage;
