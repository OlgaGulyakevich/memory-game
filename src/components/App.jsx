import React, { useState, useEffect, useCallback } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import StartScreen from './pages/StartScreen';
import GameScreen from './pages/GameScreen';
import ResultScreen from './pages/ResultScreen';
import { getImages } from '../data/themes';
import { getFromStorage, setToStorage } from '../utils/helpers';
import { getAssetPath } from '../utils/paths';
import { useTranslation } from 'react-i18next';

function App() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [currentResult, setCurrentResult] = useState(null);
  const [allResults, setAllResults] = useState([]);
  const [gameImages, setGameImages] = useState([]);
  const [selectedTheme, setSelectedTheme] = useState('cats');
  
  // Загружаем результаты при монтировании
  useEffect(() => {
    // Сначала проверяем в localStorage
    const savedResults = getFromStorage('gameResults', []);
  
    if (savedResults.length > 0) {
      setAllResults(savedResults);
    } else {
      // Если данных нет, загружаем из файла
      fetch(getAssetPath('data/results.json'))
        .then(response => response.json())
        .then(data => {
          setAllResults(data);
          setToStorage('gameResults', data);
        })
        .catch(() => setAllResults([]));
    }
  }, []);

  // Предзагрузка изображений выбранной темы
  const preloadThemeImages = useCallback((theme) => {
    const images = getImages(theme);
    images.forEach(image => {
      const img = new Image();
      img.src = image.url;
    });
  }, []);

  // Обработчик выбора темы и начала игры
  const handleThemeSelect = useCallback((theme) => {
    setSelectedTheme(theme);
    const images = getImages(theme);
    setGameImages(images);
    
    // Предзагружаем изображения для плавности игры
    preloadThemeImages(theme);
    
    navigate('/game');
  }, [navigate, preloadThemeImages]);

  // Обработчик завершения игры
  const handleGameFinish = useCallback((gameData) => {
    const newResult = {
      nameKey: 'resultScreen.yourResult',  // Сохраняем ключ перевода, а не перевод!
      stepsCount: gameData.moves,
      errors: gameData.errors,
      timestamp: new Date().toISOString(),
      theme: selectedTheme,
      isCurrent: true
    };
    setCurrentResult(newResult);

    const updatedResults = [...allResults, newResult];
    setAllResults(updatedResults);
    setToStorage('gameResults', updatedResults);

    navigate('/results');
  }, [allResults, selectedTheme, navigate]);

  // Обработчик новой игры
  const handleNewGame = useCallback(() => {
    setCurrentResult(null);
    navigate('/start');
  }, [navigate]);

  return (
    <Routes>
      <Route path="/" element={<Navigate to="/start" replace />} />
      <Route 
        path="/start" 
        element={<StartScreen onThemeSelect={handleThemeSelect} />}
      />
      <Route 
        path="/game" 
        element={
          <GameScreen 
            images={gameImages}
            selectedTheme={selectedTheme}
            onGameFinish={handleGameFinish} 
            onNewGame={handleNewGame} 
          />
        }
      />
      <Route 
        path="/results" 
        element={
          <ResultScreen 
            currentResult={currentResult}
            allResults={allResults}
            selectedTheme={selectedTheme}
            onNewGame={handleNewGame}
          />
        } 
      />
    </Routes>
  );
}

export default App;
