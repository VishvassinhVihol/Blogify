import React from 'react'
import appwriteService from "../appwrite/config"
import { Link, useNavigate } from 'react-router-dom'

function PostCard({ post }) {
    if(!post) return null
    const { $id, featuredImage, title } = post
    const imageUrl = appwriteService.getFileView(featuredImage)
    const navigate = useNavigate()

  


    return (
        <div  className="transition-transform duration-200 hover:scale-105 px-4">
            <div key={title} className=" flex-shrink-0 md:w-96 w-[320px]  bg-white border border-gray-200 rounded-lg shadow-lg dark:bg-gray-800 dark:border-gray-700 snap-center ">
              <a href="#">
                <img className="rounded-t-lg w-full h-64 object-cover" src={imageUrl} alt="Gen AI" />
              </a>
              <div className="p-6">
                <a href="#">
                  <h5 className="mb-3 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{post.title}</h5>
                </a>
                <p className="mb-4 font-normal text-gray-700 dark:text-gray-400">{post.description}</p>
                <button onClick={() => navigate(`/post/${post.$id}`)}  className="inline-flex cursor-pointer items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 transition-colors">
                  Read more
                  <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                  </svg>
                </button>
              </div>
            </div>
        </div>
    )
}

export default PostCard
