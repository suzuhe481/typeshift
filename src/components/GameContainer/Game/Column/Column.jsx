import { useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp, faArrowDown } from "@fortawesome/free-solid-svg-icons";

import "./Column.scss";

function Column(props) {
  const [letters, setLetters] = useState(props.letters);

  // Moves the words in the column up.
  const moveUp = () => {
    // Stops letter from moving if game is won.
    if (props.gameWon) {
      return;
    }

    // Don't move letters if top letter is not empty.
    if (letters[0] != " ") {
      return;
    }

    // Moves the first element to the end.
    // NOTE: Slice is used because react won't rerender the page without it.
    // It doesn't see the change within the array as a change to the variable so it doesn't rerender it.
    letters.push(letters.shift());
    setLetters(letters.slice());

    var newWord = [...props.viewedWord];
    newWord[props.index] = letters[1];
    newWord = newWord.join("");
    props.setViewedWord(newWord);
    props.sendViewedWord(newWord);
  };

  // Moves the words in the column down.
  const moveDown = () => {
    // Stops letters from moving if game is won.
    if (props.gameWon) {
      return;
    }

    // Don't move letters if bottom letter is not empty.
    if (letters[letters.length - 1] != " ") {
      return;
    }

    // Moves the last element to the front.
    // NOTE: Slice is used because react won't rerender the page without it.
    // It doesn't see the change within the array as a change to the variable so it doesn't rerender it.
    letters.unshift(letters.pop());
    setLetters(letters.slice());

    var newWord = [...props.viewedWord];
    newWord[props.index] = letters[1];
    newWord = newWord.join("");
    props.setViewedWord(newWord);
    props.sendViewedWord(newWord);
  };

  const lettersArray = Array.from(letters);

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
