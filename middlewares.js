/* eslint-disable import/prefer-default-export */
import jwt from 'jsonwebtoken';

import User from './models/User';
import configs from './configs';
import routes from './routes';

export const localsMiddleware = (req, res, next) => { // 전역 변수로서 사용할 수 있다
  res.locals.routes = routes;
  next();
};

export const isAuth = async (req, res, next) => {
  const token = req.get('Authorization');
  try {
    const jwtSecret = configs.jwt_secret;
    const decodedToken = jwt.verify(token, jwtSecret, {});
    const { _id } = decodedToken;
    const user = await User.findOne({ _id });
    if (!user) {
      throw Error('no user with such id');
    }
    req.user = user;
    next();
  } catch (error) {
    error.status(400);
    error.message('Authentication Failed');
    next(error);
  }
};
