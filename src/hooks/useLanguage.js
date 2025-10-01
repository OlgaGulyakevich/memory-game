import { useTranslation } from 'react-i18next';

export const useLanguage = () => {
  const { i18n } = useTranslation();
  
  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang);
    localStorage.setItem('memoryGameLang', lang);
  };
  
  return {
    currentLang: i18n.language,
    changeLanguage,
    languages: ['ru', 'en', 'fr']
  };
};