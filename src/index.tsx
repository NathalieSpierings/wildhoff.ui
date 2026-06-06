import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

import "./assets/scss/main.scss";

export * from './lib/helpers/helpers';
export * from './lib/helpers/functions';
export * from './lib/utils/definitions';

const root = createRoot(document.getElementById('react-root') as HTMLElement);
root.render( <React.StrictMode><App /></React.StrictMode>)