import React, {useState, useEffect} from 'react'
import styled from 'styled-components'
import { useNavigate } from "react-router-dom";
import {useDispatch} from 'react-redux'
import {changeFilter} from '../features/filterSlicer'
import { fetchUser } from '../Auth';


function Header() {
  let navigate = useNavigate();
  const [searchInput,setSearchInput] = useState("")
  const dispatch = useDispatch()

  const handleChange =(e)=>{
    setSearchInput(e.target.value)
  }

  const applyFilter = () => {
    dispatch(changeFilter({filter:searchInput}))
    navigate('/')
  }

  const homePage = () =>{
    dispatch(changeFilter({filter:''}))
    setSearchInput('')
    navigate('/')
  }

  return (
    <Wrapper>
        <HeaderWrap>
            <TextWrap>
                <Title onClick={homePage}>pipipi</Title>   
                <input
                style={{width: "450px", height:"25px" }}
                type="text"
                placeholder = "Search here"
                onChange = {handleChange}
                value = {searchInput}
                />
                
                <Button onClick={applyFilter}>Search</Button>
                {fetchUser()!=null?<Text> <a onClick={()=>navigate('/newpost')} style={{textDecorationLine: 'underline'}}>New Post</a>  <a onClick={()=>navigate('/profile')} style={{textDecorationLine: 'underline'}}> Account</a></Text>:
                    <Text><a onClick={()=>navigate('/login')} style={{textDecorationLine: 'underline'}}>Login</a> or <a onClick={()=>navigate('/register')} style={{textDecorationLine: 'underline'}}>Register</a></Text>
                }
                
            </TextWrap>
        </HeaderWrap>
    </Wrapper>
  );
}

export default Header

const Wrapper = styled.section`
background-color: #282c34;
`
const Title = styled.h1`
color:white;
font-size: 35px;
`

const Button = styled.button`
// background-color:#282c34;
border-radius:5px;
height:31px;
`

const Text= styled.p`
font-size: 20px;
color:white;
text-align:right;
`

const HeaderWrap = styled.section`
max-width:800px;
margin-left:auto;
margin-right:auto;
`
const TextWrap = styled.section`
display: flex;
flex-direction: row;
justify-content:space-between;
align-items:center;
line-height:1;
`