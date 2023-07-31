import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import * as yup from 'yup';
import { ICidade } from '../../database/models';

import { CidadesProvider } from '../../database/providers/cidades';
import { validation } from '../../shared/middlewares';

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
  
  if(!req.params.id){
    return res.status(StatusCodes.BAD_REQUEST).json({
      errors: {
        default: 'O parâmetro "Id" precisa ser informado'
      }
    });
  }

  const result = await CidadesProvider.updateById(req.params.id, req.body);
  if(result instanceof Error){
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: {
        default: result.message
      }
    });
  }
  
  return res.status(StatusCodes.NO_CONTENT).json(result);
};