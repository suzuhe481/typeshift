import { useContext } from "react";

import { GameOptionsContext } from "../../../Context/GameOptionsContext";

import "./WordsList.scss";

function WordsList() {
  const { gameStart, foundWords, goalWords } = useContext(GameOptionsContext);

  const wordsList = foundWords.map((word, index) => (
    <li key={index} className="words_list__word">
      {word}
    </li>
  ));

  if (gameStart) {
    var counter: any = (
      <>
        {foundWords.length}/{goalWords.length}
      </>
    );
  }

  return (
    <div className="words_list">
      <p className="words_list__title">
        Found Words
        <br />
        {gameStart ? counter : ""}
      </p>
      <ul>{wordsList}</ul>
    </div>
  );
}

export default WordsList;
