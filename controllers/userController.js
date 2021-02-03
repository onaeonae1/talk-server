import User from '../models/User';

export const getUser = async (req, res) => {
  console.log('getUser');
  const userId = req.query.id;
  console.log(userId);
  try {
    const user = await User.findOne({ _id: userId });
    console.log(user);
    if (!user) {
      throw Error('there is no user');
    }
    res.send(user);
  } catch (error) {
    console.log(error.stack);
    res.status(400).send('Failed to get User');
  }
};

export const getUserEmail = async (req, res) => {
  console.log('getUserEmail');
  const {
    query: {
      email,
    },
  } = req;
  try {
    const user = await User.findByEmail(email);
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
      body: { friendId },
      user: { _id },
    } = req;

    const result = await User.findOne({ _id }).addFriend(friendId);

    if (result) {
      res.status(200).send('successfully added friend');
    } else {
      throw Error('failed to add User');
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
      body: { friendId },
      user: { userId },
    } = req;
    // schema method 로
    const targetUser = await User.findOne({ _id: userId });
    if (await User.findOne({ _id: friendId })) {
      console.log(`deleting friend : ${friendId}`);
      if (targetUser.friendsList.includes(friendId)) {
        targetUser.friendsList.remove(friendId);
        await targetUser.save();
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
      body: { blockId },
      user: { userId },
    } = req;
    const targetUser = await User.findOne({ _id: userId });
    if (await User.findOne({ _id: blockId })) {
      if (targetUser.blockList.includes(blockId)) {
        throw Error('already blocked');
      } else {
        targetUser.blockList.push(blockId);
        await targetUser.save();
      }
    } else {
      throw Error('there is no such user');
    }
  } catch (error) {
    console.log(error.stack);
    res.status(400).send('Failed to block User');
  }
};
// image file uploading functions : need to tested
export const changeProfileImage = async (req, res) => {
  console.log('change Profile Image');
  const {
    file: { location },
    user: { _id },
  } = req;
  console.log(location);
  await User.findOneAndUpdate({ _id }, { avatarUrl: location });
  const targetUser = await User.findOne({ _id });
  req.user = await targetUser.getInfo();
  console.log(req.user);
  res.send(req.user);
};
export const changeBackground = async (req, res) => {
  console.log('change Background Image');
  const {
    file: { location },
    user: { _id },
  } = req;
  console.log(location);
  await User.findOneAndUpdate({ _id }, { backgroundUrl: location });
  const targetUser = await User.findOne({ _id });
  req.user = await targetUser.getInfo();
  console.log(req.user);
  res.send(req.user);
};
