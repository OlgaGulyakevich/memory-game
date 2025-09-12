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