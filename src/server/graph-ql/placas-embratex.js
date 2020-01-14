import { gql } from 'apollo-server-express'
import * as dbPlacas from '../databases/database-placas'


export const typeDefs = gql`
    extend type Query {
        placasEmbratex: [PlacaEmbratex]
        placaEmbratex(idPlaca: ID): PlacaEmbratex
    }

    scalar Date

    type PlacaEmbratex {
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

    type Mutation {
        createPlacaEmb (nomePlaca: String, quantidade: Int, situacao: String, local: String, 
            qtdParaSituacaoBaixa: Int, qtdParaSituacaoOk: Int, dataUltimaEdicao: Date, regUltimaEdicao : String, fotoUltimoUser: String) : PlacaEmbratex

        updatePlacaEmb (idPlaca: ID, nomePlaca: String, quantidade: Int, situacao: String, local: String, 
            qtdParaSituacaoBaixa: Int, qtdParaSituacaoOk: Int, dataUltimaEdicao: Date, regUltimaEdicao : String, fotoUltimoUser: String) : PlacaEmbratex

        deletePlacaEmb (idPlaca: ID) : ID
    }
`
export const resolvers = {
    Query: {
        placasEmbratex: async (args) => dbPlacas.placas_embratex.findAll(),
        placaEmbratex: async (obj, args, context, info) => dbPlacas.placas_embratex.findByPk(args.idPlaca)
    },
    Mutation : {
        createPlacaEmb: async (parent, {nomePlaca, quantidade, situacao, local, qtdParaSituacaoBaixa, qtdParaSituacaoOk, regUltimaEdicao, fotoUltimoUser}, info) =>
            dbPlacas.placas_embratex.create ({
                nomePlaca: nomePlaca,
                quantidade: quantidade,
                situacao: situacao,
                local: local,
                qtdParaSituacaoBaixa : qtdParaSituacaoBaixa,
                qtdParaSituacaoOk : qtdParaSituacaoOk,
                regUltimaEdicao: regUltimaEdicao,
                fotoUltimoUser : fotoUltimoUser
            }),
        updatePlacaEmb: async (parent, {idPlaca, nomePlaca, quantidade, situacao, local, qtdParaSituacaoBaixa, qtdParaSituacaoOk, regUltimaEdicao, fotoUltimoUser}, info) =>
            dbPlacas.placas_embratex.update({
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
        deletePlacaEmb: async (parent, {idPlaca}, info) =>
        {
        dbPlacas.placas_embratex.destroy ({
            where : {
                idPlaca : idPlaca
            }
        });
        }
    }
}