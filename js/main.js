import { TURN, CELL_VALUE, GAME_STATUS } from "./constants.js";
import { 
  getCellElementAtIdx,
  getCellElementList,
  getCurrentTurnElement, 
  getGameStatusElement,
  getReplayButtonElement,
  getUlElelment
} 
from "./selectors.js";

import { checkGameStatus } from './utils.js';

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

function updateGameStatus(newGameStatus) {
  gameStatus = newGameStatus;
  console.log(gameStatus);

  const gameStatusElement = getGameStatusElement();
  
  gameStatusElement.textContent = gameStatus;
}

function showReplayButton() {
  const replayButton = getReplayButtonElement();
  
  replayButton.classList.add('show');
}

function highlightWinCell(positionList) {
  positionList.forEach((position) => {
    const liElement = getCellElementAtIdx(position);

    liElement.classList.add('win');
  })
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

  if(game.status === GAME_STATUS.ENDED) {
    // update games status
    updateGameStatus(game.status);
    // show replay button
    showReplayButton();
  }

  if(game.status === GAME_STATUS.X_WIN || game.status === GAME_STATUS.O_WIN) {
    // UPDATE GAMES STATUS
    updateGameStatus(game.status);
    // show replay button
    showReplayButton();
    // highlight win cells
    highlightWinCell(game.winPositions);
  }
}

function initCellElementList() {
  const cellElementList = getCellElementList();
  const ulElement = getUlElelment();

  // cellElementList.forEach((cellElement, index) => {
  //   cellElement.addEventListener('click', () => {
  //     handleCellClick(cellElement, index);
  //   })
  // });

  cellElementList.forEach((cell, index) => {
    cell.dataset.index = index;
  });
  
  ulElement.addEventListener('click', (event) => {
    const index = Number.parseInt(event.target.dataset.index);
    handleCellClick(event.target, index);
  })
}

function resetGame() {
  // reset temp global vars
  currentTurn = TURN.CROSS;
  gameStatus = GAME_STATUS.PLAYING;
  cellValues = cellValues.map(cell => cell = '');
  // reset dom cellElement
  // reset game status
  const resetStatus = getGameStatusElement();
  resetStatus.textContent = gameStatus;

  // reset current TURN
  const statusTurn = getCurrentTurnElement();
  statusTurn.classList.remove(TURN.CROSS, TURN.CIRCLE);
  statusTurn.classList.add(TURN.CROSS);
  // reset game board
  const cellList = getCellElementList();
  cellList.forEach(cell => {
    cell.className = '';
  })
  // hide replay button
  const replayButton = getReplayButtonElement();
  replayButton.classList.remove('show');
}

function initReplayButton() {
  const replayButton = getReplayButtonElement();
  if(!replayButton) return;

  replayButton.addEventListener('click', resetGame)
}

(() => {
  initCellElementList();
  initReplayButton();
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
