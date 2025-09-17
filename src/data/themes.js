import { shuffleArray, generateCardId } from '../utils/helpers';
import { GAME_SETTINGS } from '../utils/settings';

export const themes = {
  'cats': {
    name: 'Котики',
    images: [
      {url:'/img/cats/cats-1.jpg', description: 'Рыжий котик спит подняв лапку'},
      {url:'/img/cats/cats-2.jpg', description: 'Бежевый котик с большими грустными глазами'},
      {url:'/img/cats/cats-3.jpg', description: 'Рыжий котик сидит на полу и спит'},
      {url:'/img/cats/cats-4.jpg', description: 'Полосатый котик с большими ушами'},
      {url:'/img/cats/cats-5.jpg', description: 'Серый котик закрыл глаза и лижит лапу'},
      {url:'/img/cats/cats-6.jpg', description: 'Двухцветный котик с большими глазами сидит в корзинке и смотрит в сторону'}
    ]
  },
  'cars': {
    name: 'Машины', 
    images: [
      {url:'/img/cars/cars-1.jpg', description: 'Салатовая двухдверная машина с черными колесами'},
      {url:'/img/cars/cars-2.jpg', description: 'Голубая двухдверная машина'},
      {url:'/img/cars/cars-3.jpg', description: 'Машина кэмпер'},
      {url:'/img/cars/cars-4.jpg', description: 'Синяя спортивная машина'},
      {url:'/img/cars/cars-5.jpg', description: 'Белая спортивная машина с черными колесами'},
      {url:'/img/cars/cars-6.jpg', description: 'Красная машина ауди едет по дороге'}
    ]
  },
  'flowers': {
    name: 'Цветочки',
    images: [
      {url:'/img/flowers/flowers-1.jpg', description: 'Розовый цветок тюльпан'},
      {url:'/img/flowers/flowers-2.jpg', description: 'Белый цветок роза'},
      {url:'/img/flowers/flowers-3.jpg', description: 'Нежно-голубой цветок'},
      {url:'/img/flowers/flowers-4.jpg', description: 'Желтые цветы лилии'},
      {url:'/img/flowers/flowers-5.jpg', description: 'Фиолетовые цветы'},
      {url:'/img/flowers/flowers-6.jpg', description: 'Голубой цветок'}
    ]
  }
};

export const getImages = (type) => {
  // Получаем базовый набор по типу
  const baseImages = themes[type]?.images || [];
  if (baseImages.length === 0) {
    return [];
  }

   // Создаем пары - дублируем каждое изображение с новым ID
   const pairs = [];
   baseImages.forEach((image, index) => {
     // Первая карточка пары
     pairs.push({ 
       id: generateCardId(type, index, 1), 
       url: image.url, 
       description: image.description 
     });
     // Вторая карточка пары
     pairs.push({ 
       id: generateCardId(type, index, 2), 
       url: image.url, 
       description: image.description 
     });
   });

  // Перемешиваем карточки если включена настройка
  if (GAME_SETTINGS.SHUFFLE_CARDS) {
    return shuffleArray(pairs);
  }

  return pairs;
};
