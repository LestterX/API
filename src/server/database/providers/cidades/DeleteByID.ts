import { ETableNames } from '../../ETableNames';
import { Knex } from '../../knex';


export const deleteById = async (id: number): Promise<void | Error> => {
  try {
    const result = await Knex(ETableNames.cidade)
      .where('id', '=', id)
      .del();
    if(result > 0) return; //o del() retorna 0 e 1 para erro e sucesso, respectivamente

    return new Error('Erro ao apagar registro');
  } catch (error) {
    console.log(error);
    return new Error('Erro ao apagar registro');
  }
};