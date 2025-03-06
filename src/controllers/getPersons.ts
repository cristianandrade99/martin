import { Person } from '../models/PersonModel';

export const getPersons = async () => {
  const persons = await Person.getPersons();

  return persons;
};
