import {Router} from 'express';
import * as cryptoControllers from '../controllers/crypto';
import * as cryptoMiddlewares from '../middlewares/crypto';

const router = Router();

router.get('/btc', cryptoControllers.getBtcCurrencies);

router.post(
    '/btc',
    cryptoMiddlewares.validatePostBody,
    cryptoControllers.updateLocalCurrency,
);

export default router;
