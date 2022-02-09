import React, {useState} from 'react'
import {TextField} from '@material-ui/core'
import styled from 'styled-components'
import axios from 'axios'
import { setToken } from '../Auth'
import { useNavigate } from "react-router-dom";



function Login() {
    const [username, changeUsername] = useState('')
    const [password, changePassword] = useState('')
    let navigate = useNavigate();
    const login = () => {
        if(username == '' && password == ''){
            return
        }
        else{
            axios.post('http://localhost:8000/login',{
                username: username,
                password: password
            })
            .then(res =>{
                setToken(res.data.token)
                navigate('/profile')
            })
            .catch()
        }
    }
  return (
  <Background>
      <Text>Login</Text>
      <InfoFields>
        <TextField
            id="username"
            label="Username"
            value={username}
            onChange={(e)=> changeUsername(e.target.value)}
        />
        <TextField
            id="password"
            label="Password"
            value={password}
            onChange={(e)=> changePassword(e.target.value)}
        />
        <Button onClick={login}>Submit</Button>
      </InfoFields>
  </Background>
  );
}

export default Login

const Background = styled.section`
background-color: #282c34;
min-height: 100vh;
display: flex;
flex-direction: column;
font-size: calc(10px + 2vmin);
`
const Button = styled.button`
margin-top:20px;
`

const InfoFields = styled.section`
align-self: center;
display: flex;
flex-direction: column;
`


const Text = styled.p`
color:white;
text-align:center;
`;