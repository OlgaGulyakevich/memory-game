import React from 'react';

const GameHeader = React.memo(({ moves, progress, remainingLives, matchedPairs, totalPairs }) => {
  return (
    <>
      <div className="progress-wrapper">
        <div 
          className="progress" 
          style={{ width: `${progress}%` }}
          role="progressbar"
          aria-valuenow={Math.round(progress)}
          aria-valuemin="0"
          aria-valuemax="100"
          aria-label={`Прогресс игры: ${Math.round(progress)}%`}
        />
      </div>
      <p className="progress-description">
        Открыто <span>{matchedPairs}</span> / <span>{totalPairs}</span>
      </p>
      <div className="steps">Шаг {moves}</div>
      {/* Система жизней готова к активации */}
      {/* <div className="lives">❤️ Жизни: {remainingLives}</div> */}
    </>
  );
});

GameHeader.displayName = 'GameHeader';

export default GameHeader;