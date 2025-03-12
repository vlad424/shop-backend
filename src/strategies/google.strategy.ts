import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { User } from '@prisma/client';
import { Strategy } from 'passport-google-oauth20';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy) {
  constructor(
    private conFigService: ConfigService,
    private prisma: PrismaService
  ) {
    super({
      clientID: conFigService.get('GOOGLE_CLIENT_ID') || '',
      clientSecret: conFigService.get('GOOGLE_SECRET') || '',
      callbackURL: 'http://localhost:5000/api/auth/redirect',
      scope: ['email', 'profile'],
    });
  }

  async validate(accessToken: string, refreshToken: string, profile: any) {
    console.log(accessToken, refreshToken, profile)
  }
}
