import { Body, Controller, Get, Header, Post } from '@nestjs/common';

@Controller('news')
export class NewsController {
  @Get()
  async getNews() {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve({
          title: 'Важная новость',
          description: 'Текст...',
          createdAt: new Date()
        });
      }, 100)
    });
  }

  @Post()
  @Header('Cache-Control', 'none')
  create(@Body() peaceOfNews) {
    return new Promise(resolve => {
      setTimeout(() => {
        console.log('Новость успешно создана', peaceOfNews);
        resolve(peaceOfNews);
      }, 100)
    });
  }
}
