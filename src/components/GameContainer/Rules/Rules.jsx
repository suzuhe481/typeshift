import "./Rules.scss";

function Rules() {
  return (
    <div className="rules">
      <p className="rules__title">Rules</p>
      <p className="rules__text">
        In Typeshift, the goal is to find all the possible words with the given
        letters. Click/tap the arrows to move the letters in each columns.
        <br />
        When all the words are found, you win.
      </p>
      <br />
      <p>5 words to find.</p>
    </div>
  );
}

export default Rules;
