import jwtDecode from "jwt-decode";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { HashLink as Link } from "react-router-hash-link";
import { toast } from "react-toastify";
import useAuth from "../../hooks/useAuth";
import {
  NavbarWrapper,
  MenuLabel,
  LinkContainer,
  UserButton,
  ProfileImage,
  UserAction,
} from "./index.style";

export default function Navbar() {
  const [profileImg, setProfileImg] = useState<string>("");

  const { isAuthenticated, logout, user } = useAuth();

  const [showMenu, setShowMenu] = useState<boolean>(false);

  const navigate = useNavigate();
  const handleLogout = async (): Promise<void> => {
    try {
      await logout();
      navigate("/login");
    } catch (err) {
      console.error(err);
      toast.error("Unable to logout");
    }
  };

  const handleShowMenu = () => {
    setShowMenu(!showMenu);
  };

  const handleDashboard = async (): Promise<void> => {
    setShowMenu(false);
    const accessToken: any = window.localStorage.getItem("accessToken");
    const token: any = jwtDecode(accessToken);
    if (token.role == 0) {
      navigate("/vendor-dashboard");
    } else {
      navigate("/painel-usuario");
    }
  };

  const inputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    try {
      const accessToken: any = window.localStorage.getItem("accessToken");
      const decoded: any = jwtDecode(accessToken);
      if (decoded.avataUrl == "" || typeof decoded.avataUrl == "undefined") {
        setProfileImg("/user-profile.png");
      } else {
        setProfileImg(decoded.avataUrl);
      }
    } catch (err) {
      setProfileImg("/user-profile.png");
    }

    const checkIfClickedOutside = (e: any) => {
      // If the menu is open and the clicked target is not within the menu,
      // then close the menu

      if (inputRef.current && !inputRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("mousedown", checkIfClickedOutside);

    return () => {
      // Cleanup the event listener
      document.removeEventListener("mousedown", checkIfClickedOutside);
    };
  }, []);
  return (
    <NavbarWrapper>
      <LinkContainer>
        <Link to="/">
          <MenuLabel>home</MenuLabel>
        </Link>
        <Link to="/#about">
          <MenuLabel>sobre nós</MenuLabel>
        </Link>
        <Link to="/#howto">
          <MenuLabel>como funciona?</MenuLabel>
        </Link>
        <Link to="/blog">
          <MenuLabel>blog</MenuLabel>
        </Link>
      </LinkContainer>
      <UserAction>
        <UserButton onClick={handleShowMenu} data-tip data-for="avatar-tip">
          <ProfileImage src={profileImg} />
        </UserButton>
        {showMenu ? (
          <div className="menu" ref={inputRef}>
            <div className="item" onClick={handleDashboard}>
              Painel
            </div>
            <div className="item" onClick={handleLogout}>
              Sair
            </div>
          </div>
        ) : null}
      </UserAction>
    </NavbarWrapper>
  );
}
