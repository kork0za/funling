import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { MotionProvider } from "./components/motion/MotionProvider";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <MotionProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </MotionProvider>
  </React.StrictMode>
);
