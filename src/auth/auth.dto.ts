import { IsEmail, IsNotEmpty, isNotEmpty, IsString, MinLength } from "class-validator"

export class signInDto {
  username: string
  name: string

  @IsEmail({}, {message: 'Почта должна быть действительной'})
  email: string

  @MinLength(6, {
    message: 'Пароль должен быть больше 6 символов'
  })
  password: string
}

export class SignUpDto {
  @IsString({message: "Укажите username"})
  username: string

  @IsString({message: "Укажите имя"})
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