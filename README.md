# NestJS Delivery

[![NestJS Delivery](https:// img.shields.io/badge/NestJS-Delivery-red.svg?longCache=true&style=flat-square)](https:// github.com/juliandavidmr/awesome-nestjs)
[![Awesome NestJS](https:// img.shields.io/badge/Awesome-NestJS-blue.svg?longCache=true&style=flat-square)](https:// github.com/juliandavidmr/awesome-nestjs)
> 이 프로젝트는 [NestJS](https:// nestjs.com)와 [Iamport](https:// www.iamport.kr)를 이용하여 PG결제, 카드결제, 취소 등 결제 API를 구현한 서버입니다.

## 시작하기

```bash
# 1. Clone the repository or click on "Use this template" button.
npx degit KimSunWook/nestjs-delivery my-nest-app

# 2. Enter your newly-cloned folder.
cd my-nest-app

# 3. Install dependencies. (Make sure yarn is installed: https:// yarnpkg.com/lang/en/docs/install)
yarn
```

## Checklist

When you use this template, try follow the checklist to update your info properly

- [ ] Change the author name in `LICENSE`
- [ ] Change configurations in `.envs/local.env` 
- [ ] Create configurations in `.envs/pre-production.env`, `.envs/production.env`
- [ ] Remove the `.github` folder which contains the funding info
- [ ] Clean up the README.md file

And, enjoy :)


### Development
```bash
# 4. Run development server and open http:// localhost:3000
yarn start:dev

# 5. Read the documentation linked below for "Setup and development".
```

### Build

To build the App, run

```bash
yarn build:prod
```

And you will see the generated file in `dist` that ready to be served.

## Features

<dl>
  <!-- <dt><b>Quick scaffolding</b></dt>
  <dd>Create modules, services, controller - right from the CLI!</dd> -->

  <dt><b>Instant feedback</b></dt>
  <dd>Enjoy the best DX (Developer eXperience) and code your app at the speed of thought! Your saved changes are reflected instantaneously.</dd>

  <dt><b>JWT Authentication</b></dt>
  <dd>Installed and configured JWT authentication.</dd>

  <dt><b>Next generation Typescript</b></dt>
  <dd>Always up to date typescript version.</dd>

  <dt><b>Industry-standard routing</b></dt>
  <dd>It's natural to want to add pages (e.g. /about`) to your application, and routing makes this possible.</dd>

  <dt><b>Environment Configuration</b></dt>
  <dd>development, staging and production environment configurations</dd>

  <dt><b>Swagger Api Documentation</b></dt>
  <dd>Already integrated API documentation. To see all available endpoints visit http:// localhost:3000/documentation</dd>

  <dt><b>Linter</b></dt>  
  <dd>eslint + prettier = ❤️</dd>
</dl>

## Documentation

This project includes a `docs` folder with more details on:

1.  [Setup and development](https:// narhakobyan.github.io/awesome-nest-boilerplate/docs/development.html#first-time-setup)
1.  [Architecture](https:// narhakobyan.github.io/awesome-nest-boilerplate/docs/architecture.html)
1.  [Naming Cheatsheet](https:// narhakobyan.github.io/awesome-nest-boilerplate/docs/naming-cheatsheet.html)

## Todo

- [ ] 개발자 인풋 다양화 필요
- [ ] 권한 설정 필요

- [ ] 배송정보가 아니라 처음과 마지막 배송상태로 배송정보 업데이트
- [ ] 배송세부정보 순서 저장
- [ ] 3시간마다 서버 정보 가져오기
- [ ] 업데이트가 중단된 배송 정보 무시하기
- [ ] 배송 추적 시스템 필요
- [ ] Soft Delete 구현
- [ ] Hot reload 구현
- [ ] 서버 배포
