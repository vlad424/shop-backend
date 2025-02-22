import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { SignUpDto } from './auth.dto';
import { hash } from 'argon2';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService, private jwt: JwtService) {}

  async SignUp(dto : SignUpDto) {
    const user = await this.prisma.user.findUnique({
      where: {
        email: dto.email
      }
    })
    const another_user = await this.prisma.user.findUnique({
      where: {
        username: dto.username
      },
      select: {
        username: true
      }
    })

    if(user) throw new BadRequestException('Пользователь уже существует')
    if(another_user?.username === dto.username) throw new BadRequestException('Такой username уже существует')

    const new_user = await this.prisma.user.create({
      data: {
        email: dto.email,
        name: dto.name,
        username: dto.username,
        password: await hash(dto.password),
        roleId: 1
      }
    })

    const tokens = await this.issueTokens(new_user.id)

    return {
      user: new_user,
      ...tokens
    }
  }

  private async issueTokens(userId: number) {
    const data = {id: userId}

    const accessToken = this.jwt.sign(data, {
      expiresIn: '1h',
    })
    const refreshToken = this.jwt.sign(data, {
      expiresIn: '29d',
    })

    return {accessToken, refreshToken}
  }
}