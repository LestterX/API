import supertest from 'supertest';
import {server } from '../src/server/server';
import { Knex } from '../src/server/database/knex';

beforeAll(async () => {
  await Knex.migrate.latest();
  await Knex.seed.run(); //Remover se der erro nos testes automáticos
});

afterAll(async () => {
  await Knex.destroy();
});

export const testServer = supertest(server);