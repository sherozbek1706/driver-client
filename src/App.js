import Cookies from "js-cookie";
import "./App.css";
import { Router } from "./shared";
import React, { useEffect } from "react";
import { api } from "./utils";
import io from "socket.io-client";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Bar } from "./layouts";

export const socket = io.connect(api);

// export const Context = React.createContext();
function App() {
  // useEffect(() => {
  //   Cookies.set("language", "kiril");
  // }, []);
  // const context_data = {
  //   lang: Cookies.get("language"),
  // };

  return (
    // <Context.Provider value={context_data}>
    <div className="App">
      <Router />
      <Bar />
      <ToastContainer
        position="top-right"
        autoClose={1200}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </div>
    // </Context.Provider>
  );
}

export default App;
