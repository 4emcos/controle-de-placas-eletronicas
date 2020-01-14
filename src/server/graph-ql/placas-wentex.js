import { gql } from 'apollo-server-express'
import * as dbPlacas from '../databases/database-placas'


export const typeDefs = gql`
    extend type Query {
        placasWentex: [PlacaWentex]
        placaWentex(idPlaca: ID): PlacaWentex
    }
    
    type PlacaWentex {
        idPlaca: ID
        nomePlaca: String
        quantidade: Int
        situacao: String
        local: String
        qtdParaSituacaoBaixa: Int
        qtdParaSituacaoOk: Int
        dataUltimaEdicao: Date
        regUltimaEdicao : String
        fotoUltimoUser : String
    }

    extend type Mutation {
        createPlacaWentex  (idPlaca: ID, nomePlaca: String, quantidade: Int, situacao: String, local: String, 
            qtdParaSituacaoBaixa: Int, qtdParaSituacaoOk: Int, dataUltimaEdicao: Date, regUltimaEdicao : String, fotoUltimoUser: String) : PlacaWentex

        updatePlacaWentex  (idPlaca: ID, nomePlaca: String, quantidade: Int, situacao: String, local: String, 
       qtdParaSituacaoBaixa: Int, qtdParaSituacaoOk: Int, dataUltimaEdicao: Date, regUltimaEdicao : String, fotoUltimoUser: String ) : PlacaWentex

        deletePlacaWentex (idPlaca: ID) : ID
    }
`
export const resolvers = {
    Query: {
        placasWentex: async (args) => dbPlacas.placas_wentex.findAll(),
        placaWentex: async (obj, args, context, info) => dbPlacas.placas_wentex.findByPk(args.id)
    },
    Mutation : {
        createPlacaWentex: async (parent, {nomePlaca, quantidade, situacao, local, qtdParaSituacaoBaixa, qtdParaSituacaoOk, regUltimaEdicao, fotoUltimoUser}, info) =>
            dbPlacas.placas_wentex.create ({
                nomePlaca: nomePlaca,
                quantidade: quantidade,
                situacao: situacao,
                local: local,
                qtdParaSituacaoBaixa : qtdParaSituacaoBaixa,
                qtdParaSituacaoOk : qtdParaSituacaoOk,
               
                regUltimaEdicao: regUltimaEdicao,
                fotoUltimoUser : fotoUltimoUser
                
            }),
        updatePlacaWentex: async (parent, {idPlaca, nomePlaca, quantidade, situacao, local, qtdParaSituacaoBaixa, qtdParaSituacaoOk, regUltimaEdicao, fotoUltimoUser}, info) =>
            dbPlacas.placas_wentex.update({
                nomePlaca: nomePlaca,
                quantidade: quantidade,
                situacao: situacao,
                local: local,
                qtdParaSituacaoBaixa : qtdParaSituacaoBaixa,
                qtdParaSituacaoOk : qtdParaSituacaoOk,
            
                regUltimaEdicao: regUltimaEdicao,
                fotoUltimoUser : fotoUltimoUser
            }, {
                where : {
                    idPlaca: idPlaca
                }
            }),
        deletePlacaWentex: async (parent, {idPlaca}, info) =>
        {
        dbPlacas.placas_wentex.destroy ({
            where : {
                idPlaca : idPlaca
            }
        });
        }
    }
}
