import React, {useState, useEffect} from 'react';
import {Row, Container, Col, Button, Collapse } from 'react-bootstrap';
import TableGeral from './render-tables'
import '../style/tela-inicial.css'

function TelaInicial(props) {
    const [openAbTable, setOpenAbTable] = useState(false);
    const [openCaTable, setOpenCaTable] = useState(false);
    const [openFuTable, setOpenFuTable] = useState(false);
    const [openOeTable, setOpenOeTable] = useState(false);
    const [openOemTable, setOpenOemTable] = useState(false);

    const ops = [
      {renderTextOp: 'Placas da Abertura', nameOp: 'abertura',  hook: openAbTable, setHook: setOpenAbTable},

      {renderTextOp: 'Placas das Cardas', nameOp: 'cardas', hook: openCaTable, setHook: setOpenCaTable},
      {renderTextOp: 'Placas do fuso', nameOp: 'fuso', hook: openFuTable, setHook: setOpenFuTable},
      {renderTextOp: 'Placas da Open-End', nameOp: 'openend', hook: openOeTable, setHook: setOpenOeTable},
      {renderTextOp: props.unidade === "Embratex" ? 'Placas da OE Rieter' : 'Placas da Open-End 360' , 
      nameOp:  props.unidade === "Embratex" ? 'oerieter' : 'openend360', hook: openOemTable, setHook: setOpenOemTable},
      
      ]


    useEffect (() => {
        ops.map((op => {
          const el = document.getElementById(`placas-${op.nameOp}-button`)
          el.classList.add('allow')          
          if (!op.hook){
            el.classList.remove('allow')
             }
        }))
        
    })

   
    return ( 

        ops.map((op, id) => 
        (
        <Container className = "grid-container">
        <Row id = 'grids'>

          <Col> 
                <Button
                    id = {`placas-${op.nameOp}-button`}
                    className = "button-inicial"
                    onClick={() =>  op.setHook(!op.hook)}
                    aria-controls= {`placas-${op.nameOp}-collapse`}
                    aria-expanded={op.hook}
                  >
                   {op.renderTextOp}
                  </Button>
  
                  <Collapse in={op.hook}>
                  <div id= {`placas-${op.nameOp}-collapse`}>
                  <TableGeral local = {op.nameOp} unidade = {props.unidade === "Embratex" ? ['placasEmbratex', 'placaEmbratex'] : ['placasWentex', 'placaWentex']} />
                 
                  </div>
                 </Collapse>   
          </Col>
        </Row> 
        </Container>
  
        ))    
      
    );
  }

  export default TelaInicial;

  /* 
      
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
                   
                  <TableGeral local = {'Abertura'} unidade = {props.unidade === "Embratex" ? ['placasEmbratex', 'placaEmbratex'] : ['placasWentex', 'placaWentex']} />
                 
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
              <TableGeral local = {'Cardas'} unidade = {props.unidade === "Embratex" ? ['placasEmbratex', 'placaEmbratex'] : ['placasWentex', 'placaWentex']} />
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
              <TableGeral local = {'Fuso'} unidade = {props.unidade === "Embratex" ? ['placasEmbratex', 'placaEmbratex'] : ['placasWentex', 'placaWentex']} />
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
            <TableGeral local = {'Openend'} unidade = {props.unidade === "Embratex" ? ['placasEmbratex', 'placaEmbratex'] : ['placasWentex', 'placaWentex']} />
            </div>
            </Collapse> 

          </Col>

          <Col > 
  
          <Button
            id = {props.unidade === "Wentex" ? 'placas-openend360-button' : 'placas-oerieter-button'}
            className = "button-inicial"
            onClick={() => setOpenOemTable(!openOemTable)}
            aria-controls="placas-mutableoe-collapse"
            aria-expanded={openOemTable}
          >
            {props.unidade === "Wentex" ? `Placas da Open-end 360` : `Placas da OE Rieter`}
          </Button>

          <Collapse in={openOemTable}>
          <div id="placas-mutableoe-collapse">
          <TableGeral local = {props.unidade === "Wentex" ? `Openend360` : `Oerieter`} unidade = {props.unidade === "Embratex" ? ['placasEmbratex', 'placaEmbratex'] : ['placasWentex', 'placaWentex']} />
          </div>
          </Collapse> 

        </Col>



        </Row> 
        </Container>
    

  
  */