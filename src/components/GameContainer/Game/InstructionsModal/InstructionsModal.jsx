import { useEffect, useRef, useState } from "react";
import "./InstructionsModal.scss";

const ANIMATION_TIME = 1; // In seconds
const DISAPPEAR_TIME = 1500; // In ms

const InstructionsModal = () => {
  const [disabled, setDisabled] = useState(false);
  const modalRef = useRef(null);

  // Styles
  const modalStyles = {
    transition: `all ${ANIMATION_TIME}s ease-in-out`,
  };

  // Removes modal from screen on click.
  const handleClick = () => {
    setDisabled(true);
  };

  // Fades modal out.
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      modalRef.current.style.opacity = 0;
    }, DISAPPEAR_TIME);

    // Cleanup function to clear the timeout if the component unmounts
    return () => clearTimeout(timeoutId);
  }, []);

  // Removes modal after animation finishes.
  useEffect(() => {
    const timeoutId = setTimeout(
      () => {
        modalRef.current.style.display = "none";
      },
      DISAPPEAR_TIME + ANIMATION_TIME * 1000
    );

    // Cleanup function to clear the timeout if the component unmounts
    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <div
      ref={modalRef}
      className={`instructions  ${disabled && "disabled"}`}
      style={modalStyles}
      onClick={handleClick}
    >
      Slide columns up/down to form words.
    </div>
  );
};

export default InstructionsModal;
