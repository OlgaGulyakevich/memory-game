import React from 'react';
import { themes } from '../../data/themes';


  function StartScreen({ onThemeSelect }) {
    return (
      <section className="rules container">
        <h2>Добро пожаловать!</h2>
        <p>Memory — игра для тренировки визуальной памяти</p>
        <div className="rules-panel">
          <h3>Правила игры</h3>
          <ul className="rules-list">
            <li>В наборе есть множество карточек – по две штуки с одним и тем же рисунком.</li>
            <li>Нужно разложить карточки «рубашкой» вверх на столе, а затем переворачивать по две.</li>
            <li>Если они совпадают – игрок забирает их и получает ещё один ход.</li>
          </ul>
        </div>
    <div className="theme-buttons">
      {Object.keys(themes).map((themeKey) => (
        <button 
          key={themeKey}
          className={`ico-button ico-button-${themeKey}`}
          type="button"
          onClick={() => onThemeSelect(themeKey)}
          aria-label={`Выбрать тему ${themes[themeKey].name}`}
        >
          {themes[themeKey].name}
        </button>
      ))}
    </div>
      </section>
    );
  }

  export default StartScreen;
