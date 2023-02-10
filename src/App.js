import React from "react";
import { Dashboard, Error } from "./pages";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Routes,
} from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
        <Route index element={<Dashboard />} />

        {/* <Route path="/login" element={<Login />} /> */}

        <Route path="*" element={<Error />} />
      </Routes>
    </Router>
  );
}

export default App;
