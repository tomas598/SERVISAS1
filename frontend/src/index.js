import React from "react";
import ReactDOM from "react-dom/client";
import { MyProvider } from "./context/Context";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <MyProvider>
    <App />
  </MyProvider>
);
