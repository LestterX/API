import { Request, Response } from 'express';

interface ICidade {
  nome: string
}

// req: Request<{}, {}, ICidade> --> Está tipando o REQ para com ICidade 
// O mesmo que const data: ICidade = req.body
export const create = (req: Request<{}, {}, ICidade>, res: Response) => {


  return res.send(req.body.nome);
};