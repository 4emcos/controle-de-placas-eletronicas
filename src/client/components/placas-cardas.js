/*import React, {useState, useEffect } from 'react';
import MaterialTable, {MTableAction } from 'material-table';
import gql from 'graphql-tag'
import {useMutation, useQuery} from '@apollo/react-hooks';
import Build from '@material-ui/icons/Build'

import {ButtonToolbar, Button, Modal, Form, Col, Row, Card} from 'react-bootstrap'

var userAtual 
var verifiedIsOn = false


var kwonVerifiedUSers = [ '00115070297' ]

const GET_ALL_BOARDS =  gql`
        query get_board($idPlaca : ID) { 
          placasEmbratex {
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

          placaEmbratex (idPlaca : $idPlaca) { 
            situacao
          }
        }
        `;

const DELETE_PLACA =  gql`
        mutation delEmb ($idPlaca: ID) {
          deletePlacaEmb (idPlaca : $idPlaca)
        }
        `;

const UPDATE_PLACA = gql`
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

const CREATE_NEW_PLACA =  gql`
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

function ModificaValoresDeOKENivelBaixo(props) {
  
  const [updatePlaca, {dados}] = useMutation(UPDATE_PLACA)
  const [valueOK, setValueOK] = useState();
  const [valueNvBaixo, setValueNvBaixo] = useState();

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
    }}).then( () => alert('sucess'))
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
                <Form.Label> OK:</Form.Label>
                <Form.Control required type="numeric" placeholder="123456" onInput = {(e) => setValueOK(e.target.value)}/>
                <Form.Text className="text-muted">
                  Quantidade de placas para a situação 'ok' 
                </Form.Text>
              </Form.Group> 
              </Col>
              <Col>
              <Form.Group controlId="formNvBaixo">
                <Form.Label>Nível Baixo:</Form.Label>
                <Form.Control required type="numeric" placeholder="123456" onInput = {(e) => setValueNvBaixo(e.target.value)}/>
                <Form.Text className="text-muted">
                    Quantidade de placas para situação 'nível baixo'
                </Form.Text>
              </Form.Group>
              </Col>
            </Row>
        
            </Form>
            <Button 
              variant="primary" 
              type="aa"
              onClick ={handleClick}
              >
                Salvar
              </Button>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

function isVerified(params) {
  kwonVerifiedUSers.forEach(element => {
    //console.log(`1-${params}`)
   // console.log(`2-${element}`)
    //console.log(element == params ? true : false)
    verifiedIsOn = element == params ? true : false
  });
  
}

function GetVerfiedUsers(props) {
  const [reg, setReg ] = useState ('a');

  const [nome, setNome]  = useState('');
  const [funcao, setFuncao] = useState ('');
  const [foto, setFoto] = useState('');


  const GET_VERIFIED_USER = gql`
    { 
      atualiza_colaborador(registro: ${reg}){
        registro
        nome
        lista_funcao
        foto
      }
    }
    `
  const { loading, error, data} = useQuery(GET_VERIFIED_USER);
  

  
  useEffect (() => { 

    if (data != undefined && data.atualiza_colaborador != null) {
      setNome(data.atualiza_colaborador.nome);
      setFuncao(data.atualiza_colaborador.lista_funcao == " 2.009" || data.atualiza_colaborador.lista_funcao == " 2.012" ? "Técnico Eletrônica" : "Função não reconhecida")
      setFoto(data.atualiza_colaborador.foto);
    } else { 
      setNome(null);
      setFuncao(null);
      setFoto(null);
    }

  },[data])


  function handleLogon(){
   isVerified(data == undefined || data.atualiza_colaborador == null ? null : parseInt(data.atualiza_colaborador.registro));
   userAtual = data 
  }

  function handleLogout() {
    verifiedIsOn = false;
    setNome(null);
    setFuncao(null);
    setFoto(null);
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

      <Card id = "card-select-user">
            <Card.Img variant="top" src= {`data:image/jpg;base64,${foto}`} style={{ width: '5rem' ,  height: '7rem' }} />
            <Card.Body>
            <label>
             Matricula :  
             <input 
             style = {{ width: '17rem' ,  height: '2.5rem'}}
             type = "text" 
             onChange= {e => 
              { 
                setReg(`"001150${e.target.value}"`)
               }}/>
            </label>
            <Card.Title>{nome}</Card.Title>
          <Card.Subtitle>{funcao}</Card.Subtitle>
        </Card.Body>
      </Card>
          
        <Button
          onClick = {() => handleLogon() }
          onChange= {props.onHide}
        
        >ON</Button>
        <Button
          onClick = {() => handleLogout()}
        > OFF </Button>

      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
   
  );
}


function RenderAlterarSituacoesBtn(props) {
  const [modalShow, setModalShow] = useState();
  

  return (
        <ButtonToolbar>
          <Button
          id = {`idBtn${props.idBtn}`}
          variant="primary" 
          onClick={() => setModalShow(true)}
          > 
          Alterar Situação
          </Button>

          <ModificaValoresDeOKENivelBaixo
            data = {props.data}
            user = {userAtual}
            show={modalShow}
            onHide={() => setModalShow(false)}
          />

        </ButtonToolbar>
    ); 
  }


function PlacasCardasGrids(props) {

    const [isEditable, setIsEditable] = useState();

    const [foto, setFoto] = useState();
    const [reg, setReg] = useState();

    
    const [modalShow, setModalShow] = useState();
    const [newPlaca, {lotOfData}] = useMutation(CREATE_NEW_PLACA)
    const [updatePlaca, {dados}] = useMutation(UPDATE_PLACA)
    const [delEmb, {id}] = useMutation(DELETE_PLACA);


    const {loading, error, refetch, data} = useQuery(GET_ALL_BOARDS , {
      variables : {idPlaca : 0}
    });


    const tableRef = React.createRef();
    
    const [columns, setColumns] = useState ({ 
      coluna: [
        { title: 'Placas', field: 'nomePlaca', editable: 'never' },
        { title: 'Quantidade', field: 'quantidade',  type: 'numeric'  },
        { title: 'Situacao', field: 'situacao',  editable: 'never' ,  defaultSort: 'asc', hidden : false,
        render: rowData =>  
        ( 
            rowData != undefined ? rowData.situacao == 'ok' ? '✔️' : '🔻' : ''
              //nivel baixo     
        )
        },//, hidden: 'true'},
        { title: 'Quantidade para Saldo baixo', field: 'saldoBaixo',  type: 'numeric', hidden: true},
        { title: 'Quantidade para Saldo Ok', field: 'saldoOk',  type: 'numeric', hidden: true},

        { title: 'Alterar Situação', field: 'setSituacao', hidden: true , editable: 'never',
        render: rowData => {
          if (rowData != undefined ) {
            
            return( 
              <>
              <RenderAlterarSituacoesBtn idBtn = {rowData.tableData.id} data = {rowData} userAtual = {props} /> 
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
        { title: 'Ultima atualização', field: 'dataUltimaEdicao',  type: 'datetime' },
       
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
                  qtdParaSituacaoBaixa: 3,
                  qtdParaSituacaoOk: 2,
                  regUltimaEdicao: reg,
                  fotoUltimoUser: foto
    
              }})
              
              
              var temp = []

              refetch({
                query: GET_ALL_BOARDS, 
                variables: newData.idPlaca})
              temp = data.placasEmbratex[newData.idPlaca-1];
              setState(prevState => {
                const data = [...prevState.data];
                data[data.indexOf(oldData)] = temp
                data[data.indexOf(temp)].fotoUltimoUser = foto
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
                    local : "Cardas",
                    qtdParaSituacaoBaixa: 3,
                    qtdParaSituacaoOk: 2,
                    regUltimaEdicao: userAtual.atualiza_colaborador.registro,
                    fotoUltimoUser: userAtual.atualiza_colaborador.foto
                }})

                

                refetch({
                  query: GET_ALL_BOARDS, 
                  variables: data.placasEmbratex.length})
                
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
                  qtdParaSituacaoBaixa: 3,
                  qtdParaSituacaoOk: 2,
                  regUltimaEdicao: userAtual.atualiza_colaborador.registro,
                  fotoUltimoUser: userAtual.atualiza_colaborador.foto
    
              }})

              var temp = []
              refetch({
                query: GET_ALL_BOARDS, 
                variables: newData.idPlaca})
              temp = data.placasEmbratex[newData.idPlaca-1];
              

              setState(prevState => {
                
                const data = [...prevState.data];
                data[data.indexOf(oldData)] = temp;
                data[data.indexOf(temp)].fotoUltimoUser = userAtual.atualiza_colaborador.foto
              
                return { ...prevState, data };
              })
             }
    
          }, 300);
        }),
    
    
      onRowDelete: oldData =>
        new Promise(resolve => {
          setTimeout(() => {
              resolve();
              delEmb({variables: {idPlaca : oldData.idPlaca}})
              setState(prevState => {
                const data = [...prevState.data];
                data.splice(data.indexOf(oldData), 1);
                return { ...prevState, data };
              });
          }, 300);
        })}

    function requests() {
      if(data != undefined){
        var tempList = []
        for (let i = 0; i < data.placasEmbratex.length; i++) {
          if (data.placasEmbratex[i].local == "Cardas") {
            tempList.push(data.placasEmbratex[i])
            //data.placasEmbratex.splice(i) 
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
      requests();
    },[loading]);
  
    useEffect (() => {
      verifiedIsOn = false
      userAtual = null
      setFoto(props.userImg)
      setReg(props.userReg)
      setIsEditable(props.user)
      console.log(userAtual)
      console.log(props)
    },[props.userImg])


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
        <MaterialTable
            title="Controle de Placas das Cards"
            columns={columns.coluna}
            data={state.data}
            tableRef={tableRef}
          
            options = {{
                pageSize : 8,
                pageSizeOptions : [5, 15, 30, 50, 100],
                rowStyle: rowData => ({
                  backgroundColor: (rowData.situacao == 'ok') ? '#FFF' : '#f6bebe'
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
                  icon: 'build',
                  tooltip: 'Editar Tabela',
                  isFreeAction: true,
                  onClick : () => {setModalShow(true) }
                
                }
              ]}

          />

          <GetVerfiedUsers
          show={modalShow}
          onHide={() => setModalShow(false)}
        />
        </>
    );
  }
export default PlacasCardasGrids;



    INSERT INTO `placas_wentex` (`nomePlaca`,`quantidade`,`situacao`, `local`, `qtdParaSituacaoBaixa` , `qtdParaSituacaoOk`, `regUltimaEdicao`, `fotoUltimoUser`) VALUES ('ZPB4', 2 , 'Ok', 'Cardas','4','2', '70297', 'NULL');
    INSERT INTO `placas_wentex` (`nomePlaca`,`quantidade`,`situacao`, `local`, `qtdParaSituacaoBaixa` , `qtdParaSituacaoOk`, `regUltimaEdicao`, `fotoUltimoUser`) VALUES ('ZPB3', 2 , 'Ok', 'Cardas','4','2', '70297', 'NULL');
    INSERT INTO `placas_wentex` (`nomePlaca`,`quantidade`,`situacao`, `local`, `qtdParaSituacaoBaixa` , `qtdParaSituacaoOk`, `regUltimaEdicao`, `fotoUltimoUser`) VALUES ('ZPB2', 2 , 'Ok', 'Cardas','4','2', '70297', 'NULL');
    INSERT INTO `placas_wentex` (`nomePlaca`,`quantidade`,`situacao`, `local`, `qtdParaSituacaoBaixa` , `qtdParaSituacaoOk`, `regUltimaEdicao`, `fotoUltimoUser`) VALUES ('ZPB1', 2 , 'Ok', 'Cardas','4','2', '70297', 'NULL');
    INSERT INTO `placas_wentex` (`nomePlaca`,`quantidade`,`situacao`, `local`, `qtdParaSituacaoBaixa` , `qtdParaSituacaoOk`, `regUltimaEdicao`, `fotoUltimoUser`) VALUES ('ADB1', 2 , 'Ok', 'Cardas','4','2', '70297', 'NULL');
    INSERT INTO `placas_wentex` (`nomePlaca`,`quantidade`,`situacao`, `local`, `qtdParaSituacaoBaixa` , `qtdParaSituacaoOk`, `regUltimaEdicao`, `fotoUltimoUser`) VALUES ('KIB1C', 2 , 'Ok', 'Cardas','4','2', '70297', 'NULL');
    INSERT INTO `placas_wentex` (`nomePlaca`,`quantidade`,`situacao`, `local`, `qtdParaSituacaoBaixa` , `qtdParaSituacaoOk`, `regUltimaEdicao`, `fotoUltimoUser`) VALUES ('KIB1A', 2 , 'Ok', 'Cardas','4','2', '70297', 'NULL');
    INSERT INTO `placas_wentex` (`nomePlaca`,`quantidade`,`situacao`, `local`, `qtdParaSituacaoBaixa` , `qtdParaSituacaoOk`, `regUltimaEdicao`, `fotoUltimoUser`) VALUES ('FTB1', 2 , 'Ok', 'Cardas','4','2', '70297', 'NULL');
    INSERT INTO `placas_wentex` (`nomePlaca`,`quantidade`,`situacao`, `local`, `qtdParaSituacaoBaixa` , `qtdParaSituacaoOk`, `regUltimaEdicao`, `fotoUltimoUser`) VALUES ('EBO32', 2 , 'Ok', 'Cardas','4','2', '70297', 'NULL');
    INSERT INTO `placas_wentex` (`nomePlaca`,`quantidade`,`situacao`, `local`, `qtdParaSituacaoBaixa` , `qtdParaSituacaoOk`, `regUltimaEdicao`, `fotoUltimoUser`) VALUES ('ABR 016', 2 , 'Ok', 'Cardas','4','2', '70297', 'NULL');
    INSERT INTO `placas_wentex` (`nomePlaca`,`quantidade`,`situacao`, `local`, `qtdParaSituacaoBaixa` , `qtdParaSituacaoOk`, `regUltimaEdicao`, `fotoUltimoUser`) VALUES ('VNB 1A', 2 , 'Ok', 'Cardas','4','2', '70297', 'NULL');
    INSERT INTO `placas_wentex` (`nomePlaca`,`quantidade`,`situacao`, `local`, `qtdParaSituacaoBaixa` , `qtdParaSituacaoOk`, `regUltimaEdicao`, `fotoUltimoUser`) VALUES ('GMB 1A', 2 , 'Ok', 'Cardas','4','2', '70297', 'NULL');
    INSERT INTO `placas_wentex` (`nomePlaca`,`quantidade`,`situacao`, `local`, `qtdParaSituacaoBaixa` , `qtdParaSituacaoOk`, `regUltimaEdicao`, `fotoUltimoUser`) VALUES ('CARDCOMMANDER', 2 , 'Ok', 'Cardas','4','2', '70297', 'NULL');
    INSERT INTO `placas_wentex` (`nomePlaca`,`quantidade`,`situacao`, `local`, `qtdParaSituacaoBaixa` , `qtdParaSituacaoOk`, `regUltimaEdicao`, `fotoUltimoUser`) VALUES ('PRESSOSTATO', 2 , 'Ok', 'Cardas','4','2', '70297', 'NULL');
    INSERT INTO `placas_wentex` (`nomePlaca`,`quantidade`,`situacao`, `local`, `qtdParaSituacaoBaixa` , `qtdParaSituacaoOk`, `regUltimaEdicao`, `fotoUltimoUser`) VALUES ('ANALOGICO. A161', 2 , 'Ok', 'Cardas','4','2', '70297', 'NULL');
    INSERT INTO `placas_wentex` (`nomePlaca`,`quantidade`,`situacao`, `local`, `qtdParaSituacaoBaixa` , `qtdParaSituacaoOk`, `regUltimaEdicao`, `fotoUltimoUser`) VALUES ('ANALOGICO. A163', 2 , 'Ok', 'Cardas','4','2', '70297', 'NULL');
    INSERT INTO `placas_wentex` (`nomePlaca`,`quantidade`,`situacao`, `local`, `qtdParaSituacaoBaixa` , `qtdParaSituacaoOk`, `regUltimaEdicao`, `fotoUltimoUser`) VALUES ('ANALOGICO. A167', 2 , 'Ok', 'Cardas','4','2', '70297', 'NULL');
    INSERT INTO `placas_wentex` (`nomePlaca`,`quantidade`,`situacao`, `local`, `qtdParaSituacaoBaixa` , `qtdParaSituacaoOk`, `regUltimaEdicao`, `fotoUltimoUser`) VALUES ('SCA04_A161', 2 , 'Ok', 'Cardas','4','2', '70297', 'NULL');
    INSERT INTO `placas_wentex` (`nomePlaca`,`quantidade`,`situacao`, `local`, `qtdParaSituacaoBaixa` , `qtdParaSituacaoOk`, `regUltimaEdicao`, `fotoUltimoUser`) VALUES ('SCA04_A163', 2 , 'Ok', 'Cardas','4','2', '70297', 'NULL');
    INSERT INTO `placas_wentex` (`nomePlaca`,`quantidade`,`situacao`, `local`, `qtdParaSituacaoBaixa` , `qtdParaSituacaoOk`, `regUltimaEdicao`, `fotoUltimoUser`) VALUES ('SCA04_A167', 2 , 'Ok', 'Cardas','4','2', '70297', 'NULL');
    INSERT INTO `placas_wentex` (`nomePlaca`,`quantidade`,`situacao`, `local`, `qtdParaSituacaoBaixa` , `qtdParaSituacaoOk`, `regUltimaEdicao`, `fotoUltimoUser`) VALUES ('SCA05_A161', 2 , 'Ok', 'Cardas','4','2', '70297', 'NULL');
    INSERT INTO `placas_wentex` (`nomePlaca`,`quantidade`,`situacao`, `local`, `qtdParaSituacaoBaixa` , `qtdParaSituacaoOk`, `regUltimaEdicao`, `fotoUltimoUser`) VALUES ('SCA05_A163', 2 , 'Ok', 'Cardas','4','2', '70297', 'NULL');
    INSERT INTO `placas_wentex` (`nomePlaca`,`quantidade`,`situacao`, `local`, `qtdParaSituacaoBaixa` , `qtdParaSituacaoOk`, `regUltimaEdicao`, `fotoUltimoUser`) VALUES ('SCA05_A167', 2 , 'Ok', 'Cardas','4','2', '70297', 'NULL');
    INSERT INTO `placas_wentex` (`nomePlaca`,`quantidade`,`situacao`, `local`, `qtdParaSituacaoBaixa` , `qtdParaSituacaoOk`, `regUltimaEdicao`, `fotoUltimoUser`) VALUES ('LENZE(TC) 0,25kw', 2 , 'Ok', 'Cardas','4','2', '70297', 'NULL');
    INSERT INTO `placas_wentex` (`nomePlaca`,`quantidade`,`situacao`, `local`, `qtdParaSituacaoBaixa` , `qtdParaSituacaoOk`, `regUltimaEdicao`, `fotoUltimoUser`) VALUES ('LENZE(TC) 0,37kw' , 2 , 'Ok', 'Cardas','4','2', '70297', 'NULL');

    */