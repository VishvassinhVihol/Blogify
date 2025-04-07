// creating database 

import conf from "../conf/conf";

import { Client, Databases,Storage, ID, Query } from "appwrite";

export class Service{
    client = new Client()
    databases;
    bucket;

    constructor(){

        this.client.setEndpoint(conf.appWriteUrl).setProject(conf.appWriteProjectId)
        this.databases = new Databases(this.client)
        this.bucket = new Storage(this.client)
    }

    async createPost({title,slug,content,featuredImage,status,userId}){
        console.log("userId in createPost",userId)
        try {
           return await this.databases.createDocument(
            conf.appWriteDatabaseId,
            conf.appWriteCollectionId,
            slug,//slug as ID
            { //post ni details
                title,
                content,
                featuredImage,
                status,
                userId
            }
           ) 
        } catch (error) {
            throw error;
        }
    }

    async updatePost (slug,{title,content,featuredImage,status}){
        try {
           return await this.databases.updateDocument(
            conf.appWriteDatabaseId,
            conf.appWriteCollectionId,
            slug,//slug as ID
            { //post ni details
                title,
                content,
                featuredImage,
                status,
               
            }
           ) 
        } catch (error) {
            throw error;
        }
    }

    async deletePost (slug){
        try {
            await this.databases.deleteDocument(
            conf.appWriteDatabaseId,
            conf.appWriteCollectionId,
            slug,//slug as ID
            
           ) 
           return true
        } catch (error) {
            return false
        }
    }

    async getPost (slug){
        try {
           return await this.databases.getDocument(
            conf.appWriteDatabaseId,
            conf.appWriteCollectionId,
            slug,//slug as ID
            
           ) 
         
        } catch (error) {
           throw error
        }
    }

    //now mare evi posts joie chhie jemnu status active hoy 
    async getPosts (queries = [Query.equal("status","active")]){//here queries is only a variable.have aapde appwriter ma document ma index tarike status ne select karel chhe.aapde ahi tyare j aa queries lagavi shakishu jyare aapde koi index set kari hoy
        try { 
            return await this.databases.listDocuments(
                conf.appWriteDatabaseId,
                conf.appWriteCollectionId,
                queries
            )

        } catch (error) {
            throw error
        }
    }


    //file upload services
    async uploadFile(file){
        try { 
            return await this.bucket.createFile(
                conf.appWriteBucketId,
                ID.unique(),
                file
            )

        } catch (error) {
            throw error
        }
    }


    async deleteFile(fileId){
        try { 
             await this.bucket.deleteFile(
                conf.appWriteBucketId,
                fileId
            )

            return true;

        } catch (error) {
            return false;
        }
    }


    getFilePreview(fileId){
        console.log("fileId in getFilePreview",fileId)
        try { 
             return this.bucket.getFilePreview(
                conf.appWriteBucketId,
                fileId
            )

        } catch (error) {
            throw error
        }
    }

    // getFileView
    getFileView(fileId){
        console.log("fileId in getFileView",fileId)
        try { 
             return this.bucket.getFileView(
                conf.appWriteBucketId,
                fileId
            )

        } catch (error) {
            throw error
        }
    }


}


const service = new Service()
export default service