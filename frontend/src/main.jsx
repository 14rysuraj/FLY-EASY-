import React, { createContext, useState } from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import TimeAgo from 'javascript-time-ago'

import en from 'javascript-time-ago/locale/en.json'
import ru from 'javascript-time-ago/locale/ru.json'
import PopupLogin from "./Components/PopupLogin.jsx";

TimeAgo.addDefaultLocale(en)
TimeAgo.addLocale(ru)

export const context = createContext({ isAuthenticated: false });
export const showLogin =createContext({showLogin: false});

const AppWrapper = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showPopupLogin, setShowPopupLogin] = useState(false);

  return (

    <showLogin.Provider value={
      {
        showPopupLogin,
        setShowPopupLogin,
      }
    }>

 

    <context.Provider
      value={{
        isAuthenticated,
        setIsAuthenticated,
      }}
    >
      <App />
      <PopupLogin />
      </context.Provider>
      </showLogin.Provider>
  );
};

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AppWrapper />
  </React.StrictMode>
);
