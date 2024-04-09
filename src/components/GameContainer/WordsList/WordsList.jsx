import { useContext } from "react";
import PropTypes from "prop-types";

import { GameOptionsContext } from "../../../Context/GameOptionsContext";

import "./WordsList.scss";

function WordsList() {
  const { foundWords } = useContext(GameOptionsContext);

  const wordsList = foundWords.map((word, index) => (
    <li key={index} className="words_list__word">
      {word}
    </li>
  ));

  return (
    <div className="words_list">
      <p className="words_list__title">Found Words</p>
      <ul>{wordsList}</ul>
    </div>
  );
}

export default WordsList;

WordsList.propTypes = {
  foundWords: PropTypes.array,
};
