import api from './api';
import dotenv from 'dotenv';
dotenv.config();

const PORT = process.env.PORT;

api.listen(PORT, () => {
  console.log(`Listening port ${PORT}`);
});
