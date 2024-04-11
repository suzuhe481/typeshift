const LettersData = {
  EASY: {
    goalWords: ["CAT", "BIG", "BAG", "BIT", "BAT"],
    ColumnData: [
      {
        letters: ["B", "C"],
        initialPosition: 1,
      },
      {
        letters: ["I", "A"],
        initialPosition: 0,
      },
      {
        letters: ["T", "G"],
        initialPosition: 1,
      },
    ],
  },
  MEDIUM: {
    goalWords: ["ROSE", "RUST", "VASE", "VICE", "RAIN", "VAIN", "MAIN"],
    ColumnData: [
      {
        letters: ["R", "V", "M"],
        initialPosition: 1,
      },
      {
        letters: ["O", "U", "A", "I"],
        initialPosition: 2,
      },
      {
        letters: ["S", "C", "I"],
        initialPosition: 1,
      },
      {
        letters: ["E", "T", "N"],
        initialPosition: 2,
      },
    ],
  },
  HARD: {
    goalWords: [
      "POWER",
      "PRINT",
      "LARGE",
      "TOWER",
      "LOWER",
      "DOWER",
      "DRIER",
      "TRINE",
      "PAINT",
      "PARED",
      "LASER",
      "LATER",
      "LATTE",
      "LOSER",
      "TASED",
      "TASER",
      "DARED",
      "TOWED",
      "TRIED",
    ],
    ColumnData: [
      {
        letters: ["D", "T", "L", "P"],
        initialPosition: 2,
      },
      {
        letters: ["O", "R", "A"],
        initialPosition: 1,
      },
      {
        letters: ["T", "W", "S", "R", "I"],
        initialPosition: 2,
      },
      {
        letters: ["G", "E", "T", "N"],
        initialPosition: 0,
      },
      {
        letters: ["T", "D", "R", "E"],
        initialPosition: 1,
      },
    ],
  },
};

export default LettersData;
