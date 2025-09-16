import { useState } from 'react';
import { GAME_SETTINGS } from '../utils/settings';

const useGame = (images) => {
  const [finishedItems, setFinishedItems] = useState([]);
  const [stepsCount, setStepsCount] = useState(0);
  const [errors, setErrors] = useState(0);

  // Проверка пары карточек 
  const checkItems = (firstItem, secondItem) => {
    const firstImage = images.find(({id}) => id === firstItem);
    const secondImage = images.find(({id}) => id === secondItem);
    
    if (firstImage.url === secondImage.url) {
      // Пара совпала - добавляем в отгаданные
      setFinishedItems((items) => [...items, firstItem, secondItem]);
    } else {
      // Пара не совпала - увеличиваем ошибки
      setErrors((e) => e + 1);
    }
    // Увеличиваем счетчик шагов
    setStepsCount((i) => i + 1);
  };

  // Сброс игры
  const handleReset = () => {
    setFinishedItems([]);
    setStepsCount(0);
    setErrors(0);
  };

  // Проверка победы
  const isWin = finishedItems.length > 0 && finishedItems.length === images.length;
  
  // Проверка поражения
  const isGameOver = errors >= GAME_SETTINGS.LIVES_COUNT;

  return {
    finishedItems,
    handleReset,
    stepsCount,
    errors,
    checkItems,
    isWin,
    isGameOver
  };
};

export default useGame;