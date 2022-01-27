const UserModel = require("../Models/userModel");
const jwt = require("jsonwebtoken");

const jwtSignin = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};
exports.signUp = async (req, res, next) => {
  try {
    const { name, email, password, confirmPassword } = req.body;
    const user = await UserModel.create({
      name: name.toLowerCase(),
      email,
      password,
      confirmPassword,
    });
    const token = jwtSignin(user._id);
    res.status(201).json({
      status: "Success",
      token,
      data: {
        user,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "Fail",
      message: err,
    });
  }
  // next();
};

exports.signIn = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    //check if user exist
    const user = await UserModel.findOne({ email }).select("+password");
    if (!user || !(await user.verifyPassword(password, user.password))) {
      throw new Error("Incorrect email or password !");
    }
    //retrun token if everything is fine
    const token = jwtSignin(user._id);
    res.status(200).json({
      status: "Success",
      token,
      data: {
        user,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "Fail",
      message: err.toString(),
    });
  }
  // next();
};
exports.getUsers = async (req, res, next) => {
  try {
    const q = req.query.query?.toLowerCase();
    const _id = req.query.id;

    const users = await UserModel.find({ $or: [{ name: { $regex: `^${q}` } }, { _id }] });

    res.status(200).json({
      status: "Success",
      data: {
        users,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "Fail",
      message: err.toString(),
    });
  }
  // next();
};

exports.addFriend = async (req, res, next) => {
  try {
    const user = await UserModel.findOneAndUpdate(
      { _id: req.body.id },
      { $addToSet: { friends: req.body.addFriend.toString() } },
      {
        new: true,
        upsert: true,
      }
    );
    await UserModel.findOneAndUpdate(
      { _id: req.body.addFriend },
      { $addToSet: { friends: req.body.id } },
      {
        upsert: true,
      }
    );
    res.status(201).json({
      status: "Succes",
      message: "added to the friend list",
      data: {
        user,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "Fail",
      message: err,
    });
  }
};

exports.getFriends = async (req, res, next) => {
  try {
    const users = await UserModel.find({ _id: { $in: req.body.friends } });
    res.status(200).json({
      status: "Success",
      data: {
        users,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "Fail",
      message: err,
    });
  }
};
