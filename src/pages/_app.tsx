// _app.tsx

import React from "react";
import ReactDOM from "react-dom";
import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import { setupStore } from "@/store/store";
import { Provider } from "react-redux";
import MainPage from "./main";
import "@/assets/styles/globals.scss";

const store = setupStore();

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />} />
      </Routes>
    </Router>
  </Provider>,
  document.getElementById("root")
);
