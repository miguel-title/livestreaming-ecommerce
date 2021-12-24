import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import ReactPaginate from "react-paginate";

import { GetBuyerPedidos, GetAccountInfo } from "../../../../apis";

import {
  DashboardWrapper,
  DashboardTitle,
  DashboardSubTitle,
  SubContainer,
  TableContainer,
  TableRow,
} from "./../../index.style";

import { FormTextField, PageContainer } from "./index.style";

import { BackButton, BackButtonContainer } from "./index.style";

export default function VendedorEdit() {
  const { compradorID } = useParams();

  const [buyerData, setBuyerData] = useState<any>();

  const [pedidoAllData, setPedidoAllData] = useState<any>([]);
  const [pedidoData, setPedidoData] = useState<any>([]);
  const [pagePedidoData, setPagePedidoData] = useState<any>([]);
  const [curPage, setCurPage] = useState<any>(0);
  const [totalPage, setTotalPage] = useState<number>(0);
  const [offset, setOffset] = useState<any>(0);

  useEffect(() => {
    const fetchData = async () => {
      await GetAccountInfo(compradorID).then((res: any) => {
        setBuyerData(res);
      });
      await GetBuyerPedidos(compradorID).then((res: any) => {
        setPedidoData(res);
        setPedidoAllData(res);
      });
    };

    fetchData();
  }, []);

  const handleInputChange = (e: any) => {
    const filteredPedidoData = pedidoAllData.filter((item: any) =>
      item.name.includes(e.target.value)
    );
    setBuyerData(filteredPedidoData);

    var page = filteredPedidoData.length % 5 > 0 ? 1 : 0;
    setTotalPage(Math.floor(filteredPedidoData.length / 5) + page);
  };

  const handlePageClick = (e: any) => {
    const selectedPage = e.selected;
    const offset = selectedPage * 5;

    setCurPage(selectedPage);
    setOffset(offset);
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
      <DashboardTitle>{buyerData?.name}</DashboardTitle>
      <SubContainer className="viewSubContainer">
        <DashboardSubTitle>Pedidos</DashboardSubTitle>
        <FormTextField
          id="titleSearch"
          onChangeCapture={handleInputChange}
          placeholder="Buscar Pedido"
        />
        <TableContainer>
          <div className="HeaderSubpart">
            <div className="HeaderPart">
              <div style={{ width: "50%" }}>Pedidos</div>
              <div style={{ width: "50%" }}>Data</div>
            </div>
            <TableContainer>
              {pagePedidoData.map((pedido: any, index: number) => {
                return (
                  <TableRow
                    key={index}
                    style={{
                      background: index % 2 == 0 ? "#ffffff" : "#eeeeee",
                    }}
                  >
                    <div style={{ width: "40%" }}>{pedido.code}</div>
                    <div style={{ width: "30%" }}>
                      {getDate(pedido.resteredDate)}
                    </div>
                  </TableRow>
                );
              })}
            </TableContainer>
          </div>
        </TableContainer>
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
      </SubContainer>
      <BackButtonContainer>
        <Link to="/admin/compradores">
          <BackButton>VOLTAR</BackButton>
        </Link>
      </BackButtonContainer>
    </DashboardWrapper>
  );
}
