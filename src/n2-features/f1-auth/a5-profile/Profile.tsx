import React, { useCallback } from 'react';
import './Profile.module.css';
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../../n1-main/m2-bll/store/redux-store";
import {ProfileDataType} from "../a1-loginization/api/api";
import { Redirect } from 'react-router-dom';
import {Button} from "@material-ui/core";
import { logout } from '../a1-loginization/reducer/reducer';
import {UserType} from "../../../n1-main/m3-dal/auth-api/auth-api";

export const Profile = () => {
    const dispatch = useDispatch();
    const userData = useSelector<AppRootStateType, UserType>((state) => state.profile);
    const isInitialized = useSelector<AppRootStateType, boolean>(state => state.app.isInitialized);

    const logoutHandler = useCallback(() => {
        dispatch(logout())
    }, [dispatch])

    if (!isInitialized) {
        return <Redirect to={"/login"}/>
    }

    return (
        <div className="Profile">
            <h3>Profile</h3>
            <img src={userData.avatar} alt="avatar"/>
            <div>{userData.name}</div>
            <div>{isInitialized && <Button variant='contained' color='primary' onClick={logoutHandler}>Log out</Button>}</div>
        </div>
    );
}
