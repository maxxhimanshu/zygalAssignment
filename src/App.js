import React, { useState,useEffect } from 'react';
import { useCookies } from 'react-cookie';

const App = () => {
  const [name, setName] = useState('');
  const [pwd, setPwd] = useState('');
  const [cookies, setCookie] = useCookies(['user']);
  const [status,setStatus]=useState(false)
  const [msg,setmsg]=useState("")
  const [verify,setVerify]=useState(false)
  const [messages,setMessages]=useState([])
  const handle = () => {
    setCookie('Name', name, { path: '/' });
    setCookie('Password', pwd, { path: '/' });
    
    setCookie("massages",messages,{path:'/'})
  };
  useEffect(()=>{
    if(verify ){
      setName(cookies.Name)
      setPwd(cookies.Password)
      console.log("details",name,pwd)
      loginCall()
    }
  },[])
  function loginCall(){
    
    let data={name,pwd}
    console.log(data)
    fetch("http://localhost:3001/login",{
        method:"POST",
        headers:{
            'Accept':'application/json',
            'Content-Type':'application/json'
        },
        body:JSON.stringify(data)
    }).then((result)=>{
        result.json().then((resp)=>{
                console.warn("resp:",resp)
                setStatus(resp.status)
                setmsg(resp.msg)
                if(resp.status)setVerify(true);
                else(setVerify(false))
        })
    })

  }
  return (
    <div className="App">
      <h1>Name of the user:</h1>
      <input placeholder="Name" value={name} onChange={(e) => setName(e.target.value)}/>
      <h1>Password of the user:</h1>
      <input
        type="password" placeholder="Password"  value={pwd} onChange={(e) => setPwd(e.target.value)}/>
        <button onClick={loginCall}>login</button>{' '}
        {
        status?<h1>true</h1>:<h2>{msg}</h2>
        }
      <br />
      {cookies.Name && (
        <div>
          Name: <p>{cookies.Name}</p>
        </div>
      )}
      {cookies.Password && (
        <div>
          Password: <p>{cookies.Password}</p>
        </div>
      )}
    </div>
  );
};

export default App;
