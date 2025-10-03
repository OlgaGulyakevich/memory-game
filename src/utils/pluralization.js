/**
 * Pluralization utility for correct word forms in different languages
 * Supports Russian, English, and French plural rules
 */

/**
 * Determines the correct plural form based on count and language
 * @param {number} count - The number to determine plural form for
 * @param {string} language - Language code (ru, en, fr)
 * @returns {string} - Plural form key ('one', 'few', 'many')
 */
export const getPlural = (count, language) => {
  if (language === 'ru') {
    // Russian plural rules
    const mod10 = count % 10;
    const mod100 = count % 100;
    
    // 11-19: always 'many' (шагов, пар)
    if (mod100 >= 11 && mod100 <= 19) {
      return 'many';
    }
    
    // Ends with 1: 'one' (1 шаг, 21 шаг, 101 шаг)
    if (mod10 === 1) {
      return 'one';
    }
    
    // Ends with 2-4: 'few' (2 шага, 3 шага, 24 шага)
    if (mod10 >= 2 && mod10 <= 4) {
      return 'few';
    }
    
    // Everything else: 'many' (5 шагов, 11 шагов, 100 шагов)
    return 'many';
  }
  
  // English and French: simple plural
  // 1 = 'one' (1 step, 1 pair)
  // 2+ = 'many' (2 steps, 5 pairs)
  return count === 1 ? 'one' : 'many';
};

/**
 * Gets the pluralized translation key for use with i18next
 * @param {number} count - The number to determine plural form for
 * @param {string} language - Language code (ru, en, fr)
 * @param {string} baseKey - Base translation key (e.g., 'resultScreen.stepsWords')
 * @returns {string} - Full translation key with plural form
 * 
 * @example
 * getPluralKey(5, 'ru', 'resultScreen.stepsWords') 
 * // Returns: 'resultScreen.stepsWords.many'
 */
export const getPluralKey = (count, language, baseKey) => {
  const pluralForm = getPlural(count, language);
  return `${baseKey}.${pluralForm}`;
};

