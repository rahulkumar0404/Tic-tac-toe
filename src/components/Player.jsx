import { useState } from 'react';

export default function Player({ name, symbol, isActive, onchangeName }) {
  const [playerName, setPlayerName] = useState(name);
  const [isEditing, setIsEditing] = useState(false);

  function handleEditClick() {
    // setIsEditing(!isEditing); this is not best pratice to do that because react schedules a state to
    // update if I written another line with this setIsEditing(!isEditing) it will not get the latest state
    // from the previous state
    setIsEditing((editing) => !editing);

    if(isEditing){
      onchangeName(symbol, playerName)
    }
  }

  function handleChange(event) {
    setPlayerName(event.target.value);
  }

  let editPlayerName, buttonContent;
  if (!isEditing) {
    editPlayerName = <span className="player-name">{playerName}</span>;
    buttonContent = 'Edit';
  } else {
    editPlayerName = (
      <input type="text" required value={playerName} onChange={handleChange} />
    );
    buttonContent = 'Save';
  }
  return (
    <li className={isActive ? 'active' : undefined}>
      <span className="player">
        {editPlayerName}
        <span className="player-symbol">{symbol}</span>
      </span>
      <button onClick={handleEditClick}>{buttonContent}</button>
    </li>
  );
}
