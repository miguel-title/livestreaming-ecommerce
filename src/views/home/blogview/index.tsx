import React from "react";

import { Link } from "react-router-dom";

import {
  BlogViewWrapper,
  BlogViewContainer,
  BlogViewTitle,
  BlogViewContentPart,
  BlogViewItemPart,
  BlogViewItem,
  BlogItemTitle,
  BlogItemLink,
  BlogLinkButton,
  BlogButtonContainer,
} from "./index.style";

import Blog1 from "../../../assets/home/blog1.png";
import Blog2 from "../../../assets/home/blog2.png";

export default function index() {
  return (
    <BlogViewWrapper>
      <BlogViewContainer>
        <BlogViewTitle>Blog</BlogViewTitle>
        <BlogViewContentPart>
          <BlogViewItemPart>
            <BlogViewItem src={Blog1} />
            <BlogItemTitle>O que é Live Shop?</BlogItemTitle>
            <Link
              to={"/blog/0"}
              style={{ textDecoration: "none", color: "black" }}
            >
              <BlogItemLink>Leia mais &gt;</BlogItemLink>
            </Link>
          </BlogViewItemPart>
          <BlogViewItemPart>
            <BlogViewItem src={Blog2} />
            <BlogItemTitle>Conheça o Live Stream Shopping</BlogItemTitle>
            <Link
              to={"/blog/1"}
              style={{ textDecoration: "none", color: "black" }}
            >
              <BlogItemLink>Leia mais &gt;</BlogItemLink>
            </Link>
          </BlogViewItemPart>
        </BlogViewContentPart>
        <BlogButtonContainer>
          <Link to="/blog" style={{ textDecoration: "none" }}>
            <BlogLinkButton>MAIS POSTAGENS</BlogLinkButton>
          </Link>
        </BlogButtonContainer>
      </BlogViewContainer>
    </BlogViewWrapper>
  );
}
