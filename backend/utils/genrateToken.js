import Jwt from "jsonwebtoken";

const genrateToken = (res, userId) => {
  const token = Jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });

  // set JWT as an HTTP-Only cookie
  res.cookie("jwt", token, {
    httpOnly: true,
    secure: process.env.NOTE_ENV === "production",
    // sameSite: "strict",
    maxAge: 30 * 24 * 60 * 60 * 1000,
  });
};

export default genrateToken;
