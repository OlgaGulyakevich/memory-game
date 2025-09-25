
import React, { useState, useEffect } from 'react';
import GameHeader from '../ui/GameHeader';
import GameBoard from '../ui/GameBoard';
import GameModal from '../ui/GameModal';
import useGame from '../../hooks/useGame';
import { GAME_SETTINGS } from '../../utils/settings';
import { calculateProgress } from '../../utils/helpers';



function GameScreen({ images, selectedTheme, onNewGame, onGameFinish}) {
  const {
    finishedItems,
    handleReset,
    stepsCount,
    errors,
    checkItems,
    isWin,
    isGameOver
  } = useGame(images);
   // Управляем показом модального окна победы
  const [showVictoryModal, setShowVictoryModal] = useState(false);

  useEffect(() => {
    if (isWin) {
      const timerId = setTimeout(() => setShowVictoryModal(true), 100);
      return () => clearTimeout(timerId);
    }
  }, [isWin]);

  // Вычисляем производные значения
  const totalPairs = images.length / 2;
  const matchedPairs = finishedItems.length / 2;
  const remainingLives = GAME_SETTINGS.LIVES_COUNT - errors;

  return (
    <main className="game container" role="main" aria-label="Игровой экран">
      <header className="game-header">
        <GameHeader 
        moves={stepsCount}
        progress={calculateProgress(matchedPairs, totalPairs)}
        remainingLives={remainingLives}
        matchedPairs={matchedPairs}
        totalPairs={totalPairs}
         />
      </header>

      <section className="game-board-section" aria-label="Игровое поле" aria-labelledby='board-heading'>
        <h2 id="board-heading" className="visually-hidden">Игровое поле</h2>
      <GameBoard
        images={images}
        selectedTheme={selectedTheme}
        finishedItems={finishedItems}
        checkItems={checkItems}
        isGameOver={isGameOver}
      />
      </section>
  

      {/* Модальное окно поражения */}
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

      {/* Модальное окно победы */}
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