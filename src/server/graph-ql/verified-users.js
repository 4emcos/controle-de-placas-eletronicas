import { gql } from 'apollo-server-express'
import * as dbUsers from '../databases/database-placas'


export const typeDefs = gql`
    extend type Query {
        users_verificados: [User_verified]
        users_verificado(registro: String): User_verified  
    }
    
    type User_verified {
        registro: String
        senha: String
        nome: String
        is_verified: String
        is_super: String
    }

`
export const resolvers = {
    Query: {
        users_verificados: async (args) => dbUsers.users_system.findAll(),
        users_verificado: async (obj, args, context, info) => dbUsers.users_system.findByPk(args.registro)
    },
}



/*
INSERT INTO users_verificados (registro, senha, nome) VALUES ("00115070297", "em1401", "emerson");
INSERT INTO users_verificados (registro, senha, nome) VALUES ("00115016640", "je1401", "jesimiel");
INSERT INTO users_verificados (registro, senha, nome) VALUES ("00115001201", "cl1401", "claudio");
INSERT INTO users_verificados (registro, senha, nome) VALUES ("00115045179", "an1401", "andre");
INSERT INTO users_verificados (registro, senha, nome) VALUES ("00115062170", "el1401", "elisangela");


*/
