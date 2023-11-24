import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import LoginForm from "./components/login/LoginForm";
import SignInForm from "./components/signIn/SignInForm";
import Home from "./components/home/Home";
import AdminDashboard from "./components/admin/AdminDashboard";
import Library from "./components/library/Library";

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
        path: "login",
        element: <LoginForm />,
      },
      {
        path: "signin",
        element: <SignInForm />,
      },
      {
        path: "library",
        element: <Library />,
      },
      {
        path: "admin",
        element: <AdminDashboard />,
      },
    ],
  },
]);

const container = document.getElementById("root");
const root = createRoot(container!);

root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
