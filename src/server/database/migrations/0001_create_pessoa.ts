import { Knex } from 'knex';
import { ETableNames } from '../ETableNames';


export async function up(knex: Knex) {
  return knex
    .schema
    .createTable('pessoa', table => {
      //bigInt autoIncrement || Primary Key || Diz que o ID será usado com frequência e otimizará
      table.bigIncrements('id').primary().index();
      table.string('nomeCompleto').index().notNullable();
      table.string('email').unique().notNullable();



      //bigInteger pois na cidade é um bigIncrement
      table
        .bigInteger('cidadeId')
        .index()
        .notNullable()
        .references('id')
        .inTable(ETableNames.cidade)

        //Se por algum motivo o ID da cidade que foi selecionada for atualizado, o SQL atualiza aqui automaticamente
        .onUpdate('CASCADE')

        //Impede que apague a cidade sendo utilizada por este campo
        .onDelete('RESTRICT'); //Substituindo por CASCADE, ao apagar uma cidade, será apagado todos os usuários ligados a ela
      // Substituindo por SET NULL, esse valor será setado para vazio quando uma cidade for apagada
      // e mudar .notNullable() para nullable()
      // ou NO ACTION, que irá manter o valor atual, porém, causará também problemas de referência


      table.comment('Table usada para armazenar pessoas do sistema');
    })
    .then(() => {
      // ETableNames.pessoa --> Tem o retorno correto do nome 'pessoa'
      console.log(`# Created table ${ETableNames.pessoa}`);
    });
}


export async function down(knex: Knex) {
  return knex
    .schema
    .dropTable(ETableNames.pessoa)
    .then(() => {
      console.log(`# Dropped table ${ETableNames.pessoa}`);
    });
}
