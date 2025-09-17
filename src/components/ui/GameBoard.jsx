import React, { useState, useCallback } from 'react';
import Card from './Card';
import { GAME_SETTINGS } from '../../utils/settings';


function GameBoard({images = [], selectedTheme, finishedItems, checkItems, isGameOver}) {
  const [visibleItems, setVisibleItems] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleCardClick = useCallback((id) => {
    // Игнорируем клики если игра окончена, карточка отгадана или уже видима
    if (isGameOver || finishedItems.includes(id) || visibleItems.includes(id) || isProcessing) {
      return;
    }

    // Логика клика по карточкам
    switch (visibleItems.length) {
      case 0:
        // Первая карточка - просто показываем
        setVisibleItems([id]);
        break;
      case 1:
        // Вторая карточка - показываем и проверяем пару
        setVisibleItems((items) => [...items, id]);
        checkItems(visibleItems[0], id);
        
        // Ставим таймер для очистки видимых карточек
        setIsProcessing(true);
        setTimeout(() => {
          setVisibleItems([]);
          setIsProcessing(false);
        }, GAME_SETTINGS.FLIP_DELAY);
        break;
      default:
        // Третья карточка и больше - просто очищаем видимые
        setVisibleItems([]);
    }
  }, [isGameOver, finishedItems, visibleItems, checkItems, isProcessing]);

  return (
    <ul className={`cards cards-theme-${selectedTheme}`}>
      {images.map((item) => (
        <Card
          key={item.id}
          item={item}
          isVisible={visibleItems.includes(item.id)}
          isFinished={finishedItems.includes(item.id)}
          onCardClick={handleCardClick}
        />
      ))}
    </ul>
  );
}

export default GameBoard;