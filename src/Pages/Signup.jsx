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
  <form onSubmit={handleSubmit(signup)}>
  <div className="container d-flex flex-column justify-content-center" style={{ minHeight: "80vh" }}>
    <div className="card p-4 shadow-lg mx-auto" style={{ maxWidth: "400px", width: "100%" }}>
      <h2 className="text-center text-primary mb-4">Sign up</h2>
      
      <div className="mb-3">
        <label htmlFor="name" className="form-label text-primary">Name</label>
        <input
          type="text"
          className="form-control"
          id="name"
          name="name"
          {...register("name", { required: true })}
        />
      </div>

      <div className="mb-3">
        <label htmlFor="email" className="form-label text-primary">Email</label>
        <input
          type="email"
          className="form-control"
          id="email"
          name="email"
          {...register("email", { required: true })}
        />
      </div>

      <div className="mb-3">
        <label htmlFor="password" className="form-label text-primary">Password</label>
        <input
          type="password"
          className="form-control"
          id="password"
          name="password"
          {...register("password", { required: true })}
        />
      </div>

      <button type="submit" className="btn btn-primary w-100">Sign Up</button>
    </div>
  </div>
</form>


  )
}

export default Signup
