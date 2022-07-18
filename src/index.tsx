import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/index.scss';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from "react-router-dom";
import {AuthContextProvider} from "./context/AuthContext";
import {SearchContextProvider} from "./context/SearchConext";

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
    <AuthContextProvider>
        <SearchContextProvider>
            <BrowserRouter>
                <App/>
            </BrowserRouter>
        </SearchContextProvider>
    </AuthContextProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
