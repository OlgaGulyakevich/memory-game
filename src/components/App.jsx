import React, { useState, useEffect, useCallback } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import StartScreen from './pages/StartScreen';
import GameScreen from './pages/GameScreen';
import ResultScreen from './pages/ResultScreen';
import { getImages } from '../data/themes';
import { getFromStorage, setToStorage } from '../utils/helpers';

function App() {
  const navigate = useNavigate();
  const [currentResult, setCurrentResult] = useState(null);
  const [allResults, setAllResults] = useState([]);
  const [gameImages, setGameImages] = useState([]);
  const [selectedTheme, setSelectedTheme] = useState('cats');
  
  // Загружаем результаты при монтировании
  useEffect(() => {
    // Сначала пытаемся загрузить из localStorage
    const savedResults = getFromStorage('gameResults', []);

    if (savedResults.length > 0) {
      setAllResults(savedResults);
    } else {
      // Если в localStorage ничего нет, загружаем с сервера
      fetch('/data/results.json')
        .then(response => response.json())
        .then(data => {
          setAllResults(data);
          setToStorage('gameResults', data);
        })
        .catch(() => setAllResults([]));
    }
  }, []);

  // Обработчик выбора темы и начала игры
  const handleThemeSelect = useCallback((theme) => {
    setSelectedTheme(theme);
    setGameImages(getImages(theme)); 
    navigate('/game');
  }, [navigate]);

  // Обработчик завершения игры
  const handleGameFinish = useCallback((gameData) => {
    const newResult = {
      name: 'Ваш результат',
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