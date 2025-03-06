import { RequestHandler } from 'express';

import { createPerson } from './createPerson';
import { getPersons } from './getPersons';

export const createPersonController: RequestHandler = async (_, res) => {
  const createdPerson = await createPerson();

  res.status(200).json(createdPerson);
};

export const getPersonsController: RequestHandler = async (_, res) => {
  const persons = await getPersons();

  res.status(200).json(persons);
};
