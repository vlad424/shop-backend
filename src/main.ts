import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';

async function bootstrap() {
  const PORT = process.env.PORT || 5000
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.useStaticAssets(join(__dirname, '..', 'public/files'), {
    setHeaders: (res, path, stat) => { res.set('Access-Control-Allow-Origin', '*'); }
  })

  app.setGlobalPrefix('api')
  app.enableCors()

  await app.listen(5000, () => console.log(`server starts on ${PORT} port`))
}
bootstrap();
