import bcrypt from 'bcryptjs';
import User from '../models/User';

export const getUser = async (req, res) => {
  console.log('getUser');
  const userId = req.query.id;
  try {
    const user = await User.findOne({ _id: userId })
      .populate('friendsList')
      .populate('roomList');
    if (!user) {
      throw Error('there is no user');
    }
    res.send(user);
  } catch (error) {
    console.log(error.stack);
    res.status(400).send('Failed to get User');
  }
};

export const addFriend = async (req, res) => {
  console.log('Add Friend');
  try {
    const {
      body: { userId, friendId },
    } = req;
    const targetUser = await User.findOne({ _id: userId });
    if (targetUser.friendsList.includes(friendId)) {
      throw Error('they are already friend');
    } else {
      targetUser.friendsList.push(friendId);
      await targetUser.save();
      res.redirect('/api/getUsers');
    }
  } catch (error) {
    console.log(error.stack);
    res.status(400).send('Failed to add Friend');
  }
};
export const removeFriend = async (req, res) => {
  console.log('Removing Friend');
  try {
    const {
      body: { userId, friendId },
    } = req;
    const targetUser = await User.findOne({ _id: userId });
    if (await User.findOne({ _id: friendId })) {
      console.log(`deleting friend : ${friendId}`);
      if (targetUser.friendsList.includes(friendId)) {
        targetUser.friendsList.remove(friendId);
        await targetUser.save();
        res.redirect('/api/getUsers');
      } else {
        throw Error('they are not friend');
      }
    } else {
      throw Error('failed to find friend');
    }
  } catch (error) {
    console.log(error.stack);
    res.status(400).send('Failed to remove friend');
  }
};
export const blockUser = async (req, res) => {
  console.log('Block User');
  try {
    const {
      body: { userId, blockId },
    } = req;
    const targetUser = await User.findOne({ _id: userId });
    if (await User.findOne({ _id: blockId })) {
      if (targetUser.blockList.includes(blockId)) {
        throw Error('already blocked');
      } else {
        targetUser.blockList.push(blockId);
        await targetUser.save();
        res.redirect('/api/getUsers');
      }
    } else {
      throw Error('there is no such user');
    }
  } catch (error) {
    console.log(error.stack);
    res.status(400).send('Failed to block User');
  }
};
export const changeProfile = async (req, res) => {
  console.log('Change Profile');
  try {
    const {
      body: {
        userId, avatarUrl, backgroundUrl, nickName, quoteMessage,
      },
    } = req;
    const updateUser = await User.findByIdAndUpdate(userId, {
      avatarUrl,
      backgroundUrl,
      nickName,
      quoteMessage,
    });
    console.log(`Successfully Changed Profile : ${updateUser.nickName}`);
  } catch (error) {
    console.log(error.stack);
    res.status(400).send('Failed to change Profile');
  }
};
export const login = async (req, res) => {
  console.log('loggin in');
  try {
    const {
      body: {
        userid, hashedPassword,
      },
    } = req;
    const targetUser = await User.findOne({ _id: userid });
    if (await targetUser.checkPassword(hashedPassword)) {
      console.log('login success');
    } else {
      console.log('failed to login');
      throw Error('failed to login');
    }
  } catch (error) {
    console.log(error.stack);
    res.status(400).send('Failed to Login');
  }
};
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
        const newUser = await User.create({
          userName,
          email,
          hashedPassword,
        });
        res.send(newUser);
      });
    });
  } catch (error) {
    console.log(error.stack);
    res.status(400).send('failed to register user');
  }
};
