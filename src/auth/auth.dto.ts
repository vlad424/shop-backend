import { IsEmail, IsNotEmpty, IsOptional, MinLength } from "class-validator"

export class SignInDto {
  @MinLength(4, {message: "username должен быть больше 4 символов"})
  username: string

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
  @MinLength(9, {message: "Неверный ИНН"})
  TIN: string

  @MinLength(20, {message: "Описание не менее 20 символов"})
  profile_additional_info: string

  @IsNotEmpty({message: "Адрес не может быть пустым"})
  address: string

  @MinLength(4, {message: 'Название не менее 4 символов'})
  profie_diller_name: string
}

export class userId {
  id: number
}

export class UpdateProfileDto {
  @IsOptional()
  profile_additional_info: string
}