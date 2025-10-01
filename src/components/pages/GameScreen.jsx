import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import GameHeader from '../ui/GameHeader';
import GameBoard from '../ui/GameBoard';
import GameModal from '../ui/GameModal';
import useGame from '../../hooks/useGame';
import { GAME_SETTINGS } from '../../utils/settings';
import { calculateProgress } from '../../utils/helpers';

function GameScreen({ images, selectedTheme, onNewGame, onGameFinish }) {
  const { t } = useTranslation();
  const {
    finishedItems,
    handleReset,
    stepsCount,
    errors,
    checkItems,
    isWin,
    isGameOver
  } = useGame(images);
  
  const [showVictoryModal, setShowVictoryModal] = useState(false);

  useEffect(() => {
    if (isWin) {
      const timerId = setTimeout(() => setShowVictoryModal(true), 100);
      return () => clearTimeout(timerId);
    }
  }, [isWin]);

  const totalPairs = images.length / 2;
  const matchedPairs = finishedItems.length / 2;
  const remainingLives = GAME_SETTINGS.LIVES_COUNT - errors;

  return (
    <main className="game container" role="main" aria-label={t('gameScreen.ariaLabel')}>
      <header className="game-header">
        <GameHeader 
          moves={stepsCount}
          progress={calculateProgress(matchedPairs, totalPairs)}
          remainingLives={remainingLives}
          matchedPairs={matchedPairs}
          totalPairs={totalPairs}
        />
      </header>

      <section 
        className="game-board-section" 
        aria-label={t('gameScreen.boardHeading')} 
        aria-labelledby="board-heading"
      >
        <h2 id="board-heading" className="visually-hidden">
          {t('gameScreen.boardHeading')}
        </h2>
        <GameBoard
          images={images}
          selectedTheme={selectedTheme}
          finishedItems={finishedItems}
          checkItems={checkItems}
          isGameOver={isGameOver}
        />
      </section>

      {isGameOver && !isWin && (
        <GameModal 
          isWin={false}
          moves={stepsCount}
          matchedPairs={matchedPairs}
          onRestart={() => {
            setShowVictoryModal(false);
            handleReset();
          }}
          onNewGame={onNewGame}
          onShowResults={onGameFinish}
        />
      )}

      {showVictoryModal && isWin && (
        <GameModal 
          isWin={true}
          moves={stepsCount}
          matchedPairs={matchedPairs}
          onRestart={() => {
            setShowVictoryModal(false);
            handleReset();
          }}
          onNewGame={onNewGame}
          onShowResults={() => onGameFinish({
            moves: stepsCount, 
            errors: errors
          })}
        />
      )}
    </main>
  );
}

export default GameScreen;