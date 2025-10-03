import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import i18n from '../../utils/i18n';
import '../../styles/style.css';


const LANGUAGES = [
  { code: 'ru', label: 'RU' },
  { code: 'en', label: 'EN' },
  { code: 'fr', label: 'FR' }
];

const LanguageSwitcher = React.memo(() => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const buttonRef = useRef(null);
  const [focusedIndex, setFocusedIndex] = useState(-1);

  const currentLanguage = i18n.language || 'en';

  // Close dropdown when clicking outside the component
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current && 
        !dropdownRef.current.contains(event.target) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target)
      ) {
        setIsOpen(false);
        setFocusedIndex(-1);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('touchstart', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, [isOpen]);

  // Handler for selecting the language
  const handleSelectLanguage = useCallback((langCode) => {
    i18n.changeLanguage(langCode);
    localStorage.setItem('memoryGameLang', langCode);
    setIsOpen(false);
    setFocusedIndex(-1);
    
    // Return focus to the button after selection
    if (buttonRef.current) {
      buttonRef.current.focus();
    }
  }, []);

  // Toggle opening/closing dropdown
  const handleToggle = useCallback(() => {
    setIsOpen(prev => !prev);
    setFocusedIndex(-1);
  }, []);

  // Keyboard navigation
  const handleKeyDown = useCallback((event) => {
    if (!isOpen) {
      // Open menu by Enter, Space, ArrowDown, ArrowUp
      if (['Enter', ' ', 'ArrowDown', 'ArrowUp'].includes(event.key)) {
        event.preventDefault();
        setIsOpen(true);
        setFocusedIndex(0);
      }
      return;
    }

    switch (event.key) {
      case 'Escape':
        event.preventDefault();
        setIsOpen(false);
        setFocusedIndex(-1);
        if (buttonRef.current) {
          buttonRef.current.focus();
        }
        break;

      case 'ArrowDown':
        event.preventDefault();
        setFocusedIndex(prev => 
          prev < LANGUAGES.length - 1 ? prev + 1 : 0
        );
        break;

      case 'ArrowUp':
        event.preventDefault();
        setFocusedIndex(prev => 
          prev > 0 ? prev - 1 : LANGUAGES.length - 1
        );
        break;

      case 'Enter':
      case ' ':
        event.preventDefault();
        if (focusedIndex >= 0) {
          handleSelectLanguage(LANGUAGES[focusedIndex].code);
        }
        break;

      case 'Tab':
        // Close menu by Tab
        setIsOpen(false);
        setFocusedIndex(-1);
        break;

      default:
        break;
    }
  }, [isOpen, focusedIndex, handleSelectLanguage]);

  // Handler for clicking on the menu item
  const handleMenuItemClick = useCallback((langCode) => {
    handleSelectLanguage(langCode);
  }, [handleSelectLanguage]);

  // Handler for hover to synchronize with keyboard navigation
  const handleMenuItemMouseEnter = useCallback((index) => {
    setFocusedIndex(index);
  }, []);

  return (
    <div className="language-switcher">
      <button
        ref={buttonRef}
        className="language-button"
        type="button"
        onClick={handleToggle}
        onKeyDown={handleKeyDown}
        aria-label={t('languageSwitcher.ariaLabel')}
        aria-haspopup="menu"
        aria-expanded={isOpen}
        aria-controls="language-menu"
      >
        <span className="language-code">{currentLanguage.toUpperCase()}</span>
      </button>

      {isOpen && (
        <ul
          ref={dropdownRef}
          id="language-menu"
          className="language-dropdown"
          role="menu"
          aria-labelledby="language-button"
        >
          {LANGUAGES.map((lang, index) => {
            const isActive = lang.code === currentLanguage;
            const isFocused = index === focusedIndex;

            return (
              <li
                key={lang.code}
                role="menuitemradio"
                aria-checked={isActive}
                tabIndex={isFocused ? 0 : -1}
                className={`language-item ${isActive ? 'active' : ''} ${isFocused ? 'focused' : ''}`}
                onClick={() => handleMenuItemClick(lang.code)}
                onMouseEnter={() => handleMenuItemMouseEnter(index)}
                onKeyDown={handleKeyDown}
              >
                <span className="language-label">{lang.label}</span>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
});

LanguageSwitcher.displayName = 'LanguageSwitcher';

export default LanguageSwitcher;
