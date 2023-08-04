import { Knex } from './server/database/knex';
import { server } from './server/server';

const PORT_FIX = 5050;

const startServer = () => {
  server.listen(process.env.PORT || PORT_FIX, () => {
    console.log(`API rodando em http://localhost:${process.env.PORT || PORT_FIX}`);
  });
};





/*
  Quando manda para PRODUÇÃO, as MIGRATIONS não são geradas automáticamente. Logo, o servidor não encontra
o banco de dados. Para resolver isso fazemos o código abaixo, onde:

Só vai executar o Knex.migrate.latest() quando IS_LOCAL_HOST não for true, e se for, será executado diretamente
o startServer()

Isso para não ficar gerando as migrations o tempo todo enquanto estiver em modo de desenvolvimento

Logo, para produção, IS_LOCAL_HOST=false e NODE_ENV=production
*/

if (process.env.IS_LOCAL_HOST !== 'true') {
  Knex.migrate
    .latest()
    .then(() => {
      Knex.seed.run()
        .then(() => startServer())
        .catch(console.log);
    })
    .catch(console.log);
} else {
  startServer();
}