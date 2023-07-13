import { Request, Response } from 'express';
import * as yup from 'yup';
import { validation } from '../../shared/middlewares';
import { StatusCodes } from 'http-status-codes';

interface IParamsProps {
  id?: number;
}
interface IBodyProps{
  nome: string,
}

export const updateByIdValidation = validation((getSchema) => ({
  body: getSchema<IBodyProps>(yup.object({
    nome: yup.string().required().min(3),
  })),
  params: getSchema<IParamsProps>(yup.object({
    id: yup.number().integer().required().moreThan(0),
  })),
}));

export const updateById = async (req: Request<IParamsProps, {}, IBodyProps, {}>, res: Response) => {
  console.log(req.params);
  console.log(req.body);
  
  return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send('Não imprementado');
};