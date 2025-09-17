import React from 'react';
import { getWordDeclension } from '../../utils/helpers';


function GameModal({ isWin, matchedPairs, onNewGame, onShowResults }) {
  return (
    <div className="modal">
      <div className="modal-box">
        <h3 className="modal-caption">
          {isWin ? 'Победа!' : 'Игра окончена'}
        </h3>
        <p className="modal-description">
          {isWin 
            ? 'Теперь давайте узнаем результаты этой партии'
            : `Вы собрали ${matchedPairs} ${getWordDeclension(matchedPairs, ['пару', 'пары', 'пар'])}`
          }
        </p>
        <div className="modal-buttons">
          {isWin ? (
            <button 
              className="button modal-button" 
              type="button" 
              onClick={onShowResults}
            >
              Показать результаты
            </button>
          ) : (
            <>
              <button className="button modal-button" type="button" 
              onClick={onNewGame}>
                Новая игра
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default GameModal;