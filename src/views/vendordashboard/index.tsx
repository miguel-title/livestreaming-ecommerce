import React, { useState, useEffect } from "react";
import {
  VendorDashboardWrapper,
  VendorTableContainer,
  PedidoTitle,
  PedidoInfoTable,
  PedidoButtonContainer,
  VendorButton,
  VendorLiveButtonContainer,
  LiveButtonContainer,
} from "./index.style";

export default function VendorDashboard() {
  const [pedidoData, setPedidoData] = useState<any>([]);

  useEffect(() => {
    setPedidoData([]);
  }, []);

  return (
    <VendorDashboardWrapper>
      <VendorTableContainer>
        <PedidoTitle>Pedido</PedidoTitle>
        <PedidoInfoTable>
          <div className="HeaderSubpart">
            <div className="HeaderPart">
              <div style={{ width: "20%" }}>Nº</div>
              <div style={{ width: "60%" }}>Data</div>
              <div style={{ width: "20%" }}>Status</div>
            </div>
            <div className="ContentPart">
              {[...pedidoData].map((eachData, index) => (
                <div key={index} className="row">
                  <div style={{ width: "20%" }}>eachData.number</div>
                  <div style={{ width: "60%" }}>eachData.data</div>
                  <div style={{ width: "20%" }}>eachData.status</div>
                </div>
              ))}
            </div>
          </div>
        </PedidoInfoTable>
        <PedidoButtonContainer>
          <VendorButton>VER MAIS</VendorButton>
        </PedidoButtonContainer>
      </VendorTableContainer>

      <VendorLiveButtonContainer>
        <PedidoTitle>Lives</PedidoTitle>
        <LiveButtonContainer>
          <VendorButton>AGENDAR LIVE</VendorButton>
          <VendorButton>INICIAR LIVE</VendorButton>
        </LiveButtonContainer>
      </VendorLiveButtonContainer>
    </VendorDashboardWrapper>
  );
}
