import React, {useState, useEffect} from 'react';
import {useQuery} from '@apollo/react-hooks';
import gql from 'graphql-tag'
import * as Ibage from '../../userExample'
import {Grommet, Box, FormField, TextInput, Button,Text, Heading, Image} from 'grommet';
import TableControleDePlacas from './table-controle-placas'
import {Row, Container, Col} from 'react-bootstrap';
import '../style/render-tables.css'
import {Hide , View} from 'grommet-icons';

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
     brand: 'red'
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
    const [reveal, setReveal] = useState(false);

    const [verifiedUser, setVerifiedUser] = useState();
    const [checkSenha, setCheckSenha] = useState();

    const [fistTime, setFirstTime] = useState ();


    const GET_USER = gql`
      
        query Funcao($idFuncao : String, $reg: String) { 
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
        
        if (checkSenha == data.users_verificado.senha) {
          setNomeFuncao(data.lista_funcao !== null ? data.lista_funcao.nome_funcao : ' ')
          setNome(data.atualiza_colaborador.nome)
          //setFuncao(data.atualiza_colaborador.lista_funcao)
          setRegToGo(data.atualiza_colaborador.registro)
          setFoto(data.atualiza_colaborador.foto)  
          //
          data.atualiza_colaborador.nome !== null || data.atualiza_colaborador.nome !== undefined ? setUserOn(true) : setUserOn(false)  
        } else {

          setReg(null)
          setCheckSenha(null)
        }
      

     } else { 
        setUserOn(false)
        setNome(null)
        setFuncao(null)
        setRegToGo(null)
        setFoto(Ibage.img) 
      }
    },[data])
   
    
  function handleLogout() {
    document.getElementById('senha-input').value = null
    document.getElementById('text-input').value = null
    setNome(null);
    setFuncao(null);
    setFoto(Ibage.img);
    setReg(null)
    setNomeFuncao(null)
    setValue(null)
    setCheckSenha(null)
  }
        
    return (
      <Grommet theme= {customFormFieldTheme }>
          <TableControleDePlacas id = 'grid-item' unidade = {props.unidade} local = {props.local} user = {userOn} userImg = {userOn === true ? foto : false}  userReg = {regToGo} />
          
          
        <Box 
          id = 'box-user-log'
          direction = "row-responsive"
          border 
          align="center"
          gap = "medium"
          elevation = "medium"
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
                      id = "entrar-user"
                      > Login: </Heading>

                          <TextInput        
                              placeholder="registro"
                              type = "text" 
                              id="text-input"
                              
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
                                id="senha-input"
                                
                                
                                onChange= {e => 
                                  setCheckSenha(e.target.value) 
                                  
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
                        id = "botoes"
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
                      id = "data-users"
                    >
                      <Heading 
                      id = "nome-user"
                      size = "xsmall"
                      alignSelf = "center"
                      >{getNomeAndSobrenome(nome)}
                      </Heading > 

                      <Text
                      id = "funcao-user"
                      >{nomeFuncao != null ? nomeFuncao.toString().trim() : ''}
                      </Text>
                    </Box>
         </Box>
      
      </Grommet>
  
    );
  }


export default TableGeral;