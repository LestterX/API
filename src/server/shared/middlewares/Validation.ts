import { RequestHandler } from 'express';
import { StatusCodes } from 'http-status-codes';
import { AnyObject, Maybe, ObjectSchema, ValidationError } from 'yup';

type TProperty = 'body' | 'header' | 'params' | 'query';

type TGetSchema = <T extends AnyObject | Maybe<AnyObject>>(schema: ObjectSchema<T>) => ObjectSchema<T>;

type TAllSchema = Record<TProperty, ObjectSchema<any>>;

type TGetAllSchemas = (getSchema: TGetSchema) => Partial<TAllSchema>;

type TValidation = (getAllSchemas: TGetAllSchemas) => RequestHandler; //Partial <> --| Não é obrigatório todos os parametros

// export const validation: TValidation = () => {
//   return async (req, res, next) => {
//     console.log('Teste');
//   };
// };
//UMA FUNÇÃO QUE RETORNA OUTRA FUNÇÃO, SEM PRECISAR DO RETURN. Como acima /\
export const validation: TValidation = (GetAllSchemas) => async (req, res, next) => {

  const schemas = GetAllSchemas(schema => schema);
  const errorsResult: Record<string, Record<string, string>> = {};

  Object.entries(schemas).forEach(([key, schema]) => {
    try {
      schema.validateSync(req[key as TProperty], { //validate é uma promise || validateSync não
        abortEarly: false
      });
      // return next();
    } catch (err) {
      const yupError = err as ValidationError;
      const errors: Record<string, string> = {};
      yupError.inner.forEach(error => {
        if (error.path === undefined) return;
        errors[error.path] = error.message;
      });
      errorsResult[key] = errors;
    }
  });
  if (Object.entries(errorsResult).length === 0) {
    return next();
  } else {
    return res.status(StatusCodes.BAD_REQUEST).json({
      errorsResult //errorsResult: errorsResult
    });
  }
};