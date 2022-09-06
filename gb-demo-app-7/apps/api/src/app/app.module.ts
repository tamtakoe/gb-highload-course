import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { NewsModule } from './news/news.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { ChatService } from './chat/chat.servise';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '../web'),
    }),
    NewsModule,
  ],
  controllers: [AppController],
  providers: [AppService, ChatService],
})
export class AppModule {}
