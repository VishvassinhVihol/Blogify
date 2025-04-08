import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import appwriteService from '../appwrite/config'
import { Button } from '../Components'
import parse from "html-react-parser";
import { useSelector } from "react-redux";
import SuccessAlert from '../Components/Alerts/SuccessAlert';

export default function Post() {
    const [post, setPost] = useState(null);
    const { slug } = useParams();
    const navigate = useNavigate();
    const [showSuccessMsg,setShowSuccessMsg] = useState(false)

    const userData = useSelector((state) => state.auth.userData);
    
    
    const isAuthor = post && userData ? post.userId === userData.userData.$id : false;
    console.log("isAuthor", isAuthor);
    

    useEffect(() => {
        if (slug) {
            appwriteService.getPost(slug).then((post) => {
                if (post) setPost(post);
                else navigate("/");
            });
        } else navigate("/");
    }, [slug, navigate]);

    const deletePost = () => {
        appwriteService.deletePost(post.$id).then((status) => {
            if (status) {
                appwriteService.deleteFile(post.featuredImage);
                navigate("/");
            }
        });
        setShowSuccessMsg(true)
    };

    return post ? (

        <div className="bg-black flex flex-col items-center px-5">
            {/* Post Image + Edit/Delete */}
            {showSuccessMsg && <SuccessAlert message='Post deleted'/>}
            <div>
                <div  className="relative mb-6 mt-10">
                <img
                    src={appwriteService.getFileView(post.featuredImage)}
                    alt={post.title}
                    className="w-[500px] max-h-[500px] object-contain rounded-xl shadow-md"
                />
                </div>
            </div>
           
            {/* Post Title */}
            <div className="mb-4">
                <h1 className="text-3xl font-bold text-white">{post.title}</h1>
            </div>

            {/* Post Content */}
            <div className="prose max-w-none prose-lg text-base text-white leading-6 mb-5 md:px-8 px-2">
                {parse(post.content)}
            </div>

            <div className='md:absolute md:ml-0 block m-auto right-5 top-20 md:mt-0 mt-10 mb-10'>


                {isAuthor && (
                    <div className="flex gap-3">
                        <Link to={`/edit-post/${post.$id}`}>
                            <Button className="bg-green-700 hover:bg-green-800 text-white font-semibold px-4 py-2 rounded-lg">
                                Edit
                            </Button>
                        </Link>
                        <Button
                            onClick={deletePost}
                            className="bg-red-600 hover:bg-red-700 text-white font-semibold px-4 py-2 rounded-lg"
                        >
                            Delete
                        </Button>
                    </div>
                )}
            </div>
        </div>
    ) : null;
}
