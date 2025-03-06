import { Person } from '../models/PersonModel';

export const createPerson = async () => {
  const createdPerson = await Person.createPerson({
    documentNumber: '1026306617',
    documentTypeId: 3,
    firstName: 'Cristian',
    firstSurname: 'Andrade'
  });

  return createdPerson;
};
