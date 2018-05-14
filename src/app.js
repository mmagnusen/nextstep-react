import './styles/styles.scss';
import React from 'react';
import { render } from 'react-dom';
import ReactDOM from 'react-dom';
import AppRouter from './components/routers/AppRouter.js';


ReactDOM.render(<AppRouter/>, document.getElementById("app"));