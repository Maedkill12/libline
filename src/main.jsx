import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import AccessTokenProvider from "./context/AccessTokenProvider";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AccessTokenProvider>
      <App />
    </AccessTokenProvider>
  </React.StrictMode>
);
