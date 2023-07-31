import { ETableNames } from '../../ETableNames';
import { ICidade } from '../../models';
import { Knex } from '../../knex';

export const getAll = async (page: number, limit: number, filter: string, id = 0): Promise<ICidade[] | Error> => {
  try {
    const result = await Knex(ETableNames.cidade)
      .select('*')
      .where('id', Number(id)) // Tanto faz ('id', '=', Number(id))
      .orWhere('nome', 'like', `%${filter}%`)

      // do offset ao limit || offset(0) a limit(10)
      .offset((page - 1) * limit)
      .limit(limit);

    if (id > 0 && result.every(item => item.id !== id)) { //Se id for maior que zero e não conter acima
      const resultById = await Knex(ETableNames.cidade)
        .select('*')
        .where('id', '=', id)
        .first();
      
      if(resultById) return [...result, resultById]; //Retorna tudo + o que encontrou agora
    }
    return result;
  } catch (error) {
    console.log(error);
    return new Error('Erro ao consultar os registros');
  }
};