// Данные для игры Memory с тремя темами
const themes = {
  cats: [
    {
      id: 'cat-1',
      url: 'img/cats-1.jpg',
      description: 'Серый кот',
      theme: 'cats'
    },
    {
      id: 'cat-2', 
      url: 'img/cats-2.jpg',
      description: 'Рыжий кот',
      theme: 'cats'
    },
    {
      id: 'cat-3',
      url: 'img/cats-3.jpg', 
      description: 'Белый кот',
      theme: 'cats'
    },
    {
      id: 'cat-4',
      url: 'img/cats-4.jpg',
      description: 'Черный кот',
      theme: 'cats'
    },
    {
      id: 'cat-5',
      url: 'img/cats-5.jpg',
      description: 'Полосатый кот',
      theme: 'cats'
    },
    {
      id: 'cat-6',
      url: 'img/cats-6.jpg',
      description: 'Пушистый кот',
      theme: 'cats'
    }
  ],
  
  flowers: [
    {
      id: 'flower-1',
      url: 'img/flowers-1.jpg',
      description: 'Красная роза',
      theme: 'flowers'
    },
    {
      id: 'flower-2',
      url: 'img/flowers-2.jpg', 
      description: 'Белая лилия',
      theme: 'flowers'
    },
    {
      id: 'flower-3',
      url: 'img/flowers-3.jpg',
      description: 'Желтый тюльпан',
      theme: 'flowers'
    },
    {
      id: 'flower-4',
      url: 'img/flowers-4.jpg',
      description: 'Фиолетовая орхидея',
      theme: 'flowers'
    },
    {
      id: 'flower-5',
      url: 'img/flowers-5.jpg',
      description: 'Розовый пион',
      theme: 'flowers'
    },
    {
      id: 'flower-6',
      url: 'img/flowers-6.jpg',
      description: 'Синяя гортензия',
      theme: 'flowers'
    }
  ],
  
  cars: [
    {
      id: 'car-1',
      url: 'img/cars-1.jpg',
      description: 'Красная спортивная машина',
      theme: 'cars'
    },
    {
      id: 'car-2',
      url: 'img/cars-2.jpg',
      description: 'Синий внедорожник',
      theme: 'cars'
    },
    {
      id: 'car-3',
      url: 'img/cars-3.jpg',
      description: 'Желтое такси',
      theme: 'cars'
    },
    {
      id: 'car-4',
      url: 'img/cars-4.jpg',
      description: 'Белый седан',
      theme: 'cars'
    },
    {
      id: 'car-5',
      url: 'img/cars-5.jpg',
      description: 'Черный кабриолет',
      theme: 'cars'
    },
    {
      id: 'car-6',
      url: 'img/cars-6.jpg',
      description: 'Зеленый хэтчбек',
      theme: 'cars'
    }
  ]
};

// Функция генерации карточек для игры (каждое изображение дублируется)
function generateGameCards(theme) {
  const themeImages = themes[theme];
  if (!themeImages) {
    console.error(`Theme "${theme}" not found`);
    return [];
  }
  
  // Создаем пары - каждое изображение появляется дважды
  const pairs = [];
  themeImages.forEach(image => {
    // Первая карточка пары
    pairs.push({
      ...image,
      id: `${image.id}_1`,
      pairId: image.id
    });
    
    // Вторая карточка пары  
    pairs.push({
      ...image,
      id: `${image.id}_2`, 
      pairId: image.id
    });
  });
  
  // Перемешиваем карточки
  return shuffleArray(pairs);
}

// Функция перемешивания массива
function shuffleArray(array) {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

// Списки для отладки (используй ID из сгенерированных карточек)
const visibleItems = ['cat-1_1', 'cat-2_1']; 
const finishedItems = ['cat-1_1', 'cat-1_2', 'cat-3_1', 'cat-3_2'];

// Для быстрого тестирования - генерируем карточки котиков
const gameCards = generateGameCards('cats');