import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import store from "./m2-bll/b0-store/redux-store";
import {Provider} from "react-redux";
import {App} from "./m1-ui/n1-app/App";
import {HashRouter} from "react-router-dom";

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <HashRouter>
                <App/>
            </HashRouter>
        </Provider>
    </React.StrictMode>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
