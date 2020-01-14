import { gql } from 'apollo-server-express'
import * as dbUsers from '../databases/database-usuarios'


export const typeDefs = gql`
    extend type Query {
        atualiza_colaboradores: [User]
        atualiza_colaborador(registro: String): User   
    }
    
    type User {
        registro: String
        nome: String
        lista_funcao: String
        foto: String
    }

`
export const resolvers = {
    Query: {
        atualiza_colaboradores: async (args) => dbUsers.atualiza_colaborador.findAll(),
        atualiza_colaborador: async (obj, args, context, info) => dbUsers.atualiza_colaborador.findByPk(args.registro)
    },
}

//
// user(reg: String!): User

