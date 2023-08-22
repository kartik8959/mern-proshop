import Jwt from "jsonwebtoken";
import asyncHandler from "./asyncHandler.js";
import User from "../models/userModal.js";

// User Must be authenticated

const protect = asyncHandler(async (req, res, next) => {
  let token;

  //    Read JWT token from 'jwt' cookie
  token = req.cookies.jwt;
  if (token) {
    try {
      const decoded = Jwt.verify(token, process.env.JWT_SECRET);
      console.log(decoded, "decoded");
      req.user = await User.findById(decoded.userId).select("-password");
      next();
    } catch (err) {
      console.log(err);
      res.status(401);
      throw new Error("Not Authorised, token failed");
    }
  } else {
    res.status(401);
    throw new Error("Not Authorised, No Token");
  }
});

// User must be admin
const admin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    console.log(req.user, "yes");
    next();
  } else {
    res.status(401);
    throw new Error("Not Authorised as an admin");
  }
};

export { protect, admin };
