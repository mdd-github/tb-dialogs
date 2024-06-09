import React from 'react';
import {createBrowserRouter} from "react-router-dom";
import {HomePage} from "../views/HomePage";
import {ErrorPage} from "../views/ErrorPage";


export const router = createBrowserRouter([
    {
        path: "/",
        element: <HomePage />,
        errorElement: <ErrorPage />
    }
])