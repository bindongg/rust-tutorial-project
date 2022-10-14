![header](https://capsule-render.vercel.app/api?type=waving&color=F68400&height=100&section=header&text=Rust%20Tutorial%20Web%20Application&fontSize=40)

## 1. 프로젝트 소개

**Rust Tutorial Web Application**는 입문자도 쉽게 **러스트 언어**를 공부할 수 있도록 지원하는 웹어플리케이션입니다. React와 SpringBoot를 사용하여 프론트엔드, 벡엔드로 구성되어 있습니다. 그리고 Docker를 사용하여 온라인 컴파일 기능을 지원하고, 데이터베이스는 Mysql을 사용하고 있습니다.  
 <br>

## 2. 팀 소개

1.  장덕진(pay7845@naver.com) - 프론트엔드 개발, 백엔드 API 개발, SpringBoot Security 설계 및 구현
2.  정명진(jmj2588547@naver.com) - 페이지 디자인, 프론트엔드 개발, 러스트 컨텐츠 제작
3.  황동민(bindonggg@naver.com) - 프론트엔드 개발, 벡엔드 API 개발, DB 구현
    <br>

## 3. 시스템 구성도

![image](https://user-images.githubusercontent.com/64681410/193783821-4060f448-26c5-4124-b54e-6e4eecd74788.png)
<br>

## 4. 소개 및 시연 연상

**추가예정**
<br>

## 5. 개발 도구

프로젝트를 사용하기 위해 기본적으로 다운로드 해야할 개발 도구들입니다.

- SpringBoot - 백엔드입니다.
- Java11
- Docker - 온라인에서 유저의 코드를 받아 한정된 자원의 안전한 공간에서 코드를 실행시키기 위해 docker container를 사용합니다.
- Redis - 유저의 세션을 유지하기 위한 토큰을 저장하기 위해 사용합니다.
- Mysql - 데이터를 저장하기 위한 데이터베이스입니다.
- React - 프론트엔드입니다.  
  <br>

## 6. 설치 및 사용법

본 프로젝트는 리눅스 환경에서 관리자 권한으로 실행해야 정상적으로 동작합니다. 개발 도구들을 모두 다운로드 받으신 후, 아래의 단계를 진행하시면 프로젝트를 실행시킬 수 있습니다.  
 <br>

1.  프로젝트 내려받기

```shell
$ git clone https://github.com/bindongg/rust-tutorial-project.git # 프로젝트 내려받기
$ cd rust-tutorial-project
```

2.  프론트엔드 실행

```shell
$ cd frontend
$ npm install # module 다운로드
$ npm run start # react 실행
```

3.  벡엔드 데이터베이스 설정  
    SpringBoot 실행을 위해 application.yml 파일에 Mysql의 엔드포인트와 유저이름, 비밀번호를 입력합니다. 필수는 아니지만, 회원가입의 인증 기능을 사용하려면 google mail의 아이디와 비밀번호를 입력합니다.

```shell
$ cd ../backend
$ vi src/main/resources/application.yml # mysql, mail 설정
```

4.  docker 이미지 빌드  
    언어를 컴파일, 실행할 수 있는 컨테이너를 만들기 위해 각 언어별 이미지를 빌드합니다.

```shell
$ cd docker
$ chmod +x init.sh
$ ./init.sh # rust, java, python, c++ image 빌드
```

5.  벡엔드 실행

```shell
$ cd ..
$ chmod +x mvnw
$ ./mvnw spring-boot:run # mvnw SpringBoot 실행
```

## 7. 실행 결과

배포 되어있어서 http://54.180.10.223/ 으로 접속하면 들어가서 직접 확인할 수 있습니다. (2022.10.14기준)

### 메인 페이지

맨 처음 접속했을 때, 보이는 페이지입니다.
![Main](https://user-images.githubusercontent.com/64851797/195783411-ad5e35e1-4ff8-4d82-8310-8fe910e8602e.png)

### Rust 소개 페이지

Rust에 관한 여러가지 정보를 알아볼 수 있는 페이지입니다.
![AboutRust](https://user-images.githubusercontent.com/64851797/195783228-d97b74d7-7092-4421-aa0d-34127235b3f7.png)

### 튜토리얼 페이지

Rust를 차근차근 배워보고 싶은 사람들을 위한 페이지입니다.
![Tutorial](https://user-images.githubusercontent.com/64851797/195783448-8557f0c7-d544-4caf-985c-64a9dea2b60e.png)

### 레퍼런스 페이지

Rust 문법을 모르는 부분만 찾아보기 위한 페이지입니다.
또한, 문법 참고자료 페이지가 있어 Rust 학습에 도움을 주는 페이지입니다.
![Reference](https://user-images.githubusercontent.com/64851797/195783423-3d23ae70-f634-498e-b20c-4b13744eacb2.png)

### 연습문제 페이지

Rust로 문제를 풀어볼 수 있는 페이지입니다. 각 문제마다 예시 코드가 주어져서 학습이 편리합니다.
![Exercise](https://user-images.githubusercontent.com/64851797/195783439-213e68d1-5cb5-471e-af15-f5f0e83bc5e6.png)

### 온라인 컴파일러 페이지

Rust 컴파일러를 따로 설치하지 않고도 사용할 수 있는 컴파일러입니다.
![OnlineCompiler](https://user-images.githubusercontent.com/64851797/195783429-f056c802-91a9-4a49-a859-5a9fc9671510.png)

![Footer](https://capsule-render.vercel.app/api?type=waving&color=F68400&height=200&section=footer)
