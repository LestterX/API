import { Request, Response } from 'express';
import * as yup from 'yup';
import { validation } from '../../shared/middlewares';
import { StatusCodes } from 'http-status-codes';

interface ICidade {
  nome: string,
}
//yup.SchemaOf<ICidade> agora é yup.ObjectSchema<ICidade>
//Serve para o YUP seguir as variáveis da interface, estando TIPADO também
//Não precisa utilizar object().shape({}); - Pode ser apenas object({});
//Se na interface for obrigatório, no schema também tem que ser com .required()
// const bodyValidation: yup.ObjectSchema<ICidade> = yup.object({
//   nome: yup.string().required().min(3),
//   estado: yup.string().required().min(3),
// });
// export const createBodyValidator: RequestHandler = async (req, res, next) => { //para não precisar TIPAR - Também pode usar nas rotas
//   try {//Valida o req.body de acordo com o schema validatedData
//     await bodyValidation.validate(req.body, {//Add AWAIT
//       abortEarly: false //Mostra a quantidade de erro, ao invés da mensagem dizendo o que foi
//     });
//     return next(); // Segue do createBodyValidator para o create lá nas rotas: router.post('/cidades'
//   } catch (err) {
//     const yupError = err as yup.ValidationError; //Cria uma constante com o erro de validação do YUP
//     //Cria um objeto com chave<string> e valor<string>
//     const errors: Record<string, string> = {};
//     yupError.inner.forEach(error => { //yupError.inner seleciona a lista de erros que ocorreram
//       if (error.path === undefined) return; //Aborta se não houver error.path
//       errors[error.path] = error.message; //Adiciona no objeto chave: valor <string, string>
//     });
//     return res.status(StatusCodes.BAD_REQUEST).json({
//       errors //errors: errors
//     });
//   }
// };

// export const createFilterValidator: RequestHandler = async (req, res, next) => { //para não precisar TIPAR - Também pode usar nas rotas
//   try {//Valida o req.body de acordo com o schema validatedData
//     await queryValidation.validate(req.query, {//Add AWAIT
//       abortEarly: false //Mostra a quantidade de erro, ao invés da mensagem dizendo o que foi
//     });
//     return next(); // Segue do createBodyValidator para o create lá nas rotas: router.post('/cidades'
//   } catch (err) {
//     const yupError = err as yup.ValidationError; //Cria uma constante com o erro de validação do YUP
//     //Cria um objeto com chave<string> e valor<string>
//     const errors: Record<string, string> = {};
//     yupError.inner.forEach(error => { //yupError.inner seleciona a lista de erros que ocorreram
//       if (error.path === undefined) return; //Aborta se não houver error.path
//       errors[error.path] = error.message; //Adiciona no objeto chave: valor <string, string>
//     });
//     return res.status(StatusCodes.BAD_REQUEST).json({
//       errors //errors: errors
//     });
//   }
// };


export const createValidation = validation((getSchema) => ({
  body: getSchema<ICidade>(yup.object({
    nome: yup.string().required().min(3),
  })),
}));


// req: Request<{}, {}, ICidade> --> Está TIPANDO o REQ para com ICidade 
// O mesmo que const data: ICidade = req.body
export const create = async (req: Request<{}, {}, ICidade>, res: Response) => { //Add ASYNC
  //let validatedData: ICidade | undefined = undefined; //Cria uma variável que é igual a interface ICidade ou undefined
  return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send('Não imprementado');
};