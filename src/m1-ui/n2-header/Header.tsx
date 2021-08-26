import React, {useCallback} from 'react';
import h from './Header.module.css';
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../m2-bll/b0-store/redux-store";
import {logoutTC} from "../../m2-bll/b1-reducers/auth-reducer";
import {Button} from "@material-ui/core";
import {RequestStatusType} from "../../m2-bll/b1-reducers/app-reduser";
import { NavLink } from 'react-router-dom';
import {PATH} from "../n3-routes/Routes";

export const Header = () => {
    const dispatch = useDispatch();
    const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.auth.isLoggedIn)
    const status = useSelector<AppRootStateType, RequestStatusType>(state => state.app.status);
    const logoutHandler = useCallback(() => {
        dispatch(logoutTC())
    }, [dispatch])

    return (
        <div className={h.header}>
            <div>
                {!isLoggedIn &&
                <NavLink
                    className={h.link}
                    activeClassName={h.activeLink}
                    to={PATH.REGISTRATION}>Sign up
                </NavLink>}

                {!isLoggedIn &&
                <NavLink
                    className={h.link}
                    activeClassName={h.activeLink}
                    to={PATH.LOGIN}>Sign in
                </NavLink>}

                {isLoggedIn &&
                <NavLink
                    className={h.link}
                    activeClassName={h.activeLink}
                    to={PATH.PROFILE}>Profile
                </NavLink>}

                {isLoggedIn &&
                <NavLink
                    className={h.link}
                    activeClassName={h.activeLink}
                    to={PATH.PACKS_LIST}>Packs List
                </NavLink>}

            </div>

            <div>
                {isLoggedIn &&
                <NavLink to={PATH.LOGIN}>
                    <Button
                        variant="contained"
                        color="secondary"
                        disabled={status === "loading"}
                        onClick={logoutHandler}>LOG OUT
                    </Button>
                </NavLink>
                }
            </div>
        </div>
    );
}
