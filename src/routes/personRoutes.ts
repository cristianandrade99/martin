import { Router } from 'express';

import { createPersonController, getPersonsController } from '../controllers/personController';

const router = Router();

router.route('').post(createPersonController).get(getPersonsController);

export default router;
