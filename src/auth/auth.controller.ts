import { Body, Controller, Get, HttpCode, Param, Post, Req, Res, Sse, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { SignInDto, SignUpDto } from './auth.dto';
import { AuthService } from './auth.service';
import { TokenGuard } from 'src/guards/token.duard';
import { GoogleAuthGuard } from 'src/guards/google.guard';

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

  @UsePipes(new ValidationPipe())
  @Post('signIn') 
  @HttpCode(200)
  async SignIn(@Body() dto: SignInDto) {
    return this.authService.SignIn(dto)
  }

  @UseGuards(TokenGuard)
  @Post('refreshToken')
  @HttpCode(200)
  async refreshToken(@Body() data) {
    return data
  }

  @UseGuards(GoogleAuthGuard)
  @Get('google/login')
  async googleLogin() {}

  @UseGuards(GoogleAuthGuard)
  @Get('google/redirect')
  async googleRedirect(@Req() req, @Res() res) {
    const response = await this.authService.issueTokens(req.user.id)

    console.log(response)

    res.redirect(`http://localhost:5173?token=${response.accessToken}`)
  }
}
