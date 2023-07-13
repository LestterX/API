import * as create from './Create'; //IMPORTA TUDO COMO create
import * as getAll from './GetAll';

export const CidadesController = {
  ...create, //SPREAD de tudo dentro do objeto create
  ...getAll,
};