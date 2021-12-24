import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import {
  DashboardWrapper,
  DashboardTitle,
  DashboardSubTitle,
  SubContainer,
  TableContainer,
  TableRow,
} from "./../index.style";

import {
  PaymentContainer,
  PaymentItem,
  PaymentTitle,
  PaymentTextField,
  ButtonContainer,
  LoadMoreButton,
} from "./index.style";

import { GetSellers, DeleteUser, GetBuyers } from "./../../../apis";

export default function User() {
  const [sellers, setSellers] = useState<any>([]);
  const [buyers, setBuyers] = useState<any>([]);

  useEffect(() => {
    GetSellers(-1).then((res: any) => {
      setSellers(res);
    });
    GetBuyers(-1).then((res: any) => {
      setBuyers(res);
    });
  }, []);

  const handleDelete = async (id: string, type: Number) => {
    await DeleteUser(id);
    if (type == 0) {
      await GetSellers(-1).then((res: any) => {
        setSellers(res);
      });
    } else {
      await GetBuyers(-1).then((res: any) => {
        setBuyers(res);
      });
    }
  };

  const getDate = (datestring: string) => {
    if (typeof datestring == "undefined") {
      return "00/00/0000";
    }

    let vDate = new Date(datestring);

    let date = vDate.getDate();
    let month = vDate.getMonth(); //Be careful! January is 0 not 1
    let year = vDate.getFullYear();

    return date + "/" + month + "/" + year;
  };
  return (
    <DashboardWrapper>
      <DashboardTitle>Usuários</DashboardTitle>
      <SubContainer>
        <DashboardSubTitle>Comissões</DashboardSubTitle>
        <PaymentContainer>
          <PaymentItem>
            <PaymentTitle>juno</PaymentTitle>
            <PaymentTextField></PaymentTextField>
          </PaymentItem>
          <PaymentItem>
            <PaymentTitle>yapay</PaymentTitle>
            <PaymentTextField></PaymentTextField>
          </PaymentItem>
          <PaymentItem>
            <PaymentTitle>pagar.me</PaymentTitle>
            <PaymentTextField></PaymentTextField>
          </PaymentItem>
        </PaymentContainer>
      </SubContainer>

      <SubContainer>
        <DashboardSubTitle>Vendedores</DashboardSubTitle>
        <TableContainer>
          <div className="HeaderSubpart">
            <div className="HeaderPart">
              <div style={{ width: "40%" }}>Nome</div>
              <div style={{ width: "30%" }}>Data de Registro</div>
              <div style={{ width: "15%" }}></div>
              <div style={{ width: "15%" }}></div>
            </div>
            <TableContainer>
              {sellers.map((seller: any, index: number) => {
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
                      to={`/admin/vendedores/${seller._id}`}
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
                      style={{
                        width: "15%",
                        cursor: "pointer",
                        color: "red",
                      }}
                      onClick={() => handleDelete(seller._id, 0)}
                    >
                      Excluir
                    </div>
                  </TableRow>
                );
              })}
            </TableContainer>

            <ButtonContainer>
              <Link to="/admin/vendedores" style={{ textDecoration: "none" }}>
                <LoadMoreButton>ver todos</LoadMoreButton>
              </Link>
            </ButtonContainer>
          </div>
        </TableContainer>
      </SubContainer>

      <SubContainer>
        <DashboardSubTitle>Compradores</DashboardSubTitle>
        <TableContainer>
          <div className="HeaderSubpart">
            <div className="HeaderPart">
              <div style={{ width: "40%" }}>Nome</div>
              <div style={{ width: "30%" }}>Data de Registro</div>
              <div style={{ width: "15%" }}></div>
              <div style={{ width: "15%" }}></div>
            </div>
            <TableContainer>
              {buyers.map((buyer: any, index: number) => {
                return (
                  <TableRow
                    key={index}
                    style={{
                      background: index % 2 == 0 ? "#ffffff" : "#eeeeee",
                    }}
                  >
                    <div style={{ width: "40%" }}>{buyer.name}</div>
                    <div style={{ width: "30%" }}>
                      {getDate(buyer.resteredDate)}
                    </div>
                    <Link
                      to={`/admin/compradores/${buyer._id}`}
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
                      style={{
                        width: "15%",
                        cursor: "pointer",
                        color: "red",
                      }}
                      onClick={() => handleDelete(buyer._id, 1)}
                    >
                      Excluir
                    </div>
                  </TableRow>
                );
              })}
            </TableContainer>

            <ButtonContainer>
              <Link to="/admin/compradores" style={{ textDecoration: "none" }}>
                <LoadMoreButton>ver todos</LoadMoreButton>
              </Link>
            </ButtonContainer>
          </div>
        </TableContainer>
      </SubContainer>
    </DashboardWrapper>
  );
}
