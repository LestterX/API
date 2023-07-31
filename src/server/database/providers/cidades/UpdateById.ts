import { ETableNames } from '../../ETableNames';
import { ICidade } from '../../models';
import { Knex } from '../../knex';


export const updateById = async (id: number, cidade: Omit<ICidade, 'id'>): Promise<void | Error> => {
  try {
    const result = await Knex(ETableNames.cidade)
      .update(cidade)
      .where('id', '=', id);

    if(result > 0) return; //o update() retorna 0 e 1 para erro e sucesso, respectivamente

    return new Error('Erro ao atualizar registro');
  } catch (error) {
    console.log(error);
    return new Error('Erro ao atualizar registro');
  }
};