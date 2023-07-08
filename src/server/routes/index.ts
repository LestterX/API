import { Router } from 'express';
import {StatusCodes} from 'http-status-codes';

const router = Router();

router.get('/', (req, res) => {
  res.status(StatusCodes.OK).json('Olá, DEV!');
});
router.post('/teste', (req, res) => {
  const data = req.body;
  res.status(StatusCodes.OK).json(`Olá, ${data.nome}, gostei do ${data.carro}`);
});

export { router };