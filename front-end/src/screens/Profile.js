import React from 'react'
import styled from 'styled-components'
import { useNavigate } from "react-router-dom";
import { fetchUser } from '../Auth';

function Profile() {
  const navigate = useNavigate()

  const logout=()=>{
    localStorage.removeItem('edToken')
    localStorage.removeItem('user')
    navigate('/')
  }
  return (
  <Background>
      <Text>Profile</Text>
      <Text>{fetchUser()}</Text>
      <Text onClick={logout}>Logout</Text>
  </Background>
  );
}

export default Profile

const Background = styled.section`
background-color: #282c34;
min-height: 100vh;
display: flex;
flex-direction: column;
font-size: calc(10px + 2vmin);
`
const Text = styled.p`
color:white;
text-align:center;
`