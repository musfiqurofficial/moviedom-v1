import "core-js/full";
import React from "react";
import ReactDOM from "react-dom/client";
import { ErrorBoundary } from "react-error-boundary";
import { Provider } from "react-redux";
import { HashRouter } from "react-router-dom";
import App from "./App";
import { _HIT_ORIGIN } from "./constant";
import { store } from "./redux/store";
import reportWebVitals from "./reportWebVitals";
import { logError } from "./test";

function Fallback({ error, resetErrorBoundary }) {
  // Call resetErrorBoundary() to reset the error boundary and retry the render.
  return (
    <div
      role="alert"
      style={{
        height: "100vh",
        overflowY: "auto",
        backgroundColor: "#000011",
        color: "#aabbff",
      }}
      className="text-center"
    >
      <div className="container py-5">
        <img
          src={`${_HIT_ORIGIN}/failed.png`}
          alt="ERROR"
          style={{
            maxWidth: 360,
            width: "100%",
            padding: "1rem",
            margin: "auto",
          }}
        />
        <h3 className="fw-bold mb-4">Something went wrong !</h3>
        <div
          className="p-2 rounded-2 text-start mb-4 mx-auto"
          style={{ maxWidth: 660, border: "2px dashed #444" }}
        >
          <pre className="mb-1">
            <h6 className="text-warning">{error?.name}</h6>
          </pre>
          <div
            className="p-3 rounded-2 text-start mx-auto"
            style={{
              background: "#ffffff10",
              border: "2px dashed #444444",
              maxWidth: 680,
            }}
          >
            {error?.message}
          </div>
        </div>
        <button
          type="button"
          className="btn btn-dark d-flex justify-content-center align-items-center gap-2 py-2 px-3 mx-auto"
          onClick={() => {
            resetErrorBoundary();
            try {
              window.location.pathname = "/";
            } catch (error) {
              console.log(error?.message);
            }
          }}
        >
          <i className="fa-solid fa-rotate-right"></i>
          RETRY
        </button>
      </div>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <ErrorBoundary
    FallbackComponent={Fallback}
    onError={logError}
    onReset={(details) => {
      // Reset the state of your app so the error doesn't happen again
    }}
  >
    <HashRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </HashRouter>
  </ErrorBoundary>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
