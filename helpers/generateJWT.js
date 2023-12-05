import jwt from "jsonwebtoken";

function generateJWT(user) {
  return jwt.sign(user, process.env.JWT_SECRET, { expiresIn: '1d' });
}

export default generateJWT;
