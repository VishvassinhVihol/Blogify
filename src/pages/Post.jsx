import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import appwriteService from '../appwrite/config'
import { Button } from '../Components'
import parse from "html-react-parser";
import { useSelector } from "react-redux";

export default function Post() {
    const [post, setPost] = useState(null);
    const { slug } = useParams();
    const navigate = useNavigate();

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
    };

    return post ? (
        <div className="py-10 px-4 max-w-4xl mx-auto mt-20">
            {/* Post Image + Edit/Delete */}
            <div className="relative mb-6">
                <img
                    src={appwriteService.getFileView(post.featuredImage)}
                    alt={post.title}
                    className="w-[500px] max-h-[500px] object-contain rounded-xl shadow-md"
                />

                {isAuthor && (
                    <div className="absolute top-4 right-4 flex gap-2">
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

            {/* Post Title */}
            <div className="mb-4">
                <h1 className="text-3xl font-bold text-gray-800">{post.title}</h1>
            </div>

            {/* Post Content */}
            <div className="prose max-w-none prose-lg text-gray-700 leading-relaxed">
                {parse(post.content)}
            </div>
        </div>
    ) : null;
}
