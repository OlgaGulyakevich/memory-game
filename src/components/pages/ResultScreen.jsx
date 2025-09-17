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
    <section className="result container">
      <h2>Лучшие результаты для темы "{themes[selectedTheme].name}":</h2>
      
      {currentResult && (
        <p>
          Вы завершили игру за <b>{currentResult.stepsCount} {getWordDeclension(currentResult.stepsCount, ['шаг', 'шага', 'шагов'])}</b>, так держать!
        </p>
      )}
      
      {combinedResults.length > 0 ? (
        <table className="result-table">
          <thead>
            <tr className="result-table-row">
              <th>Место</th>
              <th>Имя</th>
              <th>Шаги</th>
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
      
      <p>Хотите попробовать ещё раз?</p>
      
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '24px' }}>
        <button 
          className="button result-button" 
          type="button"
          onClick={onNewGame}
        >
          Новая игра
        </button>
      </div>
    </section>
  );
}

export default ResultScreen;