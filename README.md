![header](https://capsule-render.vercel.app/api?type=waving&color=F68400&height=100&section=header&text=Rust%20Tutorial%20Web%20Application&fontSize=40)

## 1. 프로젝트 소개
 **Rust-Tutorial-Project**는 입문자도 쉽게 **러스트 언어**를 공부할 수 있도록 지원하는 웹어플리케이션입니다. React와 SpringBoot를 사용하여 프론트엔드, 벡엔드로 구성되어 있습니다. 그리고 Docker를 사용하여 온라인 컴파일 기능을 지원하고, 데이터베이스는 Mysql을 사용하고 있습니다.  
 <br>
 
 ## 2. 팀 소개
 1. 장덕진 - pay7845@naver.com
 프론트엔드 개발, 백엔드 API 개발, SpringBoot Security 설계 및 구현
 2. 정명진 - jmj2588547@naver.com
 페이지 디자인, 프론트엔드 개발, 러스트 컨텐츠 제작
 3. 황동민 - bindonggg@naver.com
 프론트엔드 개발, 벡엔드 API 개발, DB 구현
   <br>  
 
 ## Tools
 프로젝트를 사용하기 위해 기본적으로 다운로드 해야할 tools입니다.
 * SpringBoot - 백엔드입니다.
 * Java11
 * Docker - 온라인에서 유저의 코드를 받아 한정된 자원의 안전한 공간에서 코드를 실행시키기 위해 docker container를 사용합니다.
 * Redis - 유저의 세션을 유지하기 위한 토큰을 저장하기 위해 사용합니다.
 * Mysql - 데이터를 저장하기 위한 데이터베이스입니다.
 * React - 프론트엔드입니다.  
<br>

## 시작하기
 본 프로젝트는 리눅스 환경에서 관리자 권한으로 실행해야 정상적으로 동작합니다. 툴들을 모두 다운로드 받으신 후, 아래의 단계를 진행하시면 프로젝트를 실행시킬 수 있습니다.   
 <br>
 1. 프로젝트 내려받기
 ```
 git clone https://github.com/bindongg/rust-tutorial-project.git # 프로젝트 내려받기
 cd rust-tutorial-project
 ```
 2. 프론트엔드 실행
 ```
 cd frontend
 npm install # module 다운로드
 npm run start # react 실행
 ```  
 3. 벡엔드 데이터베이스 설정  
 SpringBoot 실행을 위해 application.yml 파일에 Mysql의 엔드포인트와 유저이름, 비밀번호를 입력합니다. 필수는 아니지만, 회원가입의 인증 기능을 사용하려면 google mail의 아이디와 비밀번호를 입력합니다.
 ```
 cd ../backend
 vi src/main/resources/application.yml # mysql, mail 설정
 ```
 4. docker 이미지 빌드  
 언어를 컴파일, 실행할 수 있는 컨테이너를 만들기 위해 각 언어별 이미지를 빌드합니다.
 ```
 cd docker
 chmod +x init.sh
 ./init.sh # rust, java, python, c++ image 빌드
 ```  
 5. 벡엔드 실행
```
cd ..
chmod +x mvnw
./mvnw spring-boot:run # mvnw SpringBoot 실행
```

![Footer](https://capsule-render.vercel.app/api?type=waving&color=F68400&height=200&section=footer)
