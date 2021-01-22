import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User';
import configs from '../configs';

export const register = async (req, res) => {
  const {
    body: { userName, email, password },
  } = req;
  try {
    if (User.findByEmail(email)) {
      throw Error('already have same email');
    }
    let hashedPassword;
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(password, salt, async (error, hash) => {
        hashedPassword = hash;
        await User.create({
          userName,
          email,
          hashedPassword,
        });
        res.send(`user created with Email : ${email}`);
      });
    });
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
    const targetUser = await User.findOne({ email });
    if (!targetUser) {
      throw Error('no user with such email');
    }
    const result = await targetUser.checkPassword(password);
    if (!result) {
      throw Error('password wrong');
    }
    // const testObject = { _id: targetUser._id, email: targetUser.email };
    const jwtSecret = configs.jwt_secret;
    jwt.sign(
      { _id: targetUser._id, email: targetUser.email },
      jwtSecret, {
        expiresIn: '1d',
      }, (err, token) => {
        if (err) {
          throw Error('cannot make token');
        }
        res.send({ token });
      },
    );
  } catch (error) {
    console.log(error.stack);
    res.status(400).send('failed to login');
  }
};
