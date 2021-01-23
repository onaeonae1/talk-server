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
  console.log('auth in progress');
  try {
    const jwtSecret = configs.jwt_secret;
    const decodedToken = jwt.verify(token, jwtSecret, {});
    console.log(decodedToken);
    const { _id } = decodedToken;
    const user = await User.findOne({ _id });
    if (!user) {
      throw Error('no user with such id');
    }
    req.user = await user.getInfo();
    next();
  } catch (error) {
    console.log(error.stack);
    res.status(400).send('failed to login');
    next(error);
  }
};
