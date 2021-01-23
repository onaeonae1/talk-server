import User from '../models/User';

export const getUser = async (req, res) => {
  console.log('getUser');
  const userId = req.query.id;
  try {
    const user = await User.findOne({ _id: userId })
      .populate('roomList')
      .populate('friendsList');
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
