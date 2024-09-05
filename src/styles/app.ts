import styled from "@emotion/styled";
import { FaSpinner } from "react-icons/fa";
import { layout, space, flexbox } from "styled-system";

const Header = styled.div``;

const MainContainer = styled.div`
  font-family: 'Roboto', sans-serif;
  background-image: inherit;
  opacity: 0.9;

  display: flex;
  flex-direction: column;
  height: 100vh;
`;


const OutletContainer = styled.div<{marginTop: string}>`
  width: 90vw;
  margin: 0 auto;
  background-color: inherit;
  height: calc(90vh - ${props => props.marginTop});
  overflow-y: auto;
  scrollbar-width: thin;
  scrollbar-color: #333 #f2f2f2;

  box-sizing: border-box;
  ${props => `margin-top: ${props.marginTop};`}
  margin-bottom: 10vh;

  @media (max-width: 768px) {
    margin-top: ${props => props.marginTop === '30vh' ? '35vh' : '20vh'};
    margin-bottom: ${props => props.marginTop === '30vh' ? '8vh' : '10vh'};
  }
`;

const Footer = styled.div`
  background-color: inherit;
  height: 8.5vh;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 1rem;
  font-weight: 500;
  opacity: 0.7;

  border-top: 1px solid #45474B;
  width: 90vw;
  margin: 0 auto;

  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 100;

  @media (max-width: 768px) {
    height: 8vh;
  }
`

const Code = styled.code`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: nowrap;
  gap: 0.5rem;
`;

const SpinnerContainer = styled.div`
  ${layout}
  ${flexbox}
  ${space}

  display: flex;
  justify-content: center;
  align-items: center;
  height: 80vh; 
`;

const SpinnerIcon = styled(FaSpinner)`
  width: 50px;
  height: 50px;
  animation: spin 2s linear infinite;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

export { MainContainer, OutletContainer, Footer, Code, Header, SpinnerContainer, SpinnerIcon }; 