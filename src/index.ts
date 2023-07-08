import { server } from './server/server';

const PORT_FIX = 5050;
server.listen(process.env.PORT || PORT_FIX, () => {
  console.log(`API rodando em http://localhost:${process.env.PORT || PORT_FIX}`);
});