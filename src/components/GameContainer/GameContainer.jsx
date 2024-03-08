import Game from "./Game/Game";
import WordsList from "./WordsList/WordsList";
import Rules from "./Rules/Rules";

import "./GameContainer.scss";

// 3 letter words
const allLetters = [
  [" ", "C", "B"],
  ["I", "A", " "],
  ["T", "G", " "],
];

const words = ["CAT", "BIG", "BAG", "BIT", "BAT"];

function GameContainer() {
  return (
    <div className="game-container">
      <Game allLetters={allLetters} />
      <WordsList words={words} />
      <Rules />
    </div>
  );
}

export default GameContainer;