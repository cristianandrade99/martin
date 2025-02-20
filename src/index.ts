import express, { Request, Response } from 'express';

import { Person } from './models/PersonModel';

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Routes

app.post('/person', async (_: Request, res: Response) => {
  res.status(200).json(
    await Person.createPerson({
      documentNumber: '1026306617',
      documentTypeId: 1,
      firstName: 'Cristian',
      firstSurname: 'Andrade'
    })
  );
});

app.get('/person', async (_: Request, res: Response) => {
  res.status(200).json(await Person.getPersons());
});

// Start server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

export default app;
