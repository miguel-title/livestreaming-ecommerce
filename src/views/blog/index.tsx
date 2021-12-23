import React from "react";

import { Link } from "react-router-dom";

import { useState, useEffect } from "react";

import { GetBlogs } from "../../apis";

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

import CommonLayout from "../../layout/common";

export default function Blog() {
  const [showMore, setShowMore] = useState(true);
  const [blogData, setBlogData] = useState<any>([]);
  const [currentCount, setCurrentCount] = useState<number>(2);
  const [blogAllData, setBlogAllData] = useState<any>([]);

  const handleLoadMore = () => {
    setCurrentCount(currentCount + 2);
  };

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

  console.log(blogData);

  return (
    <CommonLayout>
      <BlogViewWrapper>
        <BlogViewContainer>
          <BlogViewTitle>Blog</BlogViewTitle>
          <BlogViewContentPart>
            {blogData.map((data: any, index: number) => {
              return (
                <BlogViewItemPart key={index}>
                  <BlogViewItem
                    src={data.image == "" ? "/thumb.png" : data.image}
                  />
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
            {showMore && (
              <BlogLinkButton onClick={handleLoadMore}>
                MAIS POSTAGENS
              </BlogLinkButton>
            )}
          </BlogButtonContainer>
        </BlogViewContainer>
      </BlogViewWrapper>
    </CommonLayout>
  );
}
