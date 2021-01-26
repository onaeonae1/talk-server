// implemented to make test data. need to be removed
import express from 'express';
import {
  createDummychat,
  createDummyroom,
  createDummyuser,
  dummyReq,
  dummySearch,
  dummyValid,
} from '../controllers/dummyController';
import { isAuth } from '../middlewares';

const dummyRouter = express.Router();

// dummy Routers
dummyRouter.post('/user', createDummyuser);
dummyRouter.post('/chat', createDummychat);
dummyRouter.post('/room', createDummyroom);
dummyRouter.post('/search', dummySearch);
dummyRouter.post('/valid', dummyValid);
dummyRouter.post('/req', isAuth, dummyReq);
dummyRouter.get('/login', (req, res) => {
  res.render('login');
});
dummyRouter.get('/register', (req, res) => {
  res.render('register');
});
export default dummyRouter;
