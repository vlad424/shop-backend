import {
  Body,
  Controller,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
  Req,
  Res,
  Sse,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import {
  SignInDto,
  SignUpDto,
  SwitchToDillerDto,
  UpdateProfileDto,
  userId,
} from './auth.dto';
import { AuthService } from './auth.service';
import { TokenGuard } from 'src/guards/token.duard';
import { GoogleAuthGuard } from 'src/guards/google.guard';
import { FilesInterceptor } from '@nestjs/platform-express';

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
    return this.authService.SignUp(dto);
  }

  @UsePipes(new ValidationPipe())
  @Post('signIn')
  @HttpCode(200)
  async SignIn(@Body() dto: SignInDto) {
    return this.authService.SignIn(dto);
  }

  @UseGuards(TokenGuard)
  @Post('refreshToken')
  @HttpCode(200)
  async refreshToken(@Body() data) {
    return data;
  }

  @UseGuards(GoogleAuthGuard)
  @Get('google/login')
  async googleLogin() {}

  @UseGuards(GoogleAuthGuard)
  @Get('google/callback')
  async googleRedirect(@Req() req, @Res() res) {
    const response = await this.authService.issueTokens(req.user.id);

    res.redirect(
      //`http://localhost:5173/main?accessToken=${response.accessToken}&refreshToken=${response.refreshToken}&id=${req.user.id}`,
      `https://shop-frontend-henna.vercel.app/main?accessToken=${response.accessToken}&refreshToken=${response.refreshToken}&id=${req.user.id}`
    );
  }

  @UseGuards(TokenGuard)
  @HttpCode(200)
  @Get('profile/:id')
  async getProfile(@Req() req, @Param() param: {id: string}) {
    return this.authService.getUserById(req.user.id, param.id);
  }

  @UsePipes(new ValidationPipe())
  @UseGuards(TokenGuard)
  @HttpCode(201)
  @Patch('profile')
  async switchToDiller(@Req() req, @Body() data: SwitchToDillerDto) {
    const dto = {
      id: req.user.id,
      ...data,
    };

    return this.authService.switchToDiller(dto);
  }

  @UsePipes(new ValidationPipe())
  @UseGuards(TokenGuard)
  @HttpCode(201)
  @Patch('profile/update')
  @UseInterceptors(FilesInterceptor('avatar'))
  async updateProfile(
    @UploadedFiles() avatar: Array<Express.Multer.File>,
    @Req() req,
    @Body() body: UpdateProfileDto,
  ) {
    const dto: UpdateProfileDto & userId & {avatar: Array<Express.Multer.File>} = {
      id: req.user.id,
      profile_additional_info: body.profile_additional_info,
      avatar,
    };
    return this.authService.updateProfile(dto)
  }
}
