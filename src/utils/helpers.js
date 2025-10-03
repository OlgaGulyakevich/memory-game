import { useState, useEffect } from 'react';


// Function to shuffle array (Fisher-Yates)
export const shuffleArray = (array) => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

// Function to create unique ID
export const generateCardId = (type, index, pairNumber) => {
  return `${type}-${index}-${pairNumber}`;
};

// Function to safely access localStorage
export const getFromStorage = (key, defaultValue = null) => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (error) {
    return defaultValue;
  }
};

export const setToStorage = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    // Silent fail - localStorage may be unavailable
  }
};

// Function to calculate game progress
export const calculateProgress = (matchedPairs, totalPairs) => {
  return totalPairs > 0 ? (matchedPairs / totalPairs) * 100 : 0;
};

// Function to sort results by ascending steps
export const sortResults = (results) => {
  return results.sort((a, b) => a.stepsCount - b.stepsCount);
};

// Function to calculate card size and number of columns
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
      
      // Apply only for mobile devices
      if (vw <= 768) {
        const isLandscape = vw > vh;
        
        if (isLandscape) {
          // LANDSCAPE: 6 columns × 2 rows
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
          // PORTRAIT: 3 columns × 4 rows
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
          // Reduce minimum size for very small screens
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
        // Desktop - do not use dynamic size
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