import { server } from './server/server';

server.listen('3333', () => {
  console.log('Servidor Rodando Em: http://localhost:3333');
});