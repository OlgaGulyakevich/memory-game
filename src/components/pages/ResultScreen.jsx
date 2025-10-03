import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import Navigation from '../ui/Navigation';
import { themes } from '../../data/themes';
import { sortResults } from '../../utils/helpers';

function ResultScreen({ currentResult, allResults, onNewGame, selectedTheme }) {
  const { t, i18n } = useTranslation();
  
  // Функция для правильного склонения слова "шаг"
  const getStepsWord = (count) => {
    return t('resultScreen.steps', { 
      count, 
      word: t(`resultScreen.stepsWords.${getPlural(count, i18n.language)}`)
    });
  };

  // Вспомогательная функция для определения правильной формы множественного числа
  const getPlural = (count, language) => {
    if (language === 'ru') {
      const mod10 = count % 10;
      const mod100 = count % 100;
      if (mod100 >= 11 && mod100 <= 19) return 'many';
      if (mod10 === 1) return 'one';
      if (mod10 >= 2 && mod10 <= 4) return 'few';
      return 'many';
    }
    // Для английского и французского
    return count === 1 ? 'one' : 'many';
  };

  // Получаем отображаемое имя - переводим, если это ключ
  const getDisplayName = (result) => {
    if (result.nameKey) {
      return t(result.nameKey);  // Переводим ключ на текущий язык
    }
    return result.name || t('resultScreen.yourResult');  // Fallback для старых результатов
  };

  const combinedResults = useMemo(() => {
    const filteredByTheme = allResults.filter(result => result.theme === selectedTheme);
    const results = [...filteredByTheme];
    
    if (currentResult) {
      const alreadyExists = filteredByTheme.some(
        result => result.timestamp === currentResult.timestamp
      );
      if (!alreadyExists) {
        const currentResultWithTheme = {
          ...currentResult,
          theme: selectedTheme
        };
        results.push(currentResultWithTheme);
      }
    } 
    
    return sortResults(results);
  }, [allResults, currentResult, selectedTheme]);

  const themeName = t(`startScreen.themes.${selectedTheme}`);

  return (
    <main className="result container" role="main" aria-label={t('resultScreen.ariaLabel')}>
      <Navigation />
      
      <header className="result-header">
        <h1 id="result-heading" className="visually-hidden">
        {t('resultScreen.heading', { theme: themeName })}
        </h1>
        
        {currentResult && (
          <p role="status" aria-live="polite">
            {t('resultScreen.completedIn')} <strong>{getStepsWord(currentResult.stepsCount)}</strong>, {t('resultScreen.encouragement')}
          </p>
        )}
      </header>
  
      <section 
        className="result-table-section" 
        aria-label={t('resultScreen.tableHeading')} 
        aria-labelledby="result-table-heading"
      >
        <h2 id="results-heading" className="visually-hidden">
          {t('resultScreen.tableHeading')}
        </h2>

        {combinedResults.length > 0 ? (
          <table className="result-table" aria-label={t('resultScreen.tableHeading')} role="table">
            <thead>
              <tr className="result-table-row">
                <th scope="col">{t('resultScreen.tableHeaders.place')}</th>
                <th scope="col">{t('resultScreen.tableHeaders.name')}</th>
                <th scope="col">{t('resultScreen.tableHeaders.steps')}</th>
              </tr>
            </thead>
            <tbody>
              {combinedResults.map((result, index) => (
                <tr 
                  key={result.timestamp || `fallback-${index}`}
                  className={`result-table-row ${result.isCurrent ? 'active' : ''}`}
                >
                  <td>{index + 1}</td>
                  <td>{getDisplayName(result)}</td>
                  <td>{result.stepsCount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>{t('resultScreen.noResults')}</p>
        )}
      </section>

      <footer className="result-footer">
        <p>{t('resultScreen.tryAgain')}</p>
        
        <div className="result-buttons">
          <button 
            className="button result-button" 
            type="button"
            onClick={onNewGame}
          >
            {t('resultScreen.newGameButton')}
          </button>
        </div>
      </footer>
    </main>
  );
}

export default ResultScreen;
