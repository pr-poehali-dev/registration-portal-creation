export const getStatusColor = (status: string) => {
  switch (status) {
    case 'completed': return 'bg-green-600';
    case 'competing': return 'bg-blue-600';
    case 'briefed': return 'bg-yellow-600';
    default: return 'bg-gray-400';
  }
};

export const getStatusText = (status: string) => {
  switch (status) {
    case 'completed': return 'Завершил';
    case 'competing': return 'На старте';
    case 'briefed': return 'Проинструктирован';
    default: return 'Зарегистрирован';
  }
};

export const categories = [
  'Мальчики 10-11 лет',
  'Девочки 10-11 лет',
  'Мальчики 12-13 лет',
  'Девочки 12-13 лет',
  'Юноши 14-15 лет',
  'Девушки 14-15 лет',
  'Юноши 16-17 лет',
  'Девушки 16-17 лет',
  'Юниоры 18-19 лет',
  'Юниорки 18-19 лет',
  'Мужчины',
  'Женщины'
];

export const disciplines = {
  'М': ['Бег 60м', 'Бег 100м', 'Бег 1000м', 'Бег 3000м', 'Подтягивание', 'Силовая гимнастика', 'Плавание 50м', 'Плавание 100м', 'Стрельба'],
  'Ж': ['Бег 60м', 'Бег 100м', 'Бег 500м', 'Бег 1000м', 'Силовая гимнастика', 'Плавание 50м', 'Плавание 100м', 'Стрельба']
};
