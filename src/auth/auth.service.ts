import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { SignInDto, SignUpDto, SwitchToDillerDto, userId } from './auth.dto';
import { hash, verify } from 'argon2';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import { RolesTypes } from 'src/common_types/role.type';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
  ) {}

  async SignUp(dto: SignUpDto) {
    const user = await this.prisma.user.findUnique({
      where: {
        email: dto.email,
      },
    });
    const another_user = await this.prisma.user.findUnique({
      where: {
        username: dto.username,
      },
      select: {
        username: true,
      },
    });

    if (user) throw new ConflictException('Пользователь уже существует');
    if (another_user?.username === dto.username)
      throw new BadRequestException('Такой username уже существует');

    const new_user = await this.prisma.user.create({
      data: {
        email: dto.email,
        name: dto.name,
        username: dto.username,
        password: await hash(dto.password),
        roleId: 1,
        profile: {
          create: {
            profile_additional_info: '',
          },
        },
      },
      include: {
        profile: {
          omit: {
            userId: true,
            profile_id: true
          }
        }
      },
      omit: {
        password: true
      }
    });

    const tokens = await this.issueTokens(new_user.id);

    return {
      user: {
        ...new_user,
        roleId: RolesTypes[new_user.roleId]
      },
      ...tokens,
    };
  }

  async SignIn(dto: SignInDto) {
    const user = await this.prisma.user.findUnique({
      where: {
        username: dto.username,
      },
      include: {
        profile: {
          omit: {
            userId: true,
            profile_id: true
          }
        }
      }
    });

    if (!user) throw new NotFoundException('Такого пользователя не существует');

    const isValid = await verify(user.password, dto.password);

    if (!isValid) throw new UnauthorizedException('Неправильный пароль');

    const tokens = await this.issueTokens(user.id);

    return {
      user: {
        ...user,
        roleId: RolesTypes[user.roleId]
      },
      ...tokens,
    };
  }

  async googleAuth(userId: number) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) return;

    const tokens = this.issueTokens(userId);

    return {
      user: {
        ...user,
        roleId: RolesTypes[user.roleId]
      },
      ...tokens,
    };
  }

  async getUserById(userId: number) {
    const user = await this.prisma.user.findUnique({
      where: { id: +userId },
      include: {
        profile: {
          include: {
            Product: true
          },
          omit: {userId: true, profile_id: true}
        }
      },
      omit: {
        password: true,
      },
    });

    if (!user) throw new NotFoundException('Такого юзера не существует');

    return {
      user: {
        ...user,
        roleId: RolesTypes[user.roleId]
      },
    };
  }

  async switchToDiller(data: SwitchToDillerDto & {id: number}) {
    const user = await this.prisma.user.update({
      where: {id: +data.id},
      data: {
        roleId: 2
      }
    })

    const profile = await this.prisma.profile.update({
      where: {userId: +data.id},
      data: {
        address: data.address,
        TIN: data.TIN,
        profile_additional_info: data.profile_additional_info,
        profie_diller_name: data.profie_diller_name
      },
      omit: { userId: true }
    })

    return {
      user: this.returnUserFields(user),
      profile: profile
    }
  }

  async issueTokens(userId: number) {
    const data = { id: userId };

    const accessToken = this.jwt.sign(data, {
      expiresIn: '1h',
    });
    const refreshToken = this.jwt.sign(data, {
      expiresIn: '29d',
    });

    return { accessToken, refreshToken };
  }
  private returnUserFields(user: User) {
    return {
      id: user.id,
      email: user.email,
      name: user.name,
      username: user.username,
      role: RolesTypes[user.roleId],
    };
  }
}
