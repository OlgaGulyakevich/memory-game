import React from 'react';


 function GameHeader({ moves, progress, remainingLives, matchedPairs, totalPairs }) {
  return (
    <>
      <div className="progress-wrapper">
        <div className="progress" style={{ width: `${progress}%` }}></div>
      </div>
      <p className="progress-description">
        Открыто <span>{matchedPairs}</span> / <span>{totalPairs}</span>
      </p>
      <div className="steps">Шаг {moves}</div>
      {/* TODO: Добавить отображение жизней в будущем */}
      {/* <div className="lives">❤️ Жизни: {remainingLives}</div> */}
    </>
  );
}

export default GameHeader;