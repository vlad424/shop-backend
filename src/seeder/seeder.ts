import { PrismaClient, Product } from '@prisma/client';
import { hash } from 'argon2';
import { products_data } from './products.data';

// npx prisma db push --force-reset 
// npx prisma db push
// npm run seeder

const prisma = new PrismaClient();

const main = async () => {
  console.log('---created-categories---');
  await categories();

  console.log('------create-users------');
  await users();

  console.log('----create-products-----')
  await products()
  
  console.log('------------------------');
};

const categories = async () => {
  const categories = await prisma.category.createManyAndReturn({
    data: [
      { category_title: 'Одежда' },
      { category_title: 'Электроника' },
      { category_title: 'Игрушки' },
      { category_title: 'Книги' },
      { category_title: 'Мебель' },
    ],
  });

  console.table(categories);
};

const users = async () => {
  const roles = await prisma.role.createManyAndReturn({
    data: [{ role_name: 'user' }, { role_name: 'diller' }],
  });

  const users = await prisma.user.createManyAndReturn({
    data: [
      {
        email: 'diller@gmail.com',
        name: 'Тестовый продавец',
        password: await hash('12345678'),
        username: 'diller',
        roleId: 2,
      },
      {
        email: 'newcamer@gmail.com',
        name: 'Тестовый покупатель',
        password: await hash('12345678'),
        username: 'newcamer',
        roleId: 1,
      },
    ],
    omit: {password: true}
  });

  const profiles = await prisma.profile.createManyAndReturn({
    data: [
      {
        userId: 1,
        address: 'г. Москва',
        profie_diller_name: 'clothes_shop',
        profile_additional_info: 'Не знаю что писать в этих 30 словах, но думаю порог пройден',
        TIN: '123456789'
      },
      {
        userId: 2,
        profile_additional_info: 'Не знаю что писать в этих 30 словах, но думаю порог пройден, user',
      },
    ],
    omit: {profile_additional_info: true}
  })

  console.table(roles)
  console.table(users)
  console.table(profiles)
};

const products = async () => {
  let created_products: Array<Product> = []
  
  for(let i = 0; i < products_data.length; i++) {
    const category = await prisma.category.findFirst({
      where: {category_title: products_data[i].product_category},
      select: {category_id: true}
    })

    created_products.push(await prisma.product.create({
      data: {
        product_content: products_data[i].product_content,
        diller_profileId: products_data[i].diller_profileId,
        product_price: products_data[i].product_price,
        product_specification: products_data[i].product_specification,
        product_title: products_data[i].product_title,
        product_value: products_data[i].product_value,
        product_image: products_data[i].product_image,
        product_categoryId: category?.category_id,
        init_value: products_data[i].product_value
      }
    }))
  }

  console.table(created_products)
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.log(e);
    await prisma.$disconnect();
    process.exit(1);
  });
