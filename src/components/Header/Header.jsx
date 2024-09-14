import { useSelector } from "react-redux";
import LogoutBtn from "./LogoutBtn";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const Header = () => {
  const authStatus = useSelector((state) => state.auth.status);
  const navigate = useNavigate();
  const [tab, setTab] = useState("Home");
  const navItems = [
    {
      Name: "Home",
      slug: "/",
      active: true,
    },
    {
      Name: "Add Posts",
      slug: "/add-post",
      active: authStatus,
    },
    {
      Name: "All Posts",
      slug: "/all-post",
      active: authStatus,
    },
  ];
  return (
    <>
      <header className="d-flex flex-wrap align-items-center justify-content-center py-3 mb-4 border-bottom">
        <ul className="nav col-md-auto mb-2 justify-content-center mb-md-0">
          {navItems.map((item) =>
            item.active ? (
              <button
                key={item.Name}
                className={`nav-link px-2 ${
                  tab === item.Name ? "text-black" : ""
                }`}
                style={{ fontSize: "26px" }}
                onClick={() => {
                  navigate(item.slug);
                  setTab(item.Name);
                }}
              >
                {item.Name}
              </button>
            ) : null
          )}
        </ul>
        {authStatus ? (
          <LogoutBtn />
        ) : (
          <div className="col-md-3 text-end">
            <button
              type="button"
              className="btn btn-outline-primary me-2"
              onClick={() => navigate("/login")}
            >
              Login
            </button>
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => navigate("/signup")}
            >
              Sign-up
            </button>
          </div>
        )}
      </header>
    </>
  );
};

export default Header;
