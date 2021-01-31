import express from 'express';
import dotenv from 'dotenv';
import multer from 'multer';
import connectServer from './config/db.js';
import userRoutes from './routes/userRoutes.js';
import postRoutes from './routes/postRoutes.js';
import imageRoute from './routes/imageRoute.js';
import { errorHandler, notFound } from './middleware/error.js';

const app = express();
const upload = multer();
dotenv.config();
connectServer();

app.use(express.json());
// app.use(upload.array())
// app.use(express.static('public'));


app.use('/api/users', userRoutes);
app.use('/api/posts', postRoutes);
app.use('/api', imageRoute);

app.use(notFound);
app.use(errorHandler);

app.listen(5000, (req, res) => {
  console.log('Server is running on port 5000');
});
