import React from 'react';
import {NavLink} from 'react-router-dom';
import s from './Navbar.module.css';

export function Navbar() {
    return (
        <nav className={s.nav}>
            <NavLink exact to='/' className={s.item} activeClassName={s.active}>Main</NavLink>
            <NavLink to='/profile' className={s.item} activeClassName={s.active}>Profile</NavLink>
            <NavLink to='/test' className={s.item} activeClassName={s.active}>Test</NavLink>
            <NavLink to='/login' className={s.item} activeClassName={s.active}>Login</NavLink>
            <NavLink to='/registration' className={s.item} activeClassName={s.active}>Registration</NavLink>
            <NavLink to='/password-recovery' className={s.item} activeClassName={s.active}>Password recovery</NavLink>
            <NavLink to='/enter-password' className={s.item} activeClassName={s.active}>Enter password</NavLink>
        </nav>
    );
}