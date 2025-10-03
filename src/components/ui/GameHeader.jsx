import React from 'react';
import { useTranslation } from 'react-i18next';

const GameHeader = React.memo(({ moves, progress, remainingLives, matchedPairs, totalPairs }) => {
  const { t } = useTranslation();

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
          aria-label={t('gameScreen.progress.ariaLabel', { progress: Math.round(progress) })}
        />
      </div>
      <p className="progress-description">
        {t('gameScreen.progress.description')} <span>{matchedPairs}</span> {t('gameScreen.progress.of')} <span>{totalPairs}</span>
      </p>
      <div className="steps">{t('gameScreen.steps', { count: moves })}</div>
      {/* Life system ready to activate */}
      {/* <div className="lives">{t('gameScreen.lives', { count: remainingLives })}</div> */}
    </>
  );
});

GameHeader.displayName = 'GameHeader';

export default GameHeader;