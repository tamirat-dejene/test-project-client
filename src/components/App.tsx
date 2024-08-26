import NavBar from "./NavBar";
import { Outlet } from "react-router-dom"
import { MainContainer, Footer, OutletContainer } from "../styles/app";

const App = () => {
  return (
    <MainContainer>
      <div className="header">
        <NavBar />
      </div>
      <OutletContainer>
        <Outlet />
      </OutletContainer>
      <Footer>
        <p>© 2024 Music. All rights reserved.</p>
      </Footer>
    </MainContainer>
  )
}

export default App;