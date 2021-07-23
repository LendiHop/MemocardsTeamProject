import React from 'react';
import s from './Header.module.css';
import {Navbar} from "./Navbar/Navbar";

export const Header = () => {
    return (
        <header className={s.header}>
            <div className={s.container}>
                <Navbar/>
            </div>
        </header>
    );
}
