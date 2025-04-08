import React, { useEffect, useState } from 'react'
import appWriteService from '../appwrite/config'
import {PostCard,Container} from '../Components/index'
import authService from '../appwrite/auth'



const AllPosts =  ({allPosts}) => {
    const [posts,setPosts] = useState([])
    
    useEffect( () => {

       if(allPosts){
        appWriteService.getPosts().then((Posts) => setPosts(Posts.documents)).catch()
        // console.log("Posts",posts)
       }
       else{
            async function getPosts(){
                const user = await authService.getCurrUser()
                if(user){
                    let allPosts = await appWriteService.getPosts()
                    console.log(allPosts);
                    
                    allPosts = allPosts.documents.filter((post) => post.userId === user.$id)
                    setPosts(allPosts)
                    
                }
                else console.log('user not found');
                
            }
            getPosts()
       }

    })
  return (

    <div className="relative w-full md:p-8 bg-black">
  
            <div className='flex sm:flex-row flex-col flex-wrap scroll-smooth snap-x snap-mandatory gap-10 items-center justify-center  py-8    hide-scrollbar'>
                {
                    posts.map((post) => (
                        <div key={post.$id}>
                            <PostCard  post={post} />
                        </div>
                    ))
                }
            </div>
 
    </div>
  )

}

export default AllPosts