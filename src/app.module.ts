import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

// Decorator는 클래스에 함수 기능을 추가할 수 있다.
// 클래스 위의 함수이고, 클래스를 위해 움직인다.
// 데코레이터는 꾸며주는 함수나 클래스랑 붙어있어야 한다.
@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
// AppModule은 루트 모듈과 같다.
// 모듈이란 어플리케이션의 일부
