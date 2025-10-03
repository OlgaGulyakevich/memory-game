import React from 'react';
import { useTranslation } from 'react-i18next';

const Card = React.memo(({ item, isVisible, isFinished, onCardClick }) => {
  const { t } = useTranslation();
  const { id, url, description } = item;
  const className = `${isVisible ? 'card-show' : ''} ${isFinished ? 'card-finished' : ''}`;

  const handleClick = () => onCardClick(id);
  
  const handleKeyDown = (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      onCardClick(id);
    }
  };

  return (
    <li 
      onClick={handleClick}
      onKeyDown={handleKeyDown} 
      className={`card ${className}`} 
      role="button" 
      tabIndex={isFinished ? -1 : 0} 
      aria-label={isFinished ? t('card.finished') : t('card.closed')}
    >
      <img 
        src={url} 
        alt={description || t('card.altText')} 
        loading="lazy"
        decoding="async"
      />
    </li>
  );
});

Card.displayName = 'Card';

export default Card;