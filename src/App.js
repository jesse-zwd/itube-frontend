import React from "react";
import { useSelector } from "react-redux";
import { ThemeProvider } from "styled-components";
import { ToastContainer } from "react-toastify";
import GlobalStyle from "./styles/GlobalStyle";
import { darkTheme } from "./styles/theme";
import Router from "./Router";
import Auth from "./components/Auth/Auth";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  const { access } = useSelector((state) => state.user.data);
  
  return (
    <ThemeProvider theme={darkTheme}>
      <GlobalStyle />
      <ToastContainer
        autoClose={2500}
        position="top-right"
        closeButton={false}
      />
      {access ? <Router /> : <Auth />}
    </ThemeProvider>
  );
};

export default App;
