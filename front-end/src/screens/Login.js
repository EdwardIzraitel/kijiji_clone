import React, {useState, useEffect} from 'react'
import {TextField} from '@material-ui/core'
import styled from 'styled-components'
import axios from 'axios'
import { setToken, setUser } from '../Auth'
import { useNavigate } from "react-router-dom";
import { useAlert } from 'react-alert'
import host from '../global'

function Login() {
    const [username, changeUsername] = useState('')
    const [password, changePassword] = useState('')
    // const [error, changeError] = useState('')
    let navigate = useNavigate();
    const alert = useAlert()

    useEffect(()=>{
        localStorage.removeItem('edToken')
        localStorage.removeItem('user')
    },[])

    const login = () => {
        if(username === '' && password === ''){
            return
        }
        else{
            axios.post(`${host}/api/login`,{
                username: username,
                password: password
            })
            .then(res =>{
                setToken(res.data.token)
                setUser(username)
                navigate('/')
            })
            .catch(e=>{
                alert.show('Username or password is wrong')
                // changeError(e.response.data.detail)
            })
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
            type="password"
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
