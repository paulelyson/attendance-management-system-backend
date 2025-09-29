import express, { Request, Response } from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;
const DATABASE = process.env.DATABASE || 'mongodb://127.0.0.1:27017/ams_local';

/**
 * routes import
 */

import UserRoute from './routes/user.route';
import DailyAttendanceRoute from './routes/dailyattendance.route';
import UserAttendaceDetailRoute from './routes/userattendancedetail.route';


/**
 * middlewares
 */

app.use(express.json());
app.use(cors())
/**
 * routes
 */

app.use('/api/user', UserRoute);
app.use('/api/dailyattendance', DailyAttendanceRoute);
app.use('/api/userattendancedetail', UserAttendaceDetailRoute);

/**
 * connect to database
 */

Promise.resolve()
  .then(() => {
    mongoose.set('strictQuery', true);
    mongoose.connect(DATABASE);
    console.log('database connected');
  })
  .catch((err: Error) => {
    throw err;
  });

app.get('/', (req: Request, res: Response) => {
  res.send('Success get');
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
