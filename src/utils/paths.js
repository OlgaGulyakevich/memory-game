// Получаем PUBLIC_URL из окружения или используем пустую строку
const PUBLIC_URL = process.env.PUBLIC_URL || '';

/**
 * Функция для получения правильного пути к ассетам
 * @param {string} path - путь к ресурсу
 * @returns {string} - путь с учетом PUBLIC_URL
 */
export const getAssetPath = (path) => {
  // Убираем начальный слеш если есть
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  
  // Возвращаем путь с PUBLIC_URL
  return PUBLIC_URL ? `${PUBLIC_URL}/${cleanPath}` : `/${cleanPath}`;
};

/**
 * Функция для получения базового URL приложения
 * @returns {string} - базовый URL
 */
export const getBaseUrl = () => {
  return PUBLIC_URL || '';
};