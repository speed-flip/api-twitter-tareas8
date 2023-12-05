import { db } from "../database/conn.js";
import cookie from 'cookie';

import generateJWT from "../helpers/generateJWT.js";

const login = async (req, res) => {
  const params = [
    req.body.email,
    req.body.password,
  ]

  const sql = `SELECT user_name, email FROM users 
                    WHERE email =  $1
                    and password = $2`;

  const result = await db.query(sql, params);

  if (result.length > 0) {
    const payload = {
      user_name: result[0].user_name,
      email: result[0].email,
    }

    const token = generateJWT(payload);
    const tokenCookie = cookie.serialize('tokenVT', token, {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
      maxAge: (60 * 60),
      path: '/'
    });

    res.setHeader('Set-Cookie', tokenCookie);

    res.json({ mensaje: 'Autenticación exitosa' });

  } else {
    res.status(404).json({ mensaje: 'Este usuario no esta registrado en Twitter' });
  }


}

const crearUser = async (req, res) => {
  const params = [
    req.body.nombre,
    req.body.user_name,
    req.body.email,
    req.body.password,
  ];

  const sql = `INSERT INTO users (name, user_name, email, password) VALUES ($1,$2,$3,$4) returning *`;

  try {
    const result = await db.query(sql, params);
    res.json({
      msg: 'Usuario creado exitosamente',
      usuario: result,
    });
  } catch (error) {
    console.log(error);
    res.json({
      msg: error.message,
    });
  }
}

const validAuth = async (req, res) => {
  res.json({ msg: 'Hay cookies', user: req.user });
}

const getUserProfile = async (req, res) => {
  res.json(req.user);
}

export {
  login,
  crearUser,
  validAuth,
  getUserProfile
}