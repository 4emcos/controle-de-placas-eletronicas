import React, {useState, useEffect } from 'react';
import MaterialTable from 'material-table';
import gql from 'graphql-tag'
import {useMutation, useQuery} from '@apollo/react-hooks';
import * as Ibage from '../../userExample'
import {Modal, Col, Row, Container} from 'react-bootstrap'
import {StatusGood,  StatusWarning, CircleInformation, SubtractCircle} from 'grommet-icons';
import {Grommet, Box, FormField, TextInput, Button,Text, Heading, Image} from 'grommet';
import '../style/table-controle-placa.css'
import ButtonBoots from 'react-bootstrap/Button'
import {Paper} from '@material-ui/core'
import * as Mutation from '../gql-consts/mutations'
import { parse } from 'graphql';
import {Hide , View} from 'grommet-icons';


var userAtual 
var verifiedIsOn = false


function getNomeAndSobrenome(nome) {
  var list = []
  if(nome !== null){
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
  const [reveal, setReveal] = useState(false);
  const [senha, setSenha] = useState();


  const [superIsOn, setSuperIsOn] = useState(false);


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
          is_verified
          is_super
        }
    }    
  `;

  const {refetch, data} = useQuery(GET_USER,{
          variables : {
            idFuncao : funcao,
            reg : verifiedUser
          }
          })

  useEffect (() => { 

    if (data !== undefined && data.atualiza_colaborador !== null) {
        setFuncao(data.atualiza_colaborador.lista_funcao)
        refetch()
        handleLogon()
        //
  
    } else { 
      setNome(null)
      setFuncao(null)
      setNomeFuncao(null)
      setFoto(Ibage.img) 
    }

  },[data])


  function handleLogon () { 
    if (data.users_verificado !== null && data.users_verificado.is_verified === "true" && data.users_verificado.senha == senha){
      setNomeFuncao(data.lista_funcao !== null ? data.lista_funcao.nome_funcao : '') 
      setNome(data.atualiza_colaborador.nome)
      //setFuncao(data.atualiza_colaborador.lista_funcao)
      setFoto(data.atualiza_colaborador.foto)  
      userAtual = data
      verifiedIsOn = true
      setShowModal(props.onHide)
      setSuperIsOn(data.users_verificado.is_super == "true" ? true : false)
      console.log(superIsOn)
      console.log(data.users_verificado)

    } else {
      verifiedIsOn = false
      setReg(null)
      setSenha(null)
      
    }
    
  }

  function handleLogout() {
    document.getElementById('senha-input-modal').value = null
    document.getElementById('text-input-modal').value = null
    setNome('');
    setFuncao('');
    setFoto(Ibage);
    setReg(null)
    setValue(null)
    setSuperIsOn(false)
    setVerifiedUser (null)
    verifiedIsOn = false
  }
  

  return (

    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      dialogClassName = "modal-90w"
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
            Alteração de situação da placa
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>


      <Grommet >

              <Box 
                id = 'box-user-modal'
                direction = "row-responsive"
                align="center"
                gap = "medium"
                
                background = "white"
                >
                        <Box>
                        <Image id= "ibage" variant="center" src= {`data:image/jpg;base64,${foto}`} style={{ width: '6.5rem' ,  height: '8.5rem' }} />
                        </Box>
                    
                          <Box>

                        
                        <Box
                            width="medium"
                            direction="column"
                            margin="xsmall"
                            align="center"
                            plain
                          >

                            <Heading
                            size = "xsmall"
                            id = "entrar-user-modal"
                            > Login: </Heading>

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
                                      if(e.key === 'Enter') {
                                        setReg(`"${value}"`)
                                        setVerifiedUser(value)
                                        }
                                  }}
                                    
                                    />
                                  <Box
                                  width="medium"
                                  direction="row"
                                  margin="xsmall"
                                  align="center"
                                  
                                  >
                                      <TextInput
                                      
                                      placeholder="senha"
                                      type={reveal ? "text" : "password"}
                                      id="senha-input-modal"
                                      
                                      onChange= {e => 
                                        setSenha(e.target.value) 
                                        
                                      }

                                      onKeyDown = {(e) => {
                                        if (value != null) {
                                      
                                          if(e.key === 'Enter') {
                                          
                                            setReg(`"${value}"`)
                                            setVerifiedUser(value)
                                          }
                                          }
                                          
                                        }}
                                        
                                        />
                                        <Button
                                          icon={reveal ? <View size="medium" /> : <Hide size="medium" />}
                                          onClick={() => setReveal(!reveal)}
                                        />
                                    </Box>


                              </Box>
                        
                        
                            <Box
                              width="large"
                              direction="row"
                              margin="xsmall"
                              id = "botoes-modal"
                              gap = "small"
                            >
                          
                              <Button
                                primary 
                                
                                color = {"#00739D"}
                                label="Entrar" 
                                onClick = {() =>{
                                      setReg(`"${value}"`)
                                      setVerifiedUser(value)
                                }}
                                />

                              <Button
                                  primary 
                                  color = {"#00739D"}
                                  onClick = {() => handleLogout()}
                                  label="Sair" 
                                  />
                              
                              </Box>

                          </Box>
                      
                          <Box
                            id = "data-users-modal"
                          >
                            <Heading 
                            id = "nome-user-modal"
                            size = "xsmall"
                            alignSelf = "center"
                            >{getNomeAndSobrenome(nome)}
                            </Heading > 

                            <Text
                            id = "funcao-user-modal"
                            >{nomeFuncao != null ? nomeFuncao.toString().trim() : ''}
                            </Text>
                          </Box>
              </Box>
                
            </Grommet>
            
      
      <ButtonBoots
      hidden = {!superIsOn}
      >
        TESTE
      </ButtonBoots>

      </Modal.Body>
      <Modal.Footer>
        <ButtonBoots onClick={props.onHide}>Close</ButtonBoots>
      </Modal.Footer>
    </Modal>
   
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


    const [newPlaca] = useMutation(!unidadeAtual.indexOf("placasEmbratex") ? Mutation.CREATE_NEW_PLACA_EMB : Mutation.CREATE_NEW_PLACA_WTX)
    const [updatePlaca] = useMutation(!unidadeAtual.indexOf("placasEmbratex") ? Mutation.UPDATE_PLACA_EMB : Mutation.UPDATE_PLACA_WTX)
    const [delEmb] = useMutation(!unidadeAtual.indexOf("placasEmbratex") ? Mutation.DELETE_PLACA_EMB : Mutation.DELETE_PLACA_WTX);


    const { refetch, data} = useQuery(GET_ALL_BOARDS , {
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
        { title: "Quantidade necessária", field: 'qtdParaSituacaoOk', editable: 'never',  type: 'numeric',
        render: rowData => 
        {
          if (rowData !== undefined && rowData.qtdParaSituacaoOk !== undefined){
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
            rowData !== undefined ? rowData.situacao === 'ok' ? <StatusGood color= 'green' /> : rowData.quantidade < 0 ? <StatusWarning color='#f5090d'/>: rowData.quantidade === 0 ? <SubtractCircle  color= '#fc5800'/> : <CircleInformation color = {'#514000'}/> : ''
        )
        },
        
        {
          title: 'Usuário',
          field: 'fotoUltimoUser',
          editable: 'never',
          render: rowData =>  
            (
              <img
                style={{ height: 36, borderRadius: '50%' }}
                src={`data:image/png;base64,${rowData === undefined ? '' : rowData.fotoUltimoUser }`}
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
                  qtdParaSituacaoBaixa: parseInt(newData.qtdParaSituacaoBaixa),
                  qtdParaSituacaoOk: parseInt(newData.qtdParaSituacaoOk),
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
                    qtdParaSituacaoOk: parseInt(newData.qtdParaSituacaoOk),
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
            
            resolve();
            if (oldData) {
              updatePlaca({
                variables: {
                  idPlaca  : newData.idPlaca,
                  nomePlaca : newData.nomePlaca,
                  quantidade : parseInt(newData.quantidade),
                  situacao : newData.situacao,
                  local : newData.local,
                  qtdParaSituacaoBaixa: parseInt(newData.qtdParaSituacaoOk),
                  qtdParaSituacaoOk: parseInt(newData.qtdParaSituacaoOk),
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
      if(data !== undefined){         
        if (!unidadeAtual.indexOf('placasWentex')) {
          var tempList = []
          for (let i = 0; i < data.placasWentex.length; i++) {
            if (data.placasWentex[i].local === `${props.local}`) {
              tempList.push(data.placasWentex[i])
              //data.placasEmbratex.splice(i) 
            }         
        }
        } else {
          var tempList = []
          for (let i = 0; i < data.placasEmbratex.length; i++) {
            if (data.placasEmbratex[i].local === `${props.local}`) {
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
          
          data[0].editable = 'always'
          data[2].editable = 'always'
          return {...prevState, data}
        })
      } else {
        setColumns( prevState => {
          const data = [...prevState.coluna];
          
          data[0].editable = 'never'
          data[2].editable = 'never'
          return {...prevState, data}
        })
      }
    }

    useEffect (() => {
      setUnidadeAtual(props.unidade)
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
      if (userAtual !== null) {
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
            title= {props.local === "Cardas" ? `Controle de placas das ${props.local} ` : props.local === "Fuso" ? `Controle de placas do ${props.local}` : `Controle de placas da ${props.local}`  }
            columns={columns.coluna}
            data={state.data}
            tableRef={tableRef}
          
            options = {{
                pageSize : 9,
                pageSizeOptions : [9, 15, 30, 50, 100],
                rowStyle: rowData => ({
                  backgroundColor: rowData.situacao === 'ok' && rowData.quantidade !== 0 ? '#eaf4de' :  rowData.quantidade === 0 ?  '#ffebb2' :  rowData.quantidade > 0 ? '#fbefca' :  '#fed0d2' 
                })
            }}
            localization={{
                pagination: {
                    labelDisplayedRows: '{from}-{to} de {count}',
                    previousTooltip : "Página anterior",
                    nextTooltip : "Proxima página",
                    lastTooltip: "Última página",
                    firstTooltip: "Primeira página",
                    labelRowsSelect : "linhas"

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

              editable={isEditable === true ? verifiedIsOn === true ? editableForVerifiedUsers : editableForUnverifiedUsers  : null }
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

        onKeyDown : function  onKeyDown(e){
              if(e.key == 'Enter'){
                var newData = _this2.state.data;
                delete newData.tableData;
                _this2.props.onEditingApproved(_this2.props.mode, _this2.state.data, _this2.props.data);
              }
              if(e.key == 'Escape') {
                _this2.props.onEditingCanceled(_this2.props.mode, _this2.props.data);
                
              }
            },
*/