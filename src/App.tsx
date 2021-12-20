import React from "react";
import "./App.css";
import { BrowserRouter as Router } from "react-router-dom";
import { createBrowserHistory } from "history";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

import { AuthProvider } from "./contexts/JWTAuthContext";

import routes, { renderRoutes } from "./routes";
const history = createBrowserHistory();

function App() {
  return (
    <>
      <Router>
        <AuthProvider>{renderRoutes(routes)}</AuthProvider>
      </Router>
      <ToastContainer />
    </>
  );
}

export default App;
