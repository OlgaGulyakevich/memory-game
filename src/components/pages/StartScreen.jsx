import React from 'react';
import { themes } from '../../data/themes';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from '../ui/LanguageSwitcher';
import Logo from '../ui/Logo';

function StartScreen({ onThemeSelect }) {
  const { t } = useTranslation();
  
  return (
    <main className="rules container" role="main" aria-label={t('startScreen.welcome')}>
      <header className="start-screen-header">
        <Logo />
        <LanguageSwitcher />
      </header>

      <h1>{t('startScreen.welcome')}</h1>
      <p>{t('startScreen.subtitle')}</p>
      
      <section className="rules-panel" aria-labelledby="rules-heading">
        <h2 id="rules-heading">{t('startScreen.rulesHeading')}</h2>
        <ul className="rules-list" role="list">
          <li>{t('startScreen.rule1')}</li>
          <li>{t('startScreen.rule2')}</li>
          <li>{t('startScreen.rule3')}</li>
        </ul>
      </section>

      <section className="themes-selection" aria-labelledby="themes-heading">
        <h3 id="themes-heading">{t('startScreen.themesHeading')}</h3>
        <nav 
          className="theme-buttons" 
          role="navigation" 
          aria-label={t('startScreen.themesAriaLabel')}
        >
          {Object.entries(themes).map(([key, theme]) => (
            <button
              key={key}
              onClick={() => onThemeSelect(key)}
              className={`ico-button ico-button-${key}`}
              aria-label={t('startScreen.themeAriaLabel', { 
                theme: t(`startScreen.themes.${key}`) 
              })}
              type="button"
            >
              {t(`startScreen.themes.${key}`)}
            </button>
          ))}
        </nav>
      </section>
    </main>
  );
}

export default StartScreen;