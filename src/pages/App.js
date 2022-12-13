import React from "react";
import "../styles/App.css";
import { SharedContextProvider } from "../context/SharedContext";
import Home from "./Home";

function App() {
  return (
    <SharedContextProvider>
      <Home></Home>
    </SharedContextProvider>
  );
}

export default App;
