import React from 'react'
import { useLogin } from '../Context/LoginContext';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Login from './Login';
import Items from './Items';
import { useShop } from '../Context/Shoppingcontext';
import { useEffect } from 'react';





export default function Dashboard() {
    const {auth}=useLogin();
    const {fetchitems,items}=useShop()
    

    useEffect(()=>{
    
      fetchitems();



},[]);
  return (


    (!auth)?<Login/>:<Items given={items}/>

  
  )
}
