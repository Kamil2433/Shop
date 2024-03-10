
import React from 'react';
import LoginContext from './Context/LoginContext';
import Shoppingcontext from './Context/Shoppingcontext';
import Dashboard from './Components/Dashboard';
import Navbaruse from './Components/Navbaruse';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Graph from './Components/Graph';


function App() {


    //  const {auth}=useLogin();
    


  return (

       <LoginContext>
        <Shoppingcontext>




    


   <Router >
    <div className=" h1 mt-3 ml-2">
    <i class="fa-solid fa-basket-shopping fa-xl" style={{color: "#10bbf4",margin:"4px"}}></i>
    Shop.com 
                 
    </div>
   <Navbaruse/>
      <Routes>
        <Route key="home" path='/' element={<Dashboard/>} />
        <Route key="home" path='/reports' element={<Graph/>} />

     
      </Routes>
      </Router >






      

      </Shoppingcontext>
       </LoginContext>
  );
}

export default App;
