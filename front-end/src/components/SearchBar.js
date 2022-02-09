import React, {useState} from 'react'
import styled from 'styled-components'

function SearchBar() {
  const [searchInput,setSearchInput] = useState("")
  const handleChange =(e)=>{
    setSearchInput(e.target.value)
  }
  return (
    <Wrapper>
    <Header>
      <input
      style={{width: "60vmin" }}
      type="text"
      placeholder = "Search here"
      onChange = {handleChange}
      value = {searchInput}
      />
    </Header>
    <Line/>
    </Wrapper>
  );
}

export default SearchBar

const Wrapper = styled.section`
background-color: #282c34
`
const Header = styled.section`
padding-top: 2vh;
display: flex;
flex-direction: column;
align-items:center;
`
const Line = styled.section`
background-color:black;
margin-top: 2vh;
height:2px;
`