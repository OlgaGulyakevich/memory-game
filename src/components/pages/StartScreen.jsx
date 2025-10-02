import React from 'react';
import { themes } from '../../data/themes';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from '../ui/LanguageSwitcher';
import Logo from '../ui/Logo';

function StartScreen({ onThemeSelect }) {
  const { t } = useTranslation();
  
  return (
    <main className="rules container" aria-label={t('startScreen.welcome')}>

      <div className="screen-navigation">
        <Logo />
        <LanguageSwitcher />
      </div>

      <header className="start-screen-intro">
      <h1>{t('startScreen.welcome')}</h1>
      <p>{t('startScreen.subtitle')}</p>
      </header>

      
      <section className="rules-panel" aria-labelledby="rules-heading">
        <h2 className="rules-heading" id="rules-heading">{t('startScreen.rulesHeading')}</h2>
        <ol className="rules-list">
          <li>{t('startScreen.rule1')}</li>
          <li>{t('startScreen.rule2')}</li>
          <li>{t('startScreen.rule3')}</li>
        </ol>
      </section>

      <section className="themes-selection" aria-labelledby="themes-heading">
        <h2 className="themes-heading" id="themes-heading">{t('startScreen.themesHeading')}</h2>
        <nav 
          className="theme-buttons" 
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