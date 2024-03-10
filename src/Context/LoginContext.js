import React, { useState } from 'react'
import { useContext } from 'react'
import useLocalStoragehook from '../hooks/useLocalstorage';
// import useAlertenvokefunction from '../hooks/useAlertenvoke';

const LogContext = React.createContext();





export function useLogin() {
    return useContext(LogContext);
  }

export default function LoginContext({children}) {


  
    
    async function loginauser(inputid,inputpassword){

      // const {setalert,setmessage}=Notescontext()

      try {
     const response=await fetch('http://localhost:3200/api/auth/',{
      method:'POST',
      headers:{
        'Content-Type':'application/json',
        'Access-Control-Allow-Origin':'*'
      
      },
      body:JSON.stringify({id:inputid,password:inputpassword})
      
    });
  const res=await response.json()
 
  
    if(response.ok){

      setauth(res);

      setmessagel("User Login Successful")
      // useAlertenvokefunction("Login Successful")
       setsucess(true);

      // setalert(true)
      // setmessage('Login Successful')
    }else{
setsucess(false)
      setvariantl('danger')
      setmessagel("User Login UnSuccessful")

    }
   

  } catch (error) {
        console.log(error)

  }

  }


  const getname=async(givenid,givenpassword,resp)=>{

      // console.log(auth)
            setauth(resp);

    const response=await fetch("http://localhost:3200/api/auth/getuser",{
      method:'POST',
      headers:{
        'Content-Type':'application/json',
        'Access-Control-Allow-Origin':'*',
        'auth-token':resp,
      },
      body:JSON.stringify({id:givenid,password:givenpassword})
      
    });

      const res=await response.json()
        // console.log(res);
        setname(res.name);

        // fetchnotes()


  }



  async function reggisterauser(inputid,inputpassword,inputname){
    // const {setalert,setmessage}=Notescontext()


    try {
      
      var formdata={id:inputid,password:inputpassword,name:inputname}
  
      console.log(JSON.stringify(formdata))
  
      const response=await fetch("http://localhost:3200/api/auth/reg",{
       method:'POST',
       headers:{
         'Content-Type':'application/json',
         'Access-Control-Allow-Origin':'*'
       },
       body:JSON.stringify(formdata)
       
     });
   const res=await response.json()
  
  
  if(response.ok){
    setmessagel("User Register Successful")

     setsucess(true);
  
  }else{
    setvariantl('danger')
    setmessagel("User Register Unuccessful, ID unavailable")

   const aw=await setsucess(false)
  
  }
  
  
   
    } catch (error) {
      
      console.log(error)

    }

   }


    const [loginid,setid]=useLocalStoragehook("id",' ');
    const [auth,setauth]=useLocalStoragehook("auth",' ');
    const [name,setname]=useLocalStoragehook("name",' ');
    const [success,setsucess]=useState(false);
    // const {setalert,setmessage,setvariant}=useNotes()

    const [messagefromlogin,setmessagel]=useState()

    const [setvariantfromlogin,setvariantl]=useState()


  return (
    <LogContext.Provider
    value={{
         setid,loginid,loginauser,reggisterauser,auth,setauth,name,setname,success,setsucess,messagefromlogin,setvariantfromlogin,setmessagel,setvariantl
    }}
  >
    {children}
  </LogContext.Provider>
  )
}
