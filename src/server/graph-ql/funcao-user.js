import { gql } from 'apollo-server-express'
import * as dbUsers from '../databases/database-usuarios'


export const typeDefs = gql`
    extend type Query {
        lista_funcoes: [Funcao]
        lista_funcao(id_funcao: String): Funcao   
    }
    
    type Funcao {
        id_funcao: String
        nome_funcao: String
        id_permissao: String
    }

`
export const resolvers = {
    Query: {
        lista_funcoes: async (args) => dbUsers.lista_funcao.findAll(),
        lista_funcao: async (obj, args, context, info) => dbUsers.lista_funcao.findByPk(args.id_funcao)
    },
}