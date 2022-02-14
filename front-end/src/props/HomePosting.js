import React from 'react';
import styled from 'styled-components'
import { useNavigate } from "react-router-dom";

const Postings = (props)=>{
    let navigate = useNavigate();
    const img = document.createElement("img")
    img.src = props.pst.imgURL
    return(
        <Button onClick={()=> navigate(`/post/${props.pst.title}`, {state:{prop:props.pst,img:img.src}})}>
            <HeaderText>{props.pst.title}</HeaderText>
            <img src={img.src} width="200px" height="200px" />
            <Text>{props.pst.price} $</Text>
        </Button>
    )
}

export default Postings

const Button = styled.button`
min-width:min(100%,40vh);
background-color:#282c34;
border-radius:10px;
`
const HeaderText = styled.p`
color:white;
text-align:center;
`
const Text = styled.p`
color:white;
text-align:center;
`;