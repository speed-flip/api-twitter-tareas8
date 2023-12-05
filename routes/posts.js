import express from "express";
import { createPosts, getPosts } from "../controllers/postsController.js";
import upload from "../lib/multer.js";

import checkAuth from '../middleware/checkAuth.js';

const router = express();

router.post('', checkAuth, upload.single('imagen'), createPosts);
router.get('', checkAuth, getPosts);


export default router; 
