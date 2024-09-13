import React from "react";
import { useDispatch } from "react-redux";
import authService from "../../appwrite/auth";
import { logout as authLogout } from "../../store/authSlice";
import { useNavigate } from "react-router-dom";


function LogoutBtn() {
  const dispatch = useDispatch();
  const navigate = useNavigate()

  const logoutBtnHandler = () => {
    authService.logout().then(() => {
      dispatch(authLogout());
      navigate("/")
    });
  };

  return (
    <>
    <div className="col-md-3 text-end">
      <button type="button" onClick={logoutBtnHandler} className="btn btn-outline-primary me-2">
            Logout
          </button>
          </div>
    </>
  );
}

export default LogoutBtn;
