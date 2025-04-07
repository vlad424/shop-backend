import { Module } from "@nestjs/common";
import { MulterModule } from "@nestjs/platform-express";
import { storage } from "src/config/multer.config";

@Module({
  imports: [
    MulterModule.register({
      dest: './public/files'
    })
  ]
})

export class FileModule {}