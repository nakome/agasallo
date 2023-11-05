import * as React from "react";
import * as ReactDOM from "react-dom/client";

import "./index.css";

import { Loader } from "./ui/Loader";

// Error
const ErrorBoundary = React.lazy(() => import("./ui/ErrorBoundary"));
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