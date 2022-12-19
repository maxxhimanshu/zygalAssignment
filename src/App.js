import React, { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';



const App = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [cookies, setCookie] = useCookies(['user']);
  const [status, setStatus] = useState(false)
  const [msg, setmsg] = useState("")
  const [verify, setVerify] = useState(false)
  const [messages, setMessages] = useState([])
  const handle = () => {
    setCookie('Email', email, { path: '/' });
    setCookie('Password', password, { path: '/' });

    setCookie("massages", messages, { path: '/' })
  };
  useEffect(() => {
    if (verify) {
      setEmail(cookies.Email)
      setPassword(cookies.Password)
      console.log("details", email, password)
      loginCall()
    }
  }, [])
  function loginCall() {

    let data = { email, password }
    console.log(data)
    fetch("http://localhost:3001/login", {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    }).then((result) => {
      result.json().then((resp) => {
        console.warn("resp:", resp)
        setStatus(resp.status)
        setmsg(resp.msg)
        if (resp.status) setVerify(true);
        else (setVerify(false))
      })
    })

  }
  return (
    
    <div className="App">
      {
        status ? <h1>true</h1> : 
        <div>
          <h2>{msg}</h2>
          <h3>Email of the user:</h3>
      <input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <h3>Password of the user:</h3>
      <input
        type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <button onClick={loginCall}>login</button>{' '}
      
     
        </div>
      }
      
    </div>
  );
};

export default App;
{/* <br />
{cookies.Name && (
  <div>
    Name: <p>{cookies.Name}</p>
  </div>
)}
{cookies.Password && (
  <div>
    Password: <p>{cookies.Password}</p>
  </div>
)} */}