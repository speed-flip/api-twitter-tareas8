import { db } from "../database/conn.js";

const createPosts = async (req, res) => {

  const params = [
    req.body.description,
    req.user.user_name ?? req.body.user_name,
    req.file.buffer
  ];

  const sql = `INSERT INTO tweets (titulo, description, user_name, img)
                values 
                    ('titulo',$1, $2, $3) 
                returning id, user_name, description`;

  try {
    const posts = await db.query(sql, params);
    res.json({
      msg: 'Twitter creado correctamente',
      posts,
      user: req.user ?? 'user',
    });

  } catch (error) {
    console.log(error);
    res.json({
      msg: error.message,
    });
  }
}

const getPosts = async (req, res) => {
  const sql = `SELECT id, description, user_name, TO_CHAR(create_date, 'DD-Mon-YY HH:MI am') AS created_date,
  encode(img, 'base64') imagen FROM tweets
    ORDER BY create_date desc`;

  try {
    const posts = await db.query(sql);
    res.json({
      msg: 'Consulta exitosa',
      posts,
    });

  } catch (error) {
    console.log(error);
    res.json({
      msg: error.message,
    });
  }
}


export {
  createPosts,
  getPosts
}