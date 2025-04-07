import React, { useEffect, useState } from 'react'
import { Container, PostForm } from '../Components'
import { useNavigate, useParams } from 'react-router-dom'
import appWriteService from '../appwrite/config'

const EditPost = () => {
    let [post,setPost] = useState()
    //fetch slug from params
    let {slug} = useParams()
    const navigate = useNavigate()

    //now find the post from the posts array 
    useEffect(() => {
        if(slug){
            appWriteService.getPost(slug).then((Post) => {
                setPost(Post)
            }).catch()
        }
        else navigate('/')
    },[slug,navigate])

  return post ?  (
    <div className='py-8'>
        <Container>
            
            <PostForm post={post} />
        
        </Container>
    </div>
  ) : null
}

export default EditPost