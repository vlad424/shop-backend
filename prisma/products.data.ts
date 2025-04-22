interface ProductData {
  product_title: string;
  product_content: string;
  product_price: number;
  product_value: number;
  product_specification: string;
  product_category: string;
  diller_profileId: number;
  product_image: string[]
}

export const products_data: Array<ProductData> = [
  {
    diller_profileId: 1,
    product_title: 'Штаны',
    product_content: 'adasfowpofmwpmfwf',
    product_category: 'Одежда',
    product_price: 1500,
    product_specification: JSON.stringify({"Размер": "52", "Чтото": "52"}),
    product_value: 100,
    product_image: ['pants_1.JPG', 'pants_2.JPG', 'pants_3.JPG']
  },
  {
    diller_profileId: 1,
    product_title: 'Топ',
    product_content: 'adasfowpofmwpmfwf',
    product_category: 'Одежда',
    product_price: 4200,
    product_specification: JSON.stringify({
      "Размер": "52"
    }),
    product_value: 100,
    product_image: ['top_1.JPG', 'top_2.JPG', 'top_3.JPG']
  },
  {
    diller_profileId: 1,
    product_title: 'Футболка',
    product_content: 'adasfowpofmwpmfwf',
    product_category: 'Одежда',
    product_price: 4200,
    product_specification: JSON.stringify({
      "Размер": "52"
    }),
    product_value: 100,
    product_image: ['shirt_1.JPG', 'shirt_2.JPG', 'shirt_3.JPG']
  },
  {
    diller_profileId: 1,
    product_title: 'Рубашка',
    product_content: 'adasfowpofmwpmfwf',
    product_category: 'Одежда',
    product_price: 4200,
    product_specification: JSON.stringify({
      "Размер": "52"
    }),
    product_value: 100,
    product_image: ['t_shirt_1.JPG', 't_shirt_2.JPG', 't_shirt_3.JPG']
  },
];
