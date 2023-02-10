import React from "react";
import { Outlet, Routes, useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import Login from "./Login";

const PrivateRoute = ({ children, ...rest }) => {
  const isUser = true;
  const navigate = useNavigate();

  return (
    <div>
      {!isUser && <Login />}
      {isUser && <Outlet />}
    </div>
  );
};
export default PrivateRoute;
