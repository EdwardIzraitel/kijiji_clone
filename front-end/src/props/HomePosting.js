import React from 'react';
import styled from 'styled-components'
import { useNavigate } from "react-router-dom";

const Postings = (props)=>{
    let navigate = useNavigate();
    return(
        <PropWrapper>
            <Button onClick={()=> navigate(`/post/${props.Title}`, {state:{title:props.Title}})}>
        <Text>{props.Title}</Text>
        </Button>
        </PropWrapper>
    )
}

export default Postings

const Button = styled.button`
`

const PropWrapper = styled.section`
border: 1px solid blue;
`

const Text = styled.p`
color:white;
text-align:center;
`;