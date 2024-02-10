import { WINNING_COMBINATIONS, INITIAL_GAME_BOARD } from "./constants";
export function derivedActivePlayer(prevTurns) {
  let currPlayer = 'X';
  if (prevTurns.length > 0 && prevTurns[0].player === 'X') currPlayer = 'O';
  return currPlayer;
}

export function derivedWinner (gameBoard, playerName) {
  let winner;
  for (let combination of WINNING_COMBINATIONS) {
    let firstSquareSelection =
      gameBoard[combination[0].row][combination[0].col];
    let secondSquareSelection =
      gameBoard[combination[1].row][combination[1].col];
    let thirdSquareSelection =
      gameBoard[combination[2].row][combination[2].col];

    if (
      firstSquareSelection &&
      firstSquareSelection === secondSquareSelection &&
      firstSquareSelection === thirdSquareSelection
    ) {
      winner = playerName[firstSquareSelection];
    }
  }
  return winner;
}

export function derivedGameBoard(gamePlayer) {
  let gameBoard = [...INITIAL_GAME_BOARD.map((innerArray) => [...innerArray])];
  for (const turn of gamePlayer) {
    const { square, player } = turn;
    const { row, col } = square;
    gameBoard[row][col] = player;
  }
  return gameBoard;
}
