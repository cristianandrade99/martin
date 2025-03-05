import 'express-async-errors';
import express, { Request, Response } from 'express';

import { errorMiddleware, loggerMiddleware, notFoundMiddleware } from './middlewares';
import { Person } from './models/PersonModel';

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.json());

app.use(loggerMiddleware);

// Routes
app.post('/person', async (_: Request, res: Response) => {
  const createdPerson = await Person.createPerson({
    documentNumber: '1026306617',
    documentTypeId: 3,
    firstName: 'Cristian',
    firstSurname: 'Andrade'
  });

  res.status(200).json(createdPerson);
});

app.get('/person', async (_: Request, res: Response) => {
  res.status(200).json(await Person.getPersons());
});

app.all('*', notFoundMiddleware);

// Error
app.use(errorMiddleware);

// Start server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

export default app;
