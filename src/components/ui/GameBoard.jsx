import React, { useState, useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import Card from './Card';
import { GAME_SETTINGS } from '../../utils/settings';
import { useCardSize } from '../../utils/helpers';  

function GameBoard({ images = [], selectedTheme, finishedItems, checkItems, isGameOver }) {
  const { t } = useTranslation();
  const [visibleItems, setVisibleItems] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);

  const finishedItemsSet = useMemo(
    () => new Set(finishedItems),
    [finishedItems]
  );
  
  const visibleItemsSet = useMemo(
    () => new Set(visibleItems),
    [visibleItems]
  );

  const handleCardClick = useCallback((id) => {
    if (isGameOver || isProcessing) return;
    if (finishedItemsSet.has(id) || visibleItemsSet.has(id)) return;

    setVisibleItems(prev => {
      switch (prev.length) {
        case 0:
          return [id];
        
        case 1:
          const firstId = prev[0];
          checkItems(firstId, id);
          
          setIsProcessing(true);
          setTimeout(() => {
            setVisibleItems([]);
            setIsProcessing(false);
          }, GAME_SETTINGS.FLIP_DELAY);
          
          return [...prev, id];
        
        default:
          return [];
      }
    });
  }, [isGameOver, isProcessing, finishedItemsSet, visibleItemsSet, checkItems]);

  const { cardSize, columns, isLandscape } = useCardSize();

  const gridStyles = useMemo(() => {
    if (!cardSize) return {};
    
    return {
      '--card-size': `${cardSize}px`,
      gridTemplateColumns: `repeat(${columns}, ${cardSize}px)`,
      gridAutoRows: `${cardSize}px`,
      gap: isLandscape ? 'clamp(3px, 0.8vw, 6px)' : 'clamp(4px, 1vw, 8px)'
    };
  }, [cardSize, columns, isLandscape]);

  const themeName = t(`startScreen.themes.${selectedTheme}`);

  return (
    <ul 
      className={`cards cards-theme-${selectedTheme}`}
      style={gridStyles}
      role="group"
      aria-label={t('gameScreen.boardAriaLabel', { count: images.length, theme: themeName })}
      aria-live="polite"
      aria-atomic="false"
    >
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

export default React.memo(GameBoard);