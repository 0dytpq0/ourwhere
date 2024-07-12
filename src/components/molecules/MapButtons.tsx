import React from 'react';

type MapButtonsProps = {
  onClickButton1: () => void;
  onClickButton2: () => void;
};

const MapButtons: React.FC<MapButtonsProps> = ({ onClickButton1, onClickButton2 }) => {
  return (
    <div>
      <button onClick={onClickButton1}>Button 1</button>
      <button onClick={onClickButton2}>Button 2</button>
    </div>
  );
};

export default MapButtons;
