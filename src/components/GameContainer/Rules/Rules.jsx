import "./Rules.scss";

function Rules() {
  return (
    <div className="rules">
      <p className="rules__title">Rules</p>
      <p className="rules__text">
        Find words by sliding the columns up and down. You need a certain number
        of words to beat the level.
        <br />
        <br />
        If you find a word that is not counted but you think should, send me a
        message here and let me know in the Contact Me section.
        <br />
        <br />
      </p>
      <a
        href="https://www.hectorsuazo.com/#contact"
        target="_blank"
        rel="noopener noreferrer"
        className="message-link"
      >
        I FOUND A NEW WORD!
      </a>
    </div>
  );
}

export default Rules;
