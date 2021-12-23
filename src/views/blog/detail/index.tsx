import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

import CommonLayout from "../../../layout/common";

import { Wrapper, Container, Title } from "../../../components/pagedefault";

import { GetBlog } from "../../../apis";

import {
  ImageContainer,
  DescriptionContainer,
  BackButtonContainer,
  BackButton,
} from "./index.style";

export default function BlogDetail() {
  const { blogId } = useParams();
  const [data, setData] = useState<any>({});
  const getCurrentBlogData = () => {
    GetBlog(blogId).then((res) => {
      setData(res);
    });
  };
  useEffect(() => {
    getCurrentBlogData();
  }, []);

  console.log(data.content);
  return (
    <CommonLayout>
      <Wrapper>
        <Container>
          <ImageContainer src={data.image == "" ? "/thumb.png" : data.image} />
          <Title>{data.name}</Title>
          <DescriptionContainer
            dangerouslySetInnerHTML={{ __html: data.content }}
          />
          <BackButtonContainer>
            <Link to="/blog">
              <BackButton>VOLTAR PARA O BLOG</BackButton>
            </Link>
          </BackButtonContainer>
        </Container>
      </Wrapper>
    </CommonLayout>
  );
}
