import React, { useEffect, useState } from 'react'
import appWriteService from '../appwrite/config'
import {PostCard,Container} from '../Components/index'



const AllPosts =  () => {
    const [posts,setPosts] = useState([])
    
    useEffect( () => {

        appWriteService.getPosts().then((Posts) => setPosts(Posts.documents)).catch()
       console.log("Posts",posts)

    },[])
  return (

    <div className='w-full py-8'>
        <Container>
            <div className='flex flex-wrap'>
                {
                    posts.map((post) => (
                        <div key={post.$id} className='p-2 w-1/4'>
                            <PostCard  post={post} />
                        </div>
                    ))
                }
            </div>
        </Container>
    </div>
  )

}

export default AllPosts