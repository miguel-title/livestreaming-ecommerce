import type { FC, ReactNode } from "react";
import { Navigate } from "react-router-dom";
import PropTypes from "prop-types";
import useAuth from "../hooks/useAuth";
import jwtDecode from "jwt-decode";

interface AdminGuardProps {
  children?: ReactNode;
}

const AdminGuard: FC<AdminGuardProps> = ({ children }) => {
  // const { isAuthenticated, user } = useAuth();

  if (window.localStorage.getItem("accessToken") != null) {
    const accessToken: any = window.localStorage.getItem("accessToken");
    const decoded: any = jwtDecode(accessToken);
    if (decoded.role == 2) {
      const isAuthenticate =
        window.localStorage.getItem("accessToken") != "" ? true : false;

      if (!isAuthenticate) {
        return <Navigate to="/admin/login" />;
      }
      return <>{children}</>;
    } else {
      return <Navigate to="/admin/login" />;
    }
  } else {
    return <Navigate to="/admin/login" />;
  }
};

AdminGuard.propTypes = {
  children: PropTypes.node,
};

export default AdminGuard;
