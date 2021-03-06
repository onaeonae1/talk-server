import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';
import csp from 'helmet-csp';
import apiRouter from './routers/apiRouter';
import dummyRouter from './routers/dummyRouter';
import roomRouter from './routers/roomRouter';
import { localsMiddleware } from './middlewares';
import routes from './routes';
// app 기본 설정
const app = express();
app.use(helmet());
app.use(
  csp({
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'"],
      scriptSrc: ["'self'"],
    },
  }),
);
// cors
app.use(cors({
  origin: true,
  credentials: true,
}));
app.use(morgan('dev'));

// temporary server side rendering test
app.set('view engine', 'pug');
// app.set('views', path.join(__dirname, 'views'));

// body-parser, cookie-parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// localsMiddleware
app.use(localsMiddleware);
// custom Ruters
app.get('/', (req, res) => {
  res.send({
    title: 'Node API Main Page',
    description: 'go to /api/getUsers',
  });
});
app.use(routes.dummy, dummyRouter);
app.use(routes.api, apiRouter);
app.use(routes.room, roomRouter);

export default app;
