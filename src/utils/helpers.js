import { useState, useEffect } from 'react';

// Функция для склонения числительных
export const getWordDeclension = (count, words) => {
  const cases = [2, 0, 1, 1, 1, 2];
  return words[(count % 100 > 4 && count % 100 < 20) ? 2 : cases[Math.min(count % 10, 5)]];
};

// Функция перемешивания массива (Fisher-Yates)
export const shuffleArray = (array) => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

// Функция для создания уникального ID
export const generateCardId = (type, index, pairNumber) => {
  return `${type}-${index}-${pairNumber}`;
};

// Функция для безопасного обращения к localStorage
export const getFromStorage = (key, defaultValue = null) => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (error) {
    console.warn(`Error reading from localStorage: ${error}`);
    return defaultValue;
  }
};

export const setToStorage = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.warn(`Error writing to localStorage: ${error}`);
  }
};

// Функция для вычисления прогресса игры
export const calculateProgress = (matchedPairs, totalPairs) => {
  return totalPairs > 0 ? (matchedPairs / totalPairs) * 100 : 0;
};

// Функция сортировки результатов по возрастанию шагов
export const sortResults = (results) => {
  return results.sort((a, b) => a.stepsCount - b.stepsCount);
};

// Функция для вычисления размера карточки и количества колонок
export const useCardSize = () => {
  const [layoutConfig, setLayoutConfig] = useState({
    cardSize: null,
    columns: 3,
    isLandscape: false
  });
  
  useEffect(() => {
    const calculateCardSize = () => {
      const vh = window.innerHeight;
      const vw = window.innerWidth;
      
      // Применяем только для мобильных устройств
      if (vw <= 768) {
        const isLandscape = vw > vh;
        
        if (isLandscape) {
          // LANDSCAPE: 4 колонки × 3 ряда
          const headerHeight = 60;
          const bottomMargin = 10;
          const topPadding = 5;
          const gapSize = Math.min(4, vw * 0.006);
          const verticalGaps = 2 * gapSize; // 2 gaps между 3 рядами
          const horizontalGaps = 3 * gapSize; // 3 gaps между 4 колонками
          
          const availableHeight = vh - headerHeight - bottomMargin - topPadding - verticalGaps;
          const maxCardHeight = availableHeight / 3; // 3 ряда
          
          const sidePadding = 10;
          const availableWidth = vw - (sidePadding * 2) - horizontalGaps;
          const maxCardWidth = availableWidth / 4; // 4 колонки
          
          const size = Math.min(maxCardHeight, maxCardWidth);
          // const finalSize = Math.max(Math.min(size, 80), 50);
          const finalSize = Math.max(Math.min(size, 80), 50);
          
          setLayoutConfig({
            cardSize: finalSize,
            columns: 4,
            isLandscape: true
          });
        } else {
          // PORTRAIT: 3 колонки × 4 ряда
          const headerHeight = 90;
          const bottomMargin = 20;
          const topPadding = 15;
          const gapSize = Math.min(8, vw * 0.01);
          const totalGaps = 3 * gapSize; // 3 gaps между 4 рядами
          
          const availableHeight = vh - headerHeight - bottomMargin - topPadding - totalGaps;
          const maxCardHeight = availableHeight / 4; // 4 ряда
          
          const sidePadding = 20;
          const horizontalGaps = 2 * gapSize; // 2 gaps между 3 колонками
          const availableWidth = vw - (sidePadding * 2) - horizontalGaps;
          const maxCardWidth = availableWidth / 3; // 3 колонки
          
          const size = Math.min(maxCardHeight, maxCardWidth);
          const finalSize = Math.max(Math.min(size, 120), 110);
          
          setLayoutConfig({
            cardSize: finalSize,
            columns: 3,
            isLandscape: false
          });
        }
      } else {
        // Десктоп - не используем динамический размер
        setLayoutConfig({
          cardSize: null,
          columns: 3,
          isLandscape: false
        });
      }
    };
    
    calculateCardSize();
    window.addEventListener('resize', calculateCardSize);
    window.addEventListener('orientationchange', calculateCardSize);
    
    return () => {
      window.removeEventListener('resize', calculateCardSize);
      window.removeEventListener('orientationchange', calculateCardSize);
    };
  }, []);
  
  return layoutConfig;
};