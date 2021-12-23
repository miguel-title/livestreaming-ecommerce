import React from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

import useAuth from "../../../hooks/useAuth";
import { NavbarWrapper, LogoutButton } from "./index.style";

export default function Navbar() {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const handleLogout = async (): Promise<void> => {
    try {
      await logout();
      navigate("/admin/login");
    } catch (err) {
      console.error(err);
      toast.error("Unable to logout");
    }
  };

  return (
    <NavbarWrapper>
      <LogoutButton onClick={handleLogout}>Sair</LogoutButton>
    </NavbarWrapper>
  );
}
