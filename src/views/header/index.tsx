import React, { useEffect, useRef, useState } from "react";

// import { Link } from "react-router-dom";

import { HashLink as Link } from "react-router-hash-link";
import { useNavigate } from "react-router-dom";

import {
  HeaderWrapper,
  HeaderContainer,
  HeaderLogo,
  HeaderLogoImg,
  HeaderLink,
  NavBar,
  NavMenu,
  NavMenuItem,
  UserAction,
  BroadcastButton,
  UserButton,
  MobileNavMenu,
  MobileButton,
  MobileMenu,
  MobileMenuHeader,
  MobileMenuContent,
  MobileMenuLogoImg,
  OverLay,
  ProfileImage,
} from "./index.style";

import useAuth from "../../hooks/useAuth";
import { toast } from "react-toastify";
import ReactTooltip from "react-tooltip";
import jwtDecode from "jwt-decode";

export default function Header() {
  const [profileImg, setProfileImg] = useState<string>("");

  const showMobileMenu = () => {
    var element = document.querySelector(".mobile-menu");
    element?.classList.add("visible");

    var element = document.querySelector(".overlay");
    element?.classList.add("visible");
  };

  const hideMobileMenu = () => {
    var element = document.querySelector(".mobile-menu");
    element?.classList.remove("visible");

    var element = document.querySelector(".overlay");
    element?.classList.remove("visible");
  };

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

  const inputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    try {
      const accessToken: any = window.localStorage.getItem("accessToken");
      const decoded: any = jwtDecode(accessToken);
      console.log(decoded);
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
    <HeaderWrapper>
      <OverLay className="overlay" onClick={() => hideMobileMenu()}></OverLay>
      <HeaderContainer>
        <HeaderLogo>
          <Link to="/">
            <HeaderLogoImg src="/static/icons/logo.svg" />
          </Link>
        </HeaderLogo>
        <NavBar>
          <NavMenu>
            <NavMenuItem>
              <Link to="/" style={{ textDecoration: "none" }}>
                <HeaderLink>HOME</HeaderLink>
              </Link>
            </NavMenuItem>
            <NavMenuItem>
              <Link to="/#about" style={{ textDecoration: "none" }}>
                <HeaderLink>SOBRE NÓS</HeaderLink>
              </Link>
            </NavMenuItem>
            <NavMenuItem>
              <Link to="/#howto" style={{ textDecoration: "none" }}>
                <HeaderLink>COMO FUNCIONA</HeaderLink>
              </Link>
            </NavMenuItem>
            <NavMenuItem>
              <Link to="/blog" style={{ textDecoration: "none" }}>
                <HeaderLink>BLOG</HeaderLink>
              </Link>
            </NavMenuItem>
          </NavMenu>
          <UserAction>
            {/* <BroadcastButton></BroadcastButton> */}

            {isAuthenticated == false ? (
              <Link to="/login">
                <UserButton>
                  {/* <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="35"
                    height="35"
                    fill="currentColor"
                    viewBox="0 0 16 16"
                    style={{ verticalAlign: "middle" }}
                  >
                    <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"></path>
                    <path
                      fillRule="evenodd"
                      d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"
                    ></path>
                  </svg> */}
                  <ProfileImage src={profileImg} />
                </UserButton>
              </Link>
            ) : (
              <>
                <UserButton
                  onClick={handleShowMenu}
                  data-tip
                  data-for="avatar-tip"
                >
                  <ProfileImage src={profileImg} />
                </UserButton>
                {showMenu ? (
                  <div className="menu" ref={inputRef}>
                    <div className="item" onClick={handleLogout}>
                      Logout
                    </div>
                  </div>
                ) : null}
                {/* <ReactTooltip id="avatar-tip">
                  <span>{user?.userName}</span>
                </ReactTooltip> */}
              </>
            )}
          </UserAction>
          <MobileNavMenu>
            <MobileButton onClick={() => showMobileMenu()}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="35"
                height="35"
                fill="#e8b89b"
                viewBox="0 0 16 16"
              >
                <path
                  fillRule="evenodd"
                  d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"
                ></path>
              </svg>
            </MobileButton>
          </MobileNavMenu>
          <MobileMenu className="mobile-menu">
            <MobileMenuHeader>
              <MobileMenuLogoImg src="/static/icons/logo.svg" />
            </MobileMenuHeader>
            <MobileMenuContent>
              <NavMenuItem>
                <Link
                  to="/"
                  style={{ textDecoration: "none" }}
                  onClick={hideMobileMenu}
                >
                  <HeaderLink>HOME</HeaderLink>
                </Link>
              </NavMenuItem>
              <NavMenuItem>
                <Link
                  to="/#about"
                  style={{ textDecoration: "none" }}
                  onClick={hideMobileMenu}
                >
                  <HeaderLink>SOBRE NÓS</HeaderLink>
                </Link>
              </NavMenuItem>
              <NavMenuItem>
                <Link
                  to="/#howto"
                  style={{ textDecoration: "none" }}
                  onClick={hideMobileMenu}
                >
                  <HeaderLink>COMO FUNCIONA</HeaderLink>
                </Link>
              </NavMenuItem>
              <NavMenuItem>
                <Link
                  to="/blog"
                  style={{ textDecoration: "none" }}
                  onClick={hideMobileMenu}
                >
                  <HeaderLink>BLOG</HeaderLink>
                </Link>
              </NavMenuItem>
            </MobileMenuContent>
          </MobileMenu>
        </NavBar>
      </HeaderContainer>
    </HeaderWrapper>
  );
}
