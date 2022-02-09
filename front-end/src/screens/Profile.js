import React, {useState} from 'react'
import styled from 'styled-components'



function Profile() {

  return (
  <Background>
      <Text>Profile</Text>
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