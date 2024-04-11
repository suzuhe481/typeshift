import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import GameOptionsProvider from "./Context/GameOptionsContext.jsx";
import StylesProvider from "./Context/StylesContext.jsx";

import "./reset.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <GameOptionsProvider>
      <StylesProvider>
        <App />
      </StylesProvider>
    </GameOptionsProvider>
  </React.StrictMode>
);
