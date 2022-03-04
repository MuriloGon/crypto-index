import express, {Router} from 'express';
import loginController from './controllers/login';
import cryptoController from './controllers/crypto';

const app = express();
const api = Router();

/* App middlewares */
app.use(express.json());
app.use('/api', api);

/* Api endpoints */
api.use('/login', loginController);
api.use('/crypto', cryptoController);

export default app;
