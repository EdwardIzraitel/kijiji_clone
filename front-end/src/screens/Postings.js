import React from 'react'
import styled from 'styled-components'
import { useLocation } from "react-router-dom";
import SearchBar from '../components/SearchBar'
function Postings() {
  const prop = useLocation()
  return (
  <Background>
    <SearchBar/>
    <Text>{prop.state.title}</Text>

  </Background>
  );
}

export default Postings

const Background = styled.section`
background-color: #282c34;
min-height: 100vh;
display: flex;
flex-direction: column;
// align-items:center;
font-size: calc(10px + 2vmin);
`

const Text = styled.p`
color:white;
text-align:center;
`;