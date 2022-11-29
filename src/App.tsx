import React from 'react';
import { Routes } from "react-router-dom";
import Header from "./components/header/head";
import {renderPaths} from "./utils/RenderPaths";
import PageRender from "./PageRender";
import Footer from "./components/footer";

function App() {
  return (
      <>
          <Header/>
              <Routes>
                  {renderPaths(["/", "/:page", "/:page/:slug"], <PageRender />)}
              </Routes>
          <Footer/>
      </>
  );
}

export default App;
