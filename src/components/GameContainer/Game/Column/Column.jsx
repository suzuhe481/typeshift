import { useState, useEffect, useRef, useCallback } from "react";
import PropTypes from "prop-types";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown, faCaretUp } from "@fortawesome/free-solid-svg-icons";

import "./Column.scss";

const COLUMN_ANIMATION_TIME_S = 0.1; // In seconds
const COLUMN_ANIMATION_TIME_MS = COLUMN_ANIMATION_TIME_S * 1000; // DON'T CHANGE. In milliseconds
const COLUMN_TRANSITION_ANIMATION = `all ${COLUMN_ANIMATION_TIME_S}s ease-in-out`;
const COLUMN_UPPER_LIMIT = 0; // In pixels
const COLUMN_LOWER_LIMIT = 100; // In pixels

const WORD_GROW_ANIMATION_S = 0.2; // In seconds
const WORD_GROW_ANIMATION_MS = WORD_GROW_ANIMATION_S * 1000; // DON'T CHANGE. In milliseconds.
const WORD_GROW_ANIMATION = `all ${WORD_GROW_ANIMATION_S}s ease-in-out`;

const BOX_HEIGHT = 100; // In pixels

function Column({
  letters,
  gameWon,
  viewedWord,
  setViewedWord,
  sendViewedWord,
  index,
  wordIsFound,
  setWordIsFound,
  onTouchScreen,
}) {
  // State
  const [isAnimated, setIsAnimated] = useState(false);
  const [colPosition, setColPosition] = useState(1);

  // Refs
  const columnRef = useRef(null);
  const initialYRef = useRef(0);
  const draggedYRef = useRef(0);
  const arrowUpRef = useRef(null);
  const arrowDownRef = useRef(null);
  const currentLetterRef = useRef(null);

  // Constant variables
  const numOfBoxes = letters.length;

  // Styles
  var columnStyle = {
    display: `flex`,
    flexDirection: `column`,
    width: `100px`,
  };

  var arrowStyle = {
    opacity: `0`,
    height: `2.5rem`,
    color: `#5dbafc`,
  };

  // Callbacks
  // Handles mouse or finger drag event to animate column movement.
  const handleDrag = useCallback(
    (e) => {
      if (onTouchScreen) {
        const deltaY = initialYRef.current - e.touches[0].clientY;
        initialYRef.current = e.touches[0].clientY;
        draggedYRef.current -= deltaY;

        columnRef.current.style.transform = `translate(0px, ${draggedYRef.current}px)`;
      } else {
        const deltaY = initialYRef.current - e.clientY;
        initialYRef.current = e.clientY;
        draggedYRef.current -= deltaY;

        columnRef.current.style.transform = `translate(0px, ${draggedYRef.current}px)`;
      }
    },
    [onTouchScreen]
  );

  // Handles removing event listeners for dragging and mouse/touchend events.
  const handleMouseUp = useCallback(() => {
    if (gameWon) {
      return;
    }

    if (onTouchScreen) {
      document.removeEventListener("touchmove", handleDrag);
      document.removeEventListener("touchend", handleMouseUp);
    } else {
      document.removeEventListener("mousemove", handleDrag);
      document.removeEventListener("mouseup", handleMouseUp);
    }

    normalizeColumnPosition();
  }, [gameWon, handleDrag, onTouchScreen]);

  const letterBoxes = letters.map((letter, index) => {
    if (colPosition === index) {
      return (
        <div key={index} ref={currentLetterRef} className="cell">
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

  // On initial page load.
  // Adds the mousedown event listener to column.
  useEffect(() => {
    const handleMouseDown = (e) => {
      // Prevents columns from being dragged if game is over.
      if (gameWon) {
        return;
      }

      initialYRef.current = e.clientY;

      if (onTouchScreen) {
        initialYRef.current = e.touches[0].clientY;

        document.addEventListener("touchmove", handleDrag);
        document.addEventListener("touchend", handleMouseUp);
      } else {
        initialYRef.current = e.clientY;

        document.addEventListener("mousemove", handleDrag);
        document.addEventListener("mouseup", handleMouseUp);
      }
    };

    const colRefVar = columnRef;
    colRefVar.current.addEventListener("mousedown", handleMouseDown);
    colRefVar.current.addEventListener("touchstart", handleMouseDown);

    return () => {
      colRefVar.current.removeEventListener("mousedown", handleMouseDown);
      colRefVar.current.removeEventListener("touchstart", handleMouseDown);
    };
  }, [onTouchScreen, gameWon]);

  // If column is outside of it's bounds, animate it so it goes back to an appropriate location.
  // When column is dragged above its upper limit, lower it to the upper limit.
  // A timer in useEffect removes then transition animation.
  // When a column is dragged above/below its upper/lower limit respectively,
  // lower/raise the column ti it's upper/lower limit.
  const normalizeColumnPosition = () => {
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
      columnRef.current.style.transform = `translate(0px, ${draggedYRef.current}px)`;
    } else {
      var before = 0;
      var after = BOX_HEIGHT;

      // While draggedYRef.current is NOT between the current before and after, go to next.
      while (
        !(before <= draggedYRef.current) ||
        !(after > draggedYRef.current)
      ) {
        before += BOX_HEIGHT;
        after += BOX_HEIGHT;
      }

      const distanceToBefore = Math.abs(draggedYRef.current - before);
      const distanceToAfter = Math.abs(draggedYRef.current - after);

      if (distanceToBefore <= distanceToAfter) {
        draggedYRef.current = before;
      } else {
        draggedYRef.current = after;
      }

      // Animating column.
      setIsAnimated(true);
      columnRef.current.style.transition = COLUMN_TRANSITION_ANIMATION;
      columnRef.current.style.transform = `translate(0px, ${draggedYRef.current}px)`;
    }
  };

  // Returns the index of the letter.
  const calculateColumnPosition = () => {
    const newPos = (draggedYRef.current / BOX_HEIGHT) * -1 + numOfBoxes - 1;
    setColPosition(newPos);

    var oldWord = viewedWord;
    oldWord = oldWord.split("");

    var newWord = oldWord;
    newWord[index] = letters[newPos];
    newWord = newWord.join("");

    setViewedWord(newWord);
    sendViewedWord(newWord);
  };

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

  // After an animation is over (column slides to intended position),
  // calculates which position the column is in.
  useEffect(() => {
    if (!isAnimated) {
      calculateColumnPosition();
    }
  }, [isAnimated]);

  // On initial page load, places column on their starting position.
  useEffect(() => {
    normalizeColumnPosition();
  }, []);

  // On initial page load.
  // Adds event listener to determine to window  to determine if user is on a touch device.
  // Runs handleScreenSizeChange on load to set onTouchScreen state variable.
  useEffect(() => {
    const colRefVar = columnRef;

    colRefVar.current.addEventListener("mouseover", addOpacity);
    colRefVar.current.addEventListener("mouseover", addOpacity);
    colRefVar.current.addEventListener("touchstart", addOpacity);

    colRefVar.current.addEventListener("mouseout", removeOpacity);
    colRefVar.current.addEventListener("mouseout", removeOpacity);
    colRefVar.current.addEventListener("touchend", removeOpacity);

    return () => {
      colRefVar.current.removeEventListener("mouseover", addOpacity);
      colRefVar.current.removeEventListener("mouseover", addOpacity);
      colRefVar.current.removeEventListener("touchstart", addOpacity);

      colRefVar.current.removeEventListener("mouseout", removeOpacity);
      colRefVar.current.removeEventListener("mouseout", removeOpacity);
      colRefVar.current.removeEventListener("touchend", removeOpacity);
    };
  });

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
  gameWon: PropTypes.bool,
  viewedWord: PropTypes.string,
  setViewedWord: PropTypes.func,
  sendViewedWord: PropTypes.func,
  index: PropTypes.number,
  wordIsFound: PropTypes.bool,
  setWordIsFound: PropTypes.func,
  onTouchScreen: PropTypes.bool,
};
