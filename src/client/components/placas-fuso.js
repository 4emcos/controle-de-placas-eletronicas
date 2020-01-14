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


function PlacasFusoGrids(props) {

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
        { title: 'Ultima atualização', field: 'dataUltimaEdicao', editable: 'never',  type: 'datetime' },
       
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
                    local : "Fuso",
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
          if (data.placasEmbratex[i].local == "Fuso") {
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
            title="Controle de Placas do Fuso"
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

export default PlacasFusoGrids;


  
          INSERT INTO `placas_embratex` (`nomePlaca`,`quantidade`,`situacao`, `local`, `qtdParaSituacaoBaixa` , `qtdParaSituacaoOk`, `regUltimaEdicao`, `fotoUltimoUser`) VALUES ('Corolab I', 2, 'Ok', 'Fuso','4','2', '70297', 'NULL');
          INSERT INTO `placas_embratex` (`nomePlaca`,`quantidade`,`situacao`, `local`, `qtdParaSituacaoBaixa` , `qtdParaSituacaoOk`, `regUltimaEdicao`, `fotoUltimoUser`) VALUES ('Corolab II', 2, 'Ok', 'Fuso','4','2', '70297', 'NULL');
          INSERT INTO `placas_embratex` (`nomePlaca`,`quantidade`,`situacao`, `local`, `qtdParaSituacaoBaixa` , `qtdParaSituacaoOk`, `regUltimaEdicao`, `fotoUltimoUser`) VALUES ('Corolab III', 2, 'Ok', 'Fuso','4','2', '70297', 'NULL');
          INSERT INTO `placas_embratex` (`nomePlaca`,`quantidade`,`situacao`, `local`, `qtdParaSituacaoBaixa` , `qtdParaSituacaoOk`, `regUltimaEdicao`, `fotoUltimoUser`) VALUES ("Cabeça Corolab B", 2, 'Ok', 'Fuso','4','2', '70297', 'NULL');
          INSERT INTO `placas_embratex` (`nomePlaca`,`quantidade`,`situacao`, `local`, `qtdParaSituacaoBaixa` , `qtdParaSituacaoOk`, `regUltimaEdicao`, `fotoUltimoUser`) VALUES ('Cabeça Corolab QDLP', 2, 'Ok', 'Fuso','4','2', '70297', 'NULL');
          INSERT INTO `placas_embratex` (`nomePlaca`,`quantidade`,`situacao`, `local`, `qtdParaSituacaoBaixa` , `qtdParaSituacaoOk`, `regUltimaEdicao`, `fotoUltimoUser`) VALUES ('Cabeça Corolab XQ', 2, 'Ok', 'Fuso','4','2', '70297', 'NULL');
          INSERT INTO `placas_embratex` (`nomePlaca`,`quantidade`,`situacao`, `local`, `qtdParaSituacaoBaixa` , `qtdParaSituacaoOk`, `regUltimaEdicao`, `fotoUltimoUser`) VALUES ('Guarda Fio I', 2, 'Ok', 'Fuso','4','2', '70297', 'NULL');
          INSERT INTO `placas_embratex` (`nomePlaca`,`quantidade`,`situacao`, `local`, `qtdParaSituacaoBaixa` , `qtdParaSituacaoOk`, `regUltimaEdicao`, `fotoUltimoUser`) VALUES ('Guarda Fio II', 2, 'Ok', 'Fuso','4','2', '70297', 'NULL');
          INSERT INTO `placas_embratex` (`nomePlaca`,`quantidade`,`situacao`, `local`, `qtdParaSituacaoBaixa` , `qtdParaSituacaoOk`, `regUltimaEdicao`, `fotoUltimoUser`) VALUES ('Detector de Fio I', 2, 'Ok', 'Fuso','4','2', '70297', 'NULL');
          INSERT INTO `placas_embratex` (`nomePlaca`,`quantidade`,`situacao`, `local`, `qtdParaSituacaoBaixa` , `qtdParaSituacaoOk`, `regUltimaEdicao`, `fotoUltimoUser`) VALUES ('Detector de Fio II', 2, 'Ok', 'Fuso','4','2', '70297', 'NULL');
          INSERT INTO `placas_embratex` (`nomePlaca`,`quantidade`,`situacao`, `local`, `qtdParaSituacaoBaixa` , `qtdParaSituacaoOk`, `regUltimaEdicao`, `fotoUltimoUser`) VALUES ('Enchufe I', 2, 'Ok', 'Fuso','4','2', '70297', 'NULL');
          INSERT INTO `placas_embratex` (`nomePlaca`,`quantidade`,`situacao`, `local`, `qtdParaSituacaoBaixa` , `qtdParaSituacaoOk`, `regUltimaEdicao`, `fotoUltimoUser`) VALUES ('Enchufe II', 2, 'Ok', 'Fuso','4','2', '70297', 'NULL');
          INSERT INTO `placas_embratex` (`nomePlaca`,`quantidade`,`situacao`, `local`, `qtdParaSituacaoBaixa` , `qtdParaSituacaoOk`, `regUltimaEdicao`, `fotoUltimoUser`) VALUES ('EHR I', 2, 'Ok', 'Fuso','4','2', '70297', 'NULL');
          INSERT INTO `placas_embratex` (`nomePlaca`,`quantidade`,`situacao`, `local`, `qtdParaSituacaoBaixa` , `qtdParaSituacaoOk`, `regUltimaEdicao`, `fotoUltimoUser`) VALUES ('EHR II', 2, 'Ok', 'Fuso','4','2', '70297', 'NULL');
          INSERT INTO `placas_embratex` (`nomePlaca`,`quantidade`,`situacao`, `local`, `qtdParaSituacaoBaixa` , `qtdParaSituacaoOk`, `regUltimaEdicao`, `fotoUltimoUser`) VALUES ('Fonte Seção I', 2, 'Ok', 'Fuso','4','2', '70297', 'NULL');
          INSERT INTO `placas_embratex` (`nomePlaca`,`quantidade`,`situacao`, `local`, `qtdParaSituacaoBaixa` , `qtdParaSituacaoOk`, `regUltimaEdicao`, `fotoUltimoUser`) VALUES ('Fonte Seção II', 2, 'Ok', 'Fuso','4','2', '70297', 'NULL');
          INSERT INTO `placas_embratex` (`nomePlaca`,`quantidade`,`situacao`, `local`, `qtdParaSituacaoBaixa` , `qtdParaSituacaoOk`, `regUltimaEdicao`, `fotoUltimoUser`) VALUES ('Fonte Seção Preta', 2, 'Ok', 'Fuso','4','2', '70297', 'NULL');

INSERT INTO `placas_wentex` (`nomePlaca`,`quantidade`,`situacao`, `local`, `qtdParaSituacaoBaixa` , `qtdParaSituacaoOk`, `regUltimaEdicao`, `fotoUltimoUser`) VALUES ('A53',2,'ok','Openend','4','2','70297', 'NULL');
INSERT INTO `placas_wentex` (`nomePlaca`,`quantidade`,`situacao`, `local`, `qtdParaSituacaoBaixa` , `qtdParaSituacaoOk`, `regUltimaEdicao`, `fotoUltimoUser`) VALUES ('AMPLIFICADOR DE SAIDA/ENTRADA (TRM)',2,'ok','Openend','4','2','70297', 'NULL');
INSERT INTO `placas_wentex` (`nomePlaca`,`quantidade`,`situacao`, `local`, `qtdParaSituacaoBaixa` , `qtdParaSituacaoOk`, `regUltimaEdicao`, `fotoUltimoUser`) VALUES ('ASP',2,'ok','Openend','4','2','70297', 'NULL');
INSERT INTO `placas_wentex` (`nomePlaca`,`quantidade`,`situacao`, `local`, `qtdParaSituacaoBaixa` , `qtdParaSituacaoOk`, `regUltimaEdicao`, `fotoUltimoUser`) VALUES ('CPU',2,'ok','Openend','4','2','70297', 'NULL');
INSERT INTO `placas_wentex` (`nomePlaca`,`quantidade`,`situacao`, `local`, `qtdParaSituacaoBaixa` , `qtdParaSituacaoOk`, `regUltimaEdicao`, `fotoUltimoUser`) VALUES ('D/A',2,'ok','Openend','4','2','70297', 'NULL');
INSERT INTO `placas_wentex` (`nomePlaca`,`quantidade`,`situacao`, `local`, `qtdParaSituacaoBaixa` , `qtdParaSituacaoOk`, `regUltimaEdicao`, `fotoUltimoUser`) VALUES ('ENCHUFF',2,'ok','Openend','4','2','70297', 'NULL');
INSERT INTO `placas_wentex` (`nomePlaca`,`quantidade`,`situacao`, `local`, `qtdParaSituacaoBaixa` , `qtdParaSituacaoOk`, `regUltimaEdicao`, `fotoUltimoUser`) VALUES ('FONTE',2,'ok','Openend','4','2','70297', 'NULL');
INSERT INTO `placas_wentex` (`nomePlaca`,`quantidade`,`situacao`, `local`, `qtdParaSituacaoBaixa` , `qtdParaSituacaoOk`, `regUltimaEdicao`, `fotoUltimoUser`) VALUES ('FONTE ALIMENTAÇÃO',2,'ok','Openend','4','2','70297', 'NULL');
INSERT INTO `placas_wentex` (`nomePlaca`,`quantidade`,`situacao`, `local`, `qtdParaSituacaoBaixa` , `qtdParaSituacaoOk`, `regUltimaEdicao`, `fotoUltimoUser`) VALUES ('FOTOCÊLULA ROTOR',2,'ok','Openend','4','2','70297', 'NULL');
INSERT INTO `placas_wentex` (`nomePlaca`,`quantidade`,`situacao`, `local`, `qtdParaSituacaoBaixa` , `qtdParaSituacaoOk`, `regUltimaEdicao`, `fotoUltimoUser`) VALUES ('GUARDA FIO ASW',2,'ok','Openend','4','2','70297', 'NULL');
INSERT INTO `placas_wentex` (`nomePlaca`,`quantidade`,`situacao`, `local`, `qtdParaSituacaoBaixa` , `qtdParaSituacaoOk`, `regUltimaEdicao`, `fotoUltimoUser`) VALUES ('GUARDA-FIO',2,'ok','Openend','4','2','70297', 'NULL');
INSERT INTO `placas_wentex` (`nomePlaca`,`quantidade`,`situacao`, `local`, `qtdParaSituacaoBaixa` , `qtdParaSituacaoOk`, `regUltimaEdicao`, `fotoUltimoUser`) VALUES ('IMPRESSORA',2,'ok','Openend','4','2','70297', 'NULL');
INSERT INTO `placas_wentex` (`nomePlaca`,`quantidade`,`situacao`, `local`, `qtdParaSituacaoBaixa` , `qtdParaSituacaoOk`, `regUltimaEdicao`, `fotoUltimoUser`) VALUES ('INTERFACE DE ROTAÇÃO',2,'ok','Openend','4','2','70297', 'NULL');
INSERT INTO `placas_wentex` (`nomePlaca`,`quantidade`,`situacao`, `local`, `qtdParaSituacaoBaixa` , `qtdParaSituacaoOk`, `regUltimaEdicao`, `fotoUltimoUser`) VALUES ('MODULO DE ENTRADA',2,'ok','Openend','4','2','70297', 'NULL');
INSERT INTO `placas_wentex` (`nomePlaca`,`quantidade`,`situacao`, `local`, `qtdParaSituacaoBaixa` , `qtdParaSituacaoOk`, `regUltimaEdicao`, `fotoUltimoUser`) VALUES ('MODULO DE SAIDA',2,'ok','Openend','4','2','70297', 'NULL');
INSERT INTO `placas_wentex` (`nomePlaca`,`quantidade`,`situacao`, `local`, `qtdParaSituacaoBaixa` , `qtdParaSituacaoOk`, `regUltimaEdicao`, `fotoUltimoUser`) VALUES ('MODULO ENTRADA IN',2,'ok','Openend','4','2','70297', 'NULL');
INSERT INTO `placas_wentex` (`nomePlaca`,`quantidade`,`situacao`, `local`, `qtdParaSituacaoBaixa` , `qtdParaSituacaoOk`, `regUltimaEdicao`, `fotoUltimoUser`) VALUES ('MODULO SAIDA OUT',2,'ok','Openend','4','2','70297', 'NULL');
INSERT INTO `placas_wentex` (`nomePlaca`,`quantidade`,`situacao`, `local`, `qtdParaSituacaoBaixa` , `qtdParaSituacaoOk`, `regUltimaEdicao`, `fotoUltimoUser`) VALUES ('ONDULADOR',2,'ok','Openend','4','2','70297', 'NULL');
INSERT INTO `placas_wentex` (`nomePlaca`,`quantidade`,`situacao`, `local`, `qtdParaSituacaoBaixa` , `qtdParaSituacaoOk`, `regUltimaEdicao`, `fotoUltimoUser`) VALUES ('PLACA COROLAB MODELO VELHO',2,'ok','Openend','4','2','70297', 'NULL');
INSERT INTO `placas_wentex` (`nomePlaca`,`quantidade`,`situacao`, `local`, `qtdParaSituacaoBaixa` , `qtdParaSituacaoOk`, `regUltimaEdicao`, `fotoUltimoUser`) VALUES ('PLACA DE ACOPLAMENTO',2,'ok','Openend','4','2','70297', 'NULL');
INSERT INTO `placas_wentex` (`nomePlaca`,`quantidade`,`situacao`, `local`, `qtdParaSituacaoBaixa` , `qtdParaSituacaoOk`, `regUltimaEdicao`, `fotoUltimoUser`) VALUES ('PLACA DE COMANDO',2,'ok','Openend','4','2','70297', 'NULL');
INSERT INTO `placas_wentex` (`nomePlaca`,`quantidade`,`situacao`, `local`, `qtdParaSituacaoBaixa` , `qtdParaSituacaoOk`, `regUltimaEdicao`, `fotoUltimoUser`) VALUES ('PLACA DE COMANDO A50',2,'ok','Openend','4','2','70297', 'NULL');
INSERT INTO `placas_wentex` (`nomePlaca`,`quantidade`,`situacao`, `local`, `qtdParaSituacaoBaixa` , `qtdParaSituacaoOk`, `regUltimaEdicao`, `fotoUltimoUser`) VALUES ('PLACA DE RELÉ A51',2,'ok','Openend','4','2','70297', 'NULL');
INSERT INTO `placas_wentex` (`nomePlaca`,`quantidade`,`situacao`, `local`, `qtdParaSituacaoBaixa` , `qtdParaSituacaoOk`, `regUltimaEdicao`, `fotoUltimoUser`) VALUES ('PLACA DE RELÉ A71',2,'ok','Openend','4','2','70297', 'NULL');
INSERT INTO `placas_wentex` (`nomePlaca`,`quantidade`,`situacao`, `local`, `qtdParaSituacaoBaixa` , `qtdParaSituacaoOk`, `regUltimaEdicao`, `fotoUltimoUser`) VALUES ('PLACA DE RELÉ A91',2,'ok','Openend','4','2','70297', 'NULL');
INSERT INTO `placas_wentex` (`nomePlaca`,`quantidade`,`situacao`, `local`, `qtdParaSituacaoBaixa` , `qtdParaSituacaoOk`, `regUltimaEdicao`, `fotoUltimoUser`) VALUES ('PLACA DISPLAY',2,'ok','Openend','4','2','70297', 'NULL');
INSERT INTO `placas_wentex` (`nomePlaca`,`quantidade`,`situacao`, `local`, `qtdParaSituacaoBaixa` , `qtdParaSituacaoOk`, `regUltimaEdicao`, `fotoUltimoUser`) VALUES ('PONTO ESTRELA',2,'ok','Openend','4','2','70297', 'NULL');
INSERT INTO `placas_wentex` (`nomePlaca`,`quantidade`,`situacao`, `local`, `qtdParaSituacaoBaixa` , `qtdParaSituacaoOk`, `regUltimaEdicao`, `fotoUltimoUser`) VALUES ('POSICOM',2,'ok','Openend','4','2','70297', 'NULL');
INSERT INTO `placas_wentex` (`nomePlaca`,`quantidade`,`situacao`, `local`, `qtdParaSituacaoBaixa` , `qtdParaSituacaoOk`, `regUltimaEdicao`, `fotoUltimoUser`) VALUES ('POWER SUPPLY',2,'ok','Openend','4','2','70297', 'NULL');
INSERT INTO `placas_wentex` (`nomePlaca`,`quantidade`,`situacao`, `local`, `qtdParaSituacaoBaixa` , `qtdParaSituacaoOk`, `regUltimaEdicao`, `fotoUltimoUser`) VALUES ('PVM',2,'ok','Openend','4','2','70297', 'NULL');
INSERT INTO `placas_wentex` (`nomePlaca`,`quantidade`,`situacao`, `local`, `qtdParaSituacaoBaixa` , `qtdParaSituacaoOk`, `regUltimaEdicao`, `fotoUltimoUser`) VALUES ('REGUA DE BORNES',2,'ok','Openend','4','2','70297', 'NULL');
INSERT INTO `placas_wentex` (`nomePlaca`,`quantidade`,`situacao`, `local`, `qtdParaSituacaoBaixa` , `qtdParaSituacaoOk`, `regUltimaEdicao`, `fotoUltimoUser`) VALUES ('SENSOR DA MECHA',2,'ok','Openend','4','2','70297', 'NULL');
INSERT INTO `placas_wentex` (`nomePlaca`,`quantidade`,`situacao`, `local`, `qtdParaSituacaoBaixa` , `qtdParaSituacaoOk`, `regUltimaEdicao`, `fotoUltimoUser`) VALUES ('SENSOR DE REVERSÃO LATERAL',2,'ok','Openend','4','2','70297', 'NULL');
INSERT INTO `placas_wentex` (`nomePlaca`,`quantidade`,`situacao`, `local`, `qtdParaSituacaoBaixa` , `qtdParaSituacaoOk`, `regUltimaEdicao`, `fotoUltimoUser`) VALUES ('TEMPERATURA ROLAMENTO CB FINAL',2,'ok','Openend','4','2','70297', 'NULL');
INSERT INTO `placas_wentex` (`nomePlaca`,`quantidade`,`situacao`, `local`, `qtdParaSituacaoBaixa` , `qtdParaSituacaoOk`, `regUltimaEdicao`, `fotoUltimoUser`) VALUES ('TEMPERATURA ROLAMENTO CB INICIAL',2,'ok','Openend','4','2','70297', 'NULL');
INSERT INTO `placas_wentex` (`nomePlaca`,`quantidade`,`situacao`, `local`, `qtdParaSituacaoBaixa` , `qtdParaSituacaoOk`, `regUltimaEdicao`, `fotoUltimoUser`) VALUES ('TESTADOR DE EMENDAS',2,'ok','Openend','4','2','70297', 'NULL');
INSERT INTO `placas_wentex` (`nomePlaca`,`quantidade`,`situacao`, `local`, `qtdParaSituacaoBaixa` , `qtdParaSituacaoOk`, `regUltimaEdicao`, `fotoUltimoUser`) VALUES ('UPR',2,'ok','Openend','4','2','70297', 'NULL');
INSERT INTO `placas_wentex` (`nomePlaca`,`quantidade`,`situacao`, `local`, `qtdParaSituacaoBaixa` , `qtdParaSituacaoOk`, `regUltimaEdicao`, `fotoUltimoUser`) VALUES ('VERT-VERST',2,'ok','Openend','4','2','70297', 'NULL');
INSERT INTO `placas_wentex` (`nomePlaca`,`quantidade`,`situacao`, `local`, `qtdParaSituacaoBaixa` , `qtdParaSituacaoOk`, `regUltimaEdicao`, `fotoUltimoUser`) VALUES ('WR RELÉ',2,'ok','Openend','4','2','70297', 'NULL');
INSERT INTO `placas_wentex` (`nomePlaca`,`quantidade`,`situacao`, `local`, `qtdParaSituacaoBaixa` , `qtdParaSituacaoOk`, `regUltimaEdicao`, `fotoUltimoUser`) VALUES ('WR-INT',2,'ok','Openend','4','2','70297', 'NULL');
INSERT INTO `placas_wentex` (`nomePlaca`,`quantidade`,`situacao`, `local`, `qtdParaSituacaoBaixa` , `qtdParaSituacaoOk`, `regUltimaEdicao`, `fotoUltimoUser`) VALUES ('PLACA COROLAB SEMI NOVO',2,'ok','Openend','4','2','70297', 'NULL');
INSERT INTO `placas_wentex` (`nomePlaca`,`quantidade`,`situacao`, `local`, `qtdParaSituacaoBaixa` , `qtdParaSituacaoOk`, `regUltimaEdicao`, `fotoUltimoUser`) VALUES ('EHR 288',2,'ok','Openend','4','2','70297', 'NULL');
INSERT INTO `placas_wentex` (`nomePlaca`,`quantidade`,`situacao`, `local`, `qtdParaSituacaoBaixa` , `qtdParaSituacaoOk`, `regUltimaEdicao`, `fotoUltimoUser`) VALUES ('DETECTOR DE FIO',2,'ok','Openend','4','2','70297', 'NULL');
INSERT INTO `placas_wentex` (`nomePlaca`,`quantidade`,`situacao`, `local`, `qtdParaSituacaoBaixa` , `qtdParaSituacaoOk`, `regUltimaEdicao`, `fotoUltimoUser`) VALUES ('CPU COROLAB V1.1R',2,'ok','Openend','4','2','70297', 'NULL');
INSERT INTO `placas_wentex` (`nomePlaca`,`quantidade`,`situacao`, `local`, `qtdParaSituacaoBaixa` , `qtdParaSituacaoOk`, `regUltimaEdicao`, `fotoUltimoUser`) VALUES ('CPU COROLAB V1.39',2,'ok','Openend','4','2','70297', 'NULL');
INSERT INTO `placas_wentex` (`nomePlaca`,`quantidade`,`situacao`, `local`, `qtdParaSituacaoBaixa` , `qtdParaSituacaoOk`, `regUltimaEdicao`, `fotoUltimoUser`) VALUES ('TECLADO INFORMATE',2,'ok','Openend','4','2','70297', 'NULL');
INSERT INTO `placas_wentex` (`nomePlaca`,`quantidade`,`situacao`, `local`, `qtdParaSituacaoBaixa` , `qtdParaSituacaoOk`, `regUltimaEdicao`, `fotoUltimoUser`) VALUES ('CABEÇA COROLAB TIPO B',2,'ok','Openend','4','2','70297', 'NULL');
INSERT INTO `placas_wentex` (`nomePlaca`,`quantidade`,`situacao`, `local`, `qtdParaSituacaoBaixa` , `qtdParaSituacaoOk`, `regUltimaEdicao`, `fotoUltimoUser`) VALUES ('UPR INFORMATO V3.5',2,'ok','Openend','4','2','70297', 'NULL');


INSERT INTO `placas_embratex` (`nomePlaca`,`quantidade`,`situacao`, `local`, `qtdParaSituacaoBaixa` , `qtdParaSituacaoOk`, `regUltimaEdicao`, `fotoUltimoUser`) VALUES ('AMPLIFICADORA DE SINAL',2,'ok','Openend360','4','2','70297','NULL');
INSERT INTO `placas_embratex` (`nomePlaca`,`quantidade`,`situacao`, `local`, `qtdParaSituacaoBaixa` , `qtdParaSituacaoOk`, `regUltimaEdicao`, `fotoUltimoUser`) VALUES ('ASP',2,'ok','Openend360','4','2','70297','NULL');
INSERT INTO `placas_embratex` (`nomePlaca`,`quantidade`,`situacao`, `local`, `qtdParaSituacaoBaixa` , `qtdParaSituacaoOk`, `regUltimaEdicao`, `fotoUltimoUser`) VALUES ('BT-INT',2,'ok','Openend360','4','2','70297','NULL');
INSERT INTO `placas_embratex` (`nomePlaca`,`quantidade`,`situacao`, `local`, `qtdParaSituacaoBaixa` , `qtdParaSituacaoOk`, `regUltimaEdicao`, `fotoUltimoUser`) VALUES ('DISTRIBUIÇÃO DE TUBETES',2,'ok','Openend360','4','2','70297','NULL');
INSERT INTO `placas_embratex` (`nomePlaca`,`quantidade`,`situacao`, `local`, `qtdParaSituacaoBaixa` , `qtdParaSituacaoOk`, `regUltimaEdicao`, `fotoUltimoUser`) VALUES ('DISTRIBUIDOR DOS CONECTORES',2,'ok','Openend360','4','2','70297','NULL');
INSERT INTO `placas_embratex` (`nomePlaca`,`quantidade`,`situacao`, `local`, `qtdParaSituacaoBaixa` , `qtdParaSituacaoOk`, `regUltimaEdicao`, `fotoUltimoUser`) VALUES ('FONTE ALIMENTAÇÃO',2,'ok','Openend360','4','2','70297','NULL');
INSERT INTO `placas_embratex` (`nomePlaca`,`quantidade`,`situacao`, `local`, `qtdParaSituacaoBaixa` , `qtdParaSituacaoOk`, `regUltimaEdicao`, `fotoUltimoUser`) VALUES ('FONTE DC/DC',2,'ok','Openend360','4','2','70297','NULL');
INSERT INTO `placas_embratex` (`nomePlaca`,`quantidade`,`situacao`, `local`, `qtdParaSituacaoBaixa` , `qtdParaSituacaoOk`, `regUltimaEdicao`, `fotoUltimoUser`) VALUES ('FONTE DE ALIMENTAÇÃO PRIMARIA',2,'ok','Openend360','4','2','70297','NULL');
INSERT INTO `placas_embratex` (`nomePlaca`,`quantidade`,`situacao`, `local`, `qtdParaSituacaoBaixa` , `qtdParaSituacaoOk`, `regUltimaEdicao`, `fotoUltimoUser`) VALUES ('FU-CRM',2,'ok','Openend360','4','2','70297','NULL');
INSERT INTO `placas_embratex` (`nomePlaca`,`quantidade`,`situacao`, `local`, `qtdParaSituacaoBaixa` , `qtdParaSituacaoOk`, `regUltimaEdicao`, `fotoUltimoUser`) VALUES ('FU-INT',2,'ok','Openend360','4','2','70297','NULL');
INSERT INTO `placas_embratex` (`nomePlaca`,`quantidade`,`situacao`, `local`, `qtdParaSituacaoBaixa` , `qtdParaSituacaoOk`, `regUltimaEdicao`, `fotoUltimoUser`) VALUES ('GUARDA-FIO',2,'ok','Openend360','4','2','70297','NULL');
INSERT INTO `placas_embratex` (`nomePlaca`,`quantidade`,`situacao`, `local`, `qtdParaSituacaoBaixa` , `qtdParaSituacaoOk`, `regUltimaEdicao`, `fotoUltimoUser`) VALUES ('IN-INT',2,'ok','Openend360','4','2','70297','NULL');
INSERT INTO `placas_embratex` (`nomePlaca`,`quantidade`,`situacao`, `local`, `qtdParaSituacaoBaixa` , `qtdParaSituacaoOk`, `regUltimaEdicao`, `fotoUltimoUser`) VALUES ('PLACA COROLAB',2,'ok','Openend360','4','2','70297','NULL');
INSERT INTO `placas_embratex` (`nomePlaca`,`quantidade`,`situacao`, `local`, `qtdParaSituacaoBaixa` , `qtdParaSituacaoOk`, `regUltimaEdicao`, `fotoUltimoUser`) VALUES ('REGUAS',2,'ok','Openend360','4','2','70297','NULL');
INSERT INTO `placas_embratex` (`nomePlaca`,`quantidade`,`situacao`, `local`, `qtdParaSituacaoBaixa` , `qtdParaSituacaoOk`, `regUltimaEdicao`, `fotoUltimoUser`) VALUES ('SENSOR DA MECHA',2,'ok','Openend360','4','2','70297','NULL');
INSERT INTO `placas_embratex` (`nomePlaca`,`quantidade`,`situacao`, `local`, `qtdParaSituacaoBaixa` , `qtdParaSituacaoOk`, `regUltimaEdicao`, `fotoUltimoUser`) VALUES ('SUPERVISÃO DE MANCAIS E TEMP.',2,'ok','Openend360','4','2','70297','NULL');
INSERT INTO `placas_embratex` (`nomePlaca`,`quantidade`,`situacao`, `local`, `qtdParaSituacaoBaixa` , `qtdParaSituacaoOk`, `regUltimaEdicao`, `fotoUltimoUser`) VALUES ('SUPERVISÃO DE VELOCIDADE',2,'ok','Openend360','4','2','70297','NULL');
INSERT INTO `placas_embratex` (`nomePlaca`,`quantidade`,`situacao`, `local`, `qtdParaSituacaoBaixa` , `qtdParaSituacaoOk`, `regUltimaEdicao`, `fotoUltimoUser`) VALUES ('TEMPERATURA E DEPRESÃO',2,'ok','Openend360','4','2','70297','NULL');
INSERT INTO `placas_embratex` (`nomePlaca`,`quantidade`,`situacao`, `local`, `qtdParaSituacaoBaixa` , `qtdParaSituacaoOk`, `regUltimaEdicao`, `fotoUltimoUser`) VALUES ('TRM',2,'ok','Openend360','4','2','70297','NULL');
INSERT INTO `placas_embratex` (`nomePlaca`,`quantidade`,`situacao`, `local`, `qtdParaSituacaoBaixa` , `qtdParaSituacaoOk`, `regUltimaEdicao`, `fotoUltimoUser`) VALUES ('EHR 360',2,'ok','Openend360','4','2','70297','NULL');
INSERT INTO `placas_embratex` (`nomePlaca`,`quantidade`,`situacao`, `local`, `qtdParaSituacaoBaixa` , `qtdParaSituacaoOk`, `regUltimaEdicao`, `fotoUltimoUser`) VALUES ('DETECTOR DE FIO 360',2,'ok','Openend360','4','2','70297','NULL');
INSERT INTO `placas_embratex` (`nomePlaca`,`quantidade`,`situacao`, `local`, `qtdParaSituacaoBaixa` , `qtdParaSituacaoOk`, `regUltimaEdicao`, `fotoUltimoUser`) VALUES ('ENCHUFE',2,'ok','Openend360','4','2','70297','NULL');
INSERT INTO `placas_embratex` (`nomePlaca`,`quantidade`,`situacao`, `local`, `qtdParaSituacaoBaixa` , `qtdParaSituacaoOk`, `regUltimaEdicao`, `fotoUltimoUser`) VALUES ('CPU COROLAB V2.05',2,'ok','Openend360','4','2','70297','NULL');
INSERT INTO `placas_embratex` (`nomePlaca`,`quantidade`,`situacao`, `local`, `qtdParaSituacaoBaixa` , `qtdParaSituacaoOk`, `regUltimaEdicao`, `fotoUltimoUser`) VALUES ('CABEÇA COROLAB L.P',2,'ok','Openend360','4','2','70297','NULL');
INSERT INTO `placas_embratex` (`nomePlaca`,`quantidade`,`situacao`, `local`, `qtdParaSituacaoBaixa` , `qtdParaSituacaoOk`, `regUltimaEdicao`, `fotoUltimoUser`) VALUES ('UPR INFORMATO V2.05',2,'ok','Openend360','4','2','70297','NULL');
INSERT INTO `placas_embratex` (`nomePlaca`,`quantidade`,`situacao`, `local`, `qtdParaSituacaoBaixa` , `qtdParaSituacaoOk`, `regUltimaEdicao`, `fotoUltimoUser`) VALUES ('UPR V2.4',2,'ok','Openend360','4','2','70297','NULL');



INSERT INTO `placas_embratex` (`nomePlaca`,`quantidade`,`situacao`, `local`, `qtdParaSituacaoBaixa` , `qtdParaSituacaoOk`, `regUltimaEdicao`, `fotoUltimoUser`) VALUES ('N305.1',2,'ok','Oerieter','4','2','70297','NULL');












          */