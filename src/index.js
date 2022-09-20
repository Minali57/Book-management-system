import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import Context from "./context/Context";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter } from "react-router-dom";
ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Context>
        <App />
      </Context>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
