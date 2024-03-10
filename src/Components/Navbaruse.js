import React, { Component } from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useLogin } from '../Context/LoginContext';
import { useShop } from '../Context/Shoppingcontext';
import Alertcomponent from './Alertcomponent';
import { Link } from 'react-router-dom';








function Navbaruse() {

  const {setname,setid,setauth,messagefromlogin,setvariantfromlogin}=useLogin()
  const {setnotes,Showalert,setalert,message,setmessage,variant}=useShop()
  const logout=()=>{

        setname('')
        setid('')
setauth('')

  }


  const {name,auth}=useLogin()
   const string=name;
      const istrue=auth.length==0;
      const messagetodisplay=messagefromlogin||message;
      const vari=setvariantfromlogin||variant;

  return (




    <div className="float-right" >
    <Navbar expand="lg" className="bg-body-tertiary" >
    <Container>

    <Nav.Link><Link to="/"> Home </Link></Nav.Link>
     <Nav.Link > <Link to="/reports"> Reports </Link></Nav.Link>



     {!istrue?

     <a> {name}, Welcome to Shop.com </a>:
     <a>Welcome</a> }
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto">


          {!istrue?
          <button onClick={logout}>Logout</button>:
     <a></a> }
          
        </Nav>
      </Navbar.Collapse>
    </Container>
  </Navbar>
  {Showalert===true ?
  <Alertcomponent    mess={messagetodisplay} variant={vari}/>:
  <div></div>
  }
  </div>
  )
}


export default Navbaruse