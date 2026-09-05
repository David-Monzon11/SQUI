import { Router } from 'express';
import { WisdomController } from '../controllers/wisdom.controller';

const router = Router();

router.get('/daily', WisdomController.getDailyWisdom);

export default router;
