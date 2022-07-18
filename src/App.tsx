import React from 'react';
import { Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import Header from "./components/header/head";
import Hotels from "./pages/hotels";
import Hotel from "./pages/hotel";
import Login from "./pages/login";

function App() {
  return (
      <>
          <Header/>
          <Routes>
              <Route path="/" element={<Home/>}/>
              <Route path="/hotels" element={<Hotels />} />
              <Route path="/hotels/:id" element={<Hotel/>}/>
              <Route path="/login" element={<Login/>}/>
          </Routes>
          {/*<Footer/>*/}
      </>
  );
}

export default App;
