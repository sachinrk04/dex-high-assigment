import React from "react";
import "./App.css";
import Headers from "./components/Headers/Headers";
import HomePage from "./containers/HomePage/HomePage";

function App() {
  return (
    <React.Fragment>
      <div>
        <Headers />
        <HomePage />
      </div>
    </React.Fragment>
  );
}

export default App;
