import React, { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import './App.css';


const App = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [cookies, setCookie] = useCookies(['user']);
  const [status, setStatus] = useState(false)
  const [visible, setVisible] = useState(false)
  const [msg, setmsg] = useState("")
  const [message, setMessage] = useState("")
  const [messageList, setMessageList] = useState(cookies.Message)


  const handle = () => {
    if(!messageList)setMessageList([])
    setMessageList(messageList.push(message))
    setCookie("Message", messageList, { path: '/' })
    console.log(cookies.messageList)

  };
  useEffect(() => {
    loginCall()


  }, [])
  function loginCall() {
    let data
    if (email && password) data = { email, password }
    else data = { email: cookies.Email, password: cookies.Password }
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
        if (resp.status == true) {

          setCookie('Email', data.email, { path: '/' });
          setCookie('Password', data.password, { path: '/' });
        }
        setVisible(true)
      })
    })

  }
  return (

    <div className="App">
      {
        visible ? status ?
          <div>
            <h1>Home page 2</h1>
            <h3>submit text message</h3>
            <input placeholder="Submit text message" value={message} onChange={(e) => setMessage(e.target.value)} />
            <button onClick={handle}>Search button 2</button>

            <h3>Search text message</h3>
            <input placeholder="Search text message" value={message} onChange={(e) => setMessage(e.target.value)} />
            <button onClick={handle}>Search button 2</button>

            <h3>Search Results Here </h3>
            <div className='textar'>h</div>


            <button>Clear All</button>
            <br></br><br></br>
            <button>Logout</button>

          </div> :
          <div>
            <h2>{msg}</h2>
            <h3>Email of the user:</h3>
            <input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <h3>Password of the user:</h3>
            <input
              type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <button onClick={loginCall}>login</button>{' '}


          </div> : <h1></h1>
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