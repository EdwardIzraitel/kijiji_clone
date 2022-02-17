import React, {useState, useEffect} from 'react'
import styled from 'styled-components'
import Posting from '../props/HomePosting'
import Grid from '@material-ui/core/Grid'
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux'
import {selectFilter, changeFilter} from '../features/filterSlicer'
import { SpinnerCircular } from 'spinners-react';

function Home() {
  const [posts, setPosts] = useState([{}])
  const filterPosts = useSelector(selectFilter)
  const [isLoading, cLoading] = useState(true)
  const dispatch = useDispatch()

  useEffect(()=>{
    axios.get('http://ec2-15-223-121-180.ca-central-1.compute.amazonaws.com/api/posts')
    .then(res=>{
      setPosts(res.data)
      cLoading(false)
    })
  },[])

  useEffect(()=>{
    if(filterPosts =='')
      dispatch(changeFilter({filter:''}))
  },[])

  const PostingComponent =() => {
      let filtered = posts.filter(obj => obj.title.toLowerCase().includes(filterPosts.filter.toLowerCase()))
      return(
        (filtered.length!=0)?
        <Grid style={{ display: 'flex', justifyContent:'center'}} container spacing={3}>
        {filtered.map((post)=>
                <Grid item xs={4} key={post.id}>
                    <Posting pst={post}/>
                </Grid>
        )}
        </Grid>
      :<Text>No posts with title {filterPosts.filter}</Text>)
}

  return (
  <Background>
    {
      (isLoading)?
      <SpinnerCircular size="200" style={{marginLeft:"auto", marginRight:"auto"}}/>:
        <PostingWrapper>
        <PostingComponent/>
        </PostingWrapper>

    }
    
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
const Text= styled.p`
font-size: 20px;
color:white;
text-align:center;
`
const PostingWrapper = styled.section`
margin-left:auto;
margin-right:auto;
margin-top:20px;
min-width:min(80%,100vh);
`
