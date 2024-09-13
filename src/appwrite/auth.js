import config from "../config/config.js";
import { Client, Account, ID } from "appwrite";


export class AuthService {
  client = new Client();
  account;

  constructor() {
    this.client
      .setEndpoint(config.appwriteUrl)
      .setProject(config.appwriteProjectId);
    this.account = new Account(this.client);
  }

  async createAccount({email,password,name}) {
    try {
      console.log("createAccount  called")
        const userAccount = await this.account.create(ID.unique(), email, password , name);
       
        if (userAccount) {
          console.log("user acc")
            return await this.login({email,password});
            
        } else {
            return userAccount;
        }

    } catch (error) {
        throw error;
    }
  }

  async login({email, password}) {
    try {
        console.log("Login called in auth js");
        const sessionResult = await this.account.createEmailPasswordSession(email, password);
        console.log("createEmailPasswordSession success:", sessionResult); 
        return sessionResult;
    } catch (error) {
        console.error("Error in login:", error); 
        throw error;
    }
}


  async getCurrentUser(){

    try {
      console.log("get current user called");
     const result = await this.account.get();
     console.log(result);
     return result;
         
    } catch (error) {
        throw error;
    }
   
  }

  async logout(){
    try {
        await this.account.deleteSessions();
        console.log("logout succesful");
    } catch (error)
     {
        throw error; 
    }
  }
}

const authService = new AuthService();

export default authService;
