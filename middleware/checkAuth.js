import jwt from 'jsonwebtoken';

const checkAuth = async (req, res, next) => {
  const info = {
    operacion: false,
    payload: "Token no valido"
  }

  try {

    const payload = jwt.verify(req.cookies.tokenVT, process.env.JWT_SECRET);
    info.operacion = true;
    info.payload = payload;
    req.user = payload;
    next();

  } catch (err) {
    res.status(404).json(err.message);
  }
}

export default checkAuth;
