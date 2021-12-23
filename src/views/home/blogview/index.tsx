import React from "react";

import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

import { GetBlogs } from "../../../apis";

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

export default function BlogView() {
  const [showMore, setShowMore] = useState(true);
  const [blogData, setBlogData] = useState<any>([]);
  const [currentCount, setCurrentCount] = useState<number>(2);
  const [blogAllData, setBlogAllData] = useState<any>([]);
  const getBlogData = (count: number) => {
    return blogAllData.slice(0, currentCount);
  };

  useEffect(() => {
    GetBlogs(-1).then((res) => {
      console.log(res);
      setBlogAllData(res);
    });
  }, []);

  useEffect(() => {
    const datatotalLength = blogAllData.length;
    setShowMore(datatotalLength > currentCount);
    const data = getBlogData(currentCount);
    setBlogData(data);
  }, [blogAllData]);

  useEffect(() => {
    console.log("bbbb");
    const datatotalLength = blogAllData.length;
    setShowMore(datatotalLength > currentCount);
    const data = getBlogData(currentCount);
    setBlogData(data);
  }, [currentCount]);
  return (
    <BlogViewWrapper>
      <BlogViewContainer>
        <BlogViewTitle>Blog</BlogViewTitle>
        <BlogViewContentPart>
          {blogData.map((data: any, index: number) => {
            return (
              <BlogViewItemPart key={index}>
                <BlogViewItem src={data.image} />
                <BlogItemTitle>{data.name}</BlogItemTitle>
                <Link
                  to={`/blog/${data._id}`}
                  style={{ textDecoration: "none", color: "black" }}
                >
                  <BlogItemLink>Leia mais &gt;</BlogItemLink>
                </Link>
              </BlogViewItemPart>
            );
          })}
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
