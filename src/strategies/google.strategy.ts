import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-google-oauth20';
import { PrismaService } from 'src/prisma.service';
import { GoogleProfile } from './google.types';
import { AuthService } from 'src/auth/auth.service';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy) {
  constructor(
    private conFigService: ConfigService,
    private prisma: PrismaService,
    private authService: AuthService
  ) {
    super({
      clientID: conFigService.get('GOOGLE_CLIENT_ID') || '',
      clientSecret: conFigService.get('GOOGLE_SECRET') || '',
      callbackURL: conFigService.get('GOOGLE_CALLBACK_URL'),
      scope: ['email', 'profile'],
    });
  }

  async validate(accessToken: string, refreshToken: string, profile: GoogleProfile, done: VerifyCallback) {
    const isExists = await this.prisma.user.findUnique({
      where: {email: profile.emails[0].value}
    })

    if(isExists) return isExists

    const google_user = await this.prisma.user.create({
      data: {
        email: profile.emails[0].value,
        name: profile.name.givenName,
        password: '',
        username: profile.name.givenName,
        profile: {
          create: {
            profile_additional_info: ''
          }
        }
      }
    })

    done(null, google_user)
  }
}
