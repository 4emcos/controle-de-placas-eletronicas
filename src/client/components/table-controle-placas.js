import React, {useState, useEffect } from 'react';
import MaterialTable, {MTableEditRow } from 'material-table';
import gql from 'graphql-tag'
import {useMutation, useQuery} from '@apollo/react-hooks';
import * as Ibage from '../../userExample'
import {ButtonToolbar, Modal, Form, Col, Row, Container} from 'react-bootstrap'
import {StatusGood,  StatusWarning, CircleInformation, SubtractCircle} from 'grommet-icons';
import {Grommet , FormField, Button, TextInput, Text, Heading, Image} from 'grommet';
import '../style/table-controle-placa.css'
import ButtonBoots from 'react-bootstrap/Button'
import {Paper} from '@material-ui/core'
import RemoveCircleOutlineIcon from '@material-ui/icons/RemoveCircleOutline';
import { parse } from 'date-fns';

var userAtual 
var verifiedIsOn = false
var unidade 


const DELETE_PLACA_EMB =  gql`
        mutation delEmb ($idPlaca: ID) {
          deletePlacaEmb (idPlaca : $idPlaca)
        }
        `;

const UPDATE_PLACA_EMB = gql`
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

const CREATE_NEW_PLACA_EMB =  gql`
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


const DELETE_PLACA_WTX =  gql`
  mutation delEmb ($idPlaca: ID) {
    deletePlacaWentex (idPlaca : $idPlaca)
  }
  `;

const UPDATE_PLACA_WTX = gql`
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

      

const CREATE_NEW_PLACA_WTX =  gql`
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

function ModificaValoresDeOKENivelBaixo(props) {
  const [updatePlaca, {dados}] = useMutation(!unidade.indexOf("placasEmbratex") ? UPDATE_PLACA_EMB : UPDATE_PLACA_WTX)
  const [modalState, setModalState] = useState();
  const [valueOK, setValueOK] = useState();
  const [valueNvBaixo, setValueNvBaixo] = useState(0);
  const GET_ALL_BOARDS =  gql`

  query get_board{ 
    ${unidade[0]}{
      idPlaca
      nomePlaca
      quantidade
      situacao
      local
      qtdParaSituacaoBaixa
      qtdParaSituacaoOk
      dataUltimaEdicao
      regUltimaEdicao
      fotoUltimoUser
    }
  }
  `;

  const {refetch} = useQuery(GET_ALL_BOARDS)

  const handleClick = _ => {
    updatePlaca({
      variables: {
        idPlaca  : parseInt(props.data.idPlaca),
        nomePlaca : props.data.nomePlaca,
        quantidade : parseInt(props.data.quantidade),
        situacao : props.data.situacao,
        local : props.data.local,
        qtdParaSituacaoBaixa: parseInt(valueNvBaixo),
        qtdParaSituacaoOk: parseInt(valueOK),
        regUltimaEdicao: userAtual.atualiza_colaborador.registro,
        fotoUltimoUser: userAtual.atualiza_colaborador.foto
    }}).then(() => {
    
      refetch(GET_ALL_BOARDS)
      setModalState(props.onHide)
    })

  }

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
            Alteração de situação da placa {props.data.nomePlaca}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>

            <Form >
            <Row>
              <Col>
              <Form.Group controlId="formOk">
                <Form.Label> Quantidade :</Form.Label>
                <Form.Control required type="numeric" onInput = {(e) => setValueOK(e.target.value)}/>
                <Form.Text className="text-muted">
                  Quantidade de placas para a situação ficar ok
                </Form.Text>
              </Form.Group> 
              </Col>
              <Col>
             
              </Col>
            </Row>
        
            </Form>
            <ButtonBoots 
              variant="primary" 
              type="aa"
              onClick ={handleClick}
              >
                Salvar
              </ButtonBoots>
      </Modal.Body>
      <Modal.Footer>
        <ButtonBoots onClick={props.onHide}>Close</ButtonBoots>
      </Modal.Footer>
    </Modal>
  );
}


function getNomeAndSobrenome(nome) {
  var list = []
  if(nome != null){
    list[0] = nome.toString().split(' ')[0] 
    list[1] = nome.toString().split(' ')[1] 
    return `${list[0]} ${list[1]}`
  }  
  else { return null}
}



function GetVerfiedUsers(props) {
  const [showModal, setShowModal] = useState (false);
  const [reg, setReg ] = useState ('a');
  const [value, setValue] = useState();
  const [nome, setNome]  = useState('');
  const [funcao, setFuncao] = useState ('');
  const [foto, setFoto] = useState('');
  const [nomeFuncao, setNomeFuncao] = useState();
  const [verifiedUser, setVerifiedUser] = useState();
  const [senha, setSenha] = useState();

  const GET_USER = gql`
      
    query usersData($idFuncao : String, $reg: String) { 
      lista_funcao (id_funcao : $idFuncao){
        nome_funcao
        }

        atualiza_colaborador(registro: ${reg}){
          registro
          nome
          lista_funcao
          foto
      }

        users_verificado(registro: $reg){
          senha
          registro
          nome
        }
    }    
  `;

  const {loading, error, refetch, data} = useQuery(GET_USER,{
          variables : {
            idFuncao : funcao,
            reg : verifiedUser
          }
          })


  const close = () => props.onHide
  
  useEffect (() => { 

    if (data != undefined && data.atualiza_colaborador != null) {
        setFuncao(data.atualiza_colaborador.lista_funcao)
        setVerifiedUser(value)

        refetch().then( (e) => setNomeFuncao(e.data.lista_funcao != null ? e.data.lista_funcao.nome_funcao : '') )
        
        console.log(data)
        console.log(verifiedUser)
        handleLogon()
        setNome(data.atualiza_colaborador.nome)
        //setFuncao(data.atualiza_colaborador.lista_funcao)
        setFoto(data.atualiza_colaborador.foto)  
        //
  
    } else { 
      
      setNome(null)
      setFuncao(null)
      setNomeFuncao(null)
      setFoto(Ibage.img) 
    }

  },[data])


  function handleLogon () { 
    if (data.users_verificado != null){
      userAtual = data
      verifiedIsOn = true
      setShowModal(props.onHide)
    } else {
      verifiedIsOn = false
    }
    
  }

  function handleLogout() {
    setNome('');
    setFuncao('');
    setFoto(Ibage);
    setReg(null)
    setValue(null)
    setVerifiedUser (null)
    verifiedIsOn = false
  }
  

  return (

    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
            Alteração de situação da placa
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
      <Container id = "user-container-modal">
                <Row>
                  <Col
                  id = "item-user-modal"
                   xs> <Image id = 'ibage-modal' variant="center" src= {`data:image/jpg;base64,${foto}`} style={{ width: '5.6rem' ,  height: '7rem' }} /></Col>
                  
                  <Col
                  id = "item-user-modal"
                   xs={{ order: 1 }}> 
  
  
                <FormField id ="text-input-modal" label="Login :" htmlFor="text-input-modal" {...props} >
                  <TextInput
                      placeholder="registro"
                      type = "text" 
                      id="text-input-modal"
                      
                      onChange= {e => 
                        {
                          switch (e.target.value.length) {
                              case 5:
                                setValue(`001150${e.target.value}`)
                                
                              break;
  
                              case 3:
                                setValue(`00115000${e.target.value}`)
                                
                              break;
  
                              case 4:
                                setValue(`0011500${e.target.value}`)
                                
                              break;
  
                              case 6:
                                setValue(`00115${e.target.value}`)
                                
                              break;
                          }         
                        }}
                        onKeyDown = {(e) => {
                          if(e.key == 'Enter') {
                             setReg(`"${value}"`)
                            setVerifiedUser(value)
                            }
                      }}
                        
                        />
                  
                </FormField>
                    
                <Row
                    id = "butoes-entrar-sair-modal"
                    >
                  
                    <Button
                      primary 
                      color = {"#00739D"}
                      label="Entrar" 
                      onClick = {() =>{
                         
                             setReg(`"${value}"`)
                            setVerifiedUser(value)
                       
                      }}
                    
                     // onClick = {}
                      />

                    <Button
                    primary 
                    color = {"#00739D"}
                    onClick = {() => handleLogout()}
                    label="Sair" 
                    />
                    
                    </Row>
                  </Col>
                 
                  <Col 
                  id = "item-user-modal"
                 
                  xs={{ order: 2 }}> 
                    <Heading 
                    id = "nome-user-modal"
                    size = "xsmall"
                    alignSelf = "center"
                    >{getNomeAndSobrenome(nome)}</Heading > 
                    <Text
                    id = "funcao-user-modal"
                    >{nomeFuncao != null ? nomeFuncao.toString().trim() : ''}
                    </Text>
                  </Col>
                </Row>
              </Container>

      

      </Modal.Body>
      <Modal.Footer>
        <ButtonBoots onClick={props.onHide}>Close</ButtonBoots>
      </Modal.Footer>
    </Modal>
   
  );
}


function RenderAlterarSituacoesBtn(props) {
  const [modalShow, setModalShow] = useState();
  

  return (
        <ButtonToolbar>
          <ButtonBoots
          id = {`idBtn${props.idBtn}`}
          variant="primary" 
          onClick={() => setModalShow(true)}
          > 
          Alterar Situação
          </ButtonBoots>

          <ModificaValoresDeOKENivelBaixo
            unidadeatual = {props.unidadeAtual}
            data = {props.data}
            user = {userAtual}
            show={modalShow}
            onHide={() => setModalShow(false)}
          />

        </ButtonToolbar>
    ); 
  }


function TableControleDePlacas(props) {
    
    

    const [isEditable, setIsEditable] = useState();

    const [foto, setFoto] = useState();
    const [reg, setReg] = useState();
    const [unidadeAtual, setUnidadeAtual] = useState(props.unidade);

    const [modalShow, setModalShow] = useState();
    
    const GET_ALL_BOARDS =  gql`

    query get_board($idPlaca : ID) { 
      ${unidadeAtual[0].toString()} {
        idPlaca
        nomePlaca
        quantidade
        situacao
        local
        qtdParaSituacaoBaixa
        qtdParaSituacaoOk
        dataUltimaEdicao
        regUltimaEdicao
        fotoUltimoUser
      }

      ${unidadeAtual[1].toString()} (idPlaca : $idPlaca) { 
        situacao
      }
    }
    `;


    const [newPlaca, {lotOfData}] = useMutation(!unidadeAtual.indexOf("placasEmbratex") ? CREATE_NEW_PLACA_EMB : CREATE_NEW_PLACA_WTX)
    const [updatePlaca, {dados}] = useMutation(!unidadeAtual.indexOf("placasEmbratex") ? UPDATE_PLACA_EMB : UPDATE_PLACA_WTX)
    const [delEmb, {id}] = useMutation(!unidadeAtual.indexOf("placasEmbratex") ? DELETE_PLACA_EMB : DELETE_PLACA_WTX);


    const {loading, error, refetch, data} = useQuery(GET_ALL_BOARDS , {
      variables : {idPlaca : 1}
    });


    const tableRef = React.createRef();
    
    const [columns, setColumns] = useState ({ 
      coluna: [
        { title: 'Placas', field: 'nomePlaca', editable: 'never', 
        render: rowData => 
        (
          <b> {rowData.nomePlaca} </b>
        ) },
        { title: 'Quantidade Atual', field: 'quantidade',  type: 'numeric',
        render: rowData => 
        (
          <b> {rowData.quantidade} </b>
        )
        },
        { title: "Quantidade necessária", field: 'qtdParaSituacaoOk',  editable: 'never', type: 'numeric',
        render: rowData => 
        {
          if (rowData != undefined && rowData.qtdParaSituacaoOk != undefined){
            return (
              <b> {rowData.qtdParaSituacaoOk} </b>
            )
          }
        }
       },

        { title: 'Situacao', field: 'situacao',  editable: 'never' ,  defaultSort: 'asc', hidden : false,
        render: rowData =>  
        ( 
          // 
            rowData != undefined ? rowData.situacao == 'ok' ? <StatusGood color= 'green' /> : rowData.quantidade < 0 ? <StatusWarning color='#f5090d'/>: rowData.quantidade == 0 ? <SubtractCircle  color= '#fc5800'/> : <CircleInformation color = {'#514000'}/> : ''
        )
        },
        
        { title: 'Quantidade para Saldo Ok', field: 'saldoOk',  type: 'numeric', hidden: true},

        { title: 'Alterar Situação', field: 'setSituacao', hidden: true , editable: 'never',
        render: rowData => {
          if (rowData != undefined ) {
            
            return( 
              <>
              <RenderAlterarSituacoesBtn unidadeAtual={unidadeAtual} idBtn = {rowData.tableData.id} data = {rowData} userAtual = {props} /> 
              </>
            ) 
          } else return ''
        }
       
        },

        
        {
          title: 'Usuário',
          field: 'fotoUltimoUser',
          editable: 'never',
          render: rowData =>  
            (
              <img
                style={{ height: 36, borderRadius: '50%' }}
                src={`data:image/png;base64,${rowData == undefined ? '' : rowData.fotoUltimoUser }`}
              />
            )
        },
        { title: 'Ultima atualização', field: 'dataUltimaEdicao',  type: 'datetime' , editable: 'never'},
       
      ],
    })

    const [state, setState] = useState({
      data : [],
    });
    
    const editableForUnverifiedUsers = {
      onRowUpdate: (newData, oldData) =>
        new Promise(resolve => {
          setTimeout(() => {
            resolve();
            if (oldData) {
              updatePlaca({
                variables: {
                  idPlaca  : newData.idPlaca,
                  nomePlaca : newData.nomePlaca,
                  quantidade : parseInt(newData.quantidade),
                  situacao : newData.situacao,
                  local : newData.local,
                  qtdParaSituacaoBaixa: newData.qtdParaSituacaoBaixa,
                  qtdParaSituacaoOk: newData.qtdParaSituacaoOk,
                  regUltimaEdicao: reg,
                  fotoUltimoUser: foto
    
              }}).then(() => refetch({query: GET_ALL_BOARDS}))
      
              setState(prevState => {
                const data = [...prevState.data];
                data[data.indexOf(oldData)] = newData
                data[data.indexOf(newData)].fotoUltimoUser = foto
                return { ...prevState, data };
              })
             }
    
          }, 300);
        }),
      }

    const editableForVerifiedUsers = {
      
      onRowAdd: newData =>
        new Promise(resolve => {
          setTimeout(() => {
                
                resolve(); 
                newPlaca({
                  variables: {
                    nomePlaca : newData.nomePlaca,
                    quantidade : parseInt(newData.quantidade),
                    situacao : 'ok',
                    local : `${props.local}`,
                    qtdParaSituacaoBaixa: 3,
                    qtdParaSituacaoOk: 2,
                    regUltimaEdicao: userAtual.atualiza_colaborador.registro,
                    fotoUltimoUser: userAtual.atualiza_colaborador.foto
                }}).then(() => refetch({query: GET_ALL_BOARDS}))

                setState(prevState => {
                  const data = [...prevState.data];
                  data.push(newData);
                  return { ...prevState, data };
                });
    
              }, 300);
            }),
    
      onRowUpdate: (newData, oldData) =>
        new Promise(resolve => {
          setTimeout(() => {
            console.log(newData)
            resolve();
            if (oldData) {
              updatePlaca({
                variables: {
                  idPlaca  : newData.idPlaca,
                  nomePlaca : newData.nomePlaca,
                  quantidade : parseInt(newData.quantidade),
                  situacao : newData.situacao,
                  local : newData.local,
                  qtdParaSituacaoBaixa: newData.qtdParaSituacaoBaixa,
                  qtdParaSituacaoOk: newData.qtdParaSituacaoOk,
                  regUltimaEdicao: userAtual.atualiza_colaborador.registro,
                  fotoUltimoUser: userAtual.atualiza_colaborador.foto
    
              }}).then(() => refetch({query: GET_ALL_BOARDS}))

              setState(prevState => {
                const data = [...prevState.data];
                data[data.indexOf(oldData)] = newData;
                data[data.indexOf(newData)].fotoUltimoUser = userAtual.atualiza_colaborador.foto
                return { ...prevState, data };
              })
             }
    
          }, 300);
        }),
    
    
      onRowDelete: oldData =>
        new Promise(resolve => {
          setTimeout(() => {
              resolve();
              delEmb({variables: {idPlaca : oldData.idPlaca}}).then(() => refetch({query: GET_ALL_BOARDS}))
              setState(prevState => {
                const data = [...prevState.data];
                data.splice(data.indexOf(oldData), 1);
                return { ...prevState, data };
              });
          }, 300);
        })}

    function requests() {
      if(data != undefined){

        if (!unidadeAtual.indexOf('placasWentex')) {
          var tempList = []
          for (let i = 0; i < data.placasWentex.length; i++) {
            if (data.placasWentex[i].local == `${props.local}`) {
              tempList.push(data.placasWentex[i])
              //data.placasEmbratex.splice(i) 
            }         
        }
        } else {
          var tempList = []
          for (let i = 0; i < data.placasEmbratex.length; i++) {
            if (data.placasEmbratex[i].local == `${props.local}`) {
              tempList.push(data.placasEmbratex[i])
              //data.placasEmbratex.splice(i) 
            }         
          }

        }
        
        setState({data: tempList})
      }
    }


    function modifyColumns() {
      if(verifiedIsOn){
        setColumns( prevState => {
          const data = [...prevState.coluna];
          data[5].hidden = false
          data[0].editable = 'always'
          return {...prevState, data}
        })
      } else {
        setColumns( prevState => {
          const data = [...prevState.coluna];
          data[5].hidden = true
          data[0].editable = 'never'
          return {...prevState, data}
        })
      }
    }

    useEffect (() => {
      setUnidadeAtual(props.unidade)
      unidade = props.unidade
      verifiedIsOn = false
      modifyColumns();
    },[props.unidade])


    useEffect( () => {
      requests();
    },[data])


    useEffect (() => {
      verifiedIsOn = false
      userAtual = null
      setFoto(props.userImg)
      setReg(props.userReg)
      setIsEditable(props.user)

    },[props.userReg])


    useEffect (() => {
      if (userAtual != null) {
        modifyColumns();
        setIsEditable(verifiedIsOn)
        setFoto(userAtual.userImg)
        setReg(userAtual.userReg)  
      }
      else {
        modifyColumns()
      }
    },[verifiedIsOn])

    

    return (
      <>
        <Paper elevation = {3}>
        <MaterialTable
            title= {props.local == "Cardas" ? `Controle de placas das ${props.local} ` : props.local == "Fuso" ? `Controle de placas do ${props.local}` : `Controle de placas da ${props.local}`  }
            columns={columns.coluna}
            data={state.data}
            tableRef={tableRef}
          
            options = {{
                pageSize : 9,
                pageSizeOptions : [9, 10, 15, 30, 50, 100],
                rowStyle: rowData => ({
                  backgroundColor: rowData.situacao == 'ok' && rowData.quantidade != 0 ? '#eaf4de' :  rowData.quantidade === 0 ?  '#ffebb2' :  rowData.quantidade > 0 ? '#fbefca' :  '#fed0d2' 
                })
            }}
            localization={{
                pagination: {
                    labelDisplayedRows: '{from}-{to} de {count}'
                },
                toolbar: {
                    nRowsSelected: '{0} linha(s) selecionadas',
                    searchTooltip: "Pesquisar",
                    searchPlaceholder: "Pesquisar"
                },
                header: {
                    actions: 'Ações'
                },
                body: {
                    emptyDataSourceMessage: 'Sem dados',
                    filterRow: {
                        filterTooltip: 'Filtro'
                    },
                    editRow: {
                        saveTooltip : "Salvar",
                        cancelTooltip: "Cancelar",
                        deleteText : "Deseja realmente excluir a placa ?"
                    },
                    addTooltip: "Adicionar Placa",
                    deleteTooltip: "Deletar Placa",
                    editTooltip: "Editar dados",


                    
                }
            }}

              editable={isEditable == true ? verifiedIsOn == true ? editableForVerifiedUsers : editableForUnverifiedUsers  : null }
              actions={[
                {
                  icon: 'settings',
                  tooltip: 'Editar Tabela',
                  isFreeAction: true,
                  onClick : () => {setModalShow(true)}
                
                }
              ]}

          />
          </Paper>

          <GetVerfiedUsers
          show={modalShow}
          onHide={(e) => {
            setModalShow(false)
          }}
        />
        </>
    );
  }

export default TableControleDePlacas;






/*
INSERT INTO `placas_wentex` (`nomePlaca`,`quantidade`,`situacao`, `local`, `qtdParaSituacaoBaixa` , `qtdParaSituacaoOk`, `regUltimaEdicao`, `fotoUltimoUser` ) VALUES ('BSB1', 2 , 'ok', 'Abertura','4','2', '70297', 'NULL');
INSERT INTO `placas_wentex` (`nomePlaca`,`quantidade`,`situacao`, `local`, `qtdParaSituacaoBaixa` , `qtdParaSituacaoOk`, `regUltimaEdicao`, `fotoUltimoUser` ) VALUES ('IKR2', 2 , 'ok', 'Abertura','4','2','70297', 'NULL');
INSERT INTO `placas_wentex` (`nomePlaca`,`quantidade`,`situacao`, `local`, `qtdParaSituacaoBaixa` , `qtdParaSituacaoOk`, `regUltimaEdicao`, `fotoUltimoUser` ) VALUES ('RBT5', 2 , 'ok', 'Abertura','4','2', '70297', 'NULL');
INSERT INTO `placas_wentex` (`nomePlaca`,`quantidade`,`situacao`, `local`, `qtdParaSituacaoBaixa` , `qtdParaSituacaoOk`, `regUltimaEdicao`, `fotoUltimoUser` ) VALUES ('RBT6', 2 , 'ok', 'Abertura','4','2', '70297', 'NULL');
INSERT INTO `placas_wentex` (`nomePlaca`,`quantidade`,`situacao`, `local`, `qtdParaSituacaoBaixa` , `qtdParaSituacaoOk`, `regUltimaEdicao`, `fotoUltimoUser` ) VALUES ('RBT7', 2 , 'ok', 'Abertura','4','2', '70297', 'NULL');
INSERT INTO `placas_wentex` (`nomePlaca`,`quantidade`,`situacao`, `local`, `qtdParaSituacaoBaixa` , `qtdParaSituacaoOk`, `regUltimaEdicao`, `fotoUltimoUser` ) VALUES ('RICK-5D', 2 , 'ok', 'Abertura','4','2', '70297', 'NULL');
INSERT INTO `placas_wentex` (`nomePlaca`,`quantidade`,`situacao`, `local`, `qtdParaSituacaoBaixa` , `qtdParaSituacaoOk`, `regUltimaEdicao`, `fotoUltimoUser` ) VALUES ('RICK-6A', 2 , 'ok', 'Abertura','4','2', '70297', 'NULL');
INSERT INTO `placas_wentex` (`nomePlaca`,`quantidade`,`situacao`, `local`, `qtdParaSituacaoBaixa` , `qtdParaSituacaoOk`, `regUltimaEdicao`, `fotoUltimoUser` ) VALUES ('RICK-5A', 2 , 'ok', 'Abertura','4','2', '70297', 'NULL');
INSERT INTO `placas_wentex` (`nomePlaca`,`quantidade`,`situacao`, `local`, `qtdParaSituacaoBaixa` , `qtdParaSituacaoOk`, `regUltimaEdicao`, `fotoUltimoUser` ) VALUES ('KSZ3-P1', 2 , 'ok', 'Abertura','4','2', '70297', 'NULL');
INSERT INTO `placas_wentex` (`nomePlaca`,`quantidade`,`situacao`, `local`, `qtdParaSituacaoBaixa` , `qtdParaSituacaoOk`, `regUltimaEdicao`, `fotoUltimoUser` ) VALUES ('KSZ3-P2', 2 , 'ok', 'Abertura','4','2', '70297', 'NULL');
INSERT INTO `placas_wentex` (`nomePlaca`,`quantidade`,`situacao`, `local`, `qtdParaSituacaoBaixa` , `qtdParaSituacaoOk`, `regUltimaEdicao`, `fotoUltimoUser` ) VALUES ('KSZ4-P1', 2 , 'ok', 'Abertura','4','2', '70297', 'NULL');
INSERT INTO `placas_wentex` (`nomePlaca`,`quantidade`,`situacao`, `local`, `qtdParaSituacaoBaixa` , `qtdParaSituacaoOk`, `regUltimaEdicao`, `fotoUltimoUser` ) VALUES ('KSZ4-P2', 2 , 'ok', 'Abertura','4','2', '70297', 'NULL');
INSERT INTO `placas_wentex` (`nomePlaca`,`quantidade`,`situacao`, `local`, `qtdParaSituacaoBaixa` , `qtdParaSituacaoOk`, `regUltimaEdicao`, `fotoUltimoUser` ) VALUES ('SSB-4 BDT', 2 , 'ok', 'Abertura','4','2', '70297', 'NULL');
INSERT INTO `placas_wentex` (`nomePlaca`,`quantidade`,`situacao`, `local`, `qtdParaSituacaoBaixa` , `qtdParaSituacaoOk`, `regUltimaEdicao`, `fotoUltimoUser` ) VALUES ('MST', 2 , 'ok', 'Abertura','4','2', '70297', 'NULL');
INSERT INTO `placas_wentex` (`nomePlaca`,`quantidade`,`situacao`, `local`, `qtdParaSituacaoBaixa` , `qtdParaSituacaoOk`, `regUltimaEdicao`, `fotoUltimoUser` ) VALUES ('GMB-1B', 2 , 'ok', 'Abertura','4','2', '70297', 'NULL');
INSERT INTO `placas_wentex` (`nomePlaca`,`quantidade`,`situacao`, `local`, `qtdParaSituacaoBaixa` , `qtdParaSituacaoOk`, `regUltimaEdicao`, `fotoUltimoUser` ) VALUES ('GMB-1C', 2 , 'ok', 'Abertura','4','2', '70297', 'NULL');
INSERT INTO `placas_wentex` (`nomePlaca`,`quantidade`,`situacao`, `local`, `qtdParaSituacaoBaixa` , `qtdParaSituacaoOk`, `regUltimaEdicao`, `fotoUltimoUser` ) VALUES ('SIMOREG', 2 , 'ok', 'Abertura','4','2', '70297', 'NULL');
INSERT INTO `placas_wentex` (`nomePlaca`,`quantidade`,`situacao`, `local`, `qtdParaSituacaoBaixa` , `qtdParaSituacaoOk`, `regUltimaEdicao`, `fotoUltimoUser` ) VALUES ('PRESSOSTATO L.', 2 , 'ok', 'Abertura','4','2', '70297', 'NULL');
INSERT INTO `placas_wentex` (`nomePlaca`,`quantidade`,`situacao`, `local`, `qtdParaSituacaoBaixa` , `qtdParaSituacaoOk`, `regUltimaEdicao`, `fotoUltimoUser` ) VALUES ('BLEND-1,2,3,4e7', 2 , 'ok', 'Abertura','4','2', '70297', 'NULL');
INSERT INTO `placas_wentex` (`nomePlaca`,`quantidade`,`situacao`, `local`, `qtdParaSituacaoBaixa` , `qtdParaSituacaoOk`, `regUltimaEdicao`, `fotoUltimoUser` ) VALUES ('BLEND-5,6', 2 , 'ok', 'Abertura','4','2', '70297', 'NULL');
INSERT INTO `placas_wentex` (`nomePlaca`,`quantidade`,`situacao`, `local`, `qtdParaSituacaoBaixa` , `qtdParaSituacaoOk`, `regUltimaEdicao`, `fotoUltimoUser` ) VALUES ('CLEAN COMMAN', 2 , 'ok', 'Abertura','4','2', '70297', 'NULL');
INSERT INTO `placas_wentex` (`nomePlaca`,`quantidade`,`situacao`, `local`, `qtdParaSituacaoBaixa` , `qtdParaSituacaoOk`, `regUltimaEdicao`, `fotoUltimoUser` ) VALUES ('MIX COMMANDER', 2 , 'ok', 'Abertura','4','2', '70297', 'NULL');
INSERT INTO `placas_wentex` (`nomePlaca`,`quantidade`,`situacao`, `local`, `qtdParaSituacaoBaixa` , `qtdParaSituacaoOk`, `regUltimaEdicao`, `fotoUltimoUser` ) VALUES ('BAE-1A', 2 , 'ok', 'Abertura','4','2', '70297', 'NULL');
INSERT INTO `placas_wentex` (`nomePlaca`,`quantidade`,`situacao`, `local`, `qtdParaSituacaoBaixa` , `qtdParaSituacaoOk`, `regUltimaEdicao`, `fotoUltimoUser` ) VALUES ('SSW1', 2 , 'ok', 'Abertura','4','2', '70297', 'NULL');
INSERT INTO `placas_wentex` (`nomePlaca`,`quantidade`,`situacao`, `local`, `qtdParaSituacaoBaixa` , `qtdParaSituacaoOk`, `regUltimaEdicao`, `fotoUltimoUser` ) VALUES ('AJ/BER' , 2 , 'ok', 'Abertura','4','2', '70297', 'NULL');
INSERT INTO `placas_wentex` (`nomePlaca`,`quantidade`,`situacao`, `local`, `qtdParaSituacaoBaixa` , `qtdParaSituacaoOk`, `regUltimaEdicao`, `fotoUltimoUser` ) VALUES ('BER-5', 2 , 'ok', 'Abertura','4','2', '70297', 'NULL');
INSERT INTO `placas_wentex` (`nomePlaca`,`quantidade`,`situacao`, `local`, `qtdParaSituacaoBaixa` , `qtdParaSituacaoOk`, `regUltimaEdicao`, `fotoUltimoUser` ) VALUES ('SSB-EGR-RE' , 2 , 'ok', 'Abertura','4','2', '70297', 'NULL');
INSERT INTO `placas_wentex` (`nomePlaca`,`quantidade`,`situacao`, `local`, `qtdParaSituacaoBaixa` , `qtdParaSituacaoOk`, `regUltimaEdicao`, `fotoUltimoUser` ) VALUES ('LENZE-DX', 2 , 'ok', 'Abertura','4','2', '70297', 'NULL');
INSERT INTO `placas_wentex` (`nomePlaca`,`quantidade`,`situacao`, `local`, `qtdParaSituacaoBaixa` , `qtdParaSituacaoOk`, `regUltimaEdicao`, `fotoUltimoUser` ) VALUES ('LENZE-BDT' , 2 , 'ok', 'Abertura','4','2', '70297', 'NULL');
INSERT INTO `placas_wentex` (`nomePlaca`,`quantidade`,`situacao`, `local`, `qtdParaSituacaoBaixa` , `qtdParaSituacaoOk`, `regUltimaEdicao`, `fotoUltimoUser` ) VALUES ('LENZE(CVT)', 2 , 'ok', 'Abertura','4','2', '70297', 'NULL');
INSERT INTO `placas_wentex` (`nomePlaca`,`quantidade`,`situacao`, `local`, `qtdParaSituacaoBaixa` , `qtdParaSituacaoOk`, `regUltimaEdicao`, `fotoUltimoUser` ) VALUES ('FU1BO(A/L)' , 2 , 'ok', 'Abertura','4','2', '70297', 'NULL');
INSERT INTO `placas_wentex` (`nomePlaca`,`quantidade`,`situacao`, `local`, `qtdParaSituacaoBaixa` , `qtdParaSituacaoOk`, `regUltimaEdicao`, `fotoUltimoUser` ) VALUES ('FU1(BDT)', 2 , 'ok', 'Abertura','4','2', '70297', 'NULL');
INSERT INTO `placas_wentex` (`nomePlaca`,`quantidade`,`situacao`, `local`, `qtdParaSituacaoBaixa` , `qtdParaSituacaoOk`, `regUltimaEdicao`, `fotoUltimoUser` ) VALUES ('WEGCFW(09)' , 2 , 'ok', 'Abertura','4','2', '70297', 'NULL');
INSERT INTO `placas_wentex` (`nomePlaca`,`quantidade`,`situacao`, `local`, `qtdParaSituacaoBaixa` , `qtdParaSituacaoOk`, `regUltimaEdicao`, `fotoUltimoUser` ) VALUES ('TAMPA CONV. BOA', 2 , 'ok', 'Abertura','4','2', '70297', 'NULL');


CREATE TABLE  `controle_placas_sys`.`placas_embratex` (
  
`idPlaca` int unsigned NOT NULL AUTO_INCREMENT,
  
`nomePlaca` varchar(255) DEFAULT NULL,
 
 `quantidade` int DEFAULT NULL,
 
 `situacao` varchar(255) DEFAULT NULL,
  
`local` varchar(255) DEFAULT NULL,
  
`qtdParaSituacaoBaixa` int DEFAULT NULL,
`qtdParaSituacaoOk` int DEFAULT NULL,
`dataUltimaEdicao`  TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
`regUltimaEdicao` varchar(255) DEFAULT NULL,
  
`fotoUltimoUser` mediumblob,
  
PRIMARY KEY (`idPlaca`)
) AUTO_INCREMENT=1 DEFAULT CHARSET=latin1;






*/