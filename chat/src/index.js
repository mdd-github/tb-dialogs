import React from 'react';
import ReactDOM from 'react-dom/client';
import {ChatView} from "./ChatView";

import './assets/styles/index.scss';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <ChatView/>
    </React.StrictMode>
);