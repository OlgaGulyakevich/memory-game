import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/start" replace />} />
        <Route path="/start" element={<StartScreen />} />
        <Route path="/game/:theme?" element={<GameScreen />} />
        <Route path="/results" element={<ResultScreen />} />
      </Routes>
    </BrowserRouter>
  );
}