import React, { useState, useCallback, useMemo } from 'react';
import Card from './Card';
import { GAME_SETTINGS } from '../../utils/settings';

function GameBoard({images = [], selectedTheme, finishedItems, checkItems, isGameOver}) {
  const [visibleItems, setVisibleItems] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);

  // Мемоизируем Set для быстрой проверки 
  const finishedItemsSet = useMemo(
    () => new Set(finishedItems),
    [finishedItems]
  );
  
  const visibleItemsSet = useMemo(
    () => new Set(visibleItems),
    [visibleItems]
  );

  // Оптимизированный обработчик клика на карточку
  const handleCardClick = useCallback((id) => {
    // Ранний выход - быстрые проверки через Set
    if (isGameOver || isProcessing) return;
    if (finishedItemsSet.has(id) || visibleItemsSet.has(id)) return;

    setVisibleItems(prev => {
      switch (prev.length) {
        case 0:
          // Первая карточка
          return [id];
        
        case 1:
          // Вторая карточка - проверяем пару
          const firstId = prev[0];
          checkItems(firstId, id);
          
          // Запускаем таймер очистки
          setIsProcessing(true);
          setTimeout(() => {
            setVisibleItems([]);
            setIsProcessing(false);
          }, GAME_SETTINGS.FLIP_DELAY);
          
          return [...prev, id];
        
        default:
          // Сброс при третьем клике
          return [];
      }
    });
  }, [isGameOver, isProcessing, finishedItemsSet, visibleItemsSet, checkItems]);

  return (
    <ul className={`cards cards-theme-${selectedTheme}`}>
      {images.map((item) => (
        <Card
          key={item.id}
          item={item}
          isVisible={visibleItemsSet.has(item.id)}
          isFinished={finishedItemsSet.has(item.id)}
          onCardClick={handleCardClick}
        />
      ))}
    </ul>
  );
}

// Выполняем мемоизацию компонента
export default React.memo(GameBoard);