import React from "react";
import { Link } from "react-router-dom";
import { BiUserCircle } from "react-icons/bi";
import { BiNotepad } from "react-icons/bi";
import ReactTooltip from "react-tooltip";

import {
  SideBarWrapper,
  SideBarHeader,
  SideBarContent,
  MenuItem,
  DividerByDot,
} from "./index.style";
import logoImage from "../../../assets/home/logo-square-light.svg";

export default function index() {
  return (
    <>
      <SideBarWrapper>
        <SideBarHeader>
          <Link to="/admin/dashboard">
            <img src={logoImage} width={70} height={70} alt="logo" />
          </Link>
        </SideBarHeader>
        <SideBarContent>
          <DividerByDot>...</DividerByDot>
          <Link to="/admin/blog" data-tip data-for="blog">
            <MenuItem>
              <BiNotepad />
            </MenuItem>
          </Link>
          <ReactTooltip id="blog" effect="solid">
            <span>Blog</span>
          </ReactTooltip>
          <Link to="/admin/user" data-tip data-for="users">
            <MenuItem>
              <BiUserCircle />
            </MenuItem>
          </Link>
          <ReactTooltip id="users" effect="solid">
            <span>Usuário</span>
          </ReactTooltip>
        </SideBarContent>
      </SideBarWrapper>
    </>
  );
}
