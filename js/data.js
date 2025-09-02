const themes = {
  'cats': {
    name: 'Котики',
    images: [
      'img/cats/cats-1.jpg',
      'img/cats/cats-2.jpg',
      'img/cats/cats-3.jpg',
      'img/cats/cats-4.jpg',
      'img/cats/cats-5.jpg',
      'img/cats/cats-6.jpg'
    ]
  },
  'cars': {
    name: 'Машины',
    images: [
      'img/cars/cars-1.jpg',
      'img/cars/cars-2.jpg',
      'img/cars/cars-3.jpg',
      'img/cars/cars-4.jpg',
      'img/cars/cars-5.jpg',
      'img/cars/cars-6.jpg'
    ]
  },
  'flowers': {
    name: 'Цветочки',
    images: [
      'img/flowers/flowers-1.jpg',
      'img/flowers/flowers-2.jpg',
      'img/flowers/flowers-3.jpg',
      'img/flowers/flowers-4.jpg',
      'img/flowers/flowers-5.jpg',
      'img/flowers/flowers-6.jpg'
    ]
  }
};

const results = [
  { name: 'Аня', stepsCount: 16 },
  { name: 'Вася', stepsCount: 12 },
  { name: 'Петя', stepsCount: 19 }
];

const getImages = (type) => {
  // Получаем базовый набор по типу
  const baseImages = themes[type]?.images || [];
  if (baseImages.length === 0) {
    return [];
  }

  // Создаем пары - дублируем каждое изображение с новым ID
  const pairs = [];
  baseImages.forEach((url, index) => {
    // Первая карточка пары
    pairs.push({ id: `${index}-1`, url, description: '' });
    // Вторая карточка пары
    pairs.push({ id: `${index}-2`, url, description: '' });
  });

  // Перемешиваем карточки если включена настройка
  if (GAME_SETTINGS.SHUFFLE_CARDS) {
    // Fisher-Yates shuffle algorithm
    for (let i = pairs.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [pairs[i], pairs[j]] = [pairs[j], pairs[i]];
    }
  }

  return pairs;
};
