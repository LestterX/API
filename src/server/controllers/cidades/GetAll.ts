import { Request, Response } from 'express';
import * as yup from 'yup';
import { validation } from '../../shared/middlewares';
import { StatusCodes } from 'http-status-codes';

interface IQueryProps {
  page?: number,
  limit?: number,
  filter?: string,
}

export const getAllValidation = validation((getSchema) => ({
  query: getSchema<IQueryProps>(yup.object({
    page: yup.number().optional().min(3).moreThan(0),
    limit: yup.number().optional().min(3).moreThan(0),
    filter: yup.string().optional().min(3),
  })),
}));

export const getAll = async (req: Request<{}, {}, {}, IQueryProps>, res: Response) => {
  console.log(req.query);
  
  res.setHeader('access-control-expose-headers', 'x-total-count');
  res.setHeader('x-total-count', 1);

  return res.status(StatusCodes.OK).json([
    {
      id: 1,
      nome: 'Caxias do Sul',
    }
  ]);
};