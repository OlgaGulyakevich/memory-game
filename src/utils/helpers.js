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