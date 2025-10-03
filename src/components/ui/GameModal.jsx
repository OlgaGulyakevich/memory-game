import React from 'react';
import { useTranslation } from 'react-i18next';
import { getPlural } from '../../utils/pluralization';

function GameModal({ isWin, matchedPairs, onNewGame, onShowResults }) {
  const { t, i18n } = useTranslation();

  const getPairsText = () => {
    const pluralForm = getPlural(matchedPairs, i18n.language);
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