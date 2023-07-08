import { Request, Response } from 'express';
import * as yup from 'yup';

interface ICidade {
  nome: string,
}

//yup.SchemaOf<ICidade> agora é yup.ObjectSchema<ICidade>
//Serve para o YUP seguir as variáveis da interface, estando TIPADO também
//Não precisa utilizar object().shape({}); - Pode ser apenas object({});
//Se na interface for obrigatório, no schema também tem que ser com .required()
const bodyValidation: yup.ObjectSchema<ICidade> = yup.object({ 
  nome: yup.string().required().min(3),
});

// req: Request<{}, {}, ICidade> --> Está TIPANDO o REQ para com ICidade 
// O mesmo que const data: ICidade = req.body
export const create = async (req: Request<{}, {}, ICidade>, res: Response) => { //Add ASYNC
  let validatedData: ICidade | undefined = undefined; //Cria uma variável que é igual a interface ICidade ou undefined
  try {//Valida o req.body de acordo com o schema validatedData
    validatedData = await bodyValidation.validate(req.body); //Add AWAIT
  } catch (error) {
    const yupError = error as yup.ValidationError; //Cria uma constante com o erro de validação do YUP
    return res.json({
      errors: {
        default: yupError.message, //REtorna a mensagem de erro gerada pelo YUP
      }
    });
  }


  console.log(validatedData);
  return res.send(validatedData);
};