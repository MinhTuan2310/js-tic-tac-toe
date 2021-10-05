import { TURN, CELL_VALUE, GAME_STATUS } from "./constants.js";
import { 
  getCellElementAtIdx,
  getCellElementList,
  getCurrentTurnElement 
} 
from "./selectors.js";

import { checkGameStatus } from './utils.js';

console.log(checkGameStatus(['X', 'O', 'O', '', 'X', '', '', 'O', 'X']));

/**
 * Global variables
 */
let currentTurn = TURN.CROSS;
let gameStatus = GAME_STATUS.PLAYING;
let cellValues = new Array(9).fill("");

function toggleTurn() {
  currentTurn = currentTurn === TURN.CROSS ? TURN.CIRCLE : TURN.CROSS;

  const statusTurn = getCurrentTurnElement();
  statusTurn.classList.remove(TURN.CROSS, TURN.CIRCLE);
  statusTurn.classList.add(currentTurn);
}

function handleCellClick(cellElement, index) {
  const isEndGame = gameStatus !== GAME_STATUS.PLAYING;
  const isClicked = cellElement.classList.contains(TURN.CROSS) || cellElement.classList.contains(TURN.CIRCLE);

  if(isClicked || isEndGame) return;

  cellElement.classList.add(currentTurn);

  // update cellValues
  cellValues[index] = currentTurn === TURN.CROSS ? CELL_VALUE.CROSS : CELL_VALUE.CIRCLE;

  toggleTurn();

  // check game status
  const game = checkGameStatus(cellValues);

  if(status.game === GAME_STATUS.ENDED) {
    // update games status
    // show replay button
  }

  if(status.game === GAME_STATUS.X_WIN || status.game === GAME_STATUS.O_WIN) {
    // UPDATE GAMES STATUS
    // show replay button
    // highlight win cells
  }
}

function initCellElementList() {
  const cellElementList = getCellElementList();

  cellElementList.forEach((cellElement, index) => {
    cellElement.addEventListener('click', () => {
      handleCellClick(cellElement, index);
    })
  });

}


(() => {
  initCellElementList();
})();
/**
 * TODOs
 *
 * 1. Bind click event for all cells
 * 2. On cell click, do the following:
 *    - Toggle current turn
 *    - Mark current turn to the selected cell
 *    - Check game state: win, ended or playing
 *    - If game is win, highlight win cells
 *    - Not allow to re-click the cell having value.
 *
 * 3. If game is win or ended --> show replay button.
 * 4. On replay button click --> reset game to play again.
 *
 */
