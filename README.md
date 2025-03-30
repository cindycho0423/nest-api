# Learning Nest

main -> module -> controller -> service

## service

NestJS는 컨트롤러를 비즈니스 로직과 구분 짓고 싶어하여 서비스는 일반적으로 실제 function을 가지는 부분이다.

```js
export class AppService {
  getHello(): string {
    return 'Hello Nest!';
  }

  getHi(): string {
    return 'Hi Nest!';
  }
}
```

## controller

컨트롤러가 하는 일은 기본적으로 url을 가져오고 함수를 실행하는 것이다. express의 라우터 같은 존재.

```js
 @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/hello') // 라우터
  getHi(): string {
    return this.appService.getHi();
  }
```

express의 get 라우터와 같은 역할을 한다.

## module

## main
