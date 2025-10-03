import { useState } from 'react';
import { GAME_SETTINGS } from '../utils/settings';

const useGame = (images) => {
  const [finishedItems, setFinishedItems] = useState([]);
  const [stepsCount, setStepsCount] = useState(0);
  const [errors, setErrors] = useState(0);

  // Check pair of cards
  const checkItems = (firstItem, secondItem) => {
    const firstImage = images.find(({id}) => id === firstItem);
    const secondImage = images.find(({id}) => id === secondItem);
    
    if (firstImage.url === secondImage.url) {
      // Pair matched - add to guessed
      setFinishedItems((items) => [...items, firstItem, secondItem]);
    } else {
      // Pair not matched - increase errors
      setErrors((e) => e + 1);
    }
    // Increase steps counter
    setStepsCount((i) => i + 1);
  };

  // Reset game
  const handleReset = () => {
    setFinishedItems([]);
    setStepsCount(0);
    setErrors(0);
  };

  // Check win
  const isWin = finishedItems.length > 0 && finishedItems.length === images.length;
  
  // Check loss
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