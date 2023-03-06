# Express 서버 과제

### 서버 구조

- 서버 로직에 해당하는 소스코드는 src/ 폴더에서 관리합니다.
- 나머지 서버 셋팅에 관련된 설정은 / 프로젝트 루트에서 관리합니다.

  - 이유는 소스코드와 Docker, CI&CD, 서버설정 관련 파일들이 함께 있으면 관리가 힘들어 지기 때문이에요.

- 모듈 시스템은 Nodejs의 표준인 commonJS모듈을 사용합니다.
  - 그 이유는 타입스크립트를 아직 사용하고 있지 않기 때문 + 일단 표준이기 때문에.
- package manager는 yarn 을 사용합니다.

### 해야할 것

- 1. 만들어져 있는 app.js에 기본 서버 로직을 작성합니다.
- 1-2. NODE_ENV를 이용해 개발환경과 프로덕션 환경을 분리해 설정을 진행합니다.
- 1-3. .env파일을 생성해 환경변수를 설정해 봅니다. (8081포트로 뛰워보세요 + .gitignore에 추가)
- 1-4. morgan라이브러리를 이용해 request가 들어왔을때 터미널에 logging을 해주도록 셋팅
- 1-5. cors라이브러리를 이용해 turnup.ai 프로덕션 환경에서는 turnup.ai 도메인의 요청만 허용할 수 있도록 셋팅해 보세요. development에서는 모두 허용 (+ credentials:true로 셋팅합니다.)
- 1-6 json포멧의 body를 자동으로 파싱하도록 미들웨어를 셋팅해주세요.
- 1-6 encoding된 url을 자동으로 파싱하도록 미들웨어를 셋팅해주세요.
- 2. nodemon을 현재의 package.json의 script가 아닌 nodemon.json으로 실행해 보세요.
     - js파일의 변화만을 감지하여 hot-reloading을 구현해 봅니다.

### 힌트

- 1-2. windows와 macos 환경 모두 script를 이용해 변수를 주입해 주기 위한 cross-env 라이브러리 이용 https://www.npmjs.com/package/cross-env
  - package.json script 참고
- 1-3. dotenv-flow 라이브러리 이용 (https://www.npmjs.com/package/dotenv-flow)
  - 셋팅하면서 development, production환경을 분리해 env파일을 셋팅하는법 숙지
- 1-4. morgan - https://www.npmjs.com/package/morgan
- 1-5. cors - https://www.npmjs.com/package/cors
- 1-6. express에 내장되어 있는 미들웨어중 2가지를 설정해주면 됩니다.

- 2. https://www.npmjs.com/package/nodemon

## 2차과제는 README2.md에 업데이트 될 예정
