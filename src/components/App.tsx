import NavBar from "./NavBar";
import { Outlet } from "react-router-dom"
import { MainContainer, Footer, OutletContainer } from "../styles/app";
import ErrorPopup from "./PopUpError";

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
        <p>© 2024 Music. tamiu-dejen</p>
      </Footer>
      <ErrorPopup duration={3000} />
    </MainContainer>
  )
}

export default App;
