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
  const { t, i18n } = useTranslation();
  const [currentResult, setCurrentResult] = useState(null);
  const [allResults, setAllResults] = useState([]);
  const [gameImages, setGameImages] = useState([]);
  const [selectedTheme, setSelectedTheme] = useState('cats');
  
  // Dynamic lang attribute for SEO and accessibility
  useEffect(() => {
    document.documentElement.lang = i18n.language;
  }, [i18n.language]);
  
  // Load results on mount
  useEffect(() => {
    // First check in localStorage
    const savedResults = getFromStorage('gameResults', []);
  
    if (savedResults.length > 0) {
      setAllResults(savedResults);
    } else {
      // If no data, load from file
      fetch(getAssetPath('data/results.json'))
        .then(response => response.json())
        .then(data => {
          setAllResults(data);
          setToStorage('gameResults', data);
        })
        .catch(() => setAllResults([]));
    }
  }, []);

  // Preload images for selected theme
  const preloadThemeImages = useCallback((theme) => {
    const images = getImages(theme);
    images.forEach(image => {
      const img = new Image();
      img.src = image.url;
    });
  }, []);

  // Handler for theme selection and game start
  const handleThemeSelect = useCallback((theme) => {
    setSelectedTheme(theme);
    const images = getImages(theme);
    setGameImages(images);
    
    // Preload images for smooth gameplay
    preloadThemeImages(theme);
    
    navigate('/game');
  }, [navigate, preloadThemeImages]);

  // Handler for game finish
  const handleGameFinish = useCallback((gameData) => {
    const newResult = {
      nameKey: 'resultScreen.yourResult',  // Save translation key, not translation!
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

  // Handler for new game
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
