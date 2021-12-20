import type { FC, ReactNode } from "react";
import { Navigate } from "react-router-dom";
import PropTypes from "prop-types";
import useAuth from "../hooks/useAuth";

interface MainGuardProps {
  children?: ReactNode;
}

const MainGuard: FC<MainGuardProps> = ({ children }) => {
  const { isAuthenticated, user } = useAuth();
  if (isAuthenticated) {
    if (user?.role == 0) {
      return <Navigate to="/vendor-dashboard" />;
    } else {
      return <Navigate to="/painel-usuario" />;
    }
  } else {
    return <Navigate to="login" />;
  }
};

MainGuard.propTypes = {
  children: PropTypes.node,
};

export default MainGuard;
