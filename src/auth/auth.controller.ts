import { Body, Controller, Get, HttpCode, Param, Patch, Post, Req, Res, Sse, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { SignInDto, SignUpDto, SwitchToDillerDto } from './auth.dto';
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
  @HttpCode(201)
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
  @Get('google/callback')
  async googleRedirect(@Req() req, @Res() res) {
    const response = await this.authService.issueTokens(req.user.id)

    res.redirect(`http://localhost:5173/main?accessToken=${response.accessToken}&refreshToken=${response.refreshToken}&id=${req.user.id}`)
  }

  @UseGuards(TokenGuard)
  @HttpCode(200)
  @Get('profile') 
  async getProfile(@Req() req) {
    return this.authService.getUserById(req.user.id)
  }

  @UsePipes(new ValidationPipe())
  @UseGuards(TokenGuard)
  @HttpCode(201)
  @Patch('profile')
  async switchToDiller(@Req() req, @Body() data: SwitchToDillerDto) {
    const dto = {
      id: req.user.id, 
      ...data
    }

    return this.authService.switchToDiller(dto)
  }
}
