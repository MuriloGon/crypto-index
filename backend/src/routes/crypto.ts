import {Router} from 'express';
import * as cryptoControllers from '../controllers/crypto';

const router = Router();

router.get('/btc', cryptoControllers.getBtcCurrencies);

router.post('/btc', (req, res)=>res.json({message: 'crypto'}));

export default router;
