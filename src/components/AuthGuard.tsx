import type { FC, ReactNode } from "react";
import { Navigate } from "react-router-dom";
import PropTypes from "prop-types";
import useAuth from "../hooks/useAuth";

interface AuthGuardProps {
  children?: ReactNode;
}

const AuthGuard: FC<AuthGuardProps> = ({ children }) => {
  // const { isAuthenticated } = useAuth();

  console.log(window.localStorage.getItem("accesstoken"), "accesstoken");
  // if (isAuthenticated == true) {
  //   return <>{children}</>;
  // } else {
  const isAuthenticate =
    window.localStorage.getItem("accesstoken") != "" ? true : false;

  if (!isAuthenticate) {
    return <Navigate to="/login" />;
  }
  return <>{children}</>;
  // }
};

AuthGuard.propTypes = {
  children: PropTypes.node,
};

export default AuthGuard;
