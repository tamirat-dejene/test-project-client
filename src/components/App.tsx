import { useEffect } from "react";
import { Outlet } from "react-router-dom"
import { FaCoffee } from "react-icons/fa";

import Auth from "./Auth";
import NavBar from "./NavBar";
import PopupMessage from "./Popup";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { refreshSessionRequested } from "../features/user-data-slice";
import { MainContainer, Footer, OutletContainer, Code, Header, SpinnerContainer, SpinnerIcon } from "../styles/app";

const App = () => {
  const dispatch = useAppDispatch();
  const { accessToken, refreshSessionIsPending } = useAppSelector((state) => state.userData);

  useEffect(() => {
    dispatch(refreshSessionRequested());
  }, [dispatch]);

  return (
    <MainContainer>
      <Header >
        <NavBar height={accessToken ? '30vh' : '15vh'} />
      </Header>
      <OutletContainer marginTop={accessToken ? '30vh' : '15vh'}>
        {refreshSessionIsPending ? (<SpinnerContainer><SpinnerIcon /></SpinnerContainer>) : (!accessToken ? <Auth /> : <Outlet />)}
      </OutletContainer>
      <Footer>
        <Code>© 2024 Music.{'  '}tamiu-dejene <FaCoffee color="goldenrod" /></Code>
      </Footer>
      <PopupMessage duration={3000} position="bottom-left" />
    </MainContainer>
  )
}

export default App;
