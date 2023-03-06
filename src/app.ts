import dotenv from 'dotenv-flow';

if (!process.env.PORT) {
  dotenv.config();
}

import express from 'express';
import logger from 'morgan';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import session from 'express-session';

import routes from './routes/routes';
import errorHandler from './lib/errorHandler';

const __DEV__ = process.env.NODE_ENV !== "production";
const app = express();

let options;
if (__DEV__) {
  // 개발환경 설정
  options = {
    logger: "dev",
    cors: {
      origin: true,
      methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
      credentials: true
    },
    session: {
      secret: process.env.COOKIE_SECRET!,
      resave: false,
      saveUninitialized: true,
      cookie: {
        httpOnly: false,
      },
      name: 'session-cookie',
    },
  }
  // cookie default config: { path: '/', httpOnly: true, secure: false, maxAge: null }
} else {
  // 프로덕션 환경 설정
  options = {
    logger: "combined",
    cors: {
      origin: [/turnup\.ai$/, /turnup\.me$/],
      methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
      credentials: true
    },
    session: {
      secret: process.env.COOKIE_SECRET!,
      resave: false,
      saveUninitialized: true,
      cookie: {
        secure: true
      },
      name: 'session-cookie',
    },
  }

}

// 공통설정 미들웨어
app.use(logger(options.logger)); //moragn
app.use(cors(options.cors)); // cors
app.use(cookieParser(process.env.COOKIE_SECRET)); //cookie-parser
app.use(session(options.session)); // express-session
app.use(express.json()); // json body parsing
app.use(express.urlencoded({ extended: true })); // url 자동 파싱, extended가 false인 경우, 'querystring' 라이브러리, true인 경우, 'qs'

app.use("/", routes);
app.use(errorHandler);

app.listen(process.env.PORT || 8080, () => {
  console.log(`Server is running on port ${process.env.PORT || 8080}`);
});