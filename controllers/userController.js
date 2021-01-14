import User from "../models/User";

export const getUser = async (req, res) => {
  console.log("getUser");
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
  console.log("Add Friend");
  try {
    const {
      body: { userId, friendId },
    } = req;
    const targetUser = await User.findOne({ _id: userId });
    if (targetUser.friendsList.includes(friendId)) {
      const E = new Error("They Are Already Friend");
      E.name = "alreadyFriend";
      throw E;
    } else {
      targetUser.friendsList.push(friendId);
      targetUser.save();
      res.redirect("/api/getUsers");
    }
  } catch (error) {
    console.log(error.stack);
    res.status(400).send('Failed to add Friend');
  }
};
export const removeFriend = async (req, res) => {
  console.log("Removing Friend");
  try {
    const {
      body: { userId, friendId },
    } = req;
    const targetUser = await User.findOne({ _id: userId });
    const targetFriend = await User.findOne({ _id: userId });
    if (targetFriend) {
      if (targetUser.friendsList.includes(friendId)) {
        targetUser.friendsList.remove(friendId);
        targetUser.save();
        res.redirect("/api/getUsers");
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
  console.log("Block User");
  try {
    const {
      body: { userId, blockId },
    } = req;
    const targetUser = await User.findOne({ _id: userId });
    const targetBlockUser = await User.findOne({ _id: blockId });
    if (targetBlockUser) {
      if (targetUser.blockList.includes(blockId)) {
        throw Error('already blocked');
      } else {
        targetUser.blockList.push(blockId);
        targetUser.save();
        res.redirect("/api/getUsers");
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
  console.log("Change Profile");
  try {
    const {
      body: { userId, avatarUrl, backgroundUrl, nickName, quoteMessage },
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
