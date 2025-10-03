import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const Logo = React.memo(() => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  
  const handleClick = () => {
    navigate('/start');
  };
  
  return (
    <button
      className="logo-button"
      onClick={handleClick}
      aria-label={t('navigation.returnHome')}
      type="button"
    >
      <span className="logo">Memory Game</span>
    </button>
  );
});

Logo.displayName = 'Logo';

export default Logo;
