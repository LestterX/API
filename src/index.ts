import {server} from './server/server'

server.listen('3333', () => {
    console.log('App rodando em: http://localhost:3333')
})