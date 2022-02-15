import React from 'react'
import styled from 'styled-components'
import { useLocation } from "react-router-dom";

function Postings() {
  const prop = useLocation()
  return (
  <Background>
    <Image src ={prop.state.img}  />
    <TextContainer>
      <TitleBox>
        <Text>{prop.state.prop.title}</Text>
        <Text>{prop.state.prop.price} $</Text>
      </TitleBox>
      <Text>Description:</Text>
      <Text>{prop.state.prop.desc}</Text>
      <Text style={{marginTop:"100px"}}>Posted by: {prop.state.prop.user}</Text>
    </TextContainer>
  </Background>
  );
}

export default Postings

const Image = styled.img`
width: 300px;
height:300px;
margin-left:auto;
margin-right:auto;
`

const Background = styled.section`
background-color: #282c34;
min-height: 100vh;
display: flex;
flex-direction: column;
font-size: calc(10px + 2vmin);
`
const TitleBox = styled.section`
display: flex;
flex-direction: row;
justify-content:space-between;
`

const TextContainer = styled.section`
margin-left:auto;
margin-right:auto;
width:30%;
white-space: normal;
word-break:break-all;
`

const Text = styled.p`
color:white;
`;
