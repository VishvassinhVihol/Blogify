import conf from "../conf/conf";

import { Client, Account, ID } from "appwrite";

// const client = new Client()
//     .setEndpoint('https://cloud.appwrite.io/v1') // Your API Endpoint
//     .setProject('<PROJECT_ID>');                 // Your project ID

// const account = new Account(client);

// const user = await account.create(
//     ID.unique(), 
//     'email@example.com', 
//     'password'
// );

//better practice
export class AuthService {
    client = new Client()
    account;

    constructor(){

        this.client.setEndpoint(conf.appWriteUrl).setProject(conf.appWriteProjectId)
        this.account = new Account(this.client)
    }

    //create account signup
    async createAccount({name,email,password}){
        try{
            const userAccount = await this.account.create(ID.unique(),email,password,name)
            if(userAccount){
                //call another method to do login
                //account bani gayel chhe to direct login karavi do
                return this.login({email,password})
            }
            else{
                return userAccount
            }
        }
        catch(e){
            throw e;
        }
    }


    // login
    async login({email,password}){
        try{
            return await this.account.createEmailPasswordSession(email,password)
        }
        catch(e){
            throw e;
        }
    }

    //to get curr account
    async getCurrUser(){
        try{
            return await this.account.get()
        }
        catch(e){
            throw e;
        }
        return null;
    }

    //logout
    async logout(){
        try{
            return await this.account.deleteSessions()
        }
        catch(e){
            throw e;
        }
        return null;
    }
}

const authService = new AuthService()

export default authService