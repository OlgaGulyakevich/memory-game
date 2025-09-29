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

// Функция для вычисления размера карточки
export const useCardSize = () => {
  const [cardSize, setCardSize] = useState(null);
  
  useEffect(() => {
    const calculateCardSize = () => {
      const vh = window.innerHeight;
      const vw = window.innerWidth;
      
      // Применяем только для мобильных устройств
      if (vw <= 768) {
        // Более точные расчеты для мобильных устройств
        const headerHeight = 90; // Реальная высота header
        const bottomMargin = 20;
        const topPadding = 15;
        const gapSize = Math.min(8, vw * 0.01); // Адаптивный gap
        const totalGaps = 5 * gapSize; // 5 gaps между 6 рядами
        
        const availableHeight = vh - headerHeight - bottomMargin - topPadding - totalGaps;
        const maxCardHeight = availableHeight / 6; // 6 рядов карточек
        
        const sidePadding = 20;
        const horizontalGap = gapSize;
        const availableWidth = vw - (sidePadding * 2) - horizontalGap;
        const maxCardWidth = availableWidth / 2; // 2 колонки
        
        // Выбираем меньшее значение для квадратных карточек
        const size = Math.min(maxCardHeight, maxCardWidth);
        
        // Минимум 45px, максимум 110px для мобильных
        const finalSize = Math.max(Math.min(size, 110), 45);
        
        setCardSize(finalSize);
      } else {
        // Десктоп - не используем динамический размер
        setCardSize(null);
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
  
  return cardSize;
};