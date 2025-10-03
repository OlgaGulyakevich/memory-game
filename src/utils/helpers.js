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
          // LANDSCAPE: 6 колонок × 2 ряда
          const headerHeight = 80;
          const bottomMargin = 10;
          const topPadding = 10;
          const gapSize = Math.min(6, vw * 0.015);
          const verticalGaps = 1 * gapSize;
          const horizontalGaps = 5 * gapSize;
          
          const availableHeight = vh - headerHeight - bottomMargin - topPadding - verticalGaps;
          const maxCardHeight = availableHeight / 2;
          
          const sidePadding = 15;
          const availableWidth = vw - (sidePadding * 2) - horizontalGaps;
          const maxCardWidth = availableWidth / 6;
          
          const size = Math.min(maxCardHeight, maxCardWidth);
          const finalSize = Math.max(Math.min(size, 120), 70);
          
          setLayoutConfig({
            cardSize: finalSize,
            columns: 6,
            isLandscape: true
          });
        } else {
          // PORTRAIT: 3 колонки × 4 ряда
          // ✅ ИСПРАВЛЕНИЕ ДЛЯ МАЛЕНЬКИХ ЭКРАНОВ
          const navigationHeight = vw <= 375 ? 50 : 80;
          const headerHeight = vw <= 375 ? 60 : 90;
          const bottomMargin = vw <= 375 ? 12 : 20;
          const topPadding = vw <= 375 ? 4 : 15;
          const gapSize = vw <= 375 ? 4 : Math.min(8, vw * 0.01);
          const totalGaps = 3 * gapSize;
          
          const availableHeight = vh - navigationHeight - headerHeight - bottomMargin - topPadding - totalGaps;
          const maxCardHeight = availableHeight / 4;
          
          const sidePadding = vw <= 375 ? 12 : 20;
          const horizontalGaps = 2 * gapSize;
          const availableWidth = vw - (sidePadding * 2) - horizontalGaps;
          const maxCardWidth = availableWidth / 3;
          
          const size = Math.min(maxCardHeight, maxCardWidth);
          // ✅ Уменьшаем минимальный размер для очень маленьких экранов
          const minSize = vw <= 360 ? 85 : (vw <= 375 ? 95 : 110);
          const maxSize = vw <= 375 ? 105 : 120;
          const finalSize = Math.max(Math.min(size, maxSize), minSize);
          
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