import { Knex } from 'knex';
import { ETableNames } from '../ETableNames';


export async function up(knex: Knex) {
  return knex
    .schema
    .createTable('cidade', table => {
      //bigInt autoIncrement || Primary Key || Diz que o ID será usado com frequência e otimizará
      table.bigIncrements('id').primary().index();
      table.string('nome', 150).checkLength('<=', 150).index().notNullable();

      table.comment('Table usada para armazenar cidades do sistema');
    })
    .then(() => {
      // ETableNames.cidade --> Tem o retorno correto do nome 'cidade'
      console.log(`# Created table ${ETableNames.cidade}`);
    });
}


export async function down(knex: Knex) {
  return knex
    .schema
    .dropTable(ETableNames.cidade)
    .then(() => {
      console.log(`# Dropped table ${ETableNames.cidade}`);
    });
}
