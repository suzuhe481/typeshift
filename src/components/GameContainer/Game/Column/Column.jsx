import { useState } from "react";
import PropTypes from "prop-types";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown, faCaretUp } from "@fortawesome/free-solid-svg-icons";

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
    if (letters[0] != "") {
      return;
    }

    // Moves the first element to the end.
    var newArr = lettersArr;
    newArr.push(newArr.shift());
    setLettersArr(newArr);

    // Gets and sends the updated word to the parent component via callback.
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
    if (letters[letters.length - 1] != "") {
      return;
    }

    // Moves the last element to the front.
    var newArr = lettersArr;
    newArr.unshift(newArr.pop());
    setLettersArr(newArr);

    // Gets and sends the updated word to the parent component via callback.
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
      <FontAwesomeIcon icon={faCaretDown} onClick={moveUp} className="arrow" />
      {cells}
      <FontAwesomeIcon icon={faCaretUp} onClick={moveDown} className="arrow" />
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
