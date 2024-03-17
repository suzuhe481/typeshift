import { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown, faCaretUp } from "@fortawesome/free-solid-svg-icons";

import "./Column.scss";

const COLUMN_ANIMATION_TIME_S = 0.2; // In seconds
const COLUMN_ANIMATION_TIME_MS = COLUMN_ANIMATION_TIME_S * 1000; // In milliseconds
const COLUMN_TRANSITION_ANIMATION = `all ${COLUMN_ANIMATION_TIME_S}s ease-in-out`;
const COLUMN_UPPER_LIMIT = 0; // In pixels
const COLUMN_LOWER_LIMIT = 100; // In pixels
const BOX_HEIGHT = 100; // In pixels

function Column({
  letters,
  gameWon,
  viewedWord,
  setViewedWord,
  sendViewedWord,
  index,
}) {
  // State
  const [onTouchScreen, setOnTouchScreen] = useState();
  const [isAnimated, setIsAnimated] = useState(false);

  // Refs
  const columnRef = useRef(null);
  const initialYRef = useRef(0);
  const draggedYRef = useRef(0);
  const arrowUpRef = useRef(null);
  const arrowDownRef = useRef(null);

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

  const letterBoxes = letters.map((letter, index) => {
    return (
      <div key={index} className="cell">
        {letter}
      </div>
    );
  });

  const handleMouseDown = (e) => {
    if (gameWon) {
      // removeAllColumnEventListners();

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

  const handleMouseUp = () => {
    if (gameWon) {
      // removeAllColumnEventListners();
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
  };

  const handleDrag = (e) => {
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
  };

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

    var oldWord = viewedWord;
    oldWord = oldWord.split("");

    var newWord = oldWord;
    newWord[index] = letters[newPos];
    newWord = newWord.join("");

    setViewedWord(newWord);
    sendViewedWord(newWord);
  };

  // NOTE: Each event listener needs a callback in order to be removed.
  // Removes all of the event listeners related to controlling the column
  // from the columnRef and document.
  // const removeAllColumnEventListners = () => {
  //   columnRef.current.removeEventListener("mousedown", handleMouseDown);
  //   columnRef.current.removeEventListener("touchstart", handleMouseDown);

  //   document.removeEventListener("mouseup", handleMouseUp);
  //   document.removeEventListener("touchmove", handleDrag);
  //   document.removeEventListener("touchend", handleMouseUp);
  //   document.removeEventListener("mousemove", handleDrag);
  // };

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

  // Sets onTouchScreen state according if user is on a touch device or desktop
  const handleScreenSizeChange = () => {
    if (
      "ontouchstart" in window ||
      navigator.maxTouchPoints > 0 ||
      navigator.msMaxTouchPoints > 0
    ) {
      setOnTouchScreen(true);
    } else {
      setOnTouchScreen(false);
    }
  };

  // On initial page load.
  // Adds event listener to determine to window  to determine if user is on a touch device.
  // Runs handleScreenSizeChange on load to set onTouchScreen state variable.
  useEffect(() => {
    handleScreenSizeChange();
    window.addEventListener("resize", handleScreenSizeChange);

    columnRef.current.addEventListener("mouseover", addOpacity);
    columnRef.current.addEventListener("mouseover", addOpacity);
    columnRef.current.addEventListener("touchstart", addOpacity);

    columnRef.current.addEventListener("mouseout", removeOpacity);
    columnRef.current.addEventListener("mouseout", removeOpacity);
    columnRef.current.addEventListener("touchend", removeOpacity);
  }, []);

  // On changes to onTouchScreen state and if game is NOT won,
  // Adds/removes the appropriate event listeners for mousedown and touchstart.
  useEffect(() => {
    if (!gameWon) {
      if (onTouchScreen) {
        columnRef.current.addEventListener("touchstart", handleMouseDown);
        columnRef.current.removeEventListener("mousedown", handleMouseDown);
      } else {
        columnRef.current.addEventListener("mousedown", handleMouseDown);
        columnRef.current.removeEventListener("touchstart", handleMouseDown);
      }
    }
  }, [gameWon, onTouchScreen]);

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
};
