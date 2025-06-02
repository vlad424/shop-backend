interface ProductData {
  product_title: string;
  product_content: string;
  product_price: number;
  product_value: number;
  product_specification: string;
  product_category: string;
  diller_profileId: number;
  product_image: string[];
}

export const modules = [];

export const products_data: Array<ProductData> = [
  {
    diller_profileId: 1,
    product_title: 'Штаны',
    product_content:
      'Эти стильные и удобные штаны станут незаменимой частью вашего гардероба. Изготовленные из высококачественного хлопка с добавлением эластана, они обеспечивают оптимальную посадку и свободу движений.',
    product_category: 'Одежда',
    product_price: 1500,
    product_specification: JSON.stringify({ 
      Размер: '52',
      Цвет: 'Черный',
      Материал: 'Хлопок',
      Страна: 'Китай'
    }),
    product_value: 100,
    product_image: ['pants_1.JPG', 'pants_2.JPG', 'pants_3.JPG'],
  },
  {
    diller_profileId: 1,
    product_title: 'Топ',
    product_content:
      'Стильный и легкий топ, который станет идеальным дополнением вашего гардероба в теплое время года. Выполнен из мягкого и дышащего материала, обеспечивающего комфорт на протяжении всего дня.',
    product_category: 'Одежда',
    product_price: 4200,
    product_specification: JSON.stringify({
      Размер: '12',
      Цвет: 'Черный',
      Материал: 'Хлопок',
      Страна: 'Китай'
    }),
    product_value: 100,
    product_image: ['top_1.JPG', 'top_2.JPG', 'top_3.JPG', 'top3_zip.zip'],
  },
  {
    diller_profileId: 1,
    product_title: 'Футболка',
    product_content:
      'Удобная и стильная футболка из мягкого хлопка с добавлением эластана для оптимальной посадки и комфорта. Классический прямой крой и круглый вырез делают эту модель универсальной',
    product_category: 'Одежда',
    product_price: 4200,
    product_specification: JSON.stringify({
      Размер: '32',
      Цвет: 'Черный',
      Материал: 'Хлопок',
      Страна: 'Индия'
    }),
    product_value: 100,
    product_image: ['shirt_1.JPG', 'shirt_2.JPG', 'shirt_3.JPG'],
  },
  {
    diller_profileId: 1,
    product_title: 'Рубашка',
    product_content:
      'Элегантная рубашка из качественного хлопка с тонкой текстурой, которая обеспечивает комфорт и хорошую воздухопроницаемость в течение всего дня.',
    product_category: 'Одежда',
    product_price: 4200,
    product_specification: JSON.stringify({
      Размер: '45',
      Цвет: 'Черный',
      Материал: 'Хлопок',
      Страна: 'Китай',
      Стиль: "Стиль"
    }),
    product_value: 100,
    product_image: ['t_shirt_1.JPG', 't_shirt_2.JPG', 't_shirt_3.JPG'],
  },
  {
    diller_profileId: 1,
    product_title: 'Рубашка',
    product_content: 'Замечательная, просторная, удобная, легкая, простая',
    product_category: 'Одежда',
    product_price: 2200,
    product_specification: JSON.stringify({
      Размер: '52',
      Охват: '82',
      Материал: 'Хлопок',
      'Страна производитель': 'Франция',
    }),
    product_value: 100,
    product_image: ['shirt_a_1.JPG', 'shirt_a_2.JPG'],
  },
  {
    diller_profileId: 1,
    product_title: 'Устройство',
    product_content: 'Замечательная, просторная, удобная, легкая, простая',
    product_category: 'Электроника',
    product_price: 2200,
    product_specification: JSON.stringify({
      Размер: '52',
      Материал: 'Сталь',
      'Страна производитель': 'Китай',
    }),
    product_value: 100,
    product_image: ['pod_1.JPG', 'pod_2.JPG'],
  },
  {
    diller_profileId: 3,
    product_title: 'Iphone X',
    product_content: 'Замечательная, просторная, удобная, легкая, простая',
    product_category: 'Электроника',
    product_price: 17900,
    product_specification: JSON.stringify({
      Цвет: 'Серебристый',
      Ёмкость: '256 ГБ',
      Длина: '143,6 мм',
      Ширина: '70,9 мм',
      Толщина: '7,7 мм',
      Вес: '174 г',
      Процессор: 'A11 Bionic',
    }),
    product_value: 100,
    product_image: ['iphone_x.png', 'iphone_x.zip'],
  },
  {
    diller_profileId: 3,
    product_title: 'Iphone 12 PRO',
    product_content:
      'Смартфон Apple iPhone 12 Pro серебристого цвета характеризуется высокой производительностью и удобством. Модель оптимальна для общения в мессенджерах, просмотра страниц, разговоров, игр или создания фотографий в высоком качестве. OLED-экран обеспечивает передачу ярких и насыщенных оттенков. За высокую производительность отвечает 6-ядерный процессор A14 Bionic с тактовой частотой 3.1 ГГц.',
    product_category: 'Электроника',
    product_price: 57199,
    product_specification: JSON.stringify({
      Цвет: 'Серебристый',
      Ёмкость: '128 ГБ',
      Длина: '143,6 мм',
      Ширина: '71.5 мм',
      Толщина: '7.4 мм',
      Вес: '187 г',
      Процессор: 'A14 Bionic',
      'Разрешение экрана': '2532x1170',
    }),
    product_value: 100,
    product_image: ['iphone_12_pro_1.webp', 'iphone_12_pro.zip'],
  },
  {
    diller_profileId: 3,
    product_title: 'Iphone 12 PRO',
    product_content:
      'Смартфон Apple iPhone 13 Pro серебристого цвета характеризуется высокой производительностью и удобством. Модель оптимальна для общения в мессенджерах, просмотра страниц, разговоров, игр или создания фотографий в высоком качестве. OLED-экран обеспечивает передачу ярких и насыщенных оттенков. За высокую производительность отвечает 6-ядерный процессор A14 Bionic с тактовой частотой 3.1 ГГц.',
    product_category: 'Электроника',
    product_price: 57199,
    product_specification: JSON.stringify({
      Цвет: 'Серебристый',
      Ёмкость: '128 ГБ',
      Длина: '143,6 мм',
      Ширина: '71.5 мм',
      Толщина: '7.4 мм',
      Вес: '187 г',
      Процессор: 'A14 Bionic',
      'Разрешение экрана': '2532x1170',
    }),
    product_value: 100,
    product_image: ['iphone_13_pro_1.jpg', 'iphone_13_pro.jpg', 'iphone_13_pro.zip'],
  },
  {
    diller_profileId: 3,
    product_title: 'Ноутбук Asus',
    product_content:
      'Для повседневных задач, комфортной работы или захватывающих развлечений ноутбук ASUS Laptop E410 — оптимальное решение. В модели превосходно сочетаются компактность, стиль и производительность. Аппаратная конфигурация основана на производительном процессоре Intel.',
    product_category: 'Электроника',
    product_price: 31990,
    product_specification: JSON.stringify({
      Цвет: 'Черный',
      Ёмкость: '128 ГБ',
      Диоганаль: '14',
      Вес: '789 г',
      Процессор: 'Intel UHD Graphics',
      'Разрешение экрана': '2532x1170',
    }),
    product_value: 1,
    product_image: ['asus_1.jpg', 'asus_2.jpg', 'asus_notebook.zip'],
  },
  {
    diller_profileId: 3,
    product_title: 'MSI Geforce GTX 750 Ti',
    product_content:
      'Видеокарта MSI GeForce GTX 750 Ti позволяет осуществить лёгкий «тюнинг» компьютера для усовершенствования графики.',
    product_category: 'Электроника',
    product_price: 31990,
    product_specification: JSON.stringify({
      'Тип памяти': 'GDDR5',
      'Максимальное разрешение': '4096x2160',
      'Тип охлаждения ': 'Активное воздушное',
      Вес: '789 г',
      'Графический процессор': 'GeForce GTX 750 Ti'
    }),
    product_value: 1,
    product_image: ['gtx_1.webp', 'gtx_2.webps', 'gtx_750_ti.zip'],
  },
];
