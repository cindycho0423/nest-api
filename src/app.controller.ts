import { Controller, Get } from '@nestjs/common';

@Controller('')
export class AppController {
  @Get()
  home() {
    return '축 조현지 취업 야호 도커~';
  }
}
