import { Outlet } from "react-router-dom"
import styled from "@emotion/styled";
import NavBar from "./NavBar";

const Container = styled.div`
  font-family: 'Roboto', sans-serif;
  background-image: linear-gradient(180deg, #2B2B2B, #9A9483);
  opacity: 0.9;
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
  margin-top: 1.5vh;

`
const App = () => {
  return (
    <Container>
      <div className="header">
        <NavBar />
      </div>
      <div className="detail">
        <Outlet />
      </div>
      <Footer>
        <p>© 2024 Music. All rights reserved.</p>
      </Footer>
    </Container>
  )
}

export default App;