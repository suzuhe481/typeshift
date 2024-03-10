import "./WordsList.scss";

function WordsList(props) {
  const foundWords = props.foundWords;

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
