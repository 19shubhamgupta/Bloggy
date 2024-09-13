import { useSelector } from "react-redux";
import LogoutBtn from "./logoutBtn";
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
      <header className="d-flex flex-wrap align-items-center justify-content-center  py-3 mb-4 border-bottom">
        {/* <div className="col-md-3 mb-2 mb-md-0">
          <a
            href="/"
            className="d-inline-flex link-body-emphasis text-decoration-none"
          >
            <svg
              className="bi"
              width="40"
              height="32"
              role="img"
              aria-label="Bootstrap"
            >
              <use xlink:href="#bootstrap"></use>
            </svg>
          </a>
        </div> */}

        <ul className="nav col-12 col-md-auto mb-2 justify-content-center mb-md-0">
          {navItems.map((item) =>
            item.active ? (
              <button
                key={item.Name}
                href="#"
                className={`nav-link px-2 ${tab === item.Name && "text-black"}`}
                style={{ fontSize: "22px" }}
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
