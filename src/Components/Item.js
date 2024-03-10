import React from 'react'
import bootstrap from "react-bootstrap"
import { Card,CardBody,Modal,ModalHeader } from 'react-bootstrap'
import { useShop } from '../Context/Shoppingcontext'
import Updatenodemodal from './Updatenotemodal'
import { useState } from 'react'
import Button from "react-bootstrap/esm/Button";
import styled from 'styled-components';
import './style.css'



const StyledCard = styled(Card)`
  margin: 5px;
  width: 70%;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;


export default function Item({name,id}) {



      const [showupdate,setupdate]=useState(false)
    const {addItemToList}=useShop()

    const update=()=>{

      console.log("clicked")

    }

    const closethemodal=()=>{

      setupdate(false)
    }

  // const datetoadded=new Date(date);

  return (



<>




<Modal show={showupdate} onHide={closethemodal}>
        {/* <Addnotemodal onHide={closethemodal} /> */}
    {/* <Updatenodemodal  onHide={closethemodal} givenid={id} giventitle={title} givendesc={desc}/> */}
      </Modal>

    
    <div className="cantainer w-100" >
    <StyledCard>      <Card.Body >
        <Card.Title>{name}</Card.Title>
      
        <Card.Text>
         {id}
        </Card.Text>

 
        <div className='float-right'>
        <Button className="primary " onClick={()=>addItemToList(name)} >
            Add to list
      </Button>
        </div>
      </Card.Body>
      </StyledCard>
            </div>

      </>

  )
}
