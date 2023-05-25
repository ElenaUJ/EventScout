import React from 'react';
import { render } from 'react-dom';
import './index.css';
import { App } from './App';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import reportWebVitals from './reportWebVitals';
import * as atatus from 'atatus-spa';

const root = document.getElementById('root');
render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  root
);

serviceWorkerRegistration.register();

reportWebVitals();

atatus.config('2954af4946e143aa950748bb3c11e4c4').install();
