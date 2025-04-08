import React from 'react'
import { useLocation } from 'react-router-dom';


export default function DefaultCard() {
    const location = useLocation()
    const {post} = location.state || {} //to get data from navigate method
    const {title,content,imageLink} = post

    return post ? (
        <div className="bg-black flex flex-col items-center px-5  ">
            {/* Post Image + Edit/Delete */}
            <div className="relative mb-6 mt-5">
                <img
                    src={imageLink}
                    alt={title}
                    className="w-[500px] max-h-[500px] object-contain rounded-xl shadow-md"
                />

               
            </div>

            {/* Post Title */}
            <div className="m-4 mb-6 ">
                <h1 className="text-3xl font-bold text-white">{title}</h1>
            </div>

            {/* Post Content */}
            <div className="prose max-w-none prose-lg text-base text-white leading-6 mb-20 px-8">
                {content}
            </div>
        </div>
    ) : null;
}
