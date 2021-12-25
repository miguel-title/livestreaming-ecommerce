import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { Container } from "../../../components/pagedefault";

import {
  EditPedidoWrapper,
  PedidoTitle,
  PedidoInfoTable,
  ItemsTitle,
  ItemInfoTable,
  ContactInfo,
  SubPart,
  ContactLabel,
  ContactTextField,
  ContactVendorButton,
  ContactButtonPart,
  SubItemPart,
  SubItemPartContainer,
} from "./index.style";

import CommonLayout from "../../../layout/common";

export default function EditPedido() {
  const [pedidoData, setPedidoData] = useState<any>([]);
  const [itemData, setItemData] = useState<any>([]);

  useEffect(() => {
    setPedidoData([]);
    setItemData([]);
  }, []);

  return (
    <CommonLayout>
      <EditPedidoWrapper>
        <Container>
          <PedidoTitle>Pedido</PedidoTitle>
          <PedidoInfoTable>
            <div className="HeaderPart">
              <div style={{ width: "30%" }}>Nº</div>
              <div style={{ width: "40%" }}>Data</div>
              <div style={{ width: "30%" }}>Status</div>
            </div>
            <div className="ContentPart">
              {[...pedidoData].map((eachData, index) => (
                <div key={index} className="row">
                  <div style={{ width: "30%" }}>eachData.number</div>
                  <div style={{ width: "40%" }}>eachData.data</div>
                  <div style={{ width: "30%" }}>eachData.status</div>
                </div>
              ))}
            </div>
          </PedidoInfoTable>
          <PedidoTitle>Itens</PedidoTitle>
          <ItemInfoTable>
            <div className="HeaderPart">
              <div style={{ width: "30%" }}>Qtd</div>
              <div style={{ width: "40%" }}>Item</div>
              <div style={{ width: "30%" }}></div>
            </div>
            <div className="ContentPart">
              {[...itemData].map((eachData, index) => (
                <div key={index} className="row">
                  <div style={{ width: "30%" }}>eachData.number</div>
                  <div style={{ width: "40%" }}>eachData.data</div>
                  <div style={{ width: "30%" }}>eachData.status</div>
                </div>
              ))}
            </div>
          </ItemInfoTable>
          <ContactInfo>
            <SubPart>
              <ContactLabel>Endereço*</ContactLabel>
              <ContactTextField id="address"></ContactTextField>
            </SubPart>

            <SubItemPartContainer>
              <SubItemPart>
                <ContactLabel>Número*</ContactLabel>
                <ContactTextField id="number"></ContactTextField>
              </SubItemPart>

              <SubItemPart>
                <ContactLabel>Complemento</ContactLabel>
                <ContactTextField id="complement"></ContactTextField>
              </SubItemPart>
            </SubItemPartContainer>

            <SubPart>
              <ContactLabel>Bairro*</ContactLabel>
              <ContactTextField id="complement"></ContactTextField>
            </SubPart>

            <SubItemPartContainer>
              <SubItemPart>
                <ContactLabel>Cidade*</ContactLabel>
                <ContactTextField id="complement"></ContactTextField>
              </SubItemPart>

              <SubItemPart>
                <ContactLabel>Estado*</ContactLabel>
                <ContactTextField id="complement"></ContactTextField>
              </SubItemPart>
            </SubItemPartContainer>
            <ContactButtonPart>
              <Link to="/falar-com-vendedor" style={{ textDecoration: "none" }}>
                <ContactVendorButton>
                  ENTRAR EM CONTATO COM A LOJA
                </ContactVendorButton>
              </Link>
            </ContactButtonPart>
          </ContactInfo>
        </Container>
      </EditPedidoWrapper>
    </CommonLayout>
  );
}
