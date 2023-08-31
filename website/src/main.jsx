import * as React from "react";
import * as ReactDOM from "react-dom/client";

import "normalize.css";
import "./index.css";

import { Loader } from "./components/Loader";

// Error
const ErrorBoundary = React.lazy(() => import("./components/ErrorBoundary"));
const App = React.lazy(() => import("./App"))

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <React.Suspense fallback={<Loader/>}>
      <ErrorBoundary>
        <App />
      </ErrorBoundary>
    </React.Suspense>
  </React.StrictMode>
);