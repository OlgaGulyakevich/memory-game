import React, { useMemo } from 'react';
import { themes } from '../../data/themes';
import { getWordDeclension, sortResults } from '../../utils/helpers';

function ResultScreen({ currentResult, allResults, onNewGame, selectedTheme }) {
  // Фильтруем и сортируем по теме
  const combinedResults = useMemo(() => {
    const filteredByTheme = allResults.filter(result => result.theme === selectedTheme);
    const results = [...filteredByTheme];
    
    if (currentResult) {
      // Добавляем текущий результат (с темой)
      // Создаем копию вместо мутации
    const currentResultWithTheme = {
      ...currentResult,
      theme: selectedTheme
    };
    results.push(currentResultWithTheme);
    }
    return sortResults(results);
  }, [allResults, currentResult, selectedTheme]);

  return (
    <main className="result container" role="main" aria-label="Экран результатов">
      <header className="result-header">
      <h1 id="result-heading" className="visually-hidden">Лучшие результаты для темы "{themes[selectedTheme].name}":</h1>
      
      {currentResult && (
        <p role="status" aria-live="polite">
          Вы завершили игру за <strong>{currentResult.stepsCount} {getWordDeclension(currentResult.stepsCount, ['шаг', 'шага', 'шагов'])}</strong>, так держать!
        </p>
      )}
      </header>
  
      <section className="result-table-section" aria-label="Таблица результатов" aria-labelledby="result-table-heading">
        <h2 id="results-heading" className="visually-hidden">Таблица результатов</h2>

        {combinedResults.length > 0 ? (
        <table className="result-table" aria-label="Таблица лучших результатов" role="table">
          <thead>
            <tr className="result-table-row">
              <th scope="col">Место</th>
              <th scope="col">Имя</th>
              <th scope="col">Шаги</th>
            </tr>
          </thead>
          <tbody>
            {combinedResults.map((result, index) => (
              <tr 
                key={`${result.name}-${result.stepsCount}-${index}`}
                className={`result-table-row ${result.isCurrent ? 'active' : ''}`}
              >
                <td>{index + 1}</td>
                <td>{result.name}</td>
                <td>{result.stepsCount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>Пока нет результатов для этой темы. Сыграйте, чтобы установить рекорд!</p>
      )}
      </section>

      <footer className="result-footer">
        <p>Хотите попробовать ещё раз?</p>
        
        <div className="result-buttons">
          <button 
            className="button result-button" 
            type="button"
            onClick={onNewGame}
          >
            Новая игра
          </button>
        </div>
      </footer>
    </main>
  );
}

export default ResultScreen;