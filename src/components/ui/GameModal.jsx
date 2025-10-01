import React from 'react';
import { useTranslation } from 'react-i18next';

function GameModal({ isWin, matchedPairs, onNewGame, onShowResults }) {
  const { t, i18n } = useTranslation();

  const getPlural = (count) => {
    const language = i18n.language;
    if (language === 'ru') {
      const mod10 = count % 10;
      const mod100 = count % 100;
      if (mod100 >= 11 && mod100 <= 19) return 'many';
      if (mod10 === 1) return 'one';
      if (mod10 >= 2 && mod10 <= 4) return 'few';
      return 'many';
    }
    return count === 1 ? 'one' : 'many';
  };

  const getPairsText = () => {
    const pluralForm = getPlural(matchedPairs);
    return t(`gameModal.pairs.${pluralForm}`);
  };

  return (
    <div 
      className="modal"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <div className="modal-box">
        <h3 
          id="modal-title"
          className="modal-caption"
        >
          {isWin ? t('gameModal.victory.title') : t('gameModal.gameOver.title')}
        </h3>
        <p 
          id="modal-description"
          className="modal-description"
        >
          {isWin 
            ? t('gameModal.victory.description')
            : t('gameModal.gameOver.description', { count: matchedPairs, pairs: getPairsText() })
          }
        </p>
        <div className="modal-buttons">
          {isWin ? (
            <button 
              className="button modal-button" 
              type="button" 
              onClick={onShowResults}
            >
              {t('gameModal.victory.button')}
            </button>
          ) : (
            <button 
              className="button modal-button" 
              type="button" 
              onClick={onNewGame}
            >
              {t('gameModal.gameOver.button')}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default GameModal;