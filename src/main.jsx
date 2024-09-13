import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import Home from "./Pages/Home.jsx";
import { Provider } from "react-redux";
import store from "./store/store.js";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./Pages/Login.jsx";
import Signup from "./Pages/Signup.jsx";
import AddPosts from "./Pages/AddPosts.jsx";
import EditPost from "./Pages/EditPost.jsx";
import Posts from "./Pages/Posts.jsx";
import AllPosts from "./Pages/AllPosts.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/signup",
        element: <Signup />,
      },
      {
        path: "/add-post",
        element: <AddPosts />,
      },
      {
        path: "/all-post",
        element: <AllPosts />,
      },
      {
        path: "/edit-post/:slug",
        element: <EditPost />,
      },
      {
        path: "/post/:slug",
        element: <Posts />,
      },
    ],
  },
]);
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>
);
