import React, { useState, useEffect } from "react";

import { Link } from "react-router-dom";

import { Title } from "../../../components/pagedefault";

import {
  ProductCatalogWrapper,
  CRUDButtonContainer,
  CRUDButton,
  ProductCatalogTextField,
  ProductCatalogTable,
  Container,
} from "./index.style";

export default function ProductCatalog() {
  const [catalogData, setCatalogData] = useState<any>([]);
  useEffect(() => {
    setCatalogData([]);
  }, []);

  return (
    <ProductCatalogWrapper>
      <Container>
        <Title>Catálogo</Title>
        <CRUDButtonContainer>
          <Link to="/addproduct">
            <CRUDButton color="#009933" width="100%">
              ADICIONAR ITEM
            </CRUDButton>
          </Link>
          <Link to="#">
            <CRUDButton color="#ff0000" width="100%">
              EXCLUIR TUDO
            </CRUDButton>
          </Link>
        </CRUDButtonContainer>
        <ProductCatalogTextField placeholder="Buscar Item" />
        <ProductCatalogTable>
          <div className="HeaderSubpart">
            <div className="HeaderPart">
              <div style={{ width: "30%" }}>Item</div>
              <div style={{ width: "30%" }}>Qtd Estoque</div>
              <div style={{ width: "20%" }}></div>
              <div style={{ width: "20%" }}></div>
            </div>
            <div className="ContentPart">
              {[...catalogData].map((eachData, index) => (
                <div key={index} className="row">
                  <div>eachData.number</div>
                  <div>eachData.data</div>
                  <div></div>
                  <div>eachData.status</div>
                </div>
              ))}
            </div>
          </div>
        </ProductCatalogTable>
      </Container>
    </ProductCatalogWrapper>
  );
}
