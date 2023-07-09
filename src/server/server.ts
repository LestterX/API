import express from 'express';
import './shared/services/yupTranslations'; //Importa o arquivo de tradução do YUP || Tem que ser acima das rotas
import { router } from './routes';
import 'dotenv/config';

const server = express();

server.use(express.json());
server.use(router);

export { server };