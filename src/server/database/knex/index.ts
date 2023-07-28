import knex from 'knex'; //Tudo minúsculo
import { development, production, test } from './Enviroment';


const getEnviroment = () => {
  // PASSAR POR ESLINT EM rules --> indent
  // ,
  // {
  //   "SwitchCase": 1
  // }
  //PARA NÃO DAR ERRO DE 4 ESPAÇAMENTOS NO case
  switch (process.env.NODE_ENV) {
    case 'production': return production;
    case 'test': return test;

    default: return development;
  }
};


// Primeiro é maiúsculo
//Segundo é minúsculo
export const Knex = knex(getEnviroment());