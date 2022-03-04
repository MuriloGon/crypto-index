import {Router} from 'express';
import * as cryptoControllers from '../controllers/crypto';
import * as cryptoMiddlewares from '../middlewares/crypto';
import * as authMiddlewares from '../middlewares/auth';

const router = Router();

router.use(authMiddlewares.authentication);

router.get('/btc', cryptoControllers.getBtcCurrencies);

router.post(
    '/btc',
    cryptoMiddlewares.validatePostBody,
    cryptoControllers.updateLocalCurrency,
);

export default router;
