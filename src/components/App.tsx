import { Outlet } from "react-router-dom"
import { Container, Footer } from "../styles/app";
import NavBar from "./NavBar";

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