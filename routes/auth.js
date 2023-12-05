import Express from "express";
const router = Express();
import { login, crearUser, validAuth, getUserProfile } from "../controllers/authController.js";

import checkAuth from '../middleware/checkAuth.js';

router.get('', checkAuth, validAuth);
router.post('/login', login);
router.post('/signup', crearUser);
router.get('/profile', checkAuth, getUserProfile);

export default router;
