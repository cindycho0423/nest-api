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

AppModule은 루트 모듈과 같다. (모듈이란 어플리케이션의 일부)

## main

main에서 시작한다. 하나의 모듈에서 어플리케이션을 생성한다.

## 명령어 사용

nest g (설치하고자 하는 파일명)

## DTO (Data Transfer Object)

DTO로 객체의 타입을 정의할 수 있다. 주로 애플리케이션 계층 간, 예를 들어 클라이언트와 서버 간 데이터 전달에 사용된다.

## ValidationPipe

내장 ValidationPipe 사용을 위해서는 class-validator, class-transformer 를 설치해야 한다.
`npm i --save class-validator class-transformer`

ValidationPipe는 클래스 기반 유효성 검사를 도와주는 기능이다.
데코레이터를 사용해 데이터 유효성 검사 규칙을 쉽게 설정할 수 있다.클라이언트가 보낸 데이터를 자동으로 검사하고, 문제가 있으면 요청을 차단한다.

```js
app.useGlobalPipes(
  new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
  }),
);
```

### whitelist

true로 설정하면 class-validator 데코레이터가 없는 속성들은 자동으로 제거된다.
즉, 유효성 검사를 적용한 속성만 남고, 나머지는 요청에서 제외된다.

### forbidNonWhitelisted

화이트리스트에 없는 속성이 포함되면 제거하는 대신 오류를 발생시킨다.

forbidNonWhitelisted 옵션은 whitelist에서 유효한 속성이 아닌 것을 제외하는 것 대신에 에러를 날려주는 것이기 때문에, 먼저 whitelist 옵션이 true로 되어있어야 사용 가능한 옵션이다.

### transform (자동 형변환)

클라이언트에서 받은 데이터를 DTO 클래스에 맞게 자동으로 형 변환한다.
이 기능을 전역적으로 적용하려면 전역 파이프에서 설정하면 된다.

## Mapped types

`npm i @nestjs/mapped-types`

### Partial

NestJS에서는 create와 update 같은 입력을 처리할 때, 같은 데이터 구조를 재사용하고 싶을 때가 많다. 예를 들어, create에서는 모든 필드가 필수일 수 있지만, update에서는 일부 필드만 선택 사항으로 만들고 싶을 때가 있다.

이럴 때 PartialType() 유틸리티 함수가 유용하다. 이 함수는 주어진 클래스에서 모든 속성을 선택 사항으로 만든 새 클래스를 생성해준다.

```ts
import { PartialType } from '@nestjs/mapped-types';

class CreateUserDTO {
  name: string;
  age: number;
}

class UpdateUserDTO extends PartialType(CreateUserDTO) {
  // name과 age가 모두 선택 사항으로 변환된다.
}
```

이렇게 하면 UpdateUserDTO는 CreateUserDTO의 모든 속성을 선택 사항으로 바꿔주기 때문에, 코드 중복을 줄이고 더 효율적으로 작성할 수 있다.

## NestJS와 ExpressJS

기본적으로 Nest는 Express 프레임워크를 사용한다.

만약 express에서 쓰던 req, res를 쓰고 싶다면

```ts
  @Get()
  getAll(@Req() req, @Res() res): Movie[] {
    return this.moviesService.getAll();
  }
```

이렇게 사용할 수 있다.

하지만 이 방법은 좋은 방법이 아니다. NestJS는 Express와 Fastify 두 개의 프레임워크 위에서 돌아가기 때문에 req, res를 사용하지 않는 것이 좋다. NestJS 방법으로만 사용하면 Express에서 Fastify로 바로 전환할 수 있고, 작동하는게 멈추지도 않는다.

- Fastify는 Express와 유사한 방식으로 설계 문제를 해결하기 때문에 Nest에 대한 좋은 대안 프레임워크를 제공합니다. fastify는 Express보다 훨씬 빠르며 거의 2배 더 나은 벤치마크 결과를 달성합니다.

## Test-jest

### it()

테스트 클로저를 생성합니다.
it()대신 test()도 사용 가능

### expect()

값을 테스트할 때마다 expect 함수가 사용됩니다. expect 하나만 콜하는 경우는 거의 없을 것입니다.

### toBe()

Object.is를 사용하여 정확한 동등성을 테스트합니다. 객체의 값을 확인하려면 대신 toEqual()을 사용하세요.

### String

toMatch를 사용하여 정규 표현식에 대해 문자열을 확인할 수 있습니다.
ex) expect('Christoph').toMatch(/stop/);

### Arrays and iterables

toContain()을 사용하여 배열 또는 이터러블에 특정 항목이 포함되어 있는지 확인할 수 있습니다.
ex) expect(shoppingList).toContain('milk');

### Exceptions

특정 함수가 호출될 때 오류가 발생하는지 테스트하려면 toThrow를 사용하십시오.
예외를 발생시키는 함수는 래핑 함수 내에서 호출해야 합니다. 그렇지 않으면 toThrow 어설션이 실패합니다.
ex) expect(() => compileAndroidCode()).toThrow('you are using the wrong JDK');

### beforeEach(fn, timeout)

각각의 테스트가 실행되기 전에 매번 함수를 실행합니다.
각각의 테스트 전에 각 테스트에서 사용할 전역 상태를 재설정하려는 경우에 유용합니다.
함수가 promise을 반환하거나 generator인 경우 Jest는 테스트를 실행하기 전에 해당 promise가 해결될 때까지 기다립니다.
밀리초로 대기할 시간을 지정할 수 있습니다. (기본 시간 5초)

### beforeAll(fn, timeout)

모든 테스트가 실행되기 전에 딱 한 번 함수를 실행합니다.

### afterEach(fn, timeout)

각각의 테스트가 완료된 후 함수를 실행합니다.

### afterAll(fn, timeout)

모든 테스트가 완료된 후 함수를 실행합니다.
