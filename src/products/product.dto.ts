import { Prisma } from "@prisma/client";
import { IsNotEmpty, MinLength } from "class-validator";

export class PublishProductDto {
  @IsNotEmpty({message: 'Название не может быть пустым'})
  product_title: string;

  @MinLength(20, {message: 'Напишите больше о вашем продукте'})
  product_content: string;

  @IsNotEmpty({message: 'Цена не может быть пустой'})
  product_price: number;

  @IsNotEmpty({message: 'Укажите сколько продуктов у вас имеется'})
  product_value: number;

  @IsNotEmpty({message: 'Укажите название категории'})
  categoryName: string

  @IsNotEmpty({})
  product_specification: Prisma.JsonArray
}
