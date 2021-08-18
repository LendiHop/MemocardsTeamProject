import React, {useCallback} from 'react';
import './Profile.module.css';
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../../n1-main/m2-bll/store/redux-store";
import {Redirect} from 'react-router-dom';
import {Button, LinearProgress} from "@material-ui/core";
import {ProfileDataType} from '../../../n1-main/m2-bll/reducers/profile-reducer';
import {logoutTC} from '../../../n1-main/m2-bll/reducers/auth-reducer';


export const Profile: React.FC = () => {

    const dispatch = useDispatch();
    const profileData = useSelector<AppRootStateType, ProfileDataType>((state) => state.profile);
    const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.auth.isLoggedIn);
    const packsTrue = useSelector<AppRootStateType, boolean>(state => state.cards.packsTrue);
    const isInitialized = useSelector<AppRootStateType, boolean>(state => state.app.isInitialized);

    const logoutHandler = useCallback(() => {
        dispatch(logoutTC())
    }, [dispatch])

    if (!isInitialized) {
        return <LinearProgress color={"secondary"}/>
    } else if (!isLoggedIn) {
        return <Redirect to={"/login"}/>
    } else if (packsTrue) {
        return <Redirect to={'/packs-list'}/>
    }
    return (
        <div className="Profile">
            <h3>Profile</h3>
            <img src={profileData.avatar} alt="avatar"/>
            <div>{profileData.name}</div>
            <div>{isLoggedIn &&
            <Button variant='contained' color='primary' onClick={logoutHandler}>Log out</Button>}
            </div>
        </div>
    );
}
