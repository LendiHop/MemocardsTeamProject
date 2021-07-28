import React, { useCallback } from 'react';
import './Profile.module.css';
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../../n1-main/m2-bll/store/redux-store";
import {ProfileDataType} from "../a1-loginization/api/api";
import { Redirect } from 'react-router-dom';
import {Button} from "@material-ui/core";
import { logout } from '../a1-loginization/reducer/reducer';

export const Profile = () => {
    const dispatch = useDispatch();
    const profileData = useSelector<AppRootStateType, ProfileDataType>((state) => state.profile);
    const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.login.isLoggedIn);

    const logoutHandler = useCallback(() => {
        dispatch(logout())
    }, [dispatch])

    if (!isLoggedIn) {
        return <Redirect to={"/login"}/>
    }

    return (
        <div className="Profile">
            <h3>Profile</h3>
            <img src={profileData.avatar} alt="avatar"/>
            <div>{profileData.name}</div>
            <div>{isLoggedIn && <Button variant='contained' color='primary' onClick={logoutHandler}>Log out</Button>}</div>
        </div>
    );
}
