import { Body, Controller, Get, HttpCode, Param, Post, Sse, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { SignUpDto } from './auth.dto';
import { AuthService } from './auth.service';
import { AuthGuard } from 'src/guards/role.guard';
import { TokenGuard } from 'src/guards/token.duard';
import { interval, map, Observable } from 'rxjs';

export interface MessageEvent {
  data: string | object;
  id?: string;
  type?: string;
  retry?: number;
}

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  //@UseGuards(AuthGuard)
  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Post('signUp')
  async SignUp(@Body() dto: SignUpDto) {
    return this.authService.SignUp(dto)
  }

  @UseGuards(TokenGuard)
  @Post('refreshToken')
  async refreshToken(@Body() data) {
    return data
  }

  // @Sse('sse')
  // sse(): Observable<MessageEvent> {
  //   return interval(1000).pipe(map((_) => ({data: {hello: 'world'}})))
  // }
}
