import React from 'react';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import DetailsCas from "./components/detailsCas/DetailsCas";
import ReactDOM from 'react-dom';
import {UIRouter, pushStateLocationPlugin} from "@uirouter/react";
import CasTable from "./components/table/CasTable";

let defaultState = {
    name: 'default',
    url: '/',
    component: CasTable
};
let detailsCasState = {
    name: 'detailsCas',
    url: '/detailsCas/:id_cas',
    component: DetailsCas
};

ReactDOM.render(
    <UIRouter
        plugins={[pushStateLocationPlugin]}
        states={[detailsCasState, defaultState]}
    >
        <App/>
    </UIRouter>

    , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
