import { IsEmail, IsNotEmpty, MinLength } from "class-validator"

export class SignInDto {
  @MinLength(4, {message: "username должен быть больше 4 символов"})
  username: string

  @IsNotEmpty({message: "Имя не может быть пустым"})
  name: string

  // @IsEmail({}, {message: 'Почта должна быть действительной'})
  // @Optional()
  // email: string

  @MinLength(6, {
    message: 'Пароль должен быть больше 6 символов'
  })
  password: string
}

export class SignUpDto {
  @MinLength(4, {message: "username должен быть больше 4 символов"})
  username: string

  @IsNotEmpty({message: "Имя не может быть пустым"})
  name: string
  
  @IsEmail({}, {
    message: 'Почта должна быть действительной'
  })
  email: string

  @MinLength(6, {
    message: 'Пароль должен быть больше 6 символов'
  })
  password: string
}

export class SwitchToDillerDto {
  @IsNotEmpty({message: "Заполните поле ИНН"})
  @MinLength(20, {message: "Не менее 20 символов"})
  TIN: string

  @IsNotEmpty({message: "Адрес не может быть пустым"})
  address: string

  id: number
}