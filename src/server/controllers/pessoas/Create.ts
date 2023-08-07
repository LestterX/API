import { StatusCodes } from 'http-status-codes';
import { Request, Response } from 'express';
import * as yup from 'yup';

import { PessoasProvider } from '../../database/providers/pessoas';
import { validation } from '../../shared/middlewares';
import { IPessoa } from '../../database/models';

interface IBodyProps extends Omit<IPessoa, 'id'> { } //Omit o ID e torna opcional

export const createValidation = validation((getSchema) => ({
  body: getSchema<IBodyProps>(yup.object({
    email: yup.string().required().email(),
    cidadeId: yup.number().integer().required(),
    nomeCompleto: yup.string().required().min(3),
  })),
}));


export const create = async (req: Request<{}, {}, IBodyProps>, res: Response) => { //Add ASYNC
  console.log(req.body);
  const result = await PessoasProvider.create(req.body);

  if(result instanceof Error){
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: {
        default: result.message
      }
    });
  }

  return res.status(StatusCodes.CREATED).json(result);
};