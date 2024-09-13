import React, { useEffect } from 'react'
import PostForm from "../components/PostForm"
import { useParams } from 'react-router-dom'
import service from '../appwrite/conf';
import { useState } from 'react';
function EditPost() {
    const [post, setPost] = useState();
  const  {slug} =  useParams();
  useEffect(()=>{
    service.getPost(slug).then((post)=>{
        setPost(post);
    })
  },[])
  if(post){
    <PostForm post = {post}></PostForm>
  }
}

export default EditPost