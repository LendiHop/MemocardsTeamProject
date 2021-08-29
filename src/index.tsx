import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import store from "./m2-bll/b0-store/redux-store";
import {Provider} from "react-redux";
import {App} from "./m1-ui/n1-app/App";
import {HashRouter} from "react-router-dom";
import {createTheme, MuiThemeProvider} from "@material-ui/core";

const theme = createTheme({
    palette: {
        primary: {
            main: '#24272a',
            dark: '#191b1d',
            light: '#4f5254',
        },
        secondary: {
            main: '#ffc400',
            dark: '#b28900',
            light: '#ffcf33',
        }
    }
})

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <HashRouter>
                <MuiThemeProvider theme={theme}>
                    <App/>
                </MuiThemeProvider>
            </HashRouter>
        </Provider>
    </React.StrictMode>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
