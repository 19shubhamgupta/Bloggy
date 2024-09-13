import "./App.css";
import Header from "./components/Header/Header";
import "bootstrap/dist/css/bootstrap.css";
import Footer from "./components/Footer/Footer";
import authService from "./appwrite/auth";
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { login, logout } from "./store/authSlice";
//import Input from "./components/Input";
//import Login from "./Pages/Login";
//import Signup from "./Pages/Signup";
import { Outlet } from "react-router-dom";

function App() {
  //  console.log(import.meta.env.VITE_APPWRITE_URL)
  let [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  useEffect(() => {
    authService
      .getCurrentUser()
      .then((userData) => {
        if (userData) {
          dispatch(login({ userData }));
        } else dispatch(logout());
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);
  return loading ? (
    <h1>Loading...</h1>
  ) : (
    <div className="cont">
      <Header></Header>
      <Outlet/>
      <Footer></Footer>
    </div>
  );
}

export default App;
