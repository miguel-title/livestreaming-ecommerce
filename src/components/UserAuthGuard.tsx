import type { FC, ReactNode } from "react";
import { Navigate } from "react-router-dom";
import PropTypes from "prop-types";
import useAuth from "../hooks/useAuth";
import jwtDecode from "jwt-decode";

interface UserAuthGuardProps {
  children?: ReactNode;
}

const UserAuthGuard: FC<UserAuthGuardProps> = ({ children }) => {
  // const { isAuthenticated } = useAuth();

  // if (isAuthenticated == true) {
  //   return <>{children}</>;
  // } else {

  if (window.localStorage.getItem("accessToken") != null) {
    const accessToken: any = window.localStorage.getItem("accessToken");
    const decoded: any = jwtDecode(accessToken);
    if (decoded.role == 1) {
      const isAuthenticate =
        window.localStorage.getItem("accessToken") != "" ? true : false;

      if (!isAuthenticate) {
        return <Navigate to="/login" />;
      }
      return <>{children}</>;
    }
    return <Navigate to="/login" />;
  } else {
    return <Navigate to="/login" />;
  }
  // }
};

UserAuthGuard.propTypes = {
  children: PropTypes.node,
};

export default UserAuthGuard;
