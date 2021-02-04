/* eslint-disable import/prefer-default-export */
import jwt from 'jsonwebtoken';

import User from './models/User';
import configs from './configs';
import routes from './routes';

export const localsMiddleware = (req, res, next) => { // 전역 변수로서 사용할 수 있다
  res.locals.routes = routes;
  next();
};

export const isAuthenticated = async (req, res, next) => {
  try {
    if (!req.cookies.accessToken) {
      throw Error('token is empty. you need to login');
    }
    const {
      cookies: { accessToken },
    } = req;
    console.log('⏳ Authentiation in progress..');
    const jwtSecret = configs.jwt_secret;
    const { _id } = jwt.verify(accessToken, jwtSecret, {});
    const user = await User.findOne({ _id });
    // 이러한 유저가 없는 경우
    if (!user) {
      throw Error('no user with such id');
    }
    req.user = await user.getInfo();
    req.token = accessToken;
    console.log(`🤗 Welcome ${user.userName}`);
    next();
  } catch (error) {
    console.log(error.message);
    res.status(400).send('Authentication failed. Try Again');
  }
};

export const isAuthorized = async (req, res, next) => {
  try {
    if (!req.user) {
      throw Error('token is empty. authentication failed!');
    }
    const {
      user: { _id },
    } = req;
    console.log('⏳ Authorization in progress..');
    const { role } = await User.findOne({ _id });
    if (role === 'Admin') {
      console.log('⚒  Welcome Our Admin!');
      next();
    } else {
      throw Error(`Access Denied : User Role is ${role}`);
    }
  } catch (error) {
    console.log(error.statck);
    res.status(400).send('Authorization failed. Access Denied');
  }
};
