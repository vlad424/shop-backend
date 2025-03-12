import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { User } from '@prisma/client';
import { Strategy } from 'passport-google-oauth20';
import { PrismaService } from 'src/prisma.service';
import { GoogleProfile } from './google.types';

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

  async validate(accessToken: string, refreshToken: string, profile: GoogleProfile) {
    const googleUser = await this.prisma.user.create({
      data: {
        email: profile.emails[0].value,
        name: profile.name.givenName,
        password: '',
        username: profile.name.givenName
      }
    })

    console.log(googleUser)
  }
}
