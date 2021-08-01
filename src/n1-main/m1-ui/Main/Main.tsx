import React, {useEffect} from 'react';
import './Main.module.css';
import {useDispatch, useSelector} from "react-redux";
import {isAuthMeTC} from "../../m2-bll/reducers/auth-reducer";
import {AppRootStateType} from "../../m2-bll/store/redux-store";
import {Redirect} from "react-router-dom";

export const Main = () => {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(isAuthMeTC())
    },[])
    const isInitialized = useSelector<AppRootStateType, boolean>(state => state.auth.isInitialized)
    if(isInitialized) {
        return <Redirect to={'/profile'} />
    }

    return (
        <div className="Main">
            Main
        </div>
    );
}
