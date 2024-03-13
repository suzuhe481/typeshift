import { useState } from "react";
import PropTypes from "prop-types";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp, faArrowDown } from "@fortawesome/free-solid-svg-icons";

import "./Column.scss";

function Column({
  letters,
  gameWon,
  viewedWord,
  setViewedWord,
  sendViewedWord,
  index,
}) {
  const [lettersArr, setLettersArr] = useState(letters);

  // Moves the words in the column up.
  const moveUp = () => {
    // Stops letter from moving if game is won.
    if (gameWon) {
      return;
    }

    // Don't move letters if top letter is not empty.
    if (letters[0] != " ") {
      return;
    }

    // Moves the first element to the end.
    // NOTE: Slice is used because react won't rerender the page without it.
    // It doesn't see the change within the array as a change to the variable so it doesn't rerender it.
    lettersArr.push(lettersArr.shift());
    setLettersArr(lettersArr.slice());

    var newWord = [...viewedWord];
    newWord[index] = lettersArr[1];
    newWord = newWord.join("");
    setViewedWord(newWord);
    sendViewedWord(newWord);
  };

  // Moves the words in the column down.
  const moveDown = () => {
    // Stops letters from moving if game is won.
    if (gameWon) {
      return;
    }

    // Don't move letters if bottom letter is not empty.
    if (lettersArr[lettersArr.length - 1] != " ") {
      return;
    }

    // Moves the last element to the front.
    // NOTE: Slice is used because react won't rerender the page without it.
    // It doesn't see the change within the array as a change to the variable so it doesn't rerender it.
    lettersArr.unshift(lettersArr.pop());
    setLettersArr(lettersArr.slice());

    var newWord = [...viewedWord];
    newWord[index] = lettersArr[1];
    newWord = newWord.join("");
    setViewedWord(newWord);
    sendViewedWord(newWord);
  };

  const lettersArray = Array.from(lettersArr);

  const cells = lettersArray.map((letter, index) => {
    if (index === 1) {
      return (
        <div key={index} className="cell selection">
          {letter}
        </div>
      );
    } else {
      return (
        <div key={index} className="cell">
          {letter}
        </div>
      );
    }
  });

  return (
    <div className="column">
      <FontAwesomeIcon icon={faArrowUp} onClick={moveUp} className="arrow" />
      {cells}
      <FontAwesomeIcon
        icon={faArrowDown}
        onClick={moveDown}
        className="arrow"
      />
    </div>
  );
}

export default Column;

Column.propTypes = {
  letters: PropTypes.array,
  gameWon: PropTypes.bool,
  viewedWord: PropTypes.string,
  setViewedWord: PropTypes.func,
  sendViewedWord: PropTypes.func,
  index: PropTypes.number,
};
