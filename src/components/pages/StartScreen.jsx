import React from 'react';
import { themes } from '../../data/themes';

function StartScreen({ onThemeSelect }) {
  return (
    <main className="rules container">
      <header>
        <h1>Добро пожаловать!</h1>
        <p>Memory — игра для тренировки визуальной памяти</p>
      </header>
      
      <section className="rules-panel" aria-labelledby="rules-heading">
        <h2 id="rules-heading">Правила игры</h2>
        <ol className="rules-list" role="list">
          <li>В наборе есть множество карточек – по две штуки с одним и тем же рисунком.</li>
          <li>Нужно разложить карточки «рубашкой» вверх на столе, а затем переворачивать по две.</li>
          <li>Если они совпадают – игрок забирает их и получает ещё один ход.</li>
        </ol>
      </section>
      
      <section className="themes-selection" aria-labelledby="themes-heading">
        <h3 id="themes-heading">Выберите тему карточек</h3>
        <nav className="theme-buttons" role="navigation" aria-label="Выбор темы игры">
          {Object.entries(themes).map(([key, theme]) => (
            <button
              key={key}
              onClick={() => onThemeSelect(key)}
              className={`ico-button ico-button-${key}`}
              aria-label={`Играть с темой: ${theme.name}`}
              type="button"
            >
              {theme.name}
            </button>
          ))}
        </nav>
      </section>
    </main>
  );
}

export default StartScreen;
