import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Login from "./components/login/Login";
import SignInForm from "./components/signIn/SignInForm";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: (
          <div className="flex items-center justify-center text-5xl">Home</div>
        ),
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "signin",
        element: <SignInForm />,
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
