function WordsList(props) {
  const foundWords = props.foundWords;

  const wordsList = foundWords.map((word, index) => (
    <li key={index}>{word}</li>
  ));

  return (
    <div className="words-list">
      <p>Found Words</p>
      <br />
      <ul>{wordsList}</ul>
    </div>
  );
}

export default WordsList;
