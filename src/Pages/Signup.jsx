import React from 'react'
import { useForm } from "react-hook-form";
import authService from "../appwrite/auth";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { login as authLogin } from "../store/authSlice";
import { useNavigate } from 'react-router-dom';

function Signup() {
    const {register , handleSubmit} = useForm();
    const [error , setError] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const signup = async(data) => {
      console.log(data)
        setError("")
        try {
            const created = await authService.createAccount(data);
            console.log("created suceess");        
        if (created) {
            const userData = await authService.getCurrentUser() ;
            
            if(userData){
              dispatch(authLogin({ userData }))
              navigate("/")
            }
        } 
        } catch (error) {
            setError(error.message)
        }
    }
  return (
    <form onSubmit={handleSubmit(signup)} >
     <div class="container d-flex align-items-center justify-content-center vh-100">
      <div
        class="card p-4 shadow-lg"
        style={{ maxWidth: "400px", width: "100%" }}
      >
        <h2 class="text-center text-primary mb-4">Sign up</h2>
       
        <div class="mb-3">
            <label for="name" class="form-label text-primary">
              Name
            </label>
            <input
              type="text"
              class="form-control"
              id="name"
              name="name"
              {...register("name",{required:true})}
            />
          </div>
          <div class="mb-3">
            <label for="email" class="form-label text-primary">
              Email
            </label>
            <input
              type="text"
              class="form-control"
              id="email"
              name="email"
              {...register("email",{required:true})}
            />
          </div>
          <div class="mb-3">
            <label for="password" class="form-label text-primary">
              Password
            </label>
            <input
              type="password"
              class="form-control"
              id="password"
              name="password"
              {...register("password",{required:true})}
            />
          </div>
          <button type="submit" class="btn btn-primary w-100" >
            Sign Up
          </button>
          {/* <div class="text-center mt-3">
            <p class  =" mb-0">Don't have a account Sign up</p>
          </div> */}
       
      </div>
    </div>
   </form>
  )
}

export default Signup
