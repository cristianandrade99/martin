import 'express-async-errors';
import express from 'express';

import { errorMiddleware, loggerMiddleware, notFoundMiddleware } from './middlewares';
import personRouter from './routes/personRoutes';

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Logger middleware
app.use(loggerMiddleware);

// Routes
app.use('/person', personRouter);

// Unhandled routes
app.all('*', notFoundMiddleware);

// Error middleware
app.use(errorMiddleware);

// Start server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

export default app;
