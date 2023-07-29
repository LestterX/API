import { Request, Response } from 'express';
import * as yup from 'yup';
import { validation } from '../../shared/middlewares';
import { StatusCodes } from 'http-status-codes';
import { ICidade } from '../../database/models';

interface IParamsProps {
  id?: number;
}
//interface IBodyProps extends Omit<ICidade, 'id' | 'nome'> { }
interface IBodyProps extends Omit<ICidade, 'id'> { } //Omit o ID e torna opcional

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
  if(Number(req.params.id) === 99999) return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
    errorsDefault: {
      default: 'Registro não encontrado'
    }
  });
  
  return res.status(StatusCodes.NO_CONTENT).send();
};