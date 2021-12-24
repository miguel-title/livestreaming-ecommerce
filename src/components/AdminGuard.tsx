import type { FC, ReactNode } from "react";
import { Navigate } from "react-router-dom";
import PropTypes from "prop-types";
import useAuth from "../hooks/useAuth";

interface AdminGuardProps {
  children?: ReactNode;
}

const AdminGuard: FC<AdminGuardProps> = ({ children }) => {
  // const { isAuthenticated, user } = useAuth();

  console.log(window.localStorage.getItem("accessToken"));
  if (window.localStorage.getItem("accessToken") != null) {
    const isAuthenticate =
      window.localStorage.getItem("accessToken") != "" ? true : false;

    if (!isAuthenticate) {
      return <Navigate to="/admin/login" />;
    }
    return <>{children}</>;
  } else {
    return <Navigate to="/admin/login" />;
  }
};

AdminGuard.propTypes = {
  children: PropTypes.node,
};

export default AdminGuard;
