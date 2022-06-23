import {
  addUser,
  transfer,
  withdraw,
  getUser,
  getUsers,
  setCredit,
  depositToUser,
  deleteUser,
  updateUser,
} from "../services/user.services.js";

const getUsersC = async (req, res) => {
  let query = req.query || {};
  try {
    const users = await getUsers(query);
    return res.status(200).send(users);
  } catch (e) {
    return res.status(400).send(e.message.toString());
  }
};
const getUserC = async (req, res) => {
  try {
    const user = await getUser(req.params.id);
    return res.status(200).send(user);
  } catch (e) {
    return res.status(400).send(e.message.toString());
  }
};

const addUserC = async (req, res) => {
  try {
    const user = await addUser(req.body);
    return res.status(201).send(user);
  } catch (e) {
    return res.status(400).send(e.message.toString());
  }
};

const updateUserC = async (req, res) => {
  try {
    const user = await updateUser(req.body);
    return res.status(200).send(user);
  } catch (e) {
    return res.status(400).send(e.message.toString());
  }
};
const deleteUserC = async (req, res) => {
  try {
    const user = await deleteUser(req.params.id);
    return res.status(200).send(user);
  } catch (e) {
    res.status(404).send(e.message.toString());
  }
};

const depositToUserC = async (req, res) => {
  const { amount = 0 } = req.body;
  try {
    if (amount <= 0) throw Error("Please enter a positive amount");
    const user = await depositToUser(req.params.id, amount);
    res.status(200).send(user);
  } catch (e) {
    return res.status(400).send(e.message.toString());
  }
};

const setCreditC = async (req, res) => {
  const { amount = 0 } = req.body;
  try {
    if (amount <= 0) throw Error("Please enter a positive amount");
    const user = await setCredit(req.params.id, req.body.amount);
    res.status(200).send(user);
  } catch (e) {
    return res.status(400).send(e.message.toString());
  }
};
const withdrawC = async (req, res) => {
  const { amount = 0 } = req.body;
  try {
    if (amount <= 0) throw Error("Please enter a positive amount");
    const user = await withdraw(req.params.id, req.body.amount);
    res.status(200).send(user);
  } catch (e) {
    return res.status(400).send(e.message.toString());
  }
};
const transferC = async (req, res) => {
  const { amount = 0 } = req.body;
  try {
    if (amount <= 0) throw Error("Please enter a positive amount");
    const transferResults = await transfer(
      req.params.id,
      req.body.recipientID,
      req.body.amount
    );
    res.status(200).send(transferResults);
  } catch (e) {
    return res.status(400).send(e.message.toString());
  }
};

export {
  addUserC,
  transferC,
  withdrawC,
  getUserC,
  getUsersC,
  setCreditC,
  depositToUserC,
  deleteUserC,
  updateUserC,
};
