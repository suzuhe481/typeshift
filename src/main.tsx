import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.js";
import GameOptionsProvider from "./Context/GameOptionsContext.js";
import StylesProvider from "./Context/StylesContext.js";

import "./reset.css";

ReactDOM.createRoot(document.getElementById("root") as Element).render(
  <React.StrictMode>
    <GameOptionsProvider>
      <StylesProvider>
        <App />
      </StylesProvider>
    </GameOptionsProvider>
  </React.StrictMode>
);
