import type { FC, ReactNode } from "react";
import { Navigate } from "react-router-dom";
import PropTypes from "prop-types";
import useAuth from "../hooks/useAuth";

interface GuestGuardProps {
  children?: ReactNode;
}

const GuestGuard: FC<GuestGuardProps> = ({ children }) => {
  const { isAuthenticated, user } = useAuth();

  if (isAuthenticated) {
    if (user?.role == 2) {
      return <Navigate to="/admin/dashboard" />;
    } else if (user?.role == 0) {
      return <Navigate to="/vendor-dashboard" />;
    } else if (user?.role == 1) {
      return <Navigate to="/painel-usuario" />;
    }
  }

  return <>{children}</>;
};

GuestGuard.propTypes = {
  children: PropTypes.node,
};

export default GuestGuard;
