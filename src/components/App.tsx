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
  height: 10vh;
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
      </Footer>
    </Container>
  )
}

export default App;