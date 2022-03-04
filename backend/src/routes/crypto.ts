import {Router} from 'express';

const router = Router();

router.get('/btc', (req, res)=>res.json({message: 'crypto'}));

router.post('/btc', (req, res)=>res.json({message: 'crypto'}));

export default router;
