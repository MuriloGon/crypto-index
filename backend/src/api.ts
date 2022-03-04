import express, {Router} from 'express';
import loginSubroute from './routes/login';
import cryptoSubrouter from './routes/crypto';

const app = express();
const api = Router();

/* App middlewares */
app.use(express.json());
app.use('/api', api);

/* Api endpoints */
api.use('/login', loginSubroute);
api.use('/crypto', cryptoSubrouter);

api.use((_req, res) => res
    .status(404).json({message: 'Endpoint não encontrado'}));

export default app;
