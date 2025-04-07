import React from 'react'
import { Container,PostForm } from '../Components'

const AddPost = () => {
  return (
    <div className='py-8'>
        <Container>
           {/* we are not passing anything as props bcz we are adding new post  */}
            <PostForm />
      
        </Container>
    </div>
  )
}

export default AddPost