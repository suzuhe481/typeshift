import { useState, useEffect, useRef, useCallback } from "react";
import PropTypes from "prop-types";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown, faCaretUp } from "@fortawesome/free-solid-svg-icons";

import "./Column.scss";

const COLUMN_ANIMATION_TIME_S = 0.1; // In seconds
const COLUMN_ANIMATION_TIME_MS = COLUMN_ANIMATION_TIME_S * 1000; // DON'T CHANGE. In milliseconds
const COLUMN_TRANSITION_ANIMATION = `all ${COLUMN_ANIMATION_TIME_S}s ease-in-out`;

const WORD_GROW_ANIMATION_S = 0.2; // In seconds
const WORD_GROW_ANIMATION_MS = WORD_GROW_ANIMATION_S * 1000; // DON'T CHANGE. In milliseconds.
const WORD_GROW_ANIMATION = `all ${WORD_GROW_ANIMATION_S}s ease-in-out`;

const BOX_HEIGHT = 100; // In pixels

function Column({
  letters,
  initialPosition,
  gameWon,
  columnIndex,
  wordIsFound,
  setWordIsFound,
  onTouchScreen,
  currentWord,
  setCurrentWord,
  longestColumn,
}) {
  // The bounds of where the column can move.
  // Lower - Prevents column from moving below this limit.
  // Upper - Prevents column from mobing above this limit.
  var COLUMN_LOWER_LIMIT = (longestColumn - letters.length) * -50; // In pixels
  var COLUMN_UPPER_LIMIT =
    COLUMN_LOWER_LIMIT - (letters.length - 1) * BOX_HEIGHT; // In pixels

  // State
  const [isAnimated, setIsAnimated] = useState(false);
  const [colPosition, setColPosition] = useState(initialPosition);
  const [isDragging, setIsDragging] = useState(false);

  const startPosition =
    colPosition * -100 + (longestColumn - letters.length) * -50;

  // Refs
  const columnRef = useRef(null);
  const initialYRef = useRef(0);
  const draggedYRef = useRef(startPosition);
  const arrowUpRef = useRef(null);
  const arrowDownRef = useRef(null);
  const currentLetterRef = useRef(null);
  const columnTranslatePositionRef = useRef(startPosition);

  // Styles
  var columnStyle = {
    display: `flex`,
    flexDirection: `column`,
    width: `100px`,
    position: `relative`,
  };

  var arrowStyle = {
    opacity: `0`,
    height: `2.5rem`,
    color: `#5dbafc`,
  };

  // Creates the cells containing each letter.
  const letterBoxes = letters.map((letter, i) => {
    if (i === colPosition) {
      return (
        <div key={i} ref={currentLetterRef} className="cell">
          {letter}
        </div>
      );
    } else {
      return (
        <div key={i} className="cell">
          {letter}
        </div>
      );
    }
  });

  // Stores the location of the initial click/tap.
  const handleMouseDown = useCallback(
    (e) => {
      // Prevents columns from being dragged if game is over.
      if (gameWon) {
        return;
      }

      setIsDragging(true);

      // Stores the initial location where the user tapped or clicked.
      if (onTouchScreen) {
        initialYRef.current = e.touches[0].clientY;
      } else {
        initialYRef.current = e.clientY;
      }
    },
    [gameWon, onTouchScreen]
  );

  // Moves columns to appropriate positions.
  // Calculates the new word.
  const handleMouseUp = useCallback(() => {
    if (!isDragging) {
      return;
    }

    setIsDragging(false);
    resetColumnAfterMouseUp();
    calculateColumnPosition();
  }, [isDragging]);

  // Moves the column to the appropriate distance dragged.
  const handleDrag = useCallback(
    (e) => {
      if (!isDragging) {
        return;
      }

      // Calculates the difference between the initial location clicked and the distance dragged.
      if (onTouchScreen) {
        const deltaY = initialYRef.current - e.touches[0].clientY;
        initialYRef.current = e.touches[0].clientY;
        draggedYRef.current -= deltaY;
      } else {
        const deltaY = initialYRef.current - e.clientY;
        initialYRef.current = e.clientY;
        draggedYRef.current -= deltaY;
      }
      columnRef.current.style.transform = `translateY(${draggedYRef.current}px)`;
    },
    [isDragging, onTouchScreen]
  );

  // When a column is dragged above/below its upper/lower limit respectively,
  // lower/raise the column until it's upper/lower limit.
  // If a column is within it's bounds, snap it it it's closest grid position.
  // A timer in a useEffect removes then transition animation.
  const resetColumnAfterMouseUp = useCallback(() => {
    if (
      draggedYRef.current < COLUMN_UPPER_LIMIT ||
      draggedYRef.current > COLUMN_LOWER_LIMIT
    ) {
      setIsAnimated(true);
      columnRef.current.style.transition = COLUMN_TRANSITION_ANIMATION;
      draggedYRef.current =
        draggedYRef.current < COLUMN_UPPER_LIMIT
          ? COLUMN_UPPER_LIMIT
          : COLUMN_LOWER_LIMIT;
      columnRef.current.style.transform = `translateY(${draggedYRef.current}px)`;
    } else {
      var before = COLUMN_LOWER_LIMIT;
      var after = COLUMN_LOWER_LIMIT - BOX_HEIGHT;

      // Decrements before and after until draggedYRef is between those 2 values.
      while (!isBetween(before, after, draggedYRef.current)) {
        before -= BOX_HEIGHT;
        after -= BOX_HEIGHT;
      }

      // Column should snap to it's closest grid position.
      const distanceToBefore = Math.abs(draggedYRef.current - before);
      const distanceToAfter = Math.abs(draggedYRef.current - after);

      if (distanceToBefore <= distanceToAfter) {
        draggedYRef.current = before;
      } else {
        draggedYRef.current = after;
      }

      // Animating column.
      setIsAnimated(true);
      columnTranslatePositionRef.current = draggedYRef.current;
      columnRef.current.style.transition = COLUMN_TRANSITION_ANIMATION; // Animation is removed via a useEffect.
      columnRef.current.style.transform = `translateY(${draggedYRef.current}px)`;
    }
  }, [COLUMN_LOWER_LIMIT, COLUMN_UPPER_LIMIT]);

  // Checks is a value is between 2 other values.
  // Returns a boolean.
  const isBetween = (a, b, value) => {
    // Both a and b are positive.
    if (a >= 0 && b >= 0) {
      if (value >= a && value < b) {
        return true;
      }
    }
    // BOth a and b are negative.
    else if (a < 0 && b < 0) {
      if (value <= a && value > b) {
        return true;
      }
    }
    // a is negative and b is positive.
    else if (a < 0 && b >= 0) {
      if (value >= a && value < b) {
        return true;
      }
    }
    // a is positive and b is negative.
    else if (a >= 0 && b < 0) {
      if (value <= a && value > b) {
        return true;
      }

      return false;
    }

    return false;
  };

  // Calculates the current word.
  const calculateColumnPosition = useCallback(() => {
    const newPos =
      ((draggedYRef.current - COLUMN_LOWER_LIMIT) / BOX_HEIGHT) * -1;

    setColPosition(newPos);

    var oldWord = currentWord;
    oldWord = oldWord.split("");

    var newWord = oldWord;
    newWord[columnIndex] = letters[newPos];
    newWord = newWord.join("");

    setCurrentWord(newWord);
  }, [COLUMN_LOWER_LIMIT, columnIndex, currentWord, letters, setCurrentWord]);

  // Sets opacity to 1 for both arrows.
  // Used with event listener.
  const addOpacity = () => {
    arrowUpRef.current.style.opacity = 1;
    arrowDownRef.current.style.opacity = 1;
  };

  // Sets opacity to 0 for both arrows.
  // Used with event listener.
  const removeOpacity = () => {
    arrowUpRef.current.style.opacity = 0;
    arrowDownRef.current.style.opacity = 0;
  };

  // Runs when isAnimated state changes.
  // After animation is over (column slides to intended position),
  // clears the animation style.
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setIsAnimated(false);
      columnRef.current.style.transition = ``;
    }, COLUMN_ANIMATION_TIME_MS);

    // Cleanup function to clear the timeout if the component unmounts
    return () => clearTimeout(timeoutId);
  }, [isAnimated]);

  // Grows the letter stored in the crurentLetterRef.
  // Runs when a valid word is found.
  useEffect(() => {
    if (wordIsFound) {
      currentLetterRef.current.style.transform = `scale(1.2)`;
      currentLetterRef.current.style.transition = WORD_GROW_ANIMATION;

      const timeoutId = setTimeout(() => {
        currentLetterRef.current.style.transform = `scale(1)`;

        setWordIsFound(false);
      }, WORD_GROW_ANIMATION_MS);

      // Cleanup function to clear the timeout if the component unmounts
      return () => clearTimeout(timeoutId);
    }
  }, [wordIsFound, setWordIsFound]);

  // On initial page load, places column on their starting position.
  useEffect(() => {
    columnRef.current.style.transform = `translateY(${columnTranslatePositionRef.current}px)`;
  }, []);

  // Adds event listeners for handling mouse up, mouse down, and dragging.
  useEffect(() => {
    const colRefVar = columnRef;

    // Event listeners for mouse actions
    colRefVar.current.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);

    colRefVar.current.addEventListener("touchstart", handleMouseDown);
    window.addEventListener("touchend", handleMouseUp);

    window.addEventListener("mousemove", handleDrag);
    window.addEventListener("touchmove", handleDrag);

    return () => {
      colRefVar.current.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);

      colRefVar.current.removeEventListener("touchstart", handleMouseDown);
      window.removeEventListener("touchend", handleMouseUp);

      window.removeEventListener("mousemove", handleDrag);
      window.removeEventListener("touchmove", handleDrag);
    };
  }, [handleMouseDown, handleDrag, handleMouseUp]);

  // On initial page load.
  // Event listeners for arrows appearing around letter columns on hover.
  useEffect(() => {
    const colRefVar = columnRef;

    colRefVar.current.addEventListener("mouseover", addOpacity);
    colRefVar.current.addEventListener("touchstart", addOpacity);

    colRefVar.current.addEventListener("mouseout", removeOpacity);
    colRefVar.current.addEventListener("touchend", removeOpacity);

    return () => {
      colRefVar.current.removeEventListener("mouseover", addOpacity);
      colRefVar.current.removeEventListener("touchstart", addOpacity);

      colRefVar.current.removeEventListener("mouseout", removeOpacity);
      colRefVar.current.removeEventListener("touchend", removeOpacity);
    };
  }, []);

  return (
    <div ref={columnRef} className="column" style={columnStyle}>
      <div className="cell">
        <FontAwesomeIcon
          ref={arrowDownRef}
          style={arrowStyle}
          icon={faCaretDown}
          className="arrow"
        />
      </div>
      {letterBoxes}
      <div className="cell">
        <FontAwesomeIcon
          ref={arrowUpRef}
          style={arrowStyle}
          icon={faCaretUp}
          className="arrow"
        />
      </div>
    </div>
  );
}

export default Column;

Column.propTypes = {
  letters: PropTypes.array,
  initialPosition: PropTypes.number,
  gameWon: PropTypes.bool,
  columnIndex: PropTypes.number,
  wordIsFound: PropTypes.bool,
  setWordIsFound: PropTypes.func,
  onTouchScreen: PropTypes.bool,
  currentWord: PropTypes.string,
  setCurrentWord: PropTypes.func,
  longestColumn: PropTypes.number,
};
