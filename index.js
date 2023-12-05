import express from "express";
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from "cookie-parser";

const app = express();

dotenv.config();

// routes
import authRoutes from "./routes/auth.js";
import postsRoutes from "./routes/posts.js";

//Middleware
app.use(express.json());
app.use(cookieParser());

const corsOptions = {
  origin: [
    'http://localhost:5173',
    'http://localhost:5173/',
  ],
  credentials: true,
  methods: ['GET', 'PUT', 'POST', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
};

app.use(cors(corsOptions));

//Routes
app.use('/api/auth', authRoutes);
app.use('/api/posts', postsRoutes);

app.listen(4000, () => {
  console.log("Servidor en puerto 4000");
});
