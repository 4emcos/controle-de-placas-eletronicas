import React, {useState, useEffect} from 'react';
import {useQuery} from '@apollo/react-hooks';
import gql from 'graphql-tag'
import * as Ibage from '../../userExample'
import {Grommet, Box, FormField, TextInput, Button,Text, Heading, Image} from 'grommet';
import TableControleDePlacas from './table-controle-placas'
import {Row, Container, Col} from 'react-bootstrap';
import '../style/render-tables.css'


function getNomeAndSobrenome(nome) {
    var list = []
    if(nome !== null && nome !== undefined){
      list[0] = nome.toString().split(' ')[0] 
      list[1] = nome.toString().split(' ')[1] 
      return `${list[0]} ${list[1]}`
    }  
    else { return ''}
  }

  
const customFormFieldTheme = {
  global:{
    colors:{
      control :{
        light : "black",
        dark : 'black'
      }
    }
  },

  formField: {
    label: {
      color: "dark-3",
      
    },   
  }
};


function TableGeral (props) {
    const [nome, setNome]  = useState('');
    const [funcao, setFuncao] = useState ();
    const [nomeFuncao, setNomeFuncao] = useState();
    const [value, setValue] = useState ();
    const [reg, setReg ] = useState ('a');
    const [regToGo, setRegToGo] = useState ();
    const [foto, setFoto] = useState(Ibage.img);
    const [userOn, setUserOn] = useState();
  
    const GET_USER = gql`
      
        query Funcao($idFuncao : String) { 
          lista_funcao (id_funcao : $idFuncao){
            nome_funcao
            }
  
            atualiza_colaborador(registro: ${reg}){
              registro
              nome
              lista_funcao
              foto
          }
        }
      `;
  
    const {refetch, data} = useQuery(GET_USER,{
      variables : {idFuncao : funcao}
    })
  
  
    useEffect (() => {
  
      if (data !== undefined && data.atualiza_colaborador !== null) {
        setFuncao(data.atualiza_colaborador.lista_funcao)
        refetch().then( (e) => setNomeFuncao(e.data.lista_funcao !== null ? e.data.lista_funcao.nome_funcao : '') )
        setNome(data.atualiza_colaborador.nome)
        //setFuncao(data.atualiza_colaborador.lista_funcao)
        setRegToGo(data.atualiza_colaborador.registro)
        setFoto(data.atualiza_colaborador.foto)  
        //
  
        data.atualiza_colaborador.nome !== null || data.atualiza_colaborador.nome !== undefined ? setUserOn(true) : setUserOn(false)
      } else { 
        setUserOn(false)
        setNome(null)
        setFuncao(null)
        setRegToGo(null)
        setFoto(Ibage.img) 
      }
    },[data])
   
    
  function handleLogout() {
    setNome('');
    setFuncao('');
    setFoto(Ibage);
    setReg(null)
    setNomeFuncao('')
  }
        
    return (
      <Grommet theme= {customFormFieldTheme }>
          <TableControleDePlacas id = 'grid-item' unidade = {props.unidade} local = {props.local} user = {userOn} userImg = {userOn === true ? foto : false}  userReg = {regToGo} />
          <Box 
          id = 'box-user-log'
          border 
          align="center"
          elevation = "medium"
          background = "white"
          
          >
              <Container id = "user-container">
              
                <Row>
                  <Col
                  id = "item-user"
                   xs> 
           
                   <Image id= "ibage" variant="center" src= {`data:image/jpg;base64,${foto}`} style={{ width: '5.8rem' ,  height: '8rem' }} />
                  
                  </Col>  

                  <Col
                  id = "item-user"
                   xs={{ order: 1 }}> 
  
                    <Box>
                    <FormField label="Registro:" htmlFor="text-input" {...props} >
                    <TextInput
                        plain
                        placeholder="registro"
                        type = "text" 
                        id="text-input"
                        
                        onChange= {e => 
                            {
                            switch (e.target.value.length) {
                                case 5:
                                    setValue(`"001150${e.target.value}"`)
                                break;
    
                                case 3:
                                    setValue(`"00115000${e.target.value}"`)
                                break;
    
                                case 4:
                                    setValue(`"0011500${e.target.value}"`)
                                break;
    
                                case 6:
                                    setValue(`"00115${e.target.value}"`)
                                break;
                            }         
                            }}
                            onKeyDown = {(e) => e.key === 'Enter' ? setReg(value) : ''}
                            
                            />
                    </FormField>
                        
                  
                    <Row
                    id = "butoes-entrar-sair"
                    >
                      
                      <Button
                          primary 
                          color = {"#00739D"}
                          onClick = {() => setReg(value) }
                          label="Entrar" />
                    

                      <Button
                          primary 
                          color = {"#00739D"}
                          onClick = {() => handleLogout()}
                          label="Sair" 
                          />
                    

                    </Row>
                   
                    </Box>
                  </Col>
                  <Col 
                  id = "item-user"
                 
                  xs={{ order: 2 }}> 

                  <div
                  id = "nome-funcao"
                  >
                    <Heading 
                    id = "nome-user"
                    size = "xsmall"
                    alignSelf = "center"
                    >{getNomeAndSobrenome(nome)}</Heading > 
                    <Text
                    id = "funcao-user"
                    >{nomeFuncao != null ? nomeFuncao.toString().trim() : ''}
                    </Text>
                    </div>
                  </Col>
                  
                </Row>
             
              </Container>
          
              </Box>
          
      </Grommet>
  
    );
  }


export default TableGeral;