import styled from "@emotion/styled";

const MainContainer = styled.div`
  font-family: 'Roboto', sans-serif;
  background-image: inherit;
  opacity: 0.9;

  display: flex;
  flex-direction: column;
  height: 100vh;
`;


const OutletContainer = styled.div`
  width: 90vw;
  margin: 0 auto;
  background-color: inherit;
  height: 60vh;
  overflow-y: auto;
  scrollbar-width: thin;
  scrollbar-color: #333 #f2f2f2;

  box-sizing: border-box;
  margin-top: 30vh;
  margin-bottom: 10vh;

  @media (max-width: 768px) {
    margin-top: 35vh;
    margin-bottom: 9.5vh;
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

export { MainContainer, OutletContainer, Footer }; 