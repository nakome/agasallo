import * as React from "react";
import * as ReactDOM from "react-dom/client";

import "normalize.css";
import "./index.css";

import ErrorBoundary from "./components/ErrorBoundary";
import App from "./App";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </React.StrictMode>
);