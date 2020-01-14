import React, {useState, useEffect} from 'react';
import {Row, Container, Col, Card, Button, Table, Collapse } from 'react-bootstrap';
import TableGeral from './render-tables'
import '../style/tela-inicial.css'


function TelaInicial(props) {
    const [openAbTable, setOpenAbTable] = useState(false);
    const [openCaTable, setOpenCaTable] = useState(false);
    const [openFuTable, setOpenFuTable] = useState(false);
    const [openOeTable, setOpenOeTable] = useState(false);
    const [openOemTable, setOpenOemTable] = useState(false);
    
    useEffect (() => {
        const elOfAb = document.getElementById("placas-abertura-button")
        elOfAb.classList.add('allow')          
        if (!openAbTable){
            elOfAb.classList.remove('allow')
           }

        const elOfCa = document.getElementById("placas-cardas-button")
        elOfCa.classList.add('allow')          
        if (!openCaTable){
            elOfCa.classList.remove('allow')
            }


        const elOfFu = document.getElementById("placas-fuso-button")
        elOfFu.classList.add('allow')          
        if (!openFuTable){
            elOfFu.classList.remove('allow')
            }

          
        const elOfOe = document.getElementById("placas-openend-button")
        elOfOe.classList.add('allow')          
        if (!openOeTable){
          elOfOe.classList.remove('allow')
            }
          

        if (props.unidade == "Wentex") {
          const elOfOem = document.getElementById('placas-openend360-button')
          elOfOem.classList.add('allow')
          if (!openOemTable) {
            elOfOem.classList.remove('allow')
          }
  
        } else { 
          const elOfOem = document.getElementById('placas-oerieter-button')
          elOfOem.classList.add('allow')
          if (!openOemTable) {
            elOfOem.classList.remove('allow')
          }
        }
        
       
        
    })

   
    return ( 

              

        
        <Container className = "grid-container">
        <Row id = 'grids'>
        
          <Col> 

                <Button
                    id = 'placas-abertura-button'
                    className = "button-inicial"
                    onClick={() =>  setOpenAbTable(!openAbTable)}
                    aria-controls="placas-abertura-collapse"
                    aria-expanded={openAbTable}
                  >
                    Placas da Abertura
                  </Button>
  
                  <Collapse in={openAbTable}>
                  <div id="placas-abertura-collapse">
                   
                  <TableGeral local = {'Abertura'} unidade = {props.unidade == "Embratex" ? ['placasEmbratex', 'placaEmbratex'] : ['placasWentex', 'placaWentex']} />
                 
                  </div>
                 </Collapse>   

          </Col>
  
  
          <Col > 

            <Button
                id = 'placas-cardas-button'
                className = "button-inicial"
                onClick={() => setOpenCaTable(!openCaTable)}
                aria-controls="placas-cardas-collapse"
                aria-expanded={openCaTable}
              >
                Placas das Cardas
              </Button>
  
              <Collapse in={openCaTable}>
              <div id="placas-cardas-collapse">
              <TableGeral local = {'Cardas'} unidade = {props.unidade == "Embratex" ? ['placasEmbratex', 'placaEmbratex'] : ['placasWentex', 'placaWentex']} />
              </div>
            </Collapse> 
            
          </Col>
  
          <Col > 
  
              <Button
                id = 'placas-fuso-button'
                className = "button-inicial"
                onClick={() => setOpenFuTable(!openFuTable)}
                aria-controls="placas-fuso-collapse"
                aria-expanded={openFuTable}
              >
                Placas do Fuso
              </Button>
  
              <Collapse in={openFuTable}>
              <div id="placas-fuso-collapse">
              <TableGeral local = {'Fuso'} unidade = {props.unidade == "Embratex" ? ['placasEmbratex', 'placaEmbratex'] : ['placasWentex', 'placaWentex']} />
              </div>
              </Collapse> 
          </Col>

          <Col > 
  
            <Button
              id = 'placas-openend-button'
              className = "button-inicial"
              onClick={() => setOpenOeTable(!openOeTable)}
              aria-controls="placas-openend-collapse"
              aria-expanded={openOeTable}
            >
              Placas da Open-end
            </Button>

            <Collapse in={openOeTable}>
            <div id="placas-openend-collapse">
            <TableGeral local = {'Openend'} unidade = {props.unidade == "Embratex" ? ['placasEmbratex', 'placaEmbratex'] : ['placasWentex', 'placaWentex']} />
            </div>
            </Collapse> 

          </Col>

          <Col > 
  
          <Button
            id = {props.unidade == "Wentex" ? 'placas-openend360-button' : 'placas-oerieter-button'}
            className = "button-inicial"
            onClick={() => setOpenOemTable(!openOemTable)}
            aria-controls="placas-mutableoe-collapse"
            aria-expanded={openOemTable}
          >
            {props.unidade == "Wentex" ? `Placas da Open-end 360` : `Placas da OE Rieter`}
          </Button>

          <Collapse in={openOemTable}>
          <div id="placas-mutableoe-collapse">
          <TableGeral local = {props.unidade == "Wentex" ? `Openend360` : `Oerieter`} unidade = {props.unidade == "Embratex" ? ['placasEmbratex', 'placaEmbratex'] : ['placasWentex', 'placaWentex']} />
          </div>
          </Collapse> 

        </Col>



        </Row> 
        </Container>
    );
    
  }


  export default TelaInicial;