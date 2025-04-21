import { PrismaClient } from '@prisma/client';
import { hash } from 'argon2';

const prisma = new PrismaClient();

const main = async () => {
  console.log('---created-categories---');
  await categories();

  console.log('------create-users------');
  await users();

  
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
  console.table(roles)
  console.table(users)
};

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.log(e);
    await prisma.$disconnect();
    process.exit(1);
  });
