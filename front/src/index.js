import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { store } from "./reduxToolkit/Store";
import { Provider } from "react-redux";
import "bootstrap/dist/css/bootstrap.min.css";
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";
import "@react-pdf-viewer/toolbar/lib/styles/index.css";
// import { registerLicense } from '@syncfusion/ej2-base';
import { BrowserRouter } from "react-router-dom";

// registerLicense('ORg4AjUWIQA/Gnt2VVhiQlFaclxJVHxKfkx0RWFbb1t6cFJMZVVBNQtUQF1hS35bdURjX3xfcnJWQmNa');

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
