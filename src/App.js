import React, {useState} from 'react';
import './App.css';
import { ApolloClient } from 'apollo-client'
import { createHttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { ApolloProvider } from '@apollo/react-hooks';


import Button from 'react-bootstrap/Button'
import TelaInicial from './client/components/tela-inicial'
import {PowerCycle} from 'grommet-icons'
const httpLink = createHttpLink({
  uri: 'http://132.1.6.117:5000/graphql'
})

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache()
})



function App(props) {

  const [unidade, setUnidade] = useState('Embratex');
    
  return (

    <ApolloProvider client = {client}>
    <div className="App">
      <header className="App-header">
        
          Unidade Atual :&nbsp;<b> {` ${unidade}`} </b> &nbsp; &nbsp;  
          <Button
            onClick = {() => unidade === 'Wentex' ? setUnidade('Embratex') : setUnidade('Wentex') }

          > <PowerCycle color = {'white'}/> </Button>
          

      </header>

      <main className = 'App-main'>
        
        <TelaInicial unidade = {unidade}/>
 
      </main>


    </div>
    
   </ApolloProvider>
  );
}

export default App;
