import Player from './components/Player';
import GameBoard from './components/GameBoard';
import { useState } from 'react';
import Log from './components/Log';
import { PLAYERS } from './constants';
import GameOver from './components/GameOver';
import { derivedGameBoard, derivedWinner, derivedActivePlayer } from './logic';

function App() {
  const [playerName, setPlayerName] = useState(PLAYERS);
  const [gamePlayer, setGamePlayer] = useState([]);
  let activePlayer = derivedActivePlayer(gamePlayer);
  const gameBoard = derivedGameBoard(gamePlayer);
  const winner = derivedWinner(gameBoard, playerName);
  const hasDraw = gamePlayer.length === 9 && winner === undefined;

  function handleSelectButton(rowIndex, colIndex) {
    // setActivePlayer((currActivePlayer) =>
    //   currActivePlayer === 'X' ? 'O' : 'X'
    // );

    setGamePlayer((prevTurns) => {
      const updateBoard = [
        { square: { row: rowIndex, col: colIndex }, player: activePlayer },
        ...prevTurns,
      ];
      return updateBoard;
    });
  }

  function handleRestart() {
    setGamePlayer([]);
  }

  function handleChangePlayerName(symbol, newName) {
    setPlayerName((prevPlayerDetails) => {
      return {
        ...prevPlayerDetails,
        [symbol]: newName,
      };
    });
  }

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player
            name={PLAYERS.X}
            symbol="X"
            isActive={activePlayer === 'X'}
            onchangeName={handleChangePlayerName}
          />
          <Player
            name={PLAYERS.O}
            symbol="O"
            isActive={activePlayer === 'O'}
            onchangeName={handleChangePlayerName}
          />
        </ol>
        {(winner || hasDraw) && (
          <GameOver winner={winner} onRestart={handleRestart} />
        )}
        <GameBoard onSelectButton={handleSelectButton} board={gameBoard} />
      </div>
      <Log turns={gamePlayer} />
    </main>
  );
}

export default App;
