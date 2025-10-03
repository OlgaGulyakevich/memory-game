// Get PUBLIC_URL from environment or use empty string
const PUBLIC_URL = process.env.PUBLIC_URL || '';

/**
 * Function to get the correct path to assets
 * @param {string} path - path to asset
 * @returns {string} - path with PUBLIC_URL
 */
export const getAssetPath = (path) => {
  // Remove leading slash if it exists
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  
  // Return path with PUBLIC_URL
  return PUBLIC_URL ? `${PUBLIC_URL}/${cleanPath}` : `/${cleanPath}`;
};

/**
 * Function to get the base URL of the application
 * @returns {string} - base URL
 */
export const getBaseUrl = () => {
  return PUBLIC_URL || '';
};