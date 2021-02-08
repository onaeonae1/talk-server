import jwt from 'jsonwebtoken';
import isEmail from 'validator';
import User from '../models/User';
import configs from '../configs';

export const register = async (req, res) => {
  const {
    body: {
      userName, email, password, passwordCheck,
    },
  } = req;
  try {
    if (!isEmail(email)) {
      throw Error('email is not valid');
    }
    if (password !== passwordCheck) {
      throw Error('wrong password. check for your password');
    }
    if (await User.findByEmail(email)) {
      throw Error('already have same email');
    }
    await User.registerUser(userName, email, password);
    res.send(`user created with Email : ${email}`);
  } catch (error) {
    console.log(error.stack);
    res.status(400).send('failed to register user');
  }
};
export const login = async (req, res) => {
  const {
    body: { email, password },
  } = req;
  try {
    const targetUser = await User.findByEmail(email);
    if (!targetUser) {
      throw Error('no user with such email');
    }
    const result = await targetUser.checkPassword(password);
    if (!result) {
      throw Error('wrong password');
    }
    const jwtSecret = configs.jwt_secret;
    const token = jwt.sign({ _id: targetUser._id, email: targetUser.email }, jwtSecret, { expiresIn: '7d' });
    res.cookie('accessToken', token, {
      maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
      httpOnly: true,
    })
      .send(targetUser._id);
  } catch (error) {
    console.log(error.stack);
    res.status(400).send('failed to login');
  }
};

export const logout = async (req, res) => {
  // delete jwt stored in client-side cookie
  res.clearCookie('accessToken');
};
