import React from "react";
import ReactDOM from "react-dom";
import "../normalize.min.css";
import "../styles.css";

import MainPage from "./MainPage";

const rootElement = document.getElementById("root");
ReactDOM.render(
  <>
    <MainPage />
  </>,
  rootElement
);
