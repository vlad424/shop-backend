import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { PrismaService } from 'src/prisma.service';
import { ExtractJwt, Strategy } from 'passport-jwt'
import { User } from '@prisma/client';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private conFigService: ConfigService,
    private prisma: PrismaService,
  ) {
    super({
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        ignoreExpiration: true,
        secretOrKey: conFigService.get('SECRET_KEY')
    });
  }
  async validate({ id }: Pick<User, 'id'>) {
    return this.prisma.user.findUnique({
        where: {id: +id}
    })
  }
}