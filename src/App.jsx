import React from "react";
import ReactDOM from "react-dom";

import Header from "./Header.jsx";
import MainPage from "./Pages/MainPage.js";
const App = () => {
  return (
    <div className="container">
      <Header />
      <div className="container-view">
        <MainPage />
      </div>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("app"));

export default App;
