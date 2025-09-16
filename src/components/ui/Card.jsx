import React from 'react';

function Card({item, isVisible, isFinished, onCardClick}) {
  const {id, url, description} = item;
  const className = `${isVisible ? 'card-show' : ''} ${isFinished ? 'card-finished' : ''}`;

  const handleClick = () => onCardClick(id);
  
  // Обработчик клавиатуры
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
      aria-label={isFinished ? 'Собранная пара' : 'Закрытая карточка, нажмите Enter для открытия'}
    >
      <img src={url} alt={description || 'Изображение карточки'} />
    </li>
  );
}

export default Card;