
import {Container , Alert,} from 'react-bootstrap'
import { useShop } from '../Context/Shoppingcontext';
import { useEffect } from 'react';
import { useState } from 'react';
import { useLogin } from '../Context/LoginContext';


function Alertcomponent(props) {  

    const {message,setalert,setmessage,variant,setvariant}=useShop()
    const {setmessagel,setvariantl}=useLogin()
 

    // const [Showalert,setalert]=useState(false)
    // const [message,setmessage]=useState('')
    useEffect(() => {

      setTimeout(async() => {
        
       await setmessage(null)
       await setalert(false)
       await setvariant('success')
       setmessagel(null)
       setvariantl('success')
      }, 4000);
     
    }, []);



  return (  
    <div className="App">  
   <Container className='p-4'>  
   <Alert variant={props.variant}>

        {props.mess}    
    </Alert>  
</Container>  
    </div>  
  );  
}  
export default Alertcomponent;  