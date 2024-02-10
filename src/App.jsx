import Player from './components/Player';
import GameBoard from './components/GameBoard';
import { useState } from 'react';
import Log from './components/Log';

function derivedActivePlayer(prevTurns) {
  let currPlayer = 'X';
  if (prevTurns.length > 0 && prevTurns[0].player === 'X') currPlayer = 'O';
  return currPlayer
}
function App() {
  // const [activePlayer, setActivePlayer] = useState('X');
  const [gamePlayer, setGamePlayer] = useState([]);
  let activePlayer = derivedActivePlayer(gamePlayer);

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

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player name="Player-1" symbol="X" isActive={activePlayer === 'X'} />
          <Player name="Player-2" symbol="O" isActive={activePlayer === 'O'} />
        </ol>
        <GameBoard onSelectButton={handleSelectButton} turns={gamePlayer} />
      </div>
      <Log turns={gamePlayer} />
    </main>
  );
}

export default App;
