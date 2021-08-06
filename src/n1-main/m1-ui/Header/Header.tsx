import React from 'react';
import s from './Header.module.css';
import {Navbar} from "./Navbar/Navbar";
import ButtonAppBar from "./AppBar";
import {useSelector} from "react-redux";
import {AppRootStateType} from "../../m2-bll/store/redux-store";

export const Header = () => {
    const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.auth.isLoggedIn)
    return (
        <div className={s.header}>

            {isLoggedIn? <ButtonAppBar/> : <Navbar/>}
        </div>
    );
}
