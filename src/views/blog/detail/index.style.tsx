import styled from "styled-components";

export const ImageContainer = styled.img`
  margin-top: 100px;
  width: 100%;
  margin-bottom: 50px;
`;

export const DescriptionContainer = styled.div`
  margin-top: 50px;
  margin-bottom: 50px;

  color: #555555;
`;

export const BackButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 50px;
`;

export const BackButton = styled.div`
  border: 2px solid transparent;
  background-color: #e8b89b;
  border-radius: 50px;
  color: #ffffff;
  text-transform: uppercase;

  padding: 0.5rem 3rem;

  margin-top: 1.5rem;
  display: inline-block;
  text-align: center;
  font-weight: 400;
  font-size: calc(1.275rem + 0.3vw);

  cursor: pointer;
`;
