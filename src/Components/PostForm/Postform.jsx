import React, { useEffect } from 'react'
import { useCallback } from 'react'
import { useForm } from 'react-hook-form'
import { Input, Select, Button, RTE } from "../../Components/index"
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import appWriteService from '../../appwrite/config'


//ahi call kato post ne edit karva mate aavshe kato navi post create karva
const Postform = ({ post }) => {
  //watch:to moniter field continusly
  //setValue : to set value in form
  const { register, handleSubmit, watch, setValue, control, getValues } = useForm({
    defaultValues: {
      //jo user edit karva aavyo hoy to aapde jo preious value hoy to te aapisu nahi to default
      title: post?.title || '',
      slug: post?.slug || '',
      content: post?.content || '',
      status: post?.status || 'active'
    }
  })

  const navigate = useNavigate()
  const userData = useSelector(state => state.auth.userData)//from authSlice

  
 
  const submit = async (data) => {

    
    if (post) {
      //means we are editing post

      //step 1 : upload file
      //data is form data
      const file = data.image[0] ? await appWriteService.uploadFile(data.image[0]) : null

      //step 2 : agar new photo upload kiya hoto to delete old one
      if (file) {
        await appWriteService.deleteFile(post.featuredImage)
      }

      //step 3 : update post
      //slug is post.$id 
      //now agar new photo upload kiya hai to appwrite ko file.$id pass karna hai as a featuredImage
      //and agar new photo upload nahi kiya means file nahi hai to old photo ka id pass karna hai
      const dbPost = await appWriteService.updatePost(post.$id, { ...data, featuredImage: file ? file.$id : post.featuredImage })

      //step 4 : navigate to post
      if (dbPost) {
        navigate(`/post/${dbPost.$id}`)
      }
    }
    else {
      //creating new post
      //yaha par ham new post create kar rahe hai

      //step 1 : upload file
      const file =  data.image && data.image.length > 0 ? await appWriteService.uploadFile(data.image[0]) : null
      console.log("userId in Postform",userData.userData.$id)
      


      if (file) {
        //step 2 : now file is uploaded
        //so we are assigning file id to featuredImage
        const fileId = file.$id
        data.featuredImage = fileId

        //step 3 : create a new post
        //appwrite me ham userId bhi store karva rahe hai to yaha se ham userId bhi pass kar rahe hai as userData.$id from authSlice
          // Ye function naya post create karta hai database mein.
        // Example: Agar data mein title "My First Post", content "Hello World", aur featuredImage "abc123" hai, aur current user ID "user789" hai, toh post create hoga with all these details.
      
        const dbPost = await appWriteService.createPost({ ...data, userId: userData.userData.$id })//Most important line hai ye aana karne bau error aavya
        if (dbPost) {
          navigate(`/post/${dbPost.$id}`)
        }
      }
    }
  }

  //Ye function title ko slug mein convert karta hai, jo ki ek URL-friendly version hota hai.
  //// Title ko URL-friendly slug mein convert karta hai (lowercase + dash + special characters hatata hai)
  // Example: Agar title "My First Post" hai, toh slug "my-first-post" banega.
  const slugTransform = useCallback((value) => {
    //transform title to slug
    if (value && typeof value === 'string') {
      return value.trim().toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')

    }
    return ''

  }, [])

  //Ye part form ke title field ko continuously dekh raha hai (watch kar raha hai). Jaise hi title change hota hai, automatically slug bhi update ho jaata hai.
  useEffect(() => {

    //watch() title field ko observe kar raha hai

    // Jab title change hota hai, slug bhi update ho jaata hai


    const subscription = watch((value, { name }) => {
      if (name === 'title') {
        setValue('slug', slugTransform(value.title, { shouldValidate: true }))
      }

    })
    return () => {
      subscription.unsubscribe()
    }
  }, [watch, slugTransform, setValue])
  return (
    <>
      <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
            <div className="w-2/3 px-2">
                <Input
                    label="Title :"
                    placeholder="Title"
                    className="mb-4"
                    {...register("title", { required: true })}
                />
                <Input
                    label="Slug :"
                    placeholder="Slug"
                    className="mb-4"
                    {...register("slug", { required: true })}
                    onInput={(e) => {
                        setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
                    }}
                />
                <RTE label="Content :" name="content" control={control} defaultValue={getValues("content")} />
            </div>
            <div className="w-1/3 px-2">
                <Input
                    label="Featured Image :"
                    type="file"
                    className="mb-4"
                    accept="image/png, image/jpg, image/jpeg, image/gif"
                    {...register("image", { required: !post })}
                />
                {post && (
                    <div className="w-full mb-4">
                        <img
                            src={appWriteService.getFilePreview(post.featuredImage)}
                            alt={post.title}
                            className="rounded-lg"
                        />
                    </div>
                )}
                <Select
                    options={["active", "inactive"]}
                    label="Status"
                    className="mb-4"
                    {...register("status", { required: true })}
                />
                <Button type="submit" bgColor={post ? "bg-green-500" : undefined} className="w-full">
                    {post ? "Update" : "Submit"}
                </Button>
            </div>
        </form>
    </>

  )
}

export default Postform