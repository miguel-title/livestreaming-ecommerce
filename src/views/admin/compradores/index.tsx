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

import { FormTextField, PageContainer } from "./index.style";

import { GetBuyers, DeleteUser } from "../../../apis";
import { Link } from "react-router-dom";

export default function Vendedores() {
  const [buyerAllData, setBuyerAllData] = useState<any>([]);
  const [buyerData, setBuyerData] = useState<any>([]);
  const [pageBuyerData, setPageBuyerData] = useState<any>([]);
  const [curPage, setCurPage] = useState<any>(0);
  const [totalPage, setTotalPage] = useState<number>(0);
  const [offset, setOffset] = useState<any>(0);

  useEffect(() => {
    GetBuyers(-1).then((res: any) => {
      setBuyerData(res);
      setBuyerAllData(res);

      var page = res.length % 5 > 0 ? 1 : 0;
      setTotalPage(Math.floor(res.length / 5) + page);
    });
  }, []);

  useEffect(() => {
    setPageBuyerData(buyerData.slice(5 * curPage, 5 * (curPage + 1) - 1));
  }, [curPage, buyerData]);

  const handleDelete = async (id: string) => {
    await DeleteUser(id);
    await GetBuyers(-1).then((res: any) => {
      setBuyerData(res);
      setBuyerAllData(res);
      setPageBuyerData(res.slice(0, 4));
    });
  };
  const handleInputChange = (e: any) => {
    const filteredBuyerData = buyerAllData.filter((item: any) =>
      item.name.includes(e.target.value)
    );
    setBuyerData(filteredBuyerData);

    var page = filteredBuyerData.length % 5 > 0 ? 1 : 0;
    setTotalPage(Math.floor(filteredBuyerData.length / 5) + page);
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
      <DashboardTitle>Usuários</DashboardTitle>
      <SubContainer>
        <DashboardSubTitle>Compradores</DashboardSubTitle>
        <FormTextField
          id="titleSearch"
          onChangeCapture={handleInputChange}
          placeholder="Buscar Compradores"
        />
        <TableContainer>
          <div className="HeaderSubpart">
            <div className="HeaderPart">
              <div style={{ width: "40%" }}>Nome</div>
              <div style={{ width: "30%" }}>Data de Registro</div>
              <div style={{ width: "15%" }}></div>
              <div style={{ width: "15%" }}></div>
            </div>
            <TableContainer>
              {pageBuyerData.map((seller: any, index: number) => {
                return (
                  <TableRow
                    key={index}
                    style={{
                      background: index % 2 == 0 ? "#ffffff" : "#eeeeee",
                    }}
                  >
                    <div style={{ width: "40%" }}>{seller.name}</div>
                    <div style={{ width: "30%" }}>
                      {getDate(seller.resteredDate)}
                    </div>
                    <Link
                      to={`/admin/compradores/${seller._id}`}
                      style={{
                        textDecoration: "none",
                        color: "blue",
                        width: "15%",
                        textAlign: "right",
                        lineHeight: "30px",
                      }}
                    >
                      Visualizar
                    </Link>
                    <div
                      style={{ width: "15%", cursor: "pointer", color: "red" }}
                      onClick={() => handleDelete(seller._id)}
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
