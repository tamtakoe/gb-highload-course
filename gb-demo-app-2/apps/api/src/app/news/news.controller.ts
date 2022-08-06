import { Body, Controller, Get, Header, Post } from '@nestjs/common';

import { IsNotEmpty } from 'class-validator';

const db = new Map();
let resCash = [];

export class CreateNewsDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  description: string;
}

@Controller('news')
export class NewsController {
  @Get()
  async getNews() {
    return new Promise(resolve => {
      if (!db.has('genNews')) {
      const news = Object.keys([...Array(20)])
        .map(key => Number(key) + 1)
        .map(n => ({
          id: n,
          title: `Важная новость ${n}`,
          description: (rand => ([...Array(rand(1000))].map(() => rand(10**16).toString(36).substring(rand(10))).join(' ')))(max => Math.ceil(Math.random() * max)),
          createdAt: Date.now()
        }))
        db.set('genNews', news);
        resCash = Array.from(db.values()).flat();
      }
 
      setTimeout(() => {
        resolve(resCash);
      }, 100)
    });
  }

  @Post()
  @Header('Cache-Control', 'none')
  create(@Body() peaceOfNews: CreateNewsDto) {
    return new Promise(resolve => {
      setTimeout(() => {
        console.log('Новость успешно создана', peaceOfNews);
        const item = { id: Math.ceil(Math.random() * 1000), ...peaceOfNews };
        db.set(item.id, item);
        resCash = Array.from(db.values()).flat();
        resolve(item);
      }, 100)
    });
  }
}
