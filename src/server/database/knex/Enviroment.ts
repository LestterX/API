import { Knex } from 'knex';
import path from 'path';

export const development: Knex.Config  = {
  client: 'sqlite3',
  useNullAsDefault: true,
  connection: {
    filename: path.resolve(__dirname, '..', '..', '..', '..', 'database.sqlite')
  },
  migrations: {
    directory: path.resolve(__dirname, '..', 'migrations')
  },
  seeds: {
    directory: path.resolve(__dirname, '..', 'seeds')
  },
  pool: {
    afterCreate: (connection: any, done: Function) => {
      connection.run('PRAGMA foreign_keys = ON'); //Ativa as foreign keys
      done(); //Informa que finalizou a execução do comando acima
    }
  }
};
export const test: Knex.Config = {
  ...development, //Diz que são as mesmas coisas de development
  connection: ':memory:', //Porém, com o connection sendo na memória temporária || Irá perder ao reiniciar o servidor
};
export const production: Knex.Config = {
  ...development, //Temporário
};