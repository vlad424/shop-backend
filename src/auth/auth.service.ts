import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}

  async getUsers(id: number) {
    const user = await this.prisma.uSER.findUnique({
      where: {id: +id}
    })

    return user
  }
}
