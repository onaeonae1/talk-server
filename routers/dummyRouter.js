// implemented to make test data. need to be removed
import express from 'express';
import {
  createDummychat,
  createDummyroom,
  createDummyuser,
  dummyCrypt,
  dummyHash,
  dummyLogin,
  dummyMap,
  dummySearch,
  dummySignin,
  dummyToken,
  dummyValid,
  dummyVerify,
} from '../controllers/dummyController';

const dummyRouter = express.Router();

// dummy Routers
dummyRouter.post('/user', createDummyuser);
dummyRouter.post('/chat', createDummychat);
dummyRouter.post('/room', createDummyroom);
dummyRouter.post('/search', dummySearch);
dummyRouter.post('/valid', dummyValid);
dummyRouter.get('/map', dummyMap);
dummyRouter.get('/hash', dummyHash);
dummyRouter.post('/crypt', dummyCrypt);
dummyRouter.post('/signin', dummySignin);
dummyRouter.post('/login', dummyLogin);
dummyRouter.post('/token', dummyToken);
dummyRouter.post('/verify', dummyVerify);
export default dummyRouter;
