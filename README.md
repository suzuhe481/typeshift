# Typeshift

A game built with React where you need to find words with the given letters by shifting columns.

[Try the live demo here.](https://typeshift.hectorsuazo.com/)

This demo is a recreation of a game with the same name by Zach Gage. [Zach Gage's Typeshift](http://www.playtypeshift.com/)

## Description

Letters are arranged in columns. Users must shift columns up and down to find the hidden words.

There are currently 5 words to find in order to win.

## Releases

### Release 5

- Added new words to Medium difficulty.
- Transitioned project files from JavaScript to TypeScript.

### Release 4

- Implemented useContext to more easily pass data between components.
- Users can pick between 3 difficulty levels. Easy, Medium, or Hard.
- Modal appears before starting the game, giving users instructions on how to play.
- Link allows users to message developer if they find a word that isn't in the game.
- Counter shows words needed to win.
- Play again button.
- Changed font styles.

### Release 3

- Prevented dragging of columns after game is won.
- Animates word when a word is found by slightly growing the letters.
- Game has been made scalable on the backend. Developer can change game options and the play area will be styled responsively.
- Developer can adjust...
  - Contents of the columns.
  - The words to find.
  - Column starting position.

### Release 2

- Implented dragging for columns on desktop and mobile instead of clicking/tapping arrows.
- Removed borders around letters.
- A selection area lets users know what is the current word.
- Changed the style of arrows surrounding columns to carets.
- Arrows appear when a column is hovered/dragged to indicate which column is being controlled.

### Release 1

- 3-lettered words.
- Columns contain arrows that can be pressed for shifting letters.
- Viewed word appears in black borders while unused letters are in light gray borders for clarity.
- Found words appear in a list.
- Win message appears when all words are found (Currently 5).
- Simple desktop and mobile responsiveness.
