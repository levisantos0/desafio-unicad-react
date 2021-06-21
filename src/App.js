import React from "react";
import Routes from "./routes";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <div className="App">
      {/* <header className="App-header">
        <h1>Aprendendo React com MongoDB</h1>
      </header> */}
      <ToastContainer />
      <Routes />
    </div>
  );
}

export default App;
