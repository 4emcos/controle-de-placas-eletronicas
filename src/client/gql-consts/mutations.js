import gql from 'graphql-tag'


export const DELETE_PLACA_EMB =  gql`
mutation delEmb ($idPlaca: ID) {
  deletePlacaEmb (idPlaca : $idPlaca)
}
`;

export const UPDATE_PLACA_EMB = gql`
mutation updatePlaca($idPlaca: ID, $nomePlaca: String, $quantidade: Int, $situacao: String, $local: String, $qtdParaSituacaoBaixa:Int,  $qtdParaSituacaoOk: Int, $regUltimaEdicao: String, $fotoUltimoUser: String){
updatePlacaEmb (
   idPlaca: $idPlaca, 
   nomePlaca: $nomePlaca,
   quantidade: $quantidade, 
   situacao:$situacao, 
   local:$local,
   qtdParaSituacaoBaixa : $qtdParaSituacaoBaixa
   qtdParaSituacaoOk: $qtdParaSituacaoOk
   regUltimaEdicao : $regUltimaEdicao
   fotoUltimoUser : $ fotoUltimoUser

   )
   {
    idPlaca
    nomePlaca
    quantidade
    situacao
    local
    qtdParaSituacaoBaixa
    qtdParaSituacaoOk
    regUltimaEdicao
    fotoUltimoUser
  }         
}
`;

export const CREATE_NEW_PLACA_EMB =  gql`
mutation createPlaca($nomePlaca: String, $quantidade: Int, $situacao: String, $local: String, $qtdParaSituacaoBaixa:Int,  $qtdParaSituacaoOk: Int, $regUltimaEdicao : String, $fotoUltimoUser: String){
createPlacaEmb (
  nomePlaca: $nomePlaca ,
  quantidade: $quantidade, 
  situacao:$situacao, 
  local:$local,
  qtdParaSituacaoBaixa : $qtdParaSituacaoBaixa
  qtdParaSituacaoOk: $qtdParaSituacaoOk
  regUltimaEdicao : $regUltimaEdicao
  fotoUltimoUser : $ fotoUltimoUser
  )
  {
    nomePlaca
    quantidade
    situacao
    local
    qtdParaSituacaoBaixa
    qtdParaSituacaoOk
    regUltimaEdicao
    fotoUltimoUser
  }         
}
`;


export const DELETE_PLACA_WTX =  gql`
mutation delEmb ($idPlaca: ID) {
deletePlacaWentex (idPlaca : $idPlaca)
}
`;

export const UPDATE_PLACA_WTX = gql`
mutation updatePlaca($idPlaca: ID, $nomePlaca: String, $quantidade: Int, $situacao: String, $local: String, $qtdParaSituacaoBaixa:Int,  $qtdParaSituacaoOk: Int, $regUltimaEdicao: String, $fotoUltimoUser: String){
updatePlacaWentex (
   idPlaca: $idPlaca, 
   nomePlaca: $nomePlaca,
   quantidade: $quantidade, 
   situacao:$situacao, 
   local:$local,
   qtdParaSituacaoBaixa : $qtdParaSituacaoBaixa
   qtdParaSituacaoOk: $qtdParaSituacaoOk
   regUltimaEdicao : $regUltimaEdicao
   fotoUltimoUser : $ fotoUltimoUser

   )
   {
    idPlaca
    nomePlaca
    quantidade
    situacao
    local
    qtdParaSituacaoBaixa
    qtdParaSituacaoOk
    regUltimaEdicao
    fotoUltimoUser
  }         
}
`;



export const CREATE_NEW_PLACA_WTX =  gql`
mutation createPlaca($nomePlaca: String, $quantidade: Int, $situacao: String, $local: String, $qtdParaSituacaoBaixa:Int,  $qtdParaSituacaoOk: Int, $regUltimaEdicao : String, $fotoUltimoUser: String){
createPlacaWentex (
  nomePlaca: $nomePlaca ,
  quantidade: $quantidade, 
  situacao:$situacao, 
  local:$local,
  qtdParaSituacaoBaixa : $qtdParaSituacaoBaixa
  qtdParaSituacaoOk: $qtdParaSituacaoOk
  regUltimaEdicao : $regUltimaEdicao
  fotoUltimoUser : $ fotoUltimoUser
  )
  {
    nomePlaca
    quantidade
    situacao
    local
    qtdParaSituacaoBaixa
    qtdParaSituacaoOk
    regUltimaEdicao
    fotoUltimoUser
  }         
}
`;
