import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { GetBlogs, DeleteBlog } from "../../../apis";

import {
  DashboardWrapper,
  DashboardTitle,
  DashboardSubTitle,
  SubContainer,
  TableContainer,
  TableRow,
} from "./../index.style";

import { ButtonContainer, LoadMoreButton } from "./index.style";

export default function Dashboard() {
  const [blogs, setBlogs] = useState<any>([]);

  useEffect(() => {
    GetBlogs(2).then((res: any) => {
      setBlogs(res);
    });
  }, []);

  const handleDelete = async (id: string) => {
    await DeleteBlog(id);
    await GetBlogs(2).then((res: any) => {
      setBlogs(res);
    });
  };

  const getDate = (datestring: string) => {
    let vDate = new Date(datestring);

    let date = vDate.getDate();
    let month = vDate.getMonth(); //Be careful! January is 0 not 1
    let year = vDate.getFullYear();

    return date + "/" + month + "/" + year;
  };

  return (
    <DashboardWrapper>
      <DashboardTitle>Painel Administrativo</DashboardTitle>
      <SubContainer>
        <DashboardSubTitle>Últimos Posts</DashboardSubTitle>
        <TableContainer>
          <div className="HeaderSubpart">
            <div className="HeaderPart">
              <div style={{ width: "40%" }}>Nome</div>
              <div style={{ width: "30%" }}>Data</div>
              <div style={{ width: "15%" }}></div>
              <div style={{ width: "15%" }}></div>
            </div>
            <TableContainer>
              {blogs.map((blog: any, index: number) => {
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
                      style={{
                        width: "15%",
                        cursor: "pointer",
                      }}
                      onClick={() => handleDelete(blog._id)}
                    >
                      Excluir
                    </div>
                  </TableRow>
                );
              })}
            </TableContainer>

            <ButtonContainer>
              <Link to="/admin/blog" style={{ textDecoration: "none" }}>
                <LoadMoreButton>ver todos</LoadMoreButton>
              </Link>
            </ButtonContainer>
          </div>
        </TableContainer>
      </SubContainer>
      <SubContainer>
        <DashboardSubTitle>Vendas Recentes</DashboardSubTitle>
      </SubContainer>
    </DashboardWrapper>
  );
}
