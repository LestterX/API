import { Router } from 'express';
import { StatusCodes } from 'http-status-codes';
import { CidadesController } from '../controllers';

const router = Router();

router.get('/', (req, res) => {
  res.status(StatusCodes.OK).json({
    message: 'Connexão estabelecida com a API',
  });
});

router.post('/cidades', CidadesController.createValidation, CidadesController.create
);

export { router };