import React, { useState, useEffect } from "react";

import { Link } from "react-router-dom";

import {
  Wrapper,
  Container,
  Title,
  CustomButton,
} from "../../../components/pagedefault";

import {
  LivesContainer,
  ButtonContainer,
  LivesTableLabel,
  LivesTableContainer,
  LivesTable,
} from "./index.style";

export default function Lives() {
  const [scheduleData, setScheduleData] = useState<any>([]);

  useEffect(() => {
    setScheduleData([]);
  }, []);

  return (
    <LivesContainer>
      <Title>Lives</Title>
      <ButtonContainer>
        <Link className="ButtonLink" to="/liveschedule">
          <CustomButton>AGENDAR LIVE</CustomButton>
        </Link>
        <Link to="/startlive" className="ButtonLink">
          <CustomButton>INICIAR LIVE</CustomButton>
        </Link>
      </ButtonContainer>
      <LivesTableLabel>Lives Agendadas</LivesTableLabel>
      <LivesTableContainer>
        <LivesTable>
          <div className="HeaderSubpart">
            <div className="HeaderPart">
              <div style={{ width: "35%" }}>Horário</div>
              <div style={{ width: "35%" }}>Data</div>
              <div style={{ width: "30%" }}></div>
            </div>
            <div className="ContentPart">
              {[...scheduleData].map((eachData, index) => (
                <div key={index} className="row">
                  <div></div>
                  <div></div>
                  <div></div>
                </div>
              ))}
            </div>
          </div>
        </LivesTable>
      </LivesTableContainer>
      <LivesTableLabel>Lives Gravadas</LivesTableLabel>
      <LivesTableContainer>
        <LivesTable>
          <div className="HeaderSubpart">
            <div className="HeaderPart">
              <div style={{ width: "35%" }}>Horário</div>
              <div style={{ width: "35%" }}>Data</div>
              <div style={{ width: "30%" }}></div>
            </div>
            <div className="ContentPart">
              {[...scheduleData].map((eachData, index) => (
                <div key={index} className="row">
                  <div></div>
                  <div></div>
                  <div></div>
                </div>
              ))}
            </div>
          </div>
        </LivesTable>
      </LivesTableContainer>
    </LivesContainer>
  );
}
