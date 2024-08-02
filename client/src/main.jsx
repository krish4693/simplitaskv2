// src/main.jsx
import React from "react";
import { createRoot } from "react-dom/client";
import ReactDOM from "react-dom/client";

import { Provider } from "react-redux";
import {store} from "./redux/store";
import {persistor} from "./redux/store";
import { PersistGate } from "redux-persist/integration/react";
import App from "./App";
import { RouterProvider } from "react-router-dom";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <PersistGate persistor={persistor}>
    <Provider store={store}>
      {/* <Navbar /> */}
      <App />
    </Provider>
  </PersistGate>
);
