import React, {useEffect} from 'react';
import './Main.module.css';
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../m2-bll/store/redux-store";
import {Redirect} from "react-router-dom";
import {initializeAppTC} from "../../m2-bll/reducers/app-reduser";


export const Main = () => {
    console.log('main')
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(initializeAppTC())
    }, [])
    const isInitialized = useSelector<AppRootStateType, boolean>(state => state.app.isInitialized)
    if (isInitialized) {
        return <Redirect to={'/profile'}/>
    }

    return (
        <div className="Main">
            main
        </div>
    );
}
