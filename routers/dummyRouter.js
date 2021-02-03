// implemented to make test data. need to be removed
import express from 'express';
import {
  createDummychat,
  createDummyroom,
  createDummyuser,
  dummyReq,
  dummySearch,
  dummyValid,
  dummyAvatar,
  getDummyProfie,
} from '../controllers/dummyController';
import { isAuthenticated } from '../middlewares';
import { uploadAvatar } from '../upload';

const dummyRouter = express.Router();

// dummy Routers
dummyRouter.post('/user', createDummyuser);
dummyRouter.post('/chat', createDummychat);
dummyRouter.post('/room', createDummyroom);
dummyRouter.post('/search', dummySearch);
dummyRouter.post('/valid', dummyValid);
dummyRouter.post('/req', isAuthenticated, dummyReq);
dummyRouter.get('/login', (req, res) => {
  res.render('login');
});
dummyRouter.get('/register', (req, res) => {
  res.render('register');
});
dummyRouter.get('/cookie', (req, res) => {
  const {
    cookies: { accessToken },
    headers: { cookie },
  } = req;
  // console.log(req);
  console.log(req.headers);
  console.log(cookie);
  res.send('check console');
});
dummyRouter.get('/upload', (req, res) => {
  res.render('imgupload');
});
dummyRouter.post('/upload', uploadAvatar, dummyAvatar);
export default dummyRouter;
dummyRouter.get('/profile', isAuthenticated, getDummyProfie);
