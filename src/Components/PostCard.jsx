import React from 'react'
import appwriteService from "../appwrite/config"
import { Link } from 'react-router-dom'

function PostCard({ post }) {
    if(!post) return null
    const { $id, featuredImage, title } = post
    const imageUrl = appwriteService.getFileView(featuredImage)

    return (
        <Link to={`/post/${$id}`} className="transition-transform duration-200 hover:scale-105">
            <div className="w-full bg-white shadow-md rounded-xl overflow-hidden border border-gray-200 hover:shadow-lg">
                <div className="w-full h-48 bg-gray-100">
                    <img 
                        src={imageUrl} 
                        alt={title} 
                        className="w-full h-full object-cover object-center" 
                    />
                </div>
                <div className="p-4">
                    <h2 className="text-lg font-semibold text-gray-800 truncate">{title}</h2>
                </div>
            </div>
        </Link>
    )
}

export default PostCard
