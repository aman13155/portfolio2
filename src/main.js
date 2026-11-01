import './styles.css';
import React from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.js';
import {startEngine} from './engine.js';

createRoot(document.getElementById('root')).render(React.createElement(App));
startEngine();
