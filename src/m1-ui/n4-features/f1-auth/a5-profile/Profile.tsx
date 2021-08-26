import React from 'react';
import p from './Profile.module.css';
import {useSelector} from "react-redux";
import {AppRootStateType} from "../../../../m2-bll/b0-store/redux-store";
import {Redirect} from 'react-router-dom';
import {ProfileDataType} from '../../../../m2-bll/b1-reducers/profile-reducer';
import {RequestStatusType} from "../../../../m2-bll/b1-reducers/app-reduser";
import {LinearProgress} from "@material-ui/core";


export const Profile: React.FC = () => {

    const profile = useSelector<AppRootStateType, ProfileDataType>((state) => state.profile);
    const status = useSelector<AppRootStateType, RequestStatusType>(state => state.app.status);
    const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.auth.isLoggedIn);

    const avatarAddress = profile.avatar ? profile.avatar : 'https://duiko.guru/landing/privlichenie/img/avatar.png';


    if (!isLoggedIn) {
        return <Redirect to={'/login'}/>
    }

    return (
        <>
            {status === "loading" && <LinearProgress color="secondary"/>}
            <div className={p.profile}>
                <div className={p.ava}>
                    <img src={avatarAddress} alt='avatar' title={'avatar'}/>
                </div>
                <div className={p.greeting}>{profile.email}</div>
                <div className={p.greeting}>Hello, {profile.name}</div>
                <div className={p.numberOfPacks}>
                    You have <span className={p.userPacks}>
                        {profile.publicCardPacksCount}
                    </span> packs
                </div>
            </div>
        </>
    );
}
