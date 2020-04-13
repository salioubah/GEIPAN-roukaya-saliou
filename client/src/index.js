import React from 'react';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import DetailsCas from "./components/detailsCas/DetailsCas";
import ReactDOM from 'react-dom';
import { UIRouter, pushStateLocationPlugin } from "@uirouter/react";
import CasTable from "./components/table/CasTable";
import Statistique from "./components/stats/Statistique";

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

const homeState = {
    name: "home",
    url: "/home",
    component: CasTable
};

const statsState = {
    name: "stats",
    url: "/stats",
    component: Statistique
};

ReactDOM.render(
    <UIRouter
        plugins={[pushStateLocationPlugin]}
        states={[detailsCasState, defaultState, homeState, statsState]}
    >
        <App />
    </UIRouter>

    , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
