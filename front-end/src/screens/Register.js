import React, {useState,useEffect} from 'react'
import {TextField} from '@material-ui/core'
import styled from 'styled-components'
import axios from 'axios'
import { setToken, setUser } from '../Auth'
import { useNavigate } from "react-router-dom";
import { useAlert } from 'react-alert'


function Register() {
    const [username, changeUsername] = useState('')
    const [password, changePassword] = useState('')
    let navigate = useNavigate();
    const alert = useAlert()

    useEffect(()=>{
        localStorage.removeItem('edToken')
    })

    const register = () => {
        if(username === '' && password === ''){
            return
        }
        else{
            axios.post('http://ec2-3-96-193-149.ca-central-1.compute.amazonaws.com/api/register',{
                username: username,
                password: password
            })
            .then(res=>{
                setToken(res.data.token)
                setUser(username)
                navigate('/')
            }).catch(e=>{
                alert.show("Username exists")
            })
        }
    }

  return (
  <Background>
      <Text>Register</Text>
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
        <Button onClick={register}>Submit</Button>
      </InfoFields>
  </Background>
  );
}

export default Register

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
