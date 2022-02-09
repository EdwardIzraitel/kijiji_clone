import React, {useState, useEffect} from 'react'
import styled from 'styled-components'
import Posting from '../props/HomePosting'
import Grid from '@material-ui/core/Grid'
import axios from 'axios';
import SearchBar from '../components/SearchBar'

function Home() {

  const [posts, setPosts] = useState([{}])
    
  useEffect(()=>{
    axios.get('http://localhost:8888/api/posts')
    .then(res=>{
      setPosts(res.data)
    })
  },[])

  return (
  <Background>
    <SearchBar/>
    <PostingWrapper>
    <Grid style={{display: 'flex', justifyContent: 'center'}} container spacing={4}> 
    {posts.map((post)=>
      <Grid item sm={4}>
          <Posting Title={post.title} id={post.id}/>
      </Grid>    
    )}
      </Grid>
    </PostingWrapper>
  </Background>
  );
}

export default Home

const Background = styled.section`
background-color: #282c34;
min-height: 100vh;
display: flex;
flex-direction: column;
font-size: calc(10px + 2vmin);
`

const PostingWrapper = styled.section`
align-self: center;
margin-top:20px;
padding: 20px;
min-width: max(50%,50vh);
border: 1px solid red;
`