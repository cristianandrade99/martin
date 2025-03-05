import { db } from '../services/database';
import { CreatePersonValidator, TCreatePersonValidator } from '../validators/PersonValidator';

const createPerson = async (createPersonData: TCreatePersonValidator) => {
  CreatePersonValidator.parse(createPersonData);

  const { documentNumber, documentTypeId, firstName, firstSurname } = createPersonData;

  return await db.person.create({
    data: {
      firstName,
      firstSurname,
      personDocumentTypes: {
        create: [
          {
            documentNumber,
            documentTypeId,
            isPrincipal: true
          }
        ]
      }
    },
    include: {
      personDocumentTypes: {
        include: {
          documentType: true
        }
      }
    }
  });
};

const getPersons = async () => {
  return await db.person.findMany({
    include: {
      personDocumentTypes: {
        include: {
          documentType: {
            include: {
              country: true
            }
          }
        }
      }
    }
  });
};

export const Person = {
  createPerson,
  getPersons
};
