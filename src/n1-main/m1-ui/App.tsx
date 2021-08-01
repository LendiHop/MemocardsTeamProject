import React from 'react';
import './App.css';
import {Header} from "./Header/Header";
import {Routes} from "./Routes/Routes";

export const App = () => {
    return (

        <div className="App">
            <Header/>
            <Routes/>
        </div>
    );
}
