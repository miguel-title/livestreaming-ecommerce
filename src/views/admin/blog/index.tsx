import React, { useState, useEffect } from "react";

import ReactPaginate from "react-paginate";

import {
  DashboardWrapper,
  DashboardTitle,
  DashboardSubTitle,
  SubContainer,
  TableContainer,
  TableRow,
} from "./../index.style";

import { FormTextField, NewPostButton, PageContainer } from "./index.style";

import { GetBlogs, DeleteBlog } from "../../../apis";
import { Link } from "react-router-dom";

export default function Blog() {
  const [blogAllData, setBlogAllData] = useState<any>([]);
  const [blogData, setBlogData] = useState<any>([]);
  const [pageBlogData, setPageBlogData] = useState<any>([]);
  const [curPage, setCurPage] = useState<any>(0);
  const [totalPage, setTotalPage] = useState<number>(0);
  const [offset, setOffset] = useState<any>(0);

  useEffect(() => {
    GetBlogs(-1).then((res: any) => {
      setBlogData(res);

      setBlogAllData(res);

      var page = res.length % 5 > 0 ? 1 : 0;
      setTotalPage(Math.floor(res.length / 5) + page);
    });
  }, []);

  useEffect(() => {
    setPageBlogData(blogData.slice(5 * curPage, 5 * (curPage + 1) - 1));
  }, [curPage, blogData]);

  const handleDelete = async (id: string) => {
    await DeleteBlog(id);
    await GetBlogs(-1).then((res: any) => {
      setBlogData(res);
      setBlogAllData(res);
      setPageBlogData(res.slice(0, 4));
    });
  };
  const handleInputChange = (e: any) => {
    const filteredBlogData = blogAllData.filter((item: any) =>
      item.name.includes(e.target.value)
    );
    setBlogData(filteredBlogData);

    var page = filteredBlogData.length % 5 > 0 ? 1 : 0;
    setTotalPage(Math.floor(filteredBlogData.length / 5) + page);
  };

  const getDate = (datestring: string) => {
    let vDate = new Date(datestring);

    let date = vDate.getDate();
    let month = vDate.getMonth(); //Be careful! January is 0 not 1
    let year = vDate.getFullYear();

    return date + "/" + month + "/" + year;
  };

  const handlePageClick = (e: any) => {
    const selectedPage = e.selected;
    const offset = selectedPage * 5;

    setCurPage(selectedPage);
    setOffset(offset);
  };

  return (
    <DashboardWrapper>
      <DashboardTitle>Blog</DashboardTitle>
      <div style={{ width: "200px" }}>
        <Link to="/admin/blog/edit" style={{ textDecoration: "none" }}>
          <NewPostButton>Nova Publicação</NewPostButton>
        </Link>
      </div>
      <SubContainer>
        <DashboardSubTitle>Últimos Posts</DashboardSubTitle>
        <FormTextField
          id="titleSearch"
          onChangeCapture={handleInputChange}
          placeholder="Buscar Post"
        />
        <TableContainer>
          <div className="HeaderSubpart">
            <div className="HeaderPart">
              <div style={{ width: "40%" }}>Nome</div>
              <div style={{ width: "30%" }}>Data</div>
              <div style={{ width: "15%" }}></div>
              <div style={{ width: "15%" }}></div>
            </div>
            <TableContainer>
              {pageBlogData.map((blog: any, index: number) => {
                return (
                  <TableRow
                    key={index}
                    style={{
                      background: index % 2 == 0 ? "#ffffff" : "#eeeeee",
                    }}
                  >
                    <div style={{ width: "40%" }}>{blog.name}</div>
                    <div style={{ width: "30%" }}>
                      {getDate(blog.createdDate)}
                    </div>
                    <Link
                      to={`/admin/blog/edit/${blog._id}`}
                      style={{
                        textDecoration: "none",
                        color: "blue",
                        width: "15%",
                        textAlign: "right",
                        lineHeight: "30px",
                      }}
                    >
                      Editar
                    </Link>
                    <div
                      style={{ width: "15%", cursor: "pointer" }}
                      onClick={() => handleDelete(blog._id)}
                    >
                      Excluir
                    </div>
                  </TableRow>
                );
              })}
            </TableContainer>
          </div>
        </TableContainer>
      </SubContainer>
      <PageContainer>
        <ReactPaginate
          previousLabel={"prev"}
          nextLabel={"next"}
          breakLabel={"..."}
          breakClassName={"break-me"}
          pageCount={totalPage}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={handlePageClick}
          containerClassName={"pagination"}
          activeClassName={"active"}
          nextLinkClassName="nextPagination"
          previousLinkClassName="priviousPagination"
        />
      </PageContainer>
    </DashboardWrapper>
  );
}
