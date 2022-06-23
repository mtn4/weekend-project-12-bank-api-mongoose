import { User } from "../models/user/user.model.js";

const getUsers = async function (query) {
  try {
    const users = await User.find(query);
    if (users.length === 0) {
      throw new Error(`No users found`);
    }
    return users;
  } catch (e) {
    throw Error(e.message);
  }
};
const getUser = async function (id) {
  try {
    const user = await User.findOne({ passportID: id });
    if (!user) {
      throw Error("User not found");
    }
    return user;
  } catch (e) {
    throw Error(e.message);
  }
};
const addUser = async function (body) {
  try {
    const user = new User(body);
    const newUser = await user.save();
    return newUser;
  } catch (e) {
    throw Error(e.message);
  }
};

const updateUser = async function (body) {
  try {
    const updatedUser = await User.findOneAndUpdate(
      { passportID: body.passportID },
      body,
      { new: true, runValidators: true }
    );
    if (!updatedUser) {
      throw Error("User not found");
    }
    return updatedUser;
  } catch (e) {
    throw Error(e.message);
  }
};
const deleteUser = async function (id) {
  try {
    const result = await User.deleteOne({ passportID: id });
    return result;
  } catch (e) {
    throw Error(e.message);
  }
};

const depositToUser = async function (id, amount) {
  try {
    let user = await User.findOne({ passportID: id });
    if (!user) {
      throw Error("User not found");
    }
    if (user.isActive === false) {
      throw Error("The user is not active");
    }
    user = await User.findOneAndUpdate(
      { passportID: id },
      { $inc: { cash: amount } },
      { new: true }
    );
    return user;
  } catch (e) {
    throw Error(e.message);
  }
};
const setCredit = async function (id, amount) {
  try {
    let user = await User.findOne({ passportID: id });
    if (!user) {
      throw Error("User not found");
    }
    if (user.isActive === false) {
      throw Error("The user is not active");
    }
    user = await User.findOneAndUpdate(
      { passportID: id },
      { credit: amount },
      { new: true }
    );
    return user;
  } catch (e) {
    throw Error(e.message);
  }
};

const withdraw = async function (id, amount) {
  try {
    let user = await User.findOne({ passportID: id });
    if (!user) {
      throw Error("User not found");
    }
    if (user.isActive === false) {
      throw Error("The user is not active");
    }
    if (amount > user.cash + user.credit) {
      throw Error(`User doesn't have enough money to withdraw ${amount} USD`);
    }
    let newCash = user.cash;
    let newCredit = user.credit;
    if (amount > user.cash) {
      newCredit -= amount - newCash;
      newCash = 0;
    } else {
      newCash -= amount;
    }
    user.cash = newCash;
    user.credit = newCredit;
    user = await user.save();
    return user;
  } catch (e) {
    throw Error(e.message);
  }
};

const transfer = async function (id, recipientID, amount) {
  try {
    let user = await User.findOne({ passportID: id });
    if (!user) {
      throw Error("User not found");
    }
    let recipient = await User.findOne({ passportID: recipientID });
    if (!recipient) {
      throw Error("Recipient not found");
    }
    if (user.isActive === false) {
      throw Error("The user is not active");
    }
    if (recipient.isActive === false) {
      throw Error("The recipient is not active");
    }
    if (user && recipient) {
      const withdrawResults = await withdraw(id, amount);
      const depositResults = await depositToUser(recipientID, amount);
      return { withdrawResults, depositResults };
    }
  } catch (e) {
    throw Error(e.message);
  }
};

export {
  addUser,
  transfer,
  withdraw,
  getUser,
  getUsers,
  setCredit,
  depositToUser,
  deleteUser,
  updateUser,
};
