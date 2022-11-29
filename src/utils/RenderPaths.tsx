import React from "react";
import {Route} from "react-router-dom";

export const renderPaths = (
    paths: string[], Element: any) =>
    paths.map((path) => <Route key={path} path={path} element={Element}/>
    );