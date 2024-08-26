import NavBar from "./NavBar";
import { Outlet } from "react-router-dom"
import { MainContainer, Footer, OutletContainer } from "../styles/app";
import ErrorPopup from "./PopUpError";
import { FaCoffee } from "react-icons/fa";

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
        <code style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexWrap: 'nowrap',
          gap: '0.5rem',
        }}>
          © 2024 Music.{'   '}tamiu-dejene <FaCoffee />
        </code>
      </Footer>
      <ErrorPopup duration={3000} />
    </MainContainer>
  )
}

export default App;
