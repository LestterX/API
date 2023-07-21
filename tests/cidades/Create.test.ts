import { testServer } from '../jest.setup';
import { StatusCodes } from 'http-status-codes';

describe('Cidades - Create', () => { //Descreve o cenário

  it('Cria Registro', async () => { //Caso de teste (Cenário de teste)
    const res1 = await testServer //Tem que ter o await para o res1 ser do tipo request.Response
      .post('/cidades')
      .send({ nome: 'Caxias do Sul' });

    expect(res1.statusCode).toEqual(StatusCodes.CREATED); //statusCode !== StatusCodes
    expect(typeof res1.body).toEqual('number'); //Diz que o tipo de resposta do body tem que ser number
  });

  it('Tenta criar um registro com nome muito curto', async () => { //Caso de teste (Cenário de teste)
    const res1 = await testServer //Tem que ter o await para o res1 ser do tipo request.Response
      .post('/cidades')
      .send({ nome: 'Ca' });

    expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST); //statusCode !== StatusCodes
    expect(res1.body).toHaveProperty('errorsResult.body.nome'); //Se tem no body a propriedade de erros
  });

});