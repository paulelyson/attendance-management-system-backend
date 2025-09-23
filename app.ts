import express, { Request, Response } from 'express';
const app = express();
const PORT = process.env.PORT || 3000;

/**
 * routes import
 */

import UserRoute from './routes/user.route';

/**
 * middlewares
 */

app.use(express.json());

/**
 * routes
 */

app.use("/api/user", UserRoute);

app.get('/', (req: Request, res: Response) => {
  res.send('Success get');
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
