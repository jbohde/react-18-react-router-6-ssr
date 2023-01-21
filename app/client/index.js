import React, { StrictMode } from "react";
import ReactDOM from "react-dom/client";

import App from "../shared/App";

const root = ReactDOM.hydrateRoot(document.getElementById('root'));
root.render(
  <StrictMode>
    <App />
  </StrictMode>
);
