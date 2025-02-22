import { Injectable, CanActivate, ExecutionContext, BadRequestException, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();

    if(request.body.role !== 'admin') throw new UnauthorizedException('Страница не найдена')
    
    return request
  }
}