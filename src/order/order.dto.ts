import { IsNotEmpty } from "class-validator";

export class createOrderDto {
  products: Array<orderItemDto>
}

export class orderItemDto {
  @IsNotEmpty({message: "Не найден productId"})
  productId: number

  @IsNotEmpty({message: "Укажите количество"})
  quantity: number
}