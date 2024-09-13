import React from "react";
import { useForm } from "react-hook-form";
import { useState } from "react";
import authService from "../appwrite/auth";
import { useDispatch } from "react-redux";
import authSlice, { login as authLogin, logout } from "../store/authSlice";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";


function Login() {
    const {register , handleSubmit} = useForm();
    const [error , setError] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const login = async(data) => {
      console.log(data);
        setError("")
        try {
            const session = await authService.login(data);
            console.log("login called success~");
        if (session) {
            const userData = await authService.getCurrentUser() ;
            if(userData){
              console.log(userData);
              dispatch(authLogin({ userData }));
              navigate("/");
            }
        } 
        } catch (error) {
            setError(error.message)
        }
    }
  return (
   <form onSubmit={handleSubmit(login)} >
     <div class="container d-flex align-items-center justify-content-center vh-100">
      <div
        class="card p-4 shadow-lg"
        style={{ maxWidth: "400px", width: "100%" }}
      >
        <h2 class="text-center text-primary mb-4">Login</h2>
        
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
            Login
          </button>
          <Link to = "/signup" class="text-center mt-3 text-decoration-none">
            <p class  =" mb-0">Don't have a account Sign up</p>
          </Link>
        
      </div>
    </div>
   </form>
  );
  
}

export default Login;
