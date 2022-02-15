import React, { useState } from 'react'
import styled from 'styled-components'
import { TextField } from '@material-ui/core'
import axios from 'axios'
import { useNavigate } from "react-router-dom";
import { fetchUser } from '../Auth'

function NewPost() {
    let navigate = useNavigate()

    const[postData,changePostData]=useState({
        title:"",
        desc:"",
        price:""
    })

    const[error,changeError]=useState({
        titleError:"",
        descError:"",
        priceError:""
    })

    const [imgError, cImgError]=useState("")
    const [uploadingMsg,cUploadingMsg] = useState("")

    const [selectedFile, changeSelectedFile] = useState(null)
    const changeData = (e)=>{
        const newData = {...postData}
        const onlyNumberRegex = /[^0-9]/g
        if(e.target.id=="price"){
            newData[e.target.id] = e.target.value.replace(onlyNumberRegex,"")
        }
        else{
            newData[e.target.id] = e.target.value
        }
        changePostData(newData)
        const newError = {...error}

        if(newData[e.target.id].length>0){
            newError[e.target.id+"Error"] = ''
        }
        else if(newData[e.target.id].length===0){
            newError[e.target.id+"Error"] = "Enter a " + e.target.id
        }
        changeError(newError)
    }

    const fileSelectedHandler = (e)=>{
        changeSelectedFile(e.target.files[0])
        cImgError("")
    }

    const uploadPost = () =>{
        const newError = {...error}
        if(postData.title.length==0)
            newError["titleError"] = "Enter a title"
        if(postData.desc.length==0)
            newError["descError"] = "Enter a description"
        if(postData.price.length==0)
            newError["priceError"] = "Enter a price"
        if(selectedFile==null)
            cImgError("Please upload an image")

        changeError(newError)
        if(postData.price.length!=0 && postData.desc.length!=0 && postData.title.length!=0 && selectedFile!=null){
            cUploadingMsg("Uploading...")
            const formData = new FormData()
            formData.append('image',selectedFile,`${selectedFile.name}`)
            formData.append('title',postData.title)
            formData.append('desc',postData.desc)
            formData.append('price',postData.price)
            formData.append('username', fetchUser())
            axios({
                method: "post",
                url: "http://ec2-3-96-193-149.ca-central-1.compute.amazonaws.com/api/newPost",
                data: formData,
                headers: { "Content-Type": "multipart/form-data" },
            })
                .then((res)=> {
                    cUploadingMsg("Uploaded!")
                    navigate("/")
                })
        }
        
        
    }

    return (
        <Background>
            <Text style={{textAlign:"center"}}>New Post</Text>
            <InfoFields>
                <TextField id="title" label="Ad Title"
                    value={postData.title}
                    variant="outlined"
                    onChange={(e)=>{changeData(e)}}
                    error ={error.titleError.length>1}
                    helperText={error.titleError} 
                    />
                <TextField label="Description"
                    id="desc" 
                    value={postData.desc}
                    onChange={(e)=>{changeData(e)}}
                    variant="outlined"
                    error ={error.descError.length>1}
                    helperText={error.descError}
                    style={{marginTop:"10px"}}
                    minRows={5}
                    multiline={true}
                    />
                <TextField label="Price"
                    id="price"
                    value={postData.price}
                    variant="outlined"
                    onChange={(e)=>{changeData(e)}}
                    type="text"
                    error ={error.priceError.length>1}
                    helperText={error.priceError}
                    inputProps={{pattern:'[0-9]', maxLength:'8'}}
                    style={{ width: "150px",marginTop:"10px" }} />
                    <input accept="image/png, image/jpeg" style = {{marginTop:"10px"}} type="file" onChange={fileSelectedHandler}/>
                    <BrowseError>
                        <Text style={{fontSize:"15px", color:"red"}}>{imgError}</Text>
                    </BrowseError>
                    <Button onClick={uploadPost}>Upload</Button>
                    <Text style={{color:"green", fontSize:"20px"}}>{uploadingMsg}</Text>                    
            </InfoFields>
        </Background>
    );
}

export default NewPost

const Background = styled.section`
background-color: #282c34;
min-height: 100vh;
display: flex;
flex-direction: column;
font-size: calc(10px + 2vmin);
`
const Text = styled.p`
color:white;
// textAlign:center;
`;
const InfoFields = styled.section`
align-self: center;
display: flex;
flex-direction: column;
width: 500px;
`
const Button = styled.button`
margin-top:20px;
`
const BrowseError = styled.section`
height:20px;
margin-bottom:20px;
`
