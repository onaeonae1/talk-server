import User from "../models/User";

export const getUser = async (req, res) => {
  console.log("getUser");
  const userId = req.query.id;
  try {
    const user = await User.findOne({ _id: userId })
      .populate("friendsList")
      .populate("roomList");
    // if (!user) throw Error();
    res.send(user);
  } catch (error) {
    res.send({
      statuscode: 400,
      message: "No such People",
    });
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
    res.send({
      name: error.name,
      message: error.message,
    });
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
        const E = new Error("There is No Such Friend");
        E.name = "noSuchFriend";
        throw E;
      }
    } else {
      const E = new Error("There is No Such User with ID");
      E.name = "noSuchUser";
      throw E;
    }
  } catch (error) {
    res.send({
      name: error.name,
      message: error.message,
    });
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
        const E = new Error(`Already Blocked : ${blockId}`);
        E.name = "alreadyBlocked";
        throw E;
      } else {
        targetUser.blockList.push(blockId);
        targetUser.save();
        res.redirect("/api/getUsers");
      }
    } else {
      const E = new Error("There is No Such User with ID");
      E.name = "noSuchUser";
      throw E;
    }
  } catch (error) {
    res.send({
      name: error.name,
      message: error.message,
    });
  }
};
export const changeProfile = async (req, res) => {
  console.log("Change Profile");
  try {
    const {
      body: { userId, avatarUrl, backgroundUrl, nickName, quoteMessage },
    } = req;
    const targetUser = await User.findById(userId);
    targetUser.avatarUrl = avatarUrl;
    targetUser.backgroundUrl = backgroundUrl;
    targetUser.nickName = nickName;
    targetUser.quoteMessage = quoteMessage;
    targetUser.save();
    console.log("Successfully Changed Profile");
    console.log(targetUser.nickName);
  } catch (error) {
    res.send({
      statuscode: 400,
      message: "Failed to Change Profile",
    });
  }
};
