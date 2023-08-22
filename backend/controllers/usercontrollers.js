import { json } from "express";
import asyncHandler from "../middleware/asyncHandler.js";
import User from "../models/userModal.js";
import Jwt from "jsonwebtoken";
import genrateToken from "../utils/genrateToken.js";

//* @desc Auth User and get Tokens
//* @route POST /api/users/login
//* @access Public
const authUser = asyncHandler(async (req, resp) => {
  console.log("User", User);
  const { email, password } = req.body;
  const user = await User.findOne({ email: email });

  if (user && (await user.matchPassword(password))) {
    genrateToken(resp, user._id);
    return resp.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    resp.status(401);
    throw new Error("Invalid user name or password");
  }
});

//* @desc Register an new user
//* @route POST /api/users
//* @access Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  const user = await User.create({
    name,
    email,
    password,
  });
  if (user) {
    genrateToken(res, user._id);
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(400);
    throw new Error("Invalid User Data");
  }
});

//* @desc Logout user  / clear cookie
//* @route POST /api/users/logout
//* @access Private
const logoutUser = asyncHandler(async (req, resp) => {
  resp.cookie("jwt", "ajaaa", {
    httpOnly: true,
    expiresIn: new Date(0),
  });
  resp.status(200).json({ message: "Logout successfully" });
});

//* @desc get user profile
//* @route GET /api/users/profile
//* @access Private
const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (user) {
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(400);
    throw new Error("User not found");
  }
});

//* @desc update user profile
//* @route PUT /api/users/profile
//* @access Private
const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;

    if (req.body.password) {
      user.password = req.body.password;
    }

    const updateuser = await user.save();
    res.status(200).json({
      _id: updateuser._id,
      name: updateuser.name,
      email: updateuser.email,
      isAdmin: updateuser.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

//* @desc get all users
//* @route GET /api/users
//* @access Private/Admin
const getUsers = asyncHandler(async (req, resp) => {
  resp.send("get users");
});

//* @desc delete user
//* @route DELETE /api/users/:id
//* @access Private/Admin
const deleteUser = asyncHandler(async (req, resp) => {
  resp.send("delete user");
});

//* @desc get user by id
//* @route GET /api/users/:id
//* @access Private/Admin
const getUserById = asyncHandler(async (req, resp) => {
  resp.send("get user by id");
});

//* @desc update user
//* @route PUT /api/users/:id
//* @access Private/Admin
const updateUser = asyncHandler(async (req, resp) => {
  resp.send("update user");
});

export {
  authUser,
  registerUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
  deleteUser,
  getUserById,
  updateUser,
  logoutUser,
};
